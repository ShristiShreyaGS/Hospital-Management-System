import ProfileEditForm from '../components/common/ProfileEditForm'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Navigation Bar */}
      <div style={{ background: '#0f2d4a', color: 'white', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Edit Profile</h2>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'none', border: 'none', color: 'white',
            cursor: 'pointer', fontSize: '14px', fontWeight: '500',
            textDecoration: 'underline'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
      
      <div style={{ padding: '40px 20px' }}>
        <ProfileEditForm />
      </div>
    </div>
  )
}

export default ProfilePage
