import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctors, deleteDoctor } from '../../features/doctors/doctorSlice'

function DoctorList({ onEdit }) {
  const dispatch = useDispatch()
  const { doctors, isLoading } = useSelector((state) => state.doctors)

  useEffect(() => {
    dispatch(getDoctors())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      dispatch(deleteDoctor(id))
    }
  }

  if (isLoading) return <p>Loading doctors...</p>

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#2c3e50', color: 'white' }}>
          <th style={th}>Name</th>
          <th style={th}>Specialization</th>
          <th style={th}>Degree</th>
          <th style={th}>Experience</th>
          <th style={th}>Fee</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
              No doctors found
            </td>
          </tr>
        ) : (
          doctors.map((doctor) => (
            <tr key={doctor._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
              <td style={td}>{doctor.userId?.name || 'N/A'}</td>
              <td style={td}>{doctor.specialization}</td>
              <td style={td}>{doctor.degree}</td>
              <td style={td}>{doctor.yearsOfExperience} yrs</td>
              <td style={td}>₹{doctor.consultationFee}</td>
              <td style={td}>
                <button onClick={() => onEdit(doctor)}
                  style={{ ...btn, background: '#2980b9', marginRight: '8px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(doctor._id)}
                  style={{ ...btn, background: '#e74c3c' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

const th = { padding: '12px 16px', textAlign: 'left' }
const td = { padding: '12px 16px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }

export default DoctorList