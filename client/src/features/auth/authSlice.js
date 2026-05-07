import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'

// Login
export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/auth/login`, formData)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

// Register Patient
export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/auth/register`, formData)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.registerSuccess = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.registerSuccess = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearRegisterSuccess } = authSlice.actions
export default authSlice.reducer