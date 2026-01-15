import Link from 'next/link';
import Image from 'next/image';
import { Button, Breadcrumbs, TrustSignals, SectionNav, DesktopStickyCTA } from '@/components/ui';
import { FinalCTA, FAQSection, RepairProcess } from '@/components/sections';

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

// Config interface for CMS-editable fields
interface RepairTypeConfig {
  title: string;
  description: string;
}

interface FAQConfig {
  question: string;
  answer: string;
}

interface ACRepairPageConfig {
  hero: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    trustSignals: string[];
  };
  brandsLabel: string;
  problems: {
    title: string;
    subtitle: string;
    items: RepairTypeConfig[];
  };
  faq: {
    subtitle: string;
    items: FAQConfig[];
  };
}

// Default values (current hardcoded text - 100% preserved)
const defaultConfig: ACRepairPageConfig = {
  hero: {
    title: "AC Dead? We're On It.",
    description: 'Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.',
    primaryButton: 'Schedule AC Repair',
    secondaryButton: 'Call (832) 437-1000',
    trustSignals: ['Same-day service', 'All brands serviced', 'No hidden fees'],
  },
  brandsLabel: 'We service:',
  problems: {
    title: 'Common AC Problems We Fix',
    subtitle: 'With years of Houston experience, we diagnose and repair these issues daily',
    items: [
      { title: 'AC Not Cooling', description: 'Refrigerant leaks, compressor issues, or airflow problems' },
      { title: 'Strange Noises', description: 'Grinding, squealing, or banging sounds from your unit' },
      { title: "Won't Turn On", description: 'Electrical, thermostat, or capacitor failures' },
      { title: 'Frozen Coils', description: 'Ice buildup from restricted airflow or low refrigerant' },
      { title: 'Water Leaks', description: 'Clogged drain lines or damaged condensate pans' },
      { title: 'High Energy Bills', description: 'Inefficient operation or failing components' },
    ],
  },
  faq: {
    subtitle: "Got questions? We've got answers.",
    items: [
      { question: 'How fast can you get here?', answer: "Usually same day in Houston. Look, when it's 100 degrees and your AC just died, you don't need someone telling you 'maybe Thursday.' We get it." },
      { question: 'Do you work on my brand?', answer: "Ruud, Lennox, Goodman, Trane, American Standard, Carrier—we service all major brands. If it cools air, we've worked on it." },
      { question: "What's this gonna cost me?", answer: "Depends what's broken. But you'll know the exact price before we start. No \"oh by the way\" charges at the end." },
      { question: 'Should I just replace this thing?', answer: "If your unit is 10-15+ years old and the repair costs more than half a new system, replacement usually makes more sense. We'll tell you straight—no upselling." },
    ],
  },
};

// Hardcoded data that doesn't need CMS editing (logos, icons, navigation)
const sectionNavItems = [
  { id: 'problems', label: 'Common Issues' },
  { id: 'process', label: 'Our Process' },
  { id: 'faq', label: 'FAQ' },
];

const brandsServiced = [
  { name: 'Ruud', logo: '/images/brands/ruud.svg' },
  { name: 'Lennox', logo: '/images/brands/lennox.svg' },
  { name: 'Goodman', logo: '/images/brands/goodman.svg' },
  { name: 'Trane', logo: '/images/brands/trane.svg' },
  { name: 'American Standard', logo: '/images/brands/american-standard.svg' },
  { name: 'Carrier', logo: '/images/brands/carrier.svg' },
];

// Icons for repair types (hardcoded, part of design)
const repairTypeIcons = [
  <svg key="cooling" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /><circle cx="12" cy="12" r="4" strokeWidth={1.5} /></svg>,
  <svg key="noises" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M9 9v6m0 0l-3-3m3 3l3-3" /></svg>,
  <svg key="wontTurn" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
  <svg key="frozen" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m11.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" /></svg>,
  <svg key="leaks" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a8 8 0 01-8-8c0-4 8-11 8-11s8 7 8 11a8 8 0 01-8 8z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 17a4 4 0 01-4-4" /></svg>,
  <svg key="bills" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" /></svg>,
];

