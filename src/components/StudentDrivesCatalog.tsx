import React, { useState } from 'react';
import { Drive, StudentProfile, Application } from '../types';
import { DriveCard } from './DriveCard';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { apiService } from '../services/apiService';

interface StudentDrivesCatalogProps {
  drives: Drive[];
  studentProfile: StudentProfile | null;
  studentApplications: Application[];
  onApply: (driveId: number) => void;
  onViewDetails: (drive: Drive) => void;
  onViewApplication: (app: Application) => void;
}

export const StudentDrivesCatalog: React.FC<StudentDrivesCatalogProps> = ({
  drives,
  studentProfile,
  studentApplications,
  onApply,
  onViewDetails,
  onViewApplication,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEligibleOnly, setFilterEligibleOnly] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'PACKAGE_DESC' | 'DATE_ASC' | 'DEFAULT'>('DEFAULT');

  const eligibleDrivesCount = drives.filter(
    d => apiService.checkEligibility(studentProfile, d).isEligible
  ).length;

  const filteredDrives = drives
    .filter(d => {
      const matchesSearch =
        d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterEligibleOnly) {
        const elig = apiService.checkEligibility(studentProfile, d);
        if (!elig.isEligible) return false;
      }

      if (selectedBranch !== 'ALL' && !d.eligibleBranches.includes(selectedBranch)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'PACKAGE_DESC') return b.packageLpa - a.packageLpa;
      if (sortBy === 'DATE_ASC') return new Date(a.driveDate).getTime() - new Date(b.driveDate).getTime();
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Student Eligibility Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              Eligibility Verification Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Upcoming Placement &amp; Internship Drives
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Real-time automated screening based on your academic profile: Branch (
            {studentProfile?.branch || 'N/A'}) &amp; CGPA ({studentProfile?.cgpa.toFixed(2) || 'N/A'}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center">
            <span className="text-2xl font-black block">{eligibleDrivesCount}</span>
            <span className="text-[10px] uppercase tracking-wider text-blue-200">
              Eligible for You
            </span>
          </div>
          <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center">
            <span className="text-2xl font-black block">{studentApplications.length}</span>
            <span className="text-[10px] uppercase tracking-wider text-blue-200">
              Applied Drives
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, roles, locations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Eligible only toggle */}
            <button
              onClick={() => setFilterEligibleOnly(!filterEligibleOnly)}
              className={`px-3 py-2 rounded-xl font-semibold transition border flex items-center gap-1.5 ${
                filterEligibleOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Only Eligible Drives</span>
            </button>

            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium"
            >
              <option value="ALL">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium"
            >
              <option value="DEFAULT">Sort: Default</option>
              <option value="PACKAGE_DESC">Package: High to Low</option>
              <option value="DATE_ASC">Drive Date: Earliest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No drives match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try resetting your filters or turning off "Only Eligible Drives".
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterEligibleOnly(false);
              setSelectedBranch('ALL');
              setSortBy('DEFAULT');
            }}
            className="mt-3 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrives.map(drive => (
            <DriveCard
              key={drive.id}
              drive={drive}
              studentProfile={studentProfile}
              studentApplications={studentApplications}
              onApply={onApply}
              onViewDetails={onViewDetails}
              onViewApplication={onViewApplication}
            />
          ))}
        </div>
      )}
    </div>
  );
};
