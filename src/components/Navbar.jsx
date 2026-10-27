import React, { useState, useEffect } from 'react'

function Navbar({ onLoginClick }) {
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
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        {/* Auth buttons */}
        <div className="navbar__actions">
          <button className="btn btn--ghost" onClick={onLoginClick}>Log In</button>
          <button className="btn btn--primary" onClick={onLoginClick}>Sign Up Free</button>
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
          <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
          <div className="mobile-auth">
            <button className="btn btn--ghost" onClick={onLoginClick}>Log In</button>
            <button className="btn btn--primary" onClick={onLoginClick}>Sign Up Free</button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar