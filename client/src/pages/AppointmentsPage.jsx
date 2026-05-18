import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import AppointmentList from '../components/appointments/AppointmentList'
import AppointmentForm from '../components/appointments/AppointmentForm'

function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [appointmentToEdit, setAppointmentToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setAppointmentToEdit(null)
  }

  // Doctors cannot book appointments
  const canBook = user?.role !== 'doctor' && user?.role !== 'nurse' &&
    user?.role !== 'lab_staff' && user?.role !== 'pharmacist'

  const pageTitle = {
    patient: 'My Appointments',
    doctor: 'My Schedule',
    receptionist: 'Appointments',
    admin: 'All Appointments',
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>
              {pageTitle[user?.role] || 'Appointments'}
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {user?.role === 'patient' && 'View and manage your appointments'}
              {user?.role === 'doctor' && 'Your scheduled appointments for today and upcoming'}
              {user?.role === 'receptionist' && 'Manage all patient appointments'}
              {user?.role === 'admin' && 'View and manage all appointments'}
            </p>
          </div>
          {canBook && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Book Appointment
            </button>
          )}
        </div>

        {/* White card container */}
        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <AppointmentList onEdit={handleEdit} />
        </div>

        {showForm && (
          <AppointmentForm
            appointmentToEdit={appointmentToEdit}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage