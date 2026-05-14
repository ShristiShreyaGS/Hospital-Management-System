import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navLinks = {
    admin: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Patients', path: '/patients' },
      { label: 'Doctors', path: '/doctors' },
      { label: 'Staff', path: '/admin/staff' },
      { label: 'Appointments', path: '/appointments' },
      { label: 'Departments', path: '/departments' },
      { label: 'Beds', path: '/beds' },
      { label: 'Bills', path: '/bills' },
    ],
    doctor: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'My Appointments', path: '/appointments' },
      { label: 'Patients', path: '/patients' },
      { label: 'EMR', path: '/emr' },
      { label: 'Lab Requests', path: '/lab' },
    ],
    patient: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Book Appointment', path: '/appointments' },
      { label: 'My EMR', path: '/emr' },
      { label: 'Lab Results', path: '/lab' },
      { label: 'My Bills', path: '/bills' },
    ],
    receptionist: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Patients', path: '/patients' },
      { label: 'Appointments', path: '/appointments' },
      { label: 'Bills', path: '/bills' },
      { label: 'Admissions', path: '/admissions' },
      { label: 'Beds', path: '/beds' },
    ],
    nurse: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Patients', path: '/patients' },
      { label: 'Admissions', path: '/admissions' },
    ],
    lab_staff: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Lab Tests', path: '/lab' },
    ],
    pharmacist: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Pharmacy', path: '/pharmacy' },
    ],
  }

  const links = navLinks[user?.role] || []

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      background: '#2c3e50',
      color: 'white',
      height: '60px',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      {/* Left — Logo */}
      <Link to="/dashboard" style={{
        color: 'white', textDecoration: 'none',
        fontSize: '20px', fontWeight: '700',
        letterSpacing: '1px'
      }}>
        🏥 HMS
      </Link>

      {/* Middle — Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right — User info + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user && (
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>
            👤 {user.name} — <span style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '12px'
            }}>{user.role}</span>
          </span>
        )}
        <button onClick={handleLogout} style={{
          padding: '6px 16px',
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar