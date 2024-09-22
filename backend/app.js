const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');
require('./config/passport'); // Load passport config

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/api', logRoutes);

module.exports = app;