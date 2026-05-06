import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import styles from '../add_user/AddUser.module.css'

function UpdateProfile() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const userData = sessionStorage.getItem('user')
    if (userData) {
      const parsed = JSON.parse(userData)
      setFormData({ 
        name: parsed.user.name, 
        email: parsed.user.email, 
        address: parsed.user.address || '', 
        password: '' 
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    
    try {
      const res = await fetch('/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setMessage(data.message)
        sessionStorage.setItem('user', JSON.stringify({ user: data.user }))
        setTimeout(() => navigate('/user-dashboard'), 1500)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to update profile')
    }
  }

  return (
    <div className={styles.wrapper}>
      <Navbar role="user" />
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Update Profile</h2>

          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Name <span>*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} disabled />
            </div>

            <div className={styles.field}>
              <label>Address <span className={styles.optional}>(Optional)</span></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
            </div>

            <div className={styles.field}>
              <label>New Password <span className={styles.optional}>(Optional)</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" />
            </div>

            <div className={styles.form} style={{ flexDirection: 'row', gap: '12px' }}>
              <button type="button" className={styles.btn} style={{ background: '#6b7280' }} onClick={() => navigate('/user-dashboard')}>Cancel</button>
              <button type="submit" className={styles.btn}>Update</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default UpdateProfile
