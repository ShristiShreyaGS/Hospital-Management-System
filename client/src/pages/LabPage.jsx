import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import LabList from '../components/lab/LabList'
import LabForm from '../components/lab/LabForm'

function LabPage() {
  const [showForm, setShowForm] = useState(false)
  const [labToEdit, setLabToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (lab) => {
    setLabToEdit(lab)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setLabToEdit(null)
  }

  const canOrder = user?.role === 'doctor' || user?.role === 'admin'

  const pageTitle = {
    doctor: 'Lab Requests',
    lab_staff: 'Lab Tests — Upload Results',
    patient: 'My Lab Results',
    admin: 'All Lab Tests',
    nurse: 'Lab Tests',
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
              {pageTitle[user?.role] || 'Lab Tests'}
            </h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              {user?.role === 'doctor' && 'Order and track lab tests for your patients'}
              {user?.role === 'lab_staff' && 'View pending tests and upload results'}
              {user?.role === 'patient' && 'View your lab test results'}
              {user?.role === 'admin' && 'Manage all lab tests'}
            </p>
          </div>
          {canOrder && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Order Lab Test
            </button>
          )}
        </div>

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <LabList onEdit={handleEdit} />
        </div>

        {showForm && (
          <LabForm labToEdit={labToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default LabPage