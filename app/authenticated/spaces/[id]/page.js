'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// Mock data - in real app, this would come from your database
const spaceData = {
  1: {
    id: 1,
    name: "Seb's Hub Co-Working Space",
    location: "Bodija, Ibadan",
    price: 3000,
    description: "A premium coworking space in Bodija with flexible plans and premium amenities including AC, kitchen, meeting rooms, and high-speed Wi-Fi.",
    amenities: ["Wi-Fi", "Meeting Rooms", "Coffee", "AC", "Kitchen", "Power Backup", "Printing", "Parking"],
    rating: 4.8,
    reviews: 24,
    images: [],
    availability: {
      "2024-03-25": 5,
      "2024-03-26": 3,
      "2024-03-27": 5,
      "2024-03-28": 4,
      "2024-03-29": 2
    }
  },
  2: {
    id: 2,
    name: "Worknub Co-working Space", 
    location: "Agodi GRA, Ibadan",
    price: 3500,
    description: "Professional workspace with super fast Wi-Fi, private offices, meeting rooms, event hall, and 24/7 electricity.",
    amenities: ["24/7 Access", "Event Space", "Printing", "Parking", "Private Offices", "Wi-Fi", "AC", "Power Backup"],
    rating: 4.9,
    reviews: 18,
    images: [],
    availability: {
      "2024-03-25": 8,
      "2024-03-26": 6,
      "2024-03-27": 7,
      "2024-03-28": 8,
      "2024-03-29": 5
    }
  }
}

export default function SpaceDetail() {
  const params = useParams()
  const router = useRouter()
  const spaceId = params.id
  const [space, setSpace] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [availableDesks, setAvailableDesks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call to fetch space details
    const fetchSpaceDetails = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        const spaceDetail = spaceData[spaceId]
        if (spaceDetail) {
          setSpace(spaceDetail)
          // Set default selected date to tomorrow
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          const dateString = tomorrow.toISOString().split('T')[0]
          setSelectedDate(dateString)
          setAvailableDesks(spaceDetail.availability[dateString] || 0)
        } else {
          // Space not found
          router.push('/authenticated/spaces')
        }
      } catch (error) {
        console.error('Error fetching space details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSpaceDetails()
  }, [spaceId, router])

  useEffect(() => {
    if (space && selectedDate) {
      setAvailableDesks(space.availability[selectedDate] || 0)
    }
  }, [selectedDate, space])

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const handleBookNow = async () => {
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
      // In a real app, this would create a booking in the database
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to booking confirmation
      router.push(`/booking/confirmation?space=${space.id}&date=${selectedDate}`)
    } catch (error) {
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
                <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                <span className="ml-2 text-gray-600">({space.reviews} reviews)</span>
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
                24/7 Access
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">💰</span>
                ₦{space.price}/day
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{space.description}</p>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {space.amenities.map((amenity, index) => (
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
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Object.entries(space.availability).slice(0, 5).map(([date, desks]) => {
                  const dateObj = new Date(date)
                  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                  const isSelected = date === selectedDate
                  
                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-sm font-medium">{dayNames[dateObj.getDay()]}</div>
                      <div className="text-xs text-gray-500 mb-1">{dateObj.getDate()}</div>
                      <div className={`text-xs font-semibold ${
                        desks > 3 ? 'text-green-600' : desks > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {desks} desks
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
                  <div className="text-2xl font-bold text-gray-900">₦{space.price}</div>
                  <div className="text-sm text-gray-600">Perfect for a day</div>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 text-center">
                  <div className="font-semibold text-gray-700">5-Day Pass</div>
                  <div className="text-2xl font-bold text-gray-900">₦{(space.price * 5 * 0.9).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Save 10%</div>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              disabled={bookingLoading || availableDesks === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingLoading ? 'Processing...' : `Book Now - ₦${space.price}`}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              ✅ Instant confirmation • 🔒 Secure payment • 📱 Mobile pass
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
                Free coffee and tea
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Printing facilities (limited)
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
