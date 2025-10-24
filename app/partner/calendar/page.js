'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PartnerCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const bookings = [
    { time: '10:00 AM', customer: 'Amara O.', type: 'Hot Desk', status: 'Confirmed' },
    { time: '11:30 AM', customer: 'Tunde A.', type: 'Meeting Room', status: 'Confirmed' },
    { time: '02:00 PM', customer: 'Chinedu E.', type: 'Hot Desk', status: 'Confirmed' },
    { time: '04:30 PM', customer: 'Team Booking', type: '3 Hot Desks', status: 'Confirmed' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/partner/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Booking Calendar</h1>
        <p className="text-gray-600">Manage your space availability and bookings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">March 2025</h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">Today</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">‹</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className={`h-12 border rounded-lg flex items-center justify-center text-sm ${
                  i === 24 
                    ? 'bg-blue-100 border-blue-300 text-blue-700 font-semibold' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {i >= 2 && i <= 32 ? i - 1 : ''}
              </div>
            ))}
          </div>
        </div>

        {/* Bookings for selected date */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">March 25, 2025 (Today)</h2>
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{booking.time}</p>
                    <p className="text-gray-600">{booking.customer}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{booking.type}</p>
                <div className="mt-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              New Booking
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Block Time
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
