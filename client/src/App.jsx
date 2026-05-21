import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'
import UnauthorizedPage from './pages/UnauthorizedPage'
import PatientsPage from './pages/PatientsPage'
import DoctorsPage from './pages/DoctorsPage'
import StaffManagementPage from './pages/admin/StaffManagementPage'
import AppointmentsPage from './pages/AppointmentsPage'  // fixed: was imported as AppointmentPage
import BillsPage from './pages/BillsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/"         element={<Navigate to="/login" replace />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Dashboard — all authenticated roles */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />

        {/* Appointments — all roles, each sees their own filtered view */}
        <Route path="/appointments" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['patient', 'doctor', 'receptionist', 'admin']}>
              <AppointmentsPage />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Patients — admin and receptionist only */}
        <Route path="/patients" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['admin', 'receptionist']}>
              <PatientsPage />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Doctors — admin and receptionist only */}
        <Route path="/doctors" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['admin', 'receptionist']}>
              <DoctorsPage />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Staff management — admin only */}
        <Route path="/staff" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['admin']}>
              <StaffManagementPage />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Bills — all roles, each sees their own filtered view */}
        <Route path="/bills" element={
          <PrivateRoute>
            <RoleRoute allowedRoles={['patient', 'doctor', 'receptionist', 'admin']}>
              <BillsPage />
            </RoleRoute>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App