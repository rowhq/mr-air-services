-- =====================================================
-- Mr. Air Services CMS Seed Data
-- =====================================================
-- Run this AFTER schema.sql to populate initial content
-- =====================================================

-- =====================================================
-- OFFICE LOCATIONS
-- =====================================================

INSERT INTO office_locations (name, address, city, state, zip, latitude, longitude, phone, email, is_primary, position) VALUES
  ('Missouri City', 'Suite 183, 2601 D Cartwright Rd', 'Missouri City', 'TX', '77459', 29.5635, -95.5377, '(956) 996-2665', 'info@mrairservices.com', TRUE, 0),
  ('Spring', '4057 Riley Fuzzel Rd, Ste 500-103', 'Spring', 'TX', '77386', 30.0799, -95.4172, '(956) 996-2665', 'info@mrairservices.com', FALSE, 1),
  ('Houston', '14526 Old Katy Rd', 'Houston', 'TX', '77079', 29.7858, -95.6200, '(956) 996-2665', 'info@mrairservices.com', FALSE, 2)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SERVICES
-- =====================================================

-- Services matching ServicesOverview.tsx defaultServices
INSERT INTO services (title, slug, description, short_description, icon, features, cta_text, cta_link, is_featured, position, is_published) VALUES
  (
    'AC Repair',
    'air-conditioning-repair',
    'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models.',
    'AC not cooling? Making weird noises? We diagnose fast and fix it right. Same-day service available.',
    'ac-repair',
    '["Same-day service available", "All brands serviced", "No hidden fees", "Licensed technicians"]',
    'Get Emergency Help',
    'tel:+18324371000',
    TRUE,
    0,
    TRUE
  ),
  (
    'CoolSaver Tune-Ups',
    'air-conditioning-tune-ups',
    '13-point inspection to catch problems before they become emergencies. Preventive maintenance that saves you money.',
    '13-point inspection to catch problems before they become emergencies. FREE for qualifying homeowners.',
    'tune-up',
    '["13-point inspection", "Prevents breakdowns", "Extends system life", "Improves efficiency"]',
    'Check If You Qualify',
    '/services/air-conditioning-tune-ups',
    TRUE,
    1,
    TRUE
  ),
  (
    'Heating',
    'heating',
    'Furnace acting up? Heat pump on the fritz? We fix it. Need a new system? We''ll help you pick the right one.',
    'Furnace acting up? Heat pump on the fritz? We fix it. Need a new system? We''ll help you pick the right one.',
    'heating',
    '["Furnace repair", "Heat pump service", "New system installation", "Emergency service"]',
    'Schedule Service',
    '/services/heating',
    TRUE,
    2,
    TRUE
  ),
  (
    'AC Installation',
    'air-conditioning-installation',
    'Need a new AC? We''ll help you choose the right system for your home and budget. Professional installation with financing available.',
    'Need a new AC? We''ll help you choose the right system for your home and budget. Professional installation with financing available.',
    'ac-install',
    '["Free estimates", "Top brands available", "Professional installation", "Financing options"]',
    'Get Free Estimate',
    '/services/air-conditioning-installation',
    FALSE,
    3,
    TRUE
  ),
  (
    'Indoor Air Quality',
    'indoor-air-quality',
    'Improve your home''s air quality with filtration, purification, and ventilation solutions. Breathe easier with cleaner, healthier air.',
    'Improve your home''s air quality with filtration, purification, and ventilation solutions.',
    'air-quality',
    '["Air purification systems", "Humidity control", "Duct cleaning", "Allergen reduction"]',
    'Improve Your Air',
    '/services/indoor-air-quality',
    FALSE,
    4,
    TRUE
  )
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- TESTIMONIALS
-- =====================================================

INSERT INTO testimonials (initials, location, rating, text, source, is_featured, position, is_published) VALUES
  ('MC', 'Missouri City', 5, 'They came out the same day I called. The technician was professional, explained everything clearly, and fixed my AC quickly. Highly recommend!', 'Google', TRUE, 0, TRUE),
  ('HT', 'Houston', 5, 'Fair pricing, honest assessment, and quality work. They don''t try to upsell you on things you don''t need.', 'Google', TRUE, 1, TRUE),
  ('SP', 'Spring', 5, 'The team was punctual, courteous, and efficient. Great customer service from start to finish.', 'Google', TRUE, 2, TRUE),
  ('JW', 'Katy', 5, 'Best HVAC experience I''ve ever had. Fixed my AC in under an hour and the price was exactly what they quoted.', 'Google', FALSE, 3, TRUE),
  ('RG', 'Sugar Land', 5, 'Veteran-owned and it shows in their work ethic. Professional, on-time, and thorough.', 'Google', FALSE, 4, TRUE)
ON CONFLICT DO NOTHING;

-- =====================================================
-- FAQS
-- =====================================================

-- General FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  (NULL, 'general', 'What areas do you service?', 'We service the entire Houston metro area including Missouri City, Spring, Katy, Sugar Land, The Woodlands, and surrounding communities.', 0, TRUE),
  (NULL, 'general', 'Do you offer financing?', 'Yes! We offer flexible financing options for larger repairs and new system installations. Ask about our 0% APR options for qualified buyers.', 1, TRUE),
  (NULL, 'general', 'Are you licensed and insured?', 'Absolutely. We are fully licensed, bonded, and insured. All our technicians are certified and undergo regular training.', 2, TRUE),
  (NULL, 'general', 'Do you offer emergency service?', 'Yes, we offer 24/7 emergency service for urgent HVAC issues. Call us anytime at (832) 437-1000.', 3, TRUE)
ON CONFLICT DO NOTHING;

