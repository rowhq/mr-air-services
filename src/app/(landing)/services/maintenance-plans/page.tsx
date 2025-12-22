import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, PlanQuiz } from '@/components/sections';

export const metadata = {
  title: 'HVAC Maintenance Plans | Mr. Air Services - Houston AC & Heating Protection',
  description: 'Annual preventative maintenance plans with CoolSaver Tune-Ups. Modern diagnostic tools, priority service, and repair discounts. Keep your system at peak performance.',
};

const plans = [
  {
    name: 'Basic',
    price: '$19',
    period: '/month',
    annual: '$199/year',
    savings: 'Save $400+ vs paying per visit',
    description: 'Perfect for newer systems with basic maintenance needs',
    features: [
      { text: 'Annual CoolSaver Tune-Up (AC)', value: '$149 value' },
      { text: 'Annual heating tune-up', value: '$99 value' },
      { text: '10% discount on all repairs', value: null },
      { text: 'Priority scheduling', value: null },
      { text: 'Filter reminders', value: null },
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    annual: '$299/year',
    savings: 'Save $600+ vs paying per visit',
    description: 'Best value for homes 5+ years old',
    features: [
      { text: '2x CoolSaver Tune-Ups (AC)', value: '$298 value' },
      { text: 'Annual heating tune-up', value: '$99 value' },
      { text: '15% discount on all repairs', value: null },
      { text: 'Priority scheduling', value: 'Skip the 4-week wait' },
      { text: 'No overtime charges', value: 'Save $150+ on emergencies' },
      { text: 'Free service calls', value: '$89 value each' },
      { text: 'Extended warranty on repairs', value: null },
    ],
    popular: true,
  },
  {
    name: 'Commercial',
    price: 'Custom',
    period: '',
    annual: 'Based on # of systems',
    savings: 'Volume discounts available',
    description: 'Tailored solutions for businesses',
    features: [
      { text: 'Customized service schedule', value: null },
      { text: 'Multiple system coverage', value: null },
      { text: 'Emergency priority service', value: '4-hour response' },
      { text: 'Dedicated account manager', value: null },
      { text: 'Quarterly inspections', value: null },
      { text: '20%+ discount on repairs', value: null },
    ],
    popular: false,
  },
];

const comparisonFeatures = [
  { feature: 'AC Tune-Ups per Year', basic: '1', premium: '2', commercial: 'Custom' },
  { feature: 'Heating Tune-Ups per Year', basic: '1', premium: '1', commercial: 'Custom' },
  { feature: 'Repair Discount', basic: '10%', premium: '15%', commercial: '20%+' },
  { feature: 'Priority Scheduling', basic: true, premium: true, commercial: true },
  { feature: 'Free Service Calls', basic: false, premium: true, commercial: true },
  { feature: 'No Overtime Charges', basic: false, premium: true, commercial: true },
  { feature: 'Extended Warranty', basic: false, premium: true, commercial: true },
  { feature: 'Dedicated Account Manager', basic: false, premium: false, commercial: true },
];

const benefits = [
  {
    title: 'Catch $50 Problems Before They Cost $600',
    description: "Average emergency repair: $600. Average tune-up catch: $50. Your plan pays for itself after one prevented emergency.",
    stat: '12x',
    statLabel: 'cheaper to prevent than repair',
  },
  {
    title: 'Save $150-300/Year on Energy',
    description: "Dirty coils make your AC work 30% harder. Clean system = 10-15% lower power bills. That's real money back.",
    stat: '15%',
    statLabel: 'avg energy savings',
  },
  {
    title: 'Add 5-10 Years to Your System',
    description: "New AC unit: $6,000-12,000. Proper maintenance extends lifespan from 10 years to 15-20 years.",
    stat: '+10yr',
    statLabel: 'extended lifespan',
  },
  {
    title: 'Skip the 4-Week Summer Wait',
    description: "July in Houston: everyone's AC dies at once. Members get priority scheduling while others wait weeks.",
    stat: '48hr',
    statLabel: 'member response time',
  },
  {
    title: 'Save 10-15% on Every Repair',
    description: "Average repair: $400. Member discount: $40-60 saved per repair. Most homes need 1-2 repairs per year.",
    stat: '$120',
    statLabel: 'avg annual savings',
  },
  {
    title: 'No Surprise Bills',
    description: "Fixed monthly cost, no $1,000 emergency surprises. Know exactly what you'll spend on HVAC this year.",
    stat: '$0',
    statLabel: 'overtime charges',
  },
];

export default function MaintenancePlansPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/seasonal-maintenance.webp)' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Maintenance Plans' },
            ]}
          />
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Overpaying for AC Repairs
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Maintenance plans = catch problems early, avoid emergency calls, save money. It's not complicated.
            </p>
            <TrustSignals className="mt-6 justify-center" />
          </div>
        </div>
      </section>

      {/* Quick Quiz */}
      <section className="py-12 lg:py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <PlanQuiz />
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Every Plan Includes Our CoolSaver Tune-Up
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Our 14-point CoolSaver Tune-Up covers everything: refrigerant charge adjustment, coil cleaning, blower cleaning, filter replacement, and more. We use the latest diagnostic tools to keep your system running at peak performance.
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                <strong>Pro tip:</strong> Any AC system 1 year or older should have an annual tune-up. It's the difference between a $50 catch and a $600 emergency.
              </p>
              <Link href="/services/air-conditioning-tune-ups">
                <Button variant="outline">
                  See Full CoolSaver Tune-Up Details →
                </Button>
              </Link>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-6">CoolSaver Tune-Up Highlights</h3>
              <ul className="space-y-4">
                {[
                  'Refrigerant charge adjustment',
                  'Condenser & evaporator coil cleaning',
                  'Blower cleaning',
                  'Air filter replacement',
                  'Airflow measurement',
                  'Full electrical inspection',
                  'Drain line inspection',
                  'Performance report',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-hero-start to-hero-end flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Pick Your Plan
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              All plans include our 14-point CoolSaver Tune-Up. 30-day money-back guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-neutral-900 rounded-3xl p-8 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-secondary shadow-lg' : 'border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                      Best Value
                    </span>
                  </div>
                )}
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-neutral-black dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">{plan.annual}</p>
                  <p className="text-sm font-medium text-secondary">{plan.savings}</p>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-3 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature.text}</span>
                        {feature.value && (
                          <span className="block text-xs text-primary font-medium mt-0.5">{feature.value}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    variant={plan.popular ? 'secondary' : 'outline'}
                    fullWidth
                  >
                    {plan.price === 'Custom' ? 'Get Custom Quote' : `Start ${plan.name}`}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-6 text-center">
              Compare All Features
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">Feature</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">Basic</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-secondary">Premium</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">Commercial</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, idx) => (
                    <tr key={row.feature} className={idx !== comparisonFeatures.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''}>
                      <td className="py-3 px-4 text-sm text-neutral-700 dark:text-neutral-300">{row.feature}</td>
                      <td className="text-center py-3 px-4">
                        {typeof row.basic === 'boolean' ? (
                          row.basic ? (
                            <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{row.basic}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4 bg-secondary/5">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <svg className="w-5 h-5 text-secondary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium text-secondary">{row.premium}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {typeof row.commercial === 'boolean' ? (
                          row.commercial ? (
                            <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-300 dark:text-neutral-600">—</span>
                          )
                        ) : (
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{row.commercial}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              The Math That Makes Sense
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real numbers from real Houston homeowners. Your plan pays for itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold text-primary">{benefit.stat}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">{benefit.statLabel}</div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-base font-semibold text-neutral-black dark:text-white mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="bg-gradient-to-br from-hero-start to-hero-end rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/10"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                Let's Get You Signed Up
              </h2>
              <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join the Houston homeowners who don't panic when their AC makes a weird noise. Because we're already on it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Sign Me Up
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
