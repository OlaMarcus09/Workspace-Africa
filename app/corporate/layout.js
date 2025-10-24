'use client'

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function CorporateLayout({ children }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Corporate Header */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/corporate/dashboard" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">WorkSpace Africa</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/corporate/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link href="/corporate/team" className="text-gray-700 hover:text-blue-600 font-medium">Team</Link>
                <Link href="/corporate/billing" className="text-gray-700 hover:text-blue-600 font-medium">Billing</Link>
                <Link href="/corporate/settings" className="text-gray-700 hover:text-blue-600 font-medium">Settings</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Corporate Portal</span>
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
