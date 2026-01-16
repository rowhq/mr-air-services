import type { EditorBlock, BlockSettings, BlockContent } from '@/types/cms';

// Database response types
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

export interface Service {
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

export interface Testimonial {
  id: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  source: string;
  is_featured: boolean;
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
  hours: Record<string, string>;
  is_primary: boolean;
}

export interface PageData {
  blocks: EditorBlock[];
  services: Service[];
  testimonials: Testimonial[];
  officeLocations: OfficeLocation[];
}

export async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const [pageRes, servicesRes, testimonialsRes, locationsRes] = await Promise.all([
      fetch(`${baseUrl}/api/cms/pages/${slug}`, {
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
    ]);

    if (!pageRes.ok) {
      return null;
    }

    const pageData: DBPageWithBlocks = await pageRes.json();
    const services: Service[] = servicesRes.ok ? await servicesRes.json() : [];
    const testimonials: Testimonial[] = testimonialsRes.ok ? await testimonialsRes.json() : [];
    const officeLocations: OfficeLocation[] = locationsRes.ok ? await locationsRes.json() : [];

    const blocks: EditorBlock[] = pageData.blocks.map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));

    return { blocks, services, testimonials, officeLocations };
  } catch (error) {
    console.log(`CMS not available for ${slug} page, using hardcoded content`);
    return null;
  }
}
