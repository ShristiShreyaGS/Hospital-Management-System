import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'

// Decode token to restore user on page refresh
const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const decoded = JSON.parse(atob(token.split('.')[1]))
    return { id: decoded.id, role: decoded.role }
  } catch {
    return null
  }
}

export const loginUser = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/auth/login`, formData)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const registerUser = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/auth/register`, formData)
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const updateUserProfile = createAsyncThunk('auth/updateProfile', async (formData, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.put(`${API}/auth/profile`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const res = await axios.get(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    // Silently fail - user will be null
    return null
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromToken(),
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
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
  },
})

export const { logout, clearRegisterSuccess } = authSlice.actions
export default authSlice.reducer