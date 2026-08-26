import { Outlet } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './footer'

export function AppLayout() {
  return (
    <div className="min-h-svh bg-slate-950 text-white flex flex-col">
      <Header />
      <main className="flex-grow mx-5">
        <div className="max-w-5xl mx-auto py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
