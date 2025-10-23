'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BecomePartner() {
  const [formData, setFormData] = useState({
    spaceName: '',
    email: '',
    phone: '',
    location: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert('Application received! We will contact you within 24 hours.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">WorkSpace Africa</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/spaces" className="text-gray-700 hover:text-blue-600 font-medium">Spaces</Link>
              <Link href="/become-partner" className="text-blue-600 font-medium">List Your Space</Link>
              <Link href="/book-demo" className="text-gray-700 hover:text-blue-600 font-medium">Book Demo</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Space on WorkSpace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join Africa's fastest-growing work community and start earning from your empty desks.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Partner With Us?</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Pre-paid customers you wouldn't reach otherwise
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Zero upfront costs - pay only when you get bookings
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Free marketing to our community of professionals
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Easy-to-use dashboard to manage your space
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Join our network of 50+ premium workspaces
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Started</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="spaceName" className="block text-sm font-medium text-gray-700 mb-2">
                    Space Name *
                  </label>
                  <input 
                    type="text" 
                    id="spaceName"
                    name="spaceName"
                    required
                    value={formData.spaceName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your space name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input 
                    type="text" 
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your space location"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Start Application
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Founder Partners Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Join Our Founder Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Seb\'s Hub', 'Worknub', 'Stargate', 'theBUNKer'].map((name, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="font-semibold text-blue-600">{name}</div>
                <div className="text-xs text-blue-500">Founder Partner</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
