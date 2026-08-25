import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { getPrescriptions } from '../features/prescriptions/prescriptionSlice'

function PrescriptionsPage() {
  const dispatch = useDispatch()
  const { prescriptions, isLoading } = useSelector((state) => state.prescriptions)

  useEffect(() => { dispatch(getPrescriptions()) }, [dispatch])

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>My Prescriptions</h2>
        {isLoading ? <p>Loading...</p> : (
          <div style={{ marginTop: '16px' }}>
            {prescriptions.length === 0 ? (
              <p>No prescriptions found</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {prescriptions.map(p => (
                  <li key={p._id} style={{ background: '#fff', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: '700' }}>{p.medicine} · {p.dosage}</div>
                        <div style={{ color: '#666' }}>{p.frequency} · {p.duration}{p.instructions ? ` · ${p.instructions}` : ''}</div>
                      </div>
                      <div style={{ textAlign: 'right', color: '#333' }}>
                        <div style={{ fontWeight: '600' }}>{p.doctorId?.userId?.name ? `Dr. ${p.doctorId.userId.name}` : '—'}</div>
                        <div style={{ fontSize: '12px', color: '#777' }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PrescriptionsPage
