import { PayInvoiceContent, PayInvoiceConfig, defaultPayInvoiceConfig } from '@/components/pages/PayInvoiceContent';

interface PreviewPageProps {
  searchParams: Promise<{ preview?: string }>;
}

// Simple merge for flat config objects
function mergeConfig(defaults: PayInvoiceConfig, overrides: Partial<PayInvoiceConfig> | null | undefined): PayInvoiceConfig {
  if (!overrides) return defaults;

  return {
    ...defaults,
    ...overrides,
    // Preserve array defaults if not overridden
    trustSignals: overrides.trustSignals ?? defaults.trustSignals,
  };
}

async function getPreviewConfig(previewId: string): Promise<Partial<PayInvoiceConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/preview?id=${previewId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.config as Partial<PayInvoiceConfig>;
  } catch {
    return null;
  }
}

export default async function PayInvoicePreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const previewId = params.preview;

  let config: PayInvoiceConfig = defaultPayInvoiceConfig;

  if (previewId) {
    const previewConfig = await getPreviewConfig(previewId);
    if (previewConfig) {
      config = mergeConfig(defaultPayInvoiceConfig, previewConfig);
    }
  }

  return <PayInvoiceContent config={config} isPreview={true} />;
}
