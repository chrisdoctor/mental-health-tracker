const db = require('../db/db');

// Controller to create a new log
const createLog = async (req, res) => {
  const { moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteractions, stressLevel, symptoms } = req.body;

  try {
    await db.run(`
      INSERT INTO logs (user_id, mood_rating, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interactions, stress_level, symptoms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteractions, stressLevel, symptoms]
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
    const logs = await db.all(`SELECT * FROM logs WHERE user_id = ?`, [req.user.id]);

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

module.exports = { createLog, getLogs };
