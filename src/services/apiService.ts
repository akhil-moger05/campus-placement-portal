import { User, StudentProfile, Company, Drive, Application, Notification, DashboardStats, DriveStage, ApplicationStatus } from '../types';
import { INITIAL_USERS, INITIAL_PROFILES, INITIAL_COMPANIES, INITIAL_DRIVES, INITIAL_APPLICATIONS, INITIAL_NOTIFICATIONS } from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'cpp_users',
  PROFILES: 'cpp_profiles',
  COMPANIES: 'cpp_companies',
  DRIVES: 'cpp_drives',
  APPLICATIONS: 'cpp_applications',
  NOTIFICATIONS: 'cpp_notifications',
  CURRENT_USER: 'cpp_current_user',
};

class ApiService {
  constructor() {
    this.initData();
  }

  private initData() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILES)) {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPANIES)) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DRIVES)) {
      localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(INITIAL_DRIVES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      // Default to Student Priya Sharma for instant review, or Admin
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[1]));
    }
  }

  public resetToDefaultSeed(): void {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(INITIAL_PROFILES));
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(INITIAL_DRIVES));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[1]));
  }

  // --- Auth & Users ---
  public getUsers(): User[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }

  public getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  public login(email: string): { user: User; token: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('User not found with email: ' + email);
    }
    this.setCurrentUser(user);
    const mockJwt = 'mock-jwt-token-header.' + btoa(JSON.stringify({ sub: user.email, role: user.role })) + '.mock-signature';
    return { user, token: mockJwt };
  }

  public registerStudent(data: {
    name: string;
    email: string;
    rollNumber: string;
    branch: string;
    cgpa: number;
    graduationYear: number;
    skills: string[];
    resumeUrl: string;
    phone: string;
  }): { user: User; profile: StudentProfile; token: string } {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('Email is already registered');
    }

    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
    };

    const newProfile: StudentProfile = {
      id: Date.now(),
      userId: newUser.id,
      name: data.name,
      rollNumber: data.rollNumber,
      branch: data.branch,
      cgpa: data.cgpa,
      graduationYear: data.graduationYear,
      skills: data.skills,
      resumeUrl: data.resumeUrl,
      phone: data.phone,
      isPlaced: false,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const profiles = this.getProfiles();
    profiles.push(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

    this.setCurrentUser(newUser);

    this.addNotification({
      userId: newUser.id,
      title: 'Welcome to Campus Placement Portal',
      message: 'Your profile has been created successfully. Explore upcoming placement drives and check your eligibility.',
      type: 'INFO',
    });

    const token = 'mock-jwt-token.' + btoa(JSON.stringify({ sub: newUser.email, role: 'STUDENT' })) + '.sig';
    return { user: newUser, profile: newProfile, token };
  }

  // --- Profiles ---
  public getProfiles(): StudentProfile[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILES) || '[]');
  }

  public getProfileByUserId(userId: number): StudentProfile | null {
    const profiles = this.getProfiles();
    return profiles.find(p => p.userId === userId) || null;
  }

  public updateProfile(userId: number, updates: Partial<StudentProfile>): StudentProfile {
    const profiles = this.getProfiles();
    const index = profiles.findIndex(p => p.userId === userId);
    if (index === -1) {
      throw new Error('Profile not found');
    }

    profiles[index] = { ...profiles[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

    // Also update studentName in user if modified
    if (updates.name) {
      const users = this.getUsers();
      const uIndex = users.findIndex(u => u.id === userId);
      if (uIndex !== -1) {
        users[uIndex].name = updates.name;
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        if (this.getCurrentUser()?.id === userId) {
          this.setCurrentUser(users[uIndex]);
        }
      }
    }

    return profiles[index];
  }

  // --- Companies ---
  public getCompanies(): Company[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPANIES) || '[]');
  }

  public addCompany(data: Omit<Company, 'id' | 'totalHiredCount'>): Company {
    const companies = this.getCompanies();
    const newCompany: Company = {
      ...data,
      id: Date.now(),
      totalHiredCount: 0,
    };
    companies.push(newCompany);
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
    return newCompany;
  }

  public updateCompany(id: number, data: Partial<Company>): Company {
    const companies = this.getCompanies();
    const index = companies.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Company not found');
    companies[index] = { ...companies[index], ...data };
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
    return companies[index];
  }

  public deleteCompany(id: number): void {
    const companies = this.getCompanies().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }

  // --- Drives ---
  public getDrives(): Drive[] {
    const drives: Drive[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRIVES) || '[]');
    const apps = this.getApplications();
    // dynamically compute applicant count
    return drives.map(d => ({
      ...d,
      totalApplicants: apps.filter(a => a.driveId === d.id).length,
    }));
  }

  public getDriveById(id: number): Drive | undefined {
    return this.getDrives().find(d => d.id === id);
  }

  public addDrive(data: Omit<Drive, 'id' | 'totalApplicants'>): Drive {
    const drives = this.getDrives();
    const newDrive: Drive = {
      ...data,
      id: Date.now(),
      totalApplicants: 0,
      stages: ['APPLIED', 'APTITUDE', 'TECHNICAL', 'HR', 'SELECTED'],
    };
    drives.push(newDrive);
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));

    // Broadcast notification to all students
    const students = this.getUsers().filter(u => u.role === 'STUDENT');
    students.forEach(st => {
      this.addNotification({
        userId: st.id,
        title: `New Placement Drive: ${newDrive.companyName}`,
        message: `${newDrive.companyName} is hiring for ${newDrive.roleTitle} (${newDrive.packageLpa} LPA). Check your eligibility now!`,
        type: 'INFO',
        linkAction: 'drives',
      });
    });

    return newDrive;
  }

  public updateDrive(id: number, data: Partial<Drive>): Drive {
    const drives = this.getDrives();
    const index = drives.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Drive not found');
    drives[index] = { ...drives[index], ...data };
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
    return drives[index];
  }

  public deleteDrive(id: number): void {
    const drives = this.getDrives().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
    // Also remove associated applications
    const apps = this.getApplications().filter(a => a.driveId !== id);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  }

  // --- Eligibility Check Helper ---
  public checkEligibility(studentProfile: StudentProfile | null, drive: Drive): {
    isEligible: boolean;
    reasons: string[];
    cgpaMet: boolean;
    branchMet: boolean;
    deadlineMet: boolean;
  } {
    if (!studentProfile) {
      return {
        isEligible: false,
        reasons: ['Please complete your student profile first.'],
        cgpaMet: false,
        branchMet: false,
        deadlineMet: false,
      };
    }

    const reasons: string[] = [];
    const cgpaMet = studentProfile.cgpa >= drive.minCgpa;
    if (!cgpaMet) {
      reasons.push(`Minimum CGPA requirement is ${drive.minCgpa.toFixed(2)}, but yours is ${studentProfile.cgpa.toFixed(2)}.`);
    }

    const branchMet = drive.eligibleBranches.includes(studentProfile.branch);
    if (!branchMet) {
      reasons.push(`Branch '${studentProfile.branch}' is not eligible (Allowed: ${drive.eligibleBranches.join(', ')}).`);
    }

    const today = new Date().toISOString().split('T')[0];
    const deadlineMet = today <= drive.lastDateToApply;
    if (!deadlineMet) {
      reasons.push(`Application deadline expired on ${drive.lastDateToApply}.`);
    }

    return {
      isEligible: cgpaMet && branchMet && deadlineMet,
      reasons,
      cgpaMet,
      branchMet,
      deadlineMet,
    };
  }

  // --- Applications ---
  public getApplications(): Application[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
  }

  public getApplicationsByStudent(studentUserId: number): Application[] {
    return this.getApplications().filter(a => a.studentId === studentUserId);
  }

  public getApplicationsByDrive(driveId: number): Application[] {
    return this.getApplications().filter(a => a.driveId === driveId);
  }

  public applyToDrive(studentUserId: number, driveId: number): Application {
    const profile = this.getProfileByUserId(studentUserId);
    const drive = this.getDriveById(driveId);
    if (!drive) throw new Error('Placement drive does not exist.');
    if (!profile) throw new Error('Student profile not found. Please complete profile.');

    // Enforce Eligibility
    const eligibility = this.checkEligibility(profile, drive);
    if (!eligibility.isEligible) {
      throw new Error(`Ineligible to apply: ${eligibility.reasons.join(' ')}`);
    }

    const applications = this.getApplications();
    const existing = applications.find(a => a.driveId === driveId && a.studentId === studentUserId);
    if (existing) {
      throw new Error('You have already applied for this drive.');
    }

    const newApp: Application = {
      id: Date.now(),
      driveId: drive.id,
      studentId: studentUserId,
      studentName: profile.name,
      studentRoll: profile.rollNumber,
      studentBranch: profile.branch,
      studentCgpa: profile.cgpa,
      studentResumeUrl: profile.resumeUrl,
      companyName: drive.companyName,
      roleTitle: drive.roleTitle,
      packageLpa: drive.packageLpa,
      appliedDate: new Date().toISOString().split('T')[0],
      currentStage: 'APPLIED',
      status: 'APPLIED',
      feedbackOrRemarks: 'Application submitted successfully. Awaiting screening.',
      lastUpdatedDate: new Date().toISOString().split('T')[0],
    };

    applications.push(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));

    // Notify Student
    this.addNotification({
      userId: studentUserId,
      title: `Applied to ${drive.companyName}`,
      message: `Your application for ${drive.roleTitle} was successfully submitted! Best of luck!`,
      type: 'SUCCESS',
      linkAction: 'tracker',
    });

    return newApp;
  }

  public updateApplicationStage(
    applicationId: number,
    newStage: DriveStage,
    newStatus: ApplicationStatus,
    feedbackOrRemarks?: string
  ): Application {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === applicationId);
    if (index === -1) throw new Error('Application not found');

    apps[index].currentStage = newStage;
    apps[index].status = newStatus;
    if (feedbackOrRemarks !== undefined) {
      apps[index].feedbackOrRemarks = feedbackOrRemarks;
    }
    apps[index].lastUpdatedDate = new Date().toISOString().split('T')[0];

    // If SELECTED, update student profile as placed and update company hired count!
    if (newStage === 'SELECTED' && newStatus === 'SELECTED') {
      const studentId = apps[index].studentId;
      const profiles = this.getProfiles();
      const pIndex = profiles.findIndex(p => p.userId === studentId);
      if (pIndex !== -1) {
        profiles[pIndex].isPlaced = true;
        profiles[pIndex].placedCompany = apps[index].companyName;
        profiles[pIndex].placedPackage = apps[index].packageLpa;
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
      }

      // Update company hired count
      const companies = this.getCompanies();
      const cIndex = companies.findIndex(c => c.name.toLowerCase() === apps[index].companyName.toLowerCase());
      if (cIndex !== -1) {
        companies[cIndex].totalHiredCount = (companies[cIndex].totalHiredCount || 0) + 1;
        localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
      }
    }

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

    // Notify student of stage progression
    this.addNotification({
      userId: apps[index].studentId,
      title: `Stage Update: ${apps[index].companyName}`,
      message: `Your application moved to [${newStage}] stage (${newStatus}). ${feedbackOrRemarks ? `Remarks: ${feedbackOrRemarks}` : ''}`,
      type: newStatus === 'SELECTED' ? 'SUCCESS' : newStatus === 'REJECTED' ? 'ALERT' : 'INFO',
      linkAction: 'tracker',
    });

    return apps[index];
  }

  // --- Notifications ---
  public getNotifications(userId: number): Notification[] {
    const notifs: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    return notifs
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addNotification(data: {
    userId: number;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
    linkAction?: string;
  }): Notification {
    const notifs: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const newNotif: Notification = {
      ...data,
      id: Date.now(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    return newNotif;
  }

  public markNotificationAsRead(id: number): void {
    const notifs: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const index = notifs.findIndex(n => n.id === id);
    if (index !== -1) {
      notifs[index].isRead = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    }
  }

  public markAllNotificationsAsRead(userId: number): void {
    const notifs: Notification[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    notifs.forEach(n => {
      if (n.userId === userId) n.isRead = true;
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  // --- Dashboard Statistics ---
  public getDashboardStats(): DashboardStats {
    const students = this.getUsers().filter(u => u.role === 'STUDENT');
    const profiles = this.getProfiles();
    const drives = this.getDrives();
    const companies = this.getCompanies();
    const apps = this.getApplications();

    const placedStudents = profiles.filter(p => p.isPlaced).length;
    const totalStudents = students.length;
    const placementPercentage = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;

    const placedPackages = profiles.filter(p => p.isPlaced && p.placedPackage).map(p => p.placedPackage as number);
    const highestPackageLpa = placedPackages.length > 0 ? Math.max(...placedPackages) : 0;
    const averagePackageLpa = placedPackages.length > 0
      ? Number((placedPackages.reduce((a, b) => a + b, 0) / placedPackages.length).toFixed(1))
      : 0;

    const ongoingDrivesCount = drives.filter(d => d.status === 'ONGOING').length;

    return {
      totalStudents,
      totalDrives: drives.length,
      placedStudents,
      placementPercentage,
      totalCompanies: companies.length,
      averagePackageLpa,
      highestPackageLpa,
      ongoingDrivesCount,
    };
  }
}

export const apiService = new ApiService();
