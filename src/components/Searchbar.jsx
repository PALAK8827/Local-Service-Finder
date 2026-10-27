
import React, { useState } from 'react'

// Placeholder suggestions to cycle through
const suggestions = ['electrician', 'plumber', 'home tutor', 'mechanic', 'beautician', 'painter']

function SearchBar() {
  const [service,  setService]  = useState('')
  const [location, setLocation] = useState('')

  // Placeholder text cycles every render (simple approach)
  const placeholder = `Try "${suggestions[Math.floor(Date.now() / 3000) % suggestions.length]}"...`

  const handleSearch = () => {
    if (!service.trim()) return
    // Later: pass these to an API or filter function
    alert(`Searching for "${service}" near "${location || 'your location'}"`)
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
            onChange={e => setService(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
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
            onChange={e => setLocation(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
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
        {['Electrician', 'Plumber', 'AC Repair', 'Tutor', 'Cleaner'].map(term => (
          <button
            key={term}
            className="popular-tag"
            onClick={() => setService(term)}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar