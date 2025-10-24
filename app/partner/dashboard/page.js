'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PartnerDashboard() {
  const [todayRevenue, setTodayRevenue] = useState(0)
  const [occupancyRate, setOccupancyRate] = useState(0)
  const [avgRating, setAvgRating] = useState(0)
  const [todayBookings, setTodayBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    const fetchPartnerData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setTodayRevenue(25000)
        setOccupancyRate(65)
        setAvgRating(4.8)
        setTodayBookings([
          {
            id: 1,
            time: '10:00 AM',
            customer: 'Amara O.',
            type: 'Hot Desk',
            status: 'Confirmed',
            qr: '#WS-4892'
          },
          {
            id: 2,
            time: '11:30 AM',
            customer: 'Tunde A.',
            type: 'Meeting Room',
            status: 'Confirmed',
            qr: '#WS-4893'
          },
          {
            id: 3,
            time: '02:00 PM',
            customer: 'Chinedu E.',
            type: 'Hot Desk',
            status: 'Confirmed',
            qr: '#WS-4894'
          },
          {
            id: 4,
            time: '04:30 PM',
            customer: 'Team Booking',
            type: '3 people',
            status: 'Confirmed',
            qr: '#WS-4895'
          }
        ])
      } catch (error) {
        console.error('Error fetching partner data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPartnerData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading partner dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your space performance today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₦{todayRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600">+12% vs avg</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
              <p className="text-xs text-blue-600">+8% vs avg</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-600 text-xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              <p className="text-xs text-gray-600">(24 reviews)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Bookings</h2>
          <div className="space-y-4">
            {todayBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{booking.time}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.customer}</h3>
                    <p className="text-sm text-gray-600">{booking.type} • {booking.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{booking.qr}</p>
                  <p className="text-xs text-gray-500">QR Code</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/partner/bookings" className="block text-center mt-6 text-blue-600 hover:text-blue-700 font-medium">
            View All Bookings
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/partner/calendar?action=block" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-red-600">🚫</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Block Dates</h3>
                <p className="text-sm text-gray-600">Mark dates as unavailable</p>
              </div>
            </Link>
            
            <Link href="/partner/calendar?action=update" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-600">📅</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Update Availability</h3>
                <p className="text-sm text-gray-600">Change available slots</p>
              </div>
            </Link>
            
            <Link href="/partner/analytics" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-purple-600">📈</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">See detailed reports</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Real-Time Booking Calendar</h2>
        <div className="text-center py-8 text-gray-500">
          Calendar view will be implemented here with a third-party library or custom component.
          <div className="mt-4 text-sm">
            This will show live availability and bookings for your space.
          </div>
        </div>
      </div>
    </div>
  )
}
