'use client'
import { useSpaces } from '../../hooks/useSpaces'
import { MapPin, Star, Wifi, Users, Coffee, Printer, Monitor } from 'lucide-react'
import Link from 'next/link'

export default function SpacesPage() {
  const { spaces, loading, error } = useSpaces()

  const amenitiesIcons = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    "High-speed WiFi": <Wifi className="h-4 w-4" />,
    "Meeting Rooms": <Users className="h-4 w-4" />,
    "Private Offices": <Users className="h-4 w-4" />,
    "AC": <Wifi className="h-4 w-4" />,
    "Air Conditioning": <Wifi className="h-4 w-4" />,
    "Kitchen": <Coffee className="h-4 w-4" />,
    "Power Backup": <Wifi className="h-4 w-4" />,
    "Event Space": <Monitor className="h-4 w-4" />,
    "24/7 Access": <Wifi className="h-4 w-4" />,
    "Lounge Area": <Users className="h-4 w-4" />,
    "Content Creation Space": <Monitor className="h-4 w-4" />,
    "Prestigious Location": <MapPin className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-primary-600">Loading spaces...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Error loading spaces: {error}</p>
            <Link href="/admin" className="text-primary-600 hover:underline mt-4 inline-block">
              Initialize Database
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Available Workspaces in Ibadan</h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Discover {spaces.length} premium workspaces with verified amenities and reliable connectivity
          </p>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div key={space.id} className="card-hover bg-white rounded-2xl shadow-sleek overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary-200 to-primary-300 relative">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary-900">
                  ₦{space.price?.toLocaleString()}/day
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-primary-900">{space.name}</h3>
                  <div className="flex items-center text-sm text-primary-600">
                    <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                    {space.rating || 'New'}
                  </div>
                </div>
                
                <div className="flex items-center text-primary-600 mb-4 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {space.location}
                </div>

                <p className="text-primary-600 mb-4 text-sm leading-relaxed line-clamp-2">
                  {space.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-primary-900 mb-3 text-sm">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {space.amenities?.slice(0, 4).map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm text-primary-600">
                        <span className="text-primary-600 mr-2">
                          {amenitiesIcons[amenity] || <Wifi className="h-4 w-4" />}
                        </span>
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                    {space.amenities?.length > 4 && (
                      <div className="text-xs text-primary-500 col-span-2">
                        +{space.amenities.length - 4} more amenities
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary flex-1">
                    Book Now
                  </button>
                  <button className="btn-secondary flex-1">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {spaces.length === 0 && (
          <div className="text-center py-12">
            <div className="card p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-primary-900 mb-4">No Spaces Available</h3>
              <p className="text-primary-600 mb-6">
                The database hasn't been initialized yet. You need to add spaces to the database first.
              </p>
              <Link href="/admin" className="btn-primary">
                Initialize Database
              </Link>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            We're adding new spaces every week. Tell us what you need and we'll help you find the perfect workspace.
          </p>
          <Link href="/become-partner" className="btn-primary bg-white text-primary-600 hover:bg-blue-50 text-lg px-8 py-4">
            List Your Space
          </Link>
        </div>
      </div>
    </div>
  )
}
