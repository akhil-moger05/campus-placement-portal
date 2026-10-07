-- =================================================================
-- CAMPUS PLACEMENT PORTAL & DRIVE TRACKER - MYSQL SCHEMA
-- =================================================================

CREATE DATABASE IF NOT EXISTS campus_placement_db;
USE campus_placement_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STUDENT', 'COMPANY') NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. STUDENT PROFILES TABLE
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    roll_number VARCHAR(30) NOT NULL UNIQUE,
    branch VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3, 2) NOT NULL,
    graduation_year INT NOT NULL,
    skills TEXT,
    resume_url VARCHAR(500),
    phone VARCHAR(20),
    is_placed BOOLEAN DEFAULT FALSE,
    placed_company VARCHAR(100),
    placed_package DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_profile_branch (branch),
    INDEX idx_profile_cgpa (cgpa),
    INDEX idx_profile_placed (is_placed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    location VARCHAR(150),
    description TEXT,
    contact_email VARCHAR(120),
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. DRIVES TABLE
CREATE TABLE IF NOT EXISTS drives (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    role_title VARCHAR(150) NOT NULL,
    job_description TEXT NOT NULL,
    package_lpa DECIMAL(5, 2) NOT NULL,
    eligible_branches VARCHAR(255) NOT NULL,
    min_cgpa DECIMAL(3, 2) NOT NULL,
    drive_date DATE NOT NULL,
    last_date_to_apply DATE NOT NULL,
    location VARCHAR(150),
    job_type VARCHAR(50) DEFAULT 'Full-time',
    status ENUM('UPCOMING', 'ONGOING', 'COMPLETED') DEFAULT 'UPCOMING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_drive_company FOREIGN KEY (company_id) REFERENCES companies (id) ON DELETE CASCADE,
    INDEX idx_drive_status (status),
    INDEX idx_drive_min_cgpa (min_cgpa),
    INDEX idx_drive_date (drive_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. APPLICATIONS TABLE (5-STAGE DRIVE TRACKER)
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    drive_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    current_stage ENUM('APPLIED', 'APTITUDE', 'TECHNICAL', 'HR', 'SELECTED') NOT NULL DEFAULT 'APPLIED',
    status ENUM('APPLIED', 'SHORTLISTED', 'REJECTED', 'SELECTED') NOT NULL DEFAULT 'APPLIED',
    feedback_or_remarks TEXT,
    applied_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_app_drive FOREIGN KEY (drive_id) REFERENCES drives (id) ON DELETE CASCADE,
    CONSTRAINT fk_app_student FOREIGN KEY (student_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE KEY uq_student_drive (drive_id, student_id),
    INDEX idx_app_stage (current_stage),
    INDEX idx_app_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('INFO', 'SUCCESS', 'WARNING', 'ALERT') DEFAULT 'INFO',
    is_read BOOLEAN DEFAULT FALSE,
    link_action VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_notif_user_read (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
