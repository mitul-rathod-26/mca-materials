require('dotenv').config();  // loads .env file
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const SECRET = process.env.SECRET;  // ✅ reads from .env (not hardcoded)

app.use(express.json());   // allows req.body to work

// ── Temporary "database" (just an array for demo)
const users = [];   // stores { username, hashedPassword }


// ── REGISTER ROUTE ──────────────────────────────────────────────────────────
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existing = users.find(u => u.username === username);
    if (existing) {
        return res.status(400).json({ message: '❌ Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // Hash password!
    users.push({ username, hashedPassword });                // Save to our array

    res.json({ message: 'User registered ✅' });
});


// ── LOGIN ROUTE ──────────────────────────────────────────────────────────────
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Fetch user from our array (replaces DB lookup)
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: '❌ User not found' });
    }

    // Your validation code (moved to correct place inside login route)
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) return res.status(401).json({ message: '❌ Invalid credentials' });

    // Create JWT Token
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });  // Send token to client
});


// ── PROTECTED ROUTE (verifies token) ─────────────────────────────────────────
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Bearer TOKEN
    try {
        const decoded = jwt.verify(token, SECRET);
        res.json({ message: `Welcome, ${decoded.username}..!` });
    } catch {
        res.status(403).json({ message: 'Access denied' });
    }
});


// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});