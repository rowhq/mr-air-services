import Link from 'next/link';
import Image from 'next/image';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

export const metadata = {
  title: 'Financing & Payments | Mr. Air Services - Flexible HVAC Financing Houston',
  description: 'Affordable HVAC financing options in Houston. 5-minute application, quick approval. Options for all credit profiles. No prepayment penalties.',
};

const FINANCING_URL = 'https://apply.svcfin.com/home/dealerAuthentication?id=400319926&key=1742219857';

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
          <Breadcrumbs items={[{ label: 'Financing & Payments' }]} />
          <div className="max-w-3xl">
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

          </div>
        </div>
      </section>

      {/* The Reality Section with Photo */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Side */}
            <div className="relative animate-fade-in-up">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/financing/technician-helping.jpg"
                  alt="HVAC technician helping customer with financing"
                  width={800}
                  height={534}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl">
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
                <div className="flex items-start gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
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

                <div className="flex items-start gap-4 p-4 bg-primary/10 dark:bg-primary/15 rounded-xl">
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
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold relative z-10">
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

      {/* FAQs */}
      <FAQSection
        subtitle="Questions about financing? We've got real answers."
        items={faqs}
      />

      {/* Invoice Payment - Simple Link */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-800">
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
