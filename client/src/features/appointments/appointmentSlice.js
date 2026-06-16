import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

// ─── Thunks ────────────────────────────────────────────────────────────────

export const getAppointments = createAsyncThunk(
  'appointments/getAll',
  async (params = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString()
      const res = await axios.get(`${API}/appointments?${query}`, authHeader())
      return res.data // { appointments, total, page, pages }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch appointments')
    }
  }
)

export const fetchAppointmentById = createAsyncThunk(
  'appointments/getById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/appointments/${id}`, authHeader())
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch appointment')
    }
  }
)

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, thunkAPI) => {
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
      return id
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
    selectedAppointment: null,
    total: 0,
    page: 1,
    pages: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null
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
        state.appointments = action.payload.appointments  // ← changed from action.payload
        state.total = action.payload.total
        state.page = action.payload.page
        state.pages = action.payload.pages
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // ── fetchAppointmentById ─────────────────────────────────────────────
      .addCase(fetchAppointmentById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedAppointment = action.payload
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
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
        state.appointments.unshift(action.payload)  // add to top
        state.total += 1
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
        if (index !== -1) state.appointments[index] = action.payload
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
        state.total -= 1
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { clearAppointmentError, clearSelectedAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer