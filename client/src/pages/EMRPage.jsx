import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import EMRList from '../components/emr/EMRList'
import EMRForm from '../components/emr/EMRForm'
import EMRDetail from '../components/emr/EMRDetail'

function EMRPage() {
  const [showForm, setShowForm] = useState(false)
  const [emrToEdit, setEMRToEdit] = useState(null)
  const [viewingId, setViewingId] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (emr) => {
    setEMRToEdit(emr)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEMRToEdit(null)
  }

  const pageTitle = {
    doctor: 'My Patient Records',
    patient: 'My Medical History',
    admin: 'All Medical Records',
    receptionist: 'Medical Records',
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
              {pageTitle[user?.role] || 'Medical Records'}
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {user?.role === 'doctor' && 'Create and manage patient medical records'}
              {user?.role === 'patient' && 'View your medical history and prescriptions'}
              {user?.role === 'admin' && 'View all patient medical records'}
              {user?.role === 'receptionist' && 'View patient medical records'}
            </p>
          </div>
          {user?.role === 'doctor' && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + New Record
            </button>
          )}
        </div>

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <EMRList onEdit={handleEdit} onView={setViewingId} />
        </div>

        {showForm && <EMRForm emrToEdit={emrToEdit} onClose={handleClose} />}
        {viewingId && <EMRDetail emrId={viewingId} onClose={() => setViewingId(null)} />}
      </div>
    </div>
  )
}

export default EMRPage