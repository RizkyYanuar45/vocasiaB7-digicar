const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");
const Car = require("../models/Car");
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
    console.log("Redirect URL:", redirectUrl);

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const userEmail = order.contact;
    console.log("User Email:", userEmail);

    await sendEmail(
      userEmail,
      "Approval Notification",
      `Your order has been approved! Please complete your payment at the following link: ${redirectUrl.token.redirect_url}`
    );

    order.midtransOrderId = redirectUrl.order_id;
    order.paymentStatus = "Belum Bayar"; 
    await order.save();

    const carId = order.car;
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    car.isUsed = "Not Ready";
    await car.save();

    res.status(200).json({
      message: "Approval email sent and car status updated",
      redirect_url: redirectUrl.token.redirect_url,
    });
  } catch (err) {
    console.error("Error processing payment and sending approval:", err);
    res.status(500).json({
      message: "Error processing payment and sending approval",
      error: err.message,
    });
  }
};


exports.notificationAndUpdateOrder = async (req, res) => {
  console.log("Notifikasi Midtrans:", req.body);

  const { order_id, transaction_status } = req.body;

  if (!order_id || !transaction_status) {
    return res.status(400).json({ message: "Order ID atau status transaksi tidak ditemukan!" });
  }

  try {
    const updatedTransaction = await Order.findOneAndUpdate(
      { midtransOrderId: order_id }, 
      {
        status: transaction_status === "settlement" ? "Confirmed" : "Pending",
        paymentStatus: transaction_status === "settlement" ? "Berhasil" : "Belum Bayar",
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({
      message: "Notifikasi pembayaran berhasil diterima",
      order_id: updatedTransaction.midtransOrderId,
      paymentStatus: updatedTransaction.paymentStatus, 
    });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Error updating transaction status", error: error.message });
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
