import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import AdmissionList from '../components/admissions/AdmissionList'
import AdmissionForm from '../components/admissions/AdmissionForm'

function AdmissionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [admissionToEdit, setAdmissionToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (admission) => {
    setAdmissionToEdit(admission)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setAdmissionToEdit(null)
  }

  const canAdmit = ['admin', 'receptionist', 'nurse'].includes(user?.role)

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#f4f6f9', minHeight: '100vh' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>Admissions</h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Manage patient admissions and discharges
            </p>
          </div>
          {canAdmit && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Admit Patient
            </button>
          )}
        </div>

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <AdmissionList onEdit={handleEdit} />
        </div>

        {showForm && (
          <AdmissionForm admissionToEdit={admissionToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default AdmissionsPage