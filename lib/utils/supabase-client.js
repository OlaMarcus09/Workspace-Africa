import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to get current user's profile
export const getCurrentUserProfile = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError
    return profile
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

// Database service functions
export const databaseService = {
  async getSpaces(filters = {}, includeAll = false) {
    let query = supabase
      .from('spaces')
      .select('*')
      .eq('is_active', true)

    if (!includeAll) {
      query = query.eq('permission_to_list', true)
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },
  
  async getSpaceById(id) {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}
