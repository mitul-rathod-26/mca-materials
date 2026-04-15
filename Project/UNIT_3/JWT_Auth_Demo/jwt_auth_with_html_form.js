require('dotenv').config();
const express  = require('express');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');

const app    = express();
const SECRET = process.env.SECRET;

app.use(express.json());

// ── Temporary "database" ──────────────────────────────────────────────────────
const users = [];


// ── HTML FRONTEND PAGE (opens in browser) ────────────────────────────────────
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
   
    <body>

      <h1>🔐 Auth Demo</h1>

      <!-- REGISTER -->
      <h2>Register</h2>
      <input id="reg-user" placeholder="Username" />
      <input id="reg-pass" placeholder="Password" type="password" />
      <button onclick="register()">Register</button>

      <!-- LOGIN -->
      <h2>Login</h2>
      <input id="log-user" placeholder="Username" />
      <input id="log-pass" placeholder="Password" type="password" />
      <button onclick="login()">Login</button>

      <!-- DASHBOARD -->
      <h2>Dashboard (Protected)</h2>
      <button onclick="dashboard()">Go to Dashboard</button>

      <!-- MESSAGE BOX -->
      <div id="msg"></div>

      <script>
        let token = '';   // stores JWT after login

        function showMsg(text, type) {
          const box = document.getElementById('msg');
          box.textContent = text;
          box.className = type;       // 'success' or 'error'
          box.style.display = 'block';
        }

        async function register() {
          const username = document.getElementById('reg-user').value;
          const password = document.getElementById('reg-pass').value;

          const res  = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await res.json();
          showMsg(data.message, res.ok ? 'success' : 'error');
        }

        async function login() {
          const username = document.getElementById('log-user').value;
          const password = document.getElementById('log-pass').value;

          const res  = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await res.json();

          if (res.ok) {
            token = data.token;       // save token for dashboard call
            showMsg('Login successful ✅ Token saved!', 'success');
          } else {
            showMsg(data.message, 'error');
          }
        }

        async function dashboard() {
          if (!token) {
            showMsg('❌ Please login first!', 'error');
            return;
          }
          const res  = await fetch('/dashboard', {
            headers: { 'Authorization': 'Bearer ' + token }
          });
          const data = await res.json();
          showMsg(data.message, res.ok ? 'success' : 'error');
        }
      </script>

    </body>
    </html>
  `);
});


// ── REGISTER ROUTE ────────────────────────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(400).json({ message: '❌ Username already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, hashedPassword });

  res.json({ message: 'User registered ✅' });
});


// ── LOGIN ROUTE ───────────────────────────────────────────────────────────────
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: '❌ User not found' });
  }

  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) return res.status(401).json({ message: '❌ Invalid credentials' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});


// ── PROTECTED ROUTE ───────────────────────────────────────────────────────────
app.get('/dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: `Welcome, ${decoded.username}! ✅` });
  } catch {
    res.status(403).json({ message: '❌ Access denied' });
  }
});


// ── START SERVER ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});