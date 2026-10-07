import React from 'react';
import { Drive, StudentProfile, Application } from '../types';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { apiService } from '../services/apiService';

interface DriveCardProps {
  drive: Drive;
  studentProfile: StudentProfile | null;
  studentApplications: Application[];
  onApply: (driveId: number) => void;
  onViewDetails: (drive: Drive) => void;
  onViewApplication: (app: Application) => void;
}

export const DriveCard: React.FC<DriveCardProps> = ({
  drive,
  studentProfile,
  studentApplications,
  onApply,
  onViewDetails,
  onViewApplication,
}) => {
  const existingApp = studentApplications.find(a => a.driveId === drive.id);
  const eligibility = apiService.checkEligibility(studentProfile, drive);

  const daysLeft = Math.ceil(
    (new Date(drive.lastDateToApply).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-lg shadow-xs group-hover:scale-105 transition-transform">
                {drive.companyName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {drive.companyName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{drive.roleTitle}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center text-emerald-700 font-extrabold text-lg">
                <span>{drive.packageLpa} LPA</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{drive.jobType}</span>
            </div>
          </div>
        </div>

        {/* Eligibility Status Banner */}
        <div className="px-5 py-2.5 bg-slate-50 border-y border-slate-100">
          {existingApp ? (
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Applied: Stage [{existingApp.currentStage}]
              </span>
              <button
                onClick={() => onViewApplication(existingApp)}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 underline flex items-center"
              >
                Track Live <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          ) : eligibility.isEligible ? (
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>You meet all eligibility criteria (CGPA &amp; Branch)</span>
            </div>
          ) : (
            <div className="flex items-start gap-1.5 text-rose-700 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold">Ineligible: </span>
                <span className="text-rose-600 text-[11px]">{eligibility.reasons[0]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Requirements Details */}
        <div className="p-5 pt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Min CGPA</span>
              <span className="font-bold text-slate-800">{drive.minCgpa.toFixed(2)} / 10.0</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 text-[10px] uppercase font-semibold block">Drive Date</span>
              <span className="font-bold text-slate-800">
                {new Date(drive.driveDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Eligible Branches:
            </span>
            <div className="flex flex-wrap gap-1">
              {drive.eligibleBranches.map(branch => {
                const isStudentBranch = studentProfile?.branch === branch;
                return (
                  <span
                    key={branch}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                      isStudentBranch
                        ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {branch} {isStudentBranch && '✓'}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {drive.jobDescription}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-white">
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {daysLeft > 0 ? (
              <span className={daysLeft <= 3 ? 'text-rose-600 font-semibold' : ''}>
                {daysLeft} days left to apply
              </span>
            ) : (
              <span className="text-rose-600 font-semibold">Deadline passed</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(drive)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            Details
          </button>

          {existingApp ? (
            <button
              onClick={() => onViewApplication(existingApp)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
            >
              Track Stage
            </button>
          ) : (
            <button
              onClick={() => onApply(drive.id)}
              disabled={!eligibility.isEligible}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition shadow-xs ${
                eligibility.isEligible
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
