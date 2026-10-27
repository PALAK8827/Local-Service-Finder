
import React from 'react'

function Hero() {
  return (
    <section className="hero">
      {/* Decorative background blobs */}
      <div className="hero__blob hero__blob--1" />
      <div className="hero__blob hero__blob--2" />

      <div className="hero__content">
        {/* Small label above heading */}
        <span className="hero__badge">🌟 Trusted by 50,000+ customers</span>

        <h1 className="hero__title">
          Find Local Pros<br />
          <span className="hero__title--accent">You Can Trust</span>
        </h1>

        <p className="hero__subtitle">
          Electricians, plumbers, tutors, mechanics & more — 
          verified professionals in your neighbourhood, available today.
        </p>

        {/* Quick service tags */}
        <div className="hero__tags">
          {['⚡ Electrician', '🔧 Plumber', '📚 Tutor', '🚗 Mechanic', '💅 Beautician'].map(tag => (
            <span key={tag} className="hero__tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Floating card — decorative social proof */}
      <div className="hero__float-card">
        <div className="float-card__avatar">👨‍🔧</div>
        <div>
          <p className="float-card__name">Ramesh K. just booked</p>
          <p className="float-card__detail">Electrical repair · 2 min ago</p>
        </div>
        <span className="float-card__dot" />
      </div>
    </section>
  )
}

export default Hero