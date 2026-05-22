import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEMRById, clearSelectedEMR } from '../../features/emr/emrSlice'

function EMRDetail({ emrId, onClose }) {
  const dispatch = useDispatch()
  const { selectedEMR: emr, isLoading } = useSelector((state) => state.emr)

  useEffect(() => {
    dispatch(getEMRById(emrId))
    return () => dispatch(clearSelectedEMR())
  }, [dispatch, emrId])

  if (isLoading || !emr) return (
    <div style={overlay}><div style={modal}><p style={{ color: '#7f8c8d' }}>Loading...</p></div></div>
  )

  return (
    <div style={overlay}>
      <div style={modal}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ color: '#2c3e50', margin: 0 }}>Medical Record</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#7f8c8d' }}>✕</button>
        </div>

        {/* Patient + Doctor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div style={card}>
            <p style={lbl}>Patient</p>
            <p style={val}>{emr.patientId?.userId?.name || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={lbl}>Doctor</p>
            <p style={val}>Dr. {emr.doctorId?.userId?.name || 'N/A'}</p>
          </div>
          <div style={card}>
            <p style={lbl}>Visit Date</p>
            <p style={val}>{new Date(emr.visitDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div style={card}>
            <p style={lbl}>Follow Up</p>
            <p style={val}>{emr.followUpDate ? new Date(emr.followUpDate).toLocaleDateString('en-IN') : 'None'}</p>
          </div>
        </div>

        {/* Vitals */}
        {(emr.bloodPressure || emr.temperature || emr.weight || emr.heartRate) && (
          <div style={{ ...card, marginBottom: '16px' }}>
            <p style={{ ...lbl, marginBottom: '10px', fontSize: '13px', fontWeight: '600' }}>VITALS</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
              {emr.bloodPressure && <div><p style={lbl}>Blood Pressure</p><p style={val}>{emr.bloodPressure}</p></div>}
              {emr.temperature && <div><p style={lbl}>Temperature</p><p style={val}>{emr.temperature}</p></div>}
              {emr.weight && <div><p style={lbl}>Weight</p><p style={val}>{emr.weight}</p></div>}
              {emr.heartRate && <div><p style={lbl}>Heart Rate</p><p style={val}>{emr.heartRate}</p></div>}
            </div>
          </div>
        )}

        {/* Symptoms */}
        {emr.symptoms?.length > 0 && (
          <div style={{ ...card, marginBottom: '16px' }}>
            <p style={{ ...lbl, marginBottom: '8px' }}>Symptoms</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {emr.symptoms.map((s, i) => (
                <span key={i} style={{
                  background: '#eaf4fb', color: '#2980b9',
                  padding: '4px 12px', borderRadius: '12px', fontSize: '13px'
                }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Diagnosis */}
        <div style={{ ...card, marginBottom: '16px' }}>
          <p style={lbl}>Diagnosis</p>
          <p style={{ ...val, fontSize: '16px' }}>{emr.diagnosis}</p>
          {emr.notes && (
            <>
              <p style={{ ...lbl, marginTop: '10px' }}>Doctor's Notes</p>
              <p style={{ ...val, fontWeight: '400', color: '#555' }}>{emr.notes}</p>
            </>
          )}
        </div>

        {/* Prescription */}
        {emr.prescription?.length > 0 && (
          <div style={{ ...card, marginBottom: '16px' }}>
            <p style={{ ...lbl, marginBottom: '12px', fontSize: '13px', fontWeight: '600' }}>PRESCRIPTION</p>
            {emr.prescription.map((p, i) => (
              <div key={i} style={{
                background: 'white', padding: '12px', borderRadius: '6px',
                marginBottom: '8px', borderLeft: '3px solid #27ae60'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#2c3e50' }}>{p.medicine}</span>
                  <span style={{ color: '#27ae60', fontWeight: '600' }}>{p.dosage}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#7f8c8d' }}>
                  {p.frequency} · {p.duration}
                  {p.instructions && ` · ${p.instructions}`}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose} style={{
          width: '100%', padding: '10px', background: '#2c3e50',
          color: 'white', border: 'none', borderRadius: '4px',
          cursor: 'pointer', fontWeight: '600', marginTop: '8px'
        }}>Close</button>
      </div>
    </div>
  )
}

const overlay = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.5)', display: 'flex',
  justifyContent: 'center', alignItems: 'center', zIndex: 1000
}
const modal = {
  background: 'white', padding: '30px', borderRadius: '8px',
  width: '640px', maxHeight: '90vh', overflowY: 'auto'
}
const card = { background: '#f8f9fa', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #2c3e50' }
const lbl = { margin: '0 0 4px', fontSize: '12px', color: '#7f8c8d', fontWeight: '500' }
const val = { margin: 0, fontSize: '15px', color: '#2c3e50', fontWeight: '600' }

export default EMRDetail