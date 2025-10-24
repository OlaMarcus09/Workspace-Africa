'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [userBookings, setUserBookings] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [profileData, setProfileData] = useState({})
  const [loading, setLoading] = useState(true)
  
  const { user } = useAuth()

  // Fetch user data
  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      
      // Mock data for demonstration
      const mockBookings = [
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

      const mockFavorites = [
        {
          id: 1,
          name: "Stargate Workstation",
          location: "Cocoa House, Dugbe, Ibadan",
          price: 4500
        }
      ]

      setUserBookings(mockBookings)
      setUserFavorites(mockFavorites)
      
      setProfileData({
        name: user.user_metadata?.full_name || 'User',
        email: user.email,
        phone: '+234 800 000 0000'
      })
      
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, {profileData.name}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 text-xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Favorite Spaces</p>
              <p className="text-2xl font-bold text-gray-900">{userFavorites.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-600 text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₦6,500</p>
            </div>
          </div>
        </div>
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
                        <Link 
                          href={`/spaces/${space.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                          Book Now
                        </Link>
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
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
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
  )
}
