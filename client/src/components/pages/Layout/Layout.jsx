import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../LoginForm/Login'
import Register from '../LoginForm/Register'

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
export default Layout
