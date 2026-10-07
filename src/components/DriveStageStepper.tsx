import React from 'react';
import { DriveStage, ApplicationStatus } from '../types';
import { CheckCircle2, Clock, XCircle, Award } from 'lucide-react';

interface DriveStageStepperProps {
  currentStage: DriveStage;
  status: ApplicationStatus;
  feedback?: string;
  size?: 'sm' | 'md';
}

const STAGES: { key: DriveStage; label: string; desc: string }[] = [
  { key: 'APPLIED', label: 'Applied', desc: 'Resume Submitted' },
  { key: 'APTITUDE', label: 'Aptitude Test', desc: 'Online Assessment' },
  { key: 'TECHNICAL', label: 'Technical Interview', desc: 'DSA & System Design' },
  { key: 'HR', label: 'HR Round', desc: 'Culture & Fitment' },
  { key: 'SELECTED', label: 'Selected', desc: 'Offer Extended' },
];

export const DriveStageStepper: React.FC<DriveStageStepperProps> = ({
  currentStage,
  status,
  feedback,
  size = 'md',
}) => {
  const currentStageIndex = STAGES.findIndex(s => s.key === currentStage);
  const isRejected = status === 'REJECTED';
  const isSelected = status === 'SELECTED' && currentStage === 'SELECTED';

  return (
    <div className="w-full">
      {/* Visual Stepper */}
      <div className="relative flex items-center justify-between w-full">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 z-0" />
        
        {/* Active Progress Line */}
        <div
          className={`absolute top-1/2 left-4 -translate-y-1/2 h-1 transition-all duration-500 z-0 ${
            isRejected ? 'bg-rose-500' : isSelected ? 'bg-emerald-500' : 'bg-blue-600'
          }`}
          style={{
            width: isRejected
              ? `${(currentStageIndex / (STAGES.length - 1)) * 100}%`
              : `${(currentStageIndex / (STAGES.length - 1)) * 100}%`,
          }}
        />

        {STAGES.map((stage, idx) => {
          const isPassed = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isPending = idx > currentStageIndex;

          let stepBg = 'bg-white border-2 border-slate-300 text-slate-400';
          let icon = <span className="text-xs font-semibold">{idx + 1}</span>;

          if (isPassed) {
            stepBg = 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-sm';
            icon = <CheckCircle2 className="w-4 h-4" />;
          } else if (isCurrent) {
            if (isRejected) {
              stepBg = 'bg-rose-600 text-white border-2 border-rose-600 shadow-md ring-4 ring-rose-100';
              icon = <XCircle className="w-4 h-4" />;
            } else if (isSelected) {
              stepBg = 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-md ring-4 ring-emerald-100 animate-bounce';
              icon = <Award className="w-4 h-4" />;
            } else {
              stepBg = 'bg-blue-600 text-white border-2 border-blue-600 shadow-md ring-4 ring-blue-100';
              icon = <Clock className="w-4 h-4 animate-spin-slow" />;
            }
          }

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10 group">
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                  size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
                } ${stepBg}`}
              >
                {icon}
              </div>
              <div className="text-center mt-2">
                <p
                  className={`text-xs font-semibold whitespace-nowrap ${
                    isCurrent
                      ? isRejected
                        ? 'text-rose-700 font-bold'
                        : isSelected
                        ? 'text-emerald-700 font-bold'
                        : 'text-blue-700 font-bold'
                      : isPassed
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {stage.label}
                </p>
                {size === 'md' && (
                  <p className="text-[10px] text-slate-400 hidden sm:block whitespace-nowrap">
                    {stage.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Remarks Box */}
      {feedback && (
        <div
          className={`mt-4 p-3 rounded-lg text-xs flex items-start gap-2 border ${
            isRejected
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : isSelected
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-blue-50/70 border-blue-200 text-blue-900'
          }`}
        >
          <span className="font-semibold uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-current">
            Official Note
          </span>
          <p className="flex-1">{feedback}</p>
        </div>
      )}
    </div>
  );
};