-- AC Repair FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('air-conditioning-repair', 'ac-repair', 'How fast can you get here?', 'Usually same day in Houston. Look, when it''s 100 degrees and your AC just died, you don''t need someone telling you ''maybe Thursday.'' We get it.', 0, TRUE),
  ('air-conditioning-repair', 'ac-repair', 'Do you work on my brand?', 'Ruud, Lennox, Goodman, Trane, American Standard, Carrier—we service all major brands. If it cools air, we''ve worked on it.', 1, TRUE),
  ('air-conditioning-repair', 'ac-repair', 'What''s this gonna cost me?', 'Depends what''s broken. But you''ll know the exact price before we start. No "oh by the way" charges at the end.', 2, TRUE),
  ('air-conditioning-repair', 'ac-repair', 'Should I just replace this thing?', 'If your unit is 10-15+ years old and the repair costs more than half a new system, replacement usually makes more sense. We''ll tell you straight—no upselling.', 3, TRUE)
ON CONFLICT DO NOTHING;

-- Heating FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('heating', 'heating', 'What types of heating systems do you service?', 'We service all types including gas furnaces, electric furnaces, heat pumps, and dual-fuel systems.', 0, TRUE),
  ('heating', 'heating', 'When should I replace my furnace?', 'Most furnaces last 15-20 years. If yours is approaching that age and needing frequent repairs, it''s time to consider replacement.', 1, TRUE),
  ('heating', 'heating', 'Why is my heater blowing cold air?', 'Could be a thermostat issue, pilot light problem, or clogged filter. We''ll diagnose it quickly and give you options.', 2, TRUE)
ON CONFLICT DO NOTHING;

-- AC Installation FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('air-conditioning-installation', 'ac-installation', 'How do I know what size AC I need?', 'We calculate the right size based on your home''s square footage, insulation, windows, and other factors. Too big or too small both waste energy and money.', 0, TRUE),
  ('air-conditioning-installation', 'ac-installation', 'What brands do you install?', 'We install all major brands including Ruud, Lennox, Goodman, Trane, American Standard, and Carrier. We''ll help you pick the right one for your budget.', 1, TRUE),
  ('air-conditioning-installation', 'ac-installation', 'How long does installation take?', 'Most residential installations take 1 day. Complex jobs or ductwork modifications might take 2 days.', 2, TRUE),
  ('air-conditioning-installation', 'ac-installation', 'Do you offer financing?', 'Yes! We offer flexible financing with 0% APR options for qualified buyers. Apply in 5 minutes and get an instant decision.', 3, TRUE)
ON CONFLICT DO NOTHING;

-- Indoor Air Quality FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('indoor-air-quality', 'air-quality', 'What affects indoor air quality?', 'Dust, pet dander, pollen, mold spores, VOCs from cleaning products, and humidity levels all affect your indoor air. Poor ventilation makes it worse.', 0, TRUE),
  ('indoor-air-quality', 'air-quality', 'Do I need an air purifier?', 'If anyone in your home has allergies, asthma, or respiratory issues, an air purifier can make a big difference. We can assess your specific needs.', 1, TRUE),
  ('indoor-air-quality', 'air-quality', 'How often should I clean my ducts?', 'Every 3-5 years for most homes, or sooner if you notice dust buildup, musty odors, or recent construction.', 2, TRUE),
  ('indoor-air-quality', 'air-quality', 'What humidity level is best?', 'Between 30-50% is ideal for comfort and health. Too low causes dry skin and static; too high promotes mold growth.', 3, TRUE)
ON CONFLICT DO NOTHING;

-- Tune-Up FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('air-conditioning-tune-ups', 'tune-ups', 'How often should I get a tune-up?', 'Once a year, ideally before summer. Regular maintenance prevents breakdowns, keeps efficiency high, and extends your system''s life. Think of it like an oil change for your car.', 0, TRUE),
  ('air-conditioning-tune-ups', 'tune-ups', 'What does the tune-up include?', 'A 13-point inspection covering refrigerant levels, coils, electrical connections, drain lines, motors, and more. We check everything that affects cooling performance and efficiency.', 1, TRUE),
  ('air-conditioning-tune-ups', 'tune-ups', 'How do I qualify for a FREE tune-up?', 'Click ''Check If You Qualify'' and answer a few quick questions. Qualifying homeowners get a complete CoolSaver tune-up at no cost. It takes about 30 seconds.', 2, TRUE),
  ('air-conditioning-tune-ups', 'tune-ups', 'How long does a tune-up take?', 'About 45 minutes to an hour for a thorough inspection. We don''t rush—we check everything properly so you get real value from the service.', 3, TRUE)
ON CONFLICT DO NOTHING;

-- Financing FAQs
INSERT INTO faqs (page_slug, category, question, answer, position, is_published) VALUES
  ('financing-payments', 'financing', 'What credit score do I need?', 'Honestly? We work with a bunch of different lenders. Even if your credit''s seen better days, we can usually find something.', 0, TRUE),
  ('financing-payments', 'financing', 'What''s the interest rate?', 'Rates depend on your credit profile and term length. Apply to see your personalized options—it only takes 5 minutes and you''ll know right away.', 1, TRUE),
  ('financing-payments', 'financing', 'How do I apply?', 'Takes 5 minutes. Your tech can help you on the spot, or call our office. You''ll know if you''re approved before we leave.', 2, TRUE),
  ('financing-payments', 'financing', 'What if I get denied?', 'We''ve got multiple financing partners. If one says no, we try others. Most people who apply get approved somewhere. Your AC broke—that''s stressful enough without worrying about credit.', 3, TRUE),
  ('financing-payments', 'financing', 'Can I pay it off early?', 'Yep. No prepayment penalties. Pay it off whenever you want without extra fees.', 4, TRUE),
  ('financing-payments', 'financing', 'What''s the minimum to finance?', 'Minimums vary by lender. Most major repairs and new system installations qualify. Ask us for details.', 5, TRUE),
  ('financing-payments', 'financing', 'Any discounts for veterans or seniors?', 'Absolutely. We''ve got discounts for seniors, military, and first responders. Just ask when you schedule. We don''t make you jump through hoops.', 6, TRUE)
ON CONFLICT DO NOTHING;

-- =====================================================
-- NAVIGATION ITEMS
-- =====================================================

