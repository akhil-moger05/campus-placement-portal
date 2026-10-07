# 🎓 Campus Placement Portal & Drive Tracker

A web app for colleges to manage campus placements.
Students apply to drives and track their stage. Admin manages companies, drives and results.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-planned-6DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-planned-4479A1?logo=mysql&logoColor=white)

**Live demo:** _add your link here_
---

## 📸 Screenshots

| Student Dashboard | Admin Dashboard |
|---|---|
| _add screenshot_ | _add screenshot_ |

| Drive Tracker | Drive List |
|---|---|
| _add screenshot_ | _add screenshot_ |

---

## ✨ Features

### 👨‍🎓 Student
- Register and create profile (branch, CGPA, skills, resume link)
- See all upcoming placement drives
- Apply to a drive (only if eligible by CGPA and branch)
- Track application stage live
- Get notifications

### 🧑‍💼 Admin (Placement Officer)
- Add, edit and delete companies
- Create and manage drives
- See all applicants for each drive
- Move students to the next stage
- Dashboard: total students, drives, placed students, placement %, average and highest package

### 🏢 Company
- View drives and applicants of own company

### 🔄 Drive Stages
```
APPLIED → APTITUDE → TECHNICAL → HR → SELECTED
```
When a student reaches **SELECTED**, the profile becomes **Placed** with company name and package.

---

## 🛠️ Tech Stack

| Part | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS, Vite |
| Backend (in progress) | Java 17, Spring Boot 3, Spring Security, JWT |
| Database (in progress) | MySQL 8 |
| Tools | Git, GitHub, VS Code |

---

## 📌 Project Status

| Part | Status |
|---|---|
| Frontend (all pages) | ✅ Done (demo mode, data saved in browser) |
| MySQL schema | ✅ Done |
| Spring Boot REST API | 🚧 In progress |
| JWT login | 🚧 In progress |
| Connect frontend to backend | ⏳ Planned |

---

## 🚀 Run the Frontend

**You need:** Node.js 18 or higher

```bash
git clone https://github.com/akhil-moger05/campus-placement-portal.git
cd campus-placement-portal
npm install
npm run dev
```

Open **http://localhost:3000**

---

## 🔑 Demo Logins

No password needed in demo mode.

| Role | Email |
|---|---|
| Admin | admin@campus.edu |
| Student (CSE, eligible) | priya.cse@campus.edu |
| Student (ECE, low CGPA) | rahul.ece@campus.edu |
| Company | recruiter@google.com |

**Try this flow:**
1. Login as Priya → apply to a drive
2. Login as Admin → open the drive → move Priya to the next stage
3. Login as Priya → see the new stage

---

## 🗄️ Database Tables

`users` · `student_profiles` · `companies` · `drives` · `applications` · `notifications`

Full SQL is in `backend/src/main/resources/schema.sql`

---

## 📁 Folder Structure

```
campus-placement-portal/
├── src/
│   ├── components/     # UI pages and cards
│   ├── services/       # apiService (demo mode)
│   ├── data/           # seed data
│   └── types/          # TypeScript types
├── backend/            # Spring Boot (in progress)
│   └── src/main/resources/schema.sql
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

- [x] React frontend with all pages
- [x] Eligibility check (CGPA + branch)
- [x] 5-stage drive tracker
- [x] MySQL schema
- [ ] Spring Boot entities and repositories
- [ ] JWT login with password
- [ ] REST APIs for drives, applications, stages
- [ ] Connect React to backend
- [ ] Deploy (Vercel + Render + cloud MySQL)
- [ ] Email notifications

---

## 👨‍💻 Author

**Akhil Moger**
GitHub: [@akhil-moger05](https://github.com/akhil-moger05)

---

⭐ If you like this project, give it a star.
