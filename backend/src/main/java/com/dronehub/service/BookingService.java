package com.dronehub.service;

import com.dronehub.model.Booking;

public interface BookingService {
    Booking createBooking(Booking booking);
    void approveBooking(Long bookingId, Long adminId);
    void assignOperator(Long bookingId, Long operatorId);
    void updateBookingStatus(Long bookingId, String status);
}
