const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Access denied, no token provided' });

  const token = authHeader.split(' ')[1]; // Extract token from header

  if (!token) return res.status(401).json({ message: 'Access denied, invalid token' });

  try {
    const user = jwt.verify(token, JWT_SECRET); // Verify JWT token
    req.user = user; // Attach the decoded user to the request object
    next(); // Move to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
