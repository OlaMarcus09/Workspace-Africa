'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProfessionalBookings() {
  const [bookings, setBookings] = useState([])
  const [activeTab, setActiveTab] = useState('upcoming')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const fetchBookings = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setBookings([
          {
            id: 1,
            spaceName: "Seb's Hub Co-Working Space",
            date: "2024-03-20",
            time: "10:00 AM - 6:00 PM",
            status: "Confirmed",
            amount: 3000,
            type: "1-Day Hot Desk",
            qrCode: "#WS-4892"
          },
          {
            id: 2,
            spaceName: "Worknub Co-working Space",
            date: "2024-03-25",
            time: "9:00 AM - 5:00 PM",
            status: "Confirmed",
            amount: 3500,
            type: "1-Day Hot Desk",
            qrCode: "#WS-4893"
          },
          {
            id: 3,
            spaceName: "TheBunker Co-working",
            date: "2024-03-18",
            time: "8:00 AM - 4:00 PM",
            status: "Completed",
            amount: 5000,
            type: "1-Day Hot Desk",
            qrCode: "#WS-4891"
          }
        ])
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const filteredBookings = bookings.filter(booking => 
    activeTab === 'upcoming' ? booking.status === 'Confirmed' : booking.status === 'Completed'
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600">Manage your workspace reservations</p>
      </div>

      {/* Booking Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Bookings
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Bookings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.spaceName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📅 {booking.date}</span>
                            <span>🕒 {booking.time}</span>
                            <span>💼 {booking.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status}
                          </span>
                          <p className="text-2xl font-bold text-gray-900 mt-2">₦{booking.amount.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">QR Code: {booking.qrCode}</span>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View Details
                          </button>
                          {activeTab === 'upcoming' && (
                            <button className="text-red-600 hover:text-red-700 font-medium">
                              Cancel Booking
                            </button>
                          )}
                          {activeTab === 'past' && (
                            <button className="text-green-600 hover:text-green-700 font-medium">
                              Book Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming workspace bookings."
                  : "You haven't booked any workspaces yet."
                }
              </p>
              <Link 
                href="/authenticated/spaces" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Workspaces
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {bookings.filter(b => b.status === 'Confirmed').length}
          </div>
          <div className="text-gray-600">Upcoming Bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {bookings.filter(b => b.status === 'Completed').length}
          </div>
          <div className="text-gray-600">Completed Bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            ₦{bookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}
          </div>
          <div className="text-gray-600">Total Spent</div>
        </div>
      </div>
    </div>
  )
}
