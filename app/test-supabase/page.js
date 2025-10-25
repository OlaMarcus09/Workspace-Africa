'use client'
import { useEffect, useState } from 'react'
import { supabase } from "../../lib/utils/supabase-client";

export default function TestSupabase() {
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .limit(5)

      if (error) throw error
      setSpaces(data || [])
    } catch (error) {
      console.error('Supabase connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
      
      {loading ? (
        <p>Testing connection...</p>
      ) : (
        <div>
          <p className="text-green-600 mb-4">✅ Connected to Supabase successfully!</p>
          <h2 className="text-xl font-semibold mb-4">Sample Spaces:</h2>
          <div className="space-y-4">
            {spaces.map(space => (
              <div key={space.id} className="border p-4 rounded">
                <h3 className="font-semibold">{space.name}</h3>
                <p>{space.location}</p>
                <p>₦{space.price}/day</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
