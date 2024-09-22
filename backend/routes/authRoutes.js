const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // JWT token returned after successful Google login
  res.json({ token: req.user.token });
});

module.exports = router;
