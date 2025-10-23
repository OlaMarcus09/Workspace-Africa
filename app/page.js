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
              <Link href="/spaces" className="text-gray-700 hover:text-blue-600 font-medium">Find Spaces</Link>
              <Link href="/become-partner" className="text-gray-700 hover:text-blue-600 font-medium">List Your Space</Link>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link href="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Started
                </Link>
              </div>
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
              From cozy coffee shops to professional coworking spaces—find your perfect spot.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/spaces" className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg">
                Explore Workspaces
              </Link>
              <Link href="/book-demo" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
                Book a Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Workspaces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">1,200+</div>
                <div className="text-gray-600">Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">4</div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Founder Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the leading workspaces that trusted us from day one
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founderPartners.map((partner, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center border border-blue-100">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{partner.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{partner.location}</p>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block">
                  Founder Partner
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose WorkSpace Africa?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to work productively, delivered seamlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who transformed their work life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Demo CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Workday?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book a personalized demo and see how WorkSpace Africa can help you find the perfect workspace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo" className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg">
              Book a Demo
            </Link>
            <Link href="/spaces" className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg">
              Explore Spaces
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
                <div>
                  <span className="text-xl font-bold">WorkSpace</span>
                  <span className="text-xl font-bold text-blue-400">Africa</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Africa's essential technology infrastructure for the flexible work economy.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/spaces" className="hover:text-white">Find Spaces</Link></li>
                <li><Link href="/cities" className="hover:text-white">Cities</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Partners</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/become-partner" className="hover:text-white">List Your Space</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 WorkSpace Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
