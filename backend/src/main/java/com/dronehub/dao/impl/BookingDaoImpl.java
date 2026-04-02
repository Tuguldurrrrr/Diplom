package com.dronehub.dao.impl;

import com.dronehub.dao.BookingDao;
import com.dronehub.model.Booking;
import com.dronehub.util.Db;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookingDaoImpl implements BookingDao {
    @Override
    public Booking insert(Booking booking) {
        String sql = "INSERT INTO bookings(booking_code, customer_id, service_id, operator_id, booking_datetime, duration_minute, location_text, status) VALUES(?,?,?,?,?,?,?,?)";
        try (Connection c = Db.getConnection(); PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, booking.getBookingCode());
            ps.setLong(2, booking.getCustomerId());
            ps.setLong(3, booking.getServiceId());
            if (booking.getOperatorId() == null) ps.setNull(4, Types.BIGINT); else ps.setLong(4, booking.getOperatorId());
            ps.setTimestamp(5, Timestamp.valueOf(booking.getBookingDateTime()));
            ps.setInt(6, booking.getDurationMinute() == null ? 60 : booking.getDurationMinute());
            ps.setString(7, booking.getLocationText());
            ps.setString(8, booking.getStatus());
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) { if (rs.next()) booking.setId(rs.getLong(1)); }
            return booking;
        } catch (SQLException e) {
            throw new RuntimeException("DB insert booking error", e);
        }
    }

    @Override
    public Booking findById(Long id) { return null; }

    @Override
    public List<Booking> findAll() { return new ArrayList<>(); }

    @Override
    public void updateStatus(Long bookingId, String status) {
        String sql = "UPDATE bookings SET status=? WHERE id=?";
        try (Connection c = Db.getConnection(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, status);
            ps.setLong(2, bookingId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("DB update booking status error", e);
        }
    }

    @Override
    public boolean hasOverlap(Long operatorId, String startDateTime, Integer durationMinute) {
        String sql = "SELECT COUNT(*) FROM bookings WHERE operator_id=? AND status IN ('CONFIRMED','ASSIGNED','IN_PROGRESS') " +
                "AND booking_datetime < DATE_ADD(?, INTERVAL ? MINUTE) " +
                "AND DATE_ADD(booking_datetime, INTERVAL duration_minute MINUTE) > ?";
        try (Connection c = Db.getConnection(); PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setLong(1, operatorId);
            ps.setString(2, startDateTime);
            ps.setInt(3, durationMinute == null ? 60 : durationMinute);
            ps.setString(4, startDateTime);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return rs.getInt(1) > 0;
            }
            return false;
        } catch (SQLException e) {
            throw new RuntimeException("DB overlap check error", e);
        }
    }
}
