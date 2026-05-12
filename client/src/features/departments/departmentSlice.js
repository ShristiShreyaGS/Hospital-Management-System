import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

export const getDepartments = createAsyncThunk('departments/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/departments`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const createDepartment = createAsyncThunk('departments/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/departments`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const updateDepartment = createAsyncThunk('departments/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/departments/${id}`, data, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const deleteDepartment = createAsyncThunk('departments/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/departments/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    departments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state) => { state.isLoading = true })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false
        state.departments = action.payload
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload)
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(d => d._id === action.payload._id)
        if (index !== -1) state.departments[index] = action.payload
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(d => d._id !== action.payload)
      })
  }
})

export default departmentSlice.reducer