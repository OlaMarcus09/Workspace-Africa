import { MapPin, Wifi, Monitor, Coffee, Printer, Users } from 'lucide-react'

export default function SpacesPage() {
  const spaces = [
    {
      id: 1,
      name: "Innovation Hub Ibadan",
      description: "A vibrant coworking space designed for creatives and tech professionals in the heart of Ibadan.",
      location: "Bodija, Ibadan",
      price: 5000,
      image: "/api/placeholder/600/400",
      amenities: ["High-speed WiFi", "Meeting Rooms", "Coffee Bar", "Printing", "Event Space", "24/7 Access"],
      rating: 4.8,
      reviews: 47
    },
    {
      id: 2,
      name: "TechPoint Lounge",
      description: "Modern workspace with premium amenities and a thriving community of remote workers.",
      location: "Ring Road, Ibadan",
      price: 4500,
      image: "/api/placeholder/600/400",
      amenities: ["Private Booths", "High-speed WiFi", "Snacks", "Meeting Rooms", "Parking"],
      rating: 4.6,
      reviews: 32
    },
    {
      id: 3,
      name: "Creative Corner",
      description: "Inspiring space perfect for designers, writers, and creative professionals.",
      location: "UI Axis, Ibadan",
      price: 4000,
      image: "/api/placeholder/600/400",
      amenities: ["Natural Light", "Coffee Machine", "Relaxation Area", "WiFi", "Printing"],
      rating: 4.9,
      reviews: 28
    }
  ]

  const amenitiesIcons = {
    "High-speed WiFi": <Wifi className="h-4 w-4" />,
    "Meeting Rooms": <Users className="h-4 w-4" />,
    "Coffee Bar": <Coffee className="h-4 w-4" />,
    "Printing": <Printer className="h-4 w-4" />,
    "Event Space": <Monitor className="h-4 w-4" />,
    "24/7 Access": <Wifi className="h-4 w-4" />,
    "Private Booths": <Users className="h-4 w-4" />,
    "Snacks": <Coffee className="h-4 w-4" />,
    "Parking": <MapPin className="h-4 w-4" />,
    "Natural Light": <Wifi className="h-4 w-4" />,
    "Coffee Machine": <Coffee className="h-4 w-4" />,
    "Relaxation Area": <Users className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Find Your Perfect Workspace</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse through verified workspaces in Ibadan. Each space is guaranteed to meet our quality standards.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>All Ibadan</option>
                <option>Bodija</option>
                <option>Ring Road</option>
                <option>UI Axis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>Any Price</option>
                <option>Under ₦4,000</option>
                <option>₦4,000 - ₦6,000</option>
                <option>Over ₦6,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amenities</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>All Amenities</option>
                <option>Meeting Rooms</option>
                <option>24/7 Access</option>
                <option>Private Booths</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="btn-primary w-full">
                Search Spaces
              </button>
            </div>
          </div>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div key={space.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 card-hover overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary-500 to-accent-400 relative">
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-slate-900">
                  ₦{space.price.toLocaleString()}/day
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{space.name}</h3>
                  <div className="flex items-center bg-green-50 text-green-800 text-sm font-semibold px-2 py-1 rounded">
                    ★ {space.rating} ({space.reviews})
                  </div>
                </div>
                
                <div className="flex items-center text-slate-600 mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  {space.location}
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed">{space.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Amenities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {space.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600">
                        <span className="text-primary-600 mr-2">
                          {amenitiesIcons[amenity]}
                        </span>
                        {amenity}
                      </div>
                    ))}
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

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            We're adding new spaces every week. Tell us what you need and we'll help you find the perfect workspace.
          </p>
          <button className="btn-primary bg-white text-primary-600 hover:bg-blue-50 text-lg px-8 py-4">
            Request a Custom Space
          </button>
        </div>
      </div>
    </div>
  )
}
