import { ACRepairContent, ACRepairPageConfig, defaultACRepairConfig } from '@/components/pages/ACRepairContent';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  page_slug: string | null;
  position: number;
}

export const metadata = {
  title: 'Air Conditioning Repair | Mr. Air Services - Houston AC Repair Experts',
  description: 'Fast, reliable AC repair in Houston. Same-day service available. Our experienced technicians fix all makes and models. Call (832) 437-1000 for emergency AC repair.',
};

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
    const problems: { title: string; description: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      const title = configMap[`ac_repair_problem_${i}_title`];
      const desc = configMap[`ac_repair_problem_${i}_desc`];
      if (title || desc) {
        problems.push({
          title: title || defaultACRepairConfig.problems.items[i - 1].title,
          description: desc || defaultACRepairConfig.problems.items[i - 1].description,
        });
      }
    }

    // Build FAQs array
    const faqs: { question: string; answer: string }[] = [];
    for (let i = 1; i <= 4; i++) {
      const q = configMap[`ac_repair_faq_${i}_q`];
      const a = configMap[`ac_repair_faq_${i}_a`];
      if (q || a) {
        faqs.push({
          question: q || defaultACRepairConfig.faq.items[i - 1].question,
          answer: a || defaultACRepairConfig.faq.items[i - 1].answer,
        });
      }
    }

    return {
      hero: {
        title: configMap['ac_repair_hero_title'] || defaultACRepairConfig.hero.title,
        description: configMap['ac_repair_hero_description'] || defaultACRepairConfig.hero.description,
        primaryButton: configMap['ac_repair_hero_primary_button'] || defaultACRepairConfig.hero.primaryButton,
        secondaryButton: configMap['ac_repair_hero_secondary_button'] || defaultACRepairConfig.hero.secondaryButton,
        trustSignals: trustSignals.length > 0 ? trustSignals : defaultACRepairConfig.hero.trustSignals,
      },
      brandsLabel: configMap['ac_repair_brands_label'] || defaultACRepairConfig.brandsLabel,
      problems: {
        title: configMap['ac_repair_problems_title'] || defaultACRepairConfig.problems.title,
        subtitle: configMap['ac_repair_problems_subtitle'] || defaultACRepairConfig.problems.subtitle,
        items: problems.length > 0 ? problems : defaultACRepairConfig.problems.items,
      },
      faq: {
        subtitle: configMap['ac_repair_faq_subtitle'] || defaultACRepairConfig.faq.subtitle,
        items: faqs.length > 0 ? faqs : defaultACRepairConfig.faq.items,
      },
    };
  } catch {
    return null;
  }
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/faqs?page=air-conditioning-repair`, {
      next: { revalidate: 60 },
      cache: 'force-cache',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ACRepairPage() {
  const [cmsConfig, dbFaqs] = await Promise.all([
    getACRepairPageConfig(),
    getFAQs(),
  ]);

  // Merge CMS config with defaults
  const config: ACRepairPageConfig = {
    hero: { ...defaultACRepairConfig.hero, ...cmsConfig?.hero },
    brandsLabel: cmsConfig?.brandsLabel || defaultACRepairConfig.brandsLabel,
    problems: { ...defaultACRepairConfig.problems, ...cmsConfig?.problems },
    faq: { ...defaultACRepairConfig.faq, ...cmsConfig?.faq },
  };

  // Use FAQs from database if available, otherwise use config
  const faqs = dbFaqs.length > 0
    ? dbFaqs.map(f => ({ question: f.question, answer: f.answer }))
    : config.faq.items;

  return <ACRepairContent config={config} faqs={faqs} />;
}
