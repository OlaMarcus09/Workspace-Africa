-- =============================================
-- Safe, Idempotent Data Seeding Script
-- Handles all constraints and uses ON CONFLICT
-- =============================================

-- First, add the status column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'spaces' AND column_name = 'status') THEN
        ALTER TABLE public.spaces ADD COLUMN status VARCHAR DEFAULT 'live';
    END IF;
END $$;

-- Update existing spaces with new column values using ON CONFLICT style logic
DO $$
DECLARE
    space_record RECORD;
BEGIN
    FOR space_record IN (
        SELECT name FROM (VALUES 
            ('Seb''s Hub Co-Working Space'),
            ('Worknub Co-working Space'),
            ('Stargate Workstation'),
            ('theBUNKer Services Nigeria Limited'),
            ('Nesta Co-work Space, Akobo'),
            ('Cyberhaven')
        ) AS t(name)
    ) LOOP
        UPDATE public.spaces 
        SET 
            permission_to_list = CASE 
                WHEN name IN ('Seb''s Hub Co-Working Space', 'Worknub Co-working Space', 'Stargate Workstation', 'theBUNKer Services Nigeria Limited') 
                THEN true 
                ELSE false 
            END,
            contact_person = CASE 
                WHEN name = 'Seb''s Hub Co-Working Space' THEN 'Francis Nduamaka'
                WHEN name = 'Worknub Co-working Space' THEN 'The Worknub'
                WHEN name = 'Stargate Workstation' THEN 'Oyinlola Joseph'
                WHEN name = 'theBUNKer Services Nigeria Limited' THEN 'Olajoju Eniola'
                WHEN name = 'Nesta Co-work Space, Akobo' THEN 'Nesta Co-workspace'
                WHEN name = 'Cyberhaven' THEN '08122928847'
                ELSE contact_person
            END,
            pricing_daily = CASE 
                WHEN name = 'Seb''s Hub Co-Working Space' THEN 3000
                WHEN name = 'Worknub Co-working Space' THEN 3500
                WHEN name = 'Stargate Workstation' THEN 4500
                WHEN name = 'theBUNKer Services Nigeria Limited' THEN 15000
                WHEN name = 'Nesta Co-work Space, Akobo' THEN 4000
                WHEN name = 'Cyberhaven' THEN 2500
                ELSE pricing_daily
            END,
            pricing_weekly = CASE 
                WHEN name = 'Seb''s Hub Co-Working Space' THEN 8000
                WHEN name = 'Worknub Co-working Space' THEN 17500
                WHEN name = 'Stargate Workstation' THEN 18000
                WHEN name = 'theBUNKer Services Nigeria Limited' THEN 35000
                WHEN name = 'Nesta Co-work Space, Akobo' THEN 18500
                WHEN name = 'Cyberhaven' THEN 10000
                ELSE pricing_weekly
            END,
            pricing_monthly = CASE 
                WHEN name = 'Seb''s Hub Co-Working Space' THEN 40000
                WHEN name = 'Worknub Co-working Space' THEN 70000
                WHEN name = 'Stargate Workstation' THEN 50000
                WHEN name = 'theBUNKer Services Nigeria Limited' THEN 100000
                WHEN name = 'Nesta Co-work Space, Akobo' THEN 68000
                WHEN name = 'Cyberhaven' THEN 30000
                ELSE pricing_monthly
            END,
            status = 'live',
            notes = CASE 
                WHEN name = 'Seb''s Hub Co-Working Space' THEN '💳 Pricing Plans
Daily & Weekly Access
• 🌅 Morning Plan (8AM–12PM): ₦2,000/day or ₦8,000/week
• 🌇 Afternoon Plan (12PM–5PM): ₦3,000/day or ₦12,000/week
• 🌙 Night Plan (6PM–6AM): ₦5,000/day or ₦20,000/week
Monthly Memberships
• ⭐ Standard Plan: ₦30,000/month
• 🌟 Premium Plan: ₦40,000/month
    ◦ Includes 24/7 access, free event slot & more!
🎁 Discounts: Available at the discretion of the space manager.'
                WHEN name = 'Worknub Co-working Space' THEN 'Amenities (full): Super fast Wi‑Fi; Hot desk; Private desk; Private office; Meeting room; Event hall; 24/7 electricity (mapped to Power Backup); Air conditioning; Spacious kitchen; Lounge for relaxation; Content space.'
                WHEN name = 'Stargate Workstation' THEN 'Our Private offices are strictly on monthly rates.'
                WHEN name = 'theBUNKer Services Nigeria Limited' THEN ''
                WHEN name = 'Nesta Co-work Space, Akobo' THEN 'Nesta comprises of different spaces that suits your work taste. The prices above are for the general space in Nesta(THE HUB)'
                WHEN name = 'Cyberhaven' THEN ''
                ELSE notes
            END
        WHERE name = space_record.name;
    END LOOP;
END $$;

