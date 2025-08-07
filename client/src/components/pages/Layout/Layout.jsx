import { Routes, Route } from 'react-router-dom'

import Login from '../LoginForm/Login'

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
export default Layout
