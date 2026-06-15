export function isAdmin() {
  return sessionStorage.getItem('isAdmin') === 'true'
}

export function setAdmin() {
  sessionStorage.setItem('isAdmin', 'true')
}

export function clearAdmin() {
  sessionStorage.removeItem('isAdmin')
}

export function checkPassword(password) {
  const adminPw = import.meta.env.VITE_ADMIN_PASSWORD || ''
  return password === adminPw
}
