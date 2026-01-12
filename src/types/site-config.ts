// Site configuration types

export interface CompanyConfig {
  name: string;
  tagline: string;
  phone: string;
  email: string;
}

export interface HoursConfig {
  weekday: string;
  saturday: string;
  sunday: string;
  emergency: string;
}

export interface SocialConfig {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

export interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
}

export interface SiteConfig {
  company: CompanyConfig;
  hours: HoursConfig;
  social: SocialConfig;
  seo: SEOConfig;
}

export interface NavigationItem {
  id: string;
  location: 'header' | 'footer';
  label: string;
  href: string;
  parent_id: string | null;
  position: number;
  is_external: boolean;
  is_visible: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  features: string[];
  cta_text: string;
  cta_link: string;
  is_featured: boolean;
  position: number;
  is_published: boolean;
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  is_primary: boolean;
  position: number;
}

// Props for components that need site data
export interface SiteDataProps {
  config: SiteConfig;
  navigation: NavigationItem[];
  services: ServiceItem[];
  primaryLocation?: OfficeLocation;
}
