# Backend - MERN Project

Node.js + Express + MongoDB backend with JWT authentication.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- dotenv
- cors

## Folder Structure

```
backend/
├── middleware/
│   └── verifyToken.js     # JWT token verification middleware
├── models/
│   ├── Admin.js           # Admin mongoose model
│   └── User.js            # User mongoose model
├── routes/
│   ├── adminRoutes.js     # Admin API routes
│   └── userRoutes.js      # User API routes
├── .env                   # Environment variables
├── package.json
└── server.js              # Entry point
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

3. Start the server:
```bash
node server.js
```

Server runs on `http://localhost:3000`

## API Endpoints

### Admin Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/login` | Admin login, returns JWT token | No |
| POST | `/admin/add-user` | Add a new user | Yes (JWT) |
| POST | `/admin/logout` | Logout and blacklist token | Yes (JWT) |

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/login` | User login | No |
| GET | `/user/all` | Get all users | No |
| PUT | `/user/update` | Update user profile | No |

## How Auth Works

- Admin logs in → gets a JWT token
- Token is sent in the `Authorization: Bearer <token>` header for protected routes
- On logout, the token is blacklisted so it can't be reused
