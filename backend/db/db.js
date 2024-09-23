const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mental_health_tracker.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      mood_rating INTEGER,
      anxiety_level INTEGER,
      sleep_hours INTEGER,
      sleep_quality INTEGER,
      physical_activity INTEGER,
      social_interactions INTEGER,
      stress_level INTEGER,
      symptoms TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
