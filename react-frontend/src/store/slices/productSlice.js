import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'https://grocery-store-production-78cb.up.railway.app/api'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/products`)
    return response.data
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${categoryId}`)
    return response.data
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, data)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/products/${id}`)
    return id
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(prod => prod.id === action.payload.id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(prod => prod.id !== action.payload)
      })
  }
})

export default productSlice.reducer
