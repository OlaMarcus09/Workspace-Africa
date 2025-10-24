import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const databaseService = {
  // Spaces - only show spaces with permission_to_list = true for public
  async getSpaces(filters = {}, includeAll = false) {
    let query = supabase
      .from('spaces')
      .select('*')
      .eq('is_active', true)

    // Only show spaces with permission to list unless explicitly including all
    if (!includeAll) {
      query = query.eq('permission_to_list', true)
    }

    // Apply filters
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }
    if (filters.amenities && filters.amenities.length > 0) {
      query = query.contains('amenities', filters.amenities)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getSpaceById(id, includeAll = false) {
    let query = supabase
      .from('spaces')
      .select(`
        *,
        reviews:reviews (
          rating,
          comment,
          created_at,
          profiles:user_id (
            full_name
          )
        )
      `)
      .eq('id', id)

    // Only show spaces with permission to list unless explicitly including all
    if (!includeAll) {
      query = query.eq('permission_to_list', true)
    }

    const { data, error } = await query.single()
    
    if (error) throw error
    return data
  },

  async getSpaceAvailability(spaceId, startDate, endDate = null) {
    let query = supabase
      .from('space_availability')
      .select('*')
      .eq('space_id', spaceId)
      .gte('date', startDate)
    
    if (endDate) {
      query = query.lte('date', endDate)
    } else {
      // If no end date, get next 7 days
      query = query.lte('date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    }

    const { data, error } = await query.order('date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Bookings
  async createBooking(bookingData) {
    // Start a transaction
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([{
        ...bookingData,
        qr_code: `WS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        status: 'confirmed'
      }])
      .select()
      .single()
    
    if (bookingError) throw bookingError

    // Update availability
    const { error: availabilityError } = await supabase
      .from('space_availability')
      .update({ 
        available_desks: supabase.sql`available_desks - 1` 
      })
      .eq('space_id', bookingData.space_id)
      .eq('date', bookingData.booking_date)
      .gte('available_desks', 1)

    if (availabilityError) throw availabilityError

    return booking
  },

  async getUserBookings(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        spaces:space_id (
          name,
          location,
          amenities,
          images
        )
      `)
      .eq('user_id', userId)
      .order('booking_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getBookingById(bookingId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        spaces:space_id (
          name,
          location,
          contact_phone,
          contact_person
        ),
        profiles:user_id (
          full_name,
          email,
          phone
        )
      `)
      .eq('id', bookingId)
      .single()
    
    if (error) throw error
    return data
  },

  // Profiles
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Partner functions - partners can see all their spaces regardless of permission_to_list
  async getPartnerSpaces(ownerId) {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getPartnerBookings(ownerId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        spaces:space_id (
          name,
          location
        ),
        profiles:user_id (
          full_name,
          email,
          phone
        )
      `)
      .eq('spaces.owner_id', ownerId)
      .order('booking_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getPartnerAnalytics(ownerId) {
    // Get today's date for calculations
    const today = new Date().toISOString().split('T')[0]
    
    // Today's revenue
    const { data: todayRevenue, error: revenueError } = await supabase
      .from('bookings')
      .select('total_amount')
      .eq('spaces.owner_id', ownerId)
      .eq('booking_date', today)
      .eq('payment_status', 'paid')

    if (revenueError) throw revenueError

    // Total bookings count
    const { count: totalBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('spaces.owner_id', ownerId)

    if (bookingsError) throw bookingsError

    // Average rating
    const { data: avgRating, error: ratingError } = await supabase
      .from('spaces')
      .select('rating')
      .eq('owner_id', ownerId)

    if (ratingError) throw ratingError

    return {
      todayRevenue: todayRevenue?.reduce((sum, booking) => sum + booking.total_amount, 0) || 0,
      totalBookings: totalBookings || 0,
      avgRating: avgRating?.length > 0 ? 
        avgRating.reduce((sum, space) => sum + parseFloat(space.rating), 0) / avgRating.length : 0
    }
  },

  // Reviews
  async createReview(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Search spaces with filters - only show permitted spaces
  async searchSpaces(searchParams) {
    let query = supabase
      .from('spaces')
      .select('*')
      .eq('is_active', true)
      .eq('permission_to_list', true)

    if (searchParams.location) {
      query = query.ilike('location', `%${searchParams.location}%`)
    }
    if (searchParams.query) {
      query = query.or(`name.ilike.%${searchParams.query}%,description.ilike.%${searchParams.query}%`)
    }
    if (searchParams.minPrice) {
      query = query.gte('price', searchParams.minPrice)
    }
    if (searchParams.maxPrice) {
      query = query.lte('price', searchParams.maxPrice)
    }
    if (searchParams.amenities && searchParams.amenities.length > 0) {
      query = query.contains('amenities', searchParams.amenities)
    }

    const { data, error } = await query.order('rating', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Admin function to get all spaces (including non-permitted)
  async getAllSpaces() {
    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}
