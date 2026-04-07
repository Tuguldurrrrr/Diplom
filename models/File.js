const db = require('../config/db');

class File {
  static async create(data) {
    const sql = 'INSERT INTO files (order_id, file_name, file_path, file_type) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [data.order_id, data.file_name, data.file_path, data.file_type]);
    return result;
  }

  static async byOrder(orderId) {
    const [rows] = await db.execute('SELECT * FROM files WHERE order_id = ? ORDER BY uploaded_at DESC', [orderId]);
    return rows;
  }
}

module.exports = File;
