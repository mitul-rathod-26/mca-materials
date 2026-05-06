import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import styles from './AllUsers.module.css'

function AllUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/user/all')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <h2 className={styles.title}>All Users</h2>
        <div className={styles.grid}>
          {users.map((user) => (
            <div key={user._id} className={styles.card}>
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                alt={user.name}
                className={styles.avatar}
              />
              <div className={styles.info}>
                <h3>{user.name}</h3>
                <p><span>Email:</span> {user.email}</p>
                {user.address && <p><span>Address:</span> {user.address}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AllUsers
