import Link from 'next/link'
import { 
  Search, 
  MapPin, 
  Wifi, 
  Users, 
  Clock, 
  Shield,
  ArrowRight,
  Star
} from 'lucide-react'
import Navigation from '../components/Navigation'

export default function Home() {
  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Book in 60 Seconds",
      description: "Instant booking with guaranteed availability"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Spaces",
      description: "Every space meets our quality standards"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Premium Amenities",
      description: "High-speed WiFi, meeting rooms, and more"
    }
  ]

  // These are sample spaces for the homepage - they'll be replaced with real data after DB setup
  const sampleSpaces = [
    {
      name: "Seb's Hub Co-Working",
      location: "Bodija, Ibadan",
      price: "₦3,000",
      rating: 4.8,
      amenities: ["Wi-Fi", "Meeting Rooms", "Coffee"]
    },
    {
      name: "Worknub Space", 
      location: "Agodi GRA, Ibadan",
      price: "₦3,500",
      rating: 4.6,
      amenities: ["24/7 Access", "Event Space", "Printing"]
    },
    {
      name: "Stargate Workstation",
      location: "Cocoa House, Ibadan", 
      price: "₦4,500",
      rating: 4.9,
      amenities: ["Private Offices", "AC", "Wi-Fi"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Find Your Perfect <span className="text-primary-600">Workspace</span>
            </h1>
            <p className="text-xl text-primary-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Book professional workspaces across Africa. From cozy corners to premium offices—find your perfect spot in seconds.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-sleek-lg p-2 max-w-2xl mx-auto mb-16">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-3">
                  <MapPin className="h-5 w-5 text-primary-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Where do you need space?"
                    className="flex-1 outline-none text-primary-900 placeholder-primary-400"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 py-3 border-l border-gray-100">
                  <Clock className="h-5 w-5 text-primary-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="When?"
                    className="flex-1 outline-none text-primary-900 placeholder-primary-400"
                  />
                </div>
                <Link href="/spaces" className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Spaces
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">{feature.title}</h3>
                <p className="text-primary-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Featured Workspaces</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Hand-picked spaces in Ibadan with premium amenities and reliable connectivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleSpaces.map((space, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sleek overflow-hidden hover:shadow-sleek-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-200 to-primary-300 relative">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary-900">
                    {space.price}/day
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-primary-900">{space.name}</h3>
                    <div className="flex items-center text-sm text-primary-600">
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                      {space.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-primary-600 mb-4 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {space.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {space.amenities.map((amenity, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link href="/spaces" className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium block text-center">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/spaces" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold">
              View all spaces <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">Ready to Transform Your Workday?</h2>
            <p className="text-primary-600 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of professionals who've found their perfect workspace through WorkSpace Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/spaces" className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Find a Workspace
              </Link>
              <Link href="/become-partner" className="border border-primary-600 text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                List Your Space
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
                <span className="text-xl font-semibold">WorkSpace</span>
              </div>
              <p className="text-primary-300 text-sm">
                Africa's essential technology infrastructure for the flexible work economy.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><Link href="/spaces" className="hover:text-white">Find Spaces</Link></li>
                <li><Link href="/cities" className="hover:text-white">Cities</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><Link href="/become-partner" className="hover:text-white">List Your Space</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-primary-300">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-800 mt-8 pt-8 text-center text-sm text-primary-400">
            <p>&copy; 2024 WorkSpace Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
