import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatients } from '../../features/patients/patientSlice'
import { getDoctors } from '../../features/doctors/doctorSlice'
import { getAppointments } from '../../features/appointments/appointmentSlice'
import { getBills } from '../../features/bills/billSlice'

function AdminDashboard() {
  const dispatch = useDispatch()
  const { patients } = useSelector((state) => state.patients)
  const { doctors } = useSelector((state) => state.doctors)
  const { appointments } = useSelector((state) => state.appointments)
  const { bills } = useSelector((state) => state.bills)

  useEffect(() => {
    dispatch(getPatients())
    dispatch(getDoctors())
    dispatch(getAppointments())
    dispatch(getBills())
  }, [dispatch])

  const stats = [
    { label: 'Total Patients', value: patients?.length || 0, color: '#2980b9' },
    { label: 'Total Doctors', value: doctors?.length || 0, color: '#27ae60' },
    { label: 'Total Appointments', value: appointments?.length || 0, color: '#8e44ad' },
    { label: 'Total Bills', value: bills?.length || 0, color: '#e67e22' },
  ]

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '24px', color: '#2c3e50' }}>Admin Dashboard</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '20px' 
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            background: 'white',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderTop: `4px solid ${stat.color}`
          }}>
            <p style={{ color: '#7f8c8d', fontSize: '14px', marginBottom: '8px' }}>
              {stat.label}
            </p>
            <h3 style={{ fontSize: '32px', color: stat.color, margin: 0 }}>
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard