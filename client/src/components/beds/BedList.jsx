import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBeds, deleteBed } from '../../features/beds/bedSlice'

function BedList({ onEdit }) {
  const dispatch = useDispatch()
  const { beds, isLoading } = useSelector((state) => state.beds)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getBeds())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm('Delete this bed?')) dispatch(deleteBed(id))
  }

  const statusColor = {
    Available: '#27ae60',
    Occupied: '#e74c3c',
  }

  // Summary counts
  const available = beds.filter(b => b.status === 'Available').length
  const occupied = beds.filter(b => b.status === 'Occupied').length

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading beds...</p>

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div style={{
          background: '#eafaf1', border: '1px solid #27ae60',
          borderRadius: '8px', padding: '12px 24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#27ae60' }}>{available}</div>
          <div style={{ fontSize: '13px', color: '#27ae60' }}>Available</div>
        </div>
        <div style={{
          background: '#fdf0ed', border: '1px solid #e74c3c',
          borderRadius: '8px', padding: '12px 24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#e74c3c' }}>{occupied}</div>
          <div style={{ fontSize: '13px', color: '#e74c3c' }}>Occupied</div>
        </div>
        <div style={{
          background: '#eaf4fb', border: '1px solid #2980b9',
          borderRadius: '8px', padding: '12px 24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#2980b9' }}>{beds.length}</div>
          <div style={{ fontSize: '13px', color: '#2980b9' }}>Total</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#2c3e50', color: 'white' }}>
              <th style={th}>Bed Number</th>
              <th style={th}>Ward</th>
              <th style={th}>Room</th>
              <th style={th}>Status</th>
              <th style={th}>Patient</th>
              {user?.role === 'admin' && <th style={th}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {beds.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                  No beds found
                </td>
              </tr>
            ) : (
              beds.map((bed) => (
                <tr key={bed._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={{ ...td, fontWeight: '600' }}>{bed.bedNumber}</td>
                  <td style={td}>{bed.ward}</td>
                  <td style={td}>{bed.room}</td>
                  <td style={td}>
                    <span style={{
                      background: statusColor[bed.status] || '#95a5a6',
                      color: 'white', padding: '3px 10px',
                      borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                    }}>
                      {bed.status}
                    </span>
                  </td>
                  <td style={td}>
                    {bed.patientId?.userId?.name || bed.patientId?.name || '—'}
                  </td>
                  {user?.role === 'admin' && (
                    <td style={td}>
                      <button onClick={() => onEdit(bed)}
                        style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(bed._id)}
                        style={{ ...btn, background: '#e74c3c' }}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default BedList