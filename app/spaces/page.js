import Link from 'next/link'

const sampleSpaces = [
  {
    id: 1,
    name: "Seb's Hub Co-Working Space",
    location: "Bodija, Ibadan",
    price: 3000,
    description: "A premium coworking space in Bodija with flexible plans and premium amenities including AC, kitchen, meeting rooms, and high-speed Wi-Fi.",
    amenities: ["Wi-Fi", "Meeting Rooms", "Coffee", "AC", "Kitchen", "Power Backup"]
  },
  {
    id: 2,
    name: "Worknub Co-working Space", 
    location: "Agodi GRA, Ibadan",
    price: 3500,
    description: "Professional workspace with super fast Wi-Fi, private offices, meeting rooms, event hall, and 24/7 electricity.",
    amenities: ["24/7 Access", "Event Space", "Printing", "Parking", "Private Offices"]
  },
  {
    id: 3,
    name: "Stargate Workstation",
    location: "Cocoa House, Dugbe, Ibadan",
    price: 4500, 
    description: "Located on the 9th Floor of Cocoa House in Dugbe, offering private offices with AC and Wi-Fi in a prestigious business location.",
    amenities: ["Private Offices", "AC", "Wi-Fi", "Prestigious Location"]
  },
  {
    id: 4,
    name: "theBUNKer Services Nigeria Limited",
    location: "Ibadan",
    price: 15000,
    description: "Comprehensive workspace solution with private offices, meeting rooms, kitchen facilities, and reliable power backup.",
    amenities: ["Private Offices", "Meeting Rooms", "Kitchen", "Power Backup", "AC"]
  }
]

export default function SpacesPage() {
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
              <Link href="/spaces" className="text-blue-600 font-medium">Spaces</Link>
              <Link href="/become-partner" className="text-gray-700 hover:text-blue-600 font-medium">List Your Space</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Workspaces in Ibadan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover {sampleSpaces.length} premium workspaces with verified amenities and reliable connectivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleSpaces.map((space) => (
            <div key={space.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-200 to-blue-300 relative">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900">
                  ₦{space.price.toLocaleString()}/day
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{space.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-1">
                    Book Now
                  </button>
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors flex-1">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            We're adding new spaces every week. Tell us what you need and we'll help you find the perfect workspace.
          </p>
          <Link href="/become-partner" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg inline-block">
            List Your Space
          </Link>
        </div>
      </div>
    </div>
  )
}
