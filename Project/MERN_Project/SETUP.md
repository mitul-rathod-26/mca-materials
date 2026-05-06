# MERN Project Setup Guide

Complete setup guide for running the MERN (MongoDB + Express + React + Node) project.

## Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Code editor (VS Code recommended)

## Quick Start

### 1. Backend Setup

**Step 1:** Go to the backend folder:
```bash
cd backend
```

**Step 2:** Install all packages:
```bash
npm install
```

**Step 3:** Create a `.env` file in the backend folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

**Step 4:** Start the backend server:
```bash
node server.js
```

✅ Backend is now running on `http://localhost:3000`

---

### 2. Frontend Setup

**Step 1:** Open a new terminal and go to the frontend folder:
```bash
cd frontend
```

**Step 2:** Install all packages:
```bash
npm install
```

**Step 3:** Start the frontend:
```bash
npm run dev
```

✅ Frontend is now running on `http://localhost:5173`

---

## How Backend & Frontend Connect

### Connection Flow:

1. **Frontend** runs on port `5173` (Vite dev server)
2. **Backend** runs on port `3000` (Express server)
3. **Proxy** in `vite.config.js` connects them:

```js
proxy: {
  '/admin': 'http://localhost:3000',
  '/user': 'http://localhost:3000'
}
```

### What This Means:

- When frontend calls `/admin/login`, Vite sends it to `http://localhost:3000/admin/login`
- When frontend calls `/user/all`, Vite sends it to `http://localhost:3000/user/all`
- **CORS** is enabled in backend so both can talk to each other

### Example:

```js
// In React component:
fetch('/admin/login', { method: 'POST', ... })
// ↓ Vite proxy converts it to:
// http://localhost:3000/admin/login
```

---

## API Endpoints

### Admin Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/admin/login` | Admin login | No |
| POST | `/admin/add-user` | Add new user | Yes |
| POST | `/admin/logout` | Logout admin | Yes |

### User Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/user/login` | User login | No |
| GET | `/user/all` | Get all users | No |
| PUT | `/user/update` | Update profile | No |

---

## Features

✅ Admin login with JWT token
✅ User login
✅ Add new users (admin only)
✅ View all users
✅ Update user profile
✅ Logout functionality
✅ Dynamic user stats
✅ CORS enabled
✅ Proxy configured

---

## Troubleshooting

**Problem:** Backend not connecting to MongoDB
- Check your `MONGO_URI` in `.env` file
- Make sure MongoDB Atlas allows your IP address

**Problem:** Frontend can't reach backend
- Make sure backend is running on port 3000
- Check `vite.config.js` proxy settings

**Problem:** Port already in use
- Kill the process using that port or change the port number

---

## Project Structure

```
MERN_Project/
├── backend/          # Node.js + Express API
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middleware/   # JWT verification
│   └── server.js     # Entry point
├── frontend/         # React + Vite app
│   └── src/
│       └── components/  # All React components
└── SETUP.md          # This file
```
