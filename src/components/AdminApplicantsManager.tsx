import React, { useState } from 'react';
import { Application, Drive, DriveStage, ApplicationStatus } from '../types';
import {
  Users,
  Search,
  Filter,
  FileText,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Edit2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminApplicantsManagerProps {
  applications: Application[];
  drives: Drive[];
  onUpdateStage: (
    applicationId: number,
    stage: DriveStage,
    status: ApplicationStatus,
    remarks: string
  ) => void;
}

export const AdminApplicantsManager: React.FC<AdminApplicantsManagerProps> = ({
  applications,
  drives,
  onUpdateStage,
}) => {
  const [selectedDriveId, setSelectedDriveId] = useState<number | 'ALL'>('ALL');
  const [selectedStage, setSelectedStage] = useState<DriveStage | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal for editing applicant stage
  const [activeAppToEdit, setActiveAppToEdit] = useState<Application | null>(null);
  const [newStage, setNewStage] = useState<DriveStage>('APPLIED');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('APPLIED');
  const [newRemarks, setNewRemarks] = useState('');

  const filteredApps = applications.filter(app => {
    if (selectedDriveId !== 'ALL' && app.driveId !== selectedDriveId) return false;
    if (selectedStage !== 'ALL' && app.currentStage !== selectedStage) return false;
    if (
      searchTerm &&
      !app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !app.studentRoll.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !app.studentBranch.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleOpenEditModal = (app: Application) => {
    setActiveAppToEdit(app);
    setNewStage(app.currentStage);
    setNewStatus(app.status);
    setNewRemarks(app.feedbackOrRemarks || '');
  };

  const handleSaveStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAppToEdit) return;

    if (newStage === 'SELECTED' && newStatus === 'SELECTED') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    onUpdateStage(activeAppToEdit.id, newStage, newStatus, newRemarks);
    setActiveAppToEdit(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header and Filter Control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Applicant Tracking &amp; Stage Progression
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Filter student candidates across recruitment drives and transition them through stages: Applied → Aptitude → Technical → HR → Selected.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
              Total Applicants: {filteredApps.length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
          {/* Drive Select */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Filter by Placement Drive</label>
            <select
              value={selectedDriveId}
              onChange={e =>
                setSelectedDriveId(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Drives ({drives.length})</option>
              {drives.map(d => (
                <option key={d.id} value={d.id}>
                  {d.companyName} - {d.roleTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Filter by Current Stage</label>
            <select
              value={selectedStage}
              onChange={e => setSelectedStage(e.target.value as DriveStage | 'ALL')}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Stages</option>
              <option value="APPLIED">1. Applied</option>
              <option value="APTITUDE">2. Aptitude Test</option>
              <option value="TECHNICAL">3. Technical Interview</option>
              <option value="HR">4. HR Round</option>
              <option value="SELECTED">5. Selected / Placed</option>
            </select>
          </div>

          {/* Student Search */}
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Search Candidates</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, roll no, branch..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Profile</th>
                <th className="py-3 px-4">Branch &amp; CGPA</th>
                <th className="py-3 px-4">Drive &amp; Role</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No applicants found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => {
                  const isSelected = app.status === 'SELECTED';
                  const isRejected = app.status === 'REJECTED';

                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      {/* Student Info */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{app.studentName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{app.studentRoll}</div>
                      </td>

                      {/* Branch & CGPA */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">{app.studentBranch}</span>
                        <div className="text-[11px] font-bold text-blue-700">
                          {app.studentCgpa.toFixed(2)} CGPA
                        </div>
                      </td>

                      {/* Drive Info */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{app.companyName}</div>
                        <div className="text-[11px] text-slate-500">{app.roleTitle}</div>
                      </td>

                      {/* Current Stage */}
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          <span>{app.currentStage}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isSelected
                              ? 'bg-emerald-100 text-emerald-800'
                              : isRejected
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Resume link */}
                      <td className="py-3 px-4">
                        {app.studentResumeUrl ? (
                          <a
                            href={app.studentResumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">N/A</span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenEditModal(app)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition border border-indigo-200"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Update Stage</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Progression Modal */}
      {activeAppToEdit && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Update Candidate Recruitment Stage
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeAppToEdit.studentName} ({activeAppToEdit.studentRoll}) • {activeAppToEdit.companyName}
                </p>
              </div>
              <button
                onClick={() => setActiveAppToEdit(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStage} className="space-y-4 pt-4 text-xs">
              {/* Stage Stepper Dropdown */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recruitment Stage (Applied → Selected)
                </label>
                <select
                  value={newStage}
                  onChange={e => setNewStage(e.target.value as DriveStage)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="APPLIED">1. APPLIED (Initial Resume Screening)</option>
                  <option value="APTITUDE">2. APTITUDE (Online Assessment / Aptitude)</option>
                  <option value="TECHNICAL">3. TECHNICAL (Coding &amp; System Design Interview)</option>
                  <option value="HR">4. HR (Culture Fit &amp; Management Discussion)</option>
                  <option value="SELECTED">5. SELECTED (Final Placement Offer Extended)</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Application Decision Status
                </label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="APPLIED">APPLIED (Pending Evaluation)</option>
                  <option value="SHORTLISTED">SHORTLISTED (Advanced to Next Round)</option>
                  <option value="SELECTED">SELECTED (Offer Made / Placed)</option>
                  <option value="REJECTED">REJECTED (Did not meet cutoff)</option>
                </select>
              </div>

              {/* Feedback / Official Remarks */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Official Feedback / Interview Schedule Remarks
                </label>
                <textarea
                  rows={3}
                  value={newRemarks}
                  onChange={e => setNewRemarks(e.target.value)}
                  placeholder="e.g. Cleared Technical Round with 92% DSA rating. HR Round scheduled for Friday 2 PM."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  This note will instantly update the student's live stage tracker and trigger a notification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveAppToEdit(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save &amp; Broadcast Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
