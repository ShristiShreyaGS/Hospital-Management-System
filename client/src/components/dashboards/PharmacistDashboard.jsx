import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PharmacistDashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  return (
    <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>Pharmacist Dashboard</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '28px', fontSize: '14px' }}>
        Welcome, {user?.name}. Manage medicines and prescriptions.
      </p>

      <div style={{
        background: 'white', borderRadius: '8px',
        padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '💊 Pharmacy Inventory', path: '/pharmacy', color: '#27ae60' },
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

export default PharmacistDashboard