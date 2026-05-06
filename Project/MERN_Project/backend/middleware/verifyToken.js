const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (tokenBlacklist.has(token)) return res.status(401).json({ message: 'Token is invalid, please login again' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.admin = decoded;
    req.token = token;
    next();
  });
};

module.exports = { verifyToken, tokenBlacklist };
