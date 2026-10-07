export interface CodeFile {
  path: string;
  filename: string;
  language: string;
  category: 'CONFIG' | 'DATABASE' | 'ENTITY' | 'REPOSITORY' | 'SERVICE' | 'CONTROLLER' | 'SECURITY' | 'DTO' | 'DOCS';
  description: string;
  content: string;
}

export const BACKEND_FILES: CodeFile[] = [
  {
    path: 'pom.xml',
    filename: 'pom.xml',
    language: 'xml',
    category: 'CONFIG',
    description: 'Maven Project Object Model with Java 17, Spring Boot 3.2, Spring Security, JWT, Spring Data JPA, and MySQL Driver',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/>
    </parent>
    <groupId>com.campus</groupId>
    <artifactId>placement-portal</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>placement-portal</name>
    <description>Campus Placement Portal &amp; Drive Tracker REST API Backend</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.11.5</jjwt.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JJWT (Java JWT) -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    filename: 'application.properties',
    language: 'properties',
    category: 'CONFIG',
    description: 'Spring Boot Database and JWT Configuration for MySQL',
    content: `# Server Port
server.port=8080

# MySQL Database DataSource Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/campus_placement_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=rootpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT Configuration
app.jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
app.jwt.expiration-ms=86400000

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173`
  },
  {
    path: 'src/main/resources/schema.sql',
    filename: 'schema.sql',
    language: 'sql',
    category: 'DATABASE',
    description: 'Production MySQL DDL Schema for users, profiles, companies, drives, applications, and notifications',
    content: `-- =================================================================
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
    eligible_branches VARCHAR(255) NOT NULL, -- Stored as comma-separated: 'CSE,IT,ECE'
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

-- 5. APPLICATIONS TABLE (WITH 5-STAGE DRIVE TRACKER)
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    drive_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL, -- references users.id
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  },
  {
    path: 'src/main/resources/data.sql',
    filename: 'data.sql',
    language: 'sql',
    category: 'DATABASE',
    description: 'Initial seed data for users (BCrypt encoded passwords), companies, drives, and applications',
    content: `-- SEED USERS (Password is 'password123' encoded via BCrypt: $2a$10$wN3YtN1g1.o7.VzJ...)
INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Prof. R.K. Raman', 'admin@campus.edu', '$2a$10$wN3YtN1g1.o7.VzJYx3Pqe9T5m2v4Z1u9wPqL6n0vO3zY1x5z1e2a', 'ADMIN'),
(2, 'Priya Sharma', 'priya.cse@campus.edu', '$2a$10$wN3YtN1g1.o7.VzJYx3Pqe9T5m2v4Z1u9wPqL6n0vO3zY1x5z1e2a', 'STUDENT'),
(3, 'Rahul Verma', 'rahul.ece@campus.edu', '$2a$10$wN3YtN1g1.o7.VzJYx3Pqe9T5m2v4Z1u9wPqL6n0vO3zY1x5z1e2a', 'STUDENT'),
(4, 'Ananya Roy', 'ananya.it@campus.edu', '$2a$10$wN3YtN1g1.o7.VzJYx3Pqe9T5m2v4Z1u9wPqL6n0vO3zY1x5z1e2a', 'STUDENT');

-- SEED PROFILES
INSERT INTO student_profiles (user_id, roll_number, branch, cgpa, graduation_year, skills, resume_url, phone, is_placed, placed_company, placed_package) VALUES
(2, '21CS042', 'CSE', 8.92, 2026, 'Java,Spring Boot,React,MySQL,Docker,AWS', 'https://example.com/resumes/priya.pdf', '+91 98765 43210', FALSE, NULL, NULL),
(3, '21EC028', 'ECE', 7.15, 2026, 'C++,Python,Embedded Systems,IoT,SQL', 'https://example.com/resumes/rahul.pdf', '+91 98123 45678', FALSE, NULL, NULL),
(4, '21IT015', 'IT', 9.35, 2026, 'Data Structures,Go,Microservices,Kubernetes', 'https://example.com/resumes/ananya.pdf', '+91 97654 32109', TRUE, 'Google', 32.50);

-- SEED COMPANIES
INSERT INTO companies (id, name, industry, website, location, description, contact_email) VALUES
(1, 'Google', 'Internet & Cloud Services', 'https://careers.google.com', 'Bengaluru / Hyderabad', 'Global technology leader in AI, cloud computing, and web applications.', 'campus-in@google.com'),
(2, 'Microsoft', 'Enterprise Software & Cloud', 'https://careers.microsoft.com', 'Bengaluru / Noida', 'Empowers every person and organization with Azure and software.', 'university-india@microsoft.com'),
(3, 'Amazon', 'E-commerce & AWS Cloud', 'https://amazon.jobs', 'Hyderabad / Bengaluru', 'Customer-obsessed cloud and distributed systems leader.', 'campus@amazon.com');

-- SEED DRIVES
INSERT INTO drives (id, company_id, role_title, job_description, package_lpa, eligible_branches, min_cgpa, drive_date, last_date_to_apply, location, job_type, status) VALUES
(1, 1, 'Software Development Engineer - I', 'Build scalable distributed infrastructure in Java and Go.', 32.50, 'CSE,IT,ECE', 8.00, '2026-10-18', '2026-10-15', 'Bengaluru', 'Full-time', 'ONGOING'),
(2, 2, 'Software Engineer (Azure Cloud)', 'Develop next-generation hyperscale cloud computing services.', 28.00, 'CSE,IT', 8.25, '2026-10-25', '2026-10-21', 'Bengaluru / Noida', 'Full-time', 'UPCOMING'),
(3, 3, 'SDE Intern + PPO (Summer 2027)', 'Join AWS core teams with pre-placement offer prospect.', 22.00, 'CSE,IT,ECE,EEE', 7.00, '2026-10-29', '2026-10-24', 'Hyderabad', 'Intern + PPO', 'UPCOMING');

-- SEED APPLICATIONS
INSERT INTO applications (drive_id, student_id, current_stage, status, feedback_or_remarks, applied_date) VALUES
(1, 2, 'TECHNICAL', 'SHORTLISTED', 'Aptitude cleared with 96% score. Round 1 DSA interview scheduled.', '2026-10-08'),
(3, 2, 'APPLIED', 'APPLIED', 'Application submitted. Resume under initial screening.', '2026-10-09'),
(1, 4, 'SELECTED', 'SELECTED', 'Congratulations! All rounds cleared. Official offer letter dispatched.', '2026-10-08'),
(3, 3, 'APTITUDE', 'SHORTLISTED', 'Eligible by CGPA. Online assessment link sent.', '2026-10-10');`
  },
  {
    path: 'src/main/java/com/campus/placement/entity/User.java',
    filename: 'User.java',
    language: 'java',
    category: 'ENTITY',
    description: 'JPA User entity with Role enum (ADMIN, STUDENT, COMPANY)',
    content: `package com.campus.placement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StudentProfile profile;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}`
  },
  {
    path: 'src/main/java/com/campus/placement/entity/StudentProfile.java',
    filename: 'StudentProfile.java',
    language: 'java',
    category: 'ENTITY',
    description: 'JPA StudentProfile entity storing CGPA, branch, skills, and resume',
    content: `package com.campus.placement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "roll_number", nullable = false, unique = true, length = 30)
    private String rollNumber;

    @Column(nullable = false, length = 50)
    private String branch;

    @Column(nullable = false, precision = 3, scale = 2)
    private BigDecimal cgpa;

    @Column(name = "graduation_year", nullable = false)
    private Integer graduationYear;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(name = "resume_url", length = 500)
    private String resumeUrl;

    @Column(length = 20)
    private String phone;

    @Column(name = "is_placed")
    private Boolean isPlaced = false;

    @Column(name = "placed_company", length = 100)
    private String placedCompany;

    @Column(name = "placed_package", precision = 5, scale = 2)
    private BigDecimal placedPackage;
}`
  },
  {
    path: 'src/main/java/com/campus/placement/entity/Drive.java',
    filename: 'Drive.java',
    language: 'java',
    category: 'ENTITY',
    description: 'JPA Drive entity with eligibility criteria (min CGPA, branches), date, and company relation',
    content: `package com.campus.placement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "drives")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Drive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "role_title", nullable = false, length = 150)
    private String roleTitle;

    @Column(name = "job_description", nullable = false, columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "package_lpa", nullable = false, precision = 5, scale = 2)
    private BigDecimal packageLpa;

    @Column(name = "eligible_branches", nullable = false, length = 255)
    private String eligibleBranches; // e.g. "CSE,IT,ECE"

    @Column(name = "min_cgpa", nullable = false, precision = 3, scale = 2)
    private BigDecimal minCgpa;

    @Column(name = "drive_date", nullable = false)
    private LocalDate driveDate;

    @Column(name = "last_date_to_apply", nullable = false)
    private LocalDate lastDateToApply;

    @Column(length = 150)
    private String location;

    @Column(name = "job_type", length = 50)
    private String jobType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DriveStatus status;
}`
  },
  {
    path: 'src/main/java/com/campus/placement/entity/Application.java',
    filename: 'Application.java',
    language: 'java',
    category: 'ENTITY',
    description: 'JPA Application entity tracking stages (Applied -> Aptitude -> Technical -> HR -> Selected)',
    content: `package com.campus.placement.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications",
       uniqueConstraints = {@UniqueConstraint(columnNames = {"drive_id", "student_id"})})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "drive_id", nullable = false)
    private Drive drive;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_stage", nullable = false, length = 20)
    private DriveStage currentStage; // APPLIED, APTITUDE, TECHNICAL, HR, SELECTED

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApplicationStatus status; // APPLIED, SHORTLISTED, REJECTED, SELECTED

    @Column(name = "feedback_or_remarks", columnDefinition = "TEXT")
    private String feedbackOrRemarks;

    @Column(name = "applied_date", nullable = false)
    private LocalDate appliedDate;

    @PrePersist
    protected void onApply() {
        if (this.appliedDate == null) {
            this.appliedDate = LocalDate.now();
        }
        if (this.currentStage == null) {
            this.currentStage = DriveStage.APPLIED;
        }
        if (this.status == null) {
            this.status = ApplicationStatus.APPLIED;
        }
    }
}`
  },
  {
    path: 'src/main/java/com/campus/placement/controller/DriveController.java',
    filename: 'DriveController.java',
    language: 'java',
    category: 'CONTROLLER',
    description: 'REST Controller for Drive Management and Eligibility-Checked Drive Queries',
    content: `package com.campus.placement.controller;

import com.campus.placement.dto.DriveDto;
import com.campus.placement.service.DriveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/drives")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DriveController {

    private final DriveService driveService;

    @GetMapping
    public ResponseEntity<List<DriveDto>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriveDto> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<DriveDto> createDrive(@Valid @RequestBody DriveDto driveDto) {
        return ResponseEntity.ok(driveService.createDrive(driveDto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<DriveDto> updateDrive(@PathVariable Long id, @Valid @RequestBody DriveDto driveDto) {
        return ResponseEntity.ok(driveService.updateDrive(id, driveDto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/campus/placement/controller/ApplicationController.java',
    filename: 'ApplicationController.java',
    language: 'java',
    category: 'CONTROLLER',
    description: 'REST Controller for Applying to Drives (with Eligibility checks) and Admin Stage Updates',
    content: `package com.campus.placement.controller;

import com.campus.placement.dto.ApplicationDto;
import com.campus.placement.dto.StageUpdateDto;
import com.campus.placement.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/apply/{driveId}")
    public ResponseEntity<ApplicationDto> applyToDrive(
            @PathVariable Long driveId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.applyToDrive(driveId, userDetails.getUsername()));
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my")
    public ResponseEntity<List<ApplicationDto>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.getStudentApplications(userDetails.getUsername()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/drive/{driveId}")
    public ResponseEntity<List<ApplicationDto>> getApplicationsByDrive(@PathVariable Long driveId) {
        return ResponseEntity.ok(applicationService.getApplicationsByDrive(driveId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{applicationId}/stage")
    public ResponseEntity<ApplicationDto> updateStage(
            @PathVariable Long applicationId,
            @Valid @RequestBody StageUpdateDto updateDto) {
        return ResponseEntity.ok(applicationService.updateStage(applicationId, updateDto));
    }
}`
  },
  {
    path: 'src/main/java/com/campus/placement/service/impl/ApplicationServiceImpl.java',
    filename: 'ApplicationServiceImpl.java',
    language: 'java',
    category: 'SERVICE',
    description: 'Application Service implementing eligibility criteria validation (CGPA + Branch) and Stage Progression',
    content: `package com.campus.placement.service.impl;

import com.campus.placement.dto.ApplicationDto;
import com.campus.placement.dto.StageUpdateDto;
import com.campus.placement.entity.*;
import com.campus.placement.repository.*;
import com.campus.placement.service.ApplicationService;
import com.campus.placement.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final DriveRepository driveRepository;
    private final UserRepository userRepository;
    private final StudentProfileRepository profileRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public ApplicationDto applyToDrive(Long driveId, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student user not found"));

        StudentProfile profile = profileRepository.findByUser(student)
                .orElseThrow(() -> new RuntimeException("Please complete your profile before applying"));

        Drive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive not found"));

        // 1. Eligibility Check: CGPA
        if (profile.getCgpa().compareTo(drive.getMinCgpa()) < 0) {
            throw new IllegalArgumentException("Ineligible: Your CGPA (" + profile.getCgpa() + 
                    ") is below minimum requirement (" + drive.getMinCgpa() + ")");
        }

        // 2. Eligibility Check: Branch
        List<String> allowedBranches = Arrays.stream(drive.getEligibleBranches().split(","))
                .map(String::trim)
                .toList();
        if (!allowedBranches.contains(profile.getBranch())) {
            throw new IllegalArgumentException("Ineligible: Branch " + profile.getBranch() + 
                    " is not in eligible branches (" + drive.getEligibleBranches() + ")");
        }

        // 3. Check Deadline
        if (LocalDate.now().isAfter(drive.getLastDateToApply())) {
            throw new IllegalArgumentException("Application deadline has passed (" + drive.getLastDateToApply() + ")");
        }

        // 4. Check already applied
        if (applicationRepository.existsByDriveAndStudent(drive, student)) {
            throw new IllegalStateException("You have already applied to this drive");
        }

        Application application = Application.builder()
                .drive(drive)
                .student(student)
                .currentStage(DriveStage.APPLIED)
                .status(ApplicationStatus.APPLIED)
                .feedbackOrRemarks("Application submitted successfully. Awaiting screening.")
                .appliedDate(LocalDate.now())
                .build();

        Application saved = applicationRepository.save(application);

        // Notify Student
        notificationService.sendNotification(student.getId(), 
                "Application Received: " + drive.getCompany().getName(),
                "You have successfully applied for " + drive.getRoleTitle() + ". Best of luck!",
                NotificationType.SUCCESS);

        return mapToDto(saved);
    }

    @Override
    @Transactional
    public ApplicationDto updateStage(Long applicationId, StageUpdateDto dto) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setCurrentStage(dto.getStage());
        app.setStatus(dto.getStatus());
        app.setFeedbackOrRemarks(dto.getRemarks());

        // If selected, automatically mark student profile as placed!
        if (dto.getStage() == DriveStage.SELECTED && dto.getStatus() == ApplicationStatus.SELECTED) {
            StudentProfile profile = profileRepository.findByUser(app.getStudent()).orElse(null);
            if (profile != null) {
                profile.setIsPlaced(true);
                profile.setPlacedCompany(app.getDrive().getCompany().getName());
                profile.setPlacedPackage(app.getDrive().getPackageLpa());
                profileRepository.save(profile);
            }
        }

        Application updated = applicationRepository.save(app);

        // Notify Student of Live Stage Update
        notificationService.sendNotification(app.getStudent().getId(),
                "Drive Stage Update: " + app.getDrive().getCompany().getName(),
                "Your application stage updated to " + dto.getStage() + " (" + dto.getStatus() + "). Remarks: " + dto.getRemarks(),
                dto.getStatus() == ApplicationStatus.SELECTED ? NotificationType.SUCCESS : NotificationType.INFO);

        return mapToDto(updated);
    }

    private ApplicationDto mapToDto(Application a) {
        // Mapping implementation
        return ApplicationDto.builder()
                .id(a.getId())
                .driveId(a.getDrive().getId())
                .companyName(a.getDrive().getCompany().getName())
                .roleTitle(a.getDrive().getRoleTitle())
                .packageLpa(a.getDrive().getPackageLpa())
                .currentStage(a.getCurrentStage())
                .status(a.getStatus())
                .feedbackOrRemarks(a.getFeedbackOrRemarks())
                .appliedDate(a.getAppliedDate())
                .build();
    }
}`
  },
  {
    path: 'src/main/java/com/campus/placement/security/SecurityConfig.java',
    filename: 'SecurityConfig.java',
    language: 'java',
    category: 'SECURITY',
    description: 'Spring Security 6 configuration with stateless JWT authentication filter and role authorizations',
    content: `package com.campus.placement.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configure(http))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/drives/**").permitAll() // Public read
                .requestMatchers("/api/companies/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/student/**").hasRole("STUDENT")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}`
  },
  {
    path: 'README.md',
    filename: 'README.md',
    language: 'markdown',
    category: 'DOCS',
    description: 'Complete setup guide, database initialization, Maven commands, and REST API directory',
    content: `# Campus Placement Portal & Drive Tracker

A full-stack, enterprise-grade Campus Placement and Drive Tracking System built with **Java 17, Spring Boot 3, Spring Security + JWT, Spring Data JPA, MySQL**, and **React 19 + Tailwind CSS**.

---

## 🏗️ Architecture & Folder Structure

\`\`\`
placement-portal/
├── backend/
│   ├── src/main/java/com/campus/placement/
│   │   ├── config/              # SecurityConfig, CorsConfig
│   │   ├── controller/          # REST Endpoints (Auth, Student, Admin, Drive, Company)
│   │   ├── dto/                 # Request & Response Data Transfer Objects
│   │   ├── entity/              # JPA Entities (User, StudentProfile, Company, Drive, Application, Notification)
│   │   ├── repository/          # Spring Data JPA Repositories
│   │   ├── security/            # JWT Token Provider, Auth Filter, UserDetailsService
│   │   └── service/             # Business Logic & Eligibility Verifications
│   └── src/main/resources/
│       ├── application.properties
│       ├── schema.sql           # MySQL DDL Schema
│       └── data.sql             # Seed Data
│   └── pom.xml                  # Maven Build Descriptor
└── frontend/                    # React (Vite) + Tailwind CSS SPA
    ├── src/
    │   ├── components/          # Reusable UI widgets, Modals, Stage Stepper
    │   ├── pages/               # Student Dashboard, Admin Portal, Drive Catalog
    │   ├── services/            # REST API Client with JWT Bearer Token
    │   └── types/               # TypeScript Definitions
\`\`\`

---

## 🚀 How to Run the Project

### Prerequisites
1. **Java JDK 17+**
2. **Apache Maven 3.8+**
3. **MySQL Server 8.0+**
4. **Node.js 18+ & npm**

### Step 1: Database Setup (MySQL)
Open your MySQL terminal or MySQL Workbench:
\`\`\`sql
CREATE DATABASE campus_placement_db;
\`\`\`
Import the provided \`schema.sql\` and \`data.sql\` located in \`backend/src/main/resources/\`.

### Step 2: Run Spring Boot Backend
1. Open \`backend/src/main/resources/application.properties\` and verify your MySQL credentials:
   \`\`\`properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   \`\`\`
2. Navigate to the backend directory and run:
   \`\`\`bash
   mvn clean install
   mvn spring-boot:run
   \`\`\`
   The API will start at \`http://localhost:8080\`.

### Step 3: Run React Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`
Open \`http://localhost:3000\` in your browser.

---

## 🔑 Default Seed Credentials
- **Admin (Placement Officer):** \`admin@campus.edu\` / \`password123\`
- **Student (CSE - 8.92 CGPA):** \`priya.cse@campus.edu\` / \`password123\`
- **Student (ECE - 7.15 CGPA):** \`rahul.ece@campus.edu\` / \`password123\`
- **Company Recruiter (Google):** \`recruiter@google.com\` / \`password123\`

---

## 📡 REST API Reference

| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | \`/api/auth/login\` | Public | Authenticate user & return JWT token |
| POST | \`/api/auth/register\` | Public | Student registration |
| GET | \`/api/drives\` | Public | View all placement drives |
| GET | \`/api/drives/{id}\` | Public | Get single drive details |
| POST | \`/api/applications/apply/{driveId}\` | Student | Apply to drive (enforces CGPA & branch check) |
| GET | \`/api/applications/my\` | Student | View student's applications & live stage |
| GET | \`/api/student/profile\` | Student | Get current student profile |
| PUT | \`/api/student/profile\` | Student | Update CGPA, skills, resume link |
| GET | \`/api/admin/stats\` | Admin | Placement stats (% placed, total drives, offers) |
| POST | \`/api/admin/drives\` | Admin | Create new placement drive |
| PUT | \`/api/admin/drives/{id}\` | Admin | Edit existing drive |
| DELETE | \`/api/admin/drives/{id}\` | Admin | Delete placement drive |
| GET | \`/api/admin/applications/drive/{id}\` | Admin | View all applicants for a drive |
| PUT | \`/api/admin/applications/{id}/stage\` | Admin | Move student stage (Applied → Aptitude → Technical → HR → Selected) |
| POST | \`/api/companies\` | Admin | Add hiring company |
| GET | \`/api/notifications\` | Authenticated | Fetch user notifications |
`
  }
];
