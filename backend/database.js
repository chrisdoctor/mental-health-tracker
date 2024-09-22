const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mental_health.db', (err) => {
  if (err) console.error('Failed to connect to database:', err.message);
  else console.log('Connected to SQLite database.');
});

module.exports = db;
