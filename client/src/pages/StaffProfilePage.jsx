import StaffEditForm from '../components/admin/StaffEditForm'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getStaff } from '../features/staff/staffSlice'

function StaffProfilePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { staff, isLoading } = useSelector((state) => state.staff)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!staff || staff.length === 0) {
      dispatch(getStaff())
    }
  }, [dispatch, staff])

  const myStaff = staff?.find((s) => s.userId?._id === user?.id)

  if (!myStaff) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading staff profile...</p>
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
