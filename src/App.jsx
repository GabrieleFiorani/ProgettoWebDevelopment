import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return (
    <main className="min-h-svh bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-16">
        <p className="mb-3 text-sm font-medium tracking-wide text-indigo-400 uppercase">
          Vite · React · Tailwind · PWA
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Progetto Web Dev
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-400">
          App React pronta all&apos;uso. Tailwind è attivo. La PWA si installa
          dopo <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-slate-200">npm run build</code>{' '}
          e <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-slate-200">npm run preview</code>.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
              online
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'bg-amber-500/15 text-amber-300'
            }`}
          >
            <span
              className={`size-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-amber-400'}`}
            />
            {online ? 'Online' : 'Offline'}
          </span>
          <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm text-indigo-300">
            Service worker: auto-update
          </span>
        </div>

        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="mt-10 w-fit rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500"
        >
          Contatore: {count}
        </button>
      </div>
    </main>
  )
}

export default App
