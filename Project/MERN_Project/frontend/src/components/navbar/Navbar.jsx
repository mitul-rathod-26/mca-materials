import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar({ role = 'admin', userName = role === 'admin' ? 'Admin' : 'User' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
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
        <span className={styles.welcome}>Welcome, <strong>{userName}</strong></span>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
