const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");
const midtransHelper = require("../helper/midtrans");
const sendEmail = require("../utils/sendMail");

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset",
      `This your password reset token: ${resetToken}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error requesting password reset", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword || !validatePassword(newPassword)) {
    return res.status(400).json({ message: "Invalid token or password" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (
      !user ||
      user.resetToken !== token ||
      user.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: err.message });
  }
};

exports.approveAndProcessPayment = async (req, res) => {
  const { grossAmount, itemName, orderId } = req.body;

  if (!grossAmount || !itemName || !orderId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const redirectUrl = await midtransHelper.userPayment(grossAmount, itemName);

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const userEmail = order.contact;

    await sendEmail(
      userEmail,
      "Approval Notification",
      "Your order has been approved! Please complete your payment at the following link: " +
        redirectUrl
    );

    res
      .status(200)
      .json({ message: "Approval email sent", redirect_url: redirectUrl });
  } catch (err) {
    res.status(500).json({
      message: "Error processing payment and sending approval",
      error: err.message,
    });
  }
};

exports.declineOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const userEmail = order.contact;
    await sendEmail(
      userEmail,
      "Order Declined",
      "Your order has been declined. If you have any questions, please contact us."
    );

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order has been declined and deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error declining order", error: err.message });
  }
};