import { Navigate } from 'react-router-dom'
import { isAdmin } from '../utils/adminAuth.js'

export default function RequireAdmin({ children }) {
  if (isAdmin()) return children
  return <Navigate to="/admin/login" replace />
}
