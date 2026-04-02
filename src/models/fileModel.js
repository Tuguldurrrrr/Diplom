const db = require('../config/db');

async function saveFile({ booking_id, file_name, file_path, uploaded_by }) {
  const sql = 'INSERT INTO booking_files (booking_id, file_name, file_path, uploaded_by) VALUES (?, ?, ?, ?)';
  await db.execute(sql, [booking_id, file_name, file_path, uploaded_by]);
}

module.exports = { saveFile };
