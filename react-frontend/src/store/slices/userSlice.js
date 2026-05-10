import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = 'https://grocery-store-production-78cb.up.railway.app/api'

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users`, userData)
    return response.data
  }
)

export const getUserByEmail = createAsyncThunk(
  'user/getUserByEmail',
  async (email) => {
    const response = await axios.get(`${API_BASE_URL}/users/${email}`)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(getUserByEmail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
