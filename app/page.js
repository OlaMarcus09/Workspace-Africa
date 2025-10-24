import Link from 'next/link'

const founderPartners = [
  { name: "Seb's Hub", location: "Bodija, Ibadan", joined: "2024" },
  { name: "Worknub Space", location: "Agodi GRA, Ibadan", joined: "2024" },
  { name: "Stargate Workstation", location: "Cocoa House, Ibadan", joined: "2024" },
  { name: "theBUNKer Services", location: "Ibadan", joined: "2024" }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    content: "WorkSpace Africa helped me find the perfect creative space. I've doubled my productivity since working from Seb's Hub!",
    rating: 5
  },
  {
    name: "Michael Adebayo", 
    role: "Tech Startup Founder",
    content: "As a startup, we needed flexible workspace. WorkSpace Africa gave us access to premium offices without long-term contracts.",
    rating: 5
  },
  {
    name: "Chiamaka Okoro",
    role: "Remote Software Engineer",
    content: "The verified amenities and reliable internet make all the difference. I can work confidently from any space on the platform.",
    rating: 5
  }
]

const features = [
  {
    icon: "🚀",
    title: "Instant Booking",
    description: "Reserve your workspace in 60 seconds with guaranteed availability"
  },
  {
    icon: "✅", 
    title: "Verified Quality",
    description: "Every space is personally verified for amenities and reliability"
  },
  {
    icon: "💰",
    title: "Flexible Pricing",
    description: "Pay only for what you need - daily, weekly, or monthly plans"
  },
  {
    icon: "🌍",
    title: "Across Africa",
    description: "Growing network of premium workspaces in multiple cities"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">WorkSpace</span>
                <span className="text-xl font-bold text-blue-600">Africa</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/spaces" className="text-gray-700 hover:text-blue-600 font-medium">Spaces</Link>
              <Link href="/become-partner" className="text-gray-700 hover:text-blue-600 font-medium">List Your Space</Link>
              <Link href="/book-demo" className="text-gray-700 hover:text-blue-600 font-medium">Book a Demo</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your <span className="text-blue-600">Office</span> is Waiting
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover and book <span className="font-semibold text-blue-600">guaranteed workspaces</span> across Africa.
              No commitments, just productive work.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-2 mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                    <input 
                      type="text" 
                      placeholder="Lagos, Nigeria" 
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</span>
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👥</span>
                    <select className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>1 Person</option>
                      <option>2 People</option>
                      <option>3+ People</option>
                    </select>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
                  <span>🔍</span>
                  <span>Search</span>
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center">
                <label className="flex items-center space-x-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Instant Book Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Spaces in Ibadan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Space 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TheBunker</h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  INSTANT BOOK
                </button>
              </div>
            </div>

            {/* Space 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nesta Hub</h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm text-gray-500 ml-2">(18 reviews)</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  INSTANT BOOK
                </button>
              </div>
            </div>

            {/* Space 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Seb's Hub</h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400">⭐⭐⭐⭐☆</span>
                  <span className="text-sm text-gray-500 ml-2">(15 reviews)</span>
                </div>
                <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                  REQUEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Trusted by Professionals Across Africa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Founder Partners in Ibadan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founderPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{partner.location}</p>
                <p className="text-blue-600 text-sm">Joined {partner.joined}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workday?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their perfect workspace through WorkSpace Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg">
              Get Started Today
            </Link>
            <Link href="/book-demo" className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="text-xl font-bold">WorkSpace Africa</span>
              </div>
              <p className="text-gray-400">
                Africa's essential technology infrastructure for the flexible work economy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/spaces" className="hover:text-white">Find Spaces</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/cities" className="hover:text-white">Cities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/become-partner" className="hover:text-white">List Your Space</a></li>
                <li><a href="/partner-benefits" className="hover:text-white">Benefits</a></li>
                <li><a href="/resources" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WorkSpace Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
