CREATE DATABASE IF NOT EXISTS dronehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dronehub_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Customer','Operator','Admin','ContentManager') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  location VARCHAR(180) NOT NULL,
  status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  service_id INT NOT NULL,
  operator_id INT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  note TEXT,
  status ENUM('Pending','Confirmed','Assigned','In Progress','Completed','Rejected') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id),
  FOREIGN KEY (operator_id) REFERENCES users(id)
);

CREATE TABLE booking_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  file_name VARCHAR(200) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  uploaded_by INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Тайлангийн жишээ query
-- SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total_bookings FROM bookings GROUP BY DATE_FORMAT(created_at, '%Y-%m');
