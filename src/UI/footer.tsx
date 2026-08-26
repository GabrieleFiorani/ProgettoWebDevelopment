import { NavLink } from 'react-router-dom'
import { Refrigerator, CookingPot, ShoppingCart, type LucideIcon } from 'lucide-react'

const tabs: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', label: 'Dispensa', icon: Refrigerator, end: true },
  { to: '/ricette', label: 'Ricette', icon: CookingPot },
  { to: '/lista-spesa', label: 'Lista della spesa', icon: ShoppingCart },
]

export function Footer() {
  return (
    <footer className="sticky bottom-0 z-30 w-full bg-slate-900/80 backdrop-blur-md border-t border-slate-800 px-4 py-2">
      <nav className="max-w-5xl mx-auto flex items-center justify-around">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            aria-label={label}
            className={({ isActive }) =>
              `group flex flex-col items-center gap-1 cursor-pointer transition duration-200 ${
                isActive
                  ? 'text-emerald-400'
                  : 'text-slate-400 hover:text-emerald-400'
              }`
            }
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </NavLink>
        ))}
      </nav>
    </footer>
  )
}
