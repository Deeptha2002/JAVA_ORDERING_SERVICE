import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/slices/categorySlice'
import { fetchProducts } from '../store/slices/productSlice'
import MyHeader from '../components/MyHeader'
import MyCategory from '../components/MyCategory'
import './UserHomeView.css'

function UserHomeView() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.data)
  const products = useSelector(state => state.products.data)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="user-home-view">
      <MyHeader />
      <MyCategory categories={categories} products={products} />
    </div>
  )
}

export default UserHomeView
