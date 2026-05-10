import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, buyNow } from '../store/slices/cartSlice'
import { updateProduct, deleteProduct } from '../store/slices/productSlice'
import { Modal, Button, Form } from 'react-bootstrap'
import './MyProduct.css'

function MyProduct({ products }) {
  const dispatch = useDispatch()
  const userRole = localStorage.getItem('userRole')
  const userId = localStorage.getItem('userId')
  const [showCartModal, setShowCartModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [editData, setEditData] = useState({})

  const handleAddToCart = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setShowCartModal(true)
  }

  const handleSubmitCart = async () => {
    try {
      await dispatch(addToCart({
        userId: parseInt(userId),
        productId: selectedProduct.id,
        quantity: parseInt(quantity)
      })).unwrap()
      alert('Item added to cart successfully!')
      setShowCartModal(false)
    } catch (err) {
      alert('Error adding to cart: ' + err)
    }
  }

  const handleBuyNow = async (product) => {
    try {
      await dispatch(buyNow({
        userId: parseInt(userId),
        productId: product.id
      })).unwrap()
      alert('Order successful!')
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setEditData({ ...product })
    setShowEditModal(true)
  }

  const handleUpdateProduct = async () => {
    try {
      await dispatch(updateProduct({
        id: selectedProduct.id,
        data: editData
      })).unwrap()
      alert('Product updated successfully!')
      setShowEditModal(false)
    } catch (err) {
      alert('Error updating product: ' + err)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap()
        alert('Product deleted successfully!')
      } catch (err) {
        alert('Error deleting product: ' + err)
      }
    }
  }

  return (
    <div className="product-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="card">
            <h3 className="card-title"><b>{product.name}</b></h3>
            <h6 className="card-subtitle">Rs.{product.price} per {product.unit}</h6>
            <p className="card-text">Expiry: {product.expiry}</p>
            <p className={product.availability > 0 ? 'availability-green' : 'availability-red'}>
              {product.availability > 0 ? `Available ${product.availability}${product.unit}s` : 'Unavailable'}
            </p>
            <div className="button-group">
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </Button>
            </div>
            {userRole === 'manager' && (
              <div className="manager-buttons mt-2">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Quantity Required</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editData.price || ''}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                value={editData.unit || ''}
                onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                value={editData.expiry || ''}
                onChange={(e) => setEditData({ ...editData, expiry: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="number"
                value={editData.availability || ''}
                onChange={(e) => setEditData({ ...editData, availability: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyProduct
