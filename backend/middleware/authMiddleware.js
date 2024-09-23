const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Access denied, no token provided' });

  const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'Access denied, invalid token' });

  try {
    // Verify the token with Google OAuth2Client and public key
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Must match the client ID
    });

    const payload = ticket.getPayload();  // Extract the user info from the token

    // Attach the decoded user information to the request object
    req.user = payload;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
