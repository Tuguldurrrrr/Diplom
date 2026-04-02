package com.dronehub.controller;

import com.dronehub.model.Booking;
import com.dronehub.service.BookingService;
import com.dronehub.service.impl.BookingServiceImpl;

public class BookingController {
    private final BookingService bookingService = new BookingServiceImpl();

    public Booking create(Booking booking) {
        return bookingService.createBooking(booking);
    }

    public void approve(Long bookingId, Long adminId) {
        bookingService.approveBooking(bookingId, adminId);
    }

    public void assignOperator(Long bookingId, Long operatorId) {
        bookingService.assignOperator(bookingId, operatorId);
    }

    public void updateStatus(Long bookingId, String status) {
        bookingService.updateBookingStatus(bookingId, status);
    }
}
