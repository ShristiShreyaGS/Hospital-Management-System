import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LabDashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  return (
    <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>Lab Dashboard</h2>
          <p style={{ color: '#7f8c8d', fontSize: '14px', margin: 0 }}>
            Welcome, {user?.name}. Manage lab tests and results.
          </p>
        </div>
        <button
          onClick={() => navigate('/staff-profile')}
          style={{
            padding: '8px 18px', background: 'none',
            border: '1.5px solid #2c3e50', borderRadius: '8px',
            color: '#2c3e50', cursor: 'pointer', fontSize: '13px', fontWeight: '600'
          }}>
          Edit Profile
        </button>
      </div>

      <div style={{
        background: 'white', borderRadius: '8px',
        padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '🧪 View Lab Tests', path: '/lab', color: '#e67e22' },
          ].map((action) => (
            <button key={action.label} onClick={() => navigate(action.path)} style={{
              padding: '10px 20px', background: action.color,
              color: 'white', border: 'none', borderRadius: '6px',
              cursor: 'pointer', fontWeight: '500', fontSize: '14px'
            }}>{action.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LabDashboard