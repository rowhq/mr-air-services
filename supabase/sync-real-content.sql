-- =====================================================
-- Mr. Air Services - SYNC REAL CONTENT
-- =====================================================
-- This script updates CMS data to match the actual
-- hardcoded content in the React components
-- =====================================================

-- =====================================================
-- UPDATE HOMEPAGE BLOCKS
-- =====================================================

-- Update Hero Block (position 0)
UPDATE blocks
SET content = '{
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
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'hero'
  AND position = 0;

-- Update Why Choose Us Block (position 1)
UPDATE blocks
SET content = '{
  "sectionTitle": "Why People Call Us Back",
  "features": [
    {
      "id": "1",
      "icon": "certified",
      "title": "Experienced Pros",
      "description": "Our guys show up on time, explain what'"'"'s wrong in plain English, and fix it right. All major brands.",
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
      "description": "Not happy? We come back. No arguments, no runaround. That'"'"'s how we'"'"'ve kept customers for 15 years.",
      "stat": "4.9/5",
      "statLabel": "avg rating"
    }
  ],
  "showImage": true,
  "imageUrl": "/images/financing/technician-helping.jpg",
  "showVeteranBadge": true
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'why-choose-us'
  AND position = 1;

-- Update Services Overview Block (position 2)
UPDATE blocks
SET content = '{
  "sectionTitle": "When It Breaks, We Fix It.",
  "sectionSubtitle": "Before It Breaks, We Catch It.",
  "serviceIds": "featured",
  "layout": "3-col",
  "showCta": true
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'services-overview'
  AND position = 2;

-- Update Testimonials Block (position 3)
UPDATE blocks
SET content = '{
  "sectionTitle": "What Our Customers Say",
  "testimonialIds": "featured",
  "layout": "grid",
  "maxItems": 3,
  "showSource": true
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'testimonials'
  AND position = 3;

-- Update Areas Served Block (position 4)
UPDATE blocks
SET content = '{
  "title": "Serving the Greater Houston Area",
  "subtitle": "From The Woodlands to Sugar Land, we'"'"'ve got you covered",
  "showMap": true,
  "showList": true
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'areas-served'
  AND position = 4;

-- Update Final CTA Block (position 5)
UPDATE blocks
SET content = '{
  "title": "Let'"'"'s Get Your AC Sorted",
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
}'
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'final-cta'
  AND position = 5;

-- =====================================================
-- UPDATE NAVIGATION - HEADER
-- =====================================================

-- Delete existing header navigation
DELETE FROM navigation_items WHERE location = 'header';

-- Insert correct header navigation (matching Header.tsx)
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible, parent_id) VALUES
  ('header', 'Home', '/', 0, FALSE, TRUE, NULL),
  ('header', 'Services', '/services', 1, FALSE, TRUE, NULL),
  ('header', 'Financing', '/financing-payments', 2, FALSE, TRUE, NULL),
  ('header', 'Pay Invoice', '/pay-invoice', 3, FALSE, TRUE, NULL),
  ('header', 'Contact', '/contact', 4, FALSE, TRUE, NULL);

-- =====================================================
-- UPDATE NAVIGATION - FOOTER
-- =====================================================

-- Delete existing footer navigation
DELETE FROM navigation_items WHERE location = 'footer';

-- Insert correct footer navigation (matching Footer.tsx)
-- Services section
INSERT INTO navigation_items (location, label, href, position, is_external, is_visible) VALUES
  ('footer', 'AC Repair', '/services/air-conditioning-repair', 0, FALSE, TRUE),
  ('footer', 'Tune-Ups', '/services/air-conditioning-tune-ups', 1, FALSE, TRUE),
  ('footer', 'Heating', '/services/heating', 2, FALSE, TRUE),
  ('footer', 'Contact', '/contact', 3, FALSE, TRUE),
  ('footer', 'Financing', '/financing-payments', 4, FALSE, TRUE),
  ('footer', 'Pay Invoice', '/pay-invoice', 5, FALSE, TRUE),
  ('footer', 'Privacy Policy', '/privacy-policy', 6, FALSE, TRUE),
  ('footer', 'Terms of Use', '/terms-of-use', 7, FALSE, TRUE);

-- =====================================================
-- VERIFY UPDATES
-- =====================================================

-- Show updated hero block
SELECT type, position, content->>'title' as title, content->>'titleHighlight' as highlight
FROM blocks
WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
  AND type = 'hero';

-- Show updated navigation
SELECT location, label, href, position FROM navigation_items ORDER BY location, position;
