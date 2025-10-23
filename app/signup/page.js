'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await signUp({ email, password })
      if (error) throw error
      router.push('/spaces')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="card p-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
              <span className="text-2xl font-bold text-primary-900">WorkSpace</span>
            </div>
            <h2 className="text-3xl font-bold text-primary-900">Create Account</h2>
            <p className="mt-2 text-primary-600">Join thousands of professionals</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <span className="text-primary-600">Already have an account? </span>
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
