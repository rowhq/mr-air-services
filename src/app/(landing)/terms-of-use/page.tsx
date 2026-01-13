import { sql } from '@vercel/postgres';
import { BlockRenderer } from '@/components/cms/BlockRenderer';
import type { EditorBlock, BlockSettings, BlockContent } from '@/types/cms';

export const metadata = {
  title: 'Terms of Use | Mr. Air Services',
  description: 'Terms and conditions for using Mr. Air Services website and HVAC services.',
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

async function getPageBlocks(): Promise<EditorBlock[]> {
  try {
    // Get page ID
    const pageResult = await sql`
      SELECT id FROM pages WHERE slug = 'terms-of-use' AND is_published = true
    `;

    if (pageResult.rows.length === 0) return [];

    const pageId = pageResult.rows[0].id;

    // Get blocks for this page
    const blocksResult = await sql`
      SELECT id, type, content, settings, position, is_visible
      FROM blocks
      WHERE page_id = ${pageId} AND is_visible = true
      ORDER BY position
    `;

    return (blocksResult.rows as DBBlock[]).map((b) => ({
      id: b.id,
      type: b.type as EditorBlock['type'],
      content: b.content as BlockContent,
      settings: (b.settings || {}) as BlockSettings,
      position: b.position,
      isVisible: b.is_visible,
    }));
  } catch (error) {
    console.error('Error fetching terms of use blocks:', error);
    return [];
  }
}

export default async function TermsOfUsePage() {
  const blocks = await getPageBlocks();

  if (blocks.length === 0) {
    // Minimal fallback - content should come from CMS
    return (
      <section className="py-32 bg-white dark:bg-neutral-900">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Terms of Use
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Content is being loaded. Please check back shortly or contact us at (832) 437-1000.
          </p>
        </div>
      </section>
    );
  }

  return <BlockRenderer blocks={blocks} />;
}
