const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mental_health_tracker.db');

db.serialize(() => {
  // Create logs table
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,            
      user_id TEXT,
      mood_rating INTEGER,
      anxiety_level INTEGER,
      sleep_hours INTEGER,
      sleep_quality INTEGER,
      physical_activity INTEGER,
      social_interactions INTEGER,
      stress_level INTEGER,
      symptoms TEXT,
      created_at DATETIME             
    )
  `);
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
