import { useState } from 'react'
import Navbar from '../components/Navbar'
import PatientList from '../components/patients/PatientList'
import PatientForm from '../components/patients/PatientForm'

function PatientsPage() {
  const [showForm, setShowForm] = useState(false)
  const [patientToEdit, setPatientToEdit] = useState(null)

  const handleEdit = (patient) => {
    setPatientToEdit(patient)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setPatientToEdit(null)
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ color: '#2c3e50' }}>Patients</h2>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 20px',
              background: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            + Add Patient
          </button>
        </div>
        <PatientList onEdit={handleEdit} />
        {showForm && (
          <PatientForm
            patientToEdit={patientToEdit}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default PatientsPage