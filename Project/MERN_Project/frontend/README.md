# Frontend - MERN Project

React + Vite frontend for the MERN project.

## Tech Stack

- React 19
- React Router DOM
- Vite
- CSS Modules

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── login/             # Login page (admin & user)
│   │   ├── navbar/            # Top navigation bar
│   │   ├── admin_dashboard/   # Admin home page with stats
│   │   ├── add_user/          # Admin - add new user form
│   │   ├── all_users/         # Admin - view all users
│   │   └── user_dashboard/    # User home + update profile
│   ├── App.jsx                # Routes setup
│   ├── main.jsx               # App entry point
│   └── index.css
├── vite.config.js             # Vite config with proxy
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

> Make sure the backend is running on `http://localhost:3000` before using the app.

## Pages & Components

| Component | Route | Description |
|-----------|-------|-------------|
| Login | `/` | Login for both admin and user |
| AdminDashboard | `/admin` | Admin home with user stats |
| AddUser | `/admin/add-user` | Form to add a new user |
| AllUsers | `/admin/all-users` | Table showing all users |
| UserDashboard | `/user` | User home page |
| UpdateProfile | `/user/update` | Update user name, address, password |

## Proxy Config

API calls are proxied to the backend via `vite.config.js`:

```js
proxy: {
  '/admin': 'http://localhost:3000',
  '/user': 'http://localhost:3000'
}
```

This means you can call `/admin/login` directly in fetch without writing the full URL.
