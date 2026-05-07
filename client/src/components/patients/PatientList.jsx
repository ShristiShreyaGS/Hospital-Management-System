import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatients, deletePatient } from '../../features/patients/patientSlice'

function PatientList({ onEdit }) {
  const dispatch = useDispatch()
  const { patients, isLoading } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getPatients())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      dispatch(deletePatient(id))
    }
  }

  if (isLoading) return <p>Loading patients...</p>

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={th}>Name</th>
            <th style={th}>Gender</th>
            <th style={th}>Blood Group</th>
            <th style={th}>Contact</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No patients found
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={td}>{patient.userId?.name || 'N/A'}</td>
                <td style={td}>{patient.gender}</td>
                <td style={td}>{patient.bloodGroup}</td>
                <td style={td}>{patient.contactNumber}</td>
                <td style={td}>{patient.currentHealthStatus}</td>
                <td style={td}>
                  <button
                    onClick={() => onEdit(patient)}
                    style={{ ...btn, background: '#2980b9', marginRight: '8px' }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    style={{ ...btn, background: '#e74c3c' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left' }
const td = { padding: '12px 16px' }
const btn = { 
  padding: '6px 12px', 
  color: 'white', 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer' 
}

export default PatientList