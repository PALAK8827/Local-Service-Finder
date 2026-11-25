import React, { useState, useEffect } from 'react'

function Navbar({ onLoginClick, user, onLogout }) {
  const [menuOpen, setMenuOpen]     = useState(false)  // hamburger toggle
  const [scrolled, setScrolled]     = useState(false)  // shadow on scroll

  // Add shadow to navbar when user scrolls down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <a href="/" className="navbar__logo">
          <span className="logo-icon">📍</span>
          <span className="logo-text">LocalPro</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><a href="/">Home</a></li>
          <li><a href="#categories">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Auth buttons */}
        <div className="navbar__actions">
          {user ? (
            <>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginRight: '8px' }}>
                👋 {user.name}
              </span>
              <button className="btn btn--ghost" onClick={onLogout}>Log Out</button>
            </>
          ) : (
            <>
              <button className="btn btn--ghost" onClick={onLoginClick}>Log In</button>
              <button className="btn btn--primary" onClick={onLoginClick}>Sign Up Free</button>
            </>
          )}
        </div>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <div className="mobile-auth">
            {user ? (
              <>
                <span style={{ padding: '8px 0', fontWeight: 600, color: 'var(--text-dark)' }}>
                  👋 {user.name}
                </span>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setMenuOpen(false)
                    if (onLogout) onLogout()
                  }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setMenuOpen(false)
                    onLoginClick()
                  }}
                >
                  Log In
                </button>
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    setMenuOpen(false)
                    onLoginClick()
                  }}
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
