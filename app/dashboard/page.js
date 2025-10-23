'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
  
  // Mock data - in real app, this would come from your database
  const userBookings = [
    {
      id: 1,
      spaceName: "Seb's Hub Co-Working Space",
      date: "2024-03-20",
      status: "Confirmed",
      amount: 3000,
      duration: "1 day"
    },
    {
      id: 2,
      spaceName: "Worknub Co-working Space",
      date: "2024-03-25", 
      status: "Confirmed",
      amount: 3500,
      duration: "1 day"
    }
  ]

  const userFavorites = [
    {
      id: 1,
      name: "Stargate Workstation",
      location: "Cocoa House, Dugbe, Ibadan",
      price: 4500
    }
  ]

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
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Logout</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and account</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Bookings</h2>
                {userBookings.length > 0 ? (
                  <div className="space-y-4">
                    {userBookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.spaceName}</h3>
                            <p className="text-gray-600 text-sm">Date: {booking.date}</p>
                            <p className="text-gray-600 text-sm">Duration: {booking.duration}</p>
                          </div>
                          <div className="text-right">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {booking.status}
                            </span>
                            <p className="text-lg font-semibold text-gray-900 mt-2">₦{booking.amount}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Details
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No upcoming bookings</p>
                    <Link href="/spaces" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                      Book a space
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Spaces</h2>
                {userFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userFavorites.map((space) => (
                      <div key={space.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{space.name}</h3>
                        <p className="text-gray-600 text-sm">{space.location}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">₦{space.price}/day</p>
                        <div className="mt-4 flex gap-2">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                            Book Now
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No favorite spaces yet</p>
                    <Link href="/spaces" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                      Explore spaces
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">📅</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Book a Space</h3>
            <p className="text-gray-600 text-sm mb-4">Find and book your next workspace</p>
            <Link href="/spaces" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 inline-block">
              Explore Spaces
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">💼</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upcoming Bookings</h3>
            <p className="text-gray-600 text-sm mb-4">Manage your reservations</p>
            <button 
              onClick={() => setActiveTab('bookings')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 inline-block"
            >
              View Bookings
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">Get support for your bookings</p>
            <Link href="/contact" className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 inline-block">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
