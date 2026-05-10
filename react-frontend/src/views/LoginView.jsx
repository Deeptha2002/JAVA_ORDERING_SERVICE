import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserByEmail } from '../store/slices/userSlice'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import './LoginView.css'

function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const result = await dispatch(getUserByEmail(email)).unwrap()
      if (result && result.password === password) {
        localStorage.setItem('userEmail', result.email)
        localStorage.setItem('userRole', result.role)
        localStorage.setItem('userId', result.id)
        
        if (result.role === 'user') {
          navigate('/user')
        } else if (result.role === 'admin') {
          navigate('/admin')
        } else if (result.role === 'manager') {
          navigate('/manager')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('https://grocery-store-production-78cb.up.railway.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name,
          role
        })
      })

      if (response.ok) {
        setError('')
        setIsLogin(true)
        setEmail('')
        setPassword('')
        setName('')
        alert('Account created successfully! Please login.')
      } else {
        const data = await response.json()
        setError(data.message || 'Error creating account')
      }
    } catch (err) {
      setError('Error creating account')
    }
  }

  return (
    <Container className="login-container">
      <div className="login-box">
        <h1 className="login-title">Grocery Store</h1>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={isLogin ? handleLogin : handleSignUp}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="w-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Form>

        <div className="toggle-form mt-3 text-center">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              className="link-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default LoginView
