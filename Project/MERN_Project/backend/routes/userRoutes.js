const express = require('express');
const User = require('../models/User');

const router = express.Router();

// POST /user/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: `Hello, ${user.name}` });
});

// GET /user/all
router.get('/all', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
