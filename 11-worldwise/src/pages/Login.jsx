import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import PageNav from '../components/PageNav'
import Button from '../components/Button'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com')
  const [password, setPassword] = useState('qwerty')

  useEffect(() => {
    if (!isAuthenticated) return

    navigate('/app')
  }, [isAuthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </form>
    </main>
  )
}
