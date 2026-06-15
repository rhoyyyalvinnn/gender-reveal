import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import RequireAdmin from './components/RequireAdmin.jsx'

/**
 * Root application component.
 * - "/"      => The full Baby Bloom Celebration invitation experience
 * - "/admin" => Optional dashboard for viewing & exporting RSVP responses
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }
      />
    </Routes>
  )
}

export default App