-- Insert missing spaces using ON CONFLICT
INSERT INTO public.spaces (
    name, description, location, price, amenities, contact_email, contact_person, 
    contact_phone, notes, pricing_daily, pricing_weekly, pricing_monthly, 
    permission_to_list, rating, review_count, is_active
) VALUES 
(
    'Seb''s Hub Co-Working Space',
    '💳 Pricing Plans Daily & Weekly Access • 🌅 Morning Plan (8AM–12PM): ₦2,000/day or ₦8,000/week • 🌇 Afternoon Plan (12PM–5PM): ₦3,000/day or ₦12,000/week • 🌙 Night Plan (6PM–6AM): ₦5,000/day or ₦20,000/week Monthly Memberships • ⭐ Standard Plan: ₦30,000/month • 🌟 Premium Plan: ₦40,000/month ◦ Includes 24/7 access, free event slot & more! 🎁 Discounts: Available at the discretion of the space manager.',
    'No 32, Awolowo Avenue, Bodija, Ibadan, Oyo State, Nigeria',
    3000,
    ARRAY['AC', 'Kitchen', 'Meeting Rooms', 'Power Backup', 'Private Offices', 'Wi-Fi'],
    'francis.nduamaka@gmail.com',
    'Francis Nduamaka',
    '08107180312',
    '💳 Pricing Plans Daily & Weekly Access • 🌅 Morning Plan (8AM–12PM): ₦2,000/day or ₦8,000/week • 🌇 Afternoon Plan (12PM–5PM): ₦3,000/day or ₦12,000/week • 🌙 Night Plan (6PM–6AM): ₦5,000/day or ₦20,000/week Monthly Memberships • ⭐ Standard Plan: ₦30,000/month • 🌟 Premium Plan: ₦40,000/month ◦ Includes 24/7 access, free event slot & more! 🎁 Discounts: Available at the discretion of the space manager.',
    3000,
    8000,
    40000,
    true,
    4.8,
    24,
    true
),
(
    'Worknub Co-working Space',
    'Amenities (full): Super fast Wi‑Fi; Hot desk; Private desk; Private office; Meeting room; Event hall; 24/7 electricity (mapped to Power Backup); Air conditioning; Spacious kitchen; Lounge for relaxation; Content space.',
    'West One Building, beside the office of the governor''s wife, Agodi GRA, Ibadan. Hours: 8 AM – 6 PM, Monday–Friday',
    3500,
    ARRAY['AC', 'Kitchen', 'Meeting Rooms', 'Power Backup', 'Private Offices', 'Wi-Fi', 'Event Space', 'Lounge'],
    'theworknub@gmail.com',
    'The Worknub',
    '07077732936',
    'Amenities (full): Super fast Wi‑Fi; Hot desk; Private desk; Private office; Meeting room; Event hall; 24/7 electricity (mapped to Power Backup); Air conditioning; Spacious kitchen; Lounge for relaxation; Content space.',
    3500,
    17500,
    70000,
    true,
    4.9,
    18,
    true
),
(
    'Stargate Workstation',
    'Our Private offices are strictly on monthly rates.',
    '9th Floor, Cocoa House, Dugbe, Ibadan, Oyo State, Nigeria',
    4500,
    ARRAY['AC', 'Private Offices', 'Wi-Fi'],
    'sales@stargateworkstation.com',
    'Oyinlola Joseph',
    '+2348148431594',
    'Our Private offices are strictly on monthly rates.',
    4500,
    18000,
    50000,
    true,
    4.6,
    15,
    true
),
(
    'theBUNKer Services Nigeria Limited',
    'Comprehensive workspace solution with private offices, meeting rooms, kitchen facilities, and reliable power backup.',
    'Ibadan',
    15000,
    ARRAY['AC', 'Kitchen', 'Meeting Rooms', 'Power Backup', 'Private Offices', 'Wi-Fi'],
    'Eolajoju@thebunker.services',
    'Olajoju Eniola',
    '+2348107820931',
    '',
    15000,
    35000,
    100000,
    true,
    4.7,
    12,
    true
),
(
    'Nesta Co-work Space, Akobo',
    'Nesta comprises of different spaces that suits your work taste. The prices above are for the general space in Nesta(THE HUB)',
    'House 10, Road 17, Bashorun Estate, Akobo, Ibadan',
    4000,
    ARRAY['Kitchen', 'Meeting Rooms', 'Power Backup', 'Private Offices', 'Wi-Fi'],
    'hello@nestaworkspace.com',
    'Nesta Co-workspace',
    '+2349036490191',
    'Nesta comprises of different spaces that suits your work taste. The prices above are for the general space in Nesta(THE HUB)',
    4000,
    18500,
    68000,
    false,
    4.5,
    10,
    true
),
(
    'Cyberhaven',
    'Modern workspace with essential amenities for productive work sessions.',
    'Okunmade street, opposite veterinary junction',
    2500,
    ARRAY['AC', 'Meeting Rooms', 'Wi-Fi'],
    'melody4odewunmi@gmail.com',
    '08122928847',
    '+2348122928847',
    '',
    2500,
    10000,
    30000,
    false,
    4.3,
    8,
    true
)
ON CONFLICT (name) DO UPDATE SET
    description = EXCLUDED.description,
    location = EXCLUDED.location,
    price = EXCLUDED.price,
    amenities = EXCLUDED.amenities,
    contact_email = EXCLUDED.contact_email,
    contact_person = EXCLUDED.contact_person,
    contact_phone = EXCLUDED.contact_phone,
    notes = EXCLUDED.notes,
    pricing_daily = EXCLUDED.pricing_daily,
    pricing_weekly = EXCLUDED.pricing_weekly,
    pricing_monthly = EXCLUDED.pricing_monthly,
    permission_to_list = EXCLUDED.permission_to_list,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    is_active = EXCLUDED.is_active,
    status = 'live';

