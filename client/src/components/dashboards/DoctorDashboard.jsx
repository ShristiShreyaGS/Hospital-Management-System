import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAppointments } from '../../features/appointments/appointmentSlice'
import { getPatients } from '../../features/patients/patientSlice'

function DoctorDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { appointments } = useSelector((state) => state.appointments)
  const { patients } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getAppointments())
    dispatch(getPatients())
  }, [dispatch])

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter(a =>
    a.appointmentDate?.split('T')[0] === today
  )
  const pendingAppointments = appointments.filter(a => a.status === 'pending')
  const completedAppointments = appointments.filter(a => a.status === 'completed')

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, color: '#2980b9' },
    { label: 'Pending', value: pendingAppointments.length, color: '#e67e22' },
    { label: 'Completed', value: completedAppointments.length, color: '#27ae60' },
    { label: 'Total Patients', value: patients.length, color: '#8e44ad' },
  ]

  return (
    <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>
        Good Morning, Dr. {user?.name} 👋
      </h2>
      <p style={{ color: '#7f8c8d', marginBottom: '28px', fontSize: '14px' }}>
        Here's your schedule for today.
      </p>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px', marginBottom: '30px'
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '8px',
            padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderTop: `4px solid ${stat.color}`
          }}>
            <p style={{ color: '#7f8c8d', fontSize: '13px', marginBottom: '8px' }}>{stat.label}</p>
            <h3 style={{ fontSize: '36px', color: stat.color, margin: 0 }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white', borderRadius: '8px',
        padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: '📅 My Appointments', path: '/appointments', color: '#2980b9' },
            { label: '📋 Write EMR', path: '/emr', color: '#8e44ad' },
            { label: '🧪 Lab Requests', path: '/lab', color: '#e67e22' },
            { label: '👥 My Patients', path: '/patients', color: '#27ae60' },
          ].map((action) => (
            <button key={action.label} onClick={() => navigate(action.path)} style={{
              padding: '10px 20px', background: action.color,
              color: 'white', border: 'none', borderRadius: '6px',
              cursor: 'pointer', fontWeight: '500', fontSize: '14px'
            }}>{action.label}</button>
          ))}
        </div>
      </div>

      {/* Today's Appointments */}
      <div style={{
        background: 'white', borderRadius: '8px',
        padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Today's Appointments</h3>
        {todayAppointments.length === 0 ? (
          <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '20px' }}>
            No appointments today
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={th}>Patient</th>
                <th style={th}>Time</th>
                <th style={th}>Reason</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((apt) => (
                <tr key={apt._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={td}>{apt.patientId?.userId?.name || 'N/A'}</td>
                  <td style={td}>{apt.appointmentTime}</td>
                  <td style={td}>{apt.reason}</td>
                  <td style={td}>
                    <span style={{
                      background: apt.status === 'completed' ? '#27ae60' :
                        apt.status === 'pending' ? '#e67e22' : '#e74c3c',
                      color: 'white', padding: '3px 10px',
                      borderRadius: '12px', fontSize: '12px'
                    }}>{apt.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const th = { padding: '10px 16px', textAlign: 'left', color: '#7f8c8d', fontSize: '13px' }
const td = { padding: '10px 16px', fontSize: '14px' }

export default DoctorDashboard