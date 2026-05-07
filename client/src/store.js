import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import patientReducer from './features/patients/patientSlice'
import doctorReducer from './features/doctors/doctorSlice'
import appointmentReducer from './features/appointments/appointmentSlice'
import billReducer from './features/bills/billSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    bills: billReducer,
  },
})

export default store