import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';
import { InvoicePaymentForm } from '@/components/forms/InvoicePaymentForm';

export const metadata = {
  title: 'Financing & Payments | Mr. Air Services - Flexible HVAC Financing Houston',
  description: 'Affordable HVAC financing options in Houston. Low monthly payments, quick approval, and flexible terms. Get the AC or heating system you need today.',
};

const financingOptions = [
  {
    title: 'Low Interest Options',
    description: 'Competitive rates to fit your budget',
    details: ['Quick online application', 'Fast approval', 'Multiple term lengths'],
  },
  {
    title: 'Flexible Monthly Payments',
    description: 'Extended terms available',
    details: ['Fixed payment options', 'Predictable monthly payments', 'No prepayment penalties'],
  },
  {
    title: 'Multiple Financing Partners',
    description: 'Options for various credit profiles',
    details: ['Several lenders available', 'Quick approval process', 'Flexible qualification'],
  },
];

const paymentMethods = [
  {
    name: 'Cash',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Check',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Credit Cards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: 'Debit Cards',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    name: 'Financing',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: 'How do I apply?',
    answer: "Takes 5 minutes. Your tech can help you do it on the spot, or call our office. You'll know if you're approved before we leave.",
  },
  {
    question: 'What if my credit sucks?',
    answer: "We've got multiple financing partners. Even if your credit isn't perfect, we usually have options. No judgment—AC doesn't care about your FICO score.",
  },
  {
    question: 'Can I pay it off early?',
    answer: "Yep. No prepayment penalties. Pay it off whenever you want without extra fees.",
  },
  {
    question: "What's the minimum to finance?",
    answer: "Minimums vary by financing partner. Most major repairs and new system installations qualify. Ask us for details.",
  },
  {
    question: 'Any discounts for veterans or seniors?',
    answer: "Absolutely. We've got discounts for seniors, military, and first responders. Just ask when you schedule. We don't make you jump through hoops.",
  },
];

export default function FinancingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        <div className="container relative py-20">
          <Breadcrumbs items={[{ label: 'Financing & Payments' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Financing & Payments</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
                Don't Sweat the Bill
              </h1>
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed max-w-lg">
                New AC isn't cheap. Neither is sleeping in a 90-degree house. We've got payment plans so you don't have to choose between comfort and groceries.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get Pre-Approved
                </Button>
              </Link>
              <TrustSignals className="mt-6" items={['Quick approval', 'Flexible terms', 'Multiple options']} />
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="bg-white rounded-lg p-6 lg:p-10 shadow-lg text-center w-full max-w-sm">
                <div className="text-xs lg:text-sm text-neutral-600 mb-1 lg:mb-2">Financing</div>
                <div className="text-3xl lg:text-4xl font-bold text-[#00AEEF] mb-1 lg:mb-2">Available</div>
                <div className="text-neutral-600 text-sm lg:text-base mb-4">Easy approval</div>
                <a
                  href="https://apply.svcfin.com/mrairservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#00AEEF] text-white font-semibold rounded-full hover:bg-[#0099D6] transition-colors"
                >
                  Apply for Financing
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <div className="text-xs text-neutral-400 mt-3 lg:mt-4">
                  On approved credit. Terms and conditions apply.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#00AEEF]"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Plans</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Pick What Works for You
            </h2>
            <p className="text-neutral-600 max-w-md text-lg">
              Multiple options because one size doesn't fit all budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financingOptions.map((option) => (
              <div
                key={option.title}
                className="bg-neutral-50 rounded-lg p-8 border border-neutral-200 hover:border-[#00AEEF]/30 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-neutral-black mb-2">{option.title}</h3>
                <p className="text-neutral-600 mb-6">{option.description}</p>
                <ul className="space-y-3">
                  {option.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className="w-5 h-5 rounded-full bg-[#00AEEF] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#00AEEF]"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">We Accept</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            Payment Methods Accepted
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white px-8 py-5 rounded-lg border border-neutral-200 hover:border-[#00AEEF]/30 hover:shadow-md transition-all duration-200 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#00AEEF] text-white flex items-center justify-center">
                  {method.icon}
                </div>
                <span className="font-semibold text-neutral-black">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#00AEEF]"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Easy Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            How Financing Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Get a Quote', description: "We tell you exactly what it costs. No hidden fees." },
              { step: '2', title: 'Apply', description: "5 minutes. Your tech can help you right there on the spot." },
              { step: '3', title: 'Get Approved', description: "Usually takes minutes, not days. You'll know before we leave." },
              { step: '4', title: 'Stay Cool', description: "We do the work. You make easy monthly payments. Done." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#00AEEF] text-white flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invoice Payment */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00AEEF]"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Pay Invoice</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 text-center leading-tight">
              Pay Your Invoice
            </h2>
            <p className="text-neutral-600 text-center mb-10 max-w-md mx-auto">
              Already have a service invoice? Pay it quickly and securely here.
            </p>

            <div className="bg-white rounded-lg border border-neutral-200 p-8">
              <InvoicePaymentForm />
            </div>

            <p className="text-center text-neutral-400 text-sm mt-6">
              Questions about your invoice? Call us at{' '}
              <a href="tel:+18324371000" className="text-[#00AEEF] hover:underline">
                (832) 437-1000
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        subtitle="Questions about financing? We've got you covered."
        items={faqs}
      />

      <FinalCTA />
    </>
  );
}
