import React, { useState } from 'react'
import { loginApi, registerApi } from '../services/api'

function LoginModal({ onClose, onAuthSuccess }) {
  // Toggle between "login" and "signup" tabs
  const [tab, setTab] = useState('login')

  // Form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupRole, setSignupRole] = useState('customer')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Close modal when clicking the dark backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Handle Login submission
  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault()
    setError('')
    if (!loginEmail || !loginPassword) {
      setError('Please enter your email and password')
      return
    }

    try {
      setLoading(true)
      const data = await loginApi(loginEmail, loginPassword)
      if (onAuthSuccess) onAuthSuccess(data.user)
      onClose()
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Signup submission
  const handleSignupSubmit = async (e) => {
    if (e) e.preventDefault()
    setError('')
    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const data = await registerApi(signupName, signupEmail, signupPassword, signupRole)
      if (onAuthSuccess) onAuthSuccess(data.user)
      onClose()
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">

        {/* Close button */}
        <button className="modal__close" onClick={onClose}>✕</button>

        {/* Logo */}
        <div className="modal__logo">📍 LocalPro</div>

        {/* Tab switcher */}
        <div className="modal__tabs">
          <button
            className={`modal__tab ${tab === 'login' ? 'modal__tab--active' : ''}`}
            onClick={() => { setTab('login'); setError('') }}
          >
            Log In
          </button>
          <button
            className={`modal__tab ${tab === 'signup' ? 'modal__tab--active' : ''}`}
            onClick={() => { setTab('signup'); setError('') }}
          >
            Sign Up
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="modal__hint" style={{ color: '#ef4444', marginBottom: '12px' }}>
            {error}
          </p>
        )}

        {/* ── Login Form ── */}
        {tab === 'login' && (
          <form className="modal__form" onSubmit={handleLoginSubmit}>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />

            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <p className="modal__hint">
              Don't have an account?{' '}
              <span className="modal__link" onClick={() => { setTab('signup'); setError('') }}>
                Sign up free
              </span>
            </p>
          </form>
        )}

        {/* ── Signup Form ── */}
        {tab === 'signup' && (
          <form className="modal__form" onSubmit={handleSignupSubmit}>
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />

            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />

            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />

            {/* Role selector */}
            <label className="form-label">I am a…</label>
            <select
              className="form-input form-select"
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
            >
              <option value="customer">Customer (I need services)</option>
              <option value="provider">Service Provider (I offer services)</option>
            </select>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="modal__hint">
              Already have an account?{' '}
              <span className="modal__link" onClick={() => { setTab('login'); setError('') }}>
                Log in
              </span>
            </p>
          </form>
        )}

      </div>
    </div>
  )
}

export default LoginModal
