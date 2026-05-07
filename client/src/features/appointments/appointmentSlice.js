import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')

export const getAppointments = createAsyncThunk('appointments/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/appointments`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => { state.isLoading = true })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default appointmentSlice.reducer