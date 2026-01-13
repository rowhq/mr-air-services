import { sql } from '@vercel/postgres';
import { BlockRenderer } from '@/components/cms/BlockRenderer';
import type { EditorBlock, BlockSettings, BlockContent } from '@/types/cms';

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

export const dynamic = 'force-dynamic';

// Database response types
interface DBBlock {
  id: string;
  type: string;
  content: unknown;
  settings: unknown;
  position: number;
  is_visible: boolean;
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
    // Get page ID
    const pageResult = await sql`
      SELECT id FROM pages WHERE slug = 'air-conditioning-repair' AND is_published = true
    `;

    if (pageResult.rows.length === 0) return null;

    const pageId = pageResult.rows[0].id;

    // Fetch all data in parallel
    const [blocksResult, servicesResult, testimonialsResult, faqsResult, locationsResult] = await Promise.all([
      sql`SELECT id, type, content, settings, position, is_visible
          FROM blocks WHERE page_id = ${pageId} AND is_visible = true ORDER BY position`,
      sql`SELECT * FROM services WHERE is_published = true ORDER BY position`,
      sql`SELECT * FROM testimonials WHERE is_published = true ORDER BY position`,
      sql`SELECT * FROM faqs WHERE is_published = true ORDER BY position`,
      sql`SELECT * FROM office_locations ORDER BY position`,
    ]);

    const blocks: EditorBlock[] = (blocksResult.rows as DBBlock[]).map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));

    return {
      blocks,
      services: servicesResult.rows as Service[],
      testimonials: testimonialsResult.rows as Testimonial[],
      faqs: faqsResult.rows as FAQ[],
      officeLocations: locationsResult.rows as OfficeLocation[],
    };
  } catch (error) {
    console.error('Error fetching AC repair page data:', error);
    return null;
  }
}

export default async function ACRepairPage() {
  const data = await getPageData();

  if (!data || data.blocks.length === 0) {
    return (
      <section className="py-32 bg-white dark:bg-neutral-900">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            AC Repair Services
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Content is being loaded. Please check back shortly or contact us at (832) 437-1000.
          </p>
        </div>
      </section>
    );
  }

  return (
    <BlockRenderer
      blocks={data.blocks}
      services={data.services}
      testimonials={data.testimonials}
      faqs={data.faqs}
      officeLocations={data.officeLocations}
    />
  );
}
