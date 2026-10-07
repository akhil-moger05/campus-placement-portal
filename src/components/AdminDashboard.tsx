import React from 'react';
import { DashboardStats, Drive, Application, StudentProfile } from '../types';
import {
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Building2,
  IndianRupee,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface AdminDashboardProps {
  stats: DashboardStats;
  drives: Drive[];
  applications: Application[];
  profiles: StudentProfile[];
  onNavigateTab: (tab: string) => void;
  onOpenCreateDrive: () => void;
  onOpenAddCompany: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  drives,
  applications,
  profiles,
  onNavigateTab,
  onOpenCreateDrive,
  onOpenAddCompany,
}) => {
  const placedList = profiles.filter(p => p.isPlaced);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner / TPO Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold backdrop-blur-md mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Academic Year 2025–2026 Campus Placement Cycle
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Placement Cell Executive Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track multi-stage recruitment drives, manage campus eligibility rules, review applicants, and oversee student placement success.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCreateDrive}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              Create New Drive
            </button>
            <button
              onClick={onOpenAddCompany}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition"
            >
              <Building2 className="w-4 h-4" />
              Add Company
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Registered Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalStudents}</span>
            <span className="text-xs text-slate-400">candidates</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Profiles verified for drives</p>
        </div>

        {/* Placement Percentage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Placement %</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {stats.placementPercentage}%
            </span>
            <span className="text-xs text-slate-400">
              ({stats.placedStudents}/{stats.totalStudents} placed)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.placementPercentage}%` }}
            />
          </div>
        </div>

        {/* Active Drives */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Placement Drives</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalDrives}</span>
            <span className="text-xs text-indigo-600 font-semibold">{stats.ongoingDrivesCount} active</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">{stats.totalCompanies} partnering companies</p>
        </div>

        {/* Salary Packages */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Compensation Highlights</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-500">Highest CTC:</span>
              <span className="font-extrabold text-slate-900 text-sm">{stats.highestPackageLpa} LPA</span>
            </div>
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-500">Average CTC:</span>
              <span className="font-bold text-slate-700">{stats.averagePackageLpa || 0} LPA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Active Drives Overview + Placed Hall of Fame */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Drives Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Current Placement Drives</h2>
              <p className="text-xs text-slate-500">Active and upcoming recruiting drives</p>
            </div>
            <button
              onClick={() => onNavigateTab('admin-drives')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center"
            >
              Manage All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Company &amp; Role</th>
                  <th className="py-2.5 px-3">Package</th>
                  <th className="py-2.5 px-3">Min CGPA</th>
                  <th className="py-2.5 px-3">Eligible Branches</th>
                  <th className="py-2.5 px-3">Applicants</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {drives.slice(0, 5).map(d => (
                  <tr key={d.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{d.companyName}</div>
                      <div className="text-[11px] text-slate-500">{d.roleTitle}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-emerald-700">{d.packageLpa} LPA</td>
                    <td className="py-3 px-3 font-medium">{d.minCgpa.toFixed(2)}</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {d.eligibleBranches.map(b => (
                          <span
                            key={b}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                        {d.totalApplicants || 0}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          d.status === 'ONGOING'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Placed Students Spotlight (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Placed Students</h2>
                <p className="text-xs text-slate-500">Offers secured in this cycle</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {placedList.length} offers
              </span>
            </div>

            <div className="space-y-3">
              {placedList.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No students placed yet.</p>
              ) : (
                placedList.map(st => (
                  <div
                    key={st.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                      <p className="text-[11px] text-slate-500">
                        {st.branch} • {st.rollNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-700 block">
                        {st.placedCompany}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600">
                        {st.placedPackage} LPA
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('admin-applicants')}
              className="w-full py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition text-center flex items-center justify-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Review Applicants &amp; Advance Stages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
