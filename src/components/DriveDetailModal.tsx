import React from 'react';
import { Drive, StudentProfile, Application } from '../types';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  MapPin,
  Briefcase,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { apiService } from '../services/apiService';

interface DriveDetailModalProps {
  drive: Drive | null;
  studentProfile: StudentProfile | null;
  existingApplication?: Application;
  onClose: () => void;
  onApply: (driveId: number) => void;
  onTrackApplication: (app: Application) => void;
}

export const DriveDetailModal: React.FC<DriveDetailModalProps> = ({
  drive,
  studentProfile,
  existingApplication,
  onClose,
  onApply,
  onTrackApplication,
}) => {
  if (!drive) return null;

  const eligibility = apiService.checkEligibility(studentProfile, drive);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-xl shadow-xs">
              {drive.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{drive.companyName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200">
                  {drive.packageLpa} LPA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{drive.roleTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-sm rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 pt-5 text-xs text-slate-700">
          {/* Key Parameters Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Job Type</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">{drive.jobType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Location</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">{drive.location}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Drive Date</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                {new Date(drive.driveDate).toLocaleDateString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Last Date</span>
              <span className="font-bold text-rose-600 text-xs mt-0.5 block">
                {new Date(drive.lastDateToApply).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Eligibility Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Eligibility Criteria Evaluation
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Cutoff CGPA:</span>
                  <span className="font-bold text-slate-900">{drive.minCgpa.toFixed(2)} / 10.0</span>
                </div>
                {studentProfile && (
                  <p
                    className={`mt-1 text-[11px] font-semibold ${
                      eligibility.cgpaMet ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    Your CGPA: {studentProfile.cgpa.toFixed(2)}{' '}
                    {eligibility.cgpaMet ? '✓ (Eligible)' : '✗ (Below Cutoff)'}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Allowed Branches:</span>
                  <span className="font-bold text-slate-900">
                    {drive.eligibleBranches.join(', ')}
                  </span>
                </div>
                {studentProfile && (
                  <p
                    className={`mt-1 text-[11px] font-semibold ${
                      eligibility.branchMet ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    Your Branch: {studentProfile.branch}{' '}
                    {eligibility.branchMet ? '✓ (Eligible)' : '✗ (Not in criteria)'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Role Overview &amp; Job Description
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 leading-relaxed whitespace-pre-line text-slate-600">
              {drive.jobDescription}
            </div>
          </div>

          {/* Selection Stages */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Recruitment Process Stages
            </h4>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {drive.stages.map((stage, idx) => (
                <div
                  key={stage}
                  className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Close
          </button>

          {existingApplication ? (
            <button
              onClick={() => {
                onClose();
                onTrackApplication(existingApplication);
              }}
              className="px-5 py-2 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-xl transition shadow-xs"
            >
              Track Current Stage [{existingApplication.currentStage}]
            </button>
          ) : (
            <button
              onClick={() => {
                onApply(drive.id);
                onClose();
              }}
              disabled={!eligibility.isEligible}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition shadow-xs ${
                eligibility.isEligible
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              {eligibility.isEligible ? 'Submit Application' : 'Ineligible to Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
