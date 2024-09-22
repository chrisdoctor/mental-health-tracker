const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const authenticateJWT = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/log', authenticateJWT, createLog);
router.get('/logs', authenticateJWT, getLogs);

module.exports = router;
