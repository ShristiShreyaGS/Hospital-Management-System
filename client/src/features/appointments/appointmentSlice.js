import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

// ─── Thunks ────────────────────────────────────────────────────────────────

export const getAppointments = createAsyncThunk(
  'appointments/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/appointments`, authHeader())
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch appointments')
    }
  }
)

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, thunkAPI) => {
    // appointmentData: { patientId?, doctorId, appointmentDate, appointmentTime, reason }
    // patientId is optional — backend auto-fills it for patients from req.user
    try {
      const res = await axios.post(`${API}/appointments`, appointmentData, authHeader())
      return res.data.appointment
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create appointment')
    }
  }
)

export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/appointments/${id}`, updatedData, authHeader())
      return res.data.appointment
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update appointment')
    }
  }
)

export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API}/appointments/${id}`, authHeader())
      return id  // return the id so we can remove it from state
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete appointment')
    }
  }
)

// ─── Slice ─────────────────────────────────────────────────────────────────

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

      // ── getAppointments ──────────────────────────────────────────────────
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // ── createAppointment ────────────────────────────────────────────────
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments.push(action.payload)
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // ── updateAppointment ────────────────────────────────────────────────
      .addCase(updateAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.appointments.findIndex(a => a._id === action.payload._id)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // ── deleteAppointment ────────────────────────────────────────────────
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = state.appointments.filter(a => a._id !== action.payload)
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { clearAppointmentError } = appointmentSlice.actions
export default appointmentSlice.reducer
