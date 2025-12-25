import Link from 'next/link';
import Image from 'next/image';
import { Button, Breadcrumbs, TrustSignals, SectionNav, DesktopStickyCTA } from '@/components/ui';
import { FinalCTA, FAQSection, RepairProcess } from '@/components/sections';

const sectionNavItems = [
  { id: 'problems', label: 'Common Issues' },
  { id: 'process', label: 'Our Process' },
  { id: 'faq', label: 'FAQ' },
];

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

const brandsServiced = [
  { name: 'Ruud', logo: '/images/brands/ruud.svg' },
  { name: 'Lennox', logo: '/images/brands/lennox.svg' },
  { name: 'Goodman', logo: '/images/brands/goodman.svg' },
  { name: 'Trane', logo: '/images/brands/trane.svg' },
  { name: 'American Standard', logo: '/images/brands/american-standard.svg' },
  { name: 'Carrier', logo: '/images/brands/carrier.svg' },
];

const repairTypes = [
  {
    title: 'AC Not Cooling',
    description: 'Refrigerant leaks, compressor issues, or airflow problems',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
      </svg>
    ),
  },
  {
    title: 'Strange Noises',
    description: 'Grinding, squealing, or banging sounds from your unit',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M9 9v6m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
  },
  {
    title: "Won't Turn On",
    description: 'Electrical, thermostat, or capacitor failures',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: 'Frozen Coils',
    description: 'Ice buildup from restricted airflow or low refrigerant',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m11.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" />
      </svg>
    ),
  },
  {
    title: 'Water Leaks',
    description: 'Clogged drain lines or damaged condensate pans',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a8 8 0 01-8-8c0-4 8-11 8-11s8 7 8 11a8 8 0 01-8 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17a4 4 0 01-4-4" />
      </svg>
    ),
  },
  {
    title: 'High Energy Bills',
    description: 'Inefficient operation or failing components',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" />
      </svg>
    ),
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
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/services/diagnostics-repairs.webp)' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'AC Repair' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                AC Dead? We're On It.
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidthMobile>
                    Schedule AC Repair
                  </Button>
                </Link>
                <a href="tel:+18324371000" className="w-full sm:w-auto">
                  <Button variant="outline-inverse" size="lg" fullWidthMobile>
                    Call (832) 437-1000
                  </Button>
                </a>
              </div>
              <TrustSignals className="mt-6" variant="dark" items={['Same-day service', 'All brands serviced', 'No hidden fees']} />
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Service - Trust builder right after hero */}
      <section className="py-8 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">We service:</span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8">
              {brandsServiced.map((brand) => (
                <Image
                  key={brand.name}
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={140}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain grayscale opacity-60 dark:invert dark:opacity-70 hover:grayscale-0 hover:opacity-100 dark:hover:invert-0 transition-all duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionNav items={sectionNavItems} />

      {/* Common Problems */}
      <section id="problems" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-black dark:text-white mb-4">
              Common AC Problems We Fix
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              With years of Houston experience, we diagnose and repair these issues daily
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {repairTypes.map((type) => (
              <div
                key={type.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {type.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-black dark:text-white mb-1">{type.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <RepairProcess />

      {/* FAQs */}
      <div id="faq" className="scroll-mt-20">
        <FAQSection
          subtitle="Got questions? We've got answers."
          items={faqs}
        />
      </div>

      <FinalCTA />
      <DesktopStickyCTA />
    </>
  );
}
