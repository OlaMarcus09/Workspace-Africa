'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  MapPin, 
  Star, 
  Wifi, 
  Users, 
  Coffee, 
  Printer, 
  Monitor, 
  Clock,
  Calendar,
  ArrowLeft,
  Home
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { realSpaces } from '../../../lib/real-spaces-data'

export default function SpaceDetailPage() {
  const params = useParams()
  const spaceId = params.id
  const [space, setSpace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')
  const [bookingStep, setBookingStep] = useState(1)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    fetchSpace()
  }, [spaceId])

  const fetchSpace = async () => {
    try {
      setLoading(true)
      
      // Try to fetch from database first
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .eq('id', spaceId)
        .single()

      if (error || !data) {
        // If not found in database, use fallback from realSpaces
        const fallbackSpace = realSpaces.find(s => 
          s.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === spaceId
        ) || realSpaces.find((s, index) => index === parseInt(spaceId))
        
        if (fallbackSpace) {
          setSpace(fallbackSpace)
          setUsingFallback(true)
        }
      } else {
        setSpace(data)
        setUsingFallback(false)
      }
    } catch (error) {
      console.error('Error fetching space:', error)
      // Use first space as fallback if specific space not found
      const fallbackSpace = realSpaces[0]
      setSpace(fallbackSpace)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  const amenitiesIcons = {
    "Wi-Fi": <Wifi className="h-5 w-5" />,
    "High-speed WiFi": <Wifi className="h-5 w-5" />,
    "Meeting Rooms": <Users className="h-5 w-5" />,
    "Private Offices": <Users className="h-5 w-5" />,
    "AC": <Wifi className="h-5 w-5" />,
    "Air Conditioning": <Wifi className="h-5 w-5" />,
    "Kitchen": <Coffee className="h-5 w-5" />,
    "Power Backup": <Wifi className="h-5 w-5" />,
    "Event Space": <Monitor className="h-5 w-5" />,
    "24/7 Access": <Clock className="h-5 w-5" />,
    "Lounge Area": <Users className="h-5 w-5" />,
    "Content Creation Space": <Monitor className="h-5 w-5" />,
    "Prestigious Location": <MapPin className="h-5 w-5" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-primary-600">Loading space details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!space) {
    return (
      <div className="min-h-screen bg-primary-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">Space Not Found</h1>
          <div className="space-y-4">
            <Link href="/spaces" className="btn-primary inline-block">
              Back to Spaces
            </Link>
            <br />
            <Link href="/" className="btn-secondary inline-block">
              <Home className="h-4 w-4 inline mr-2" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-6">
            <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link href="/spaces" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Spaces
            </Link>
          </div>
        </div>
      </nav>

      {usingFallback && (
        <div className="bg-blue-50 border-b border-blue-200">
          <div className="container mx-auto px-4 py-3">
            <p className="text-blue-700 text-sm text-center">
              💡 Using sample data. <Link href="/admin" className="font-semibold underline">Initialize database</Link> for full functionality.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Space Info */}
          <div className="lg:col-span-2">
            {/* Space Header */}
            <div className="card p-6 mb-6">
              <h1 className="text-3xl font-bold text-primary-900 mb-2">{space.name}</h1>
              <div className="flex items-center text-primary-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                {space.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-current text-yellow-400 mr-1" />
                  <span className="text-lg font-semibold">{space.rating || 'New'}</span>
                  <span className="text-primary-600 ml-2">({space.review_count || 0} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-accent-600">
                  ₦{space.price?.toLocaleString()}/day
                </div>
              </div>
            </div>

            {/* Space Images */}
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {space.images && space.images.length > 0 ? (
                  space.images.map((image, index) => (
                    <div key={index} className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg"></div>
                  ))
                ) : (
                  <div className="col-span-2 aspect-video bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600">Images coming soon</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">About This Space</h2>
              <p className="text-primary-600 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                    <span className="text-primary-600">
                      {amenitiesIcons[amenity] || <Wifi className="h-5 w-5" />}
                    </span>
                    <span className="text-primary-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">Book This Space</h3>
              
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDate}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-900 mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm text-primary-600">
                      <div className="flex justify-between">
                        <span>Space:</span>
                        <span>{space.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>1 day</span>
                      </div>
                      <div className="border-t border-primary-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-primary-900">
                          <span>Total:</span>
                          <span>₦{space.price?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(3)}
                    className="w-full btn-primary"
                  >
                    Pay with Paystack
                  </button>

                  <button
                    onClick={() => setBookingStep(1)}
                    className="w-full btn-secondary"
                  >
                    Back to Date Selection
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="text-center space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-700 text-sm">
                      Payment integration coming soon! This would connect to Paystack for real payments.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingStep(1)}
                    className="w-full btn-secondary"
                  >
                    Back to Booking
                  </button>
                </div>
              )}

              {/* Contact Info */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="font-semibold text-primary-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm text-primary-600">
                  {space.contact_email && (
                    <div>
                      <strong>Email:</strong> {space.contact_email}
                    </div>
                  )}
                  {space.contact_phone && (
                    <div>
                      <strong>Phone:</strong> {space.contact_phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
