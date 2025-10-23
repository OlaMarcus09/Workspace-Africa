import Link from 'next/link'
import { 
  MapPin, 
  Wifi, 
  Coffee, 
  Zap, 
  CheckCircle, 
  Users,
  Building,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Book in 60 Seconds",
      description: "Find, book, and get to work. No waiting, no complications."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Guaranteed Workspaces",
      description: "Every space is verified for quality, amenities, and reliability."
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Fill Empty Desks",
      description: "Space owners get pre-paid customers they wouldn't reach otherwise."
    }
  ]

  const spaces = [
    {
      name: "Innovation Hub Ibadan",
      location: "Bodija, Ibadan",
      amenities: ["High-speed WiFi", "Meeting Rooms", "Coffee Bar", "Printing"],
      price: "₦5,000/day",
      image: "/api/placeholder/400/250"
    },
    {
      name: "TechPoint Lounge",
      location: "Ring Road, Ibadan",
      amenities: ["24/7 Access", "Event Space", "Private Booths", "Snacks"],
      price: "₦4,500/day",
      image: "/api/placeholder/400/250"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your <span className="gradient-text">Office</span> is Waiting
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover and book <span className="font-semibold">guaranteed workspaces</span> across Africa in 60 seconds. 
            From cozy coffee shops to professional coworking spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/spaces" className="btn-primary bg-white text-primary-600 hover:bg-blue-50 text-lg px-8 py-4">
              Find a Workspace <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link href="/partner" className="btn-secondary text-white border-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
              List Your Space
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-white mb-4 inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Workspaces in Ibadan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hand-picked spaces with verified amenities and reliable connectivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map((space, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 card-hover overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-500 to-accent-400"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{space.name}</h3>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      {space.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {space.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <button className="btn-primary w-full">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add Your Space Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl shadow-lg card-hover overflow-hidden text-white p-8 flex flex-col justify-center items-center text-center">
              <Building className="h-12 w-12 mb-4 text-primary-400" />
              <h3 className="text-2xl font-bold mb-3">List Your Space</h3>
              <p className="text-slate-300 mb-6">
                Join WorkSpace Africa and fill your empty desks with pre-paid professionals
              </p>
              <Link href="/partner" className="btn-primary bg-primary-500 hover:bg-primary-400">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text">
                For Space Owners: Turn Empty Desks into Revenue
              </h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Connect with professionals actively looking for workspaces. Get pre-paid bookings 
                and manage your space efficiently with our tools.
              </p>
              
              <div className="space-y-4">
                {[
                  "Pre-paid customers you wouldn't reach otherwise",
                  "Simple dashboard to manage bookings and availability",
                  "Zero upfront costs - pay only when you get bookings",
                  "Join Africa's fastest-growing work community"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Ready to Get Started?</h3>
                <p className="text-slate-600 mt-2">Join our 6 partner spaces in Ibadan</p>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Space Name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="btn-primary w-full">
                  Apply to List Your Space
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
