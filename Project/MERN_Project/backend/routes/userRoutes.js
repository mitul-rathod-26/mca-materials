const express = require('express');
const User = require('../models/User');

const router = express.Router();

// POST /user/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: `Hello, ${user.name}`, user: { name: user.name, email: user.email, address: user.address } });
});

// GET /user/all
router.get('/all', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// PUT /user/update
router.put('/update', async (req, res) => {
  const { email, name, address, password } = req.body;
  const updateData = { name, address };
  if (password) updateData.password = password;
  
  const user = await User.findOneAndUpdate({ email }, updateData, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email, address: user.address } });
});

module.exports = router;
