import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import AdminDashboard from './components/admin_dashboard/AdminDashboard'
import AddUser from './components/add_user/AddUser'
import AllUsers from './components/all_users/AllUsers'
import UserDashboard from './components/user_dashboard/UserDashboard'
import UpdateProfile from './components/user_dashboard/UpdateProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
