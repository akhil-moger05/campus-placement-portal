import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  User,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  onRegister: (data: {
    name: string;
    email: string;
    rollNumber: string;
    branch: string;
    cgpa: number;
    graduationYear: number;
    skills: string[];
    resumeUrl: string;
    phone: string;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regBranch, setRegBranch] = useState('CSE');
  const [regCgpa, setRegCgpa] = useState('8.50');
  const [regYear, setRegYear] = useState('2026');
  const [regSkills, setRegSkills] = useState('Java, Spring Boot, React, MySQL');
  const [regResume, setRegResume] = useState('https://drive.google.com/sample-resume');
  const [regPhone, setRegPhone] = useState('+91 98765 00000');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      onLogin(loginEmail);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const skillsArray = regSkills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      onRegister({
        name: regName,
        email: regEmail,
        rollNumber: regRoll,
        branch: regBranch,
        cgpa: parseFloat(regCgpa) || 7.5,
        graduationYear: parseInt(regYear) || 2026,
        skills: skillsArray,
        resumeUrl: regResume,
        phone: regPhone,
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    }
  };

  const quickLogin = (email: string) => {
    onLogin(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 text-sm">PlaceTrack Access</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-sm rounded-lg"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 mt-3 mb-5">
          <button
            onClick={() => {
              setMode('LOGIN');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'LOGIN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('REGISTER');
              setErrorMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              mode === 'REGISTER'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Student Register
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {mode === 'LOGIN' ? (
          <div>
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student@campus.edu or admin@campus.edu"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-xs text-xs"
              >
                Sign In to Portal
              </button>
            </form>

            {/* Quick Demo Logins */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Demo Accounts (1-Click)
              </span>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => quickLogin('admin@campus.edu')}
                  className="w-full p-2 text-left rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">Placement Officer</span>
                    <span className="text-[11px] text-slate-400 block">admin@campus.edu</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    ADMIN
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('priya.cse@campus.edu')}
                  className="w-full p-2 text-left rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">Priya Sharma (CSE 8.92)</span>
                    <span className="text-[11px] text-slate-400 block">priya.cse@campus.edu</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    STUDENT
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('rahul.ece@campus.edu')}
                  className="w-full p-2 text-left rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">Rahul Verma (ECE 7.15)</span>
                    <span className="text-[11px] text-slate-400 block">rahul.ece@campus.edu</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    STUDENT
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Student Registration Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singhania"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="vikram@campus.edu"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Roll Number</label>
                <input
                  type="text"
                  required
                  placeholder="21CS099"
                  value={regRoll}
                  onChange={e => setRegRoll(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Branch</label>
                <select
                  value={regBranch}
                  onChange={e => setRegBranch(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">CGPA (0 - 10)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={regCgpa}
                  onChange={e => setRegCgpa(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-0.5">Grad Year</label>
                <input
                  type="number"
                  required
                  value={regYear}
                  onChange={e => setRegYear(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={regSkills}
                onChange={e => setRegSkills(e.target.value)}
                placeholder="Java, Spring Boot, React, MySQL"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Resume Link</label>
              <input
                type="url"
                required
                value={regResume}
                onChange={e => setRegResume(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Phone</label>
              <input
                type="text"
                value={regPhone}
                onChange={e => setRegPhone(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-xs text-xs"
            >
              Register &amp; Create Placement Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
