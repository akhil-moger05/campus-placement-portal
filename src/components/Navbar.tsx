import React, { useState } from 'react';
import { User, Notification } from '../types';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Bell,
  Code2,
  CheckCircle,
  LogOut,
  UserCheck,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
  onMarkNotificationAsRead: (id: number) => void;
  onMarkAllNotificationsAsRead: () => void;
  onOpenSpringBootExplorer: () => void;
  onOpenAuthModal: () => void;
  onSwitchUser: (email: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onOpenSpringBootExplorer,
  onOpenAuthModal,
  onSwitchUser,
  onLogout,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">PlaceTrack</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Campus Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Campus Placement Portal &amp; Drive Tracker</p>
            </div>
          </div>

          {/* Navigation Tabs based on Role */}
          <nav className="hidden md:flex items-center space-x-1">
            {currentUser?.role === 'STUDENT' && (
              <>
                <button
                  onClick={() => setActiveTab('drives')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'drives'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    <span>Placement Drives</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('tracker')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'tracker'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Live Drive Tracker</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>My Profile</span>
                  </div>
                </button>
              </>
            )}

            {currentUser?.role === 'ADMIN' && (
              <>
                <button
                  onClick={() => setActiveTab('admin-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'admin-dashboard'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Overview &amp; Stats
                </button>
                <button
                  onClick={() => setActiveTab('admin-drives')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'admin-drives'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Manage Drives
                </button>
                <button
                  onClick={() => setActiveTab('admin-companies')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'admin-companies'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Companies
                </button>
                <button
                  onClick={() => setActiveTab('admin-applicants')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'admin-applicants'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Applicants &amp; Stage Mover
                </button>
              </>
            )}

            {currentUser?.role === 'COMPANY' && (
              <>
                <button
                  onClick={() => setActiveTab('company-portal')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'company-portal'
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>Company Portal</span>
                  </div>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Spring Boot & SQL Explorer Button */}
            <button
              onClick={onOpenSpringBootExplorer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-xs"
              title="View full Spring Boot 3 + MySQL schema, controllers, services and setup guide"
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Spring Boot &amp; SQL Code</span>
              <span className="sm:hidden">Code</span>
            </button>

            {/* Quick Demo Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Demo:</span>
                <span className="font-semibold text-slate-900">
                  {currentUser?.role === 'ADMIN'
                    ? 'Admin (TPO)'
                    : currentUser?.email === 'priya.cse@campus.edu'
                    ? 'Priya (CSE 8.9)'
                    : currentUser?.email === 'rahul.ece@campus.edu'
                    ? 'Rahul (ECE 7.1)'
                    : currentUser?.role || 'Guest'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setShowRoleMenu(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role / Test Cases
                    </p>
                  </div>
                  <button
                    onClick={() => onSwitchUser('admin@campus.edu')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">Placement Officer (Admin)</p>
                      <p className="text-slate-500 text-[11px]">Manage drives, companies &amp; stages</p>
                    </div>
                    {currentUser?.role === 'ADMIN' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => onSwitchUser('priya.cse@campus.edu')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">Priya Sharma (Student)</p>
                      <p className="text-slate-500 text-[11px]">CSE • 8.92 CGPA (High CGPA eligible)</p>
                    </div>
                    {currentUser?.email === 'priya.cse@campus.edu' && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                  <button
                    onClick={() => onSwitchUser('rahul.ece@campus.edu')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">Rahul Verma (Student)</p>
                      <p className="text-slate-500 text-[11px]">ECE • 7.15 CGPA (Tests cutoff eligibility)</p>
                    </div>
                    {currentUser?.email === 'rahul.ece@campus.edu' && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                  <button
                    onClick={() => onSwitchUser('recruiter@google.com')}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">Google Recruiter (Company)</p>
                      <p className="text-slate-500 text-[11px]">Optional 3rd role view</p>
                    </div>
                    {currentUser?.role === 'COMPANY' && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkAllNotificationsAsRead}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onMarkNotificationAsRead(n.id);
                            if (n.linkAction) setActiveTab(n.linkAction);
                            setShowNotifMenu(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition ${
                            !n.isRead ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`font-semibold ${
                                !n.isRead ? 'text-blue-900' : 'text-slate-800'
                              }`}
                            >
                              {n.title}
                            </span>
                            {!n.isRead && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleDateString()} at{' '}
                            {new Date(n.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current User & Logout / Login */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="hidden lg:block text-right">
                  <p className="text-xs font-semibold text-slate-900 leading-none">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{currentUser.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign out"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs font-medium text-slate-600">
          {currentUser?.role === 'STUDENT' && (
            <>
              <button
                onClick={() => setActiveTab('drives')}
                className={`py-1 ${activeTab === 'drives' ? 'text-blue-600 font-bold' : ''}`}
              >
                Drives
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className={`py-1 ${activeTab === 'tracker' ? 'text-blue-600 font-bold' : ''}`}
              >
                Live Tracker
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-1 ${activeTab === 'profile' ? 'text-blue-600 font-bold' : ''}`}
              >
                Profile
              </button>
            </>
          )}

          {currentUser?.role === 'ADMIN' && (
            <>
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`py-1 ${activeTab === 'admin-dashboard' ? 'text-indigo-600 font-bold' : ''}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('admin-drives')}
                className={`py-1 ${activeTab === 'admin-drives' ? 'text-indigo-600 font-bold' : ''}`}
              >
                Drives
              </button>
              <button
                onClick={() => setActiveTab('admin-companies')}
                className={`py-1 ${activeTab === 'admin-companies' ? 'text-indigo-600 font-bold' : ''}`}
              >
                Companies
              </button>
              <button
                onClick={() => setActiveTab('admin-applicants')}
                className={`py-1 ${activeTab === 'admin-applicants' ? 'text-indigo-600 font-bold' : ''}`}
              >
                Applicants
              </button>
            </>
          )}

          {currentUser?.role === 'COMPANY' && (
            <button
              onClick={() => setActiveTab('company-portal')}
              className={`py-1 ${activeTab === 'company-portal' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Company Portal
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