-- Header Navigation (matching Header.tsx)
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible) VALUES
  ('header', 'Home', '/', 0, FALSE, TRUE),
  ('header', 'Services', '/services', 1, FALSE, TRUE),
  ('header', 'Financing', '/financing-payments', 2, FALSE, TRUE),
  ('header', 'Pay Invoice', '/pay-invoice', 3, FALSE, TRUE),
  ('header', 'Contact', '/contact', 4, FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- Footer Navigation (matching Footer.tsx)
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible) VALUES
  ('footer', 'AC Repair', '/services/air-conditioning-repair', 0, FALSE, TRUE),
  ('footer', 'Tune-Ups', '/services/air-conditioning-tune-ups', 1, FALSE, TRUE),
  ('footer', 'Heating', '/services/heating', 2, FALSE, TRUE),
  ('footer', 'Contact', '/contact', 3, FALSE, TRUE),
  ('footer', 'Financing', '/financing-payments', 4, FALSE, TRUE),
  ('footer', 'Pay Invoice', '/pay-invoice', 5, FALSE, TRUE),
  ('footer', 'Privacy Policy', '/privacy-policy', 6, FALSE, TRUE),
  ('footer', 'Terms of Use', '/terms-of-use', 7, FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- =====================================================
-- HOMEPAGE BLOCKS
-- =====================================================

-- Get home page ID
DO $$
DECLARE
  home_page_id UUID;
BEGIN
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home';

  IF home_page_id IS NOT NULL THEN
    -- Hero Block (matching Hero.tsx defaultContent)
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      home_page_id,
      'hero',
      '{
        "title": "Free AC Tune-Ups for",
        "titleHighlight": "Qualifying Homeowners",
        "subtitle": "Your electric company charges you for this. Let us help you actually use it.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "license", "text": "TX Licensed"},
          {"id": "3", "icon": "shield", "text": "EPA Certified"},
          {"id": "4", "icon": "check", "text": "Fully Insured"}
        ],
        "primaryCta": {
          "text": "Check If You Qualify",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    -- Why Choose Us Block (matching WhyChooseUs.tsx defaultContent)
    (
      home_page_id,
      'why-choose-us',
      '{
        "sectionTitle": "Why People Call Us Back",
        "features": [
          {
            "id": "1",
            "icon": "certified",
            "title": "Experienced Pros",
            "description": "Our guys show up on time, explain what''s wrong in plain English, and fix it right. All major brands.",
            "stat": "98%",
            "statLabel": "on-time rate"
          },
          {
            "id": "2",
            "icon": "pricing",
            "title": "Upfront Pricing",
            "description": "We tell you what it costs before we touch anything. The price we quote is the price you pay.",
            "stat": "$0",
            "statLabel": "hidden fees"
          },
          {
            "id": "3",
            "icon": "guarantee",
            "title": "Guaranteed Work",
            "description": "Not happy? We come back. No arguments, no runaround. That''s how we''ve kept customers for 15 years.",
            "stat": "4.9/5",
            "statLabel": "avg rating"
          }
        ],
        "showImage": true,
        "imageUrl": "/images/financing/technician-helping.jpg",
        "showVeteranBadge": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    -- Services Overview Block (matching ServicesOverview.tsx defaultContent)
    (
      home_page_id,
      'services-overview',
      '{
        "sectionTitle": "When It Breaks, We Fix It.",
        "sectionSubtitle": "Before It Breaks, We Catch It.",
        "serviceIds": "featured",
        "layout": "3-col",
        "showCta": true
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    -- Testimonials Block
    (
      home_page_id,
      'testimonials',
      '{
        "sectionTitle": "What Our Customers Say",
        "testimonialIds": "featured",
        "layout": "grid",
        "maxItems": 3,
        "showSource": true
      }',
      '{"padding": "lg", "background": "gray"}',
      3,
      TRUE
    ),
    -- Areas Served Block
    (
      home_page_id,
      'areas-served',
      '{
        "title": "Serving the Greater Houston Area",
        "subtitle": "From The Woodlands to Sugar Land, we''ve got you covered",
        "showMap": true,
        "showList": true
      }',
      '{"padding": "lg", "background": "white"}',
      4,
      TRUE
    ),
    -- Final CTA Block (matching FinalCTA.tsx defaultContent)
    (
      home_page_id,
      'final-cta',
      '{
        "title": "Let''s Get Your AC Sorted",
        "subtitle": "AC acting up? Heater making weird noises? Or just want someone to check things out? Give us a call.",
        "primaryButton": {
          "text": "Schedule Your Service",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      5,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- AC REPAIR PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  ac_repair_page_id UUID;
BEGIN
  SELECT id INTO ac_repair_page_id FROM pages WHERE slug = 'air-conditioning-repair';

  IF ac_repair_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      ac_repair_page_id,
      'hero',
      '{
        "title": "AC Repair",
        "titleHighlight": "Houston",
        "subtitle": "When your AC quits, you need it fixed. Fast, fair, done right.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "clock", "text": "Same-Day Service"},
          {"id": "3", "icon": "shield", "text": "All Brands"}
        ],
        "primaryCta": {
          "text": "Get Help Now",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      ac_repair_page_id,
      'repair-process',
      '{
        "sectionTitle": "How We Work",
        "sectionSubtitle": "No runaround. No surprises.",
        "steps": [
          {"id": "1", "number": "01", "title": "You Call", "description": "We answer and schedule a visit", "badge": "Same day"},
          {"id": "2", "number": "02", "title": "We Diagnose", "description": "Find the real problem", "badge": "Honest assessment"},
          {"id": "3", "number": "03", "title": "You Approve", "description": "Know the price before we start", "badge": "No hidden fees"},
          {"id": "4", "number": "04", "title": "We Fix It", "description": "Quality parts, proper installation", "badge": "Guaranteed"}
        ],
        "layout": "horizontal"
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      ac_repair_page_id,
      'faq',
      '{
        "sectionTitle": "Common Questions",
        "sectionSubtitle": "Straight answers to what you''re probably wondering",
        "pageSlug": "air-conditioning-repair",
        "categories": ["ac-repair"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      ac_repair_page_id,
      'final-cta',
      '{
        "title": "AC Problems?",
        "subtitle": "Let''s get it fixed. Call now or schedule online.",
        "primaryButton": {
          "text": "Schedule Repair",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      3,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- HEATING PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  heating_page_id UUID;
BEGIN
  SELECT id INTO heating_page_id FROM pages WHERE slug = 'heating';

  IF heating_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      heating_page_id,
      'hero',
      '{
        "title": "Heating Services",
        "titleHighlight": "Houston",
        "subtitle": "Furnace acting up? Heat pump on the fritz? We fix it.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "certified", "text": "Licensed & Insured"},
          {"id": "3", "icon": "shield", "text": "All Systems"}
        ],
        "primaryCta": {
          "text": "Schedule Service",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      heating_page_id,
      'how-it-works',
      '{
        "sectionTitle": "Getting Started Is Easy",
        "sectionSubtitle": "From call to comfort in 4 simple steps",
        "steps": [
          {"id": "1", "number": "01", "title": "Contact Us", "shortTitle": "Get in touch", "description": "Call or book online"},
          {"id": "2", "number": "02", "title": "Pick a Time", "shortTitle": "Schedule your visit", "description": "Same-day available"},
          {"id": "3", "number": "03", "title": "We Arrive", "shortTitle": "Expert service", "description": "On time, every time"},
          {"id": "4", "number": "04", "title": "Stay Warm", "shortTitle": "Problem solved", "description": "Guaranteed work"}
        ],
        "layout": "cards"
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      heating_page_id,
      'faq',
      '{
        "sectionTitle": "Heating FAQs",
        "sectionSubtitle": "What you need to know",
        "pageSlug": "heating",
        "categories": ["heating"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      heating_page_id,
      'final-cta',
      '{
        "title": "Need Heating Help?",
        "subtitle": "Don''t freeze—call us today.",
        "primaryButton": {
          "text": "Schedule Service",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      3,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- TUNE-UPS PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  tuneups_page_id UUID;
BEGIN
  SELECT id INTO tuneups_page_id FROM pages WHERE slug = 'air-conditioning-tune-ups';

  IF tuneups_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      tuneups_page_id,
      'hero',
      '{
        "title": "CoolSaver",
        "titleHighlight": "Tune-Ups",
        "subtitle": "13-point inspection. Catch problems before they become emergencies.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "check", "text": "13-Point Inspection"},
          {"id": "2", "icon": "shield", "text": "Prevents Breakdowns"},
          {"id": "3", "icon": "star", "text": "FREE for Qualifying Homeowners"}
        ],
        "primaryCta": {
          "text": "Check If You Qualify",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      tuneups_page_id,
      'why-choose-us',
      '{
        "sectionTitle": "What''s Included",
        "features": [
          {
            "id": "1",
            "icon": "check",
            "title": "Complete Inspection",
            "description": "We check every component of your system—refrigerant levels, electrical connections, airflow, and more.",
            "stat": "13",
            "statLabel": "point inspection"
          },
          {
            "id": "2",
            "icon": "shield",
            "title": "Prevent Costly Repairs",
            "description": "Small problems caught early don''t become expensive emergencies later.",
            "stat": "90%",
            "statLabel": "of breakdowns preventable"
          },
          {
            "id": "3",
            "icon": "leaf",
            "title": "Lower Energy Bills",
            "description": "A tuned-up system runs more efficiently, saving you money every month.",
            "stat": "15%",
            "statLabel": "avg energy savings"
          }
        ],
        "showImage": false,
        "showVeteranBadge": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      tuneups_page_id,
      'faq',
      '{
        "sectionTitle": "Tune-Up FAQs",
        "sectionSubtitle": "Common questions about AC maintenance",
        "pageSlug": "air-conditioning-tune-ups",
        "categories": ["tune-ups"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      tuneups_page_id,
      'final-cta',
      '{
        "title": "Ready for Your Tune-Up?",
        "subtitle": "Don''t wait for your AC to fail on the hottest day of the year.",
        "primaryButton": {
          "text": "Schedule Tune-Up",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      3,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- FINANCING PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  financing_page_id UUID;
BEGIN
  SELECT id INTO financing_page_id FROM pages WHERE slug = 'financing-payments';

  IF financing_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      financing_page_id,
      'hero',
      '{
        "title": "Financing",
        "titleHighlight": "& Payments",
        "subtitle": "Flexible options to fit your budget. Don''t let cost stop you from staying comfortable.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "check", "text": "0% APR Available"},
          {"id": "2", "icon": "clock", "text": "Quick Approval"},
          {"id": "3", "icon": "shield", "text": "No Hidden Fees"}
        ],
        "primaryCta": {
          "text": "Apply Now",
          "href": "/contact",
          "variant": "primary"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      financing_page_id,
      'stats-grid',
      '{
        "title": "Financing Options",
        "stats": [
          {"id": "1", "value": "0%", "label": "APR Available", "icon": "percent"},
          {"id": "2", "value": "60", "label": "Month Terms", "icon": "calendar"},
          {"id": "3", "value": "$0", "label": "Down Payment", "icon": "dollar"},
          {"id": "4", "value": "2min", "label": "Approval Time", "icon": "clock"}
        ],
        "layout": "4-col"
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      financing_page_id,
      'faq',
      '{
        "sectionTitle": "Financing FAQs",
        "sectionSubtitle": "Common questions about payment options",
        "pageSlug": "financing-payments",
        "categories": ["financing"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      financing_page_id,
      'final-cta',
      '{
        "title": "Ready to Get Started?",
        "subtitle": "Apply for financing or pay your invoice online.",
        "primaryButton": {
          "text": "Contact Us",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "Pay Invoice",
          "href": "/pay-invoice",
          "type": "link"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      3,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- PRIVACY POLICY PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  privacy_page_id UUID;
BEGIN
  SELECT id INTO privacy_page_id FROM pages WHERE slug = 'privacy-policy';

  IF privacy_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      privacy_page_id,
      'text-content',
      '{
        "title": "Privacy Policy",
        "content": "<p><strong>Last Updated: January 2025</strong></p><p>Mr. Air Services (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p><h2>Information We Collect</h2><p><strong>Personal Information:</strong> Name, email address, phone number, service address, and payment information when you request services or contact us.</p><p><strong>Automatically Collected Information:</strong> Browser type, IP address, device information, pages visited, and time spent on our site.</p><h2>How We Use Your Information</h2><ul><li>To provide and maintain our services</li><li>To process transactions and send related information</li><li>To respond to your comments, questions, and requests</li><li>To send promotional communications (with your consent)</li><li>To improve our website and services</li></ul><h2>Information Sharing</h2><p>We do not sell your personal information. We may share information with service providers who assist our operations, or when required by law.</p><h2>Your Rights</h2><p>You may request access to, correction of, or deletion of your personal information by contacting us at info@mrairservices.com.</p><h2>Contact Us</h2><p>If you have questions about this Privacy Policy, please contact us at:<br/>Mr. Air Services<br/>Email: info@mrairservices.com<br/>Phone: (832) 437-1000</p>",
        "alignment": "left"
      }',
      '{"padding": "lg", "background": "white", "maxWidth": "narrow"}',
      0,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- TERMS OF USE PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  terms_page_id UUID;
BEGIN
  SELECT id INTO terms_page_id FROM pages WHERE slug = 'terms-of-use';

  IF terms_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      terms_page_id,
      'text-content',
      '{
        "title": "Terms of Use",
        "content": "<p><strong>Last Updated: January 2025</strong></p><p>Welcome to Mr. Air Services. By accessing or using our website and services, you agree to be bound by these Terms of Use.</p><h2>Use of Services</h2><p>You agree to use our services only for lawful purposes and in accordance with these Terms. You must be at least 18 years old to use our services.</p><h2>Service Appointments</h2><p>When you schedule a service appointment, you agree to:</p><ul><li>Provide accurate contact and service location information</li><li>Ensure someone 18 or older is present during the service</li><li>Provide safe access to the equipment requiring service</li><li>Pay for services rendered according to the quoted price</li></ul><h2>Pricing and Payment</h2><p>All prices quoted are estimates and may change based on actual conditions found during service. Final pricing will be confirmed before work begins. We accept cash, credit cards, and approved financing.</p><h2>Warranties</h2><p>Our work is guaranteed. Specific warranty terms will be provided with your service invoice.</p><h2>Limitation of Liability</h2><p>To the maximum extent permitted by law, Mr. Air Services shall not be liable for any indirect, incidental, special, or consequential damages.</p><h2>Changes to Terms</h2><p>We may update these Terms from time to time. Continued use of our services constitutes acceptance of updated Terms.</p><h2>Contact</h2><p>Questions about these Terms? Contact us at info@mrairservices.com or (832) 437-1000.</p>",
        "alignment": "left"
      }',
      '{"padding": "lg", "background": "white", "maxWidth": "narrow"}',
      0,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- PAY INVOICE PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  pay_page_id UUID;
BEGIN
  SELECT id INTO pay_page_id FROM pages WHERE slug = 'pay-invoice';

  IF pay_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      pay_page_id,
      'hero',
      '{
        "title": "Pay Your",
        "titleHighlight": "Invoice",
        "subtitle": "Quick, secure online payment. Have your invoice number ready.",
        "overlay": "light",
        "trustBadges": [
          {"id": "1", "icon": "shield", "text": "Secure Payment"},
          {"id": "2", "icon": "check", "text": "Instant Confirmation"}
        ],
        "primaryCta": {
          "text": "Pay Now",
          "href": "#payment-form",
          "variant": "primary"
        },
        "layout": "centered"
      }',
      '{"padding": "md", "background": "white"}',
      0,
      TRUE
    ),
    (
      pay_page_id,
      'contact-info',
      '{
        "title": "Need Help?",
        "subtitle": "Questions about your invoice? We''re here to help.",
        "showPhone": true,
        "showEmail": true,
        "showHours": true,
        "showLocations": false,
        "showMap": false
      }',
      '{"padding": "lg", "background": "gray"}',
      1,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- SERVICES INDEX PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  services_page_id UUID;
BEGIN
  SELECT id INTO services_page_id FROM pages WHERE slug = 'services';

  IF services_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      services_page_id,
      'hero',
      '{
        "title": "Our",
        "titleHighlight": "Services",
        "subtitle": "Professional HVAC services for Houston homeowners",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "license", "text": "TX Licensed"},
          {"id": "3", "icon": "shield", "text": "Fully Insured"}
        ],
        "primaryCta": {
          "text": "Get a Quote",
          "href": "/contact",
          "variant": "primary"
        },
        "layout": "centered"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      services_page_id,
      'services-grid',
      '{
        "sectionTitle": "What We Do",
        "sectionSubtitle": "From repairs to installations, we''ve got you covered",
        "serviceIds": [],
        "layout": "3-col",
        "showCta": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      services_page_id,
      'final-cta',
      '{
        "title": "Ready to Get Started?",
        "subtitle": "Schedule your service today.",
        "primaryButton": {
          "text": "Contact Us",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      2,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- CONTACT PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  contact_page_id UUID;
BEGIN
  SELECT id INTO contact_page_id FROM pages WHERE slug = 'contact';

  IF contact_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      contact_page_id,
      'hero',
      '{
        "title": "Contact",
        "titleHighlight": "Us",
        "subtitle": "Get in touch. We''re here to help.",
        "overlay": "light",
        "trustBadges": [],
        "primaryCta": {
          "text": "Call Now",
          "href": "tel:+18324371000",
          "variant": "primary"
        },
        "layout": "centered"
      }',
      '{"padding": "md", "background": "white"}',
      0,
      TRUE
    ),
    (
      contact_page_id,
      'contact-info',
      '{
        "title": "Get In Touch",
        "subtitle": "Multiple ways to reach us",
        "showPhone": true,
        "showEmail": true,
        "showHours": true,
        "showLocations": true,
        "showMap": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- SITE CONFIG FOR SERVICE PAGES
-- =====================================================

-- AC Repair Page Content
INSERT INTO site_config (key, value) VALUES
  ('ac_repair_page', '{
    "hero": {
      "title": "AC Dead? We''re On It.",
      "subtitle": "Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.",
      "backgroundImage": "/images/services/diagnostics-repairs.webp",
      "trustSignals": ["Same-day service", "All brands serviced", "No hidden fees"]
    },
    "brands": [
      { "name": "Ruud", "logo": "/images/brands/ruud.svg" },
      { "name": "Lennox", "logo": "/images/brands/lennox.svg" },
      { "name": "Goodman", "logo": "/images/brands/goodman.svg" },
      { "name": "Trane", "logo": "/images/brands/trane.svg" },
      { "name": "American Standard", "logo": "/images/brands/american-standard.svg" },
      { "name": "Carrier", "logo": "/images/brands/carrier.svg" }
    ],
    "repairTypes": [
      { "title": "AC Not Cooling", "description": "Refrigerant leaks, compressor issues, or airflow problems", "icon": "cooling" },
      { "title": "Strange Noises", "description": "Grinding, squealing, or banging sounds from your unit", "icon": "noise" },
      { "title": "Won''t Turn On", "description": "Electrical, thermostat, or capacitor failures", "icon": "power" },
      { "title": "Frozen Coils", "description": "Ice buildup from restricted airflow or low refrigerant", "icon": "ice" },
      { "title": "Water Leaks", "description": "Clogged drain lines or damaged condensate pans", "icon": "water" },
      { "title": "High Energy Bills", "description": "Inefficient operation or failing components", "icon": "bills" }
    ],
    "problemsTitle": "Common AC Problems We Fix",
    "problemsSubtitle": "With years of Houston experience, we diagnose and repair these issues daily"
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Heating Page Content
INSERT INTO site_config (key, value) VALUES
  ('heating_page', '{
    "hero": {
      "title": "Heat Out? We''re On It.",
      "subtitle": "Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.",
      "backgroundImage": "/images/services/heating-services.webp"
    },
    "services": [
      { "title": "Heating Repair", "description": "We fix furnaces, heat pumps, all brands. Same-day emergency service available.", "stat": "24/7", "statLabel": "emergency", "icon": "repair" },
      { "title": "New Installation", "description": "Need a new system? We help you pick the right size for your home. Financing available.", "stat": "Free", "statLabel": "estimates", "icon": "install" }
    ],
    "inspectionPhases": [
      {
        "phase": "Safety",
        "items": ["We make sure all safety switches actually work", "We look for dangerous gas leaks", "Carbon monoxide detector test", "Gas lines and vents inspection"]
      },
      {
        "phase": "Performance",
        "items": ["We test all electrical connections", "We verify it heats properly", "We adjust the flame and fan", "We clean the burners"]
      },
      {
        "phase": "Efficiency",
        "items": ["Thermostat accuracy check", "Filter replacement if needed", "Efficiency rating assessment", "Personalized recommendations"]
      }
    ],
    "warningSigns": [
      { "title": "Yellow Pilot Light", "description": "Should be blue. Yellow means incomplete combustion—schedule a checkup.", "icon": "flame" },
      { "title": "Strange Sounds", "description": "Banging, squealing, or rattling usually means parts are wearing out.", "icon": "sound" },
      { "title": "Short Cycling", "description": "Turns on and off constantly? Could be the thermostat or a dirty filter.", "icon": "cycle" },
      { "title": "Higher Bills", "description": "Sudden spike in energy costs? Your system may be losing efficiency.", "icon": "bills" }
    ]
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Tune-ups Page Content
INSERT INTO site_config (key, value) VALUES
  ('tuneups_page', '{
    "hero": {
      "title": "Annual AC Tune-Up & Preventative Maintenance",
      "subtitle": "Keep your system running at peak efficiency. FREE CoolSaver tune-ups for qualifying homeowners, or schedule your annual inspection today.",
      "trustSignals": ["NATE certified techs", "100% satisfaction guaranteed", "Veteran owned"]
    },
    "checklistItems": [
      "Inspect refrigerant level",
      "Inspect and clean condenser coils",
      "Inspect and clean contactor",
      "Check and calibrate thermostat",
      "Inspect airflow for proper specifications",
      "Inspect the evaporator coil",
      "Clean electrical and blower compartments",
      "Tighten electrical connections",
      "Inspect capacitors and relays",
      "Inspect all drain lines",
      "Check compressor for proper amp draw",
      "Check all motors for proper amp draw",
      "Oil the motors if required"
    ],
    "benefits": [
      { "title": "Lower Your Energy Bills", "description": "A clean, well-maintained system runs more efficiently. Better efficiency means lower monthly utility costs.", "icon": "dollar" },
      { "title": "Prevent Costly Repairs", "description": "We catch small issues before they become expensive emergencies. Regular maintenance saves you money long-term.", "icon": "shield" },
      { "title": "Extend System Lifespan", "description": "A well-maintained system lasts years longer. That''s thousands you''re not spending on a new unit.", "icon": "clock" }
    ],
    "checklistTitle": "What We Check",
    "checklistSubtitle": "A thorough inspection that catches problems before they become expensive emergencies."
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Services Hub Page Content
INSERT INTO site_config (key, value) VALUES
  ('services_page', '{
    "hero": {
      "title": "HVAC Services",
      "subtitle": "From emergency repairs to preventive maintenance. Same-day service available."
    }
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Financing Page Content
INSERT INTO site_config (key, value) VALUES
  ('financing_page', '{
    "hero": {
      "title": "Don''t Sweat the Bill",
      "subtitle": "New AC isn''t cheap. Neither is sleeping in a 90-degree house. We''ve got financing so you don''t have to choose between comfort and your budget.",
      "description": "5-minute application. Decision before we leave. Options for all credit profiles.",
      "backgroundImage": "/images/financing/happy-home.jpg"
    },
    "trustSignals": ["Quick Decision", "5-Min Apply", "No Penalties"],
    "financingUrl": "https://apply.svcfin.com/home/dealerAuthentication?id=400319926&key=1742219857",
    "howItWorks": [
      { "step": "1", "title": "Get a Quote", "description": "We tell you exactly what it costs. No hidden fees, no surprises.", "icon": "calculator" },
      { "step": "2", "title": "Apply in 5 Minutes", "description": "Your tech helps you right there. Quick form, basic info.", "icon": "phone" },
      { "step": "3", "title": "Instant Decision", "description": "You''ll know before we leave. If one lender says no, we try others.", "icon": "check" },
      { "step": "4", "title": "Stay Comfortable", "description": "We do the work. You make easy monthly payments. Done.", "icon": "home" }
    ],
    "realitySection": {
      "title": "Don''t Let a Big Bill Catch You Off Guard",
      "subtitle": "We get it—nobody budgets for a dead AC. That''s why we make financing simple:",
      "withoutFinancing": { "title": "Without Financing", "description": "Big upfront cost. Credit card debt. Drained savings." },
      "withFinancing": { "title": "With Financing", "description": "Easy monthly payments. Keep your savings. Stay comfortable." },
      "floatingStatValue": "5 min",
      "floatingStatLabel": "to apply"
    }
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Pay Invoice Page Content
INSERT INTO site_config (key, value) VALUES
  ('pay_invoice_page', '{
    "trustSignals": [
      { "icon": "lock", "text": "Secure payment" },
      { "icon": "card", "text": "All cards accepted" },
      { "icon": "check", "text": "Instant confirmation" }
    ],
    "helpBox": {
      "title": "Need Help?",
      "phone": "(832) 437-1000",
      "financingText": "Need financing options?",
      "financingLink": "/financing-payments"
    }
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- AC Installation Page Content
INSERT INTO site_config (key, value) VALUES
  ('ac_installation_page', '{
    "hero": {
      "title": "New AC Installation",
      "subtitle": "Need a new system? We''ll help you choose the right AC for your home and budget. Professional installation with financing available.",
      "backgroundImage": "/images/services/ac-installation.webp",
      "trustSignals": ["Free estimates", "Top brands", "Financing available"]
    },
    "brands": [
      { "name": "Ruud", "logo": "/images/brands/ruud.svg" },
      { "name": "Lennox", "logo": "/images/brands/lennox.svg" },
      { "name": "Goodman", "logo": "/images/brands/goodman.svg" },
      { "name": "Trane", "logo": "/images/brands/trane.svg" },
      { "name": "American Standard", "logo": "/images/brands/american-standard.svg" },
      { "name": "Carrier", "logo": "/images/brands/carrier.svg" }
    ],
    "benefits": [
      { "title": "Right Size System", "description": "We calculate exactly what your home needs. No oversizing, no undersizing.", "icon": "ruler", "stat": "100%", "statLabel": "proper sizing" },
      { "title": "Energy Savings", "description": "Modern systems use 30-50% less energy than units from 10+ years ago.", "icon": "leaf", "stat": "30-50%", "statLabel": "energy savings" },
      { "title": "Warranty Coverage", "description": "Manufacturer warranties plus our workmanship guarantee for complete protection.", "icon": "shield", "stat": "10yr", "statLabel": "warranty" }
    ],
    "process": [
      { "step": "1", "title": "Free Estimate", "description": "We assess your home and recommend the right system" },
      { "step": "2", "title": "Choose Your System", "description": "Pick from top brands with various efficiency ratings" },
      { "step": "3", "title": "Professional Install", "description": "Our licensed techs install it right, usually in one day" },
      { "step": "4", "title": "Stay Cool", "description": "Enjoy reliable comfort with full warranty coverage" }
    ]
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Indoor Air Quality Page Content
INSERT INTO site_config (key, value) VALUES
  ('indoor_air_quality_page', '{
    "hero": {
      "title": "Indoor Air Quality",
      "subtitle": "Breathe easier at home. We offer air purification, humidity control, and ventilation solutions to improve your family''s health and comfort.",
      "backgroundImage": "/images/services/indoor-air-quality.webp",
      "trustSignals": ["Cleaner air", "Healthier home", "Expert solutions"]
    },
    "services": [
      { "title": "Air Purification", "description": "Remove allergens, bacteria, and viruses from your home''s air", "icon": "air", "stat": "99%", "statLabel": "particles removed" },
      { "title": "Humidity Control", "description": "Balance humidity for comfort and to prevent mold growth", "icon": "humidity", "stat": "30-50%", "statLabel": "ideal range" },
      { "title": "Duct Cleaning", "description": "Remove dust, debris, and contaminants from your ductwork", "icon": "duct", "stat": "5yr", "statLabel": "recommended" },
      { "title": "Ventilation", "description": "Fresh air exchange systems for better indoor air quality", "icon": "ventilation", "stat": "24/7", "statLabel": "fresh air" }
    ],
    "problems": [
      { "title": "Allergies & Asthma", "description": "Airborne particles trigger symptoms. We can help filter them out." },
      { "title": "Dust Buildup", "description": "Excessive dust means your system isn''t filtering properly." },
      { "title": "Musty Odors", "description": "Could indicate mold or mildew in your ducts or system." },
      { "title": "Dry Air", "description": "Low humidity causes dry skin, static, and respiratory issues." }
    ],
    "benefits": [
      { "title": "Healthier Family", "description": "Reduce allergens and pollutants that affect your family''s health" },
      { "title": "Better Sleep", "description": "Clean air and proper humidity help you sleep better" },
      { "title": "Protect Your Home", "description": "Proper humidity prevents wood damage and mold growth" }
    ]
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- AC INSTALLATION PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  ac_install_page_id UUID;
BEGIN
  SELECT id INTO ac_install_page_id FROM pages WHERE slug = 'air-conditioning-installation';

  IF ac_install_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      ac_install_page_id,
      'hero',
      '{
        "title": "AC",
        "titleHighlight": "Installation",
        "subtitle": "Need a new system? We''ll help you choose the right AC for your home and budget.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "check", "text": "Free Estimates"},
          {"id": "3", "icon": "dollar", "text": "Financing Available"}
        ],
        "primaryCta": {
          "text": "Get Free Estimate",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      ac_install_page_id,
      'why-choose-us',
      '{
        "sectionTitle": "Why Replace Your AC?",
        "features": [
          {
            "id": "1",
            "icon": "leaf",
            "title": "Energy Savings",
            "description": "Modern systems use 30-50% less energy than units from 10+ years ago. Lower bills every month.",
            "stat": "30-50%",
            "statLabel": "energy savings"
          },
          {
            "id": "2",
            "icon": "shield",
            "title": "Reliable Comfort",
            "description": "New systems cool evenly and quietly. No more hot spots or loud cycling.",
            "stat": "10yr",
            "statLabel": "warranty"
          },
          {
            "id": "3",
            "icon": "check",
            "title": "Peace of Mind",
            "description": "Full manufacturer warranty plus our workmanship guarantee. We stand behind our work.",
            "stat": "100%",
            "statLabel": "satisfaction"
          }
        ],
        "showImage": false,
        "showVeteranBadge": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      ac_install_page_id,
      'how-it-works',
      '{
        "sectionTitle": "Our Installation Process",
        "sectionSubtitle": "From estimate to cool air in 4 simple steps",
        "steps": [
          {"id": "1", "number": "01", "title": "Free Estimate", "shortTitle": "We assess your home", "description": "Calculate exact needs"},
          {"id": "2", "number": "02", "title": "Choose System", "shortTitle": "Pick your brand", "description": "Top brands available"},
          {"id": "3", "number": "03", "title": "Install Day", "shortTitle": "Professional setup", "description": "Usually one day"},
          {"id": "4", "number": "04", "title": "Stay Cool", "shortTitle": "Enjoy comfort", "description": "Full warranty"}
        ],
        "layout": "cards"
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      ac_install_page_id,
      'faq',
      '{
        "sectionTitle": "Installation FAQs",
        "sectionSubtitle": "Common questions about getting a new AC",
        "pageSlug": "air-conditioning-installation",
        "categories": ["ac-installation"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "white"}',
      3,
      TRUE
    ),
    (
      ac_install_page_id,
      'final-cta',
      '{
        "title": "Ready for a New AC?",
        "subtitle": "Get a free estimate. No pressure, no obligation.",
        "primaryButton": {
          "text": "Get Free Estimate",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      4,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- INDOOR AIR QUALITY PAGE BLOCKS
-- =====================================================

DO $$
DECLARE
  iaq_page_id UUID;
BEGIN
  SELECT id INTO iaq_page_id FROM pages WHERE slug = 'indoor-air-quality';

  IF iaq_page_id IS NOT NULL THEN
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      iaq_page_id,
      'hero',
      '{
        "title": "Indoor Air",
        "titleHighlight": "Quality",
        "subtitle": "Breathe easier at home. Air purification, humidity control, and ventilation solutions.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "badge", "text": "Veteran Owned"},
          {"id": "2", "icon": "shield", "text": "Healthier Air"},
          {"id": "3", "icon": "check", "text": "Expert Solutions"}
        ],
        "primaryCta": {
          "text": "Improve Your Air",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "left-aligned"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    (
      iaq_page_id,
      'why-choose-us',
      '{
        "sectionTitle": "Air Quality Solutions",
        "features": [
          {
            "id": "1",
            "icon": "air",
            "title": "Air Purification",
            "description": "Remove allergens, bacteria, and viruses from your home''s air with advanced filtration systems.",
            "stat": "99%",
            "statLabel": "particles removed"
          },
          {
            "id": "2",
            "icon": "humidity",
            "title": "Humidity Control",
            "description": "Balance humidity for comfort and health. Prevent mold growth and dry air problems.",
            "stat": "30-50%",
            "statLabel": "ideal humidity"
          },
          {
            "id": "3",
            "icon": "duct",
            "title": "Duct Cleaning",
            "description": "Remove years of dust, debris, and contaminants from your ductwork for cleaner air flow.",
            "stat": "3-5yr",
            "statLabel": "recommended"
          }
        ],
        "showImage": false,
        "showVeteranBadge": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    (
      iaq_page_id,
      'faq',
      '{
        "sectionTitle": "Air Quality FAQs",
        "sectionSubtitle": "Common questions about improving your indoor air",
        "pageSlug": "indoor-air-quality",
        "categories": ["air-quality"],
        "layout": "accordion",
        "maxItems": 10
      }',
      '{"padding": "lg", "background": "gray"}',
      2,
      TRUE
    ),
    (
      iaq_page_id,
      'final-cta',
      '{
        "title": "Ready to Breathe Easier?",
        "subtitle": "Let us assess your home''s air quality and recommend solutions.",
        "primaryButton": {
          "text": "Get Assessment",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "background": "gradient"
      }',
      '{"padding": "lg", "background": "gradient"}',
      3,
      TRUE
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =====================================================
-- CONTACT PAGE CONFIGURATION
-- =====================================================

-- Contact Page Content (all text is CMS-editable)
INSERT INTO site_config (key, value) VALUES
  ('contact_page_title', 'Get In Touch'),
  ('contact_page_subtitle', 'Fill out the form or call us directly.'),
  ('contact_page_call_cta', 'Call us now'),
  ('contact_page_form_title', 'Send a Message'),
  ('contact_page_form_subtitle', 'We''ll get back to you within 24 hours.'),
  ('contact_page_label_name', 'Full Name'),
  ('contact_page_label_email', 'Email Address'),
  ('contact_page_label_phone', 'Phone Number'),
  ('contact_page_label_time', 'Preferred Time'),
  ('contact_page_label_services', 'Services Needed'),
  ('contact_page_label_message', 'Tell us about your HVAC needs...'),
  ('contact_page_time_morning', 'Morning (8AM - 12PM)'),
  ('contact_page_time_afternoon', 'Afternoon (12PM - 5PM)'),
  ('contact_page_time_flexible', 'Flexible'),
  ('contact_page_submit_button', 'Submit Form'),
  ('contact_page_privacy_text', 'By submitting, you agree to our'),
  ('contact_page_success_title', 'Message Sent!'),
  ('contact_page_success_message', 'Thank you for contacting Mr. Air Services. We''ll respond within 24 hours.'),
  ('contact_page_service_area', 'Serving Greater Houston Area')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
