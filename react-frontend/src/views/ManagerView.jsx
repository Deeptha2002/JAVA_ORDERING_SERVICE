import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, createProduct, updateProduct } from '../store/slices/productSlice'
import { fetchCategories } from '../store/slices/categorySlice'
import MyHeader from '../components/MyHeader'
import { Container, Button, ListGroup, Modal, Form } from 'react-bootstrap'
import './ManagerView.css'

function ManagerView() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.data)
  const categories = useSelector(state => state.categories.data)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    expiry: '',
    availability: '',
    categoryId: ''
  })

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCreateProduct = () => {
    setModalMode('create')
    setFormData({
      name: '',
      price: '',
      unit: '',
      expiry: '',
      availability: '',
      categoryId: ''
    })
    setSelectedProduct(null)
    setShowModal(true)
  }

  const handleEditProduct = (product) => {
    setModalMode('edit')
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      unit: product.unit,
      expiry: product.expiry,
      availability: product.availability,
      categoryId: product.categoryId
    })
    setShowModal(true)
  }

  const handleSaveProduct = async () => {
    try {
      if (modalMode === 'create') {
        await dispatch(createProduct(formData)).unwrap()
        alert('Product created successfully!')
      } else {
        await dispatch(updateProduct({ id: selectedProduct.id, data: formData })).unwrap()
        alert('Product updated successfully!')
      }
      setShowModal(false)
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  return (
    <div className="manager-view">
      <MyHeader />
      <Container className="manager-container">
        <h2>Manager Panel - Manage Products</h2>
        <Button variant="success" onClick={handleCreateProduct} className="mb-3">
          Create Product
        </Button>
        
        <ListGroup>
          {products.map(product => (
            <ListGroup.Item key={product.id} className="product-item">
              <div className="product-content">
                <div className="product-info">
                  <strong>{product.name}</strong>
                  <p>Rs.{product.price} per {product.unit} | Expiry: {product.expiry}</p>
                  <p>Available: {product.availability}{product.unit}s</p>
                </div>
                <div className="product-actions">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="number"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {modalMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManagerView
