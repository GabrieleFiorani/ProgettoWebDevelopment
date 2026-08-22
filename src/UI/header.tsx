import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-emerald-400">
            FitTrack
          </span>
          
          <span
            className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border transition-colors ${
              isOnline
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {user && (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400 " />
                <span className="hidden sm:inline-block text-xs text-slate-400 font-medium truncate">
                    {user.email}
                </span>
            </div>

            <button
            onClick={() => logout()}
            title="Esci"
            className="flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-rose-500/20 cursor-pointer text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 px-3 py-1.5 rounded-lg transition duration-200"
            >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};