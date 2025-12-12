import Link from 'next/link';
import { Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'Financing & Payments | Mr. Air Services - Flexible HVAC Financing Houston',
  description: 'Affordable HVAC financing options in Houston. Low monthly payments, quick approval, and flexible terms. Get the AC or heating system you need today.',
};

const financingOptions = [
  {
    title: '0% APR for 12 Months',
    description: 'No interest if paid in full within 12 months',
    details: ['Quick online application', 'Same-day approval', 'Minimum purchase $1,000'],
  },
  {
    title: 'Low Monthly Payments',
    description: 'Extended terms up to 72 months',
    details: ['Fixed APR options', 'Predictable monthly payments', 'No prepayment penalties'],
  },
  {
    title: 'No Credit Check Options',
    description: 'Alternative financing available',
    details: ['Based on income verification', 'Quick approval process', 'Flexible qualification'],
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
    question: 'How do I apply for financing?',
    answer: 'Applying is easy! Your technician can help you apply on-site, or you can call our office. The application takes just a few minutes and you\'ll get a decision quickly.',
  },
  {
    question: 'What credit score do I need?',
    answer: 'We work with multiple financing partners to offer options for various credit profiles. Even if you have less-than-perfect credit, we may have solutions available.',
  },
  {
    question: 'Can I pay off my loan early?',
    answer: 'Yes! There are no prepayment penalties. You can pay off your balance early without any additional fees.',
  },
  {
    question: 'What is the minimum purchase for financing?',
    answer: 'Most financing options have a minimum purchase of $1,000. This typically covers major repairs and system replacements.',
  },
  {
    question: 'Do you offer senior or military discounts?',
    answer: 'Yes, we offer discounts for seniors, military personnel, and first responders. Ask about our current discount programs when scheduling service.',
  },
];

export default function FinancingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Financing</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
                Flexible Financing Options
              </h1>
              <p className="text-xl text-neutral-700 mb-8 leading-relaxed max-w-lg">
                Don't let budget concerns keep you from comfortable indoor air. We offer flexible payment options to fit your needs.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get Pre-Approved
                </Button>
              </Link>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
                <div className="text-sm text-neutral-600 mb-2">Payments as low as</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">$49</div>
                <div className="text-neutral-600">/month*</div>
                <div className="text-xs text-neutral-400 mt-4">
                  *On approved credit. Terms and conditions apply.
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
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Our Plans</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-4 lg:mb-0 max-w-xl leading-tight">
              Financing Plans
            </h2>
            <p className="text-neutral-600 max-w-md text-lg">
              Choose the payment option that works best for your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financingOptions.map((option) => (
              <div
                key={option.title}
                className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-neutral-black mb-2">{option.title}</h3>
                <p className="text-neutral-600 mb-6">{option.description}</p>
                <ul className="space-y-3">
                  {option.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center">
                        <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">We Accept</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            Payment Methods Accepted
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white px-8 py-5 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hero-start to-hero-end text-secondary flex items-center justify-center">
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
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Easy Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            How Financing Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Get a Quote', description: 'We provide a detailed estimate for your HVAC needs.' },
              { step: '2', title: 'Apply', description: 'Quick application process—online or with your technician.' },
              { step: '3', title: 'Get Approved', description: 'Receive a decision in minutes, not days.' },
              { step: '4', title: 'Enjoy Comfort', description: 'We complete the work, you make easy monthly payments.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">FAQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-10 text-center leading-tight">
              Financing FAQs
            </h2>
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger value={`faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent value={`faq-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
