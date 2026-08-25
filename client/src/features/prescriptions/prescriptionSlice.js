import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE } from '../../utils/apiBase'

const API = API_BASE
const getToken = () => localStorage.getItem('token')
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export const getPrescriptions = createAsyncThunk('prescriptions/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/prescriptions`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch prescriptions')
  }
})

export const createPrescription = createAsyncThunk('prescriptions/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/prescriptions`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create prescription')
  }
})

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: { prescriptions: [], selected: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrescriptions.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(getPrescriptions.fulfilled, (state, action) => { state.isLoading = false; state.prescriptions = Array.isArray(action.payload) ? action.payload : (action.payload.prescriptions || []) })
      .addCase(getPrescriptions.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })

      .addCase(createPrescription.pending, (state) => { state.isLoading = true })
      .addCase(createPrescription.fulfilled, (state, action) => { state.isLoading = false; state.prescriptions.unshift(action.payload) })
      .addCase(createPrescription.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })
  }
})

export default prescriptionSlice.reducer
