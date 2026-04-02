const db = require('../config/db');

async function listServices() {
  const [rows] = await db.execute('SELECT id, title, description, price, location, status FROM services ORDER BY id DESC');
  return rows;
}

async function updateServiceStatus(id, status) {
  await db.execute('UPDATE services SET status = ? WHERE id = ?', [status, id]);
}

module.exports = { listServices, updateServiceStatus };
