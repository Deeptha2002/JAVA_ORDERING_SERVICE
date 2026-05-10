import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'https://grocery-store-production-78cb.up.railway.app/api'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`)
    return response.data
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartData) => {
    const response = await axios.post(`${API_BASE_URL}/cart`, cartData)
    return response.data
  }
)

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ id, data }) => {
    const response = await axios.put(`${API_BASE_URL}/cart/${id}`, data)
    return response.data
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id) => {
    await axios.delete(`${API_BASE_URL}/cart/${id}`)
    return id
  }
)

export const buyNow = createAsyncThunk(
  'cart/buyNow',
  async (purchaseData) => {
    const response = await axios.post(`${API_BASE_URL}/purchases`, purchaseData)
    return response.data
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = Array.isArray(action.payload) ? action.payload : [action.payload]
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.items = []
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(buyNow.fulfilled, (state, action) => {
        // Remove purchased item from cart
        if (action.payload.userId && action.payload.productId) {
          state.items = state.items.filter(
            item => !(item.userId === action.payload.userId && item.productId === action.payload.productId)
          )
        }
      })
  }
})

export default cartSlice.reducer
