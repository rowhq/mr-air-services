import { PayInvoiceContent, PayInvoiceConfig, defaultPayInvoiceConfig } from '@/components/pages/PayInvoiceContent';

export const metadata = {
  title: 'Pay Your Invoice | Mr. Air Services - Secure Online Payment',
  description: 'Pay your Mr. Air Services invoice quickly and securely online. Accept all major credit cards, debit cards, and bank transfers.',
};

// Fetch config from CMS
async function getPayInvoiceConfig(): Promise<Partial<PayInvoiceConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      'pay_invoice_title',
      'pay_invoice_description',
      'pay_invoice_trust_1',
      'pay_invoice_trust_2',
      'pay_invoice_trust_3',
      'pay_invoice_help_title',
      'pay_invoice_help_description',
      'pay_invoice_financing_link',
    ];

    const responses = await Promise.all(
      configKeys.map(key =>
        fetch(`${baseUrl}/api/cms/config?key=${key}`, {
          next: { revalidate: 60 },
          cache: 'force-cache',
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );

    const configMap: Record<string, string | null> = {};
    configKeys.forEach((key, index) => {
      configMap[key] = responses[index]?.value || null;
    });

    const hasValues = Object.values(configMap).some(v => v !== null);
    if (!hasValues) {
      return null;
    }

    // Build trust signals array only if any are set
    const trustSignals: string[] = [];
    if (configMap['pay_invoice_trust_1']) trustSignals.push(configMap['pay_invoice_trust_1']);
    if (configMap['pay_invoice_trust_2']) trustSignals.push(configMap['pay_invoice_trust_2']);
    if (configMap['pay_invoice_trust_3']) trustSignals.push(configMap['pay_invoice_trust_3']);

    return {
      title: configMap['pay_invoice_title'] || undefined,
      description: configMap['pay_invoice_description'] || undefined,
      trustSignals: trustSignals.length > 0 ? trustSignals : undefined,
      helpTitle: configMap['pay_invoice_help_title'] || undefined,
      helpDescription: configMap['pay_invoice_help_description'] || undefined,
      financingLinkText: configMap['pay_invoice_financing_link'] || undefined,
    };
  } catch {
    return null;
  }
}

export default async function PayInvoicePage() {
  const cmsConfig = await getPayInvoiceConfig();

  // Merge CMS config with defaults
  const config: PayInvoiceConfig = {
    ...defaultPayInvoiceConfig,
    ...cmsConfig,
    trustSignals: cmsConfig?.trustSignals || defaultPayInvoiceConfig.trustSignals,
  };

  return <PayInvoiceContent config={config} />;
}
