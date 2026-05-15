import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPatients } from '../../features/patients/patientSlice'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap');

  .patient-dashboard {
    min-height: 100vh;
    background: #f0f4f8;
    padding: 40px;
    font-family: 'DM Sans', sans-serif;
  }

  .dashboard-header {
    margin-bottom: 32px;
  }

  .dashboard-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    color: #0f2d4a;
    margin: 0 0 10px;
  }

  .dashboard-subtitle {
    color: #7a8fa6;
    font-size: 15px;
    margin: 0;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1.3fr 0.8fr;
    gap: 28px;
  }

  .dashboard-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 10px 40px rgba(15, 45, 74, 0.08);
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    color: #0f2d4a;
    font-size: 26px;
    margin-bottom: 24px;
  }

  .profile-table {
    width: 100%;
    border-collapse: collapse;
  }

  .profile-row {
    border-bottom: 1px solid #e8eef5;
  }

  .profile-row:last-child {
    border-bottom: none;
  }

  .profile-label {
    padding: 14px 0;
    color: #6d8299;
    font-size: 14px;
    font-weight: 600;
    width: 38%;
  }

  .profile-value {
    padding: 14px 0;
    color: #0f2d4a;
    font-size: 14px;
    font-weight: 500;
  }

  .loading-text {
    color: #7a8fa6;
    font-size: 15px;
  }

  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .action-btn {
    width: 100%;
    padding: 15px 18px;
    border: none;
    border-radius: 12px;
    background: #f8fafc;
    color: #0f2d4a;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
    border: 1.5px solid #d8e3ed;
  }

  .action-btn:hover {
    background: #1a4f7a;
    color: white;
    border-color: #1a4f7a;
    transform: translateY(-1px);
  }

  @media (max-width: 900px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .patient-dashboard {
      padding: 24px;
    }

    .dashboard-title {
      font-size: 28px;
    }

    .dashboard-card {
      padding: 22px;
    }

    .card-title {
      font-size: 22px;
    }
  }
`

function PatientDashboard() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { patients } = useSelector((state) => state.patients)

  useEffect(() => {
    dispatch(getPatients())
  }, [dispatch])

  const myProfile = patients.find(
    (p) =>
      p.userId?._id === user?.id ||
      p.userId?.email === user?.email
  )

  return (
    <>
      <style>{styles}</style>

      <div className="patient-dashboard">

        <div className="dashboard-header">

          <h2 className="dashboard-title">
            Welcome, {user?.name}
          </h2>

          <p className="dashboard-subtitle">
            Manage your appointments, health records,
            prescriptions, and billing information.
          </p>

        </div>

        <div className="dashboard-grid">

          {/* Profile Card */}
          <div className="dashboard-card">

            <h3 className="card-title">
              My Profile
            </h3>

            {myProfile ? (
              <table className="profile-table">
                <tbody>

                  {[
                    { label: 'Name', value: user?.name },
                    { label: 'Email', value: user?.email },
                    { label: 'Age', value: myProfile.age },
                    { label: 'Gender', value: myProfile.gender },
                    { label: 'Blood Group', value: myProfile.bloodGroup },
                    { label: 'Allergies', value: myProfile.allergies || 'None' },
                    { label: 'Address', value: myProfile.address },
                    { label: 'Contact', value: myProfile.contactNumber },
                    { label: 'Emergency Contact', value: myProfile.emergencyContact },
                    { label: 'Health Status', value: myProfile.currentHealthStatus },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="profile-row"
                    >
                      <td className="profile-label">
                        {row.label}
                      </td>

                      <td className="profile-value">
                        {row.value || 'N/A'}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            ) : (
              <p className="loading-text">
                Loading profile...
              </p>
            )}

          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">

            <h3 className="card-title">
              Quick Actions
            </h3>

            <div className="actions-container">

              {[
                {
                  label: 'Book Appointment',
                  path: '/appointments',
                },
                {
                  label: 'View My EMR',
                  path: '/emr',
                },
                {
                  label: 'View Lab Results',
                  path: '/lab',
                },
                {
                  label: 'View Prescriptions',
                  path: '/pharmacy',
                },
                {
                  label: 'View My Bills',
                  path: '/bills',
                },
              ].map((action) => (
                <button
                  key={action.label}
                  className="action-btn"
                  onClick={() => (
                    window.location.href = action.path
                  )}
                >
                  {action.label}
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default PatientDashboard