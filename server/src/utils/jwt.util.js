const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate and verify JWT tokens
const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};