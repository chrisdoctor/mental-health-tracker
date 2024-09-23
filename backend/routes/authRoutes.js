const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Route to initiate Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    // Generate a JWT token for the user
    const token = jwt.sign(
      { id: req.user.id, email: req.user.emails[0].value },
      JWT_SECRET,
      { expiresIn: '1h' }  // Expire it in 1 hour
    );

    res.json({ token });
  }
);

module.exports = router;
