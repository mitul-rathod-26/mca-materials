import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import styles from './AdminDashboard.module.css'

const stats = [
  { label: 'Total Users', value: '6', icon: '👥' },
  { label: 'Active Users', value: '4', icon: '✅' },
  { label: 'New This Month', value: '2', icon: '🆕' },
  { label: 'Admins', value: '1', icon: '🛡️' },
]

const recentUsers = [
  { name: 'Alice Johnson', email: 'alice@gmail.com', address: '123 Main St, New York' },
  { name: 'Bob Smith', email: 'bob@gmail.com', address: '' },
  { name: 'Charlie Brown', email: 'charlie@gmail.com', address: '789 Pine Rd, Texas' },
]

function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>

        <div className={styles.header}>
          <h1>Welcome back, <span>Admin</span> 👋</h1>
          <p>Here's what's happening in your application today.</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statIcon}>{s.icon}</span>
              <div>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <h2>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <div className={styles.actionCard} onClick={() => navigate('/add-user')}>
              <span>➕</span>
              <p>Add New User</p>
            </div>
            <div className={styles.actionCard} onClick={() => navigate('/all-users')}>
              <span>👁️</span>
              <p>View All Users</p>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className={styles.section}>
          <h2>Recent Users</h2>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Name</span>
              <span>Email</span>
              <span>Address</span>
            </div>
            {recentUsers.map((u) => (
              <div key={u.email} className={styles.tableRow}>
                <span>{u.name}</span>
                <span>{u.email}</span>
                <span>{u.address ? u.address : <em className={styles.na}>NA</em>}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default AdminDashboard
