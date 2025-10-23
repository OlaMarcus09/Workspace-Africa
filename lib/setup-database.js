import { supabase } from './supabase'

export async function setupDatabase() {
  console.log('Setting up database tables...')

  // Create spaces table
  const { error: spacesError } = await supabase.rpc('create_spaces_table')
  
  if (spacesError) {
    console.log('Spaces table might already exist, continuing...')
  }

  // Create bookings table
  const { error: bookingsError } = await supabase.rpc('create_bookings_table')
  
  if (bookingsError) {
    console.log('Bookings table might already exist, continuing...')
  }

  console.log('Database setup complete!')
}

// SQL to run in Supabase SQL Editor:
/*
-- Create spaces table
CREATE TABLE IF NOT EXISTS spaces (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  amenities TEXT[],
  images TEXT[],
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  space_id BIGINT REFERENCES spaces(id),
  user_id UUID REFERENCES auth.users(id),
  booking_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  total_amount INTEGER NOT NULL,
  payment_reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active spaces" ON spaces
  FOR SELECT USING (is_active = true);

CREATE POLICY "Space owners can manage their spaces" ON spaces
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Users can view their own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
*/
