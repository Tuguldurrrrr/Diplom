const db = require('../config/db');

class Report {
  static async summary() {
    const [rows] = await db.execute(`SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM services WHERE status='approved') AS approved_services,
      (SELECT COUNT(*) FROM orders) AS total_orders,
      (SELECT COUNT(*) FROM files) AS total_files`);
    return rows[0];
  }
}

module.exports = Report;
