import React, { useState } from 'react';
import { Application } from '../types';
import { DriveStageStepper } from './DriveStageStepper';
import {
  Layers,
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentApplicationTrackerProps {
  applications: Application[];
  onExploreDrives: () => void;
}

export const StudentApplicationTracker: React.FC<StudentApplicationTrackerProps> = ({
  applications,
  onExploreDrives,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ONGOING' | 'SELECTED' | 'REJECTED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.roleTitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'SELECTED') return app.status === 'SELECTED';
    if (filter === 'REJECTED') return app.status === 'REJECTED';
    if (filter === 'ONGOING') return app.status !== 'SELECTED' && app.status !== 'REJECTED';
    return true;
  });

  const fireConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header and Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              Live Drive Stage Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time multi-stage tracking: Applied → Aptitude Test → Technical Interview → HR Round → Final Offer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExploreDrives}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              Browse More Drives
            </button>
          </div>
        </div>

        {/* Search & Filter pills */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search applied drives..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {(['ALL', 'ONGOING', 'SELECTED', 'REJECTED'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab === 'ALL'
                  ? `All (${applications.length})`
                  : tab === 'ONGOING'
                  ? `In Progress (${applications.filter(a => a.status !== 'SELECTED' && a.status !== 'REJECTED').length})`
                  : tab === 'SELECTED'
                  ? `Selected (${applications.filter(a => a.status === 'SELECTED').length})`
                  : `Rejected (${applications.filter(a => a.status === 'REJECTED').length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No applications in this category</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {applications.length === 0
              ? 'You have not applied to any campus drives yet. Check the Placement Drives catalog to view eligible companies.'
              : 'Try changing your search term or filter options.'}
          </p>
          {applications.length === 0 && (
            <button
              onClick={onExploreDrives}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
            >
              Explore Placement Drives
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map(app => {
            const isSelected = app.status === 'SELECTED';
            const isRejected = app.status === 'REJECTED';

            return (
              <div
                key={app.id}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 shadow-xs ${
                  isSelected
                    ? 'border-emerald-300 ring-2 ring-emerald-50 bg-gradient-to-br from-emerald-50/20 via-white to-white'
                    : isRejected
                    ? 'border-slate-200 bg-slate-50/40 opacity-90'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Top Row: Company Info & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-lg">
                      {app.companyName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900">{app.companyName}</h2>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {app.packageLpa} LPA
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{app.roleTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {isSelected ? (
                      <button
                        onClick={fireConfetti}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-700 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Offer Secured! 🎉
                      </button>
                    ) : isRejected ? (
                      <span className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-semibold">
                        Not Shortlisted
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-800 text-xs font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Stage: {app.currentStage}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400">
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Live Stepper Visualization */}
                <div className="py-2 px-2 sm:px-4 bg-slate-50/60 rounded-xl border border-slate-100">
                  <DriveStageStepper
                    currentStage={app.currentStage}
                    status={app.status}
                    feedback={app.feedbackOrRemarks}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
