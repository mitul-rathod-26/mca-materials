import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const adminRes = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (adminRes.ok) {
        const data = await adminRes.json()
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('role', 'admin')
        navigate('/dashboard', { replace: true })
        return
      }
      
      const userRes = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (userRes.ok) {
        const data = await userRes.json()
        sessionStorage.setItem('user', JSON.stringify(data))
        sessionStorage.setItem('role', 'user')
        navigate('/user-dashboard', { replace: true })
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
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
