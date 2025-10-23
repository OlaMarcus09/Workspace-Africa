'use client'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <nav className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
              <span className="text-xl font-semibold text-primary-900">WorkSpace</span>
            </Link>
            <div className="text-primary-600 text-sm">Loading...</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
            <span className="text-xl font-semibold text-primary-900">WorkSpace</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">Home</Link>
            <Link href="/spaces" className="text-primary-600 hover:text-primary-700 font-medium">Spaces</Link>
            <Link href="/become-partner" className="text-primary-600 hover:text-primary-700 font-medium">List Your Space</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-primary-600">Welcome, {user.email}</span>
                <button 
                  onClick={handleSignOut}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
                <Link href="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
