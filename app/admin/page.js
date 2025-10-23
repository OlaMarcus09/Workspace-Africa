'use client'
import { useState } from 'react'
import { realSpaces } from '../../lib/real-spaces-data'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [step, setStep] = useState(1)

  const createTable = async () => {
    setLoading(true)
    setMessage('Creating spaces table...')

    try {
      // First, let's check if table exists
      const { error: checkError } = await supabase
        .from('spaces')
        .select('id')
        .limit(1)

      if (checkError && checkError.code === '42P01') {
        // Table doesn't exist, we need to create it via SQL
        setMessage('Table does not exist. Please create it in Supabase dashboard first.')
        return
      }

      setMessage('✅ Spaces table exists!')
      setStep(2)
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const initializeDatabase = async () => {
    setLoading(true)
    setMessage('Initializing database with real spaces...')

    try {
      // Insert each space
      let insertedCount = 0
      let errors = []
      
      for (const space of realSpaces) {
        const { data, error } = await supabase
          .from('spaces')
          .insert([space])
          .select()

        if (error) {
          errors.push(`${space.name}: ${error.message}`)
          console.error(`Error inserting ${space.name}:`, error)
        } else {
          insertedCount++
          console.log(`✅ Added: ${space.name}`)
        }
      }

      if (errors.length > 0) {
        setMessage(`⚠️ Inserted ${insertedCount} spaces, but had ${errors.length} errors. Check console for details.`)
      } else {
        setMessage(`✅ Success! Inserted ${insertedCount} spaces into the database.`)
      }
    } catch (error) {
      console.error('Database initialization failed:', error)
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearSpaces = async () => {
    setLoading(true)
    setMessage('Clearing spaces...')

    try {
      const { error } = await supabase
        .from('spaces')
        .delete()
        .neq('id', 0) // Delete all spaces

      if (error) throw error
      setMessage('✅ All spaces cleared from database.')
    } catch (error) {
      setMessage(`❌ Error clearing spaces: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-6">Database Admin</h1>
          
          <div className="space-y-6">
            {/* Setup Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Setup Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
                <li className={step >= 1 ? 'font-semibold' : ''}>Create spaces table in Supabase</li>
                <li className={step >= 2 ? 'font-semibold' : ''}>Initialize with real space data</li>
                <li>Verify spaces are displayed on website</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={createTable}
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check/Create Table'}
              </button>
              
              {step >= 2 && (
                <button
                  onClick={initializeDatabase}
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? 'Initializing...' : 'Initialize with Real Spaces'}
                </button>
              )}
              
              <button
                onClick={clearSpaces}
                disabled={loading}
                className="btn-secondary disabled:opacity-50"
              >
                Clear All Spaces
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('✅') ? 'bg-green-100 border border-green-200 text-green-700' : 
                message.includes('❌') ? 'bg-red-100 border border-red-200 text-red-700' :
                message.includes('⚠️') ? 'bg-yellow-100 border border-yellow-200 text-yellow-700' :
                'bg-blue-100 border border-blue-200 text-blue-700'
              }`}>
                {message}
              </div>
            )}

            {/* Manual Setup Instructions */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Manual Setup Instructions</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-4">
                  If automatic table creation fails, please create the table manually in your Supabase dashboard:
                </p>
                <div className="bg-black text-green-400 p-4 rounded text-sm font-mono overflow-x-auto">
                  {`CREATE TABLE spaces (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  amenities TEXT[],
  images TEXT[],
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Go to: Supabase Dashboard → Your Project → SQL Editor → Paste and run this SQL
                </p>
              </div>
            </div>

            {/* Spaces Preview */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Real Spaces Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {realSpaces.map((space, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h3 className="font-semibold text-primary-900">{space.name}</h3>
                    <p className="text-sm text-primary-600 mb-2">{space.location}</p>
                    <p className="text-lg font-bold text-accent-600">₦{space.price.toLocaleString()}/day</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {space.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {space.amenities.length > 3 && (
                        <span className="text-xs text-primary-500">+{space.amenities.length - 3} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
