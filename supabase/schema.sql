-- =====================================================
-- Mr. Air Services CMS Database Schema
-- =====================================================
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Pages: Main pages of the website
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  og_image TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Blocks: Content blocks for each page
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{"padding": "md", "background": "white"}',
  position INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services: HVAC services offered
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  features JSONB DEFAULT '[]',
  cta_text TEXT DEFAULT 'Learn More',
  cta_link TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  position INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials: Customer reviews
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  initials TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  source TEXT DEFAULT 'Google',
  is_featured BOOLEAN DEFAULT FALSE,
  position INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs: Frequently asked questions
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug TEXT,
  category TEXT DEFAULT 'general',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Office Locations
CREATE TABLE IF NOT EXISTS office_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'TX',
  zip TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  hours JSONB DEFAULT '{"weekday": "8:00 AM - 6:00 PM", "saturday": "9:00 AM - 2:00 PM", "sunday": "Closed"}',
  is_primary BOOLEAN DEFAULT FALSE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation Items: Header and footer links
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location TEXT NOT NULL CHECK (location IN ('header', 'footer', 'header-cta')),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT FALSE,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media: Uploaded images and files
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  folder TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Config: Global settings
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Versions: Version history for content
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  content JSONB NOT NULL,
  version_number INTEGER NOT NULL,
  created_by TEXT DEFAULT 'system',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads: Contact form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_time TEXT,
  services TEXT[] DEFAULT '{}',
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_blocks_page_id ON blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_blocks_position ON blocks(page_id, position);
CREATE INDEX IF NOT EXISTS idx_services_position ON services(position);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_faqs_page ON faqs(page_slug);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_navigation_location ON navigation_items(location);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_content_versions_entity ON content_versions(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can read blocks of published pages" ON blocks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pages WHERE pages.id = blocks.page_id AND pages.is_published = TRUE
    )
  );

CREATE POLICY "Public can read published services" ON services
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can read published testimonials" ON testimonials
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can read published faqs" ON faqs
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public can read office locations" ON office_locations
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can read visible navigation" ON navigation_items
  FOR SELECT USING (is_visible = TRUE);

CREATE POLICY "Public can read site config" ON site_config
  FOR SELECT USING (TRUE);

-- Authenticated users (admin) have full access
CREATE POLICY "Admins have full access to pages" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to blocks" ON blocks
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to faqs" ON faqs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to office_locations" ON office_locations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to navigation_items" ON navigation_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to media" ON media
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to site_config" ON site_config
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to content_versions" ON content_versions
  FOR ALL USING (auth.role() = 'authenticated');

-- Leads policies: Public can submit, only admins can read/manage
CREATE POLICY "Public can submit leads" ON leads
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins have full access to leads" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blocks_updated_at
  BEFORE UPDATE ON blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKET
-- =====================================================

-- Create storage bucket for media (run separately in Supabase Dashboard > Storage)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Default site config
INSERT INTO site_config (key, value) VALUES
  ('company', '{"name": "Mr. Air Services", "tagline": "Professional HVAC service for the Greater Houston area. Quality work, fair prices, guaranteed satisfaction.", "phone": "(832) 437-1000", "email": "info@mrairservices.com"}'),
  ('social', '{"facebook": "", "instagram": "", "twitter": "", "youtube": ""}'),
  ('hours', '{"weekday": "Mon-Fri: 8AM-5PM", "saturday": "Closed", "sunday": "Closed", "emergency": "24/7 Emergency Service"}'),
  ('seo', '{"defaultTitle": "Mr. Air Services | Houston HVAC Experts", "defaultDescription": "Professional HVAC services in Houston. AC repair, installation, maintenance and indoor air quality solutions."}')
ON CONFLICT (key) DO NOTHING;

-- Default pages
INSERT INTO pages (slug, title, description, is_published) VALUES
  ('home', 'Home', 'Homepage of Mr. Air Services', TRUE),
  ('services', 'Services', 'Our HVAC Services', TRUE),
  ('contact', 'Contact', 'Contact Us', TRUE),
  ('about', 'About', 'About Mr. Air Services', FALSE),
  ('air-conditioning-repair', 'AC Repair', 'Professional AC repair services in Houston', TRUE),
  ('heating', 'Heating', 'Heating repair and installation services', TRUE),
  ('air-conditioning-tune-ups', 'CoolSaver Tune-Ups', 'Preventive AC maintenance and tune-ups', TRUE),
  ('financing-payments', 'Financing & Payments', 'Flexible financing options for HVAC services', TRUE),
  ('privacy-policy', 'Privacy Policy', 'Privacy policy for Mr. Air Services', TRUE),
  ('terms-of-use', 'Terms of Use', 'Terms of use for Mr. Air Services website', TRUE),
  ('pay-invoice', 'Pay Invoice', 'Online invoice payment portal', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- ADMIN USER SETUP
-- =====================================================
-- Create admin user in Supabase Dashboard > Authentication > Users
-- Or use: supabase auth admin create-user --email admin@mrairservices.com --password YOUR_PASSWORD
