import React, { useState } from 'react';
import { Company } from '../types';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Globe,
  Mail,
  MapPin,
  Users,
  Search,
  ExternalLink,
} from 'lucide-react';

interface AdminCompaniesManagerProps {
  companies: Company[];
  onAddCompany: (data: Omit<Company, 'id' | 'totalHiredCount'>) => void;
  onUpdateCompany: (id: number, data: Partial<Company>) => void;
  onDeleteCompany: (id: number) => void;
}

export const AdminCompaniesManager: React.FC<AdminCompaniesManagerProps> = ({
  companies,
  onAddCompany,
  onUpdateCompany,
  onDeleteCompany,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingCompanyId(null);
    setName('');
    setIndustry('');
    setWebsite('https://');
    setLocation('Bengaluru / Pan India');
    setContactEmail('');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: Company) => {
    setEditingCompanyId(c.id);
    setName(c.name);
    setIndustry(c.industry);
    setWebsite(c.website);
    setLocation(c.location);
    setContactEmail(c.contactEmail);
    setDescription(c.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompanyId) {
      onUpdateCompany(editingCompanyId, {
        name,
        industry,
        website,
        location,
        contactEmail,
        description,
      });
    } else {
      onAddCompany({
        name,
        industry,
        website,
        location,
        contactEmail,
        description,
      });
    }
    setIsModalOpen(false);
  };

  const filtered = companies.filter(
    c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Partner Companies &amp; Recruiters
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage participating enterprises, campus recruitment contacts, and hiring history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Company
          </button>
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
          <div
            key={company.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-lg">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{company.name}</h3>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      {company.industry}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {company.totalHiredCount || 0} Hired
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {company.description}
              </p>

              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{company.contactEmail}</span>
                </div>
                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline truncate inline-flex items-center gap-1"
                    >
                      <span>{company.website.replace('https://', '')}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(company)}
                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Edit Company"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete company ${company.name}?`)) {
                    onDeleteCompany(company.id);
                  }
                }}
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Delete Company"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingCompanyId ? 'Edit Company Information' : 'Add New Partner Company'}
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
                  <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google India"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Industry Sector</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud & AI / Fintech"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Website</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / Office</label>
                  <input
                    type="text"
                    placeholder="Bengaluru / Hyderabad"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus Recruiter Email</label>
                <input
                  type="email"
                  required
                  placeholder="campus-recruiting@company.com"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Overview of company business, domain, and work culture..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
                  {editingCompanyId ? 'Save Changes' : 'Add Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
