import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Errore di autenticazione");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch {
      setError("Accesso Google non riuscito");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 text-white space-y-4">
        <h1 className="text-2xl font-bold text-emerald-400 text-center">FitTrack PWA</h1>
        <p className="text-sm text-slate-400 text-center">
          {isRegistering ? "Crea account" : "Accedi al tuo account"}
        </p>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-xs">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white"
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition"
          >
            {isRegistering ? "Registrati" : "Accedi"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full bg-white text-slate-900 font-semibold py-2.5 rounded-lg text-sm hover:bg-slate-100 transition"
        >
          Continua con Google
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs text-slate-400 hover:text-emerald-400 transition"
          >
            {isRegistering ? "Hai un account? Accedi" : "Nuovo qui? Registrati"}
          </button>
        </div>
      </div>
    </div>
  );
}
