# Campus Placement Portal & Drive Tracker

Students apply to placement drives and track their stage. Admin manages companies, drives and results.

## Current status
- Frontend (React + Vite + Tailwind): works. Runs in **demo mode** (data saved in browser localStorage).
- Backend (Spring Boot + MySQL): **in progress**. Only the database schema and enums are done.

## Run the frontend
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Demo logins (no password check in demo mode)
- Admin: admin@campus.edu
- Student: priya.cse@campus.edu
- Student (low CGPA): rahul.ece@campus.edu
- Company: recruiter@google.com

## Stages
APPLIED → APTITUDE → TECHNICAL → HR → SELECTED

## Tech
React 19, TypeScript, Tailwind CSS, Vite. Planned backend: Java 17, Spring Boot 3, JWT, MySQL.
