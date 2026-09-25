import React, { useState } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const SettingsPage: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{type: 'error' | 'success', msg: string} | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-brand-600" />
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-3 px-6 py-5 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-b border-slate-100 transition-colors w-full"
          >
            <Settings className="w-5 h-5 text-slate-500" />
            <span className="font-semibold text-[15px]">Change Password</span>
          </button>
          
          <button
            onClick={async () => {
              await supabase.auth.signOut();
            }}
            className="flex items-center gap-3 px-6 py-5 text-left text-rose-600 hover:bg-rose-50 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold text-[15px]">Sign Out</span>
          </button>
        </div>
      </div>

      {/* PASSWORD CHANGE MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-5">
              <Settings className="w-6 h-6 text-brand-600" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">Change Password</h3>
            <p className="text-sm text-slate-500 mb-6">
              Enter your current password and your new password.
            </p>

            {passwordStatus && (
              <div className={`p-3 rounded-xl text-sm font-medium mb-4 border ${
                passwordStatus.type === 'error' 
                  ? 'bg-rose-50 text-rose-600 border-rose-100' 
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                {passwordStatus.msg}
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setOldPassword('');
                  setNewPassword('');
                  setPasswordStatus(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isChangingPassword || !newPassword || !oldPassword}
                onClick={async () => {
                  setIsChangingPassword(true);
                  setPasswordStatus(null);
                  try {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user || !user.email) throw new Error("No active user found.");

                    const { error: signInError } = await supabase.auth.signInWithPassword({
                      email: user.email,
                      password: oldPassword,
                    });

                    if (signInError) throw new Error("Incorrect current password.");

                    const { error } = await supabase.auth.updateUser({ password: newPassword });
                    if (error) throw error;
                    
                    setPasswordStatus({ type: 'success', msg: 'Password updated successfully!' });
                    setTimeout(() => {
                      setShowPasswordModal(false);
                      setOldPassword('');
                      setNewPassword('');
                      setPasswordStatus(null);
                    }, 1500);
                  } catch (err: any) {
                    setPasswordStatus({ type: 'error', msg: err.message || 'Failed to update password' });
                  } finally {
                    setIsChangingPassword(false);
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                {isChangingPassword ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
