import Link from 'next/link';
import { Button, Breadcrumbs, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';

export const metadata = {
  title: 'HVAC Services | Mr. Air Services - Houston AC & Heating',
  description: 'Complete HVAC services in Houston. AC repair, CoolSaver tune-ups, and heating services. Same-day service available.',
};

// Config interface for CMS-editable fields
interface ServiceCardConfig {
  badge?: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
}

interface ServicesPageConfig {
  hero: {
    title: string;
    description: string;
  };
  acRepair: ServiceCardConfig;
  heating: ServiceCardConfig;
  tuneUps: ServiceCardConfig;
}

// Default values (current hardcoded text - 100% preserved)
const defaultConfig: ServicesPageConfig = {
  hero: {
    title: 'HVAC Services',
    description: 'From emergency repairs to preventive maintenance. Same-day service available.',
  },
  acRepair: {
    badge: 'Same-Day',
    title: 'AC Repair',
    description: 'AC not cooling? Making weird noises? We diagnose fast and fix it right. Same-day service available.',
    features: ['All major brands', 'Upfront pricing', 'Parts warranty'],
    buttonText: 'Schedule Repair',
  },
  heating: {
    title: 'Heating',
    description: "Furnace acting up? Heat pump on the fritz? We fix it. Need a new system? We'll help you pick the right one.",
    features: ['Furnace repair', 'Heat pumps', 'Emergency service'],
    buttonText: 'Schedule Service',
  },
  tuneUps: {
    badge: 'FREE for Qualifying',
    title: 'CoolSaver Tune-Ups',
    description: '13-point inspection to catch problems before they become emergencies. FREE for qualifying homeowners.',
    features: ['13-point inspection', 'Filter replacement', 'Coil cleaning'],
    buttonText: 'Check If You Qualify',
  },
};

// Fetch config from CMS
async function getServicesPageConfig(): Promise<Partial<ServicesPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      'services_hero_title',
      'services_hero_description',
      'services_ac_badge',
      'services_ac_title',
      'services_ac_description',
      'services_ac_feature_1',
      'services_ac_feature_2',
      'services_ac_feature_3',
      'services_ac_button',
      'services_heating_title',
      'services_heating_description',
      'services_heating_feature_1',
      'services_heating_feature_2',
      'services_heating_feature_3',
      'services_heating_button',
      'services_tuneups_badge',
      'services_tuneups_title',
      'services_tuneups_description',
      'services_tuneups_feature_1',
      'services_tuneups_feature_2',
      'services_tuneups_feature_3',
      'services_tuneups_button',
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

    // Build features arrays
    const acFeatures: string[] = [];
    if (configMap['services_ac_feature_1']) acFeatures.push(configMap['services_ac_feature_1']);
    if (configMap['services_ac_feature_2']) acFeatures.push(configMap['services_ac_feature_2']);
    if (configMap['services_ac_feature_3']) acFeatures.push(configMap['services_ac_feature_3']);

    const heatingFeatures: string[] = [];
    if (configMap['services_heating_feature_1']) heatingFeatures.push(configMap['services_heating_feature_1']);
    if (configMap['services_heating_feature_2']) heatingFeatures.push(configMap['services_heating_feature_2']);
    if (configMap['services_heating_feature_3']) heatingFeatures.push(configMap['services_heating_feature_3']);

    const tuneupsFeatures: string[] = [];
    if (configMap['services_tuneups_feature_1']) tuneupsFeatures.push(configMap['services_tuneups_feature_1']);
    if (configMap['services_tuneups_feature_2']) tuneupsFeatures.push(configMap['services_tuneups_feature_2']);
    if (configMap['services_tuneups_feature_3']) tuneupsFeatures.push(configMap['services_tuneups_feature_3']);

    return {
      hero: {
        title: configMap['services_hero_title'] || defaultConfig.hero.title,
        description: configMap['services_hero_description'] || defaultConfig.hero.description,
      },
      acRepair: {
        badge: configMap['services_ac_badge'] || defaultConfig.acRepair.badge,
        title: configMap['services_ac_title'] || defaultConfig.acRepair.title,
        description: configMap['services_ac_description'] || defaultConfig.acRepair.description,
        features: acFeatures.length > 0 ? acFeatures : defaultConfig.acRepair.features,
        buttonText: configMap['services_ac_button'] || defaultConfig.acRepair.buttonText,
      },
      heating: {
        title: configMap['services_heating_title'] || defaultConfig.heating.title,
        description: configMap['services_heating_description'] || defaultConfig.heating.description,
        features: heatingFeatures.length > 0 ? heatingFeatures : defaultConfig.heating.features,
        buttonText: configMap['services_heating_button'] || defaultConfig.heating.buttonText,
      },
      tuneUps: {
        badge: configMap['services_tuneups_badge'] || defaultConfig.tuneUps.badge,
        title: configMap['services_tuneups_title'] || defaultConfig.tuneUps.title,
        description: configMap['services_tuneups_description'] || defaultConfig.tuneUps.description,
        features: tuneupsFeatures.length > 0 ? tuneupsFeatures : defaultConfig.tuneUps.features,
        buttonText: configMap['services_tuneups_button'] || defaultConfig.tuneUps.buttonText,
      },
    };
  } catch {
    return null;
  }
}

export default async function ServicesPage() {
  const cmsConfig = await getServicesPageConfig();

  // Merge CMS config with defaults
  const config: ServicesPageConfig = {
    hero: { ...defaultConfig.hero, ...cmsConfig?.hero },
    acRepair: { ...defaultConfig.acRepair, ...cmsConfig?.acRepair },
    heating: { ...defaultConfig.heating, ...cmsConfig?.heating },
    tuneUps: { ...defaultConfig.tuneUps, ...cmsConfig?.tuneUps },
  };

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
              {config.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              {config.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - 3 Column Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AC Repair */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 relative">
              {/* Emergency Badge */}
              {config.acRepair.badge && (
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary/10 rounded-full">
                  <span className="text-xs font-semibold text-primary">{config.acRepair.badge}</span>
                </div>
              )}
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">{config.acRepair.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                {config.acRepair.description}
              </p>
              <ul className="space-y-2 mb-6">
                {config.acRepair.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/air-conditioning-repair">
                <Button variant="secondary" fullWidth>
                  {config.acRepair.buttonText}
                </Button>
              </Link>
            </div>

            {/* Heating Services */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">{config.heating.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                {config.heating.description}
              </p>
              <ul className="space-y-2 mb-6">
                {config.heating.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/heating">
                <Button variant="secondary" fullWidth>
                  {config.heating.buttonText}
                </Button>
              </Link>
            </div>

            {/* AC Tune-Ups */}
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200 relative">
              {/* Free Badge */}
              {config.tuneUps.badge && (
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary/10 rounded-full">
                  <span className="text-xs font-semibold text-primary">{config.tuneUps.badge}</span>
                </div>
              )}
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3">{config.tuneUps.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-sm">
                {config.tuneUps.description}
              </p>
              <ul className="space-y-2 mb-6">
                {config.tuneUps.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <CoolSaverCTA variant="secondary" fullWidth size="md">
                  {config.tuneUps.buttonText}
                </CoolSaverCTA>
            </div>

          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
