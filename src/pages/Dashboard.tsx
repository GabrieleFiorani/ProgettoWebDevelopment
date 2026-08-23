import { Header } from '../UI/header';
import { Footer } from '../UI/footer';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Header />

      <main className="flex-grow mx-5">
        <div className="max-w-5xl mx-auto py-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}