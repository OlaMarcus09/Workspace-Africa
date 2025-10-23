'use client'
import { useState } from 'react'
import { realSpaces } from '../../lib/real-spaces-data'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const initializeDatabase = async () => {
    setLoading(true)
    setMessage('Initializing database...')

    try {
      // Insert each space
      let insertedCount = 0
      
      for (const space of realSpaces) {
        const { data, error } = await supabase
          .from('spaces')
          .insert([space])
          .select()

        if (error) {
          console.error(`Error inserting ${space.name}:`, error)
          setMessage(`Error: ${error.message}`)
        } else {
          insertedCount++
          console.log(`✅ Added: ${space.name}`)
        }
      }

      setMessage(`✅ Success! Inserted ${insertedCount} spaces into the database.`)
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
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={initializeDatabase}
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Initializing...' : 'Initialize Database with Real Spaces'}
              </button>
              
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
                'bg-blue-100 border border-blue-200 text-blue-700'
              }`}>
                {message}
              </div>
            )}

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

            {/* Database Status */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Database Status</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  This will insert {realSpaces.length} real workspaces from your CSV data into the Supabase database.
                  The spaces are ready to be displayed on your website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
