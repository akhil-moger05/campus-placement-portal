export type UserRole = 'ADMIN' | 'STUDENT' | 'COMPANY';

export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED';

export type DriveStage = 'APPLIED' | 'APTITUDE' | 'TECHNICAL' | 'HR' | 'SELECTED';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface StudentProfile {
  id: number;
  userId: number;
  name: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  graduationYear: number;
  skills: string[];
  resumeUrl: string;
  phone: string;
  isPlaced: boolean;
  placedCompany?: string;
  placedPackage?: number; // in LPA
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  website: string;
  location: string;
  description: string;
  contactEmail: string;
  logoUrl?: string;
  totalHiredCount: number;
}

export interface Drive {
  id: number;
  companyId: number;
  companyName: string;
  roleTitle: string;
  jobDescription: string;
  packageLpa: number; // e.g. 14.5 LPA
  eligibleBranches: string[]; // e.g. ['CSE', 'IT', 'ECE']
  minCgpa: number;
  driveDate: string; // ISO date string
  lastDateToApply: string; // ISO date string
  location: string;
  jobType: 'Full-time' | 'Internship' | 'Intern + PPO';
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  totalApplicants?: number;
  stages: DriveStage[];
}

export interface Application {
  id: number;
  driveId: number;
  studentId: number;
  studentName: string;
  studentRoll: string;
  studentBranch: string;
  studentCgpa: number;
  studentResumeUrl: string;
  companyName: string;
  roleTitle: string;
  packageLpa: number;
  appliedDate: string;
  currentStage: DriveStage;
  status: ApplicationStatus;
  feedbackOrRemarks?: string;
  lastUpdatedDate: string;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  isRead: boolean;
  createdAt: string;
  linkAction?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalDrives: number;
  placedStudents: number;
  placementPercentage: number;
  totalCompanies: number;
  averagePackageLpa: number;
  highestPackageLpa: number;
  ongoingDrivesCount: number;
}
