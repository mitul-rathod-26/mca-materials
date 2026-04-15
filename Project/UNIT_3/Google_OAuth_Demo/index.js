require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();
const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 3000;

// ── Session ───────────────────────────────────────────────────────────────────
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

// ── Passport Setup ────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ── Google Strategy ───────────────────────────────────────────────────────────
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        const user = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        };
        return done(null, user);
    }
));

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OAuth Demo</title>
      <style>
        body { font-family: Arial; max-width: 400px; margin: 60px auto; padding: 0 20px; }
        button { padding: 10px 20px; background: #db4437; color: white; border: none; cursor: pointer; width: 100%; margin-top: 5px; border-radius: 4px; }
        button:hover { background: #c23321; }
        #msg { margin-top: 15px; padding: 10px; border-radius: 4px; display: none; }
        .success { background: #d4edda; color: #155724; }
      </style>
    </head>
    <body>
      <h1>🔐 Auth Demo</h1>

      <button onclick="window.location.href='/auth/google'">🌐 Login with Google</button>

      <button style="background:#007bff;margin-top:10px" onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'" onclick="window.location.href='/dashboard'">Go to Dashboard</button>

      <div id="msg"></div>

      <script>
        const params = new URLSearchParams(window.location.search);
        const name   = params.get('name');
        if (name) {
          const box = document.getElementById('msg');
          box.textContent = 'Welcome ' + name + '! Logged in with Google ✅';
          box.className = 'success';
          box.style.display = 'block';
          window.history.replaceState({}, '', '/');
        }
      </script>
    </body>
    </html>
  `);
});

// ── GOOGLE AUTH ROUTES ────────────────────────────────────────────────────────
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = jwt.sign({
            username: req.user.name,
            email: req.user.email
        }, SECRET, { expiresIn: '1h' });
        res.redirect(`/?token=${token}&name=${req.user.name}`);
    }
);

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        return res.send(`
      <!DOCTYPE html><html><body style="font-family:Arial;max-width:400px;margin:60px auto">
        <h2>✅ Welcome, ${req.user.name}!</h2>
        <p>Email: ${req.user.email}</p>
        <a href="/">← Back</a>
      </body></html>
    `);
    }
    res.status(403).json({ message: '❌ Access denied' });
});

// ── START SERVER ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
