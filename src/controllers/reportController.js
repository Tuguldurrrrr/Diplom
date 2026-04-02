const db = require('../config/db');

async function monthlyReport(req, res) {
  try {
    const sql = `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total_bookings
                 FROM bookings
                 GROUP BY DATE_FORMAT(created_at, '%Y-%m')
                 ORDER BY month DESC`;
    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { monthlyReport };
