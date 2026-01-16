import Image from 'next/image';
import { Button, Breadcrumbs } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

const FINANCING_URL = 'https://apply.svcfin.com/home/dealerAuthentication?id=400319926&key=1742219857';

// Config interface for CMS-editable fields
export interface FinancingPageConfig {
  [key: string]: unknown;
  hero: {
    title: string;
    description: string;
    subtitle: string;
    primaryButton: string;
    secondaryButton: string;
    trustSignals: string[];
  };
  reality: {
    title: string;
    description: string;
    withoutFinancingTitle: string;
    withoutFinancingDescription: string;
    withFinancingTitle: string;
    withFinancingDescription: string;
    floatingStatValue: string;
    floatingStatLabel: string;
    button: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    button: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCta: {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

// Default values (current hardcoded text)
export const defaultFinancingConfig: FinancingPageConfig = {
  hero: {
    title: "Don't Sweat the Bill",
    description: "New AC isn't cheap. Neither is sleeping in a 90-degree house. We've got financing so you don't have to choose between comfort and your budget.",
    subtitle: "5-minute application. Decision before we leave. Options for all credit profiles.",
    primaryButton: "Apply for Financing",
    secondaryButton: "Call (832) 437-1000",
    trustSignals: ["Quick Decision", "5-Min Apply", "No Penalties"],
  },
  reality: {
    title: "Don't Let a Big Bill Catch You Off Guard",
    description: "We get it—nobody budgets for a dead AC. That's why we make financing simple:",
    withoutFinancingTitle: "Without Financing",
    withoutFinancingDescription: "Big upfront cost. Credit card debt. Drained savings.",
    withFinancingTitle: "With Financing",
    withFinancingDescription: "Easy monthly payments. Keep your savings. Stay comfortable.",
    floatingStatValue: "5 min",
    floatingStatLabel: "to apply",
    button: "See Your Payment Options",
  },
  howItWorks: {
    badge: "Simple Process",
    title: "How It Works",
    description: "From quote to approval in one visit. No waiting, no wondering.",
    button: "Start Your Application",
    steps: [
      {
        title: "Get a Quote",
        description: "We tell you exactly what it costs. No hidden fees, no surprises.",
      },
      {
        title: "Apply in 5 Minutes",
        description: "Your tech helps you right there. Quick form, basic info.",
      },
      {
        title: "Instant Decision",
        description: "You'll know before we leave. If one lender says no, we try others.",
      },
      {
        title: "Stay Comfortable",
        description: "We do the work. You make easy monthly payments. Done.",
      },
    ],
  },
  faq: {
    subtitle: "Questions about financing? We've got real answers.",
    items: [
      {
        question: "What credit score do I need?",
        answer: "Honestly? We work with a bunch of different lenders. Even if your credit's seen better days, we can usually find something.",
      },
      {
        question: "What's the interest rate?",
        answer: "Rates depend on your credit profile and term length. Apply to see your personalized options—it only takes 5 minutes and you'll know right away.",
      },
      {
        question: "How do I apply?",
        answer: "Takes 5 minutes. Your tech can help you on the spot, or call our office. You'll know if you're approved before we leave.",
      },
      {
        question: "What if I get denied?",
        answer: "We've got multiple financing partners. If one says no, we try others. Most people who apply get approved somewhere. Your AC broke—that's stressful enough without worrying about credit.",
      },
      {
        question: "Can I pay it off early?",
        answer: "Yep. No prepayment penalties. Pay it off whenever you want without extra fees.",
      },
      {
        question: "What's the minimum to finance?",
        answer: "Minimums vary by lender. Most major repairs and new system installations qualify. Ask us for details.",
      },
      {
        question: "Any discounts for veterans or seniors?",
        answer: "Absolutely. We've got discounts for seniors, military, and first responders. Just ask when you schedule. We don't make you jump through hoops.",
      },
    ],
  },
  finalCta: {
    title: "Already a customer with an invoice?",
    subtitle: "Pay your invoice quickly and securely online.",
    primaryButtonText: "Pay Your Invoice",
    secondaryButtonText: "Questions? (832) 437-1000",
  },
};

// Icons kept hardcoded (part of design)
const stepIcons = [
  <svg key="quote" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  <svg key="apply" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  <svg key="decision" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="comfort" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
];

interface FinancingContentProps {
  config: FinancingPageConfig;
  faqs?: { question: string; answer: string }[];
  isPreview?: boolean;
}

export function FinancingContent({ config, faqs, isPreview = false }: FinancingContentProps) {
  // Use passed FAQs if available, otherwise use config FAQs
  const faqItems = faqs || config.faq.items;
  // Build how it works with icons
  const howItWorks = config.howItWorks.steps.map((step, idx) => ({
    ...step,
    step: String(idx + 1),
    icon: stepIcons[idx],
  }));

  return (
    <>
      {/* Preview indicator */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 text-center py-1 text-sm font-medium z-50">
          Preview Mode - Changes have not been saved
        </div>
      )}

      {/* Hero with Background Photo */}
      <section className={`relative min-h-[70vh] pt-32 overflow-hidden ${isPreview ? 'mt-8' : ''}`}>
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
                {config.hero.title}
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-lg">
                {config.hero.description}
              </p>
              <p className="text-lg text-white/70 mb-8">
                {config.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={FINANCING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="secondary" size="lg" fullWidthMobile>
                    {config.hero.primaryButton}
                  </Button>
                </a>
                <a href="tel:+18324371000" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" fullWidthMobile className="border-white text-white hover:bg-white/10">
                    {config.hero.secondaryButton}
                  </Button>
                </a>
              </div>

              {/* Trust Stats */}
              <div className="flex flex-wrap gap-6 text-white">
                {config.hero.trustSignals.map((signal) => (
                  <div key={signal} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{signal}</span>
                  </div>
                ))}
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
                <div className="text-3xl font-bold">{config.reality.floatingStatValue}</div>
                <div className="text-sm opacity-90">{config.reality.floatingStatLabel}</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                {config.reality.title}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                {config.reality.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-black dark:text-white">{config.reality.withoutFinancingTitle}</div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">{config.reality.withoutFinancingDescription}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-primary/10 dark:bg-primary/15 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-black dark:text-white">{config.reality.withFinancingTitle}</div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">{config.reality.withFinancingDescription}</div>
                  </div>
                </div>
              </div>

              <a
                href={FINANCING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto"
              >
                <Button variant="secondary" size="lg" fullWidthMobile>
                  {config.reality.button}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Premium Design */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900 overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">{config.howItWorks.badge}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              {config.howItWorks.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              {config.howItWorks.description}
            </p>
          </div>

          {/* Desktop: Horizontal Cards */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {howItWorks.map((item, idx) => (
                <div
                  key={item.step}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Connector Line */}
                  {idx < howItWorks.length - 1 && (
                    <div className="absolute top-10 left-[60%] w-[calc(100%-20%)] h-[2px] bg-gradient-to-r from-primary/40 to-primary/10" />
                  )}

                  {/* Card */}
                  <div className="relative bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                    {/* Step Badge + Icon Row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg font-bold">
                        {item.step}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Vertical Timeline */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

              <div className="space-y-6">
                {howItWorks.map((item, idx) => (
                  <div
                    key={item.step}
                    className="relative pl-14 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Step Number on Timeline */}
                    <div className="absolute left-0 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg font-bold z-10">
                      {item.step}
                    </div>

                    {/* Card */}
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-black dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <a
              href={FINANCING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                {config.howItWorks.button}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        subtitle={config.faq.subtitle}
        items={faqItems}
      />

      {!isPreview && (
        <FinalCTA
          content={{
            title: config.finalCta.title,
            subtitle: config.finalCta.subtitle,
            primaryButton: {
              text: config.finalCta.primaryButtonText,
              href: "/pay-invoice",
            },
            secondaryButton: {
              text: config.finalCta.secondaryButtonText,
              href: "tel:+18324371000",
              type: "phone",
            },
            background: "gradient",
          }}
        />
      )}
    </>
  );
}
