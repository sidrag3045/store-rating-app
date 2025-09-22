const { verifyToken } = require('../../utils/jwt.util');
const { User } = require('../../database/models');

// Middleware to protect routes and making sure the user is authenticated
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Token verification
    const decoded = verifyToken(token);

    // Finding the user by ID from the token's payload and attaching them to the request
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to restrict access to admin users only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

const ownerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Store owners only' });
  }
};

module.exports = { protect, adminOnly, ownerOnly };