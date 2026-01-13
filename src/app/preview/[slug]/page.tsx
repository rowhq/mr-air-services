import { BlockRenderer } from "@/components/cms/BlockRenderer";
import type { EditorBlock, BlockSettings, BlockContent } from "@/types/cms";

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

async function getPageData(slug: string): Promise<PageData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Fetch all data in parallel
    const [pageRes, servicesRes, testimonialsRes, locationsRes, faqsRes] =
      await Promise.all([
        fetch(`${baseUrl}/api/cms/pages/${slug}`, {
          cache: "no-store", // Always fetch fresh for preview
        }),
        fetch(`${baseUrl}/api/cms/services`, {
          cache: "no-store",
        }),
        fetch(`${baseUrl}/api/cms/testimonials`, {
          cache: "no-store",
        }),
        fetch(`${baseUrl}/api/cms/office-locations`, {
          cache: "no-store",
        }),
        fetch(`${baseUrl}/api/cms/faqs`, {
          cache: "no-store",
        }),
      ]);

    if (!pageRes.ok) {
      return null;
    }

    const pageData: DBPageWithBlocks = await pageRes.json();
    const services: Service[] = servicesRes.ok ? await servicesRes.json() : [];
    const testimonials: Testimonial[] = testimonialsRes.ok
      ? await testimonialsRes.json()
      : [];
    const officeLocations: OfficeLocation[] = locationsRes.ok
      ? await locationsRes.json()
      : [];
    const faqs: FAQ[] = faqsRes.ok ? await faqsRes.json() : [];

    // Transform database format to editor format
    const blocks: EditorBlock[] = pageData.blocks.map((b) => ({
      id: b.id,
      type: b.type as EditorBlock["type"],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));

    return { blocks, services, testimonials, officeLocations, faqs };
  } catch (error) {
    console.error("Preview fetch error:", error);
    return null;
  }
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPageData(slug);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600">
            No page found with slug: <code className="bg-gray-200 px-2 py-1 rounded">{slug}</code>
          </p>
        </div>
      </div>
    );
  }

  if (data.blocks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No Blocks Yet
          </h1>
          <p className="text-gray-600">
            This page has no content blocks. Add blocks in the editor.
          </p>
        </div>
      </div>
    );
  }

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
