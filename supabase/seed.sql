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

INSERT INTO services (title, slug, description, short_description, icon, features, cta_text, cta_link, is_featured, position, is_published) VALUES
  (
    'AC Repair',
    'air-conditioning-repair',
    'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models.',
    'AC not cooling? Making weird noises? We diagnose fast and fix it right. Same-day service available.',
    'wrench',
    '["Same-day service available", "All brands serviced", "No hidden fees", "Licensed technicians"]',
    'Get Emergency Help',
    'tel:+18324371000',
    FALSE,
    0,
    TRUE
  ),
  (
    'CoolSaver Tune-Ups',
    'air-conditioning-tune-ups',
    '13-point inspection to catch problems before they become emergencies. Preventive maintenance that saves you money.',
    '13-point inspection to catch problems before they become emergencies. FREE for qualifying homeowners.',
    'settings',
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
    'flame',
    '["Furnace repair", "Heat pump service", "New system installation", "Emergency service"]',
    'Schedule Service',
    '/services/heating',
    FALSE,
    2,
    TRUE
  ),
  (
    'AC Installation',
    'air-conditioning-installation',
    'Expert AC installation services. We help you choose the right system for your home and budget.',
    'Need a new AC? We''ll help you choose the right system and install it properly.',
    'plus-circle',
    '["Free estimates", "Top brands available", "Professional installation", "Warranty included"]',
    'Get Free Estimate',
    '/services/air-conditioning-installation',
    FALSE,
    3,
    TRUE
  ),
  (
    'Indoor Air Quality',
    'indoor-air-quality',
    'Breathe easier with our indoor air quality solutions. Air purifiers, humidifiers, and ventilation systems.',
    'Improve your home''s air quality with filtration, purification, and ventilation solutions.',
    'wind',
    '["Air purification systems", "Humidity control", "Duct cleaning", "Ventilation solutions"]',
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

-- =====================================================
-- NAVIGATION ITEMS
-- =====================================================

-- Header Navigation
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible) VALUES
  ('header', 'Services', '/services', 0, FALSE, TRUE),
  ('header', 'Financing', '/financing-payments', 1, FALSE, TRUE),
  ('header', 'Areas We Serve', '/areas-we-serve', 2, FALSE, TRUE),
  ('header', 'Contact', '/contact', 3, FALSE, TRUE)
ON CONFLICT DO NOTHING;

-- Footer Navigation
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible) VALUES
  ('footer', 'Privacy Policy', '/privacy-policy', 0, FALSE, TRUE),
  ('footer', 'Terms of Use', '/terms-of-use', 1, FALSE, TRUE),
  ('footer', 'Sitemap', '/sitemap.xml', 2, FALSE, TRUE)
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
    -- Hero Block
    INSERT INTO blocks (page_id, type, content, settings, position, is_visible) VALUES
    (
      home_page_id,
      'hero',
      '{
        "title": "Your Comfort, Our Priority",
        "titleHighlight": "Our Priority",
        "subtitle": "Houston''s trusted HVAC experts. Same-day service available for emergencies.",
        "overlay": "medium",
        "trustBadges": [
          {"id": "1", "icon": "shield-check", "text": "Licensed & Insured"},
          {"id": "2", "icon": "clock", "text": "Same-Day Service"},
          {"id": "3", "icon": "star", "text": "5-Star Rated"}
        ],
        "primaryCta": {
          "text": "Get Free Quote",
          "href": "/contact",
          "variant": "primary"
        },
        "secondaryCta": {
          "text": "(832) 437-1000",
          "href": "tel:+18324371000",
          "type": "phone"
        },
        "layout": "centered"
      }',
      '{"padding": "lg", "background": "dark"}',
      0,
      TRUE
    ),
    -- Why Choose Us Block
    (
      home_page_id,
      'why-choose-us',
      '{
        "sectionTitle": "Why Houston Trusts Mr. Air",
        "features": [
          {
            "id": "1",
            "icon": "award",
            "title": "Veteran-Owned",
            "description": "Service with integrity and discipline",
            "stat": "20+",
            "statLabel": "Years Experience"
          },
          {
            "id": "2",
            "icon": "clock",
            "title": "Fast Response",
            "description": "Same-day service for emergencies",
            "stat": "2hr",
            "statLabel": "Avg Response"
          },
          {
            "id": "3",
            "icon": "dollar-sign",
            "title": "Honest Pricing",
            "description": "No hidden fees, ever",
            "stat": "100%",
            "statLabel": "Transparent"
          }
        ],
        "showVeteranBadge": true
      }',
      '{"padding": "lg", "background": "white"}',
      1,
      TRUE
    ),
    -- Services Overview Block
    (
      home_page_id,
      'services-overview',
      '{
        "sectionTitle": "When It Breaks, We Fix It. Before It Breaks, We Catch It.",
        "sectionSubtitle": "Emergency at 2am or just time for a tune-up. We''ve got you.",
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
    -- Final CTA Block
    (
      home_page_id,
      'final-cta',
      '{
        "title": "Ready to Get Started?",
        "subtitle": "Schedule your service today and experience the Mr. Air difference.",
        "primaryButton": {
          "text": "Schedule Service",
          "href": "/contact"
        },
        "secondaryButton": {
          "text": "Call Now",
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
