import Link from 'next/link';
import { Button, Breadcrumbs, TrustSignals } from '@/components/ui';
import { FinalCTA, FAQSection } from '@/components/sections';
import type { FAQ } from '@/types/database';

// Types for CMS content
interface Benefit {
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

interface ProcessStep {
  step: string;
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
  benefits: Benefit[];
  process: ProcessStep[];
}

// Fetch page content from CMS
async function getPageContent(): Promise<PageContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/config?key=ac_installation_page`, {
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
    const response = await fetch(`${baseUrl}/api/cms/faqs?page=air-conditioning-installation`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'AC Installation | Mr. Air Services - Houston AC Installation Experts',
  description: 'Professional AC installation in Houston. Free estimates, top brands, financing available. Get a new system installed right. Call (832) 437-1000.',
};

// Default content (fallback)
const defaultContent: PageContent = {
  hero: {
    title: "New AC Installation",
    subtitle: "Need a new system? We'll help you choose the right AC for your home and budget. Professional installation with financing available.",
    backgroundImage: "/images/services/ac-installation.webp",
    trustSignals: ["Free estimates", "Top brands", "Financing available"],
  },
  benefits: [
    { title: 'Right Size System', description: "We calculate exactly what your home needs. No oversizing, no undersizing.", icon: 'ruler', stat: '100%', statLabel: 'proper sizing' },
    { title: 'Energy Savings', description: "Modern systems use 30-50% less energy than units from 10+ years ago.", icon: 'leaf', stat: '30-50%', statLabel: 'energy savings' },
    { title: 'Warranty Coverage', description: "Manufacturer warranties plus our workmanship guarantee for complete protection.", icon: 'shield', stat: '10yr', statLabel: 'warranty' },
  ],
  process: [
    { step: '1', title: 'Free Estimate', description: 'We assess your home and recommend the right system' },
    { step: '2', title: 'Choose Your System', description: 'Pick from top brands with various efficiency ratings' },
    { step: '3', title: 'Professional Install', description: 'Our licensed techs install it right, usually in one day' },
    { step: '4', title: 'Stay Cool', description: 'Enjoy reliable comfort with full warranty coverage' },
  ],
};

// Default FAQs
const defaultFaqs = [
  {
    question: 'How do I know what size AC I need?',
    answer: "We calculate the right size based on your home's square footage, insulation, windows, and other factors. Too big or too small both waste energy and money.",
  },
  {
    question: 'What brands do you install?',
    answer: "We install all major brands including Ruud, Lennox, Goodman, Trane, American Standard, and Carrier. We'll help you pick the right one for your budget.",
  },
  {
    question: 'How long does installation take?',
    answer: "Most residential installations take 1 day. Complex jobs or ductwork modifications might take 2 days.",
  },
  {
    question: 'Do you offer financing?',
    answer: "Yes! We offer flexible financing with 0% APR options for qualified buyers. Apply in 5 minutes and get an instant decision.",
  },
];

// Icon components
function BenefitIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    ruler: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    leaf: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    shield: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons.shield}</>;
}

export default async function ACInstallationPage() {
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
              { label: 'AC Installation' },
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
                  Get Free Estimate
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

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Why Replace Your AC
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              Benefits of a New System
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A new AC isn&apos;t just about staying cool—it&apos;s an investment in comfort, savings, and peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-3xl p-8 flex flex-col text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6">
                  <BenefitIcon icon={benefit.icon} />
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary">{benefit.stat}</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide">{benefit.statLabel}</div>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
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

      {/* Process */}
      <section className="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4">
              Our Installation Process
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              From estimate to cool air in 4 simple steps. No hassle, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {content.process.map((step, index) => (
              <div
                key={step.step}
                className="relative bg-white dark:bg-neutral-900 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {step.description}
                </p>
                {index < content.process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Installation FAQs"
        subtitle="Common questions about getting a new AC"
        faqs={faqs}
      />

      {/* Final CTA */}
      <FinalCTA
        content={{
          title: "Ready for a New AC?",
          subtitle: "Get a free estimate. No pressure, no obligation.",
          primaryButton: { text: 'Get Free Estimate', href: '/contact' },
          secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
          background: 'gradient',
        }}
      />
    </>
  );
}
