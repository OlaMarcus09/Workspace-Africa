'use client'
import { useAuth } from '../../context/AuthContext'

export default function AuthStatus() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-600">Loading authentication state...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-primary-900 mb-6">Authentication Status</h1>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${user ? 'bg-green-100 border border-green-200' : 'bg-blue-100 border border-blue-200'}`}>
              <h2 className="font-semibold mb-2">Status:</h2>
              <p className={user ? 'text-green-700' : 'text-blue-700'}>
                {user ? '✅ User is authenticated' : '🔒 No user authenticated'}
              </p>
            </div>

            {user && (
              <div className="p-4 bg-primary-100 rounded-lg border border-primary-200">
                <h2 className="font-semibold text-primary-900 mb-2">User Info:</h2>
                <div className="text-sm text-primary-700 space-y-1">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>ID:</strong> {user.id}</p>
                </div>
              </div>
            )}

            <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
              <h2 className="font-semibold text-gray-900 mb-2">Test Navigation:</h2>
              <div className="flex flex-wrap gap-2">
                <a href="/" className="btn-secondary text-sm">Home</a>
                <a href="/spaces" className="btn-secondary text-sm">Spaces</a>
                <a href="/become-partner" className="btn-secondary text-sm">Partner</a>
                <a href="/signup" className="btn-secondary text-sm">Sign Up</a>
                <a href="/login" className="btn-secondary text-sm">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
