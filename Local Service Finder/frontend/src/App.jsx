import React, { useState } from 'react'
import Home from './pages/Home'
import LoginModal from './pages/LoginModal'

function App() {
  // Controls whether the login modal is visible
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {/* Pass modal controls down to components that need them */}
      <Home onLoginClick={() => setShowLogin(true)} />

      {/* Show login modal when triggered */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  )
}

export default App