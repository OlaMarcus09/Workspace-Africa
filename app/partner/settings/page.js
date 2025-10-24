'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PartnerSettings() {
  const [spaceInfo, setSpaceInfo] = useState({
    name: "TheBunker Co-working Space",
    location: "123 Business District, Ibadan",
    description: "A premium coworking space with flexible plans and premium amenities",
    price: 5000,
    amenities: ["Wi-Fi", "Meeting Rooms", "Coffee", "AC", "Power Backup"]
  })

  const [availability, setAvailability] = useState({
    open24_7: true,
    weekdays: true,
    weekends: false
  })

  const handleSave = () => {
    // In a real app, this would save to the database
    alert('Settings saved successfully!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/partner/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Space Settings</h1>
        <p className="text-gray-600">Manage your space information and availability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Space Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Space Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Space Name</label>
              <input
                type="text"
                value={spaceInfo.name}
                onChange={(e) => setSpaceInfo({...spaceInfo, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={spaceInfo.location}
                onChange={(e) => setSpaceInfo({...spaceInfo, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={spaceInfo.description}
                onChange={(e) => setSpaceInfo({...spaceInfo, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Price (₦)</label>
              <input
                type="number"
                value={spaceInfo.price}
                onChange={(e) => setSpaceInfo({...spaceInfo, price: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Availability & Amenities */}
        <div className="space-y-8">
          {/* Availability */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Availability</h2>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={availability.open24_7}
                  onChange={(e) => setAvailability({...availability, open24_7: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">24/7 Access</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={availability.weekdays}
                  onChange={(e) => setAvailability({...availability, weekdays: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Open on Weekdays</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={availability.weekends}
                  onChange={(e) => setAvailability({...availability, weekends: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-700">Open on Weekends</span>
              </label>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 gap-3">
              {['Wi-Fi', 'Meeting Rooms', 'Coffee', 'AC', 'Power Backup', 'Printing', 'Parking', 'Kitchen'].map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={spaceInfo.amenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSpaceInfo({...spaceInfo, amenities: [...spaceInfo.amenities, amenity]})
                      } else {
                        setSpaceInfo({...spaceInfo, amenities: spaceInfo.amenities.filter(a => a !== amenity)})
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
