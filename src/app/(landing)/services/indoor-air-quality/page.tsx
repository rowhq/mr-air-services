import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';
import type { FAQ } from '@/types/database';

// Types for CMS content
interface Solution {
  title: string;
  description: string;
  icon: string;
  benefit: string;
}

interface Symptom {
  title: string;
  description: string;
}

interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    trustSignals: string[];
  };
  solutions: Solution[];
  symptoms: Symptom[];
}

// Fetch page content from CMS
async function getPageContent(): Promise<PageContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/config?key=indoor_air_quality_page`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.value as PageContent;
  } catch {
    return null;
  }
}

// Fetch FAQs from CMS
async function getFAQs(): Promise<FAQ[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/faqs?page=indoor-air-quality`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Indoor Air Quality | Mr. Air Services - Houston IAQ Experts',
  description: 'Improve your indoor air quality in Houston. Air purifiers, UV lights, humidity control, and duct cleaning. Breathe cleaner air. Call (832) 437-1000.',
};

// Default content (fallback)
const defaultContent: PageContent = {
  hero: {
    title: "Indoor Air Quality Solutions",
    subtitle: "The air inside your home can be 2-5x more polluted than outdoor air. We'll help you breathe easier with proven IAQ solutions.",
    backgroundImage: "/images/services/indoor-air-quality.webp",
    trustSignals: ["Free IAQ assessment", "EPA-recommended solutions", "Financing available"],
  },
  solutions: [
    { title: 'Air Purification', description: "Whole-home air purifiers that remove 99.9% of airborne particles, allergens, and pathogens.", icon: 'wind', benefit: '99.9% particles removed' },
    { title: 'UV Light Systems', description: "UV-C light kills mold, bacteria, and viruses in your ductwork before they spread through your home.", icon: 'sun', benefit: 'Kills 99% of germs' },
    { title: 'Humidity Control', description: "Whole-home humidifiers and dehumidifiers keep your air at the ideal 30-50% humidity level.", icon: 'droplet', benefit: 'Optimal comfort' },
    { title: 'Duct Cleaning', description: "Professional duct cleaning removes years of dust, debris, and allergens from your air ducts.", icon: 'sparkles', benefit: 'Cleaner airflow' },
  ],
  symptoms: [
    { title: 'Allergies or Asthma', description: 'Symptoms that worsen indoors often indicate poor air quality' },
    { title: 'Dust Buildup', description: 'Excessive dust on surfaces means particles are circulating in your air' },
    { title: 'Musty Odors', description: 'Persistent smells can indicate mold or bacteria growth' },
    { title: 'Dry or Stuffy Air', description: 'Humidity problems cause discomfort and health issues' },
  ],
};

// Default FAQs
const defaultFaqs = [
  {
    question: 'How do I know if I have indoor air quality problems?',
    answer: "Common signs include worsening allergies, excessive dust, musty odors, dry skin, frequent headaches, or respiratory issues that improve when you leave home.",
  },
  {
    question: 'What is the best air purification system?',
    answer: "We recommend whole-home air purifiers that work with your HVAC system. They're more effective than portable units and clean all the air in your home, not just one room.",
  },
  {
    question: 'How often should ducts be cleaned?',
    answer: "Most homes benefit from duct cleaning every 3-5 years, or sooner if you have pets, smokers, recent renovations, or notice visible dust or debris.",
  },
  {
    question: 'Do UV lights really work?',
    answer: "Yes! UV-C lights are proven to kill up to 99.9% of mold, bacteria, and viruses. They're especially effective when installed in your air handler.",
  },
];

// Icon components
function SolutionIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    wind: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    sun: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    droplet: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c-4.418 0-8-3.582-8-8 0-4 8-11 8-11s8 7 8 11c0 4.418-3.582 8-8 8z" />
      </svg>
    ),
    sparkles: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons.wind}</>;
}

export default async function IndoorAirQualityPage() {
  const [cmsContent, cmsFaqs] = await Promise.all([
    getPageContent(),
    getFAQs(),
  ]);

  const content = cmsContent || defaultContent;
  const faqs = cmsFaqs.length > 0
    ? cmsFaqs.map(f => ({ question: f.question, answer: f.answer }))
    : defaultFaqs;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Indoor Air Quality' },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" fullWidthMobile>
                  Get Free Assessment
                </Button>
              </Link>
              <a href="tel:+18324371000" className="w-full sm:w-auto">
                <Button variant="outline-inverse" size="lg" fullWidthMobile>
                  Call (832) 437-1000
                </Button>
              </a>
            </div>
            <TrustSignals className="mt-6" variant="dark" />
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Warning Signs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              Signs You Need IAQ Solutions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Don&apos;t ignore these common indicators of poor indoor air quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {content.symptoms.map((symptom) => (
              <div
                key={symptom.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {symptom.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {symptom.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Our Solutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              IAQ Solutions That Work
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Proven technologies to improve the air quality in your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {content.solutions.map((solution) => (
              <div
                key={solution.title}
                className="bg-white dark:bg-neutral-900 rounded-3xl p-8 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                    <SolutionIcon icon={solution.icon} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                      {solution.title}
                    </h3>
                    <span className="text-sm text-primary font-semibold">{solution.benefit}</span>
                  </div>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Indoor Air Quality FAQs"
        subtitle="Common questions about improving your home's air quality"
        faqs={faqs}
      />

      {/* Final CTA */}
      <FinalCTA
        content={{
          title: "Ready to Breathe Easier?",
          subtitle: "Get a free indoor air quality assessment. We'll test your air and recommend solutions.",
          primaryButton: { text: 'Get Free Assessment', href: '/contact' },
          secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
          background: 'gradient',
        }}
      />
    </>
  );
}
