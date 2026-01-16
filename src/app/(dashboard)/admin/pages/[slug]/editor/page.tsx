'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { pageSchemas, getAllKeysFromSchema } from '@/lib/cms/page-schemas';

// Map slug to preview URL
const previewUrls: Record<string, string> = {
  'services': '/services/preview',
  'air-conditioning-repair': '/services/air-conditioning-repair/preview',
  'heating': '/services/heating/preview',
  'air-conditioning-tune-ups': '/services/air-conditioning-tune-ups/preview',
  'financing-payments': '/financing-payments/preview',
  'pay-invoice': '/pay-invoice/preview',
};

export default function ServicePageEditor() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const schema = pageSchemas[slug];

  const [values, setValues] = useState<Record<string, string>>({});
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Device widths
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  // Load initial values
  useEffect(() => {
    async function loadConfig() {
      if (!schema) return;

      try {
        const keys = getAllKeysFromSchema(slug);
        const response = await fetch('/api/cms/config/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keys }),
        });

        if (response.ok) {
          const data = await response.json();
          setValues(data);
        }

        // Expand all sections by default
        const sections: Record<string, boolean> = {};
        schema.sections.forEach(s => { sections[s.id] = true; });
        setExpandedSections(sections);
      } catch (error) {
        console.error('Failed to load config:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, [slug, schema]);

  // Create/update preview when values change
  const updatePreview = useCallback(async () => {
    if (!schema || Object.keys(values).length === 0) return;

    try {
      // Transform flat values to nested config structure
      const config = transformValuesToConfig(slug, values);

      if (previewId) {
        // Update existing preview
        await fetch('/api/cms/preview', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ previewId, config }),
        });
      } else {
        // Create new preview
        const response = await fetch('/api/cms/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, config }),
        });
        const data = await response.json();
        setPreviewId(data.previewId);
      }

      // Refresh iframe
      if (iframeRef.current) {
        const previewUrl = `${previewUrls[slug]}/preview?preview=${previewId || 'pending'}`;
        iframeRef.current.src = previewUrl;
      }
    } catch (error) {
      console.error('Failed to update preview:', error);
    }
  }, [slug, values, previewId, schema]);

  // Debounced preview update
  useEffect(() => {
    const timer = setTimeout(updatePreview, 500);
    return () => clearTimeout(timer);
  }, [updatePreview]);

  // Handle field change
  const handleChange = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setSaveStatus('idle');
  };

  // Toggle section
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  // Save to database
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const configs = Object.entries(values)
        .filter(([, value]) => value !== undefined && value !== '')
        .map(([key, value]) => ({ key, value }));

      const response = await fetch('/api/cms/config/batch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configs }),
      });

      if (!response.ok) throw new Error('Failed to save');

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!schema) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-neutral-500">Page not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const previewUrl = previewId
    ? `${previewUrls[slug]}/preview?preview=${previewId}`
    : previewUrls[slug];

  return (
    <div className="h-screen flex flex-col bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/pages"
            className="text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="font-semibold text-neutral-900">{schema.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Device Toggle */}
          <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
            {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
              <button
                key={device}
                onClick={() => setDeviceMode(device)}
                className={`p-2 rounded transition-colors ${
                  deviceMode === device
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
                title={device.charAt(0).toUpperCase() + device.slice(1)}
              >
                {device === 'desktop' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {device === 'tablet' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                {device === 'mobile' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Status */}
          {saveStatus === 'success' && (
            <span className="text-green-600 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-red-600 text-sm">Error saving</span>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview Iframe */}
        <div className="flex-1 bg-neutral-200 p-4 overflow-auto">
          <div
            className="mx-auto bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: deviceWidths[deviceMode],
              minHeight: '100%',
              maxWidth: '100%',
            }}
          >
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full h-full min-h-[800px]"
              title="Preview"
            />
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-96 bg-white border-l border-neutral-200 overflow-y-auto">
          <div className="p-4 border-b border-neutral-200">
            <h2 className="font-semibold text-neutral-900">Properties</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Edit page content
            </p>
          </div>

          <div className="p-4 space-y-4">
            {schema.sections.map((section) => (
              <div
                key={section.id}
                className="border border-neutral-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <span className="font-medium text-neutral-900">{section.title}</span>
                  <svg
                    className={`w-5 h-5 text-neutral-400 transition-transform ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedSections[section.id] && (
                  <div className="p-4 space-y-3">
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        <label
                          htmlFor={field.key}
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.key}
                            value={values[field.key] || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.key}
                            value={values[field.key] || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Transform flat config values to nested structure for preview
function transformValuesToConfig(slug: string, values: Record<string, string>): Record<string, unknown> {
  if (slug === 'air-conditioning-repair') {
    const trustSignals: string[] = [];
    if (values['ac_repair_hero_trust_1']) trustSignals.push(values['ac_repair_hero_trust_1']);
    if (values['ac_repair_hero_trust_2']) trustSignals.push(values['ac_repair_hero_trust_2']);
    if (values['ac_repair_hero_trust_3']) trustSignals.push(values['ac_repair_hero_trust_3']);

    const problems: { title: string; description: string }[] = [];
    for (let i = 1; i <= 6; i++) {
      problems.push({
        title: values[`ac_repair_problem_${i}_title`] || '',
        description: values[`ac_repair_problem_${i}_desc`] || '',
      });
    }

    const faqs: { question: string; answer: string }[] = [];
    for (let i = 1; i <= 4; i++) {
      faqs.push({
        question: values[`ac_repair_faq_${i}_q`] || '',
        answer: values[`ac_repair_faq_${i}_a`] || '',
      });
    }

    return {
      hero: {
        title: values['ac_repair_hero_title'] || '',
        description: values['ac_repair_hero_description'] || '',
        primaryButton: values['ac_repair_hero_primary_button'] || '',
        secondaryButton: values['ac_repair_hero_secondary_button'] || '',
        trustSignals,
      },
      brandsLabel: values['ac_repair_brands_label'] || '',
      problems: {
        title: values['ac_repair_problems_title'] || '',
        subtitle: values['ac_repair_problems_subtitle'] || '',
        items: problems.filter(p => p.title || p.description),
      },
      faq: {
        subtitle: values['ac_repair_faq_subtitle'] || '',
        items: faqs.filter(f => f.question || f.answer),
      },
    };
  }

  if (slug === 'services') {
    const acFeatures: string[] = [];
    if (values['services_ac_feature_1']) acFeatures.push(values['services_ac_feature_1']);
    if (values['services_ac_feature_2']) acFeatures.push(values['services_ac_feature_2']);
    if (values['services_ac_feature_3']) acFeatures.push(values['services_ac_feature_3']);

    const heatingFeatures: string[] = [];
    if (values['services_heating_feature_1']) heatingFeatures.push(values['services_heating_feature_1']);
    if (values['services_heating_feature_2']) heatingFeatures.push(values['services_heating_feature_2']);
    if (values['services_heating_feature_3']) heatingFeatures.push(values['services_heating_feature_3']);

    const tuneupsFeatures: string[] = [];
    if (values['services_tuneups_feature_1']) tuneupsFeatures.push(values['services_tuneups_feature_1']);
    if (values['services_tuneups_feature_2']) tuneupsFeatures.push(values['services_tuneups_feature_2']);
    if (values['services_tuneups_feature_3']) tuneupsFeatures.push(values['services_tuneups_feature_3']);

    return {
      hero: {
        title: values['services_hero_title'] || '',
        description: values['services_hero_description'] || '',
      },
      acRepair: {
        badge: values['services_ac_badge'] || '',
        title: values['services_ac_title'] || '',
        description: values['services_ac_description'] || '',
        features: acFeatures,
        buttonText: values['services_ac_button'] || '',
      },
      heating: {
        title: values['services_heating_title'] || '',
        description: values['services_heating_description'] || '',
        features: heatingFeatures,
        buttonText: values['services_heating_button'] || '',
      },
      tuneUps: {
        badge: values['services_tuneups_badge'] || '',
        title: values['services_tuneups_title'] || '',
        description: values['services_tuneups_description'] || '',
        features: tuneupsFeatures,
        buttonText: values['services_tuneups_button'] || '',
      },
    };
  }

  if (slug === 'heating') {
    return {
      hero: {
        title: values['heating_page_hero_title'] || '',
        description: values['heating_page_hero_description'] || '',
        primaryButton: values['heating_page_hero_primary_button'] || '',
        secondaryButton: values['heating_page_hero_secondary_button'] || '',
      },
      services: {
        badge: values['heating_page_services_badge'] || '',
        title: values['heating_page_services_title'] || '',
        description: values['heating_page_services_description'] || '',
        items: [
          {
            title: values['heating_page_service_1_title'] || '',
            description: values['heating_page_service_1_description'] || '',
            stat: values['heating_page_service_1_stat'] || '',
            statLabel: values['heating_page_service_1_stat_label'] || '',
          },
          {
            title: values['heating_page_service_2_title'] || '',
            description: values['heating_page_service_2_description'] || '',
            stat: values['heating_page_service_2_stat'] || '',
            statLabel: values['heating_page_service_2_stat_label'] || '',
          },
        ],
      },
      inspection: {
        title: values['heating_page_inspection_title'] || '',
        description: values['heating_page_inspection_description'] || '',
        phases: [
          {
            name: values['heating_page_phase_1_name'] || '',
            items: [
              values['heating_page_phase_1_item_1'] || '',
              values['heating_page_phase_1_item_2'] || '',
              values['heating_page_phase_1_item_3'] || '',
              values['heating_page_phase_1_item_4'] || '',
            ].filter(Boolean),
          },
          {
            name: values['heating_page_phase_2_name'] || '',
            items: [
              values['heating_page_phase_2_item_1'] || '',
              values['heating_page_phase_2_item_2'] || '',
              values['heating_page_phase_2_item_3'] || '',
              values['heating_page_phase_2_item_4'] || '',
            ].filter(Boolean),
          },
          {
            name: values['heating_page_phase_3_name'] || '',
            items: [
              values['heating_page_phase_3_item_1'] || '',
              values['heating_page_phase_3_item_2'] || '',
              values['heating_page_phase_3_item_3'] || '',
              values['heating_page_phase_3_item_4'] || '',
            ].filter(Boolean),
          },
        ],
      },
      safetyCallout: {
        title: values['heating_page_safety_title'] || '',
        description: values['heating_page_safety_description'] || '',
      },
      warnings: {
        badge: values['heating_page_warnings_badge'] || '',
        title: values['heating_page_warnings_title'] || '',
        description: values['heating_page_warnings_description'] || '',
        emergencyTitle: values['heating_page_emergency_title'] || '',
        emergencySubtitle: values['heating_page_emergency_subtitle'] || '',
        cards: [
          { title: values['heating_page_warning_1_title'] || '', description: values['heating_page_warning_1_description'] || '' },
          { title: values['heating_page_warning_2_title'] || '', description: values['heating_page_warning_2_description'] || '' },
          { title: values['heating_page_warning_3_title'] || '', description: values['heating_page_warning_3_description'] || '' },
          { title: values['heating_page_warning_4_title'] || '', description: values['heating_page_warning_4_description'] || '' },
        ],
      },
      faq: {
        subtitle: values['heating_page_faq_subtitle'] || '',
        items: [
          { question: values['heating_page_faq_1_question'] || '', answer: values['heating_page_faq_1_answer'] || '' },
          { question: values['heating_page_faq_2_question'] || '', answer: values['heating_page_faq_2_answer'] || '' },
          { question: values['heating_page_faq_3_question'] || '', answer: values['heating_page_faq_3_answer'] || '' },
          { question: values['heating_page_faq_4_question'] || '', answer: values['heating_page_faq_4_answer'] || '' },
        ].filter(f => f.question || f.answer),
      },
    };
  }

  if (slug === 'air-conditioning-tune-ups') {
    const trustSignals: string[] = [];
    if (values['tuneups_page_trust_1']) trustSignals.push(values['tuneups_page_trust_1']);
    if (values['tuneups_page_trust_2']) trustSignals.push(values['tuneups_page_trust_2']);
    if (values['tuneups_page_trust_3']) trustSignals.push(values['tuneups_page_trust_3']);

    const features: string[] = [];
    if (values['tuneups_page_card_feature_1']) features.push(values['tuneups_page_card_feature_1']);
    if (values['tuneups_page_card_feature_2']) features.push(values['tuneups_page_card_feature_2']);
    if (values['tuneups_page_card_feature_3']) features.push(values['tuneups_page_card_feature_3']);
    if (values['tuneups_page_card_feature_4']) features.push(values['tuneups_page_card_feature_4']);

    const checklistItems: string[] = [];
    for (let i = 1; i <= 13; i++) {
      if (values[`tuneups_page_checklist_${i}`]) checklistItems.push(values[`tuneups_page_checklist_${i}`]);
    }

    return {
      hero: {
        title: values['tuneups_page_hero_title'] || '',
        description: values['tuneups_page_hero_description'] || '',
        primaryButton: values['tuneups_page_hero_primary_button'] || '',
        secondaryButton: values['tuneups_page_hero_secondary_button'] || '',
        trustSignals,
      },
      infoCard: {
        badge: values['tuneups_page_card_badge'] || '',
        title: values['tuneups_page_card_title'] || '',
        keyPointHighlight: values['tuneups_page_card_key_highlight'] || '',
        keyPoint: values['tuneups_page_card_key_point'] || '',
        features,
        contactLabel: values['tuneups_page_card_contact_label'] || '',
        email: values['tuneups_page_card_email'] || '',
      },
      checklist: {
        badge: values['tuneups_page_checklist_badge'] || '',
        title: values['tuneups_page_checklist_title'] || '',
        description: values['tuneups_page_checklist_description'] || '',
        items: checklistItems,
      },
      benefits: {
        title: values['tuneups_page_benefits_title'] || '',
        titleHighlight: values['tuneups_page_benefits_highlight'] || '',
        subtitle: values['tuneups_page_benefits_subtitle'] || '',
        items: [
          { title: values['tuneups_page_benefit_1_title'] || '', description: values['tuneups_page_benefit_1_description'] || '' },
          { title: values['tuneups_page_benefit_2_title'] || '', description: values['tuneups_page_benefit_2_description'] || '' },
          { title: values['tuneups_page_benefit_3_title'] || '', description: values['tuneups_page_benefit_3_description'] || '' },
        ],
      },
    };
  }

  if (slug === 'financing-payments') {
    const trustSignals: string[] = [];
    if (values['financing_page_trust_1']) trustSignals.push(values['financing_page_trust_1']);
    if (values['financing_page_trust_2']) trustSignals.push(values['financing_page_trust_2']);
    if (values['financing_page_trust_3']) trustSignals.push(values['financing_page_trust_3']);

    const faqItems: Array<{ question: string; answer: string }> = [];
    for (let i = 1; i <= 7; i++) {
      const q = values[`financing_page_faq_${i}_question`];
      const a = values[`financing_page_faq_${i}_answer`];
      if (q || a) faqItems.push({ question: q || '', answer: a || '' });
    }

    return {
      hero: {
        title: values['financing_page_hero_title'] || '',
        description: values['financing_page_hero_description'] || '',
        subtitle: values['financing_page_hero_subtitle'] || '',
        primaryButton: values['financing_page_hero_primary_button'] || '',
        secondaryButton: values['financing_page_hero_secondary_button'] || '',
        trustSignals,
      },
      reality: {
        title: values['financing_page_reality_title'] || '',
        description: values['financing_page_reality_description'] || '',
        withoutFinancingTitle: values['financing_page_without_title'] || '',
        withoutFinancingDescription: values['financing_page_without_description'] || '',
        withFinancingTitle: values['financing_page_with_title'] || '',
        withFinancingDescription: values['financing_page_with_description'] || '',
        floatingStatValue: values['financing_page_stat_value'] || '',
        floatingStatLabel: values['financing_page_stat_label'] || '',
        button: values['financing_page_reality_button'] || '',
      },
      howItWorks: {
        badge: values['financing_page_hiw_badge'] || '',
        title: values['financing_page_hiw_title'] || '',
        description: values['financing_page_hiw_description'] || '',
        button: values['financing_page_hiw_button'] || '',
        steps: [
          { title: values['financing_page_step_1_title'] || '', description: values['financing_page_step_1_description'] || '' },
          { title: values['financing_page_step_2_title'] || '', description: values['financing_page_step_2_description'] || '' },
          { title: values['financing_page_step_3_title'] || '', description: values['financing_page_step_3_description'] || '' },
          { title: values['financing_page_step_4_title'] || '', description: values['financing_page_step_4_description'] || '' },
        ],
      },
      faq: {
        subtitle: values['financing_page_faq_subtitle'] || '',
        items: faqItems,
      },
      finalCta: {
        title: values['financing_page_cta_title'] || '',
        subtitle: values['financing_page_cta_subtitle'] || '',
        primaryButtonText: values['financing_page_cta_primary'] || '',
        secondaryButtonText: values['financing_page_cta_secondary'] || '',
      },
    };
  }

  if (slug === 'pay-invoice') {
    const trustSignals: string[] = [];
    if (values['pay_invoice_trust_1']) trustSignals.push(values['pay_invoice_trust_1']);
    if (values['pay_invoice_trust_2']) trustSignals.push(values['pay_invoice_trust_2']);
    if (values['pay_invoice_trust_3']) trustSignals.push(values['pay_invoice_trust_3']);

    return {
      title: values['pay_invoice_title'] || '',
      description: values['pay_invoice_description'] || '',
      trustSignals,
      helpTitle: values['pay_invoice_help_title'] || '',
      helpDescription: values['pay_invoice_help_description'] || '',
      financingLinkText: values['pay_invoice_financing_link'] || '',
    };
  }

  // For other pages, return flat values
  return values;
}
