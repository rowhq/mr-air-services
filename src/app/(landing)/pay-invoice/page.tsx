import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';
import { InvoicePaymentForm } from '@/components/forms/InvoicePaymentForm';

export const metadata = {
  title: 'Pay Your Invoice | Mr. Air Services - Secure Online Payment',
  description: 'Pay your Mr. Air Services invoice quickly and securely online. Accept all major credit cards, debit cards, and bank transfers.',
};

// Config interface for CMS-editable fields
interface PayInvoiceConfig {
  title: string;
  description: string;
  trustSignals: string[];
  helpTitle: string;
  helpDescription: string;
  financingLinkText: string;
}

// Default values (current hardcoded text)
const defaultConfig: PayInvoiceConfig = {
  title: 'Pay Your Invoice',
  description: 'Quick, secure payment. Takes less than a minute.',
  trustSignals: ['Secure payment', 'All cards accepted', 'Instant confirmation'],
  helpTitle: 'Need Help?',
  helpDescription: 'Questions about your invoice or payment options?',
  financingLinkText: 'View financing options',
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
    ...defaultConfig,
    ...cmsConfig,
    trustSignals: cmsConfig?.trustSignals || defaultConfig.trustSignals,
  };

  return (
    <section className="relative min-h-screen pt-32 pb-16 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      {/* Subtle pattern/texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

      <div className="container relative">
        <Breadcrumbs items={[{ label: 'Pay Invoice' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center mt-8">
          {/* Left - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              {config.title}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-10 max-w-md leading-relaxed">
              {config.description}
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 mb-12">
              {config.trustSignals.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/15 dark:bg-primary/25 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-200 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Need Help Box */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-2">
                {config.helpTitle}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                {config.helpDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+18324371000"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (832) 437-1000
                </a>
                <Link
                  href="/financing-payments"
                  className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors underline underline-offset-4"
                >
                  {config.financingLinkText}
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Form Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 md:p-8">
            <InvoicePaymentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
