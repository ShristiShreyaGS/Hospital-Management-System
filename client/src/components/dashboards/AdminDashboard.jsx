import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPatients } from '../../features/patients/patientSlice'
import { getDoctors } from '../../features/doctors/doctorSlice'
import { getAppointments } from '../../features/appointments/appointmentSlice'
import { getBills } from '../../features/bills/billSlice'
import { getStaff } from '../../features/staff/staffSlice'

function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { patients } = useSelector((state) => state.patients)
  const { doctors } = useSelector((state) => state.doctors)
  const { appointments } = useSelector((state) => state.appointments)
  const { bills } = useSelector((state) => state.bills)
  const { staff } = useSelector((state) => state.staff)

  useEffect(() => {
    dispatch(getPatients())
    dispatch(getDoctors())
    dispatch(getAppointments())
    dispatch(getBills())
    dispatch(getStaff())
  }, [dispatch])

  const stats = [
    { label: 'Total Patients', value: patients?.length || 0, color: '#2980b9', path: '/patients' },
    { label: 'Total Doctors', value: doctors?.length || 0, color: '#27ae60', path: '/doctors' },
    { label: 'Total Appointments', value: appointments?.length || 0, color: '#8e44ad', path: '/appointments' },
    { label: 'Total Bills', value: bills?.length || 0, color: '#e67e22', path: '/bills' },
    { label: 'Total Staff', value: staff?.length || 0, color: '#e74c3c', path: '/admin/staff' },
  ]

  const quickActions = [
    { label: '+ Add Staff', path: '/admin/staff', color: '#2c3e50' },
    { label: '+ Add Patient', path: '/patients', color: '#2980b9' },
    { label: 'Manage Beds', path: '/beds', color: '#27ae60' },
    { label: 'Departments', path: '/departments', color: '#8e44ad' },
  ]

  return (
    <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '8px' }}>Admin Dashboard</h2>
      <p style={{ color: '#7f8c8d', marginBottom: '28px', fontSize: '14px' }}>
        Welcome back! Here's what's happening in your hospital today.
      </p>

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            onClick={() => navigate(stat.path)}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderTop: `4px solid ${stat.color}`,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <p style={{ color: '#7f8c8d', fontSize: '13px', marginBottom: '8px' }}>
              {stat.label}
            </p>
            <h3 style={{ fontSize: '36px', color: stat.color, margin: 0 }}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              style={{
                padding: '10px 20px',
                background: action.color,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Doctors */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ color: '#2c3e50' }}>Recent Doctors</h3>
          <button onClick={() => navigate('/doctors')} style={{
            background: 'none', border: '1px solid #2c3e50',
            padding: '4px 12px', borderRadius: '4px',
            cursor: 'pointer', fontSize: '13px', color: '#2c3e50'
          }}>View All</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={th}>Name</th>
              <th style={th}>Specialization</th>
              <th style={th}>Experience</th>
              <th style={th}>Fee</th>
            </tr>
          </thead>
          <tbody>
            {doctors.slice(0, 5).map((doc) => (
              <tr key={doc._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={td}>{doc.userId?.name || 'N/A'}</td>
                <td style={td}>{doc.specialization}</td>
                <td style={td}>{doc.yearsOfExperience} yrs</td>
                <td style={td}>₹{doc.consultationFee}</td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                No doctors yet
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th = { padding: '10px 16px', textAlign: 'left', color: '#7f8c8d', fontSize: '13px' }
const td = { padding: '10px 16px', fontSize: '14px' }

export default AdminDashboard