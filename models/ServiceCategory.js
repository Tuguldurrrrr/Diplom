const db = require('../config/db');

class ServiceCategory {
  static async all() {
    const [rows] = await db.execute('SELECT * FROM service_categories ORDER BY name ASC');
    return rows;
  }
}

module.exports = ServiceCategory;
