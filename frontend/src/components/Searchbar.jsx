import React, { useState } from 'react'

// Placeholder suggestions to cycle through
const suggestions = ['electrician', 'plumber', 'home tutor', 'mechanic', 'beautician', 'painter']

function SearchBar({ onSearch }) {
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [showMap, setShowMap] = useState('')

  // Placeholder text cycles every render (simple approach)
  const placeholder = `Try "${suggestions[Math.floor(Date.now() / 3000) % suggestions.length]}"...`

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ service, location })
    }
  }

  const handlePopularClick = (term) => {
    setService(term)
    if (onSearch) {
      onSearch({ service: term, location })
    }
  }

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        {/* Service input */}
        <div className="searchbar__field">
          <span className="searchbar__icon">🔍</span>
          <input
            type="text"
            className="searchbar__input"
            placeholder={placeholder}
            value={service}
            onChange={(e) => setService(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div className="searchbar__divider" />

        {/* Location input */}
        <div className="searchbar__field">
          <span className="searchbar__icon">📍</span>
          <input
            type="text"
            className="searchbar__input"
            placeholder="Your city or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Search button */}
        <button className="searchbar__btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Popular quick-searches */}
      <div className="searchbar__popular">
        <span className="popular-label">Popular:</span>
        {['Electrician', 'Plumber', 'AC Repair', 'Tutor', 'Cleaner'].map((term) => (
          <button
            key={term}
            className="popular-tag"
            onClick={() => handlePopularClick(term)}
          >
            {term}
          </button>
        ))}
      </div>

    <button
        type="button"
        onClick={() => setShowMap(!showMap)}
        style={{
          color: "#facc15",
          backgroundColor: "#312e81",
          padding: "8px 16px",
          borderRadius: "8px",
          marginTop: "10px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {showMap ? "Close Google Map" : "Search on Google Maps"}
      </button>

      {showMap && (
        <div style={{ width: "100%", maxWidth: "850px", marginTop: "14px" }}>
          <iframe
            title="Google Maps Search"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              `${service || "service providers"} ${location || "near me"}`
            )}&output=embed`}
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}

export default SearchBar;