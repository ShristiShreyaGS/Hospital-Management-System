import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatients } from '../../features/patients/patientSlice'

function PatientDashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { patients } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getPatients())
  }, [dispatch])

  // Find the logged in patient's profile
  const myProfile = patients.find(p => p.userId?._id === user?.id ||  p.userId?.email === user?.email)

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '24px' }}>
        Welcome, {user?.name} 👋
      </h2>

  <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>

        {/* Profile Card */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #2980b9'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>My Profile</h3>
          {myProfile ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  { label: 'Name', value: user?.name },
                  { label: 'Email', value: user?.email },
                  { label: 'Age', value: myProfile.age },
                  { label: 'Gender', value: myProfile.gender },
                  { label: 'Blood Group', value: myProfile.bloodGroup },
                  { label: 'Allergies', value: myProfile.allergies || 'None' },
                  { label: 'Address', value: myProfile.address },
                  { label: 'Contact', value: myProfile.contactNumber },
                  { label: 'Emergency Contact', value: myProfile.emergencyContact },
                  { label: 'Health Status', value: myProfile.currentHealthStatus },
                ].map((row) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <td style={{
                      padding: '10px 0',
                      color: '#7f8c8d',
                      fontWeight: '500',
                      width: '40%'
                    }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '10px 0', color: '#2c3e50' }}>
                      {row.value || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#7f8c8d' }}>Loading profile...</p>
          )}
        </div>

        {/* Quick Actions Card */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderTop: '4px solid #27ae60'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: '📅 Book Appointment', color: '#2980b9', path: '/appointments' },
              { label: '📋 View My EMR', color: '#8e44ad', path: '/emr' },
              { label: '🧪 View Lab Results', color: '#e67e22', path: '/lab' },
              { label: '💊 View Prescriptions', color: '#27ae60', path: '/pharmacy' },
              { label: '🧾 View My Bills', color: '#e74c3c', path: '/bills' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => window.location.href = action.path}
                style={{
                  padding: '12px',
                  background: action.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  fontWeight: '500',
                }}>
                {action.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PatientDashboard