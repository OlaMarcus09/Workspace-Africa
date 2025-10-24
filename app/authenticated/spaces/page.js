'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const sampleSpaces = [
  {
    id: 1,
    name: "Seb's Hub Co-Working Space",
    location: "Bodija, Ibadan",
    price: 3000,
    description: "A premium coworking space in Bodija with flexible plans and premium amenities including AC, kitchen, meeting rooms, and high-speed Wi-Fi.",
    amenities: ["Wi-Fi", "Meeting Rooms", "Coffee", "AC", "Kitchen", "Power Backup"],
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: "Worknub Co-working Space", 
    location: "Agodi GRA, Ibadan",
    price: 3500,
    description: "Professional workspace with super fast Wi-Fi, private offices, meeting rooms, event hall, and 24/7 electricity.",
    amenities: ["24/7 Access", "Event Space", "Printing", "Parking", "Private Offices"],
    rating: 4.9,
    reviews: 18
  },
  {
    id: 3,
    name: "Stargate Workstation",
    location: "Cocoa House, Dugbe, Ibadan",
    price: 4500, 
    description: "Located on the 9th Floor of Cocoa House in Dugbe, offering private offices with AC and Wi-Fi in a prestigious business location.",
    amenities: ["Private Offices", "AC", "Wi-Fi", "Prestigious Location"],
    rating: 4.6,
    reviews: 15
  },
  {
    id: 4,
    name: "theBUNKer Services Nigeria Limited",
    location: "Ibadan",
    price: 15000,
    description: "Comprehensive workspace solution with private offices, meeting rooms, kitchen facilities, and reliable power backup.",
    amenities: ["Private Offices", "Meeting Rooms", "Kitchen", "Power Backup", "AC"],
    rating: 4.7,
    reviews: 12
  }
]

export default function AuthenticatedSpacesPage() {
  const router = useRouter()

  const handleBookNow = (spaceId) => {
    router.push(`/authenticated/spaces/${spaceId}`)
  }

  const handleViewDetails = (spaceId) => {
    router.push(`/authenticated/spaces/${spaceId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Workspaces in Ibadan</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover {sampleSpaces.length} premium workspaces with verified amenities and reliable connectivity
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search spaces by name or location..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Amenities</option>
              <option>Wi-Fi</option>
              <option>Meeting Rooms</option>
              <option>24/7 Access</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleSpaces.map((space) => (
          <div key={space.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 relative">
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                ₦{space.price.toLocaleString()}/day
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white rounded-full px-3 py-1 text-sm">
                ⭐ {space.rating} ({space.reviews})
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{space.name}</h3>
              
              <div className="flex items-center text-gray-600 mb-3 text-sm">
                <span className="mr-2">📍</span>
                {space.location}
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {space.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {space.amenities.length > 4 && (
                    <span className="text-xs text-gray-500">+{space.amenities.length - 4} more</span>
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

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{sampleSpaces.length}</div>
          <div className="text-gray-600">Spaces Available</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">4.8</div>
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
