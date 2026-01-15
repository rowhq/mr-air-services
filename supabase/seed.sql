-- =====================================================
-- Mr. Air Services CMS Seed Data
-- =====================================================
-- Run this AFTER schema.sql to populate initial content
-- =====================================================

-- =====================================================
-- ADMIN USER
-- =====================================================
-- Default admin credentials:
-- Email: admin@mrairservices.com
-- Password: Admin123!
-- IMPORTANT: Change this password in production!

INSERT INTO users (email, password_hash, name, role) VALUES
  (
    'admin@mrairservices.com',
    '$2b$10$3RuRc6KIAEtjqH3V3PLBP.J75IlKTx1U2IvfgBcgyEBbImHd97pFy',
    'Admin',
    'admin'
  )
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

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

-- AC REPAIR PAGE: Using hardcoded design (no CMS blocks)

-- HEATING PAGE: Using hardcoded design (no CMS blocks)

-- TUNE-UPS PAGE: Using hardcoded design (no CMS blocks)

-- FINANCING PAGE: Using hardcoded design (no CMS blocks)

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

-- PAY INVOICE PAGE: Using hardcoded design (no CMS blocks)

-- SERVICES INDEX PAGE: Using hardcoded design (no CMS blocks)

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

-- =====================================================
-- PAY INVOICE PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  ('pay_invoice_title', 'Pay Your Invoice'),
  ('pay_invoice_description', 'Quick, secure payment. Takes less than a minute.'),
  ('pay_invoice_trust_1', 'Secure payment'),
  ('pay_invoice_trust_2', 'All cards accepted'),
  ('pay_invoice_trust_3', 'Instant confirmation'),
  ('pay_invoice_help_title', 'Need Help?'),
  ('pay_invoice_help_description', 'Questions about your invoice or payment options?'),
  ('pay_invoice_financing_link', 'View financing options')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- SERVICES HUB PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  -- Hero
  ('services_hero_title', 'HVAC Services'),
  ('services_hero_description', 'From emergency repairs to preventive maintenance. Same-day service available.'),
  -- AC Repair Card
  ('services_ac_badge', 'Same-Day'),
  ('services_ac_title', 'AC Repair'),
  ('services_ac_description', 'AC not cooling? Making weird noises? We diagnose fast and fix it right. Same-day service available.'),
  ('services_ac_feature_1', 'All major brands'),
  ('services_ac_feature_2', 'Upfront pricing'),
  ('services_ac_feature_3', 'Parts warranty'),
  ('services_ac_button', 'Schedule Repair'),
  -- Heating Card
  ('services_heating_title', 'Heating'),
  ('services_heating_description', 'Furnace acting up? Heat pump on the fritz? We fix it. Need a new system? We''ll help you pick the right one.'),
  ('services_heating_feature_1', 'Furnace repair'),
  ('services_heating_feature_2', 'Heat pumps'),
  ('services_heating_feature_3', 'Emergency service'),
  ('services_heating_button', 'Schedule Service'),
  -- Tune-Ups Card
  ('services_tuneups_badge', 'FREE for Qualifying'),
  ('services_tuneups_title', 'CoolSaver Tune-Ups'),
  ('services_tuneups_description', '13-point inspection to catch problems before they become emergencies. FREE for qualifying homeowners.'),
  ('services_tuneups_feature_1', '13-point inspection'),
  ('services_tuneups_feature_2', 'Filter replacement'),
  ('services_tuneups_feature_3', 'Coil cleaning'),
  ('services_tuneups_button', 'Check If You Qualify')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- AC REPAIR PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  -- Hero
  ('ac_repair_hero_title', 'AC Dead? We''re On It.'),
  ('ac_repair_hero_description', 'Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.'),
  ('ac_repair_hero_primary_button', 'Schedule AC Repair'),
  ('ac_repair_hero_secondary_button', 'Call (832) 437-1000'),
  ('ac_repair_hero_trust_1', 'Same-day service'),
  ('ac_repair_hero_trust_2', 'All brands serviced'),
  ('ac_repair_hero_trust_3', 'No hidden fees'),
  -- Brands
  ('ac_repair_brands_label', 'We service:'),
  -- Problems Section
  ('ac_repair_problems_title', 'Common AC Problems We Fix'),
  ('ac_repair_problems_subtitle', 'With years of Houston experience, we diagnose and repair these issues daily'),
  -- Problem Types (note: _desc not _description)
  ('ac_repair_problem_1_title', 'AC Not Cooling'),
  ('ac_repair_problem_1_desc', 'Refrigerant leaks, compressor issues, or airflow problems'),
  ('ac_repair_problem_2_title', 'Strange Noises'),
  ('ac_repair_problem_2_desc', 'Grinding, squealing, or banging sounds from your unit'),
  ('ac_repair_problem_3_title', 'Won''t Turn On'),
  ('ac_repair_problem_3_desc', 'Electrical, thermostat, or capacitor failures'),
  ('ac_repair_problem_4_title', 'Frozen Coils'),
  ('ac_repair_problem_4_desc', 'Ice buildup from restricted airflow or low refrigerant'),
  ('ac_repair_problem_5_title', 'Water Leaks'),
  ('ac_repair_problem_5_desc', 'Clogged drain lines or damaged condensate pans'),
  ('ac_repair_problem_6_title', 'High Energy Bills'),
  ('ac_repair_problem_6_desc', 'Inefficient operation or failing components'),
  -- FAQ (note: _q and _a not _question and _answer)
  ('ac_repair_faq_subtitle', 'Got questions? We''ve got answers.'),
  ('ac_repair_faq_1_q', 'How fast can you get here?'),
  ('ac_repair_faq_1_a', 'Usually same day in Houston. Look, when it''s 100 degrees and your AC just died, you don''t need someone telling you ''maybe Thursday.'' We get it.'),
  ('ac_repair_faq_2_q', 'Do you work on my brand?'),
  ('ac_repair_faq_2_a', 'Ruud, Lennox, Goodman, Trane, American Standard, Carrier—we service all major brands. If it cools air, we''ve worked on it.'),
  ('ac_repair_faq_3_q', 'What''s this gonna cost me?'),
  ('ac_repair_faq_3_a', 'Depends what''s broken. But you''ll know the exact price before we start. No "oh by the way" charges at the end.'),
  ('ac_repair_faq_4_q', 'Should I just replace this thing?'),
  ('ac_repair_faq_4_a', 'If your unit is 10-15+ years old and the repair costs more than half a new system, replacement usually makes more sense. We''ll tell you straight—no upselling.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- HEATING PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  -- Hero
  ('heating_page_hero_title', 'Heat Out? We''re On It.'),
  ('heating_page_hero_description', 'Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.'),
  ('heating_page_hero_primary_button', 'Schedule Heating Service'),
  ('heating_page_hero_secondary_button', 'Call (832) 437-1000'),
  -- Services Section
  ('heating_page_services_badge', 'Heating Services'),
  ('heating_page_services_title', 'Everything Heating'),
  ('heating_page_services_description', 'From "won''t turn on" to "smells weird" to "I need a whole new system." We handle it.'),
  -- Service 1
  ('heating_page_service_1_title', 'Heating Repair'),
  ('heating_page_service_1_description', 'We fix furnaces, heat pumps, all brands. Same-day emergency service available.'),
  ('heating_page_service_1_stat', '24/7'),
  ('heating_page_service_1_stat_label', 'emergency'),
  -- Service 2
  ('heating_page_service_2_title', 'New Installation'),
  ('heating_page_service_2_description', 'Need a new system? We help you pick the right size for your home. Financing available.'),
  ('heating_page_service_2_stat', 'Free'),
  ('heating_page_service_2_stat_label', 'estimates'),
  -- Inspection Section
  ('heating_page_inspection_title', '12-Point Furnace Inspection'),
  ('heating_page_inspection_description', 'Our inspection covers Safety, Performance, and Efficiency—the three pillars of a healthy heating system.'),
  -- Phase 1
  ('heating_page_phase_1_name', 'Safety'),
  ('heating_page_phase_1_item_1', 'We make sure all safety switches actually work'),
  ('heating_page_phase_1_item_2', 'We look for dangerous gas leaks'),
  ('heating_page_phase_1_item_3', 'Carbon monoxide detector test'),
  ('heating_page_phase_1_item_4', 'Gas lines and vents inspection'),
  -- Phase 2
  ('heating_page_phase_2_name', 'Performance'),
  ('heating_page_phase_2_item_1', 'We test all electrical connections'),
  ('heating_page_phase_2_item_2', 'We verify it heats properly'),
  ('heating_page_phase_2_item_3', 'We adjust the flame and fan'),
  ('heating_page_phase_2_item_4', 'We clean the burners'),
  -- Phase 3
  ('heating_page_phase_3_name', 'Efficiency'),
  ('heating_page_phase_3_item_1', 'Thermostat accuracy check'),
  ('heating_page_phase_3_item_2', 'Filter replacement if needed'),
  ('heating_page_phase_3_item_3', 'Efficiency rating assessment'),
  ('heating_page_phase_3_item_4', 'Personalized recommendations'),
  -- Safety Callout
  ('heating_page_safety_title', 'Carbon Monoxide: The Silent Killer'),
  ('heating_page_safety_description', 'A cracked heat exchanger can leak odorless, invisible CO into your home. 430+ Americans die from CO poisoning annually—most cases are preventable with regular inspections. Don''t skip your yearly tune-up.'),
  -- Warnings Section
  ('heating_page_warnings_badge', 'Know the Signs'),
  ('heating_page_warnings_title', 'Is Your Heater Asking for Help?'),
  ('heating_page_warnings_description', 'Your heating system gives you clues before it fails. Here are the 4 most important signs.'),
  ('heating_page_emergency_title', 'Smell Gas? Get Out Now.'),
  ('heating_page_emergency_subtitle', 'Leave immediately. Don''t flip switches. Call from outside.'),
  -- Warning Cards
  ('heating_page_warning_1_title', 'Yellow Pilot Light'),
  ('heating_page_warning_1_description', 'Should be blue. Yellow means incomplete combustion—schedule a checkup.'),
  ('heating_page_warning_2_title', 'Strange Sounds'),
  ('heating_page_warning_2_description', 'Banging, squealing, or rattling usually means parts are wearing out.'),
  ('heating_page_warning_3_title', 'Short Cycling'),
  ('heating_page_warning_3_description', 'Turns on and off constantly? Could be the thermostat or a dirty filter.'),
  ('heating_page_warning_4_title', 'Higher Bills'),
  ('heating_page_warning_4_description', 'Sudden spike in energy costs? Your system may be losing efficiency.'),
  -- FAQ
  ('heating_page_faq_subtitle', 'Everything you need to know about heating services.'),
  ('heating_page_faq_1_question', 'How often do I need to service my heater?'),
  ('heating_page_faq_1_answer', 'Once a year, before winter. Prevents breakdowns, carbon monoxide leaks, and inefficiency. Think of it like an oil change—skip it and pay later.'),
  ('heating_page_faq_2_question', 'Furnace or heat pump—what''s the difference?'),
  ('heating_page_faq_2_answer', 'Furnaces burn fuel to make heat. Heat pumps move heat from outside air. For Houston''s mild winters, heat pumps are usually cheaper to run. We''ll help you pick.'),
  ('heating_page_faq_3_question', 'How long will my heater last?'),
  ('heating_page_faq_3_answer', 'Furnaces: 15-20 years. Heat pumps: 10-15 years. With maintenance. Without it? Less. We can look at yours and tell you if it''s worth fixing or time to replace.'),
  ('heating_page_faq_4_question', 'Can I finance a new system?'),
  ('heating_page_faq_4_answer', 'Yep. We''ve got flexible financing so you don''t have to choose between heat and groceries. Ask us about payment plans when we give you a quote.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- TUNE-UPS PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  -- Hero
  ('tuneups_page_hero_title', 'Annual AC Tune-Up & Preventative Maintenance'),
  ('tuneups_page_hero_description', 'Keep your system running at peak efficiency. FREE CoolSaver tune-ups for qualifying homeowners, or schedule your annual inspection today.'),
  ('tuneups_page_hero_primary_button', 'Check If You Qualify — FREE'),
  ('tuneups_page_hero_secondary_button', 'Call (832) 437-1000'),
  ('tuneups_page_trust_1', 'NATE certified techs'),
  ('tuneups_page_trust_2', '100% satisfaction guaranteed'),
  ('tuneups_page_trust_3', 'Veteran owned'),
  -- Info Card
  ('tuneups_page_card_badge', 'Annual Maintenance'),
  ('tuneups_page_card_title', 'AC Inspection & Tune-Up'),
  ('tuneups_page_card_key_highlight', 'Any system 1 year or older'),
  ('tuneups_page_card_key_point', 'should have an annual inspection/tune-up to get the most from your investment.'),
  ('tuneups_page_card_feature_1', 'Increase system efficiency'),
  ('tuneups_page_card_feature_2', 'Prevent unexpected breakdowns'),
  ('tuneups_page_card_feature_3', 'Ensure adequate cooling'),
  ('tuneups_page_card_feature_4', 'Lower electrical costs'),
  ('tuneups_page_card_contact_label', 'Questions? Contact us:'),
  ('tuneups_page_card_email', 'customerservice@mrairservices.com'),
  -- Checklist Section
  ('tuneups_page_checklist_badge', 'Complete Inspection'),
  ('tuneups_page_checklist_title', 'What We Check'),
  ('tuneups_page_checklist_description', 'A thorough inspection that catches problems before they become expensive emergencies.'),
  ('tuneups_page_checklist_1', 'Inspect refrigerant level'),
  ('tuneups_page_checklist_2', 'Inspect and clean condenser coils'),
  ('tuneups_page_checklist_3', 'Inspect and clean contactor'),
  ('tuneups_page_checklist_4', 'Check and calibrate thermostat'),
  ('tuneups_page_checklist_5', 'Inspect airflow for proper specifications'),
  ('tuneups_page_checklist_6', 'Inspect the evaporator coil'),
  ('tuneups_page_checklist_7', 'Clean electrical and blower compartments'),
  ('tuneups_page_checklist_8', 'Tighten electrical connections'),
  ('tuneups_page_checklist_9', 'Inspect capacitors and relays'),
  ('tuneups_page_checklist_10', 'Inspect all drain lines'),
  ('tuneups_page_checklist_11', 'Check compressor for proper amp draw'),
  ('tuneups_page_checklist_12', 'Check all motors for proper amp draw'),
  ('tuneups_page_checklist_13', 'Oil the motors if required'),
  -- Benefits Section
  ('tuneups_page_benefits_title', 'Three Reasons to'),
  ('tuneups_page_benefits_highlight', 'Act Today'),
  ('tuneups_page_benefits_subtitle', 'Not tomorrow. Not next month. Today.'),
  ('tuneups_page_benefit_1_title', 'Lower Your Energy Bills'),
  ('tuneups_page_benefit_1_description', 'A clean, well-maintained system runs more efficiently. Better efficiency means lower monthly utility costs.'),
  ('tuneups_page_benefit_2_title', 'Prevent Costly Repairs'),
  ('tuneups_page_benefit_2_description', 'We catch small issues before they become expensive emergencies. Regular maintenance saves you money long-term.'),
  ('tuneups_page_benefit_3_title', 'Extend System Lifespan'),
  ('tuneups_page_benefit_3_description', 'A well-maintained system lasts years longer. That''s thousands you''re not spending on a new unit.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- =====================================================
-- FINANCING PAGE CONFIGURATION
-- =====================================================

INSERT INTO site_config (key, value) VALUES
  -- Hero
  ('financing_page_hero_title', 'Don''t Sweat the Bill'),
  ('financing_page_hero_description', 'New AC isn''t cheap. Neither is sleeping in a 90-degree house. We''ve got financing so you don''t have to choose between comfort and your budget.'),
  ('financing_page_hero_subtitle', '5-minute application. Decision before we leave. Options for all credit profiles.'),
  ('financing_page_hero_primary_button', 'Apply for Financing'),
  ('financing_page_hero_secondary_button', 'Call (832) 437-1000'),
  ('financing_page_trust_1', 'Quick Decision'),
  ('financing_page_trust_2', '5-Min Apply'),
  ('financing_page_trust_3', 'No Penalties'),
  -- Reality Section
  ('financing_page_reality_title', 'Don''t Let a Big Bill Catch You Off Guard'),
  ('financing_page_reality_description', 'We get it—nobody budgets for a dead AC. That''s why we make financing simple:'),
  ('financing_page_without_title', 'Without Financing'),
  ('financing_page_without_description', 'Big upfront cost. Credit card debt. Drained savings.'),
  ('financing_page_with_title', 'With Financing'),
  ('financing_page_with_description', 'Easy monthly payments. Keep your savings. Stay comfortable.'),
  ('financing_page_stat_value', '5 min'),
  ('financing_page_stat_label', 'to apply'),
  ('financing_page_reality_button', 'See Your Payment Options'),
  -- How It Works Section
  ('financing_page_hiw_badge', 'Simple Process'),
  ('financing_page_hiw_title', 'How It Works'),
  ('financing_page_hiw_description', 'From quote to approval in one visit. No waiting, no wondering.'),
  ('financing_page_hiw_button', 'Start Your Application'),
  ('financing_page_step_1_title', 'Get a Quote'),
  ('financing_page_step_1_description', 'We tell you exactly what it costs. No hidden fees, no surprises.'),
  ('financing_page_step_2_title', 'Apply in 5 Minutes'),
  ('financing_page_step_2_description', 'Your tech helps you right there. Quick form, basic info.'),
  ('financing_page_step_3_title', 'Instant Decision'),
  ('financing_page_step_3_description', 'You''ll know before we leave. If one lender says no, we try others.'),
  ('financing_page_step_4_title', 'Stay Comfortable'),
  ('financing_page_step_4_description', 'We do the work. You make easy monthly payments. Done.'),
  -- FAQ Section
  ('financing_page_faq_subtitle', 'Questions about financing? We''ve got real answers.'),
  ('financing_page_faq_1_question', 'What credit score do I need?'),
  ('financing_page_faq_1_answer', 'Honestly? We work with a bunch of different lenders. Even if your credit''s seen better days, we can usually find something.'),
  ('financing_page_faq_2_question', 'What''s the interest rate?'),
  ('financing_page_faq_2_answer', 'Rates depend on your credit profile and term length. Apply to see your personalized options—it only takes 5 minutes and you''ll know right away.'),
  ('financing_page_faq_3_question', 'How do I apply?'),
  ('financing_page_faq_3_answer', 'Takes 5 minutes. Your tech can help you on the spot, or call our office. You''ll know if you''re approved before we leave.'),
  ('financing_page_faq_4_question', 'What if I get denied?'),
  ('financing_page_faq_4_answer', 'We''ve got multiple financing partners. If one says no, we try others. Most people who apply get approved somewhere. Your AC broke—that''s stressful enough without worrying about credit.'),
  ('financing_page_faq_5_question', 'Can I pay it off early?'),
  ('financing_page_faq_5_answer', 'Yep. No prepayment penalties. Pay it off whenever you want without extra fees.'),
  ('financing_page_faq_6_question', 'What''s the minimum to finance?'),
  ('financing_page_faq_6_answer', 'Minimums vary by lender. Most major repairs and new system installations qualify. Ask us for details.'),
  ('financing_page_faq_7_question', 'Any discounts for veterans or seniors?'),
  ('financing_page_faq_7_answer', 'Absolutely. We''ve got discounts for seniors, military, and first responders. Just ask when you schedule. We don''t make you jump through hoops.'),
  -- Final CTA
  ('financing_page_cta_title', 'Already a customer with an invoice?'),
  ('financing_page_cta_subtitle', 'Pay your invoice quickly and securely online.'),
  ('financing_page_cta_primary', 'Pay Your Invoice'),
  ('financing_page_cta_secondary', 'Questions? (832) 437-1000')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
