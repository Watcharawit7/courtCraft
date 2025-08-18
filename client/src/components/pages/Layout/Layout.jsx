import { Routes, Route } from 'react-router-dom'

import Login from '../LoginForm/Login'
import Register from '../LoginForm/Register'

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
export default Layout
