const db = require('../database');

const createLogTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      mood INTEGER,
      anxiety INTEGER,
      sleepHours INTEGER,
      sleepQuality TEXT,
      physicalActivityType TEXT,
      physicalActivityDuration TEXT,
      socialInteractions TEXT,
      stressLevel INTEGER,
      symptoms TEXT,
      date TEXT
    )
  `;
  db.run(query);
};

const insertLog = (log, callback) => {
  const query = `
    INSERT INTO logs (userId, mood, anxiety, sleepHours, sleepQuality, physicalActivityType, physicalActivityDuration, socialInteractions, stressLevel, symptoms, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    log.userId, log.mood, log.anxiety, log.sleepHours, log.sleepQuality, log.physicalActivityType, log.physicalActivityDuration,
    log.socialInteractions, log.stressLevel, log.symptoms, log.date
  ];
  db.run(query, params, callback);
};

const getLogsByUserId = (userId, callback) => {
  const query = `SELECT * FROM logs WHERE userId = ?`;
  db.all(query, [userId], callback);
};

module.exports = { createLogTable, insertLog, getLogsByUserId };
