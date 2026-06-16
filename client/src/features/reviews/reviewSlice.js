import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const getToken = () => localStorage.getItem('token')
const config = () => ({ headers: { Authorization: `Bearer ${getToken()}` } })

export const getReviews = createAsyncThunk('reviews/getAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/reviews`, config())
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch reviews')
  }
})

export const createReview = createAsyncThunk('reviews/create', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/reviews`, data, config())
    return res.data.review
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to submit review')
  }
})

export const updateReview = createAsyncThunk('reviews/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${API}/reviews/${id}`, data, config())
    return res.data.review
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update review')
  }
})

export const deleteReview = createAsyncThunk('reviews/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API}/reviews/${id}`, config())
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete review')
  }
})

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearReviewError: (state) => { state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(createReview.fulfilled, (state, action) => {
        // Don't manually add - let getReviews fetch all reviews instead
        // This ensures the complete list is always in sync with the server
        state.error = null
      })
      .addCase(createReview.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(r => r._id === action.payload._id)
        if (index !== -1) state.reviews[index] = action.payload
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(r => r._id !== action.payload)
      })
  }
})

export const { clearReviewError } = reviewSlice.actions
export default reviewSlice.reducer