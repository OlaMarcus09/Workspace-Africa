'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

// Mock data - in real app, this would come from your database
const spacesData = {
  1: {
    name: "Seb's Hub Co-Working Space",
    description: "A vibrant coworking space in the heart of Bodija, designed for tech professionals and creatives. Features high-speed internet, meeting rooms, and a collaborative atmosphere with flexible plans for morning, afternoon, and night access.",
    location: "No 32, Awolowo Avenue, Bodija, Ibadan, Oyo State, Nigeria",
    price: 3000,
    amenities: ["High-speed WiFi", "Meeting Rooms", "Coffee Bar", "Printing", "Event Space", "24/7 Access", "AC", "Kitchen", "Power Backup"],
    contact: {
      email: "francis.nduamaka@gmail.com",
      phone: "08107180312"
    },
    rating: 4.8,
    reviews: 47
  },
  2: {
    name: "Worknub Co-working Space",
    description: "Professional workspace in Agodi GRA with super fast Wi-Fi, private offices, meeting rooms, event hall, and 24/7 electricity. Perfect for remote workers and small teams looking for professional environment.",
    location: "West One Building, beside the office of the governor's wife, Agodi GRA, Ibadan",
    price: 3500,
    amenities: ["Private Booths", "High-speed WiFi", "Snacks", "Meeting Rooms", "Parking", "Air Conditioning", "Event Hall", "Lounge"],
    contact: {
      email: "theworknub@gmail.com",
      phone: "07077732936"
    },
    rating: 4.6,
    reviews: 32
  },
  3: {
    name: "Stargate Workstation",
    description: "Located on the 9th Floor of Cocoa House in Dugbe, offering private offices with AC and Wi-Fi in a prestigious business location. Perfect for professionals who value prestige and privacy.",
    location: "9th Floor, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria",
    price: 4500,
    amenities: ["Private Offices", "AC", "Wi-Fi", "Prestigious Location", "Meeting Rooms", "Reception Services"],
    contact: {
      email: "sales@stargateworkstation.com",
      phone: "+2348148431594"
    },
    rating: 4.9,
    reviews: 28
  },
  4: {
    name: "theBUNKer Services Nigeria Limited",
    description: "Comprehensive workspace solution in Ibadan with private offices, meeting rooms, kitchen facilities, and reliable power backup. Designed for teams and individuals who need full-service workspace solutions.",
    location: "Ibadan",
    price: 15000,
    amenities: ["Private Offices", "Meeting Rooms", "Kitchen", "Power Backup", "AC", "Wi-Fi", "Security", "Cleaning Services"],
    contact: {
      email: "Eolajoju@thebunker.services",
      phone: "+2348107820931"
    },
    rating: 4.7,
    reviews: 15
  }
}

export default function SpaceDetailPage() {
  const params = useParams()
  const spaceId = params.id
  const space = spacesData[spaceId]
  
  const [selectedDate, setSelectedDate] = useState('')
  const [bookingStep, setBookingStep] = useState(1)

  if (!space) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Space Not Found</h1>
          <Link href="/spaces" className="btn-primary">
            Back to Spaces
          </Link>
        </div>
      </div>
    )
  }

  const amenitiesIcons = {
    "Wi-Fi": "📶",
    "High-speed WiFi": "📶",
    "Meeting Rooms": "👥",
    "Private Offices": "🏢",
    "AC": "❄️",
    "Kitchen": "🍳",
    "Power Backup": "🔋",
    "Event Space": "🎪",
    "24/7 Access": "🕒",
    "Lounge": "🛋️",
    "Parking": "🅿️",
    "Snacks": "☕",
    "Coffee Bar": "☕",
    "Printing": "🖨️",
    "Security": "🔒",
    "Cleaning Services": "🧹",
    "Reception Services": "💁",
    "Prestigious Location": "⭐"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">WorkSpace Africa</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/spaces" className="text-gray-700 hover:text-blue-600 font-medium">Spaces</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/spaces" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Spaces
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Space Info */}
          <div className="lg:col-span-2">
            {/* Space Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{space.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-2">📍</span>
                {space.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="text-lg font-semibold ml-1">{space.rating}</span>
                  <span className="text-gray-600 ml-2">({space.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ₦{space.price.toLocaleString()}/day
                </div>
              </div>
            </div>

            {/* Space Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">Main Workspace</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">Meeting Room</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">Common Area</span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600">Kitchen</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Space</h2>
              <p className="text-gray-600 leading-relaxed">{space.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-xl">{amenitiesIcons[amenity] || "✅"}</span>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Space</h3>
              
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDate}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                    <div className="space-y-2 text-sm text-gray-600">
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
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold text-gray-900">
                          <span>Total:</span>
                          <span>₦{space.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(3)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Pay with Paystack
                  </button>

                  <button
                    onClick={() => setBookingStep(1)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Booking
                  </button>
                </div>
              )}

              {/* Contact Info */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">📧</span>
                    {space.contact.email}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📞</span>
                    {space.contact.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
