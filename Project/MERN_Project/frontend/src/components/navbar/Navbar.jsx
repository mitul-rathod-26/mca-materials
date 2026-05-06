import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar({ role = 'admin' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const getUserName = () => {
    if (role === 'admin') return 'Admin'
    const userData = sessionStorage.getItem('user')
    if (userData) return JSON.parse(userData).user?.name || 'User'
    return 'User'
  }

  const handleLogout = async () => {
    if (role === 'admin') {
      const token = sessionStorage.getItem('token')
      await fetch('/admin/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => {})
    }
    sessionStorage.clear()
    navigate('/', { replace: true })
  }

  const isActive = (path) => location.pathname === path ? styles.active : ''

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {role === 'admin' ? (
          <>
            <a className={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>Home</a>
            <a className={isActive('/add-user')} onClick={() => navigate('/add-user')}>Add User</a>
            <a className={isActive('/all-users')} onClick={() => navigate('/all-users')}>All Users</a>
          </>
        ) : (
          <>
            <a className={isActive('/user-dashboard')} onClick={() => navigate('/user-dashboard')}>Home</a>
            <a className={isActive('/update-profile')} onClick={() => navigate('/update-profile')}>Update Profile</a>
          </>
        )}
      </div>
      <div className={styles.navRight}>
        <span className={styles.welcome}>Welcome, <strong>{getUserName()}</strong></span>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
