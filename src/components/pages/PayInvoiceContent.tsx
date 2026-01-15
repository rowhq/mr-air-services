import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui';
import { InvoicePaymentForm } from '@/components/forms/InvoicePaymentForm';

// Config interface for CMS-editable fields
export interface PayInvoiceConfig {
  title: string;
  description: string;
  trustSignals: string[];
  helpTitle: string;
  helpDescription: string;
  financingLinkText: string;
}

// Default values (current hardcoded text)
export const defaultPayInvoiceConfig: PayInvoiceConfig = {
  title: 'Pay Your Invoice',
  description: 'Quick, secure payment. Takes less than a minute.',
  trustSignals: ['Secure payment', 'All cards accepted', 'Instant confirmation'],
  helpTitle: 'Need Help?',
  helpDescription: 'Questions about your invoice or payment options?',
  financingLinkText: 'View financing options',
};

interface PayInvoiceContentProps {
  config: PayInvoiceConfig;
  isPreview?: boolean;
}

export function PayInvoiceContent({ config, isPreview = false }: PayInvoiceContentProps) {
  return (
    <>
      {/* Preview indicator */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 text-center py-1 text-sm font-medium z-50">
          Preview Mode - Los cambios no se han guardado
        </div>
      )}

      <section className={`relative min-h-screen pt-32 pb-16 bg-neutral-100 dark:bg-neutral-900 overflow-hidden ${isPreview ? 'mt-8' : ''}`}>
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
              {!isPreview && <InvoicePaymentForm />}
              {isPreview && (
                <div className="h-64 flex items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl">
                  Formulario de pago (deshabilitado en preview)
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
