import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

export const getDoctors = createAsyncThunk('doctors/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/doctors`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const getDoctor = createAsyncThunk('doctors/getOne', async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/doctors/${id}`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const createDoctor = createAsyncThunk('doctors/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/doctors`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const updateDoctor = createAsyncThunk('doctors/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/doctors/${id}`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const deleteDoctor = createAsyncThunk('doctors/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/doctors/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    doctor: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDoctor: (state) => { state.doctor = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => { state.isLoading = true })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false
        state.doctors = action.payload
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.doctor = action.payload
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload)
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(d => d._id === action.payload._id)
        if (index !== -1) state.doctors[index] = action.payload
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(d => d._id !== action.payload)
      })
  }
})

export const { clearDoctor } = doctorSlice.actions
export default doctorSlice.reducer