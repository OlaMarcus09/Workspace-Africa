'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PartnerAnalytics() {
  const [analytics, setAnalytics] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setAnalytics({
          totalRevenue: 450000,
          totalBookings: 92,
          avgBookingValue: 4891,
          repeatCustomers: 12,
          peakHours: '10:00 AM - 12:00 PM, 2:00 PM - 4:00 PM'
        })
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/partner/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
        <p className="text-gray-600">Track your space performance and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-rows-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₦{analytics.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">₦{analytics.avgBookingValue}</p>
              <p className="text-sm text-gray-600">Avg. Booking Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{analytics.repeatCustomers}</p>
              <p className="text-sm text-gray-600">Repeat Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Peak Hours</h2>
          <p className="text-gray-600">{analytics.peakHours}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="text-center py-8 text-gray-500">
            Revenue chart will be displayed here with a charting library
          </div>
        </div>
      </div>
    </div>
  )
}
