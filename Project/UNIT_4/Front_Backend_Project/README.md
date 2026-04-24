# Front + Back End Project

This project has two parts:
- **back-end-project** → Node.js + Express server (gives user data)
- **front-end-project** → React + Vite app (shows user data on screen)

---

## What This Project Does

The backend has 5 users stored in it. When the frontend loads, it asks the backend for those users and shows them on the page.

---

## Tools You Need (Install These First)

- [Node.js](https://nodejs.org) — download and install it (npm comes with it)
- A code editor like [VS Code](https://code.visualstudio.com)

---

## How to Create the Projects (From Scratch)

### Step 1 — Create the Backend Project

Open a terminal and run:

```
mkdir back-end-project
cd back-end-project
npm init -y
npm install express cors
```

Then create a file called `index.js` inside it.

---

### Step 2 — Create the Frontend Project

Open a new terminal in the main folder and run:

```
npm create vite@latest front-end-project
```

When it asks:
- Select **React**
- Select **JavaScript**

Then run:

```
cd front-end-project
npm install
```

---

## Project Folder Structure

```
Front_Backend_Project/
├── back-end-project/
│   ├── index.js        ← Express server code
│   └── package.json
│
└── front-end-project/
    ├── src/
    │   ├── App.jsx     ← React code (shows users)
    │   └── main.jsx
    └── package.json
```

---

## Backend Code (index.js)

This is what the `index.js` file contains:

```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Jeet', email: 'jeet@example.com' },
  { id: 3, name: 'Akash', email: 'akash@example.com' },
  { id: 4, name: 'Tom', email: 'tom@example.com' },
  { id: 5, name: 'Jastin', email: 'jastin@example.com' },
  { id: 5, name: 'Eve', email: 'eve@example.com' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

> `cors()` is used so the frontend (on a different port) can talk to the backend without errors.

---

## Frontend Code (App.jsx)

This is what the `App.jsx` file contains:

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

> `useEffect` runs when the page loads and fetches users from the backend.

---

## How to Run the Project

You need to open **two terminals** at the same time.

### Terminal 1 — Start the Backend

```
cd back-end-project
npm start
```

You will see:
```
Server running on http://localhost:3000
```

### Terminal 2 — Start the Frontend

```
cd front-end-project
npm run dev
```

You will see something like:
```
Local: http://localhost:5173
```

---

## Open in Browser

Go to: **http://localhost:5173**

You will see a list of 5 users fetched from the backend.

---

## Quick Summary

| Step | What to do |
|------|------------|
| 1 | Install Node.js |
| 2 | Create backend folder and run `npm install express cors` |
| 3 | Create frontend using `npm create vite@latest` |
| 4 | Start backend with `npm start` |
| 5 | Start frontend with `npm run dev` |
| 6 | Open `http://localhost:5173` in browser |

---

## Common Problems

**Problem:** Frontend shows no users  
**Fix:** Make sure the backend is running on port 3000 first

**Problem:** `npm start` not working in backend  
**Fix:** Make sure `package.json` has this:
```json
"scripts": {
  "start": "node index.js"
}
```

**Problem:** CORS error in browser  
**Fix:** Make sure you have `app.use(cors())` in `index.js` and cors is installed
