import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import AppointmentList from '../components/appointments/AppointmentList'
import AppointmentForm from '../components/appointments/AppointmentForm'
import AppointmentDetail from '../components/appointments/AppointmentDetail'

function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [appointmentToEdit, setAppointmentToEdit] = useState(null)
  const [viewingId, setViewingId] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (appointment) => {
    setAppointmentToEdit(appointment)
    setShowForm(true)
  }

  const handleView = (id) => {
    setViewingId(id)
  }

  const handleClose = () => {
    setShowForm(false)
    setAppointmentToEdit(null)
  }

  const canBook = !['doctor', 'nurse', 'lab_staff', 'pharmacist'].includes(user?.role)

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
              {user?.role === 'doctor' && 'Your scheduled appointments'}
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

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <AppointmentList onEdit={handleEdit} onView={handleView} />  {/* ← onView added */}
        </div>

        {showForm && (
          <AppointmentForm
            appointmentToEdit={appointmentToEdit}
            onClose={handleClose}
          />
        )}

        {viewingId && (  // ← Detail modal added
          <AppointmentDetail
            appointmentId={viewingId}
            onClose={() => setViewingId(null)}
          />
        )}
      </div>
    </div>
  )
}

export default AppointmentsPage