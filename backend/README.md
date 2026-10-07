# Campus Placement Portal & Drive Tracker (Java 17 + Spring Boot + MySQL)

A complete campus recruitment management solution built with:
- **Backend**: Java 17, Spring Boot 3.2, Spring Security 6, JWT, Spring Data JPA, Hibernate
- **Database**: MySQL 8.0+
- **Frontend**: React 19, Vite, Tailwind CSS
- **Build Tools**: Maven, npm

---

## 📁 Project Architecture & Folder Layout

```
campus-placement-portal/
├── backend/
│   ├── src/main/java/com/campus/placement/
│   │   ├── config/              # SecurityConfig, CorsConfig
│   │   ├── controller/          # REST Endpoints (Auth, Student, Admin, Drive, Company)
│   │   ├── dto/                 # Request/Response Data Transfer Objects
│   │   ├── entity/              # JPA Entities (User, StudentProfile, Company, Drive, Application, Notification)
│   │   ├── repository/          # Spring Data JPA Repositories
│   │   ├── security/            # JwtTokenProvider, JwtAuthFilter, UserDetailsService
│   │   └── service/             # Business rules, Eligibility checkers, Stage updates
│   └── src/main/resources/
│       ├── application.properties
│       ├── schema.sql           # Complete MySQL DDL Schema
│       └── data.sql             # Seed Data
│   └── pom.xml
└── frontend/                    # Vite + React 19 SPA
```

---

## 🗄️ MySQL Database Setup

1. Login to MySQL:
   ```bash
   mysql -u root -p
   ```
2. Create and initialize the database:
   ```sql
   CREATE DATABASE campus_placement_db;
   USE campus_placement_db;
   SOURCE backend/src/main/resources/schema.sql;
   ```

---

## ⚙️ Running the Spring Boot Backend

1. Verify `backend/src/main/resources/application.properties` credentials.
2. Build with Maven:
   ```bash
   cd backend
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend REST API starts on port `8080`.

---

## 💻 Running the React Frontend

```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

---

## 👥 Demo Credentials
- **Placement Officer (Admin)**: `admin@campus.edu` / `password123`
- **Student (Eligible CSE)**: `priya.cse@campus.edu` / `password123`
- **Student (Lower CGPA ECE)**: `rahul.ece@campus.edu` / `password123`
- **Company Recruiter**: `recruiter@google.com` / `password123`

---

## 🔄 Recruitment Stage Workflow
`APPLIED` ➔ `APTITUDE` ➔ `TECHNICAL` ➔ `HR` ➔ `SELECTED`
- Admin can review all applicants per drive, verify CGPA/resume, and advance candidates.
- When an applicant reaches `SELECTED`, their profile status automatically updates to Placed with company name and CTC package.
