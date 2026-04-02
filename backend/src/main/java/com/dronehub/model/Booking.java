package com.dronehub.model;

import java.time.LocalDateTime;

public class Booking {
    private Long id;
    private String bookingCode;
    private Long customerId;
    private Long serviceId;
    private Long operatorId;
    private LocalDateTime bookingDateTime;
    private Integer durationMinute;
    private String locationText;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBookingCode() { return bookingCode; }
    public void setBookingCode(String bookingCode) { this.bookingCode = bookingCode; }
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public Long getOperatorId() { return operatorId; }
    public void setOperatorId(Long operatorId) { this.operatorId = operatorId; }
    public LocalDateTime getBookingDateTime() { return bookingDateTime; }
    public void setBookingDateTime(LocalDateTime bookingDateTime) { this.bookingDateTime = bookingDateTime; }
    public Integer getDurationMinute() { return durationMinute; }
    public void setDurationMinute(Integer durationMinute) { this.durationMinute = durationMinute; }
    public String getLocationText() { return locationText; }
    public void setLocationText(String locationText) { this.locationText = locationText; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
