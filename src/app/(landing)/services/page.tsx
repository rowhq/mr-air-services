import Link from 'next/link';
import { Button, Breadcrumbs, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';
import type { Service } from '@/types/database';

// Types for CMS content
interface HeroContent {
  title: string;
  subtitle: string;
}

export const metadata = {
  title: 'HVAC Services | Mr. Air Services - Houston AC & Heating',
  description: 'Complete HVAC services in Houston. AC repair, CoolSaver tune-ups, and heating services. Same-day service available.',
};

// Fetch hero content from CMS
async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/config?key=services_page`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.value?.hero as HeroContent;
  } catch {
    return null;
  }
}

// Fetch services from CMS
async function getServices(): Promise<Service[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/cms/services`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

// Default services (fallback)
const defaultServices = [
  {
    id: '1',
    title: 'AC Repair',
    slug: 'air-conditioning-repair',
    short_description: "AC not cooling? Strange noises? We diagnose and fix all makes and models.",
    icon: 'ac-repair',
    features: ['All major brands', 'Upfront pricing', 'Parts warranty'],
    cta_text: 'Schedule Repair',
    badge: 'Same-Day',
    is_emergency: true,
  },
  {
    id: '2',
    title: 'Heating',
    slug: 'heating',
    short_description: "Stay warm during Houston's cold snaps. Furnaces, heat pumps, and all heating systems.",
    icon: 'heating',
    features: ['Furnace repair', 'Heat pumps', 'Emergency service'],
    cta_text: 'Schedule Service',
  },
  {
    id: '3',
    title: 'CoolSaver Tune-Ups',
    slug: 'air-conditioning-tune-ups',
    short_description: '13-point inspection. Catch small issues before they become expensive repairs.',
    icon: 'tune-up',
    features: ['13-point inspection', 'Filter replacement', 'Coil cleaning'],
    cta_text: 'Check If You Qualify',
    badge: 'FREE for Qualifying',
    is_coolsaver: true,
  },
];

// Icon helper
function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    'ac-repair': (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'heating': (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    'tune-up': (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons['ac-repair']}</>;
}

// Default hero content
const defaultHero: HeroContent = {
  title: 'HVAC Services',
  subtitle: 'From emergency repairs to preventive maintenance. Same-day service available.',
};

export default async function ServicesPage() {
  const [cmsHero, cmsServices] = await Promise.all([
    getHeroContent(),
    getServices(),
  ]);

  const hero = cmsHero || defaultHero;

  // Use CMS services if available, otherwise use defaults
  const services = cmsServices.length > 0
    ? cmsServices.map(s => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        short_description: s.short_description || s.description,
        icon: s.icon || 'ac-repair',
        features: Array.isArray(s.features) ? (s.features as string[]) : [],
        cta_text: s.cta_text || 'Learn More',
        badge: s.is_featured ? 'Featured' : undefined,
        is_coolsaver: s.slug?.includes('tune-up'),
        is_emergency: s.slug?.includes('repair'),
      }))
    : defaultServices;
  return (
    <>
      {/* Hero - Clean Apple style, no blobs */}
      <section className="relative min-h-[50vh] pt-32 bg-gradient-to-b from-neutral-900 to-neutral-800 overflow-hidden">
        {/* Subtle grid pattern instead of blobs */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="services-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100" height="100" fill="url(#services-grid)" className="text-white"/>
          </svg>
        </div>

        <div className="container relative py-16">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 relative"
              >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary/10 rounded-full">
                    <span className="text-xs font-semibold text-primary">{service.badge}</span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <ServiceIcon icon={service.icon} />
                </div>

                <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                  {service.short_description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature: string) => (
                      <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                        <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {service.is_coolsaver ? (
                  <CoolSaverCTA variant="secondary" fullWidth size="md">
                    {service.cta_text}
                  </CoolSaverCTA>
                ) : (
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="secondary" fullWidth>
                      {service.cta_text}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
