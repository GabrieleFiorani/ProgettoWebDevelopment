import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtencedRoute.tsx'
import { AppLayout } from './UI/layout.tsx'
import { Login } from './pages/LoginPage.tsx'
import { Dispensa } from './pages/Dispensa.tsx'
import { Ricette } from './pages/Ricette.tsx'
import { ListaSpesa } from './pages/ListaSpesa.tsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dispensa />} />
        <Route path="/ricette" element={<Ricette />} />
        <Route path="/lista-spesa" element={<ListaSpesa />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
