const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      user.token = token;
      await user.save();
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        image: user.image,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username } = req.body;
    const { file, body } = req;
    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      if (file) {
        body.image = file.path;
      }
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password').select('-token');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      console.log(req.file);
      updates.image = req.file.path;
    }
    const userImage = await User.findById(id).select('image');
    if (userImage) {
      fs.unlinkSync(userImage.image);
    }
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (user) {
      if (user.image) {
        fs.unlinkSync(user.image);
      }
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
