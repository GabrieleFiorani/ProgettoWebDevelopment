import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtencedRoute.tsx'
import { Login } from './pages/LoginPage.tsx'
import { Dashboard } from './pages/Dashboard.tsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
