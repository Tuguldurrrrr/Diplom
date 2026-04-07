const db = require('../config/db');

class Service {
  static async create(data) {
    const sql = `INSERT INTO services (operator_id, category_id, title, description, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      data.operator_id,
      data.category_id,
      data.title,
      data.description,
      data.price,
      data.location,
      'pending'
    ]);
    return result;
  }

  static async approvedList(search) {
    const base = `
      SELECT s.*, u.full_name AS operator_name, c.name AS category_name
      FROM services s
      JOIN users u ON u.id = s.operator_id
      JOIN service_categories c ON c.id = s.category_id
      WHERE s.status = 'approved'`;

    if (search) {
      const [rows] = await db.execute(`${base} AND (s.title LIKE ? OR s.location LIKE ?) ORDER BY s.created_at DESC`, [`%${search}%`, `%${search}%`]);
      return rows;
    }

    const [rows] = await db.execute(`${base} ORDER BY s.created_at DESC`);
    return rows;
  }

  static async findById(id) {
    const sql = `
      SELECT s.*, u.full_name AS operator_name, u.phone AS operator_phone, c.name AS category_name
      FROM services s
      JOIN users u ON u.id = s.operator_id
      JOIN service_categories c ON c.id = s.category_id
      WHERE s.id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  static async byOperator(operatorId) {
    const [rows] = await db.execute('SELECT * FROM services WHERE operator_id = ? ORDER BY created_at DESC', [operatorId]);
    return rows;
  }

  static async allPending() {
    const sql = `SELECT s.*, u.full_name AS operator_name, c.name AS category_name FROM services s
      JOIN users u ON u.id=s.operator_id
      JOIN service_categories c ON c.id=s.category_id
      WHERE s.status='pending' ORDER BY s.created_at ASC`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute('UPDATE services SET status = ? WHERE id = ?', [status, id]);
    return result;
  }

  static async update(id, data) {
    const sql = 'UPDATE services SET category_id=?, title=?, description=?, price=?, location=? WHERE id=?';
    const [result] = await db.execute(sql, [data.category_id, data.title, data.description, data.price, data.location, id]);
    return result;
  }

  static async remove(id) {
    const [result] = await db.execute('DELETE FROM services WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Service;
