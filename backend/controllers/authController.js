const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendMail');

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    await sendEmail(user.email, 'Password Reset', `This your password reset token: ${resetToken}`);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error requesting password reset', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};
