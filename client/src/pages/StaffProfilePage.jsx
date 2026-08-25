import StaffEditForm from '../components/admin/StaffEditForm'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getMyStaffProfile } from '../features/staff/staffSlice'

function StaffProfilePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myStaff, isLoading, error } = useSelector((state) => state.staff)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user?.id) {
      dispatch(getMyStaffProfile())
    }
  }, [dispatch, user?.id])

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading staff profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#b91c1c', marginBottom: '16px' }}>{error}</p>
        <button
          onClick={() => dispatch(getMyStaffProfile())}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#0f2d4a',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  if (!myStaff) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Staff profile not found.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Navigation Bar */}
      <div style={{ background: '#0f2d4a', color: 'white', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Edit Staff Profile</h2>
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
        <StaffEditForm staffId={myStaff._id} />
      </div>
    </div>
  )
}

export default StaffProfilePage
