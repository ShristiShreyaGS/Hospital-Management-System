import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')

export const getBills = createAsyncThunk('bills/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/bills`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const billSlice = createSlice({
  name: 'bills',
  initialState: {
    bills: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBills.pending, (state) => { state.isLoading = true })
      .addCase(getBills.fulfilled, (state, action) => {
        state.isLoading = false
        state.bills = action.payload
      })
      .addCase(getBills.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export default billSlice.reducer