import Link from 'next/link'

export default function BecomePartner() {
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
              <Link href="/become-partner" className="text-blue-600 font-medium">List Your Space</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Your Space on WorkSpace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join Africa's fastest-growing work community and start earning from your empty desks.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Pre-paid customers you wouldn't reach otherwise
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Zero upfront costs - pay only when you get bookings
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Free marketing to our community of professionals
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Started</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Space Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Start Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
