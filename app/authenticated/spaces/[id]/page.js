'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Inline Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Inline getCurrentUserProfile function
const getCurrentUserProfile = async () => {
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

export default function SpaceDetail() {
  const params = useParams()
  const router = useRouter()
  const spaceId = params.id
  const [space, setSpace] = useState(null)
  const [availability, setAvailability] = useState({})
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDesks, setAvailableDesks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    fetchSpaceDetails()
    fetchUserProfile()
  }, [spaceId])

  const fetchUserProfile = async () => {
    const profile = await getCurrentUserProfile()
    setUserProfile(profile)
  }

  const fetchSpaceDetails = async () => {
    setLoading(true)
    try {
      // Fetch space details
      const { data: spaceData, error: spaceError } = await supabase
        .from('spaces')
        .select('*')
        .eq('id', spaceId)
        .single()

      if (spaceError) throw spaceError

      if (!spaceData) {
        router.push('/authenticated/spaces')
        return
      }

      setSpace(spaceData)

      // Fetch availability for next 7 days
      const startDate = new Date()
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 6)

      const { data: availabilityData, error: availabilityError } = await supabase
        .from('space_availability')
        .select('*')
        .eq('space_id', spaceId)
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])

      if (availabilityError) throw availabilityError

      const availabilityObj = {}
      availabilityData?.forEach(avail => {
        availabilityObj[avail.date] = avail.available_desks
      })
      setAvailability(availabilityObj)

      // Set default selected date to tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const dateString = tomorrow.toISOString().split('T')[0]
      setSelectedDate(dateString)
      setAvailableDesks(availabilityObj[dateString] || 0)

    } catch (error) {
      console.error('Error fetching space details:', error)
      alert('Error loading space details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedDate) {
      setAvailableDesks(availability[selectedDate] || 0)
    }
  }, [selectedDate, availability])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleBookNow = async () => {
    if (!userProfile) {
      alert('Please log in to book a space')
      router.push('/login')
      return
    }

    if (!selectedDate) {
      alert('Please select a date')
      return
    }

    if (availableDesks === 0) {
      alert('No desks available for the selected date')
      return
    }

    setBookingLoading(true)
    try {
      // Create booking in database
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: userProfile.id,
            space_id: parseInt(spaceId),
            booking_date: selectedDate,
            start_time: '09:00',
            end_time: '18:00',
            status: 'confirmed',
            total_amount: space.pricing_daily || space.price,
            payment_status: 'paid'
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Update availability
      const newAvailableDesks = availableDesks - 1
      const { error: availabilityError } = await supabase
        .from('space_availability')
        .update({ available_desks: newAvailableDesks })
        .eq('space_id', spaceId)
        .eq('date', selectedDate)

      if (availabilityError) throw availabilityError

      // Redirect to booking confirmation
      router.push(`/booking/confirmation?booking=${booking.id}`)

    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Error creating booking. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading space details...</p>
        </div>
      </div>
    )
  }

  if (!space) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Space Not Found</h1>
          <Link href="/authenticated/spaces" className="text-blue-600 hover:text-blue-700">
            Back to Spaces
          </Link>
        </div>
      </div>
    )
  }

  // Generate next 7 days for availability calendar
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/authenticated/spaces" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4">
          ← Back to Spaces
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Space Images & Details */}
        <div>
          {/* Image Gallery */}
          <div className="bg-gray-200 rounded-xl h-80 mb-6 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🏢</div>
              <p>Space Images</p>
            </div>
          </div>

          {/* Space Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{space.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="ml-1 text-lg font-semibold">{space.rating || 4.5}</span>
                <span className="ml-2 text-gray-600">({space.review_count || 0} reviews)</span>
              </div>
              <span className="mx-4 text-gray-300">•</span>
              <div className="flex items-center text-gray-600">
                <span className="mr-1">📍</span>
                {space.location}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-gray-600 mr-6">
                <span className="mr-2">🕒</span>
                {space.amenities?.includes('24/7 Access') ? '24/7 Access' : 'Business Hours'}
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">💰</span>
                ₦{(space.pricing_daily || space.price)?.toLocaleString()}/day
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{space.description}</p>

            {/* Contact Information */}
            {(space.contact_person || space.contact_email || space.contact_phone) && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Contact Information</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  {space.contact_person && <div>👤 {space.contact_person}</div>}
                  {space.contact_email && <div>📧 {space.contact_email}</div>}
                  {space.contact_phone && <div>📞 {space.contact_phone}</div>}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {(space.amenities || []).map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Space</h2>

            {/* Live Availability */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Availability</h3>
              
              {/* Simple availability calendar */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {next7Days.map((date) => {
                  const dateObj = new Date(date)
                  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                  const isSelected = date === selectedDate
                  const desks = availability[date] || 0
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      disabled={desks === 0}
                      className={`p-2 border rounded-lg text-center transition-colors text-xs ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : desks === 0
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{dayNames[dateObj.getDay()]}</div>
                      <div className="text-gray-500 mb-1">{dateObj.getDate()}</div>
                      <div className={`text-xs font-semibold ${
                        desks > 3 ? 'text-green-600' : desks > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {desks}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 font-medium">Available Desks:</span>
                    <span className={`text-lg font-bold ${
                      availableDesks > 3 ? 'text-green-600' : availableDesks > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {availableDesks}
                    </span>
                  </div>
                  {availableDesks === 0 && (
                    <p className="text-red-600 text-sm mt-2">No desks available for selected date</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-blue-500 bg-blue-50 rounded-lg p-4 text-center">
                  <div className="font-semibold text-blue-700">1-Day Pass</div>
                  <div className="text-2xl font-bold text-gray-900">₦{(space.pricing_daily || space.price)?.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Perfect for a day</div>
                </div>
                {space.pricing_weekly && (
                  <div className="border border-gray-300 rounded-lg p-4 text-center">
                    <div className="font-semibold text-gray-700">Weekly Pass</div>
                    <div className="text-2xl font-bold text-gray-900">₦{space.pricing_weekly.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Save with weekly</div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={bookingLoading || availableDesks === 0 || !userProfile}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!userProfile ? 'Login to Book' : 
               bookingLoading ? 'Processing...' : 
               `Book Now - ₦${(space.pricing_daily || space.price)?.toLocaleString()}`}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              ✅ Instant confirmation • 🔒 Secure booking • 📱 Mobile pass
            </p>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                High-speed Wi-Fi access
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Access to common areas
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {space.amenities?.includes('Kitchen') ? 'Kitchen access' : 'Refreshment area'}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {space.amenities?.includes('Meeting Rooms') ? 'Meeting room access' : 'Work areas'}
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
