import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../store/slices/categorySlice'
import { fetchProducts } from '../store/slices/productSlice'
import MyHeader from '../components/MyHeader'
import { Container, Button, ListGroup, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import './AdminView.css'

function AdminView() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.data)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  const handleCreateCategory = () => {
    setModalMode('create')
    setCategoryName('')
    setSelectedCategory(null)
    setShowModal(true)
  }

  const handleEditCategory = (category) => {
    setModalMode('edit')
    setSelectedCategory(category)
    setCategoryName(category.name)
    setShowModal(true)
  }

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteCategory(id)).unwrap()
        alert('Category deleted successfully!')
      } catch (err) {
        alert('Error deleting category: ' + err)
      }
    }
  }

  const handleSaveCategory = async () => {
    try {
      if (modalMode === 'create') {
        await dispatch(createCategory({ name: categoryName })).unwrap()
        alert('Category created successfully!')
      } else {
        await dispatch(updateCategory({ id: selectedCategory.id, data: { name: categoryName } })).unwrap()
        alert('Category updated successfully!')
      }
      setShowModal(false)
      setCategoryName('')
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  return (
    <div className="admin-view">
      <MyHeader />
      <Container className="admin-container">
        <h2>Admin Panel - Manage Categories</h2>
        <Button variant="success" onClick={handleCreateCategory} className="mb-3">
          Create Category
        </Button>
        
        <ListGroup>
          {categories.map(category => (
            <ListGroup.Item key={category.id} className="category-item">
              <div className="category-content">
                <span className="category-name">{category.name}</span>
                <div className="category-actions">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'Create' : 'Edit'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            {modalMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AdminView
