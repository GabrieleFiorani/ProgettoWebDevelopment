// Footer.tsx
import React from 'react';
import { LayoutDashboard, ListChecks, Dumbbell, User } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 px-4 py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-around">
        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Dashboard</span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Esercizi"
        >
          <Dumbbell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Esercizi</span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Schede"
        >
          <ListChecks className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Schede</span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Profilo"
        >
          <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Profilo</span>
        </button>
      </div>
    </footer>
  );
};