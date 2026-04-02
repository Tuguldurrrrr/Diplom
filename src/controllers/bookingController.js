const bookingModel = require('../models/bookingModel');

async function createBooking(req, res) {
  try {
    const customer_id = req.user.id;
    const { service_id, booking_date, booking_time, location, note } = req.body;
    const bookingId = await bookingModel.createBooking({ customer_id, service_id, booking_date, booking_time, location, note });
    res.status(201).json({ message: 'Booking created', bookingId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getBookings(req, res) {
  try {
    const rows = await bookingModel.getBookingsByRole(req.user);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, operator_id } = req.body;
    await bookingModel.updateStatus(id, status, operator_id ?? null);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createBooking, getBookings, updateBookingStatus };
