const Log = require('../models/log');

const createLog = (req, res) => {
  const logData = {
    userId: req.user.googleId,
    mood: req.body.mood,
    anxiety: req.body.anxiety,
    sleepHours: req.body.sleepHours,
    sleepQuality: req.body.sleepQuality,
    physicalActivityType: req.body.physicalActivityType,
    physicalActivityDuration: req.body.physicalActivityDuration,
    socialInteractions: req.body.socialInteractions,
    stressLevel: req.body.stressLevel,
    symptoms: req.body.symptoms,
    date: new Date().toISOString(),
  };

  Log.insertLog(logData, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to log data' });
    res.status(200).json({ message: 'Log created successfully' });
  });
};

const getLogs = (req, res) => {
  Log.getLogsByUserId(req.user.googleId, (err, logs) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve logs' });
    res.json(logs);
  });
};

module.exports = { createLog, getLogs };
