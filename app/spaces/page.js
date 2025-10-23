export default function SpacesPage() {
  return (
    <div className="min-h-screen bg-primary-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Available Workspaces</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h3 className="font-semibold text-primary-900 mb-4">Filters</h3>
              {/* Filter content will go here */}
              <p className="text-primary-600 text-sm">Filter options coming soon...</p>
            </div>
          </div>
          
          {/* Spaces Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Space cards will be populated here */}
              <div className="card-hover p-6 text-center">
                <p className="text-primary-600">Spaces listing coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
