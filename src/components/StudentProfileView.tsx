import React, { useState } from 'react';
import { StudentProfile } from '../types';
import {
  User,
  GraduationCap,
  FileText,
  Award,
  BookOpen,
  Phone,
  Calendar,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface StudentProfileViewProps {
  profile: StudentProfile | null;
  onUpdateProfile: (updates: Partial<StudentProfile>) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    rollNumber: profile?.rollNumber || '',
    branch: profile?.branch || 'CSE',
    cgpa: profile?.cgpa || 8.0,
    graduationYear: profile?.graduationYear || 2026,
    skills: profile?.skills?.join(', ') || '',
    resumeUrl: profile?.resumeUrl || '',
    phone: profile?.phone || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xs border border-slate-200 text-center">
        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-800">Profile Not Found</h3>
        <p className="text-sm text-slate-500 mt-1">Please sign in as a student or complete registration.</p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formData.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    onUpdateProfile({
      name: formData.name,
      rollNumber: formData.rollNumber,
      branch: formData.branch,
      cgpa: Number(formData.cgpa),
      graduationYear: Number(formData.graduationYear),
      skills: skillsArray,
      resumeUrl: formData.resumeUrl,
      phone: formData.phone,
    });

    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner / Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 relative">
          <div className="absolute top-4 right-4">
            {profile.isPlaced ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                Placed @ {profile.placedCompany} ({profile.placedPackage} LPA)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md text-xs font-medium">
                Seeking Placement
              </span>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name.charAt(0)}
                </div>
              </div>
              <div className="pt-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.name}</h1>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                  <span>{profile.rollNumber}</span>
                  <span>•</span>
                  <span>Department of {profile.branch}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {saveSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully! Placement eligibility metrics updated.</span>
            </div>
          )}

          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleSave} className="mt-6 space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={formData.rollNumber}
                    onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Department</label>
                  <select
                    value={formData.branch}
                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="CSE">Computer Science & Engineering (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ECE">Electronics & Communication (ECE)</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                    <option value="MECH">Mechanical Engineering (MECH)</option>
                    <option value="CIVIL">Civil Engineering (CIVIL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cumulative CGPA (0.0 - 10.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={e => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={e => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Java, Spring Boot, React, MySQL, AWS"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resume Link (Google Drive / GitHub / PDF link)
                </label>
                <input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          ) : (
            /* View Details */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              {/* Academic Metrics */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Academic Standing
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                  <div>
                    <span className="text-xs text-slate-500">Current CGPA</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">{profile.cgpa.toFixed(2)}</span>
                      <span className="text-xs text-slate-400">/ 10.0</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 ml-auto">
                        {profile.cgpa >= 8.5 ? 'Distinction' : profile.cgpa >= 7.0 ? 'First Class' : 'Average'}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1">
                    <p className="text-slate-600 flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="font-semibold">{profile.branch}</span>
                    </p>
                    <p className="text-slate-600 flex justify-between">
                      <span className="text-slate-400">Batch Year:</span>
                      <span className="font-semibold">{profile.graduationYear}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  Technical Competencies
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills && profile.skills.length > 0 ? (
                      profile.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-xs"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No skills added yet.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume & Verification */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Resume &amp; Contact
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                  <div>
                    <span className="text-xs text-slate-500">Resume Link</span>
                    {profile.resumeUrl ? (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 underline truncate max-w-full"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Verified Resume</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-xs text-amber-600 mt-1">Please provide a valid resume link.</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1">
                    <p className="text-slate-600 flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-semibold">{profile.phone || 'N/A'}</span>
                    </p>
                    <p className="text-slate-600 flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-semibold text-emerald-600">
                        {profile.isPlaced ? 'Selected & Placed' : 'Eligible for Drives'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
