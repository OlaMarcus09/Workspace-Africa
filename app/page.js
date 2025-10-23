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

  const spaces = [
    {
      name: "Innovation Hub",
      location: "Bodija, Ibadan",
      price: "₦5,000",
      rating: 4.8,
      image: "/api/placeholder/400/300",
      amenities: ["WiFi", "Meeting Rooms", "Coffee"]
    },
    {
      name: "TechPoint Lounge", 
      location: "Ring Road, Ibadan",
      price: "₦4,500",
      rating: 4.6,
      image: "/api/placeholder/400/300",
      amenities: ["24/7 Access", "Event Space", "Printing"]
    },
    {
      name: "Creative Corner",
      location: "UI Axis, Ibadan", 
      price: "₦4,000",
      rating: 4.9,
      image: "/api/placeholder/400/300",
      amenities: ["Natural Light", "Quiet Zones", "Snacks"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Rest of the homepage content remains the same */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20">
        {/* ... existing hero section ... */}
      </section>

      {/* ... rest of the existing homepage content ... */}
    </div>
  )
}
