import { Button, Breadcrumbs, TrustSignals, ChecklistGrid, CoolSaverCTA } from '@/components/ui';
import { FinalCTA } from '@/components/sections';
import { StickyTuneUpCTA } from '@/components/ui/StickyTuneUpCTA';

export const metadata = {
  title: 'Annual AC Tune-Up & Preventative Maintenance | Mr. Air Services Houston',
  description: 'Annual preventative maintenance programs for AC & heating systems. FREE CoolSaver tune-ups for qualifying homeowners. Keep your system at peak efficiency.',
};

// Config interface for CMS-editable fields
interface TuneUpsPageConfig {
  [key: string]: unknown;
  hero: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    trustSignals: string[];
  };
  infoCard: {
    badge: string;
    title: string;
    keyPoint: string;
    keyPointHighlight: string;
    features: string[];
    contactLabel: string;
    email: string;
  };
  checklist: {
    badge: string;
    title: string;
    description: string;
    items: string[];
  };
  benefits: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

// Default values (current hardcoded text)
const defaultConfig: TuneUpsPageConfig = {
  hero: {
    title: "Annual AC Tune-Up & Preventative Maintenance",
    description: "Keep your system running at peak efficiency. FREE CoolSaver tune-ups for qualifying homeowners, or schedule your annual inspection today.",
    primaryButton: "Check If You Qualify — FREE",
    secondaryButton: "Call (832) 437-1000",
    trustSignals: ["NATE certified techs", "100% satisfaction guaranteed", "Veteran owned"],
  },
  infoCard: {
    badge: "Annual Maintenance",
    title: "AC Inspection & Tune-Up",
    keyPointHighlight: "Any system 1 year or older",
    keyPoint: "should have an annual inspection/tune-up to get the most from your investment.",
    features: [
      "Increase system efficiency",
      "Prevent unexpected breakdowns",
      "Ensure adequate cooling",
      "Lower electrical costs",
    ],
    contactLabel: "Questions? Contact us:",
    email: "customerservice@mrairservices.com",
  },
  checklist: {
    badge: "Complete Inspection",
    title: "What We Check",
    description: "A thorough inspection that catches problems before they become expensive emergencies.",
    items: [
      "Inspect refrigerant level",
      "Inspect and clean condenser coils",
      "Inspect and clean contactor",
      "Check and calibrate thermostat",
      "Inspect airflow for proper specifications",
      "Inspect the evaporator coil",
      "Clean electrical and blower compartments",
      "Tighten electrical connections",
      "Inspect capacitors and relays",
      "Inspect all drain lines",
      "Check compressor for proper amp draw",
      "Check all motors for proper amp draw",
      "Oil the motors if required",
    ],
  },
  benefits: {
    title: "Three Reasons to",
    titleHighlight: "Act Today",
    subtitle: "Not tomorrow. Not next month. Today.",
    items: [
      {
        title: "Lower Your Energy Bills",
        description: "A clean, well-maintained system runs more efficiently. Better efficiency means lower monthly utility costs.",
      },
      {
        title: "Prevent Costly Repairs",
        description: "We catch small issues before they become expensive emergencies. Regular maintenance saves you money long-term.",
      },
      {
        title: "Extend System Lifespan",
        description: "A well-maintained system lasts years longer. That's thousands you're not spending on a new unit.",
      },
    ],
  },
};

// Icons kept hardcoded (part of design)
const benefitIcons = [
  <svg key="bills" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="prevent" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="lifespan" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

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

export default async function ACTuneUpsPage() {
  const cmsConfig = await getTuneUpsPageConfig();

  // Merge CMS config with defaults
  const config = deepMerge(defaultConfig, cmsConfig);

  // Build benefits with icons
  const benefits = config.benefits.items.map((item, idx) => ({
    ...item,
    icon: benefitIcons[idx],
  }));

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyTuneUpCTA />

      {/* Hero - FREE Prominently Featured */}
      <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[670px] pt-32 overflow-hidden bg-neutral-900">
        <div className="container relative py-20">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'CoolSaver Tune-Ups' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Main Content */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {config.hero.title}
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
                {config.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CoolSaverCTA variant="secondary" size="lg" fullWidthMobile className="shadow-2xl shadow-white/10">
                  {config.hero.primaryButton}
                </CoolSaverCTA>
                <a href="tel:+18324371000" className="w-full sm:w-auto">
                  <Button variant="outline-inverse" size="lg" fullWidthMobile>
                    {config.hero.secondaryButton}
                  </Button>
                </a>
              </div>

              <TrustSignals className="mt-6" variant="dark" items={config.hero.trustSignals} />
            </div>

            {/* Right - Info Card */}
            <div className="relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 lg:p-10 ring-1 ring-neutral-200/60 dark:ring-neutral-700/60">
              {/* Header */}
              <div className="flex items-start justify-between mb-6 pt-2">
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{config.infoCard.badge}</p>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{config.infoCard.title}</h3>
                </div>
              </div>

              {/* Key Point */}
              <div className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-4 mb-6">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  <strong className="text-primary">{config.infoCard.keyPointHighlight}</strong> {config.infoCard.keyPoint}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {config.infoCard.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {config.infoCard.contactLabel}
                </p>
                <a href={`mailto:${config.infoCard.email}`} className="text-primary hover:underline text-sm font-medium">
                  {config.infoCard.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 lg:py-28 bg-white dark:bg-neutral-900">
        <div className="container">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              {config.checklist.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              {config.checklist.title}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {config.checklist.description}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ChecklistGrid items={config.checklist.items} initialCount={8} />
          </div>
        </div>
      </section>

      {/* Benefits - Simplified to 3 */}
      <section className="relative py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-800 overflow-hidden">
        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-black dark:text-white mb-4 leading-tight">
              {config.benefits.title} <span className="text-primary">{config.benefits.titleHighlight}</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {config.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-10 border border-neutral-200/50 dark:border-neutral-700/50 hover:shadow-2xl hover:shadow-neutral-300/30 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
                  <div className="text-primary group-hover:text-white transition-colors duration-300">
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-black dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
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

      <FinalCTA />
    </>
  );
}
