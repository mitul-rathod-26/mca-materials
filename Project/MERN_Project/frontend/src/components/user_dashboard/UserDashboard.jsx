import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import styles from './UserDashboard.module.css'

function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = sessionStorage.getItem('user')
    if (!userData) {
      navigate('/', { replace: true })
    } else {
      const parsed = JSON.parse(userData)
      setUser(parsed.user)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Navbar role="user" />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1>Welcome back, <span>{user?.name || 'User'}</span> 👋</h1>
          <p>Manage your profile and account details from here.</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📅</span>
            <div>
              <h3>Jan 2025</h3>
              <p>Member Since</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>✅</span>
            <div>
              <h3>Active</h3>
              <p>Account Status</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🔒</span>
            <div>
              <h3>Secure</h3>
              <p>Profile Security</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <h2>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <div className={styles.actionCard} onClick={() => navigate('/update-profile')}>
              <span>✏️</span>
              <p>Update Profile</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className={styles.section}>
          <h2>Profile Details</h2>
          {user && (
            <div className={styles.profileCard}>
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt="User Avatar"
                className={styles.avatar}
              />
              <div className={styles.profileInfo}>
                <div className={styles.profileRow}>
                  <span className={styles.profileLabel}>Name</span>
                  <span className={styles.profileValue}>{user.name}</span>
                </div>
                <div className={styles.profileRow}>
                  <span className={styles.profileLabel}>Email</span>
                  <span className={styles.profileValue}>{user.email}</span>
                </div>
                <div className={styles.profileRow}>
                  <span className={styles.profileLabel}>Address</span>
                  <span className={styles.profileValue}>{user.address || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default UserDashboard
