const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    };

    // Sign a JWT token
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    return done(null, { user, token });
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
