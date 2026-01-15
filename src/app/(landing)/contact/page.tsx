import { ContactPageClient, ContactPageConfig } from '@/components/contact';

export const metadata = {
  title: 'Contact Us | Mr. Air Services - Houston HVAC',
  description: 'Contact Mr. Air Services for all your HVAC needs in Houston. Call (832) 437-1000 or fill out our contact form for fast service.',
};

// Fetch contact page configuration from CMS
async function getContactPageConfig(): Promise<Partial<ContactPageConfig> | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Fetch all contact page config keys in parallel
    const configKeys = [
      'contact_page_title',
      'contact_page_subtitle',
      'contact_page_call_cta',
      'contact_page_form_title',
      'contact_page_form_subtitle',
      'contact_page_label_name',
      'contact_page_label_email',
      'contact_page_label_phone',
      'contact_page_label_time',
      'contact_page_label_services',
      'contact_page_label_message',
      'contact_page_time_morning',
      'contact_page_time_afternoon',
      'contact_page_time_flexible',
      'contact_page_submit_button',
      'contact_page_privacy_text',
      'contact_page_success_title',
      'contact_page_success_message',
      'contact_page_service_area',
    ];

    const responses = await Promise.all(
      configKeys.map(key =>
        fetch(`${baseUrl}/api/cms/config?key=${key}`, {
          next: { revalidate: 60 },
          cache: 'force-cache',
        }).then(r => r.ok ? r.json() : null).catch(() => null)
      )
    );

    // Create config object from responses
    const configMap: Record<string, string | null> = {};
    configKeys.forEach((key, index) => {
      configMap[key] = responses[index]?.value || null;
    });

    // Only return config if at least one value exists
    const hasValues = Object.values(configMap).some(v => v !== null);
    if (!hasValues) {
      return null;
    }

    return {
      title: configMap['contact_page_title'] || undefined,
      subtitle: configMap['contact_page_subtitle'] || undefined,
      callCtaLabel: configMap['contact_page_call_cta'] || undefined,
      formTitle: configMap['contact_page_form_title'] || undefined,
      formSubtitle: configMap['contact_page_form_subtitle'] || undefined,
      labels: {
        name: configMap['contact_page_label_name'] || 'Full Name',
        email: configMap['contact_page_label_email'] || 'Email Address',
        phone: configMap['contact_page_label_phone'] || 'Phone Number',
        preferredTime: configMap['contact_page_label_time'] || 'Preferred Time',
        services: configMap['contact_page_label_services'] || 'Services Needed',
        message: configMap['contact_page_label_message'] || 'Tell us about your HVAC needs...',
      },
      placeholders: {
        message: configMap['contact_page_label_message'] || 'Tell us about your HVAC needs...',
      },
      timeOptions: {
        morning: configMap['contact_page_time_morning'] || 'Morning (8AM - 12PM)',
        afternoon: configMap['contact_page_time_afternoon'] || 'Afternoon (12PM - 5PM)',
        flexible: configMap['contact_page_time_flexible'] || 'Flexible',
      },
      submitButton: configMap['contact_page_submit_button'] || undefined,
      privacyText: configMap['contact_page_privacy_text'] || undefined,
      successTitle: configMap['contact_page_success_title'] || undefined,
      successMessage: configMap['contact_page_success_message'] || undefined,
      serviceArea: configMap['contact_page_service_area'] || undefined,
    };
  } catch (error) {
    console.log('CMS not available for contact page config, using defaults');
    return null;
  }
}

// Fetch business info from CMS
async function getBusinessInfo() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const [phoneRes, emailRes, hoursRes] = await Promise.all([
      fetch(`${baseUrl}/api/cms/config?key=company_phone`, { next: { revalidate: 60 }, cache: 'force-cache' }),
      fetch(`${baseUrl}/api/cms/config?key=company_email`, { next: { revalidate: 60 }, cache: 'force-cache' }),
      fetch(`${baseUrl}/api/cms/config?key=business_hours`, { next: { revalidate: 60 }, cache: 'force-cache' }),
    ]);

    const [phoneData, emailData, hoursData] = await Promise.all([
      phoneRes.ok ? phoneRes.json() : null,
      emailRes.ok ? emailRes.json() : null,
      hoursRes.ok ? hoursRes.json() : null,
    ]);

    return {
      phone: phoneData?.value || undefined,
      email: emailData?.value || undefined,
      hours: hoursData?.value || undefined,
    };
  } catch {
    return undefined;
  }
}

// Fetch services from CMS
async function getServices() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cms/services`, {
      next: { revalidate: 60 },
      cache: 'force-cache',
    });

    if (!res.ok) return undefined;

    const services = await res.json();
    if (!services || services.length === 0) return undefined;

    const options = services.map((s: { slug: string; title: string; icon?: string }) => ({
      id: s.slug || s.title.toLowerCase().replace(/\s+/g, '-'),
      label: s.title,
      icon: s.icon || 'other',
    }));

    // Always add "Other" option
    if (!options.find((o: { id: string }) => o.id === 'other')) {
      options.push({ id: 'other', label: 'Other', icon: 'other' });
    }

    return options;
  } catch {
    return undefined;
  }
}

export default async function ContactPage() {
  // Fetch all data in parallel
  const [config, businessInfo, services] = await Promise.all([
    getContactPageConfig(),
    getBusinessInfo(),
    getServices(),
  ]);

  return (
    <ContactPageClient
      config={config || undefined}
      initialBusinessInfo={businessInfo}
      initialServices={services}
    />
  );
}
