import { ACRepairContent, ACRepairPageConfig, defaultACRepairConfig } from '@/components/pages/ACRepairContent';

interface PreviewPageProps {
  searchParams: Promise<{ preview?: string }>;
}

// Deep merge helper for nested objects
function deepMerge<T extends Record<string, unknown>>(defaults: T, overrides: Partial<T> | null | undefined): T {
  if (!overrides) return defaults;

  const result = { ...defaults };

  for (const key in overrides) {
    const overrideValue = overrides[key];
    const defaultValue = defaults[key];

    if (overrideValue === undefined) continue;

    if (Array.isArray(defaultValue) && Array.isArray(overrideValue)) {
      result[key] = overrideValue.map((item, index) => {
        if (typeof item === 'object' && item !== null && defaultValue[index]) {
          return deepMerge(defaultValue[index] as Record<string, unknown>, item as Record<string, unknown>);
        }
        return item ?? defaultValue[index];
      }) as T[Extract<keyof T, string>];
    } else if (typeof defaultValue === 'object' && defaultValue !== null && typeof overrideValue === 'object' && overrideValue !== null) {
      result[key] = deepMerge(defaultValue as Record<string, unknown>, overrideValue as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else {
      result[key] = overrideValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

async function getPreviewConfig(previewId: string): Promise<Partial<ACRepairPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/preview?id=${previewId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.config as Partial<ACRepairPageConfig>;
  } catch {
    return null;
  }
}

export default async function ACRepairPreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const previewId = params.preview;

  let config: ACRepairPageConfig = defaultACRepairConfig;

  if (previewId) {
    const previewConfig = await getPreviewConfig(previewId);
    if (previewConfig) {
      config = deepMerge(defaultACRepairConfig, previewConfig);
    }
  }

  return <ACRepairContent config={config} isPreview={true} />;
}
