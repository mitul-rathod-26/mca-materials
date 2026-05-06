import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.email === 'admin@gmail.com' && form.password === 'Admin@123') {
      sessionStorage.setItem('isLoggedIn', 'true')
      navigate('/dashboard', { replace: true })
    } else if (form.email === 'user@gmail.com' && form.password === 'User@123') {
      sessionStorage.setItem('isLoggedIn', 'true')
      navigate('/user-dashboard', { replace: true })
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.avatar}>🔐</div>
        <h2 className={styles.title}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className={styles.btn}>Sign In</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
