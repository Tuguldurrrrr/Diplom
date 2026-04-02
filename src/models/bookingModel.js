const db = require('../config/db');

async function createBooking({ customer_id, service_id, booking_date, booking_time, location, note }) {
  const sql = `INSERT INTO bookings (customer_id, service_id, booking_date, booking_time, location, note, status)
               VALUES (?, ?, ?, ?, ?, ?, 'Pending')`;
  const [result] = await db.execute(sql, [customer_id, service_id, booking_date, booking_time, location, note]);
  return result.insertId;
}

async function getBookingsByRole(user) {
  let sql = `SELECT b.*, s.title as service_title, u.full_name as customer_name, op.full_name as operator_name
             FROM bookings b
             JOIN services s ON s.id = b.service_id
             JOIN users u ON u.id = b.customer_id
             LEFT JOIN users op ON op.id = b.operator_id`;
  const params = [];

  if (user.role === 'Customer') {
    sql += ' WHERE b.customer_id = ?';
    params.push(user.id);
  } else if (user.role === 'Operator') {
    sql += ' WHERE b.operator_id = ?';
    params.push(user.id);
  }
  sql += ' ORDER BY b.id DESC';

  const [rows] = await db.execute(sql, params);
  return rows;
}

async function updateStatus(id, status, operator_id = null) {
  let sql = 'UPDATE bookings SET status = ?';
  const params = [status];
  if (operator_id !== null) {
    sql += ', operator_id = ?';
    params.push(operator_id);
  }
  sql += ' WHERE id = ?';
  params.push(id);
  await db.execute(sql, params);
}

module.exports = { createBooking, getBookingsByRole, updateStatus };
