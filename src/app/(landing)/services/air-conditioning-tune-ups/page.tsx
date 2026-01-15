import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, ChecklistGrid, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';
import { StickyTuneUpCTA } from '@/components/ui/StickyTuneUpCTA';
import { BlockRenderer } from '@/components/cms/BlockRenderer';
import { getPageData } from '@/lib/cms-page-data';

export const metadata = {
  title: 'Annual AC Tune-Up & Preventative Maintenance | Mr. Air Services Houston',
  description: 'Annual preventative maintenance programs for AC & heating systems. FREE CoolSaver tune-ups for qualifying homeowners. Keep your system at peak efficiency.',
};

const checklistItems = [
  'Inspect refrigerant level',
  'Inspect and clean condenser coils',
  'Inspect and clean contactor',
  'Check and calibrate thermostat',
  'Inspect airflow for proper specifications',
  'Inspect the evaporator coil',
  'Clean electrical and blower compartments',
  'Tighten electrical connections',
  'Inspect capacitors and relays',
  'Inspect all drain lines',
  'Check compressor for proper amp draw',
  'Check all motors for proper amp draw',
  'Oil the motors if required',
];

const benefits = [
  {
    title: "Lower Your Energy Bills",
    description: "A clean, well-maintained system runs more efficiently. Better efficiency means lower monthly utility costs.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Prevent Costly Repairs',
    description: "We catch small issues before they become expensive emergencies. Regular maintenance saves you money long-term.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Extend System Lifespan',
    description: "A well-maintained system lasts years longer. That's thousands you're not spending on a new unit.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// Current design preserved as fallback
function HardcodedTuneUpsPage() {
  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyTuneUpCTA />

      {/* Hero - FREE Prominently Featured */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden bg-neutral-900">
        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Main Content */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Annual AC Tune-Up & Preventative Maintenance
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Keep your system running at peak efficiency. FREE CoolSaver tune-ups for qualifying homeowners, or schedule your annual inspection today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CoolSaverCTA variant="secondary" size="lg" fullWidthMobile className="shadow-2xl shadow-white/10">
                  Check If You Qualify — FREE
                </CoolSaverCTA>
                <a href="tel:+18324371000" className="w-full sm:w-auto">
                  <Button variant="outline-inverse" size="lg" fullWidthMobile>
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>

              <TrustSignals className="mt-6" variant="dark" items={['NATE certified techs', '100% satisfaction guaranteed', 'Veteran owned']} />
            </div>

            {/* Right - Info Card */}
            <div className="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 lg:p-10 ring-1 ring-neutral-200/60 dark:ring-neutral-700/60">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pt-2">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Annual Maintenance</p>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">AC Inspection & Tune-Up</h3>
                </div>
              </div>

              {/* Key Point */}
              <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-4 mb-6">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <strong className="text-primary">Any system 1 year or older</strong> should have an annual inspection/tune-up to get the most from your investment.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">Increase system efficiency</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">Prevent unexpected breakdowns</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">Ensure adequate cooling</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">Lower electrical costs</span>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  Questions? Contact us:
                </p>
                <a href="mailto:customerservice@mrairservices.com" className="text-primary hover:underline text-sm font-medium">
                  customerservice@mrairservices.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              Complete Inspection
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              What We Check
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A thorough inspection that catches problems before they become expensive emergencies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ChecklistGrid items={checklistItems} initialCount={8} />
          </div>
        </div>
      </section>

      {/* Benefits - Simplified to 3 */}
      <section className="relative py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              Three Reasons to <span className="text-primary">Act Today</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Not tomorrow. Not next month. Today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-10 border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
                  <div className="text-primary group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

export default async function ACTuneUpsPage() {
  const data = await getPageData('air-conditioning-tune-ups');

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
  return <HardcodedTuneUpsPage />;
}
