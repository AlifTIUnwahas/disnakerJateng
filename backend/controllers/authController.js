const User = require('../models/User');
const jwt  = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email sudah terdaftar' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: 'Username sudah digunakan' });

    // Hanya izinkan role yang valid, default ke 'viewer'
    const allowedRoles = ['admin', 'editor', 'viewer'];
    const userRole = allowedRoles.includes(role) ? role : 'viewer';

    const user = await User.create({ username, email, password, role: userRole });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id:        user._id,
        username:  user.username,
        email:     user.email,
        role:      user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Email atau password salah' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Email atau password salah' });

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id:        user._id,
        username:  user.username,
        email:     user.email,
        role:      user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PROFILE (protected)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};