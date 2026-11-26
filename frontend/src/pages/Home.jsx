import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SearchBar from '../components/Searchbar'
import ServiceCard from '../components/ServiceCard'
import Footer from '../components/Footer'
import {
  getCategoriesApi,
  getTopRatedApi,
  getStatsApi,
  getServicesApi,
  createBookingApi,
} from '../services/api'
import '../css/Home.css'

// Default fallback data (displayed if backend is connecting)
const defaultServiceCategories = [
  { id: 1, icon: '⚡', title: 'Electrician',   desc: 'Wiring, repairs & installations',  count: '240+ pros' },
  { id: 2, icon: '🔧', title: 'Plumber',        desc: 'Leaks, pipes & drainage',           count: '180+ pros' },
  { id: 3, icon: '📚', title: 'Tutor',          desc: 'All subjects, all grades',          count: '320+ pros' },
  { id: 4, icon: '🚗', title: 'Mechanic',       desc: 'Car service & repairs',             count: '150+ pros' },
  { id: 5, icon: '💅', title: 'Beautician',     desc: 'Salon services at home',            count: '210+ pros' },
  { id: 6, icon: '🧹', title: 'Cleaner',        desc: 'Home & office deep cleaning',       count: '190+ pros' },
  { id: 7, icon: '🎨', title: 'Painter',        desc: 'Interior & exterior painting',      count: '130+ pros' },
  { id: 8, icon: '🌿', title: 'Gardener',       desc: 'Lawn care & landscaping',           count: '90+ pros'  },
]

const defaultTopProviders = [
  { id: 1, name: 'Ramesh Kumar',   role: 'Electrician',   rating: 4.9, reviews: 128, location: 'Fremont', img: '👨‍🔧' },
  { id: 2, name: 'Priya Sharma',   role: 'Home Tutor',    rating: 4.8, reviews: 95,  location: 'Newark',   img: '👩‍🏫' },
  { id: 3, name: 'Arjun Mehta',    role: 'Plumber',       rating: 4.7, reviews: 112, location: 'Milpitas', img: '👨‍🔩' },
  { id: 4, name: 'Sunita Patel',   role: 'Beautician',    rating: 4.9, reviews: 203, location: 'Union City',img: '👩‍🎨' },
]

const defaultStats = [
  { value: '10,000+', label: 'Service Providers' },
  { value: '50,000+', label: 'Happy Customers' },
  { value: '100+',    label: 'Cities Covered'   },
  { value: '4.8★',    label: 'Average Rating'   },
]

function Home({ onLoginClick, user, onLogout }) {
  const [categories, setCategories] = useState(defaultServiceCategories)
  const [providers, setProviders]   = useState(defaultTopProviders)
  const [stats, setStats]           = useState(defaultStats)
  const [providerSectionTitle, setProviderSectionTitle] = useState('Top-Rated Providers')
  const [providerSectionSub, setProviderSectionSub]     = useState('Handpicked professionals near you')

  // Load dynamic data from backend APIs on mount
  useEffect(() => {
    // 1. Fetch categories
    getCategoriesApi()
      .then((data) => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories)
        }
      })
      .catch((err) => console.log('Using default categories:', err.message))

    // 2. Fetch top providers
    getTopRatedApi()
      .then((data) => {
        if (data.topProviders && data.topProviders.length > 0) {
          setProviders(data.topProviders)
        }
      })
      .catch((err) => console.log('Using default top providers:', err.message))

    // 3. Fetch stats
    getStatsApi()
      .then((data) => {
        if (data.stats && data.stats.length > 0) {
          setStats(data.stats)
        }
      })
      .catch((err) => console.log('Using default stats:', err.message))
  }, [])

  // Handle Search action from SearchBar
  const handleSearch = async ({ service, location }) => {
    try {
      const data = await getServicesApi({ search: service, location })
      if (data.services && data.services.length > 0) {
        setProviders(data.services)
        setProviderSectionTitle(`Search Results for "${service || 'All'}"`)
        setProviderSectionSub(location ? `Near ${location}` : 'Found in your area')
      } else {
        //alert(`No service providers found matching "${service}" in ${location || 'your area'}. Showing top rated pros.`)
        // reload top rated
        const topData = await getTopRatedApi()
        if (topData.topProviders) setProviders(topData.topProviders)
      }
    } catch (err) {
      console.error('Search error:', err.message)
    }
  }

  // Handle Category selection
  const handleSelectCategory = async (categoryTitle) => {
    try {
      const data = await getServicesApi({ category: categoryTitle })
      if (data.services && data.services.length > 0) {
        setProviders(data.services)
        setProviderSectionTitle(`${categoryTitle} Pros`)
        setProviderSectionSub(`Available verified ${categoryTitle.toLowerCase()}s near you`)
      }
    } catch (err) {
      console.error('Category filter error:', err.message)
    }
  }

  // Handle Booking
  const handleBookProvider = async (provider) => {
    if (!user) {
      alert('Please log in or sign up to book a service.')
      onLoginClick()
      return
    }

    const confirmBooking = window.confirm(`Confirm booking request with ${provider.name} (${provider.role})?`)
    if (!confirmBooking) return

    try {
      const serviceId = provider._id || provider.id
      await createBookingApi({
        serviceId,
        date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        time: 'Morning (10:00 AM)',
        notes: `Direct booking request for ${provider.role}`,
      })
      alert(`Booking request sent to ${provider.name}! They will contact you shortly.`)
    } catch (err) {
      alert(err.message || 'Booking request failed.')
    }
  }

  return (
    <div className="home-page">
      {/* Top navigation bar */}
      <Navbar onLoginClick={onLoginClick} user={user} onLogout={onLogout} />

      {/* Hero banner with tagline */}
      <Hero />

      {/* Search bar for finding services */}
      <SearchBar onSearch={handleSearch} />

      {/* ── Service Categories ── */}
      <section id="categories" className="section categories-section">
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">Find trusted professionals across every service</p>
        </div>
        <div className="cards-grid">
          {categories.map(cat => (
            <ServiceCard
              key={cat.id || cat.title}
              type="category"
              data={cat}
              onSelectCategory={handleSelectCategory}
            />
          ))}
        </div>
      </section>

      {/* ── Top Providers ── */}
      <section id="providers" className="section providers-section">
        <div className="section-header">
          <h2 className="section-title">{providerSectionTitle}</h2>
          <p className="section-sub">{providerSectionSub}</p>
         
        </div>
        <div className="providers-grid">
          {providers.map(pro => (
            <ServiceCard
              key={pro._id || pro.id}
              type="provider"
              data={pro}
              onBookProvider={handleBookProvider}
            />
          ))}
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="stats-banner">
        {stats.map((stat, i) => (
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
