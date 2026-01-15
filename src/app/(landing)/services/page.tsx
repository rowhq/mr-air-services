import { ServicesContent, ServicesPageConfig, defaultServicesConfig } from '@/components/pages/ServicesContent';

export const metadata = {
  title: 'HVAC Services | Mr. Air Services - Houston AC & Heating',
  description: 'Complete HVAC services in Houston. AC repair, CoolSaver tune-ups, and heating services. Same-day service available.',
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
        title: configMap['services_hero_title'] || defaultServicesConfig.hero.title,
        description: configMap['services_hero_description'] || defaultServicesConfig.hero.description,
      },
      acRepair: {
        badge: configMap['services_ac_badge'] || defaultServicesConfig.acRepair.badge,
        title: configMap['services_ac_title'] || defaultServicesConfig.acRepair.title,
        description: configMap['services_ac_description'] || defaultServicesConfig.acRepair.description,
        features: acFeatures.length > 0 ? acFeatures : defaultServicesConfig.acRepair.features,
        buttonText: configMap['services_ac_button'] || defaultServicesConfig.acRepair.buttonText,
      },
      heating: {
        title: configMap['services_heating_title'] || defaultServicesConfig.heating.title,
        description: configMap['services_heating_description'] || defaultServicesConfig.heating.description,
        features: heatingFeatures.length > 0 ? heatingFeatures : defaultServicesConfig.heating.features,
        buttonText: configMap['services_heating_button'] || defaultServicesConfig.heating.buttonText,
      },
      tuneUps: {
        badge: configMap['services_tuneups_badge'] || defaultServicesConfig.tuneUps.badge,
        title: configMap['services_tuneups_title'] || defaultServicesConfig.tuneUps.title,
        description: configMap['services_tuneups_description'] || defaultServicesConfig.tuneUps.description,
        features: tuneupsFeatures.length > 0 ? tuneupsFeatures : defaultServicesConfig.tuneUps.features,
        buttonText: configMap['services_tuneups_button'] || defaultServicesConfig.tuneUps.buttonText,
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
    hero: { ...defaultServicesConfig.hero, ...cmsConfig?.hero },
    acRepair: { ...defaultServicesConfig.acRepair, ...cmsConfig?.acRepair },
    heating: { ...defaultServicesConfig.heating, ...cmsConfig?.heating },
    tuneUps: { ...defaultServicesConfig.tuneUps, ...cmsConfig?.tuneUps },
  };

  return <ServicesContent config={config} />;
}
