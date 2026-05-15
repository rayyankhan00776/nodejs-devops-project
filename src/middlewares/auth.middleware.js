import jwt from 'jsonwebtoken';
import configs from '../config/config.js';

// JWT verification middleware
export const verifyToken = (req, res, next) => {
  try {
    // Get token from headers (Bearer token)
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, configs.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = decoded;

    // Proceed to next middleware/route handler
    next();

  } catch (error) {
    // Token verification failed
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};

export default verifyToken;
