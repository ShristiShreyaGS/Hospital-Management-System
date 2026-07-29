const PROD_API_FALLBACK = 'https://hospital-management-system-7e8k.onrender.com/api'
const LOCAL_API_FALLBACK = 'http://localhost:5000/api'

const isLocalhost = () => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

export const API_BASE = import.meta.env.VITE_API_URL || (isLocalhost() ? LOCAL_API_FALLBACK : PROD_API_FALLBACK)
