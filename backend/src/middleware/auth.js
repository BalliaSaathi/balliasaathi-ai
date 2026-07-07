const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

const vendorOnly = (req, res, next) => {
  if (req.userRole !== 'vendor') {
    return res.status(403).json({ message: 'Vendor access only' });
  }
  next();
};

const riderOnly = (req, res, next) => {
  if (req.userRole !== 'rider') {
    return res.status(403).json({ message: 'Rider access only' });
  }
  next();
};

module.exports = { auth, adminOnly, vendorOnly, riderOnly };
