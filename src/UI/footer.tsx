// Footer.tsx
import React from 'react';
import { Refrigerator, CookingPot, ShoppingCart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 px-4 py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-around">
        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Dashboard"
        >
          <Refrigerator className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Dispensa</span>
        </button>

        <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Esercizi"
        >
          <CookingPot className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Ricette</span>

        </button>
                <button
          type="button"
          className="group flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 cursor-pointer transition duration-200"
          aria-label="Esercizi"
        >
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-[10px] font-medium tracking-wide">Lista della spesa</span>
        </button>
      </div>
    </footer>
  );
};