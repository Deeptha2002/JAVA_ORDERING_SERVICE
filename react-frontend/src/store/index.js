import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer
  }
})
