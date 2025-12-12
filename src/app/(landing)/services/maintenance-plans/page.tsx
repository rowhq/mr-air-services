import Link from 'next/link';
import { Button } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'HVAC Maintenance Plans | Mr. Air Services - Houston AC & Heating Protection',
  description: 'Protect your HVAC investment with our maintenance plans. Priority service, discounts on repairs, and regular tune-ups. Plans starting at $15/month.',
};

const plans = [
  {
    name: 'Basic Plan',
    price: '$15',
    period: '/month',
    description: 'Essential coverage for single-system homes',
    features: [
      'Annual AC tune-up',
      'Annual heating tune-up',
      '10% discount on repairs',
      'Priority scheduling',
      'Filter reminders',
    ],
    popular: false,
  },
  {
    name: 'Premium Plan',
    price: '$25',
    period: '/month',
    description: 'Comprehensive coverage for complete peace of mind',
    features: [
      'Bi-annual AC tune-ups',
      'Annual heating tune-up',
      '15% discount on repairs',
      'Priority scheduling',
      'No overtime charges',
      'Free service calls',
      'Extended warranty on repairs',
    ],
    popular: true,
  },
  {
    name: 'Commercial Plan',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for businesses',
    features: [
      'Customized service schedule',
      'Multiple system coverage',
      'Emergency priority service',
      'Dedicated account manager',
      'Quarterly inspections',
      'Volume discounts',
    ],
    popular: false,
  },
];

const benefits = [
  {
    title: 'Prevent Costly Breakdowns',
    description: 'Regular maintenance catches small issues before they become expensive emergency repairs.',
  },
  {
    title: 'Lower Energy Bills',
    description: 'A well-maintained system runs more efficiently, reducing your monthly energy costs.',
  },
  {
    title: 'Extend System Lifespan',
    description: 'Proper care can add 5-10 years to your HVAC system\'s life.',
  },
  {
    title: 'Priority Service',
    description: 'Jump to the front of the line when you need service—especially important during peak seasons.',
  },
  {
    title: 'Repair Discounts',
    description: 'Save on any repairs needed throughout the year with member-exclusive discounts.',
  },
  {
    title: 'Peace of Mind',
    description: 'Know that your system is being cared for by professionals year-round.',
  },
];

export default function MaintenancePlansPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-sm font-medium text-neutral-700 uppercase tracking-wide">Maintenance Plans</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black mb-6 leading-tight">
              HVAC Maintenance Plans
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Protect your investment and ensure year-round comfort with our comprehensive maintenance plans.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Choose Your Plan</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            Select the Right Plan for You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-neutral-50 rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-secondary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-neutral-black mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-neutral-600">{plan.period}</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    variant={plan.popular ? 'secondary' : 'outline'}
                    fullWidth
                  >
                    {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 uppercase tracking-wide">Benefits</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-14 text-center leading-tight">
            Why Choose a Maintenance Plan?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-8 rounded-2xl hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-neutral-black mb-3">{benefit.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black mb-6 leading-tight">
                Ready to Protect Your HVAC Investment?
              </h2>
              <p className="text-xl text-neutral-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of Houston homeowners who trust Mr. Air Services to keep their HVAC systems running smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Sign Up Today
                  </Button>
                </Link>
                <a href="tel:+18324371000">
                  <Button variant="outline" size="lg">
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
