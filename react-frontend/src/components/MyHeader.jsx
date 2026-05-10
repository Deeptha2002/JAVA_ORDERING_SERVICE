import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import './MyHeader.css'

function MyHeader() {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')
  const userRole = localStorage.getItem('userRole')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Navbar.Brand href="#" className="brand-text">
        🛒 Grocery Store
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <span className="user-info">
            {userEmail} ({userRole})
          </span>
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="ms-2"
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyHeader
