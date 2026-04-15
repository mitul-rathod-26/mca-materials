# JWT Auth Demo

A simple Node.js project that shows how **JWT (JSON Web Token)** authentication works — first using a REST API, then with a browser-based HTML form.

---

## What is JWT?

JWT is a token given to a user after they log in. The user sends this token with every request to prove who they are — no need to store sessions on the server.

A JWT looks like this:
```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG4ifQ.abc123xyz
```
It has 3 parts separated by dots: **Header . Payload . Signature**

---

## Project Structure

```
JWT_Auth_Demo/
├── .env                        # Secret key and port config
├── jwt_auth.js                 # Part 1 — API only (test with Postman/Thunder)
├── jwt_auth_with_html_form.js  # Part 2 — Same API + HTML page in browser
├── package.json
└── package-lock.json
```

---

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Check your `.env` file** (already created)
```
SECRET=my_secret_key
PORT=3000
```
> `SECRET` is the key used to sign and verify JWT tokens. Keep it private.

---

---

# Part 1 — `jwt_auth.js` (API Only)

This file builds a simple Express server with 3 routes. No browser UI — you test it using **Postman**.

## How to Run

```bash
node jwt_auth.js
```
Server starts at: `http://localhost:3000`

---

## How it Works — Step by Step

### Step 1 — App Setup

```js
require('dotenv').config();   // loads SECRET and PORT from .env
const express = require('express');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

const app    = express();
const SECRET = process.env.SECRET;  // reads secret from .env, not hardcoded

app.use(express.json());  // lets us read JSON from req.body
```

- `dotenv` reads your `.env` file so secrets are not hardcoded in code.
- `express.json()` middleware parses incoming JSON request bodies.

---

### Step 2 — Fake Database

```js
const users = [];  // stores { username, hashedPassword }
```

A plain array acts as a temporary database. In a real app, this would be MongoDB, MySQL, etc.

---

### Step 3 — Register Route (`POST /register`)

```js
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
```

What happens here:
1. Read `username` and `password` from the request body.
2. Check if the username already exists in the array — if yes, reject it.
3. Hash the password using `bcrypt` with a salt round of `10` (makes it unreadable).
4. Save `{ username, hashedPassword }` into the `users` array.
5. Send back a success message.

> Passwords are **never stored as plain text** — always hashed.

**Test with Postman:**
- Method: `POST`
- URL: `http://localhost:3000/register`
- Body (JSON):
```json
{ "username": "john", "password": "pass123" }
```
- Response:
```json
{ "message": "User registered ✅" }
```

---

### Step 4 — Login Route (`POST /login`)

```js
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
```

What happens here:
1. Read `username` and `password` from the request body.
2. Find the user in the array — if not found, return 401.
3. Use `bcrypt.compare()` to check if the entered password matches the stored hash.
4. If valid, create a JWT token using `jwt.sign()`:
   - Payload: `{ username }` — data stored inside the token.
   - Signed with `SECRET` — so only our server can verify it.
   - Expires in `1h` — token becomes invalid after 1 hour.
5. Send the token back to the client.

**Test with Postman:**
- Method: `POST`
- URL: `http://localhost:3000/login`
- Body (JSON):
```json
{ "username": "john", "password": "pass123" }
```
- Response:
```json
{ "token": "eyJhbGciOiJIUzI1NiJ9..." }
```

---

### Step 5 — Protected Route (`GET /dashboard`)

```js
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // "Bearer TOKEN"
    try {
        const decoded = jwt.verify(token, SECRET);
        res.json({ message: `Welcome, ${decoded.username}..!` });
    } catch {
        res.status(403).json({ message: 'Access denied' });
    }
});
```

What happens here:
1. Read the `Authorization` header — it looks like `Bearer eyJhbGci...`
2. Split by space and take index `[1]` to get just the token part.
3. Use `jwt.verify()` to check if the token is valid and not expired.
4. If valid — decode the payload and greet the user by username.
5. If invalid or missing — return 403 Access Denied.

**Test with Postman:**
- Method: `GET`
- URL: `http://localhost:3000/dashboard`
- Header:
```
Authorization: Bearer <paste your token here>
```
- Response (success):
```json
{ "message": "Welcome, john..!" }
```
- Response (no token / wrong token):
```json
{ "message": "Access denied" }
```

---

---

# Part 2 — `jwt_auth_with_html_form.js` (API + Browser UI)

This file does everything `jwt_auth.js` does, **plus** it serves an HTML page so you can test everything directly in your browser — no Postman needed.

## How to Run

```bash
node jwt_auth_with_html_form.js
```
Open your browser and go to: `http://localhost:3000`

---

## What's New — Step by Step

### Step 1 — HTML Page Route (`GET /`)

```js
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html> ... `);
});
```

When you open `http://localhost:3000` in the browser, the server sends back a full HTML page. This page has:
- A **Register** form (username + password input + button)
- A **Login** form (username + password input + button)
- A **Dashboard** button (protected — needs token)
- A **message box** (`<div id="msg">`) that shows success/error messages

---

### Step 2 — JavaScript Inside the HTML

A `<script>` block inside the HTML handles all button clicks using `fetch()` to call the API routes.

#### Token Storage
```js
let token = '';  // stores JWT after login
```
After login, the token is saved in this variable. It's used when clicking the Dashboard button.

---

#### Register Function
```js
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
```

What happens:
1. Reads username and password from the input fields.
2. Sends a `POST` request to `/register` with JSON body.
3. Shows the server's response message in the message box.

---

#### Login Function
```js
async function login() {
  const username = document.getElementById('log-user').value;
  const password = document.getElementById('log-pass').value;

  const res  = await fetch('/login', { ... });
  const data = await res.json();

  if (res.ok) {
    token = data.token;  // save token for dashboard call
    showMsg('Login successful ✅ Token saved!', 'success');
  } else {
    showMsg(data.message, 'error');
  }
}
```

What happens:
1. Reads username and password from the input fields.
2. Sends a `POST` request to `/login`.
3. If login is successful, saves the returned token in the `token` variable.
4. Shows a success or error message.

---

#### Dashboard Function
```js
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
```

What happens:
1. If no token is saved, shows an error asking to login first.
2. Sends a `GET` request to `/dashboard` with the token in the `Authorization` header.
3. Shows the welcome message or access denied message.

---

### Step 3 — Backend Routes (Same as Part 1)

The Register, Login, and Dashboard routes work exactly the same as in `jwt_auth.js`. The only addition is the `GET /` route that serves the HTML page.

---

## Full Flow (Browser)

```
1. Open http://localhost:3000
2. Enter username + password → click Register
   → Server hashes password and saves user
3. Enter same username + password → click Login
   → Server verifies password, creates JWT, sends it back
   → Browser saves token in memory
4. Click "Go to Dashboard"
   → Browser sends token in Authorization header
   → Server verifies token and returns welcome message
```

---

## Dependencies

| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `jsonwebtoken` | Create and verify JWT tokens |
| `bcryptjs` | Hash and compare passwords |
| `dotenv` | Load environment variables from `.env` |

---

## Key Concepts Summary

| Concept | Explanation |
|---|---|
| **Hashing** | Password is converted to a scrambled string using bcrypt. Cannot be reversed. |
| **JWT Sign** | `jwt.sign(payload, secret, options)` — creates a token with user data inside |
| **JWT Verify** | `jwt.verify(token, secret)` — checks if token is valid and not expired |
| **Bearer Token** | Token is sent in the `Authorization: Bearer <token>` header |
| **Protected Route** | A route that only works if a valid token is provided |
