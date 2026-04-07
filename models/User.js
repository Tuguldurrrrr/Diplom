const db = require('../config/db');

class User {
  static async create(data) {
    const sql = `INSERT INTO users (full_name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [data.full_name, data.email, data.password, data.role, data.phone]);
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async all() {
    const [rows] = await db.execute('SELECT id, full_name, email, role, phone, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }
}

module.exports = User;
