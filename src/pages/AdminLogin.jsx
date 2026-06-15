import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { setAdmin, checkPassword } from '../utils/adminAuth.js'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkPassword(password.trim())) {
      setAdmin()
      navigate('/admin', { replace: true })
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="max-w-md w-full invite-card p-8">
        <h1 className="font-heading text-2xl mb-4">Admin Login</h1>
        <p className="text-sm mb-4">Enter the admin password to view the RSVP dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-cream px-4 py-2"
              autoComplete="current-password"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex items-center gap-3">
            <PrimaryButton type="submit">Sign In</PrimaryButton>
            <Link to="/" className="text-sm text-[#5B4B66] hover:underline">Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
