import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import BrokerDetail from './pages/BrokerDetail'
import Completion from './pages/Completion'
import { useApp } from './context'

function AppRoutes() {
  const { state } = useApp()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/dashboard"
        element={state.onboardingComplete ? <Dashboard /> : <Navigate to="/onboarding" replace />}
      />
      <Route
        path="/broker/:id"
        element={state.onboardingComplete ? <BrokerDetail /> : <Navigate to="/onboarding" replace />}
      />
      <Route
        path="/done"
        element={state.onboardingComplete ? <Completion /> : <Navigate to="/onboarding" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
