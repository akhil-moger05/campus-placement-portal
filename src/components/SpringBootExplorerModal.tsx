import React, { useState } from 'react';
import { BACKEND_FILES, CodeFile } from '../data/backendCodebase';
import {
  Code2,
  Database,
  FileCode,
  FolderTree,
  Copy,
  Check,
  Download,
  BookOpen,
  Terminal,
  Shield,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SpringBootExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpringBootExplorerModal: React.FC<SpringBootExplorerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredFiles = BACKEND_FILES.filter(
    f => activeCategory === 'ALL' || f.category === activeCategory
  );

  const selectedFile = BACKEND_FILES[selectedFileIndex] || BACKEND_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-950 text-slate-100 rounded-3xl max-w-6xl w-full h-[90vh] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Spring Boot 3 + MySQL Backend Codebase &amp; Architecture
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Java 17 • Maven • JWT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pristine Spring Boot project code, JPA entities, REST controllers, MySQL DDL schema, and execution guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File Code</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { key: 'ALL', label: 'All Files' },
            { key: 'DATABASE', label: 'MySQL Schema & Seed' },
            { key: 'ENTITY', label: 'JPA Entities' },
            { key: 'CONTROLLER', label: 'REST Controllers' },
            { key: 'SERVICE', label: 'Services & Logic' },
            { key: 'SECURITY', label: 'Spring Security + JWT' },
            { key: 'CONFIG', label: 'pom.xml & Config' },
            { key: 'DOCS', label: 'Setup Guide (README)' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1 rounded-lg font-medium transition whitespace-nowrap ${
                activeCategory === tab.key
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area: Sidebar File List + Code Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/40 overflow-y-auto max-h-48 md:max-h-full">
            <div className="p-3 text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
              Project Files ({filteredFiles.length})
            </div>
            <div className="space-y-0.5 p-2">
              {filteredFiles.map((file, idx) => {
                const globalIndex = BACKEND_FILES.findIndex(f => f.path === file.path);
                const isSelected = globalIndex === selectedFileIndex;

                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(globalIndex)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between group ${
                      isSelected
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-emerald-400' : 'text-slate-500'
                        }`}
                      />
                      <div className="truncate">
                        <span className="block truncate">{file.filename}</span>
                        <span className="text-[10px] text-slate-500 block truncate">
                          {file.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 ${
                        isSelected ? 'opacity-100 text-emerald-400' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            {/* File Path and Description Bar */}
            <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-emerald-400 font-semibold">
                  backend/{selectedFile.path}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 truncate">{selectedFile.description}</span>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-6 overflow-auto font-mono text-xs leading-relaxed text-slate-300 selection:bg-emerald-500 selection:text-slate-950">
              <pre className="whitespace-pre">{selectedFile.content}</pre>
            </div>
          </div>
        </div>

        {/* Footer Quick Run Summary */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Maven Start: <code className="text-emerald-300 font-mono">mvn spring-boot:run</code> |
              MySQL: <code className="text-emerald-300 font-mono">campus_placement_db</code>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">
              Folder: <span className="text-slate-300 font-mono">backend/src/main/java/...</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
