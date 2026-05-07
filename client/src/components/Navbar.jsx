import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 20px', 
      background: '#2c3e50', 
      color: 'white' 
    }}>
      <h2>🏥 HMS</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user && <span>👤 {user.name} — {user.role}</span>}
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '6px 14px', 
            background: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar