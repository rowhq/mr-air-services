import { FinancingContent, FinancingPageConfig, defaultFinancingConfig } from '@/components/pages/FinancingContent';

export const metadata = {
  title: 'Financing & Payments | Mr. Air Services - Flexible HVAC Financing Houston',
  description: 'Affordable HVAC financing options in Houston. 5-minute application, quick approval. Options for all credit profiles. No prepayment penalties.',
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
async function getFinancingPageConfig(): Promise<Partial<FinancingPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const configKeys = [
      // Hero
      'financing_page_hero_title',
      'financing_page_hero_description',
      'financing_page_hero_subtitle',
      'financing_page_hero_primary_button',
      'financing_page_hero_secondary_button',
      'financing_page_trust_1',
      'financing_page_trust_2',
      'financing_page_trust_3',
      // Reality section
      'financing_page_reality_title',
      'financing_page_reality_description',
      'financing_page_without_title',
      'financing_page_without_description',
      'financing_page_with_title',
      'financing_page_with_description',
      'financing_page_stat_value',
      'financing_page_stat_label',
      'financing_page_reality_button',
      // How it works
      'financing_page_hiw_badge',
      'financing_page_hiw_title',
      'financing_page_hiw_description',
      'financing_page_hiw_button',
      'financing_page_step_1_title',
      'financing_page_step_1_description',
      'financing_page_step_2_title',
      'financing_page_step_2_description',
      'financing_page_step_3_title',
      'financing_page_step_3_description',
      'financing_page_step_4_title',
      'financing_page_step_4_description',
      // FAQ
      'financing_page_faq_subtitle',
      'financing_page_faq_1_question',
      'financing_page_faq_1_answer',
      'financing_page_faq_2_question',
      'financing_page_faq_2_answer',
      'financing_page_faq_3_question',
      'financing_page_faq_3_answer',
      'financing_page_faq_4_question',
      'financing_page_faq_4_answer',
      'financing_page_faq_5_question',
      'financing_page_faq_5_answer',
      'financing_page_faq_6_question',
      'financing_page_faq_6_answer',
      'financing_page_faq_7_question',
      'financing_page_faq_7_answer',
      // Final CTA
      'financing_page_cta_title',
      'financing_page_cta_subtitle',
      'financing_page_cta_primary',
      'financing_page_cta_secondary',
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
    if (configMap['financing_page_trust_1']) trustSignals.push(configMap['financing_page_trust_1']);
    if (configMap['financing_page_trust_2']) trustSignals.push(configMap['financing_page_trust_2']);
    if (configMap['financing_page_trust_3']) trustSignals.push(configMap['financing_page_trust_3']);

    // Build FAQ items
    const faqItems: Array<{ question: string; answer: string }> = [];
    for (let i = 1; i <= 7; i++) {
      const question = configMap[`financing_page_faq_${i}_question`];
      const answer = configMap[`financing_page_faq_${i}_answer`];
      if (question || answer) {
        faqItems.push({
          question: question || undefined,
          answer: answer || undefined,
        } as { question: string; answer: string });
      }
    }

    return {
      hero: {
        title: configMap['financing_page_hero_title'] || undefined,
        description: configMap['financing_page_hero_description'] || undefined,
        subtitle: configMap['financing_page_hero_subtitle'] || undefined,
        primaryButton: configMap['financing_page_hero_primary_button'] || undefined,
        secondaryButton: configMap['financing_page_hero_secondary_button'] || undefined,
        trustSignals: trustSignals.length > 0 ? trustSignals : undefined,
      },
      reality: {
        title: configMap['financing_page_reality_title'] || undefined,
        description: configMap['financing_page_reality_description'] || undefined,
        withoutFinancingTitle: configMap['financing_page_without_title'] || undefined,
        withoutFinancingDescription: configMap['financing_page_without_description'] || undefined,
        withFinancingTitle: configMap['financing_page_with_title'] || undefined,
        withFinancingDescription: configMap['financing_page_with_description'] || undefined,
        floatingStatValue: configMap['financing_page_stat_value'] || undefined,
        floatingStatLabel: configMap['financing_page_stat_label'] || undefined,
        button: configMap['financing_page_reality_button'] || undefined,
      },
      howItWorks: {
        badge: configMap['financing_page_hiw_badge'] || undefined,
        title: configMap['financing_page_hiw_title'] || undefined,
        description: configMap['financing_page_hiw_description'] || undefined,
        button: configMap['financing_page_hiw_button'] || undefined,
        steps: [
          {
            title: configMap['financing_page_step_1_title'] || undefined,
            description: configMap['financing_page_step_1_description'] || undefined,
          },
          {
            title: configMap['financing_page_step_2_title'] || undefined,
            description: configMap['financing_page_step_2_description'] || undefined,
          },
          {
            title: configMap['financing_page_step_3_title'] || undefined,
            description: configMap['financing_page_step_3_description'] || undefined,
          },
          {
            title: configMap['financing_page_step_4_title'] || undefined,
            description: configMap['financing_page_step_4_description'] || undefined,
          },
        ],
      },
      faq: {
        subtitle: configMap['financing_page_faq_subtitle'] || undefined,
        items: faqItems.length > 0 ? faqItems : undefined,
      },
      finalCta: {
        title: configMap['financing_page_cta_title'] || undefined,
        subtitle: configMap['financing_page_cta_subtitle'] || undefined,
        primaryButtonText: configMap['financing_page_cta_primary'] || undefined,
        secondaryButtonText: configMap['financing_page_cta_secondary'] || undefined,
      },
    } as Partial<FinancingPageConfig>;
  } catch {
    return null;
  }
}

export default async function FinancingPage() {
  const cmsConfig = await getFinancingPageConfig();

  // Merge CMS config with defaults
  const config = deepMerge(defaultFinancingConfig, cmsConfig);

  return <FinancingContent config={config} />;
}
