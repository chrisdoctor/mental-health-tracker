const util = require('util');
const { v4: uuidv4 } = require('uuid'); 
const db = require('../db/db');

// Promisify db.all() to work with async/await
const dbAllAsync = util.promisify(db.all).bind(db);
const dbRunAsync = util.promisify(db.run).bind(db);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Controller to create a new daily log for the authenticated user
const createLog = async (req, res) => {
  const { moodRating, anxietyLevel, sleepHours, sleepQuality, physicalActivity, socialInteractions, stressLevel, symptoms } = req.body;
  const logId = uuidv4();  
  const createdAt = formatDate(new Date()); 

  try {
    // Insert log into the database
    await dbRunAsync(`
      INSERT INTO logs (id, user_id, mood_rating, anxiety_level, sleep_hours, sleep_quality, physical_activity, social_interactions, stress_level, symptoms, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [logId, req.user.email, Number(moodRating), Number(anxietyLevel), Number(sleepHours), Number(sleepQuality), Number(physicalActivity), Number(socialInteractions), Number(stressLevel), symptoms, createdAt]
    );

    // Emit the logUpdated event via WebSocket
    const newLog = { id: logId, user_id: req.user.email, mood_rating: moodRating, anxiety_level: anxietyLevel, sleep_hours: sleepHours, sleep_quality: sleepQuality, physical_activity: physicalActivity, social_interactions: socialInteractions, stress_level: stressLevel, symptoms: symptoms, created_at: createdAt };
    const io = req.app.get('socketio');  // Retrieve io instance from the app
    io.emit('logUpdated', newLog);  // Emit the logUpdated event to all clients

    res.status(201).json({ message: 'Log created successfully' });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ message: 'Error creating log' });
  }
};

// Controller to get all logs for the authenticated user
const getLogs = async (req, res) => {
  try {
    const logs = await dbAllAsync('SELECT * FROM logs WHERE user_id = ? ORDER BY created_at DESC', [req.user.email]);

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
