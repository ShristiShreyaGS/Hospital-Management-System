import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

export const getStaff = createAsyncThunk('staff/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/staff`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const createStaff = createAsyncThunk('staff/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/staff`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const updateStaff = createAsyncThunk('staff/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/staff/${id}`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const deleteStaff = createAsyncThunk('staff/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/staff/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staff: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaff.pending, (state) => { state.isLoading = true })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false
        state.staff = action.payload
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.staff.push(action.payload)
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staff.findIndex(s => s._id === action.payload._id)
        if (index !== -1) state.staff[index] = action.payload
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staff = state.staff.filter(s => s._id !== action.payload)
      })
  }
})

export default staffSlice.reducer