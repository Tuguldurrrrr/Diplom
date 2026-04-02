CREATE DATABASE IF NOT EXISTS dronehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dronehub_db;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_code VARCHAR(30) NOT NULL UNIQUE,
  role_name VARCHAR(60) NOT NULL
);

INSERT INTO roles(role_code, role_name) VALUES
('CUSTOMER', 'Customer'),
('OPERATOR', 'Operator'),
('CONTENT_MANAGER', 'Content Manager'),
('ADMIN', 'Admin');

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('ACTIVE','INACTIVE','BLOCKED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE services (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  operator_id BIGINT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  location VARCHAR(180) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  duration_minute INT DEFAULT 60,
  thumbnail_url VARCHAR(255),
  approval_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_services_operator FOREIGN KEY (operator_id) REFERENCES users(id)
);

CREATE TABLE bookings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(30) NOT NULL UNIQUE,
  customer_id BIGINT NOT NULL,
  service_id BIGINT NOT NULL,
  operator_id BIGINT,
  booking_datetime DATETIME NOT NULL,
  duration_minute INT DEFAULT 60,
  location_text VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  note TEXT,
  status ENUM('PENDING','CONFIRMED','ASSIGNED','IN_PROGRESS','COMPLETED','CANCELLED','REJECTED') DEFAULT 'PENDING',
  approved_by BIGINT,
  approved_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_customer FOREIGN KEY (customer_id) REFERENCES users(id),
  CONSTRAINT fk_bookings_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT fk_bookings_operator FOREIGN KEY (operator_id) REFERENCES users(id),
  CONSTRAINT fk_bookings_admin FOREIGN KEY (approved_by) REFERENCES users(id)
);

CREATE TABLE booking_files (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT NOT NULL,
  uploaded_by BIGINT NOT NULL,
  file_name VARCHAR(180) NOT NULL,
  file_type ENUM('PHOTO','VIDEO','OTHER') DEFAULT 'PHOTO',
  mime_type VARCHAR(100),
  file_size BIGINT,
  file_path VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_booking_files_booking FOREIGN KEY (booking_id) REFERENCES bookings(id),
  CONSTRAINT fk_booking_files_user FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE service_reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  service_id BIGINT NOT NULL,
  reviewer_id BIGINT NOT NULL,
  decision ENUM('APPROVED','REJECTED') NOT NULL,
  comment TEXT,
  reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_service_reviews_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT fk_service_reviews_user FOREIGN KEY (reviewer_id) REFERENCES users(id)
);

CREATE TABLE audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  actor_id BIGINT,
  action_name VARCHAR(100) NOT NULL,
  entity_name VARCHAR(60) NOT NULL,
  entity_id VARCHAR(60) NOT NULL,
  detail_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_logs_user FOREIGN KEY (actor_id) REFERENCES users(id)
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_datetime ON bookings(booking_datetime);
CREATE INDEX idx_services_status ON services(approval_status);
