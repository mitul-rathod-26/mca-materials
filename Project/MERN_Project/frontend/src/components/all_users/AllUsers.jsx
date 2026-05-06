import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import styles from './AllUsers.module.css'

const dummyUsers = [
  { _id: '1', name: 'Alice Johnson', email: 'alice@gmail.com', address: '123 Main St, New York' },
  { _id: '2', name: 'Bob Smith', email: 'bob@gmail.com', address: '456 Oak Ave, California' },
  { _id: '3', name: 'Charlie Brown', email: 'charlie@gmail.com', address: '' },
  { _id: '4', name: 'Diana Prince', email: 'diana@gmail.com', address: '789 Pine Rd, Texas' },
  { _id: '5', name: 'Ethan Hunt', email: 'ethan@gmail.com', address: '' },
  { _id: '6', name: 'Fiona Green', email: 'fiona@gmail.com', address: '321 Elm St, Florida' },
]

function AllUsers() {
  const [users] = useState(dummyUsers)

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
