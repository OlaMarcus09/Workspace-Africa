'use client'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navigation({ currentPage = 'home' }) {
  const { user, signOut, isConfigured } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!isConfigured) {
    return (
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">WorkSpace Africa</span>
            </Link>
            <div className="text-sm text-yellow-600">
              🔧 Authentication not configured
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">WorkSpace Africa</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              href="/spaces" 
              className={`font-medium ${currentPage === 'spaces' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Spaces
            </Link>
            <Link 
              href="/become-partner" 
              className={`font-medium ${currentPage === 'partner' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              List Your Space
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className={`font-medium ${currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
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
