import React, { useState } from 'react'

function LoginModal({ onClose }) {
  // Toggle between "login" and "signup" tabs
  const [tab, setTab] = useState('login')

  // Close modal when clicking the dark backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
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
            onClick={() => setTab('login')}
          >
            Log In
          </button>
          <button
            className={`modal__tab ${tab === 'signup' ? 'modal__tab--active' : ''}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* ── Login Form ── */}
        {tab === 'login' && (
          <div className="modal__form">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" />

            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" />

            <button className="btn btn--primary btn--full">Log In</button>

            <p className="modal__hint">
              Don't have an account?{' '}
              <span className="modal__link" onClick={() => setTab('signup')}>Sign up free</span>
            </p>
          </div>
        )}

        {/* ── Signup Form ── */}
        {tab === 'signup' && (
          <div className="modal__form">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" placeholder="Your name" />

            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" />

            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Create a password" />

            {/* Role selector */}
            <label className="form-label">I am a…</label>
            <select className="form-input form-select">
              <option value="customer">Customer (I need services)</option>
              <option value="provider">Service Provider (I offer services)</option>
            </select>

            <button className="btn btn--primary btn--full">Create Account</button>

            <p className="modal__hint">
              Already have an account?{' '}
              <span className="modal__link" onClick={() => setTab('login')}>Log in</span>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default LoginModal