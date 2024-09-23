const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const axios = require('axios');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/google/callback',
  passReqToCallback: true  // This allows us to pass the request object to the callback function
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    // Exchange authorization code for access token manually
    console.log("Code", req.query.code)

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: {
        code: req.query.code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:4000/auth/google/callback',
        grant_type: 'authorization_code'
      },
      dns: { family: 4 }  // Force IPv4 if necessary
    });

    const accessToken = tokenResponse.data.access_token;
    console.log("Manual Access Token:", accessToken);

    const user = {
      id: profile.id,
      displayName: profile.displayName,
      emails: profile.emails,
    };

    return done(null, user);
  } catch (error) {
    console.error("Error in manual token exchange:", error.response ? error.response.data : error.message);
    return done(error, null);
  }
}));
