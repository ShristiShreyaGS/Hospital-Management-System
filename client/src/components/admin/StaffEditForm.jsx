import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../features/auth/authSlice'
import { updateStaff, getStaff } from '../../features/staff/staffSlice'

function StaffEditForm({ staffId }) {
  const dispatch = useDispatch()
  const { user, isLoading: authLoading } = useSelector((state) => state.auth)
  const { staff: staffList } = useSelector((state) => state.staff)
  
  const staff = staffList?.find((s) => s._id === staffId)
  
  const [formData, setFormData] = useState({
    // User fields
    name: '',
    email: '',
    phone: '',
    // Staff specific fields
    position: '',
    specialization: '',
    experience: '',
    licenseNumber: '',
    licenseExpiry: '',
    qualifications: '',
    contactNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordSection, setShowPasswordSection] = useState(false)

  useEffect(() => {
    if (user && staff) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        position: staff.position || '',
        specialization: staff.specialization || '',
        experience: staff.experience || '',
        licenseNumber: staff.licenseNumber || '',
        licenseExpiry: staff.licenseExpiry || '',
        qualifications: staff.qualifications || '',
        contactNumber: staff.contactNumber || '',
        address: staff.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  }, [user, staff])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to change password')
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match')
        return
      }
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters')
        return
      }
    }

    setIsLoading(true)

    try {
      // Update user profile
      const userSubmitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }
      if (formData.newPassword) {
        userSubmitData.currentPassword = formData.currentPassword
        userSubmitData.newPassword = formData.newPassword
      }
      
      await dispatch(updateUserProfile(userSubmitData)).unwrap()

      // Update staff profile
      const staffSubmitData = {
        position: formData.position,
        specialization: formData.specialization,
        experience: formData.experience,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        qualifications: formData.qualifications,
        contactNumber: formData.contactNumber,
        address: formData.address,
      }

      await dispatch(updateStaff({ id: staffId, data: staffSubmitData })).unwrap()

      // Refetch staff data to ensure persistence
      await dispatch(getStaff())

      setMessage('Profile updated successfully!')
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setError(err || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const styles = `
    .staff-edit-form {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #0f2d4a;
      font-weight: 600;
      font-size: 14px;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1.5px solid #d8e3ed;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #0f2d4a;
      background: #f8fafc;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .section-divider {
      height: 1px;
      background: #e8eef5;
      margin: 25px 0;
    }

    .section-title {
      color: #0f2d4a;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 25px;
    }

    .btn-submit {
      flex: 1;
      padding: 12px;
      background: #0f2d4a;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .btn-submit:hover {
      background: #1a4f7a;
    }

    .btn-submit:disabled {
      background: #b0bcc8;
      cursor: not-allowed;
    }

    .alert {
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 15px;
      font-size: 14px;
    }

    .alert-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .alert-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .password-section {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e8eef5;
    }

    .btn-toggle-password {
      padding: 10px 15px;
      background: #e8f1f8;
      color: #0f2d4a;
      border: 1px solid #d8e3ed;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
      margin-bottom: 15px;
    }

    .btn-toggle-password:hover {
      background: #d8e3ed;
    }
  `

  if (!staff) {
    return <div>Loading...</div>
  }

  return (
    <>
      <style>{styles}</style>
      <form className="staff-edit-form" onSubmit={handleSubmit}>
        <h2 style={{ color: '#0f2d4a', marginBottom: '25px', fontSize: '22px' }}>Edit Staff Profile</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="section-title">Personal Information</div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
            />
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="section-title">Professional Information</div>

        <div className="form-row">
          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="E.g., Nurse, Lab Technician"
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter specialization"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
            />
          </div>
          <div className="form-group">
            <label>Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="E.g., BSN, RN, CNA"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter license number"
            />
          </div>
          <div className="form-group">
            <label>License Expiry</label>
            <input
              type="date"
              name="licenseExpiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="section-title">Contact Information</div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="3"
          ></textarea>
        </div>

        <div className="section-divider"></div>

        <button
          type="button"
          className="btn-toggle-password"
          onClick={() => setShowPasswordSection(!showPasswordSection)}
        >
          {showPasswordSection ? '▼ Hide Password Settings' : '▶ Change Password (Optional)'}
        </button>

        {showPasswordSection && (
          <div className="password-section">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="btn-submit" disabled={isLoading || authLoading}>
            {isLoading || authLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </>
  )
}

export default StaffEditForm
