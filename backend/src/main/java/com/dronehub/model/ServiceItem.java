package com.dronehub.model;

import java.math.BigDecimal;

public class ServiceItem {
    private Long id;
    private Long operatorId;
    private String title;
    private String description;
    private String location;
    private BigDecimal price;
    private Integer durationMinute;
    private String approvalStatus;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOperatorId() { return operatorId; }
    public void setOperatorId(Long operatorId) { this.operatorId = operatorId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getDurationMinute() { return durationMinute; }
    public void setDurationMinute(Integer durationMinute) { this.durationMinute = durationMinute; }
    public String getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }
}
