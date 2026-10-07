import React from 'react';
import { Company, Drive, Application } from '../types';
import {
  Building2,
  Users,
  Briefcase,
  Award,
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface CompanyPortalViewProps {
  company: Company | undefined;
  drives: Drive[];
  applications: Application[];
}

export const CompanyPortalView: React.FC<CompanyPortalViewProps> = ({
  company,
  drives,
  applications,
}) => {
  const companyDrives = drives.filter(
    d => d.companyName.toLowerCase() === (company?.name || 'Google').toLowerCase()
  );
  const companyApps = applications.filter(
    a => a.companyName.toLowerCase() === (company?.name || 'Google').toLowerCase()
  );

  const selectedCount = companyApps.filter(a => a.status === 'SELECTED').length;
  const inInterviewCount = companyApps.filter(
    a => a.currentStage === 'TECHNICAL' || a.currentStage === 'HR'
  ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-2xl font-bold border border-white/20">
              {company?.name.charAt(0) || 'G'}
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
                Corporate Recruiter Portal
              </span>
              <h1 className="text-2xl font-bold">{company?.name || 'Google India'}</h1>
              <p className="text-xs text-emerald-200 mt-0.5">{company?.industry} • {company?.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-xl font-bold block">{selectedCount}</span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-200">Offers Issued</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Campus Drives</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{companyDrives.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Applicants Received</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{companyApps.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">In Interview Stages (Tech / HR)</span>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{inInterviewCount}</p>
        </div>
      </div>

      {/* Candidate Shortlist Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">Registered Campus Candidates</h2>
        <p className="text-xs text-slate-500 mb-4">
          Candidates who applied to your campus recruitment drives with verified college CGPA
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Branch &amp; Roll</th>
                <th className="py-2.5 px-3">CGPA</th>
                <th className="py-2.5 px-3">Current Round</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {companyApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No student applications yet for this company.
                  </td>
                </tr>
              ) : (
                companyApps.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{a.studentName}</td>
                    <td className="py-3 px-3">
                      {a.studentBranch} • {a.studentRoll}
                    </td>
                    <td className="py-3 px-3 font-bold text-blue-700">
                      {a.studentCgpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        {a.currentStage}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'SELECTED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {a.studentResumeUrl ? (
                        <a
                          href={a.studentResumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Resume</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
