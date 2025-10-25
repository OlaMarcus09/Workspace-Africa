'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Inline Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ email: '', role: 'member', monthly_budget: 50000 })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      // In a real app, this would fetch from team_members table
      // For now, we'll use mock data that matches our database structure
      const mockTeamMembers = [
        { id: 1, email: 'tunde@techsolutions.com', role: 'admin', monthly_budget: 100000, current_spend: 45000 },
        { id: 2, email: 'amara@techsolutions.com', role: 'member', monthly_budget: 50000, current_spend: 25000 },
        { id: 3, email: 'chinedu@techsolutions.com', role: 'member', monthly_budget: 50000, current_spend: 15000 },
        { id: 4, email: 'grace@techsolutions.com', role: 'member', monthly_budget: 50000, current_spend: 35000 }
      ]
      setTeamMembers(mockTeamMembers)
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    try {
      // In a real app, this would insert into team_members table
      const newMemberData = {
        id: teamMembers.length + 1,
        email: newMember.email,
        role: newMember.role,
        monthly_budget: newMember.monthly_budget,
        current_spend: 0
      }
      
      setTeamMembers([...teamMembers, newMemberData])
      setNewMember({ email: '', role: 'member', monthly_budget: 50000 })
      setShowAddMember(false)
      alert('Team member added successfully!')
    } catch (error) {
      console.error('Error adding team member:', error)
      alert('Error adding team member. Please try again.')
    }
  }

  const handleRemoveMember = async (memberId) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      try {
        setTeamMembers(teamMembers.filter(member => member.id !== memberId))
        alert('Team member removed successfully!')
      } catch (error) {
        console.error('Error removing team member:', error)
        alert('Error removing team member. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading team management...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/corporate/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="text-gray-600">Manage your team members and their budgets</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{teamMembers.length}</div>
          <div className="text-gray-600">Total Members</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {teamMembers.filter(m => m.role === 'admin').length}
          </div>
          <div className="text-gray-600">Admins</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            ₦{teamMembers.reduce((sum, member) => sum + member.monthly_budget, 0).toLocaleString()}
          </div>
          <div className="text-gray-600">Total Budget</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            ₦{teamMembers.reduce((sum, member) => sum + member.current_spend, 0).toLocaleString()}
          </div>
          <div className="text-gray-600">Total Spent</div>
        </div>
      </div>

      {/* Add Member Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddMember(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Add Team Member
        </button>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Team Member</h3>
            <form onSubmit={handleAddMember}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="team.member@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Budget (₦)
                  </label>
                  <input
                    type="number"
                    required
                    value={newMember.monthly_budget}
                    onChange={(e) => setNewMember({...newMember, monthly_budget: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => {
                const remaining = member.monthly_budget - member.current_spend
                const usagePercentage = (member.current_spend / member.monthly_budget) * 100
                
                return (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₦{member.monthly_budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₦{member.current_spend.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${
                              usagePercentage > 90 ? 'bg-red-600' :
                              usagePercentage > 75 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          usagePercentage > 90 ? 'text-red-600' :
                          usagePercentage > 75 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          ₦{remaining.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Budget Management Tips</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Set individual budgets based on role and expected usage</li>
          <li>• Monitor spending regularly to avoid budget overruns</li>
          <li>• Consider peak season adjustments for busier months</li>
          <li>• Use the usage reports to optimize budget allocation</li>
        </ul>
      </div>
    </div>
  )
}
