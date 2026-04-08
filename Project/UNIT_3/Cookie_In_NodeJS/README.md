# Cookie in Node.js

A simple Node.js project to learn how to **Set**, **Read**, and **Delete** cookies using `express` and `cookie-parser`.

---

## Project Setup

### Step 1: Create Project Folder & Initialize

```bash
mkdir Cookie_In_NodeJS
cd Cookie_In_NodeJS
npm init -y
```

### Step 2: Install Required Packages

```bash
npm install express
npm install cookie-parser
```

### Step 3: Create `cookie_demo.js` File

Create a file named `cookie_demo.js` and add the following code:

```js
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

- `express` — to create the server
- `cookie-parser` — to read cookies from incoming requests

---

## Routes

### Home Route — Check if Cookie Exists

```js
app.get('/', (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.send('Home Page : No cookie found');
    }
    res.send(`Home Page : Cookie found: ${username}`);
});
```

Visit: `http://localhost:3000/`

---

### Set a Cookie

```js
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'John', {
        maxAge: 900000,  // expires in 15 minutes
        httpOnly: true   // not accessible via JavaScript (security)
    });
    res.send('Cookie has been set..!');
});
```

Visit: `http://localhost:3000/set-cookie`

**maxAge Calculation (in milliseconds):**

For 1 minute 30 seconds:
```
maxAge = (minutes × 60 + seconds) × 1000
       = (1 × 60 + 30) × 1000
       = 90 × 1000
       = 90000
```

For 15 minutes:
```
maxAge = (minutes × 60 + seconds) × 1000
       = (15 × 60 + 0) × 1000
       = 900 × 1000
       = 900000
```

For 30 seconds:
```
maxAge = (minutes × 60 + seconds) × 1000
       = (0 × 60 + 30) × 1000
       = 30 × 1000
       = 30000
```

> 1 second = 1000 ms, so multiply total seconds by 1000

---

### Read a Cookie

```js
app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    if (!username) {
        res.send('No cookie found');
    }
    res.send(`Cookie found: ${username}`);
});
```

Visit: `http://localhost:3000/get-cookie`

---

### Delete a Cookie

```js
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie has been deleted..! 🗑️');
});
```

Visit: `http://localhost:3000/delete-cookie`

---

### Step 4: Start the Server

```js
app.listen(3000, () => {
    console.log('Server is running on localhost:3000');
});
```

Run the project:

```bash
node cookie_demo.js
```

---

## Test the Routes (in order)

| Step | URL | What it does |
|------|-----|--------------|
| 1 | `http://localhost:3000/` | Check if cookie exists |
| 2 | `http://localhost:3000/set-cookie` | Set the cookie |
| 3 | `http://localhost:3000/get-cookie` | Read the cookie |
| 4 | `http://localhost:3000/` | Now shows cookie value |
| 5 | `http://localhost:3000/delete-cookie` | Delete the cookie |

---

## View Cookie in Browser (DevTools)

You can see the cookie stored in your browser using **Developer Tools**.

### Steps:

1. Go to `http://localhost:3000/set-cookie` to set the cookie
2. Press `F12` (or `Right Click` → **Inspect**) to open DevTools
3. Click on the **Application** tab
4. In the left sidebar, expand **Cookies** → click on `http://localhost:3000`
5. You will see the cookie listed like this:

| Name | Value | HttpOnly | Expires |
|------|-------|----------|---------|
| username | John | ✅ | 15 min |

> **Note:** Since `httpOnly: true` is set, the cookie is **not accessible via `document.cookie`** in the browser console — this is a security feature.

### To verify via Console (will NOT show httpOnly cookies):

```js
// Open DevTools → Console tab and type:
document.cookie  // httpOnly cookies won't appear here
```

---

## Project Structure

```
Cookie_In_NodeJS/
├── cookie_demo.js
├── package.json
└── README.md
```
