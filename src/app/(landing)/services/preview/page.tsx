import { ServicesContent, ServicesPageConfig, defaultServicesConfig } from '@/components/pages/ServicesContent';

interface PreviewPageProps {
  searchParams: Promise<{ preview?: string }>;
}

// Deep merge helper for nested objects
function deepMerge<T>(defaults: T, overrides: Partial<T> | null | undefined): T {
  if (!overrides) return defaults;

  const result = { ...defaults } as Record<string, unknown>;
  const overridesRecord = overrides as Record<string, unknown>;
  const defaultsRecord = defaults as Record<string, unknown>;

  for (const key in overridesRecord) {
    const overrideValue = overridesRecord[key];
    const defaultValue = defaultsRecord[key];

    if (overrideValue === undefined) continue;

    if (Array.isArray(defaultValue) && Array.isArray(overrideValue)) {
      result[key] = overrideValue.map((item, index) => {
        if (typeof item === 'object' && item !== null && defaultValue[index]) {
          return deepMerge(defaultValue[index], item);
        }
        return item ?? defaultValue[index];
      });
    } else if (typeof defaultValue === 'object' && defaultValue !== null && typeof overrideValue === 'object' && overrideValue !== null) {
      result[key] = deepMerge(defaultValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

async function getPreviewConfig(previewId: string): Promise<Partial<ServicesPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/preview?id=${previewId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.config as Partial<ServicesPageConfig>;
  } catch {
    return null;
  }
}

export default async function ServicesPreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const previewId = params.preview;

  let config: ServicesPageConfig = defaultServicesConfig;

  if (previewId) {
    const previewConfig = await getPreviewConfig(previewId);
    if (previewConfig) {
      config = deepMerge(defaultServicesConfig, previewConfig);
    }
  }

  return <ServicesContent config={config} isPreview={true} />;
}
