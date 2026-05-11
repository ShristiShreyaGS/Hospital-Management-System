import { useState } from 'react'
import Navbar from '../components/Navbar'
import DoctorList from '../components/doctors/DoctorList'
import DoctorForm from '../components/doctors/DoctorForm'

function DoctorsPage() {
  const [showForm, setShowForm] = useState(false)
  const [doctorToEdit, setDoctorToEdit] = useState(null)

  const handleEdit = (doctor) => {
    setDoctorToEdit(doctor)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setDoctorToEdit(null)
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <h2 style={{ color: '#2c3e50' }}>Doctors</h2>
          <button onClick={() => setShowForm(true)} style={{
            padding: '10px 20px', background: '#2c3e50',
            color: 'white', border: 'none',
            borderRadius: '4px', cursor: 'pointer'
          }}>
            + Add Doctor
          </button>
        </div>
        <DoctorList onEdit={handleEdit} />
        {showForm && (
          <DoctorForm doctorToEdit={doctorToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default DoctorsPage