import { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import DepartmentList from '../components/departments/DepartmentList'
import DepartmentForm from '../components/departments/DepartmentForm'

function DepartmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [departmentToEdit, setDepartmentToEdit] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const handleEdit = (department) => {
    setDepartmentToEdit(department)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setDepartmentToEdit(null)
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
            <h2 style={{ color: '#2c3e50', marginBottom: '4px' }}>Departments</h2>
            <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
              Manage hospital departments and their head doctors
            </p>
          </div>
          {user?.role === 'admin' && (
            <button onClick={() => setShowForm(true)} style={{
              padding: '10px 20px', background: '#2c3e50',
              color: 'white', border: 'none', borderRadius: '4px',
              cursor: 'pointer', fontWeight: '600'
            }}>
              + Add Department
            </button>
          )}
        </div>

        <DepartmentList onEdit={handleEdit} />

        {showForm && (
          <DepartmentForm
            departmentToEdit={departmentToEdit}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  )
}

export default DepartmentsPage