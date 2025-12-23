import Link from 'next/link';
import Image from 'next/image';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

export const metadata = {
  title: 'Financing & Payments | Mr. Air Services - Flexible HVAC Financing Houston',
  description: 'Affordable HVAC financing options in Houston. 5-minute application, quick approval. Options for all credit profiles. No prepayment penalties.',
};

const FINANCING_URL = 'https://apply.svcfin.com/home/dealerAuthentication?id=400319926&key=1742219857';

const financingOptions = [
  {
    title: 'Quick Approval',
    description: 'Decision before we leave your home',
    highlight: '5-minute application',
    image: '/images/financing/thumbs-up.jpg',
    details: [
      'Apply right on the spot',
      'Your tech can help you through it',
      'Know your options same-day',
    ],
  },
  {
    title: 'Flexible Terms',
    description: 'Monthly payments that fit your budget',
    highlight: 'Multiple term lengths',
    image: '/images/financing/piggy-bank.jpg',
    details: [
      'Choose what works for you',
      'No prepayment penalties',
      'Pay off early anytime',
    ],
  },
  {
    title: 'All Credit Welcome',
    description: 'Multiple lenders = more approvals',
    highlight: "We don't give up easily",
    image: '/images/financing/credit-approval.jpg',
    details: [
      "One \"no\" doesn't mean no options",
      'Several backup lenders available',
      "AC doesn't care about your FICO",
    ],
  },
];

const howItWorks = [
  {
    step: '1',
    title: 'Get a Quote',
    description: 'We tell you exactly what it costs. No hidden fees, no surprises.',
  },
  {
    step: '2',
    title: 'Apply in 5 Minutes',
    description: 'Your tech helps you right there. Quick form, basic info.',
  },
  {
    step: '3',
    title: 'Instant Decision',
    description: "You'll know before we leave. If one lender says no, we try others.",
  },
  {
    step: '4',
    title: 'Stay Comfortable',
    description: 'We do the work. You make easy monthly payments. Done.',
  },
];

const faqs = [
  {
    question: 'What credit score do I need?',
    answer: "There's no strict minimum. We work with multiple lenders covering all credit profiles. Even if your credit isn't perfect, we usually have options.",
  },
  {
    question: "What's the interest rate?",
    answer: "Rates depend on your credit profile and term length. Apply to see your personalized options—it only takes 5 minutes and you'll know right away.",
  },
  {
    question: 'How do I apply?',
    answer: "Takes 5 minutes. Your tech can help you on the spot, or call our office. You'll know if you're approved before we leave.",
  },
  {
    question: 'What if I get denied?',
    answer: "We've got multiple financing partners. If one says no, we try others. Most people who apply get approved somewhere. No judgment—AC doesn't care about your FICO score.",
  },
  {
    question: 'Can I pay it off early?',
    answer: "Yep. No prepayment penalties. Pay it off whenever you want without extra fees.",
  },
  {
    question: "What's the minimum to finance?",
    answer: "Minimums vary by lender. Most major repairs and new system installations qualify. Ask us for details.",
  },
  {
    question: 'Any discounts for veterans or seniors?',
    answer: "Absolutely. We've got discounts for seniors, military, and first responders. Just ask when you schedule. We don't make you jump through hoops.",
  },
];

export default function FinancingPage() {
  return (
    <>
      {/* Hero with Background Photo */}
      <section className="relative min-h-[70vh] pt-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/financing/happy-home.jpg"
            alt="Comfortable modern home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-neutral-900/60" />
        </div>

        <div className="container relative py-20">
          <Breadcrumbs items={[{ label: 'Financing & Payments' }]} className="text-white/80" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Don't Sweat the Bill
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-lg">
                New AC isn't cheap. Neither is sleeping in a 90-degree house. We've got financing so you don't have to choose between comfort and your budget.
              </p>
              <p className="text-lg text-white/70 mb-8">
                5-minute application. Decision before we leave. Options for all credit profiles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={FINANCING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="lg">
                    Apply for Financing
                  </Button>
                </a>
                <a href="tel:+18324371000">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>

              {/* Trust Stats */}
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Quick Decision</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">5-Min Apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">No Penalties</span>
                </div>
              </div>
            </div>

            {/* Photo Card */}
            <div className="flex justify-center mt-8 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/financing/family-comfort.jpg"
                    alt="Happy family enjoying comfort at home"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">
                    Financing Available
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                    Quick approval process with flexible terms for your comfort
                  </p>
                  <a
                    href={FINANCING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    Check Your Options
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                    On approved credit. Takes only 5 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Section with Photo */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Side */}
            <div className="relative animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/financing/technician-helping.jpg"
                  alt="HVAC technician helping customer with financing"
                  width={800}
                  height={534}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">5 min</div>
                <div className="text-sm opacity-90">to apply</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Don't Let a Big Bill <br />Catch You Off Guard
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                We get it—nobody budgets for a dead AC. That's why we make financing simple:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-black dark:text-white">Without Financing</div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">Big upfront cost. Credit card debt. Drained savings.</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border-2 border-primary/30">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-black dark:text-white">With Financing</div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">Easy monthly payments. Keep your savings. Stay comfortable.</div>
                  </div>
                </div>
              </div>

              <a
                href={FINANCING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  See Your Payment Options
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              From quote to approval in one visit. No waiting, no wondering.
            </p>
          </div>

          <div className="relative">
            {/* Timeline connector */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-700 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {howItWorks.map((item, idx) => (
                <div
                  key={item.step}
                  className="text-center relative animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Number circle */}
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-neutral-900 border-4 border-primary text-primary flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financing Options with Photos */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Why Finance With Us?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We make the process easy. Multiple options to fit your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingOptions.map((option, idx) => (
              <div
                key={option.title}
                className="group bg-neutral-50 dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Card Photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-2">
                    {option.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">{option.description}</p>

                  <div className="bg-primary/10 dark:bg-primary/20 rounded-lg px-4 py-2 mb-4 inline-block">
                    <p className="text-primary font-bold text-sm">{option.highlight}</p>
                  </div>

                  <ul className="space-y-2">
                    {option.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <a
              href={FINANCING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Start Your Application
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        subtitle="Questions about financing? We've got real answers."
        items={faqs}
      />

      {/* Invoice Payment - Simple Link */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Already a customer with an invoice?
            </p>
            <Link href="/pay-invoice">
              <Button variant="outline" size="sm">
                Pay Your Invoice
              </Button>
            </Link>
            <span className="text-neutral-400 dark:text-neutral-500 hidden sm:inline">|</span>
            <a
              href="tel:+18324371000"
              className="text-primary hover:underline text-sm"
            >
              Questions? (832) 437-1000
            </a>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
