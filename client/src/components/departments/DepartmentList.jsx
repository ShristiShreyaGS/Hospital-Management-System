import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartments, deleteDepartment } from '../../features/departments/departmentSlice'

function DepartmentList({ onEdit }) {
  const dispatch = useDispatch()
  const { departments, isLoading } = useSelector((state) => state.departments)

  useEffect(() => {
    dispatch(getDepartments())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this department?')) dispatch(deleteDepartment(id))
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading departments...</p>

  return (
    <div>
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px', marginBottom: '28px'
      }}>
        {departments.map((dept) => (
          <div key={dept._id} style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderLeft: '4px solid #2980b9',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h4 style={{ color: '#2c3e50', margin: '0 0 8px', fontSize: '16px' }}>
              {dept.name}
            </h4>
            <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '0 0 8px' }}>
              📍 {dept.location}
            </p>
            <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '0 0 8px' }}>
              👨‍⚕️ Head: {dept.headDoctorId?.userId?.name || 'Not assigned'}
            </p>
            <p style={{ color: '#7f8c8d', fontSize: '13px', margin: '0 0 12px' }}>
              👥 Staff: {dept.totalStaff}
            </p>
            <p style={{ color: '#95a5a6', fontSize: '12px', margin: '0 0 16px' }}>
              {dept.description}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => onEdit(dept)}
                style={{ ...btn, background: '#2980b9', flex: 1 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(dept._id)}
                style={{ ...btn, background: '#e74c3c', flex: 1 }}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {departments.length === 0 && (
          <p style={{ color: '#7f8c8d', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
            No departments found. Add your first department!
          </p>
        )}
      </div>
    </div>
  )
}

const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default DepartmentList