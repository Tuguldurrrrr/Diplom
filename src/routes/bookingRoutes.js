const router = require('express').Router();
const { createBooking, getBookings, updateBookingStatus } = require('../controllers/bookingController');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/', authenticate, authorize('Customer'), createBooking);
router.get('/', authenticate, getBookings);
router.patch('/:id/status', authenticate, authorize('Admin', 'Operator'), updateBookingStatus);

module.exports = router;
