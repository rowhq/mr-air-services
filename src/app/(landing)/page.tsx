import {
  Hero,
  WhyChooseUs,
  ServicesOverview,
  Testimonials,
  AreasServed,
  FinalCTA,
} from '@/components/sections';
import { BlockRenderer } from '@/components/cms/BlockRenderer';
import type { EditorBlock, BlockSettings, BlockContent } from '@/types/cms';

export const metadata = {
  title: 'Mr. Air Services | Houston HVAC Experts - Free AC Tune-Ups for Qualifying Homeowners',
  description: 'Houston\'s trusted HVAC experts. FREE CoolSaver AC Tune-Ups for qualifying homeowners. Professional air conditioning repair, heating services, and maintenance plans. Veteran-owned. Same-day service. Call (832) 437-1000.',
};

// Database response types (snake_case from PostgreSQL)
interface DBBlock {
  id: string;
  type: string;
  content: unknown;
  settings: unknown;
  position: number;
  is_visible: boolean;
}

interface DBPageWithBlocks {
  id: string;
  slug: string;
  title: string;
  blocks: DBBlock[];
}

interface Service {
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
}

interface Testimonial {
  id: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  source: string;
  is_featured: boolean;
}

interface OfficeLocation {
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
  hours: Record<string, string>;
  is_primary: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  page_slug: string | null;
  position: number;
  is_published: boolean;
}

interface PageData {
  blocks: EditorBlock[];
  services: Service[];
  testimonials: Testimonial[];
  officeLocations: OfficeLocation[];
  faqs: FAQ[];
}

async function getPageData(): Promise<PageData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Fetch all data in parallel
    const [pageRes, servicesRes, testimonialsRes, locationsRes, faqsRes] = await Promise.all([
      fetch(`${baseUrl}/api/cms/pages/home`, {
        next: { revalidate: 60 },
        cache: 'force-cache',
      }),
      fetch(`${baseUrl}/api/cms/services`, {
        next: { revalidate: 60 },
        cache: 'force-cache',
      }),
      fetch(`${baseUrl}/api/cms/testimonials`, {
        next: { revalidate: 60 },
        cache: 'force-cache',
      }),
      fetch(`${baseUrl}/api/cms/office-locations`, {
        next: { revalidate: 60 },
        cache: 'force-cache',
      }),
      fetch(`${baseUrl}/api/cms/faqs`, {
        next: { revalidate: 60 },
        cache: 'force-cache',
      }),
    ]);

    if (!pageRes.ok) {
      return null;
    }

    const pageData: DBPageWithBlocks = await pageRes.json();
    const services: Service[] = servicesRes.ok ? await servicesRes.json() : [];
    const testimonials: Testimonial[] = testimonialsRes.ok ? await testimonialsRes.json() : [];
    const officeLocations: OfficeLocation[] = locationsRes.ok ? await locationsRes.json() : [];
    const faqs: FAQ[] = faqsRes.ok ? await faqsRes.json() : [];

    // Transform database format to editor format
    const blocks: EditorBlock[] = pageData.blocks.map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));

    return { blocks, services, testimonials, officeLocations, faqs };
  } catch (error) {
    console.log('CMS not available, using hardcoded content');
    return null;
  }
}

// Hardcoded fallback component
function HardcodedHomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <Testimonials />
      <AreasServed />
      <FinalCTA />
    </>
  );
}

export default async function HomePage() {
  const data = await getPageData();

  // If CMS data is available and has blocks, use dynamic rendering
  if (data && data.blocks.length > 0) {
    return (
      <BlockRenderer
        blocks={data.blocks}
        services={data.services}
        testimonials={data.testimonials}
        officeLocations={data.officeLocations}
        faqs={data.faqs}
      />
    );
  }

  // Fall back to hardcoded components
  return <HardcodedHomePage />;
}
