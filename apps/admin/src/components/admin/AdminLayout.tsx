import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { 
  FileText, 
  Menu as MenuIcon, 
  Globe, 
  RotateCcw, 
  CheckCircle, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Mail
} from 'lucide-react';
import { resetAllContent, resetNavItems } from '../../lib/contentStore';

export const AdminLayout: React.FC = () => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleFullReset = () => {
    resetAllContent();
    resetNavItems();
    setShowResetModal(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left brand & badge */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/admin/website" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
                  T
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg tracking-wider text-slate-900 leading-none">
                      TEJASHWI <span className="text-brand-600 font-bold text-sm tracking-normal">CMS</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      <Sparkles className="w-3 h-3" /> Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Owner-Side Content Studio</p>
                </div>
              </Link>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                title="Restore all website text, images, and nav to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-sm hover:shadow transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </div>

          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-4 py-2 overflow-x-auto">
              <NavLink
                to="/admin/website"
                end
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <FileText className="w-4 h-4" />
                Page Content Editor
              </NavLink>

              <NavLink
                to="/website/navigation"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <MenuIcon className="w-4 h-4" />
                Navigation Menu
              </NavLink>

              <NavLink
                to="/inbox"
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-white text-brand-600 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <Mail className="w-4 h-4" />
                Client Inbox
              </NavLink>

              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="sm:hidden px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* TOAST SUCCESS NOTIFICATION */}
      {resetSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">All website content restored to factory defaults!</span>
        </div>
      )}

      {/* MAIN BODY OUTLET */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4 text-rose-600">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Restore Factory Defaults?</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              This will reset <strong>all pages, text copies, images, repeatable blocks, and navigation links</strong> to their original seed settings. Any customizations made via this CMS will be replaced with standard presets.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFullReset}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
