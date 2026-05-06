import { useState } from 'react'
import Navbar from '../navbar/Navbar'
import styles from './AddUser.module.css'

function AddUser() {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    const token = sessionStorage.getItem('token')

    const res = await fetch('http://localhost:3000/admin/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(data.message)
      setFormData({ name: '', email: '', address: '', password: '' })
    } else {
      setError(data.message)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Add New User</h2>

          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Name <span>*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
            </div>

            <div className={styles.field}>
              <label>Email <span>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
            </div>

            <div className={styles.field}>
              <label>Address <span className={styles.optional}>(Optional)</span></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
            </div>

            <div className={styles.field}>
              <label>Password <span>*</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
            </div>

            <button type="submit" className={styles.btn}>Add User</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddUser
