const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const { verifyToken, tokenBlacklist } = require('../middleware/verifyToken');

const router = express.Router();

// POST /admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, password });
  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  const token = jwt.sign(
    { id: admin._id, email: admin.email, name: admin.name },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ message: `Hello, Admin ${admin.name}`, token });
});

// POST /admin/add-user
router.post('/add-user', verifyToken, async (req, res) => {
  const { name, email, address, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const newUser = await User.create({ name, email, address, password });
  res.status(201).json({ message: `User ${newUser.name} added successfully` });
});

// POST /admin/logout
router.post('/logout', verifyToken, (req, res) => {
  tokenBlacklist.add(req.token);
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
