import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

export const getDoctors = createAsyncThunk('doctors/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/doctors`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false
        state.doctors = action.payload
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default doctorSlice.reducer