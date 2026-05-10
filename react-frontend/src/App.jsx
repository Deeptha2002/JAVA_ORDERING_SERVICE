import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import LoginView from './views/LoginView'
import UserHomeView from './views/UserHomeView'
import AdminView from './views/AdminView'
import ManagerView from './views/ManagerView'
import './App.css'

function App() {
  const userRole = localStorage.getItem('userRole')
  const userEmail = localStorage.getItem('userEmail')

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/user"
            element={userRole === 'user' && userEmail ? <UserHomeView /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={userRole === 'admin' && userEmail ? <AdminView /> : <Navigate to="/login" />}
          />
          <Route
            path="/manager"
            element={userRole === 'manager' && userEmail ? <ManagerView /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
