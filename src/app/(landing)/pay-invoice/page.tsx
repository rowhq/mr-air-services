import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';
import { InvoicePaymentForm } from '@/components/forms/InvoicePaymentForm';
import { BlockRenderer } from '@/components/cms/BlockRenderer';
import { getPageData } from '@/lib/cms-page-data';

export const metadata = {
  title: 'Pay Your Invoice | Mr. Air Services - Secure Online Payment',
  description: 'Pay your Mr. Air Services invoice quickly and securely online. Accept all major credit cards, debit cards, and bank transfers.',
};

// Current design preserved as fallback
function HardcodedPayInvoicePage() {
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
              Pay Your Invoice
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-10 max-w-md leading-relaxed">
              Quick, secure payment. Takes less than a minute.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 mb-12">
              {['Secure payment', 'All cards accepted', 'Instant confirmation'].map((item) => (
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
                Need Help?
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                Questions about your invoice or payment options?
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
                  View financing options
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

export default async function PayInvoicePage() {
  const data = await getPageData('pay-invoice');

  // If CMS data is available and has blocks, use dynamic rendering
  if (data && data.blocks.length > 0) {
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

  // Fall back to current hardcoded design
  return <HardcodedPayInvoicePage />;
}
