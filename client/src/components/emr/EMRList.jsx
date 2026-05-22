import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEMRs, deleteEMR } from '../../features/emr/emrSlice'

function EMRList({ onEdit, onView }) {
  const dispatch = useDispatch()
  const { emrs, isLoading, total, pages } = useSelector((state) => state.emr)
  const { user } = useSelector((state) => state.auth)

  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const params = { page, limit: 10 }
    if (search) params.search = search
    if (fromDate) params.fromDate = fromDate
    if (toDate) params.toDate = toDate
    dispatch(getEMRs(params))
  }, [dispatch, search, fromDate, toDate, page])

  const handleDelete = (id) => {
    if (window.confirm('Delete this EMR record?')) dispatch(deleteEMR(id))
  }

  const inputStyle = {
    padding: '8px 12px', border: '1px solid #ddd',
    borderRadius: '4px', fontSize: '14px'
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Search patient, doctor, diagnosis..."
          value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }} />
        <input type="date" value={fromDate}
          onChange={(e) => { setFromDate(e.target.value); setPage(1) }}
          style={inputStyle} />
        <input type="date" value={toDate}
          onChange={(e) => { setToDate(e.target.value); setPage(1) }}
          style={inputStyle} />
        {(search || fromDate || toDate) && (
          <button onClick={() => { setSearch(''); setFromDate(''); setToDate(''); setPage(1) }}
            style={{ ...inputStyle, background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>

      <p style={{ color: '#7f8c8d', fontSize: '13px', marginBottom: '12px' }}>
        Showing {emrs.length} of {total} records
      </p>

      {isLoading ? (
        <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading records...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2c3e50', color: 'white' }}>
                <th style={th}>Patient</th>
                <th style={th}>Doctor</th>
                <th style={th}>Visit Date</th>
                <th style={th}>Diagnosis</th>
                <th style={th}>Symptoms</th>
                <th style={th}>Follow Up</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emrs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                    No records found
                  </td>
                </tr>
              ) : (
                emrs.map((emr) => (
                  <tr key={emr._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <td style={td}>{emr.patientId?.userId?.name || 'N/A'}</td>
                    <td style={td}>Dr. {emr.doctorId?.userId?.name || 'N/A'}</td>
                    <td style={td}>{new Date(emr.visitDate).toLocaleDateString('en-IN')}</td>
                    <td style={td}>{emr.diagnosis}</td>
                    <td style={td}>
                      {emr.symptoms?.length > 0
                        ? emr.symptoms.slice(0, 2).map((s, i) => (
                          <span key={i} style={{
                            background: '#eaf4fb', color: '#2980b9',
                            padding: '2px 8px', borderRadius: '10px',
                            fontSize: '12px', marginRight: '4px'
                          }}>{s}</span>
                        ))
                        : 'N/A'}
                      {emr.symptoms?.length > 2 && (
                        <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
                          +{emr.symptoms.length - 2} more
                        </span>
                      )}
                    </td>
                    <td style={td}>
                      {emr.followUpDate
                        ? new Date(emr.followUpDate).toLocaleDateString('en-IN')
                        : <span style={{ color: '#bdc3c7' }}>None</span>}
                    </td>
                    <td style={td}>
                      <button onClick={() => onView(emr._id)}
                        style={{ ...btn, background: '#8e44ad', marginRight: '6px' }}>
                        View
                      </button>
                      {user?.role === 'doctor' && (
                        <button onClick={() => onEdit(emr)}
                          style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                          Edit
                        </button>
                      )}
                      {user?.role === 'admin' && (
                        <button onClick={() => handleDelete(emr._id)}
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
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ ...btn, background: page === 1 ? '#bdc3c7' : '#2c3e50' }}>Previous</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ ...btn, background: p === page ? '#2980b9' : '#ecf0f1', color: p === page ? 'white' : '#2c3e50' }}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            style={{ ...btn, background: page === pages ? '#bdc3c7' : '#2c3e50' }}>Next</button>
        </div>
      )}
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default EMRList