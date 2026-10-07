import React, { useState, useEffect } from 'react';
import { User, StudentProfile, Company, Drive, Application, Notification, DashboardStats, DriveStage, ApplicationStatus } from './types';
import { apiService } from './services/apiService';
import { Navbar } from './components/Navbar';
import { StudentDrivesCatalog } from './components/StudentDrivesCatalog';
import { StudentApplicationTracker } from './components/StudentApplicationTracker';
import { StudentProfileView } from './components/StudentProfileView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminApplicantsManager } from './components/AdminApplicantsManager';
import { AdminDrivesManager } from './components/AdminDrivesManager';
import { AdminCompaniesManager } from './components/AdminCompaniesManager';
import { CompanyPortalView } from './components/CompanyPortalView';
import { DriveDetailModal } from './components/DriveDetailModal';
import { SpringBootExplorerModal } from './components/SpringBootExplorerModal';
import { AuthModal } from './components/AuthModal';
import { CheckCircle2, AlertCircle, Info, RefreshCw, Terminal, Layers } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('drives');
  const [drives, setDrives] = useState<Drive[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Modals
  const [selectedDriveForModal, setSelectedDriveForModal] = useState<Drive | null>(null);
  const [isSpringBootModalOpen, setIsSpringBootModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'SUCCESS' | 'ERROR' | 'INFO' } | null>(null);

  const showToast = (message: string, type: 'SUCCESS' | 'ERROR' | 'INFO' = 'SUCCESS') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const refreshAllData = () => {
    const user = apiService.getCurrentUser();
    setCurrentUser(user);
    setDrives(apiService.getDrives());
    setCompanies(apiService.getCompanies());
    setApplications(apiService.getApplications());
    setProfiles(apiService.getProfiles());
    setStats(apiService.getDashboardStats());

    if (user) {
      setNotifications(apiService.getNotifications(user.id));
    } else {
      setNotifications([]);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // When currentUser changes, set default tab
  const handleSwitchUser = (email: string) => {
    try {
      const { user } = apiService.login(email);
      setCurrentUser(user);
      refreshAllData();

      if (user.role === 'ADMIN') {
        setActiveTab('admin-dashboard');
      } else if (user.role === 'COMPANY') {
        setActiveTab('company-portal');
      } else {
        setActiveTab('drives');
      }
      showToast(`Switched account to ${user.name} (${user.role})`, 'INFO');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setCurrentUser(null);
    refreshAllData();
    setIsAuthModalOpen(true);
    showToast('Logged out successfully', 'INFO');
  };

  const handleLogin = (email: string) => {
    const { user } = apiService.login(email);
    setCurrentUser(user);
    refreshAllData();
    if (user.role === 'ADMIN') {
      setActiveTab('admin-dashboard');
    } else if (user.role === 'COMPANY') {
      setActiveTab('company-portal');
    } else {
      setActiveTab('drives');
    }
    showToast(`Welcome back, ${user.name}!`, 'SUCCESS');
  };

  const handleRegister = (data: any) => {
    const { user } = apiService.registerStudent(data);
    setCurrentUser(user);
    refreshAllData();
    setActiveTab('drives');
    showToast(`Welcome ${user.name}! Profile created and eligible for campus drives.`, 'SUCCESS');
  };

  // Student Actions
  const handleApplyToDrive = (driveId: number) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    try {
      apiService.applyToDrive(currentUser.id, driveId);
      refreshAllData();
      showToast('Application submitted successfully! Track your live stage.', 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleUpdateStudentProfile = (updates: Partial<StudentProfile>) => {
    if (!currentUser) return;
    try {
      apiService.updateProfile(currentUser.id, updates);
      refreshAllData();
      showToast('Profile updated. Eligibility metrics refreshed.', 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  // Admin Actions
  const handleCreateDrive = (driveData: Omit<Drive, 'id' | 'totalApplicants'>) => {
    try {
      apiService.addDrive(driveData);
      refreshAllData();
      showToast(`Drive created for ${driveData.companyName} (${driveData.roleTitle})`, 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleUpdateDrive = (id: number, updates: Partial<Drive>) => {
    try {
      apiService.updateDrive(id, updates);
      refreshAllData();
      showToast('Drive updated successfully.', 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleDeleteDrive = (id: number) => {
    try {
      apiService.deleteDrive(id);
      refreshAllData();
      showToast('Drive deleted.', 'INFO');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleAddCompany = (data: Omit<Company, 'id' | 'totalHiredCount'>) => {
    try {
      apiService.addCompany(data);
      refreshAllData();
      showToast(`Company ${data.name} added.`, 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleUpdateCompany = (id: number, data: Partial<Company>) => {
    try {
      apiService.updateCompany(id, data);
      refreshAllData();
      showToast('Company information updated.', 'SUCCESS');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleDeleteCompany = (id: number) => {
    try {
      apiService.deleteCompany(id);
      refreshAllData();
      showToast('Company removed.', 'INFO');
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const handleUpdateApplicationStage = (
    applicationId: number,
    stage: DriveStage,
    status: ApplicationStatus,
    remarks: string
  ) => {
    try {
      apiService.updateApplicationStage(applicationId, stage, status, remarks);
      refreshAllData();
      showToast(
        status === 'SELECTED'
          ? 'Candidate marked as SELECTED! Student profile updated to placed.'
          : `Candidate advanced to ${stage} (${status})`,
        'SUCCESS'
      );
    } catch (err: any) {
      showToast(err.message, 'ERROR');
    }
  };

  const currentStudentProfile = currentUser
    ? profiles.find(p => p.userId === currentUser.id) || null
    : null;

  const studentApplications = currentUser
    ? applications.filter(a => a.studentId === currentUser.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 max-w-md animate-in slide-in-from-right-4 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 text-xs font-semibold ${
              toast.type === 'SUCCESS'
                ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
                : toast.type === 'ERROR'
                ? 'bg-rose-950 text-rose-100 border-rose-800'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            {toast.type === 'SUCCESS' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toast.type === 'ERROR' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onMarkNotificationAsRead={id => {
          apiService.markNotificationAsRead(id);
          refreshAllData();
        }}
        onMarkAllNotificationsAsRead={() => {
          if (currentUser) {
            apiService.markAllNotificationsAsRead(currentUser.id);
            refreshAllData();
          }
        }}
        onOpenSpringBootExplorer={() => setIsSpringBootModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* STUDENT VIEWS */}
        {currentUser?.role === 'STUDENT' && (
          <>
            {activeTab === 'drives' && (
              <StudentDrivesCatalog
                drives={drives}
                studentProfile={currentStudentProfile}
                studentApplications={studentApplications}
                onApply={handleApplyToDrive}
                onViewDetails={d => setSelectedDriveForModal(d)}
                onViewApplication={() => setActiveTab('tracker')}
              />
            )}

            {activeTab === 'tracker' && (
              <StudentApplicationTracker
                applications={studentApplications}
                onExploreDrives={() => setActiveTab('drives')}
              />
            )}

            {activeTab === 'profile' && (
              <StudentProfileView
                profile={currentStudentProfile}
                onUpdateProfile={handleUpdateStudentProfile}
              />
            )}
          </>
        )}

        {/* ADMIN VIEWS */}
        {currentUser?.role === 'ADMIN' && (
          <>
            {activeTab === 'admin-dashboard' && stats && (
              <AdminDashboard
                stats={stats}
                drives={drives}
                applications={applications}
                profiles={profiles}
                onNavigateTab={setActiveTab}
                onOpenCreateDrive={() => setActiveTab('admin-drives')}
                onOpenAddCompany={() => setActiveTab('admin-companies')}
              />
            )}

            {activeTab === 'admin-drives' && (
              <AdminDrivesManager
                drives={drives}
                companies={companies}
                onCreateDrive={handleCreateDrive}
                onUpdateDrive={handleUpdateDrive}
                onDeleteDrive={handleDeleteDrive}
              />
            )}

            {activeTab === 'admin-companies' && (
              <AdminCompaniesManager
                companies={companies}
                onAddCompany={handleAddCompany}
                onUpdateCompany={handleUpdateCompany}
                onDeleteCompany={handleDeleteCompany}
              />
            )}

            {activeTab === 'admin-applicants' && (
              <AdminApplicantsManager
                applications={applications}
                drives={drives}
                onUpdateStage={handleUpdateApplicationStage}
              />
            )}
          </>
        )}

        {/* COMPANY VIEW */}
        {currentUser?.role === 'COMPANY' && (
          <CompanyPortalView
            company={companies[0]}
            drives={drives}
            applications={applications}
          />
        )}

        {/* GUEST VIEW IF LOGGED OUT */}
        {!currentUser && (
          <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 text-center shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Welcome to Campus Placement Portal</h2>
            <p className="text-xs text-slate-500 mb-6">
              Sign in as an Administrator, Student, or Corporate Recruiter to manage and track campus recruitment drives.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-md"
            >
              Sign In / Choose Demo Profile
            </button>
          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">PlaceTrack Enterprise</span>
            <span>•</span>
            <span>Java 17, Spring Boot 3, Spring Security JWT &amp; MySQL</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSpringBootModalOpen(true)}
              className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Inspect Spring Boot Backend &amp; schema.sql</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset application data back to default demo records?')) {
                  apiService.resetToDefaultSeed();
                  refreshAllData();
                  showToast('Reset to default seed data.', 'INFO');
                }
              }}
              className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
              title="Reset to initial seed data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Drive Detail Modal */}
      <DriveDetailModal
        drive={selectedDriveForModal}
        studentProfile={currentStudentProfile}
        existingApplication={
          selectedDriveForModal
            ? studentApplications.find(a => a.driveId === selectedDriveForModal.id)
            : undefined
        }
        onClose={() => setSelectedDriveForModal(null)}
        onApply={handleApplyToDrive}
        onTrackApplication={() => setActiveTab('tracker')}
      />

      {/* Spring Boot & SQL Architecture Explorer Modal */}
      <SpringBootExplorerModal
        isOpen={isSpringBootModalOpen}
        onClose={() => setIsSpringBootModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
