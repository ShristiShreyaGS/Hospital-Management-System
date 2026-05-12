import { useState } from 'react'
import Navbar from '../../components/Navbar'
import StaffList from '../../components/admin/StaffList'
import AddStaffForm from '../../components/admin/AddStaffForm'

function StaffManagementPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px'
        }}>
          <div>
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>Staff Management</h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Add and manage hospital staff — doctors, nurses, receptionists, lab staff and pharmacists
            </p>
          </div>
          <button onClick={() => setShowForm(true)} style={{
            padding: '10px 20px', background: '#2c3e50',
            color: 'white', border: 'none',
            borderRadius: '4px', cursor: 'pointer',
            fontWeight: '600'
          }}>
            + Add Staff
          </button>
        </div>

        <StaffList />

        {showForm && (
          <AddStaffForm onClose={() => setShowForm(false)} />
        )}
      </div>
    </div>
  )
}

export default StaffManagementPage