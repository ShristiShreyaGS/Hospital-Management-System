import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './routes/PrivateRoute'
import RoleRoute from './routes/RoleRoute'
import UnauthorizedPage from './pages/UnauthorizedPage'
import PatientsPage from './pages/PatientsPage'
import DoctorsPage from './pages/DoctorsPage'
import StaffManagementPage from './pages/admin/StaffManagementPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<h1>Hospital Management System</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/dashboard" element={
          
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/doctors" element={
          <PrivateRoute>
            <DoctorsPage />
          </PrivateRoute>
        } />
        <Route path="/patients" element={
          <PrivateRoute>
            <PatientsPage />
          </PrivateRoute>
        } />
        <Route path="/staff" element={
          <PrivateRoute>
            <StaffManagementPage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App