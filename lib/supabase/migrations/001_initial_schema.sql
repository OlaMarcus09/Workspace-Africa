-- First, check if columns exist and add them if they don't

-- Add permission_to_list column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'permission_to_list') THEN
        ALTER TABLE public.spaces ADD COLUMN permission_to_list BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add other missing columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'contact_person') THEN
        ALTER TABLE public.spaces ADD COLUMN contact_person VARCHAR;
    END IF;
END $$;

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'notes') THEN
        ALTER TABLE public.spaces ADD COLUMN notes TEXT;
    END IF;
END $$;

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'pricing_daily') THEN
        ALTER TABLE public.spaces ADD COLUMN pricing_daily INTEGER;
    END IF;
END $$;

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'pricing_weekly') THEN
        ALTER TABLE public.spaces ADD COLUMN pricing_weekly INTEGER;
    END IF;
END $$;

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'pricing_monthly') THEN
        ALTER TABLE public.spaces ADD COLUMN pricing_monthly INTEGER;
    END IF;
END $$;

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'professional' CHECK (role IN ('professional', 'corporate', 'partner')),
  company_name TEXT,
  space_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create other tables if they don't exist
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  space_id BIGINT REFERENCES public.spaces(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount INTEGER NOT NULL,
  qr_code VARCHAR,
  payment_status VARCHAR DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  space_id BIGINT REFERENCES public.spaces(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id BIGSERIAL PRIMARY KEY,
  company_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  monthly_budget INTEGER DEFAULT 50000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.space_availability (
  id BIGSERIAL PRIMARY KEY,
  space_id BIGINT REFERENCES public.spaces(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  available_desks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(space_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.space_availability ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view active spaces" ON public.spaces;
DROP POLICY IF EXISTS "Partners can manage their spaces" ON public.spaces;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Partners can view bookings for their spaces" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Company admins can manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Anyone can view space availability" ON public.space_availability;
DROP POLICY IF EXISTS "Partners can manage space availability" ON public.space_availability;

-- RLS Policies

-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Spaces: Anyone can view active spaces with permission, partners can manage their spaces
CREATE POLICY "Anyone can view active spaces" ON public.spaces FOR SELECT USING (is_active = true AND permission_to_list = true);
CREATE POLICY "Partners can manage their spaces" ON public.spaces FOR ALL USING (auth.uid() = owner_id);

-- Bookings: Users can view their own bookings, partners can view bookings for their spaces
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Partners can view bookings for their spaces" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.spaces WHERE spaces.id = bookings.space_id AND spaces.owner_id = auth.uid())
);

-- Reviews: Anyone can view reviews, users can create their own reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Team Members: Company admins can manage team members
CREATE POLICY "Company admins can manage team members" ON public.team_members FOR ALL USING (
  auth.uid() = company_id OR 
  EXISTS (SELECT 1 FROM public.team_members tm WHERE tm.company_id = team_members.company_id AND tm.user_id = auth.uid() AND tm.role = 'admin')
);

-- Space Availability: Anyone can view, partners can manage
CREATE POLICY "Anyone can view space availability" ON public.space_availability FOR SELECT USING (true);
CREATE POLICY "Partners can manage space availability" ON public.space_availability FOR ALL USING (
  EXISTS (SELECT 1 FROM public.spaces WHERE spaces.id = space_availability.space_id AND spaces.owner_id = auth.uid())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_spaces_owner_id ON public.spaces(owner_id);
CREATE INDEX IF NOT EXISTS idx_spaces_location ON public.spaces(location);
CREATE INDEX IF NOT EXISTS idx_spaces_is_active ON public.spaces(is_active);
CREATE INDEX IF NOT EXISTS idx_spaces_permission ON public.spaces(permission_to_list);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_space_id ON public.bookings(space_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_reviews_space_id ON public.reviews(space_id);
CREATE INDEX IF NOT EXISTS idx_space_availability_space_date ON public.space_availability(space_id, date);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_spaces_updated_at ON public.spaces;
CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON public.spaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
