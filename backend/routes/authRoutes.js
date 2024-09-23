const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Initiate Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle Google OAuth callback
router.get('/google/callback', (req, res, next) => {
  console.log('Authorization code:', req.query.code);  // Check if Google sent the code
  next();
}, passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log("Authenticated with Google");
  const token = jwt.sign(
    { id: req.user.id, email: req.user.emails[0].value },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

module.exports = router;