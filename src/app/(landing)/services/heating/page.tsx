import { HeatingContent, HeatingPageConfig, defaultHeatingConfig } from '@/components/pages/HeatingContent';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  page_slug: string | null;
  position: number;
}

export const metadata = {
  title: 'Heating | Mr. Air Services - Houston Furnace & Heat Pump Experts',
  description: 'Professional heating services in Houston. Furnace repair, heat pump installation, and heating maintenance. Stay warm this winter. Call (832) 437-1000.',
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
async function getHeatingPageConfig(): Promise<Partial<HeatingPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      // Hero
      'heating_page_hero_title',
      'heating_page_hero_description',
      'heating_page_hero_primary_button',
      'heating_page_hero_secondary_button',
      // Services section
      'heating_page_services_badge',
      'heating_page_services_title',
      'heating_page_services_description',
      // Service 1
      'heating_page_service_1_title',
      'heating_page_service_1_description',
      'heating_page_service_1_stat',
      'heating_page_service_1_stat_label',
      // Service 2
      'heating_page_service_2_title',
      'heating_page_service_2_description',
      'heating_page_service_2_stat',
      'heating_page_service_2_stat_label',
      // Inspection section
      'heating_page_inspection_title',
      'heating_page_inspection_description',
      // Phase 1
      'heating_page_phase_1_name',
      'heating_page_phase_1_item_1',
      'heating_page_phase_1_item_2',
      'heating_page_phase_1_item_3',
      'heating_page_phase_1_item_4',
      // Phase 2
      'heating_page_phase_2_name',
      'heating_page_phase_2_item_1',
      'heating_page_phase_2_item_2',
      'heating_page_phase_2_item_3',
      'heating_page_phase_2_item_4',
      // Phase 3
      'heating_page_phase_3_name',
      'heating_page_phase_3_item_1',
      'heating_page_phase_3_item_2',
      'heating_page_phase_3_item_3',
      'heating_page_phase_3_item_4',
      // Safety callout
      'heating_page_safety_title',
      'heating_page_safety_description',
      // Warnings section
      'heating_page_warnings_badge',
      'heating_page_warnings_title',
      'heating_page_warnings_description',
      'heating_page_emergency_title',
      'heating_page_emergency_subtitle',
      // Warning cards
      'heating_page_warning_1_title',
      'heating_page_warning_1_description',
      'heating_page_warning_2_title',
      'heating_page_warning_2_description',
      'heating_page_warning_3_title',
      'heating_page_warning_3_description',
      'heating_page_warning_4_title',
      'heating_page_warning_4_description',
      // FAQ
      'heating_page_faq_subtitle',
      'heating_page_faq_1_question',
      'heating_page_faq_1_answer',
      'heating_page_faq_2_question',
      'heating_page_faq_2_answer',
      'heating_page_faq_3_question',
      'heating_page_faq_3_answer',
      'heating_page_faq_4_question',
      'heating_page_faq_4_answer',
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

    return {
      hero: {
        title: configMap['heating_page_hero_title'] || undefined,
        description: configMap['heating_page_hero_description'] || undefined,
        primaryButton: configMap['heating_page_hero_primary_button'] || undefined,
        secondaryButton: configMap['heating_page_hero_secondary_button'] || undefined,
      },
      services: {
        badge: configMap['heating_page_services_badge'] || undefined,
        title: configMap['heating_page_services_title'] || undefined,
        description: configMap['heating_page_services_description'] || undefined,
        items: [
          {
            title: configMap['heating_page_service_1_title'] || undefined,
            description: configMap['heating_page_service_1_description'] || undefined,
            stat: configMap['heating_page_service_1_stat'] || undefined,
            statLabel: configMap['heating_page_service_1_stat_label'] || undefined,
          },
          {
            title: configMap['heating_page_service_2_title'] || undefined,
            description: configMap['heating_page_service_2_description'] || undefined,
            stat: configMap['heating_page_service_2_stat'] || undefined,
            statLabel: configMap['heating_page_service_2_stat_label'] || undefined,
          },
        ],
      },
      inspection: {
        title: configMap['heating_page_inspection_title'] || undefined,
        description: configMap['heating_page_inspection_description'] || undefined,
        phases: [
          {
            name: configMap['heating_page_phase_1_name'] || undefined,
            items: [
              configMap['heating_page_phase_1_item_1'],
              configMap['heating_page_phase_1_item_2'],
              configMap['heating_page_phase_1_item_3'],
              configMap['heating_page_phase_1_item_4'],
            ].filter(Boolean) as string[],
          },
          {
            name: configMap['heating_page_phase_2_name'] || undefined,
            items: [
              configMap['heating_page_phase_2_item_1'],
              configMap['heating_page_phase_2_item_2'],
              configMap['heating_page_phase_2_item_3'],
              configMap['heating_page_phase_2_item_4'],
            ].filter(Boolean) as string[],
          },
          {
            name: configMap['heating_page_phase_3_name'] || undefined,
            items: [
              configMap['heating_page_phase_3_item_1'],
              configMap['heating_page_phase_3_item_2'],
              configMap['heating_page_phase_3_item_3'],
              configMap['heating_page_phase_3_item_4'],
            ].filter(Boolean) as string[],
          },
        ],
      },
      safetyCallout: {
        title: configMap['heating_page_safety_title'] || undefined,
        description: configMap['heating_page_safety_description'] || undefined,
      },
      warnings: {
        badge: configMap['heating_page_warnings_badge'] || undefined,
        title: configMap['heating_page_warnings_title'] || undefined,
        description: configMap['heating_page_warnings_description'] || undefined,
        emergencyTitle: configMap['heating_page_emergency_title'] || undefined,
        emergencySubtitle: configMap['heating_page_emergency_subtitle'] || undefined,
        cards: [
          {
            title: configMap['heating_page_warning_1_title'] || undefined,
            description: configMap['heating_page_warning_1_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_2_title'] || undefined,
            description: configMap['heating_page_warning_2_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_3_title'] || undefined,
            description: configMap['heating_page_warning_3_description'] || undefined,
          },
          {
            title: configMap['heating_page_warning_4_title'] || undefined,
            description: configMap['heating_page_warning_4_description'] || undefined,
          },
        ],
      },
      faq: {
        subtitle: configMap['heating_page_faq_subtitle'] || undefined,
        items: [
          {
            question: configMap['heating_page_faq_1_question'] || undefined,
            answer: configMap['heating_page_faq_1_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_2_question'] || undefined,
            answer: configMap['heating_page_faq_2_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_3_question'] || undefined,
            answer: configMap['heating_page_faq_3_answer'] || undefined,
          },
          {
            question: configMap['heating_page_faq_4_question'] || undefined,
            answer: configMap['heating_page_faq_4_answer'] || undefined,
          },
        ],
      },
    } as Partial<HeatingPageConfig>;
  } catch {
    return null;
  }
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/faqs?page=heating`, {
      next: { revalidate: 60 },
      cache: 'force-cache',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HeatingPage() {
  const [cmsConfig, dbFaqs] = await Promise.all([
    getHeatingPageConfig(),
    getFAQs(),
  ]);

  // Merge CMS config with defaults
  const config = deepMerge(defaultHeatingConfig, cmsConfig);

  // Use FAQs from database if available
  const faqs = dbFaqs.length > 0
    ? dbFaqs.map(f => ({ question: f.question, answer: f.answer }))
    : undefined;

  return <HeatingContent config={config} faqs={faqs} />;
}
