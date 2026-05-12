import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import patientReducer from './features/patients/patientSlice'
import doctorReducer from './features/doctors/doctorSlice'
import appointmentReducer from './features/appointments/appointmentSlice'
import billReducer from './features/bills/billSlice'
import staffReducer from './features/staff/staffSlice'
import departmentReducer from './features/departments/departmentSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    bills: billReducer,
    staff: staffReducer,
    departments: departmentReducer,
  },
})

export default store