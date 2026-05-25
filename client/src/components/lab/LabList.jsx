import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLabTests, deleteLabTest } from '../../features/lab/labSlice'

function LabList({ onEdit }) {
  const dispatch = useDispatch()
  const { labs, isLoading } = useSelector((state) => state.lab)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getLabTests())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this lab test?')) dispatch(deleteLabTest(id))
  }

  const statusColor = {
    'Requested': '#e67e22',
    'In Progress': '#2980b9',
    'Completed': '#27ae60',
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading lab tests...</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={th}>Patient</th>
            <th style={th}>Doctor</th>
            <th style={th}>Test Name</th>
            <th style={th}>Status</th>
            <th style={th}>Result</th>
            <th style={th}>Requested Date</th>
            <th style={th}>Completed Date</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labs.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                No lab tests found
              </td>
            </tr>
          ) : (
            labs.map((lab) => (
              <tr key={lab._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={td}>{lab.patientId?.userId?.name || 'N/A'}</td>
                <td style={td}>{lab.doctorId?.userId?.name || 'N/A'}</td>
                <td style={td}>{lab.testName}</td>
                <td style={td}>
                  <span style={{
                    background: statusColor[lab.status] || '#95a5a6',
                    color: 'white', padding: '3px 10px',
                    borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                  }}>
                    {lab.status}
                  </span>
                </td>
                <td style={td}>{lab.result || '—'}</td>
                <td style={td}>
                  {lab.requestedDate
                    ? new Date(lab.requestedDate).toLocaleDateString('en-IN')
                    : '—'}
                </td>
                <td style={td}>
                  {lab.completedDate
                    ? new Date(lab.completedDate).toLocaleDateString('en-IN')
                    : '—'}
                </td>
                <td style={td}>
                  {/* Doctor can order, lab_staff can update results, admin can delete */}
                  {(user?.role === 'lab_staff' || user?.role === 'doctor' || user?.role === 'admin') && (
                    <button onClick={() => onEdit(lab)}
                      style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                      {user?.role === 'lab_staff' ? 'Upload Result' : 'Edit'}
                    </button>
                  )}
                  {user?.role === 'admin' && (
                    <button onClick={() => handleDelete(lab._id)}
                      style={{ ...btn, background: '#e74c3c' }}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default LabList