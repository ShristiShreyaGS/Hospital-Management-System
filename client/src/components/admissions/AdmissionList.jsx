import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdmissions, updateAdmission } from '../../features/admissions/admissionSlice'

function AdmissionList({ onEdit }) {
  const dispatch = useDispatch()
  const { admissions, isLoading } = useSelector((state) => state.admissions)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAdmissions())
  }, [dispatch])

  const handleDischarge = (id) => {
    if (window.confirm('Discharge this patient?')) {
      dispatch(updateAdmission({ id, data: { status: 'Discharged', dischargeDate: new Date() } }))
    }
  }

  const statusColor = {
    Admitted: '#2980b9',
    Discharged: '#27ae60',
    Transferred: '#8e44ad',
  }

  if (isLoading) return <p style={{ padding: '20px', color: '#7f8c8d' }}>Loading admissions...</p>

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#2c3e50', color: 'white' }}>
            <th style={th}>Patient</th>
            <th style={th}>Doctor</th>
            <th style={th}>Bed</th>
            <th style={th}>Ward</th>
            <th style={th}>Reason</th>
            <th style={th}>Admission Date</th>
            <th style={th}>Discharge Date</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admissions.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#7f8c8d' }}>
                No admissions found
              </td>
            </tr>
          ) : (
            admissions.map((adm) => (
              <tr key={adm._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={td}>{adm.patientId?.userId?.name || 'N/A'}</td>
                <td style={td}>Dr. {adm.doctorId?.userId?.name || 'N/A'}</td>
                <td style={td}>{adm.bedId?.bedNumber || 'N/A'}</td>
                <td style={td}>{adm.bedId?.ward || 'N/A'}</td>
                <td style={td}>{adm.reason}</td>
                <td style={td}>
                  {adm.admissionDate
                    ? new Date(adm.admissionDate).toLocaleDateString('en-IN')
                    : '—'}
                </td>
                <td style={td}>
                  {adm.dischargeDate
                    ? new Date(adm.dischargeDate).toLocaleDateString('en-IN')
                    : '—'}
                </td>
                <td style={td}>
                  <span style={{
                    background: statusColor[adm.status] || '#95a5a6',
                    color: 'white', padding: '3px 10px',
                    borderRadius: '12px', fontSize: '12px', fontWeight: '500'
                  }}>
                    {adm.status}
                  </span>
                </td>
                <td style={td}>
                  {adm.status === 'Admitted' && (
                    <>
                      <button onClick={() => onEdit(adm)}
                        style={{ ...btn, background: '#2980b9', marginRight: '6px' }}>
                        Edit
                      </button>
                      {(user?.role === 'admin' || user?.role === 'doctor' ||
                        user?.role === 'nurse' || user?.role === 'receptionist') && (
                        <button onClick={() => handleDischarge(adm._id)}
                          style={{ ...btn, background: '#27ae60' }}>
                          Discharge
                        </button>
                      )}
                    </>
                  )}
                  {adm.status !== 'Admitted' && (
                    <span style={{ color: '#7f8c8d', fontSize: '13px' }}>—</span>
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

export default AdmissionList