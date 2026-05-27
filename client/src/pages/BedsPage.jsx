import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import BedList from '../components/beds/BedList'
import BedForm from '../components/beds/BedForm'

function BedsPage() {
  const [showForm, setShowForm] = useState(false)
  const [bedToEdit, setBedToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (bed) => {
    setBedToEdit(bed)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setBedToEdit(null)
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
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>Bed Management</h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Manage hospital beds and ward assignments
            </p>
          </div>
          {user?.role === 'admin' && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Add Bed
            </button>
          )}
        </div>

        <div style={{
          background: 'white', borderRadius: '8px',
          padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <BedList onEdit={handleEdit} />
        </div>

        {showForm && (
          <BedForm bedToEdit={bedToEdit} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}

export default BedsPage