import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE } from '../../utils/apiBase'

const API = API_BASE
const getToken = () => localStorage.getItem('token')
const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

export const getStaff = createAsyncThunk('staff/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/staff`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch staff')
  }
})

export const getMyStaffProfile = createAsyncThunk('staff/getMyProfile', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/staff/me`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch staff profile')
  }
})

export const createStaff = createAsyncThunk('staff/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/staff`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create staff')
  }
})

export const updateStaff = createAsyncThunk('staff/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/staff/${id}`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update staff')
  }
})

export const deleteStaff = createAsyncThunk('staff/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/staff/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete staff')
  }
})

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    staff: [],
    myStaff: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaff.pending, (state) => { state.isLoading = true })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.staff = action.payload
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getMyStaffProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyStaffProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.myStaff = action.payload

        const index = state.staff.findIndex(s => s._id === action.payload._id)
        if (index !== -1) {
          state.staff[index] = action.payload
        } else {
          state.staff.push(action.payload)
        }
      })
      .addCase(getMyStaffProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.staff.push(action.payload)
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const updatedStaff = action.payload.staff || action.payload
        const index = state.staff.findIndex(s => s._id === updatedStaff._id)
        if (index !== -1) state.staff[index] = updatedStaff

        if (state.myStaff && state.myStaff._id === updatedStaff._id) {
          state.myStaff = updatedStaff
        }
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staff = state.staff.filter(s => s._id !== action.payload)
      })
  }
})

export default staffSlice.reducer