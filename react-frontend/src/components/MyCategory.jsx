import { useState, useEffect } from 'react'
import { Container, Nav, Button } from 'react-bootstrap'
import MyProduct from './MyProduct'
import './MyCategory.css'

function MyCategory({ categories, products }) {
  const [activeCategory, setActiveCategory] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    if (activeCategory) {
      setFilteredProducts(products.filter(p => p.categoryId === activeCategory))
    } else {
      setFilteredProducts(products)
    }
  }, [activeCategory, products])

  return (
    <Container fluid className="category-container">
      <div className="category-nav">
        <h5>Categories</h5>
        <Nav className="flex-column category-list">
          <Button
            variant={activeCategory === null ? 'primary' : 'outline-primary'}
            onClick={() => setActiveCategory(null)}
            className="category-btn"
          >
            All Products
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
              onClick={() => setActiveCategory(category.id)}
              className="category-btn"
            >
              {category.name}
            </Button>
          ))}
        </Nav>
      </div>
      <div className="products-section">
        <MyProduct products={filteredProducts} />
      </div>
    </Container>
  )
}

export default MyCategory
