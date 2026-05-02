import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<h1>Hospital Management System</h1>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App