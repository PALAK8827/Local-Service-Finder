import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <span className="footer__logo">📍 LocalPro</span>
          <p className="footer__tagline">
            Connecting communities with trusted local professionals, one booking at a time.
          </p>
          {/* Social links (UI only) */}
          <div className="footer__socials">
            {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
              <a key={i} href="#" className="social-icon">{icon}</a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="footer__links">
          <div className="footer__col">
            <h4>Services</h4>
            <a href="#">Electrician</a>
            <a href="#">Plumber</a>
            <a href="#">Tutor</a>
            <a href="#">Mechanic</a>
            <a href="#">Beautician</a>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">How it Works</a>
            <a href="#">Become a Pro</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <a href="#">Help Centre</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} LocalPro. All rights reserved.</p>
        <p>Made with ❤️ for local communities</p>
      </div>
    </footer>
  )
}

export default Footer