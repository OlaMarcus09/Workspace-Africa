'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
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

function BookingConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const bookingId = searchParams.get('booking')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    fetchUserProfile()
    if (bookingId) {
      fetchBookingDetails()
    }
  }, [bookingId])

  const fetchUserProfile = async () => {
    const profile = await getCurrentUserProfile()
    setUserProfile(profile)
  }

  const fetchBookingDetails = async () => {
    setLoading(true)
    try {
      const { data: bookingData, error } = await supabase
        .from('bookings')
        .select(`
          *,
          spaces (
            name,
            location,
            contact_person,
            contact_phone
          )
        `)
        .eq('id', bookingId)
        .single()

      if (error) throw error

      if (bookingData) {
        setBooking(bookingData)
      } else {
        console.error('Booking not found')
      }
    } catch (error) {
      console.error('Error fetching booking details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <Link href="/authenticated/spaces" className="text-blue-600 hover:text-blue-700">
            Back to Spaces
          </Link>
        </div>
      </div>
    )
  }

  const space = booking.spaces

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-2xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">You're all set! Present your QR code at check-in.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            {/* QR Code */}
            <div className="text-center mb-8">
              <div className="bg-gray-100 rounded-lg p-8 inline-block">
                <div className="text-4xl mb-2">📱</div>
                <div className="font-mono font-bold text-gray-900 text-lg">WS-{booking.id.toString().padStart(6, '0')}</div>
                <p className="text-sm text-gray-600 mt-2">
                  Expires: {new Date(booking.booking_date).toLocaleDateString()} 6:00 PM
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">WS-{booking.id.toString().padStart(6, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Space:</span>
                  <span className="font-medium">{space?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{space?.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{booking.start_time} - {booking.end_time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{booking.status}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-600 font-semibold">Amount Paid:</span>
                  <span className="font-bold text-lg">₦{booking.total_amount?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {space?.contact_person && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Space Contact</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    {space.contact_person}
                  </div>
                  {space.contact_phone && (
                    <div className="flex items-center">
                      <span className="mr-2">📞</span>
                      {space.contact_phone}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Add to Calendar
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Save to Phone
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Print Pass
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="mr-2">📱</span>
                Show your booking ID at the space reception
              </li>
              <li className="flex items-center">
                <span className="mr-2">🕒</span>
                Arrive during your booked time slot
              </li>
              <li className="flex items-center">
                <span className="mr-2">💼</span>
                Bring any necessary work materials
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                Contact the space directly if you need help
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8 space-y-4">
            <Link 
              href="/dashboard/bookings"
              className="block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View All Bookings
            </Link>
            <Link 
              href="/authenticated/spaces"
              className="block border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Book Another Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    }>
      <BookingConfirmationContent />
    </Suspense>
  )
}
