'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSpaces() {
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSpaces()
  }, [])

  const fetchSpaces = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSpaces(data || [])
    } catch (error) {
      setError(error.message)
      console.error('Error fetching spaces:', error)
    } finally {
      setLoading(false)
    }
  }

  return { spaces, loading, error, refetch: fetchSpaces }
}