-- Clear and recreate availability data safely
DELETE FROM public.space_availability 
WHERE space_id IN (SELECT id FROM public.spaces) 
   AND date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '6 days');

INSERT INTO public.space_availability (space_id, date, available_desks)
SELECT 
    s.id as space_id,
    date_series.date,
    CASE 
        WHEN s.name = 'Worknub Co-working Space' THEN 8
        WHEN s.name = 'Seb''s Hub Co-Working Space' THEN 5
        WHEN s.name = 'Stargate Workstation' THEN 3
        WHEN s.name = 'theBUNKer Services Nigeria Limited' THEN 4
        WHEN s.name = 'Nesta Co-work Space, Akobo' THEN 6
        WHEN s.name = 'Cyberhaven' THEN 7
        ELSE 5
    END as available_desks
FROM 
    public.spaces s
CROSS JOIN (
    SELECT (CURRENT_DATE + INTERVAL '1 day' * n)::date as date
    FROM generate_series(0, 6) n
) date_series
WHERE s.is_active = true
ON CONFLICT (space_id, date) DO UPDATE SET
    available_desks = EXCLUDED.available_desks;

-- Clear existing reviews safely (only for our demo data)
DELETE FROM public.reviews 
WHERE user_id IN (
    SELECT id FROM public.profiles 
    WHERE email LIKE '%@workspaceafrica.com'
) OR space_id IN (SELECT id FROM public.spaces);

-- Use existing authenticated users for reviews, or skip if none exist
DO $$
DECLARE
    user_count INTEGER;
    user_ids UUID[];
BEGIN
    -- Count existing users
    SELECT COUNT(*) INTO user_count FROM auth.users;
    
    IF user_count > 0 THEN
        -- Get existing user IDs
        SELECT ARRAY_AGG(id) INTO user_ids 
        FROM auth.users 
        LIMIT 3;
        
        -- Insert reviews only if we have users
        IF array_length(user_ids, 1) > 0 THEN
            -- Ensure profiles exist for these users
            INSERT INTO public.profiles (id, email, full_name, role)
            SELECT 
                u.id,
                u.email,
                COALESCE(u.raw_user_meta_data->>'full_name', 'User ' || row_number() OVER ()),
                'professional'
            FROM auth.users u
            WHERE u.id = ANY(user_ids)
            ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                full_name = EXCLUDED.full_name;
            
            -- Insert reviews for spaces
            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                5,
                'Amazing space with great amenities! The Wi-Fi is super fast and the staff is very helpful.'
            FROM public.spaces WHERE name = 'Seb''s Hub Co-Working Space'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                5,
                'Love the event space and meeting rooms. Perfect for our team meetings!'
            FROM public.spaces WHERE name = 'Worknub Co-working Space'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                4,
                'Great location and good facilities. Would recommend to anyone looking for a professional workspace.'
            FROM public.spaces WHERE name = 'Seb''s Hub Co-Working Space'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                5,
                'Excellent private offices with stunning views from Cocoa House!'
            FROM public.spaces WHERE name = 'Stargate Workstation'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                4,
                'Spacious and well-equipped. The kitchen facilities are a great bonus.'
            FROM public.spaces WHERE name = 'theBUNKer Services Nigeria Limited'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                4,
                'Good variety of spaces to suit different work styles and preferences.'
            FROM public.spaces WHERE name = 'Nesta Co-work Space, Akobo'
            ON CONFLICT DO NOTHING;

            INSERT INTO public.reviews (user_id, space_id, rating, comment)
            SELECT 
                user_ids[1],
                id,
                4,
                'Affordable and reliable. Great for individual work sessions.'
            FROM public.spaces WHERE name = 'Cyberhaven'
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;
END $$;

-- Update space ratings based on actual reviews (aggregated)
UPDATE public.spaces s 
SET 
    rating = COALESCE((
        SELECT ROUND(AVG(r.rating)::numeric, 1)
        FROM public.reviews r 
        WHERE r.space_id = s.id
    ), s.rating),
    review_count = COALESCE((
        SELECT COUNT(*)
        FROM public.reviews r 
        WHERE r.space_id = s.id
    ), s.review_count);

-- Final verification
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully';
    RAISE NOTICE 'Spaces created/updated: %', (SELECT COUNT(*) FROM public.spaces);
    RAISE NOTICE 'Spaces with permission to list: %', (SELECT COUNT(*) FROM public.spaces WHERE permission_to_list = true);
    RAISE NOTICE 'Availability records: %', (SELECT COUNT(*) FROM public.space_availability);
    RAISE NOTICE 'Review records: %', (SELECT COUNT(*) FROM public.reviews);
END $$;
