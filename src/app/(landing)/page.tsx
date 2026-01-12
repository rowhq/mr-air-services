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

// Database response types (snake_case from Supabase)
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

async function getPageData(): Promise<EditorBlock[] | null> {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/pages/home`, {
      next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
      cache: 'force-cache',
    });

    if (!response.ok) {
      return null;
    }

    const data: DBPageWithBlocks = await response.json();

    // Transform database format to editor format
    const blocks: EditorBlock[] = data.blocks.map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));

    return blocks;
  } catch (error) {
    // CMS not configured or API error - fall back to hardcoded
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
  const blocks = await getPageData();

  // If CMS data is available and has blocks, use dynamic rendering
  if (blocks && blocks.length > 0) {
    return <BlockRenderer blocks={blocks} />;
  }

  // Fall back to hardcoded components
  return <HardcodedHomePage />;
}
