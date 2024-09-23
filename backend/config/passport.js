const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.APP_BASE_URL}/auth/google/callback`,  
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      displayName: profile.displayName,
      emails: profile.emails,
    };
    return done(null, user);  // Pass the user profile to the callback handler
  }
));

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
