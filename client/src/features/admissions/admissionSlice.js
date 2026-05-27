import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export const getAdmissions = createAsyncThunk('admissions/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/admissions`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch admissions')
  }
})

export const createAdmission = createAsyncThunk('admissions/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/admissions`, data, config())
    return res.data.admission
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to admit patient')
  }
})

export const updateAdmission = createAsyncThunk('admissions/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/admissions/${id}`, data, config())
    return res.data.admission
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update admission')
  }
})

const admissionSlice = createSlice({
  name: 'admissions',
  initialState: {
    admissions: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAdmissionError: (state) => { state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdmissions.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(getAdmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.admissions = action.payload
      })
      .addCase(getAdmissions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.admissions.unshift(action.payload)
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateAdmission.fulfilled, (state, action) => {
        const index = state.admissions.findIndex(a => a._id === action.payload._id)
        if (index !== -1) state.admissions[index] = action.payload
      })
      .addCase(updateAdmission.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { clearAdmissionError } = admissionSlice.actions
export default admissionSlice.reducer