// Fetch config from CMS
async function getACRepairPageConfig(): Promise<Partial<ACRepairPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      'ac_repair_hero_title',
      'ac_repair_hero_description',
      'ac_repair_hero_primary_button',
      'ac_repair_hero_secondary_button',
      'ac_repair_hero_trust_1',
      'ac_repair_hero_trust_2',
      'ac_repair_hero_trust_3',
      'ac_repair_brands_label',
      'ac_repair_problems_title',
      'ac_repair_problems_subtitle',
      'ac_repair_problem_1_title',
      'ac_repair_problem_1_desc',
      'ac_repair_problem_2_title',
      'ac_repair_problem_2_desc',
      'ac_repair_problem_3_title',
      'ac_repair_problem_3_desc',
      'ac_repair_problem_4_title',
      'ac_repair_problem_4_desc',
      'ac_repair_problem_5_title',
      'ac_repair_problem_5_desc',
      'ac_repair_problem_6_title',
      'ac_repair_problem_6_desc',
      'ac_repair_faq_subtitle',
      'ac_repair_faq_1_q',
      'ac_repair_faq_1_a',
      'ac_repair_faq_2_q',
      'ac_repair_faq_2_a',
      'ac_repair_faq_3_q',
      'ac_repair_faq_3_a',
      'ac_repair_faq_4_q',
      'ac_repair_faq_4_a',
    ];

    const responses = await Promise.all(
      configKeys.map(key =>
        fetch(`${baseUrl}/api/cms/config?key=${key}`, {
          next: { revalidate: 60 },
          cache: 'force-cache',
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );

    const configMap: Record<string, string | null> = {};
    configKeys.forEach((key, index) => {
      configMap[key] = responses[index]?.value || null;
    });

    const hasValues = Object.values(configMap).some(v => v !== null);
    if (!hasValues) {
      return null;
    }

    // Build trust signals array
    const trustSignals: string[] = [];
    if (configMap['ac_repair_hero_trust_1']) trustSignals.push(configMap['ac_repair_hero_trust_1']);
    if (configMap['ac_repair_hero_trust_2']) trustSignals.push(configMap['ac_repair_hero_trust_2']);
    if (configMap['ac_repair_hero_trust_3']) trustSignals.push(configMap['ac_repair_hero_trust_3']);

    // Build problems array
    const problems: RepairTypeConfig[] = [];
    for (let i = 1; i <= 6; i++) {
      const title = configMap[`ac_repair_problem_${i}_title`];
      const desc = configMap[`ac_repair_problem_${i}_desc`];
      if (title || desc) {
        problems.push({
          title: title || defaultConfig.problems.items[i - 1].title,
          description: desc || defaultConfig.problems.items[i - 1].description,
        });
      }
    }

    // Build FAQs array
    const faqs: FAQConfig[] = [];
    for (let i = 1; i <= 4; i++) {
      const q = configMap[`ac_repair_faq_${i}_q`];
      const a = configMap[`ac_repair_faq_${i}_a`];
      if (q || a) {
        faqs.push({
          question: q || defaultConfig.faq.items[i - 1].question,
          answer: a || defaultConfig.faq.items[i - 1].answer,
        });
      }
    }

    return {
      hero: {
        title: configMap['ac_repair_hero_title'] || defaultConfig.hero.title,
        description: configMap['ac_repair_hero_description'] || defaultConfig.hero.description,
        primaryButton: configMap['ac_repair_hero_primary_button'] || defaultConfig.hero.primaryButton,
        secondaryButton: configMap['ac_repair_hero_secondary_button'] || defaultConfig.hero.secondaryButton,
        trustSignals: trustSignals.length > 0 ? trustSignals : defaultConfig.hero.trustSignals,
      },
      brandsLabel: configMap['ac_repair_brands_label'] || defaultConfig.brandsLabel,
      problems: {
        title: configMap['ac_repair_problems_title'] || defaultConfig.problems.title,
        subtitle: configMap['ac_repair_problems_subtitle'] || defaultConfig.problems.subtitle,
        items: problems.length > 0 ? problems : defaultConfig.problems.items,
      },
      faq: {
        subtitle: configMap['ac_repair_faq_subtitle'] || defaultConfig.faq.subtitle,
        items: faqs.length > 0 ? faqs : defaultConfig.faq.items,
      },
    };
  } catch {
    return null;
  }
}

export default async function ACRepairPage() {
  const cmsConfig = await getACRepairPageConfig();

  // Merge CMS config with defaults
  const config: ACRepairPageConfig = {
    hero: { ...defaultConfig.hero, ...cmsConfig?.hero },
    brandsLabel: cmsConfig?.brandsLabel || defaultConfig.brandsLabel,
    problems: { ...defaultConfig.problems, ...cmsConfig?.problems },
    faq: { ...defaultConfig.faq, ...cmsConfig?.faq },
  };

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
                {config.hero.title}
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                {config.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidthMobile>
                    {config.hero.primaryButton}
                  </Button>
                </Link>
                <a href="tel:+18324371000" className="w-full sm:w-auto">
                  <Button variant="outline-inverse" size="lg" fullWidthMobile>
                    {config.hero.secondaryButton}
                  </Button>
                </a>
              </div>
              <TrustSignals className="mt-6" variant="dark" items={config.hero.trustSignals} />
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Service - Trust builder right after hero */}
      <section className="py-8 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <span className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{config.brandsLabel}</span>
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
              {config.problems.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              {config.problems.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {config.problems.items.map((type, index) => (
              <div
                key={type.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {repairTypeIcons[index]}
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
          subtitle={config.faq.subtitle}
          items={config.faq.items}
        />
      </div>

      <FinalCTA />
      <DesktopStickyCTA />
    </>
  );
}
