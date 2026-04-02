package com.dronehub.dao;

import com.dronehub.model.Booking;
import java.util.List;

public interface BookingDao {
    Booking insert(Booking booking);
    Booking findById(Long id);
    List<Booking> findAll();
    void updateStatus(Long bookingId, String status);
    boolean hasOverlap(Long operatorId, String startDateTime, Integer durationMinute);
}
