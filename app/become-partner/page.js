export default function BecomePartner() {
  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary-900 mb-4">List Your Space on WorkSpace</h1>
          <p className="text-primary-600 text-lg max-w-2xl mx-auto">
            Join Africa's fastest-growing work community and start earning from your empty desks.
          </p>
        </div>
        
        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-primary-900 mb-4">Benefits</h3>
              <ul className="space-y-3 text-primary-600">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  Pre-paid customers you wouldn't reach otherwise
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  Zero upfront costs - pay only when you get bookings
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  Free marketing to our community of professionals
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary-900 mb-4">Get Started</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Space Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="btn-primary w-full">
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
