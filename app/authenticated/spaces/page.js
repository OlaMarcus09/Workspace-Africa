'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthenticatedSpacesPage() {
  const router = useRouter()
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAmenity, setSelectedAmenity] = useState('All Amenities')
  const [sortBy, setSortBy] = useState('price_low_high')

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
        .eq('permission_to_list', true)
        .order('name')

      if (error) throw error
      setSpaces(data || [])
    } catch (error) {
      console.error('Error fetching spaces:', error)
      alert('Error loading spaces. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = (spaceId) => {
    router.push(`/authenticated/spaces/${spaceId}`)
  }

  const handleViewDetails = (spaceId) => {
    router.push(`/authenticated/spaces/${spaceId}`)
  }

  // Filter and sort spaces
  const filteredSpaces = spaces
    .filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          space.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesAmenity = selectedAmenity === 'All Amenities' || 
                           (space.amenities && space.amenities.includes(selectedAmenity))
      return matchesSearch && matchesAmenity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low_high':
          return (a.pricing_daily || a.price) - (b.pricing_daily || b.price)
        case 'price_high_low':
          return (b.pricing_daily || b.price) - (a.pricing_daily || a.price)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

  // Get unique amenities for filter
  const allAmenities = [...new Set(spaces.flatMap(space => space.amenities || []))]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading spaces...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Workspaces in Ibadan</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover {filteredSpaces.length} premium workspaces with verified amenities and reliable connectivity
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search spaces by name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Amenities</option>
              {allAmenities.map(amenity => (
                <option key={amenity} value={amenity}>{amenity}</option>
              ))}
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpaces.map((space) => (
          <div key={space.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 relative">
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                ₦{(space.pricing_daily || space.price)?.toLocaleString()}/day
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white rounded-full px-3 py-1 text-sm">
                ⭐ {space.rating || 4.5} ({space.review_count || 0})
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{space.name}</h3>
              
              <div className="flex items-center text-gray-600 mb-3 text-sm">
                <span className="mr-2">📍</span>
                {space.location}
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                {space.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {(space.amenities || []).slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {(space.amenities || []).length > 4 && (
                    <span className="text-xs text-gray-500">+{(space.amenities || []).length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleBookNow(space.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-1"
                >
                  Book Now
                </button>
                <button 
                  onClick={() => handleViewDetails(space.id)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpaces.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No spaces found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{spaces.length}</div>
          <div className="text-gray-600">Spaces Available</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {spaces.length > 0 ? (spaces.reduce((sum, space) => sum + (space.rating || 0), 0) / spaces.length).toFixed(1) : '0.0'}
          </div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-gray-600">Support Available</div>
        </div>
      </div>
    </div>
  )
}
