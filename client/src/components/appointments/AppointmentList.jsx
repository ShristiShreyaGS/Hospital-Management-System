import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointments, deleteAppointment } from '../../features/appointments/appointmentSlice'

function AppointmentList({ onEdit, onView }) {
  const dispatch = useDispatch()
  const { appointments, isLoading, total, pages } = useSelector((state) => state.appointments)
  const { user } = useSelector((state) => state.auth)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [sortBy, setSortBy] = useState('appointmentDate')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const params = { page, limit: 10, sortBy, order }
    if (status) params.status = status
    if (date) params.date = date
    if (search) params.search = search
    dispatch(getAppointments(params))
  }, [dispatch, search, status, date, sortBy, order, page])

  const handleDelete = (id) => {
    if (window.confirm('Cancel this appointment?')) dispatch(deleteAppointment(id))
  }

  const statusColor = {
    Scheduled: '#e67e22',
    Completed: '#27ae60',
    Cancelled: '#e74c3c',
    'No Show': '#95a5a6',
  }

  const inputStyle = {
    padding: '8px 12px', border: '1px solid #ddd',
    borderRadius: '4px', fontSize: '14px'
  }

  return (
    <div>
      {/* ── Search + Filter + Sort Bar ── */}
      <div style={{
        display: 'flex', gap: '10px', marginBottom: '20px',
        flexWrap: 'wrap', alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search by patient, doctor, reason..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          style={{ ...inputStyle, flex: '1', minWidth: '200px' }}
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }} style={inputStyle}>
          <option value="">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No Show">No Show</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => { setDate(e.target.value); setPage(1) }}
          style={inputStyle}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={inputStyle}>
          <option value="appointmentDate">Sort by Date</option>
          <option value="appointmentTime">Sort by Time</option>
          <option value="status">Sort by Status</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)} style={inputStyle}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        {(search || status || date) && (
          <button
            onClick={() => { setSearch(''); setStatus(''); setDate(''); setPage(1) }}
            style={{ ...inputStyle, background: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>

      {/* ── Count ── */}
      <p style={{ color: '#7f8c8d', fontSize: '13px', marginBottom: '12px' }}>
        Showing {appointments.length} of {total} appointments
      </p>

      {/* ── Table ── */}
      {isLoading ? (
        <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading appointments...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2c3e50', color: 'white' }}>
                <th style={th}>Patient</th>
                <th style={th}>Doctor</th>
                <th style={th}>Specialization</th>
                <th style={th}>Date</th>
                <th style={th}>Time</th>
                <th style={th}>Reason</th>
                <th style={th}>Status</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <td style={td}>{apt.patientId?.userId?.name || 'N/A'}</td>
                    <td style={td}>Dr. {apt.doctorId?.userId?.name || 'N/A'}</td>
                    <td style={td}>{apt.doctorId?.specialization || 'N/A'}</td>
                    <td style={td}>{new Date(apt.appointmentDate).toLocaleDateString('en-IN')}</td>
                    <td style={td}>{apt.appointmentTime}</td>
                    <td style={td}>{apt.reason || 'N/A'}</td>
                    <td style={td}>
                      <span style={{
                        background: statusColor[apt.status] || '#95a5a6',
                        color: 'white', padding: '3px 10px',
                        borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                      }}>
                        {apt.status}
                      </span>
                    </td>
                    <td style={td}>
                      {/* View — all roles */}
                      <button onClick={() => onView(apt._id)}
                        style={{ ...btn, background: '#8e44ad', marginRight: '6px' }}>
                        View
                      </button>

                      {/* Reschedule + Cancel — only on Scheduled, non-doctors */}
                      {user?.role !== 'doctor' && apt.status === 'Scheduled' && (
                        <>
                          <button onClick={() => onEdit(apt)}
                            style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                            Reschedule
                          </button>
                          <button onClick={() => handleDelete(apt._id)}
                            style={{ ...btn, background: '#e74c3c' }}>
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Doctor — update status only on Scheduled */}
                      {user?.role === 'doctor' && apt.status === 'Scheduled' && (
                        <button onClick={() => onEdit(apt)}
                          style={{ ...btn, background: '#27ae60' }}>
                          Update Status
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

      {/* ── Pagination ── */}
      {pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ ...btn, background: page === 1 ? '#bdc3c7' : '#2c3e50' }}>
            Previous
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ ...btn, background: p === page ? '#2980b9' : '#ecf0f1', color: p === page ? 'white' : '#2c3e50' }}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            style={{ ...btn, background: page === pages ? '#bdc3c7' : '#2c3e50' }}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '600' }
const td = { padding: '12px 16px', fontSize: '14px' }
const btn = { padding: '6px 12px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }

export default AppointmentList