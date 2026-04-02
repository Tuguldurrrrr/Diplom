package com.dronehub.service.impl;

import com.dronehub.dao.BookingDao;
import com.dronehub.dao.impl.BookingDaoImpl;
import com.dronehub.model.Booking;
import com.dronehub.service.BookingService;

public class BookingServiceImpl implements BookingService {
    private final BookingDao bookingDao = new BookingDaoImpl();

    @Override
    public Booking createBooking(Booking booking) {
        if (booking.getOperatorId() != null && bookingDao.hasOverlap(booking.getOperatorId(), booking.getBookingDateTime().toString(), booking.getDurationMinute())) {
            throw new IllegalArgumentException("Операторын цаг давхцаж байна.");
        }
        booking.setStatus("PENDING");
        return bookingDao.insert(booking);
    }

    @Override
    public void approveBooking(Long bookingId, Long adminId) {
        bookingDao.updateStatus(bookingId, "CONFIRMED");
    }

    @Override
    public void assignOperator(Long bookingId, Long operatorId) {
        bookingDao.updateStatus(bookingId, "ASSIGNED");
    }

    @Override
    public void updateBookingStatus(Long bookingId, String status) {
        bookingDao.updateStatus(bookingId, status);
    }
}
