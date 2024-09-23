const util = require('util');
const db = require('../db/db');

// Promisify db.all() to work with async/await
const dbAllAsync = util.promisify(db.all).bind(db);
const dbRunAsync = util.promisify(db.run).bind(db);

// Controller to create a new daily log for the authenticated user
const createLog = async (req, res) => {
  const { moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteractions, stressLevel, symptoms } = req.body;

  try {
    await dbRunAsync(`
      INSERT INTO logs (user_id, mood_rating, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interactions, stress_level, symptoms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.email, moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteractions, stressLevel, symptoms]
    );

    res.status(201).json({ message: 'Log created successfully' });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ message: 'Error creating log' });
  }
};

// Controller to get all logs for the authenticated user
const getLogs = async (req, res) => {
  try {
    const logs = await dbAllAsync('SELECT * FROM logs WHERE user_id = ?', [req.user.email]);

    if (!logs || logs.length === 0) {
      return res.status(200).json({ message: 'No logs found' });
    }

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

module.exports = { createLog, getLogs };
