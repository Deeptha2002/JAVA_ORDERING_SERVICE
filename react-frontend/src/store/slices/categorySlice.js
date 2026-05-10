import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`)
    return response.data
  }
)

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    const response = await axios.post(`${API_BASE_URL}/categories`, categoryData)
    return response.data
  }
)

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, data)
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/categories/${id}`)
    return id
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex(cat => cat.id === action.payload.id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(cat => cat.id !== action.payload)
      })
  }
})

export default categorySlice.reducer
