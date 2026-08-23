// Sidebar.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 sm:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-slate-900 border-l border-slate-800 p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out sm:hidden shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-sm font-semibold text-slate-300">Menu</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Chiudi menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {user && (
            <div className="mt-5 p-3 rounded-lg bg-slate-800/50 border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-full bg-slate-800 text-slate-300">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-slate-400">Account</span>
                <span className="text-xs font-medium text-slate-200 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-2.5 rounded-lg transition duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};