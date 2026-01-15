import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pageSchemas, getAllKeysFromSchema } from '@/lib/cms/page-schemas';
import { ConfigEditorForm } from '@/components/cms/ConfigEditorForm';
import { sql } from '@vercel/postgres';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getConfigValues(keys: string[]): Promise<Record<string, string>> {
  if (keys.length === 0) return {};

  try {
    const result = await sql`
      SELECT key, value FROM site_config WHERE key = ANY(${keys}::text[])
    `;

    const configMap: Record<string, string> = {};
    for (const row of result.rows) {
      // Value is stored as JSON, extract the actual string value
      configMap[row.key] = typeof row.value === 'string' ? row.value : row.value;
    }

    return configMap;
  } catch (error) {
    console.error('Error fetching configs:', error);
    return {};
  }
}

export default async function PageContentEditorPage({ params }: PageProps) {
  const { slug } = await params;
  const schema = pageSchemas[slug];

  if (!schema) {
    notFound();
  }

  const keys = getAllKeysFromSchema(slug);
  const initialValues = await getConfigValues(keys);

  return (
    <div>
      {/* Back Link */}
      <Link
        href="/admin/page-content"
        className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a Contenido de Páginas
      </Link>

      <ConfigEditorForm
        schema={schema}
        initialValues={initialValues}
        slug={slug}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(pageSchemas).map((slug) => ({ slug }));
}
