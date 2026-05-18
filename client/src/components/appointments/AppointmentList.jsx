import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointments, deleteAppointment } from '../../features/appointments/appointmentSlice'

function AppointmentList({ onEdit }) {
  const dispatch = useDispatch()
  const { appointments, isLoading } = useSelector((state) => state.appointments)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAppointments())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Cancel this appointment?')) {
      dispatch(deleteAppointment(id))
    }
  }

  const statusColor = {
    pending: '#e67e22',
    confirmed: '#2980b9',
    completed: '#27ae60',
    cancelled: '#e74c3c',
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading appointments...</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={th}>Patient</th>
            <th style={th}>Doctor</th>
            <th style={th}>Date</th>
            <th style={th}>Time</th>
            <th style={th}>Reason</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((apt) => (
              <tr key={apt._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={td}>{apt.patientId?.name || apt.patientId?.userId?.name || 'N/A'}</td>
                <td style={td}>{apt.doctorId?.name || apt.doctorId?.userId?.name || 'N/A'}</td>
                <td style={td}>{new Date(apt.appointmentDate).toLocaleDateString('en-IN')}</td>
                <td style={td}>{apt.appointmentTime}</td>
                <td style={td}>{apt.reason || 'N/A'}</td>
                <td style={td}>
                  <span style={{
                    background: statusColor[apt.status] || '#95a5a6',
                    color: 'white',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {apt.status}
                  </span>
                </td>
                <td style={td}>
                  {/* Doctor cannot edit or delete */}
                  {user?.role !== 'doctor' && (
                    <>
                      <button
                        onClick={() => onEdit(apt)}
                        style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(apt._id)}
                        style={{ ...btn, background: '#e74c3c' }}>
                        Cancel
                      </button>
                    </>
                  )}
                  {/* Doctor can only update status */}
                  {user?.role === 'doctor' && (
                    <button
                      onClick={() => onEdit(apt)}
                      style={{ ...btn, background: '#27ae60' }}>
                      Update Status
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default AppointmentList