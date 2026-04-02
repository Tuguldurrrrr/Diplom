const db = require('../config/db');

async function createUser({ full_name, email, password_hash, role }) {
  const sql = 'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(sql, [full_name, email, password_hash, role]);
  return result.insertId;
}

async function findByEmail(email) {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

module.exports = { createUser, findByEmail };
