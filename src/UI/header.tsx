import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, CakeSlice, Menu } from 'lucide-react';
import { Sidebar } from './sidebar';

export function Header() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <CakeSlice className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-black tracking-tight text-emerald-400">
              PantryZero
            </span>
          </div>

          {user && (
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 font-medium truncate">
                  {user.email}
                </span>
              </div>

              <button
                onClick={() => logout()}
                title="Esci"
                className="hidden sm:flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-rose-500/20 cursor-pointer text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 px-3 py-1.5 rounded-lg transition duration-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="flex sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
                aria-label="Apri menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}