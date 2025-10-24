'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CorporateDashboard() {
  const [totalSpend, setTotalSpend] = useState(0)
  const [teamUsage, setTeamUsage] = useState(0)
  const [activeMembers, setActiveMembers] = useState('0/0')
  const [recentActivity, setRecentActivity] = useState([])
  const [popularSpaces, setPopularSpaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    const fetchCorporateData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setTotalSpend(245000)
        setTeamUsage(78)
        setActiveMembers('8/10')
        setRecentActivity([
          { id: 1, date: 'Today', activity: 'Tunde booked a desk at Worknub', amount: 5000 },
          { id: 2, date: 'Yesterday', activity: 'Amara booked a meeting room at TheBunker', amount: 15000 },
          { id: 3, date: 'Mar 23', activity: 'Chinedu booked a desk at Nesta Hub', amount: 4500 },
          { id: 4, date: 'Mar 22', activity: 'Team budget allocated for March', amount: 500000 }
        ])
        setPopularSpaces([
          { id: 1, name: 'Worknub', visits: 12, revenue: 60000 },
          { id: 2, name: 'TheBunker', visits: 8, revenue: 40000 },
          { id: 3, name: 'Nesta Hub', visits: 5, revenue: 22500 }
        ])
      } catch (error) {
        console.error('Error fetching corporate data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCorporateData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading corporate dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Corporate Dashboard</h1>
        <p className="text-gray-600">Welcome back, TechSolutions Ltd! Here's your team's workspace activity.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">₦{totalSpend.toLocaleString()}</p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Team Usage</p>
              <p className="text-2xl font-bold text-gray-900">{teamUsage}%</p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-600 text-xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
              <p className="text-xs text-gray-500">Currently Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/corporate/activity" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                  <p className="font-medium text-gray-900">{activity.activity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{activity.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Spaces */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Popular Spaces This Month</h2>
            <Link href="/corporate/spaces" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {popularSpaces.map((space) => (
              <div key={space.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{space.name}</p>
                  <p className="text-sm text-gray-500">{space.visits} visits</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₦{space.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/corporate/team" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl">👥</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Team</h3>
          <p className="text-gray-600 text-sm">Add members and set budgets</p>
        </Link>

        <Link href="/authenticated/spaces" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-xl">🏢</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Book Spaces</h3>
          <p className="text-gray-600 text-sm">Find and book workspaces</p>
        </Link>

        <Link href="/corporate/billing" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 text-xl">💰</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Billing & Invoices</h3>
          <p className="text-gray-600 text-sm">View spending and invoices</p>
        </Link>
      </div>
    </div>
  )
}
