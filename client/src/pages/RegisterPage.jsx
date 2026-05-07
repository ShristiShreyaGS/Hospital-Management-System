import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser, loginUser } from '../features/auth/authSlice'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    address: '',
    contactNumber: '',
    emergencyContact: '',
    currentHealthStatus: '',
  })

  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    // Step 1: Register
    const result = await dispatch(registerUser({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: 'patient',
      age: formData.age,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies,
      address: formData.address,
      contactNumber: formData.contactNumber,
      emergencyContact: formData.emergencyContact,
      currentHealthStatus: formData.currentHealthStatus,
    }))

    // Step 2: Auto login
    if (result.meta.requestStatus === 'fulfilled') {
      const loginResult = await dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }))

      if (loginResult.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard')
      }
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '14px',
    fontSize: '14px',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    color: '#2c3e50',
    fontWeight: '500',
    fontSize: '14px',
  }

  const sectionStyle = {
    borderBottom: '2px solid #ecf0f1',
    paddingBottom: '20px',
    marginBottom: '20px',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '40px',
        width: '100%',
        maxWidth: '550px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '6px' }}>🏥 HMS</h2>
          <h3 style={{ color: '#2c3e50', marginBottom: '4px' }}>Patient Registration</h3>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
            Create your account to book appointments and manage your health
          </p>
        </div>

        {(error || formError) && (
          <p style={{
            color: '#e74c3c',
            background: '#fdf0ed',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {formError || error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <h4 style={{ color: '#2c3e50', marginBottom: '16px' }}>Account Details</h4>

            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" value={formData.name}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Username</label>
            <input type="text" name="username" value={formData.username}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Email</label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Phone</label>
            <input type="text" name="phone" value={formData.phone}
              onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Password</label>
            <input type="password" name="password" value={formData.password}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword}
              onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={sectionStyle}>
            <h4 style={{ color: '#2c3e50', marginBottom: '16px' }}>Medical Details</h4>

            <label style={labelStyle}>Age</label>
            <input type="number" name="age" value={formData.age}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Gender</label>
            <select name="gender" value={formData.gender}
              onChange={handleChange} required style={inputStyle}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label style={labelStyle}>Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup}
              onChange={handleChange} style={inputStyle}>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>

            <label style={labelStyle}>Allergies</label>
            <input type="text" name="allergies" value={formData.allergies}
              onChange={handleChange} placeholder="None or list allergies" style={inputStyle} />

            <label style={labelStyle}>Address</label>
            <input type="text" name="address" value={formData.address}
              onChange={handleChange} style={inputStyle} />

            <label style={labelStyle}>Contact Number</label>
            <input type="text" name="contactNumber" value={formData.contactNumber}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Emergency Contact</label>
            <input type="text" name="emergencyContact" value={formData.emergencyContact}
              onChange={handleChange} required style={inputStyle} />

            <label style={labelStyle}>Current Health Status</label>
            <select name="currentHealthStatus" value={formData.currentHealthStatus}
              onChange={handleChange} style={inputStyle}>
              <option value="">Select Status</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Critical">Critical</option>
              <option value="Stable">Stable</option>
              <option value="Under Observation">Under Observation</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading} style={{
            width: '100%', padding: '12px',
            background: '#2c3e50', color: 'white',
            border: 'none', borderRadius: '4px',
            fontSize: '16px', fontWeight: '600',
            cursor: 'pointer', marginBottom: '16px',
          }}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2c3e50', fontWeight: '600' }}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage