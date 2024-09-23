const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

// POST: Create a new log (protected by JWT)
router.post('/log', authenticateJWT, createLog);

// GET: Fetch all logs for a user (protected by JWT)
router.get('/logs', authenticateJWT, getLogs);

module.exports = router;
