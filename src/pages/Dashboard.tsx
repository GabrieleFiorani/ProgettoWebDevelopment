import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h1 className="text-xl font-bold text-emerald-400">Dashboard</h1>
        <p className="text-sm text-slate-400">Utente loggato:</p>
        <p className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 break-all">{user?.email}</p>
        <button
          type="button"
          onClick={() => logout()}
          className="w-full bg-red-500/20 text-red-300 py-2 rounded-lg text-sm hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
