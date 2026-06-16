import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export const getBeds = createAsyncThunk('beds/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/beds`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch beds')
  }
})

export const getAvailableBeds = createAsyncThunk('beds/getAvailable', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/beds/available`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch available beds')
  }
})

export const createBed = createAsyncThunk('beds/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/beds`, data, config())
    return res.data.bed
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add bed')
  }
})

export const updateBed = createAsyncThunk('beds/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/beds/${id}`, data, config())
    return res.data.bed
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update bed')
  }
})

export const deleteBed = createAsyncThunk('beds/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/beds/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete bed')
  }
})

const bedSlice = createSlice({
  name: 'beds',
  initialState: {
    beds: [],
    availableBeds: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearBedError: (state) => { state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBeds.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(getBeds.fulfilled, (state, action) => {
        state.isLoading = false
        state.beds = action.payload
      })
      .addCase(getBeds.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(getAvailableBeds.fulfilled, (state, action) => {
        state.availableBeds = action.payload
      })
      .addCase(createBed.fulfilled, (state, action) => {
        state.beds.unshift(action.payload)
      })
      .addCase(createBed.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateBed.fulfilled, (state, action) => {
        const index = state.beds.findIndex(b => b._id === action.payload._id)
        if (index !== -1) state.beds[index] = action.payload
      })
      .addCase(deleteBed.fulfilled, (state, action) => {
        state.beds = state.beds.filter(b => b._id !== action.payload)
      })
  }
})

export const { clearBedError } = bedSlice.actions
export default bedSlice.reducer