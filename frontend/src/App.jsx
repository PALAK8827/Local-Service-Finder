import React, { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'  
import LoginModal from './pages/LoginModal'
import { getUser, logout } from './services/api'

function App() {
  // Controls whether the login modal is visible
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(() => getUser())

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setShowLogin(false)
  }

  return (
    <>
      {/* Pass modal controls and user session down to components */}
      <Home
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />
        <About/>
        <Contact/>
      {/* Show login modal when triggered */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  )
}

export default App
