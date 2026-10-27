import React from 'react'

function ServiceCard({ type, data }) {

  // ── Category Card ──────────────────────────────────────
  if (type === 'category') {
    return (
      <div className="card card--category">
        <div className="card__icon">{data.icon}</div>
        <h3 className="card__title">{data.title}</h3>
        <p className="card__desc">{data.desc}</p>
        <span className="card__count">{data.count}</span>
        <button className="card__btn">Explore →</button>
      </div>
    )
  }

  // ── Provider Card ──────────────────────────────────────
  if (type === 'provider') {
    return (
      <div className="card card--provider">
        {/* Avatar emoji as placeholder */}
        <div className="provider__avatar">{data.img}</div>

        <div className="provider__info">
          <h3 className="provider__name">{data.name}</h3>
          <p className="provider__role">{data.role}</p>

          {/* Star rating */}
          <div className="provider__rating">
            <span className="stars">{'★'.repeat(Math.floor(data.rating))}</span>
            <span className="rating-num">{data.rating}</span>
            <span className="reviews">({data.reviews} reviews)</span>
          </div>

          <p className="provider__location">📍 {data.location}</p>
        </div>

        <button className="card__btn card__btn--provider">Book Now</button>
      </div>
    )
  }

  return null
}

export default ServiceCard