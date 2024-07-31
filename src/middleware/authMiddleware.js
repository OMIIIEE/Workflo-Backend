const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = user; 

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};

module.exports = authenticate;
