import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals, SectionNav } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';

const sectionNavItems = [
  { id: 'problems', label: 'Common Issues' },
  { id: 'brands', label: 'Brands' },
  { id: 'process', label: 'Our Process' },
  { id: 'faq', label: 'FAQ' },
];

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

const repairIssues = [
  'Circuit breaker problems',
  'Condenser and evaporator coil restrictions',
  'Worn contactors and capacitors',
  'Refrigerant leaks',
  'Coil and copper line freezing',
  'Compressor failures',
  'Drainage system problems',
  'Inadequate cooling performance',
];

const brandsServiced = ['Ruud', 'Lennox', 'Goodman', 'Trane', 'American Standard', 'Carrier'];

const repairTypes = [
  {
    title: 'AC Not Cooling',
    description: "When it's 98° outside and your house feels like an oven. Refrigerant leak? Busted compressor? We'll find it and fix it.",
  },
  {
    title: 'Strange Noises',
    description: "If your AC sounds like a lawnmower, garbage disposal, or dying animal—that's bad. We'll figure out why and shut it up.",
  },
  {
    title: "AC Won't Turn On",
    description: "Thermostat issue? Blown capacitor? Electrical gremlins? We track down the problem and get you back to cold air.",
  },
  {
    title: 'Frozen Evaporator Coils',
    description: "Ice on your AC unit in July is not a good sign. Usually means airflow or refrigerant problems. We fix both.",
  },
  {
    title: 'Water Leaks',
    description: "Puddles around your unit? Clogged drain line, cracked pan, or worse. We'll stop the leak before it ruins your floor.",
  },
  {
    title: 'High Energy Bills',
    description: "Your AC shouldn't cost more than your mortgage. When it's guzzling power, something's wrong. We'll find it.",
  },
];

const faqs = [
  {
    question: 'How fast can you get here?',
    answer: "Same day for most calls in Greater Houston. When it's 100° and your AC is dead, we know you can't wait three days for someone to \"maybe\" show up.",
  },
  {
    question: 'Do you work on my brand?',
    answer: "Ruud, Lennox, Goodman, Trane, American Standard, Carrier—we service all major brands. If it cools air, we've worked on it.",
  },
  {
    question: "What's this gonna cost me?",
    answer: "Depends what's broken. But you'll know the exact price before we start. No \"oh by the way\" charges at the end.",
  },
  {
    question: 'Should I just replace this thing?',
    answer: "If your unit is 10-15+ years old and the repair costs more than half a new system, replacement usually makes more sense. We'll tell you straight—no upselling.",
  },
];

export default function ACRepairPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] pt-32 bg-gradient-to-br from-hero-start via-primary-light to-hero-end overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'AC Repair' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">AC Repair</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-black dark:text-white mb-6 leading-tight">
                AC Dead? We're On It.
              </h1>
              <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed max-w-lg">
                Houston heat waits for no one. When your AC breaks, we diagnose fast, quote straight, and fix it right the first time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule AC Repair
                  </Button>
                </Link>
                <a href="tel:+18324371000">
                  <Button variant="outline" size="lg">
                    Call for Emergency
                  </Button>
                </a>
              </div>
              <TrustSignals className="mt-6" items={['Same-day service', 'All brands serviced', 'No hidden fees']} />
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-xl w-full lg:w-auto">
                <div className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1 lg:mb-2">Same-Day</div>
                <div className="text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 mb-2 lg:mb-4">Emergency Service</div>
                <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">Available 7 days a week</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionNav items={sectionNavItems} />

      {/* Common Problems */}
      <section id="problems" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Common Issues</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 lg:mb-0 max-w-xl leading-tight">
              We've Seen It All. Fixed It All.
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md text-lg">
              Strange sounds? No cold air? Weird smells? With our experience in Houston, there's not much that surprises us anymore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairTypes.map((type) => (
              <div
                key={type.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">{type.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section id="brands" className="py-16 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-black dark:text-white mb-4">
              Brands We Service
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Factory-trained on all major manufacturers
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {brandsServiced.map((brand) => (
              <div
                key={brand}
                className="px-6 py-3 bg-white dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:border-secondary hover:text-secondary transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 lg:py-28 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">Our Process</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-14 text-center leading-tight">
            Our Repair Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'You Call', description: "Tell us what's wrong. We'll get someone out fast—usually same day." },
              { step: '2', title: 'We Diagnose', description: "Our tech finds the real problem. Not a symptom, the actual cause." },
              { step: '3', title: 'You Approve', description: "We tell you exactly what it'll cost before touching anything. No surprises." },
              { step: '4', title: 'We Fix It', description: "Quality parts, proper installation, and it works when we leave. Guaranteed." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <div id="faq" className="scroll-mt-20">
        <FAQSection
          subtitle="Got questions? We've got answers."
          items={faqs}
        />
      </div>

      <FinalCTA />
    </>
  );
}
