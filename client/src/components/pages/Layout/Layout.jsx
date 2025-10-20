import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../LoginForm/Login'
import Register from '../LoginForm/Register'
import Booking from '../Booking/Booking'

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  )
}
export default Layout
