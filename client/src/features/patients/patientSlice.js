import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

// Get all patients
export const getPatients = createAsyncThunk('patients/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/patients`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

// Get single patient
export const getPatient = createAsyncThunk('patients/getOne', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/patients/${id}`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

// Create patient
export const createPatient = createAsyncThunk('patients/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/patients`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

// Update patient
export const updatePatient = createAsyncThunk('patients/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/patients/${id}`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

// Delete patient
export const deletePatient = createAsyncThunk('patients/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/patients/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    patient: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearPatient: (state) => {
      state.patient = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getPatients.pending, (state) => { state.isLoading = true })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false
        state.patients = action.payload
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get one
      .addCase(getPatient.fulfilled, (state, action) => {
        state.patient = action.payload
      })
      // Create
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload)
      })
      // Update
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(p => p._id === action.payload._id)
        if (index !== -1) state.patients[index] = action.payload
      })
      // Delete
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(p => p._id !== action.payload)
      })
  }
})

export const { clearPatient } = patientSlice.actions
export default patientSlice.reducer