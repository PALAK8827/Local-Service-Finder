import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import ServiceCard from '../components/ServiceCard'
import Footer from '../components/Footer'
import '../css/home.css'

// --- Static Data (replace with API data later) ---

const serviceCategories = [
  { id: 1, icon: '⚡', title: 'Electrician',   desc: 'Wiring, repairs & installations',  count: '240+ pros' },
  { id: 2, icon: '🔧', title: 'Plumber',        desc: 'Leaks, pipes & drainage',           count: '180+ pros' },
  { id: 3, icon: '📚', title: 'Tutor',          desc: 'All subjects, all grades',          count: '320+ pros' },
  { id: 4, icon: '🚗', title: 'Mechanic',       desc: 'Car service & repairs',             count: '150+ pros' },
  { id: 5, icon: '💅', title: 'Beautician',     desc: 'Salon services at home',            count: '210+ pros' },
  { id: 6, icon: '🧹', title: 'Cleaner',        desc: 'Home & office deep cleaning',       count: '190+ pros' },
  { id: 7, icon: '🎨', title: 'Painter',        desc: 'Interior & exterior painting',      count: '130+ pros' },
  { id: 8, icon: '🌿', title: 'Gardener',       desc: 'Lawn care & landscaping',           count: '90+ pros'  },
]

const topProviders = [
  { id: 1, name: 'Ramesh Kumar',   role: 'Electrician',   rating: 4.9, reviews: 128, location: 'Fremont', img: '👨‍🔧' },
  { id: 2, name: 'Priya Sharma',   role: 'Home Tutor',    rating: 4.8, reviews: 95,  location: 'Newark',   img: '👩‍🏫' },
  { id: 3, name: 'Arjun Mehta',    role: 'Plumber',       rating: 4.7, reviews: 112, location: 'Milpitas', img: '👨‍🔩' },
  { id: 4, name: 'Sunita Patel',   role: 'Beautician',    rating: 4.9, reviews: 203, location: 'Union City',img: '👩‍🎨' },
]

// ---------------------------------------------------

function Home({ onLoginClick }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="home-page">
      {/* Top navigation bar */}
      <Navbar onLoginClick={onLoginClick} />

      {/* Hero banner with tagline */}
      <Hero />

      {/* Search bar for finding services */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* ── Service Categories ── */}
      <section className="section categories-section">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Find trusted professionals across every service</p>
        </div>
        <div className="cards-grid">
          {serviceCategories.map(cat => (
            <ServiceCard key={cat.id} type="category" data={cat} />
          ))}
        </div>
      </section>

      {/* ── Top Providers ── */}
      <section className="section providers-section">
        <div className="section-header">
          <h2 className="section-title">Top-Rated Providers</h2>
          <p className="section-sub">Handpicked professionals near you</p>
        </div>
        <div className="providers-grid">
          {topProviders.map(pro => (
            <ServiceCard key={pro.id} type="provider" data={pro} />
          ))}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="stats-banner">
        {[
          { value: '10,000+', label: 'Service Providers' },
          { value: '50,000+', label: 'Happy Customers' },
          { value: '100+',    label: 'Cities Covered'   },
          { value: '4.8★',    label: 'Average Rating'   },
        ].map((stat, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  )
}

export default Home