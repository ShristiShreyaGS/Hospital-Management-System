import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../features/auth/authSlice'

function ProfileEditForm() {
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [message, setMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate password fields if changing password
    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        setPasswordError('Current password is required to change password')
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setPasswordError('New passwords do not match')
        return
      }
      if (formData.newPassword.length < 6) {
        setPasswordError('New password must be at least 6 characters')
        return
      }
    }

    setPasswordError('')

    const submitData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }

    if (formData.newPassword) {
      submitData.currentPassword = formData.currentPassword
      submitData.newPassword = formData.newPassword
    }

    try {
      const result = await dispatch(updateUserProfile(submitData)).unwrap()
      setMessage('Profile updated successfully!')
      
      // Clear password fields after successful update
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to update profile')
    }
  }

  const styles = `
    .profile-edit-form {
      max-width: 500px;
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

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 1.5px solid #d8e3ed;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #0f2d4a;
      background: #f8fafc;
    }

    .password-section {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      border: 1px solid #e8eef5;
    }

    .password-section h4 {
      margin: 0 0 15px 0;
      color: #0f2d4a;
      font-size: 14px;
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

    .divider {
      height: 1px;
      background: #e8eef5;
      margin: 20px 0;
    }
  `

  return (
    <>
      <style>{styles}</style>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <h2 style={{ color: '#0f2d4a', marginBottom: '25px', fontSize: '22px' }}>Edit Profile</h2>

        {message && (
          <div className={`alert ${error ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}

        {error && !message && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

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

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="divider"></div>

        <div className="password-section">
          <h4>Change Password (Optional)</h4>

          {passwordError && (
            <div className="alert alert-error">
              {passwordError}
            </div>
          )}

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

        <div className="button-group">
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileEditForm
