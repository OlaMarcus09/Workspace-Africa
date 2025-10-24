'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function TestSupabase() {
  const [status, setStatus] = useState('Testing...')
  const [user, setUser] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setStatus('Connecting to Supabase...')
      
      // Test basic connection
      const { data, error } = await supabase.from('_test').select('*').limit(1)
      
      if (error && error.code === '42P01') {
        // Table doesn't exist, but connection is working
        setStatus('✅ Supabase connected successfully!')
        
        // Check auth session
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setUser(session.user)
        }
      } else if (error) {
        setStatus(`❌ Error: ${error.message}`)
      } else {
        setStatus('✅ Supabase connected successfully!')
      }
    } catch (error) {
      setStatus(`❌ Connection failed: ${error.message}`)
    }
  }

  const testSignUp = async () => {
    try {
      setStatus('Testing signup...')
      const testEmail = `test${Date.now()}@workspaceafrica.com`
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123'
      })

      if (error) {
        setStatus(`❌ Signup failed: ${error.message}`)
      } else {
        setStatus(`✅ Signup successful! Check ${testEmail} for confirmation`)
        setUser(data.user)
      }
    } catch (error) {
      setStatus(`❌ Signup error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Supabase Connection Test</h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-2">Connection Status</h2>
              <p className={status.includes('✅') ? 'text-green-600' : status.includes('❌') ? 'text-red-600' : 'text-gray-600'}>
                {status}
              </p>
            </div>

            {status.includes('✅') && (
              <div className="space-y-4">
                <button
                  onClick={testSignUp}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Test User Signup
                </button>
                
                {user && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">User Created Successfully!</h3>
                    <pre className="text-sm text-green-700 overflow-auto">
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>If connection is successful, your authentication will work</li>
                <li>Test the signup/login functionality</li>
                <li>Check your Supabase dashboard for new users</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Troubleshooting</h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>Make sure your Supabase project is active</li>
                <li>Check that Authentication is enabled in Supabase</li>
                <li>Verify your environment variables are correct</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
