import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createPatient, updatePatient } from '../../features/patients/patientSlice'

function PatientForm({ patientToEdit, onClose }) {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    address: '',
    contactNumber: '',
    emergencyContact: '',
    currentHealthStatus: '',
  })

  useEffect(() => {
    if (patientToEdit) {
      setFormData({
        age: patientToEdit.age || '',
        gender: patientToEdit.gender || '',
        bloodGroup: patientToEdit.bloodGroup || '',
        allergies: patientToEdit.allergies || '',
        address: patientToEdit.address || '',
        contactNumber: patientToEdit.contactNumber || '',
        emergencyContact: patientToEdit.emergencyContact || '',
        currentHealthStatus: patientToEdit.currentHealthStatus || '',
      })
    }
  }, [patientToEdit])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (patientToEdit) {
      dispatch(updatePatient({ id: patientToEdit._id, data: formData }))
    } else {
      dispatch(createPatient(formData))
    }
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '30px',
        borderRadius: '8px', width: '500px',
        maxHeight: '80vh', overflowY: 'auto'
      }}>
        <h3>{patientToEdit ? 'Edit Patient' : 'Add Patient'}</h3>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Blood Group', name: 'bloodGroup', type: 'text' },
            { label: 'Allergies', name: 'allergies', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Contact Number', name: 'contactNumber', type: 'text' },
            { label: 'Emergency Contact', name: 'emergencyContact', type: 'text' },
            { label: 'Current Health Status', name: 'currentHealthStatus', type: 'text' },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', color: '#2c3e50' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '8px',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px', boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', color: '#2c3e50' }}>
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{
                width: '100%', padding: '8px',
                border: '1px solid #bdc3c7',
                borderRadius: '4px'
              }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{
              flex: 1, padding: '10px',
              background: '#27ae60', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              {patientToEdit ? 'Update Patient' : 'Add Patient'}
            </button>
            <button type="button" onClick={onClose} style={{
              flex: 1, padding: '10px',
              background: '#e74c3c', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientForm