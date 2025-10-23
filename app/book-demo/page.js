'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BookDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    needs: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert('Demo request received! We will contact you within 24 hours.')
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
              <Link href="/become-partner" className="text-gray-700 hover:text-blue-600 font-medium">List Your Space</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Personalized Demo</h1>
          <p className="text-xl text-gray-600">
            Let us show you how WorkSpace Africa can transform your work experience
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your work email"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-2">
                What are you looking for? *
              </label>
              <textarea
                id="needs"
                name="needs"
                required
                rows={4}
                value={formData.needs}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your workspace needs, team size, preferred locations, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Request Demo
            </button>

            <p className="text-center text-gray-600 text-sm">
              We'll contact you within 24 hours to schedule your personalized demo
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Matching</h3>
            <p className="text-gray-600 text-sm">We'll find spaces that match your specific needs and preferences</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">💼</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Solutions</h3>
            <p className="text-gray-600 text-sm">Specialized solutions for teams of all sizes with flexible terms</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quick Setup</h3>
            <p className="text-gray-600 text-sm">Get your team set up and working in your new space within days</p>
          </div>
        </div>
      </div>
    </div>
  )
}
