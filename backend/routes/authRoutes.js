const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config();

dns.setDefaultResultOrder('ipv4first');

// Route to initiate Google OAuth flow
router.get('/google', (req, res) => {
  const googleAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: 'http://localhost:4000/auth/google/callback',
    response_type: 'code',
    scope: 'profile email',
    access_type: 'offline',
  });

  res.redirect(`${googleAuthURL}?${params}`);
});

// Route to handle Google OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;  // Get authorization code from query params

  try {
    console.log("Code", code)
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:4000/auth/google/callback',
        grant_type: 'authorization_code',
      },
    });

    const { id_token } = tokenResponse.data;

    // Redirect back to the frontend with the token in the query string
    res.redirect(`http://localhost:3000/?token=${id_token}`);

  } catch (error) {
    console.error('Error during token exchange:', error.response ? error.response.data : error.message);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
