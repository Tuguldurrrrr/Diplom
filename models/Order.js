const db = require('../config/db');

class Order {
  static async create(data) {
    const sql = `INSERT INTO orders (customer_id, service_id, order_date, shoot_date, location, description, status)
                 VALUES (?, ?, CURDATE(), ?, ?, ?, 'pending')`;
    const [result] = await db.execute(sql, [data.customer_id, data.service_id, data.shoot_date, data.location, data.description]);
    return result;
  }

  static async byCustomer(customerId) {
    const sql = `SELECT o.*, s.title, u.full_name AS operator_name
                 FROM orders o
                 JOIN services s ON s.id = o.service_id
                 JOIN users u ON u.id = s.operator_id
                 WHERE o.customer_id = ? ORDER BY o.created_at DESC`;
    const [rows] = await db.execute(sql, [customerId]);
    return rows;
  }

  static async byOperator(operatorId) {
    const sql = `SELECT o.*, s.title, cu.full_name AS customer_name
                 FROM orders o
                 JOIN services s ON s.id = o.service_id
                 JOIN users cu ON cu.id = o.customer_id
                 WHERE s.operator_id = ? ORDER BY o.created_at DESC`;
    const [rows] = await db.execute(sql, [operatorId]);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return result;
  }

  static async byId(id) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = Order;
