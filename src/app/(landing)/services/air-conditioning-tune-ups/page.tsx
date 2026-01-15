import { TuneUpsContent, TuneUpsPageConfig, defaultTuneUpsConfig } from '@/components/pages/TuneUpsContent';

export const metadata = {
  title: 'Annual AC Tune-Up & Preventative Maintenance | Mr. Air Services Houston',
  description: 'Annual preventative maintenance programs for AC & heating systems. FREE CoolSaver tune-ups for qualifying homeowners. Keep your system at peak efficiency.',
};

// Deep merge helper for nested objects
function deepMerge<T extends Record<string, unknown>>(defaults: T, overrides: Partial<T> | null | undefined): T {
  if (!overrides) return defaults;

  const result = { ...defaults };

  for (const key in overrides) {
    const overrideValue = overrides[key];
    const defaultValue = defaults[key];

    if (overrideValue === undefined) continue;

    if (Array.isArray(defaultValue) && Array.isArray(overrideValue)) {
      result[key] = overrideValue.map((item, index) => {
        if (typeof item === 'object' && item !== null && defaultValue[index]) {
          return deepMerge(defaultValue[index] as Record<string, unknown>, item as Record<string, unknown>);
        }
        return item ?? defaultValue[index];
      }) as T[Extract<keyof T, string>];
    } else if (typeof defaultValue === 'object' && defaultValue !== null && typeof overrideValue === 'object' && overrideValue !== null) {
      result[key] = deepMerge(defaultValue as Record<string, unknown>, overrideValue as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else {
      result[key] = overrideValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

// Fetch config from CMS
async function getTuneUpsPageConfig(): Promise<Partial<TuneUpsPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      // Hero
      'tuneups_page_hero_title',
      'tuneups_page_hero_description',
      'tuneups_page_hero_primary_button',
      'tuneups_page_hero_secondary_button',
      'tuneups_page_trust_1',
      'tuneups_page_trust_2',
      'tuneups_page_trust_3',
      // Info card
      'tuneups_page_card_badge',
      'tuneups_page_card_title',
      'tuneups_page_card_key_highlight',
      'tuneups_page_card_key_point',
      'tuneups_page_card_feature_1',
      'tuneups_page_card_feature_2',
      'tuneups_page_card_feature_3',
      'tuneups_page_card_feature_4',
      'tuneups_page_card_contact_label',
      'tuneups_page_card_email',
      // Checklist
      'tuneups_page_checklist_badge',
      'tuneups_page_checklist_title',
      'tuneups_page_checklist_description',
      'tuneups_page_checklist_1',
      'tuneups_page_checklist_2',
      'tuneups_page_checklist_3',
      'tuneups_page_checklist_4',
      'tuneups_page_checklist_5',
      'tuneups_page_checklist_6',
      'tuneups_page_checklist_7',
      'tuneups_page_checklist_8',
      'tuneups_page_checklist_9',
      'tuneups_page_checklist_10',
      'tuneups_page_checklist_11',
      'tuneups_page_checklist_12',
      'tuneups_page_checklist_13',
      // Benefits
      'tuneups_page_benefits_title',
      'tuneups_page_benefits_highlight',
      'tuneups_page_benefits_subtitle',
      'tuneups_page_benefit_1_title',
      'tuneups_page_benefit_1_description',
      'tuneups_page_benefit_2_title',
      'tuneups_page_benefit_2_description',
      'tuneups_page_benefit_3_title',
      'tuneups_page_benefit_3_description',
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
    if (configMap['tuneups_page_trust_1']) trustSignals.push(configMap['tuneups_page_trust_1']);
    if (configMap['tuneups_page_trust_2']) trustSignals.push(configMap['tuneups_page_trust_2']);
    if (configMap['tuneups_page_trust_3']) trustSignals.push(configMap['tuneups_page_trust_3']);

    // Build features array
    const features: string[] = [];
    if (configMap['tuneups_page_card_feature_1']) features.push(configMap['tuneups_page_card_feature_1']);
    if (configMap['tuneups_page_card_feature_2']) features.push(configMap['tuneups_page_card_feature_2']);
    if (configMap['tuneups_page_card_feature_3']) features.push(configMap['tuneups_page_card_feature_3']);
    if (configMap['tuneups_page_card_feature_4']) features.push(configMap['tuneups_page_card_feature_4']);

    // Build checklist items array
    const checklistItems: string[] = [];
    for (let i = 1; i <= 13; i++) {
      const item = configMap[`tuneups_page_checklist_${i}`];
      if (item) checklistItems.push(item);
    }

    return {
      hero: {
        title: configMap['tuneups_page_hero_title'] || undefined,
        description: configMap['tuneups_page_hero_description'] || undefined,
        primaryButton: configMap['tuneups_page_hero_primary_button'] || undefined,
        secondaryButton: configMap['tuneups_page_hero_secondary_button'] || undefined,
        trustSignals: trustSignals.length > 0 ? trustSignals : undefined,
      },
      infoCard: {
        badge: configMap['tuneups_page_card_badge'] || undefined,
        title: configMap['tuneups_page_card_title'] || undefined,
        keyPointHighlight: configMap['tuneups_page_card_key_highlight'] || undefined,
        keyPoint: configMap['tuneups_page_card_key_point'] || undefined,
        features: features.length > 0 ? features : undefined,
        contactLabel: configMap['tuneups_page_card_contact_label'] || undefined,
        email: configMap['tuneups_page_card_email'] || undefined,
      },
      checklist: {
        badge: configMap['tuneups_page_checklist_badge'] || undefined,
        title: configMap['tuneups_page_checklist_title'] || undefined,
        description: configMap['tuneups_page_checklist_description'] || undefined,
        items: checklistItems.length > 0 ? checklistItems : undefined,
      },
      benefits: {
        title: configMap['tuneups_page_benefits_title'] || undefined,
        titleHighlight: configMap['tuneups_page_benefits_highlight'] || undefined,
        subtitle: configMap['tuneups_page_benefits_subtitle'] || undefined,
        items: [
          {
            title: configMap['tuneups_page_benefit_1_title'] || undefined,
            description: configMap['tuneups_page_benefit_1_description'] || undefined,
          },
          {
            title: configMap['tuneups_page_benefit_2_title'] || undefined,
            description: configMap['tuneups_page_benefit_2_description'] || undefined,
          },
          {
            title: configMap['tuneups_page_benefit_3_title'] || undefined,
            description: configMap['tuneups_page_benefit_3_description'] || undefined,
          },
        ],
      },
    } as Partial<TuneUpsPageConfig>;
  } catch {
    return null;
  }
}

export default async function ACTuneUpsPage() {
  const cmsConfig = await getTuneUpsPageConfig();

  // Merge CMS config with defaults
  const config = deepMerge(defaultTuneUpsConfig, cmsConfig);

  return <TuneUpsContent config={config} />;
}
