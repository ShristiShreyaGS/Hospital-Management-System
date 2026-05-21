import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointmentById, clearSelectedAppointment } from '../../features/appointments/appointmentSlice'

function AppointmentDetail({ appointmentId, onClose }) {
  const dispatch = useDispatch()
  const { selectedAppointment: apt, isLoading } = useSelector((state) => state.appointments)

  useEffect(() => {
    dispatch(fetchAppointmentById(appointmentId))
    return () => dispatch(clearSelectedAppointment())
  }, [dispatch, appointmentId])

  const statusColor = {
    Scheduled: '#e67e22',
    Completed: '#27ae60',
    Cancelled: '#e74c3c',
    'No Show': '#95a5a6',
  }

  if (isLoading || !apt) return (
    <div style={overlay}>
      <div style={modal}>
        <p style={{ color: '#7f8c8d' }}>Loading...</p>
      </div>
    </div>
  )

  return (
    <div style={overlay}>
      <div style={modal}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ color: '#2c3e50', margin: 0 }}>Appointment Details</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            fontSize: '20px', cursor: 'pointer', color: '#7f8c8d'
          }}>✕</button>
        </div>

        {/* Status Badge */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            background: statusColor[apt.status] || '#95a5a6',
            color: 'white', padding: '4px 14px',
            borderRadius: '12px', fontSize: '13px', fontWeight: '600'
          }}>
            {apt.status}
          </span>
        </div>

        {/* Detail Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={card}>
            <p style={label}>Patient</p>
            <p style={value}>{apt.patientId?.userId?.name || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={label}>Doctor</p>
            <p style={value}>Dr. {apt.doctorId?.userId?.name || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={label}>Specialization</p>
            <p style={value}>{apt.doctorId?.specialization || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={label}>Consultation Fee</p>
            <p style={value}>₹{apt.doctorId?.consultationFee || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={label}>Date</p>
            <p style={value}>
              {new Date(apt.appointmentDate).toLocaleDateString('en-IN', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
          <div style={card}>
            <p style={label}>Time</p>
            <p style={value}>{apt.appointmentTime}</p>
          </div>
          <div style={{ ...card, gridColumn: '1 / -1' }}>
            <p style={label}>Reason for Visit</p>
            <p style={value}>{apt.reason || 'N/A'}</p>
          </div>
        </div>

        {/* Close Button */}
        <button onClick={onClose} style={{
          marginTop: '24px', width: '100%', padding: '10px',
          background: '#2c3e50', color: 'white', border: 'none',
          borderRadius: '4px', cursor: 'pointer', fontWeight: '600'
        }}>
          Close
        </button>

      </div>
    </div>
  )
}

const overlay = {
  position: 'fixed', top: 0, left: 0,
  width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  zIndex: 1000
}
const modal = {
  background: 'white', padding: '30px',
  borderRadius: '8px', width: '560px',
  maxHeight: '90vh', overflowY: 'auto'
}
const card = {
  background: '#f8f9fa', padding: '12px',
  borderRadius: '6px', borderLeft: '3px solid #2c3e50'
}
const label = { margin: '0 0 4px', fontSize: '12px', color: '#7f8c8d', fontWeight: '500' }
const value = { margin: 0, fontSize: '15px', color: '#2c3e50', fontWeight: '600' }

export default AppointmentDetail