import React, { useState } from 'react';
import { Drive, Company } from '../types';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AdminDrivesManagerProps {
  drives: Drive[];
  companies: Company[];
  onCreateDrive: (data: Omit<Drive, 'id' | 'totalApplicants'>) => void;
  onUpdateDrive: (id: number, data: Partial<Drive>) => void;
  onDeleteDrive: (id: number) => void;
}

const AVAILABLE_BRANCHES = ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'];

export const AdminDrivesManager: React.FC<AdminDrivesManagerProps> = ({
  drives,
  companies,
  onCreateDrive,
  onUpdateDrive,
  onDeleteDrive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriveId, setEditingDriveId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [companyId, setCompanyId] = useState<number>(companies[0]?.id || 1);
  const [roleTitle, setRoleTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [packageLpa, setPackageLpa] = useState<number>(12.0);
  const [minCgpa, setMinCgpa] = useState<number>(7.0);
  const [eligibleBranches, setEligibleBranches] = useState<string[]>(['CSE', 'IT']);
  const [driveDate, setDriveDate] = useState('2026-11-01');
  const [lastDateToApply, setLastDateToApply] = useState('2026-10-25');
  const [location, setLocation] = useState('Bengaluru');
  const [jobType, setJobType] = useState<'Full-time' | 'Internship' | 'Intern + PPO'>('Full-time');
  const [status, setStatus] = useState<'UPCOMING' | 'ONGOING' | 'COMPLETED'>('UPCOMING');

  const openCreateModal = () => {
    setEditingDriveId(null);
    setCompanyId(companies[0]?.id || 1);
    setRoleTitle('');
    setJobDescription('');
    setPackageLpa(12.0);
    setMinCgpa(7.0);
    setEligibleBranches(['CSE', 'IT']);
    setDriveDate('2026-11-01');
    setLastDateToApply('2026-10-25');
    setLocation('Bengaluru');
    setJobType('Full-time');
    setStatus('UPCOMING');
    setIsModalOpen(true);
  };

  const openEditModal = (d: Drive) => {
    setEditingDriveId(d.id);
    setCompanyId(d.companyId);
    setRoleTitle(d.roleTitle);
    setJobDescription(d.jobDescription);
    setPackageLpa(d.packageLpa);
    setMinCgpa(d.minCgpa);
    setEligibleBranches(d.eligibleBranches);
    setDriveDate(d.driveDate);
    setLastDateToApply(d.lastDateToApply);
    setLocation(d.location);
    setJobType(d.jobType);
    setStatus(d.status);
    setIsModalOpen(true);
  };

  const handleBranchToggle = (branch: string) => {
    if (eligibleBranches.includes(branch)) {
      setEligibleBranches(eligibleBranches.filter(b => b !== branch));
    } else {
      setEligibleBranches([...eligibleBranches, branch]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const comp = companies.find(c => c.id === Number(companyId));
    const compName = comp ? comp.name : 'Partner Enterprise';

    if (editingDriveId) {
      onUpdateDrive(editingDriveId, {
        companyId: Number(companyId),
        companyName: compName,
        roleTitle,
        jobDescription,
        packageLpa: Number(packageLpa),
        minCgpa: Number(minCgpa),
        eligibleBranches,
        driveDate,
        lastDateToApply,
        location,
        jobType,
        status,
      });
    } else {
      onCreateDrive({
        companyId: Number(companyId),
        companyName: compName,
        roleTitle,
        jobDescription,
        packageLpa: Number(packageLpa),
        minCgpa: Number(minCgpa),
        eligibleBranches,
        driveDate,
        lastDateToApply,
        location,
        jobType,
        status,
        stages: ['APPLIED', 'APTITUDE', 'TECHNICAL', 'HR', 'SELECTED'],
      });
    }

    setIsModalOpen(false);
  };

  const filteredDrives = drives.filter(
    d =>
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.roleTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Placement Drives Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure recruitment drives with eligibility cutoffs (min CGPA, branch restrictions) and key dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drives..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Create Drive
          </button>
        </div>
      </div>

      {/* Drives Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrives.map(drive => (
          <div
            key={drive.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{drive.companyName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{drive.roleTitle}</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {drive.packageLpa} LPA
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Min CGPA:</span>
                  <span className="font-bold text-slate-800">{drive.minCgpa.toFixed(2)} / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Drive Date:</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(drive.driveDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Apply Deadline:</span>
                  <span className="font-semibold text-rose-600">
                    {new Date(drive.lastDateToApply).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400">Applicants:</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px]">
                    {drive.totalApplicants || 0} registered
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                  Eligible Branches:
                </span>
                <div className="flex flex-wrap gap-1">
                  {drive.eligibleBranches.map(b => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(drive)}
                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Edit Drive"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete drive for ${drive.companyName}?`)) {
                    onDeleteDrive(drive.id);
                  }
                }}
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Delete Drive"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingDriveId ? 'Edit Placement Drive' : 'Create New Placement Drive'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company</label>
                  <select
                    value={companyId}
                    onChange={e => setCompanyId(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.industry})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SDE - I / Cloud Engineer"
                    value={roleTitle}
                    onChange={e => setRoleTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    CTC Package (in LPA)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={packageLpa}
                    onChange={e => setPackageLpa(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Eligibility Min CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={minCgpa}
                    onChange={e => setMinCgpa(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Drive Date</label>
                  <input
                    type="date"
                    required
                    value={driveDate}
                    onChange={e => setDriveDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Date to Apply</label>
                  <input
                    type="date"
                    required
                    value={lastDateToApply}
                    onChange={e => setLastDateToApply(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Job Type</label>
                  <select
                    value={jobType}
                    onChange={e => setJobType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Intern + PPO">Intern + PPO</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Branch Checklist */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Eligible Branches (Students outside these cannot apply)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {AVAILABLE_BRANCHES.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleBranchToggle(b)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                        eligibleBranches.includes(b)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b} {eligibleBranches.includes(b) ? '✓' : '+'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Job Description &amp; Candidate Requirements
                </label>
                <textarea
                  rows={3}
                  required
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Detail interview rounds, tech stack expectations, bonds if any..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-xs"
                >
                  {editingDriveId ? 'Save Changes' : 'Create Drive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
