import Link from 'next/link';
import { Breadcrumbs, TrustSignals } from '@/components/ui';
import { InvoicePaymentForm } from '@/components/forms/InvoicePaymentForm';

export const metadata = {
  title: 'Pay Your Invoice | Mr. Air Services - Secure Online Payment',
  description: 'Pay your Mr. Air Services invoice quickly and securely online. Accept all major credit cards, debit cards, and bank transfers.',
};

export default function PayInvoicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-br from-hero-start via-primary-light to-hero-end">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Pay Invoice' }]} />
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Pay Your Invoice
            </h1>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Quick, secure payment. Takes less than a minute.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
              <InvoicePaymentForm />
            </div>

            <div className="mt-8 text-center">
              <TrustSignals
                className="justify-center"
                items={['Secure payment', 'All cards accepted', 'Instant confirmation']}
              />
            </div>

            <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <h3 className="font-semibold text-neutral-black dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Questions about your invoice or payment options?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <a
                  href="tel:+18324371000"
                  className="text-primary hover:underline font-medium"
                >
                  Call (832) 437-1000
                </a>
                <span className="text-neutral-400 hidden sm:inline">|</span>
                <Link
                  href="/financing-payments"
                  className="text-primary hover:underline"
                >
                  View financing options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
