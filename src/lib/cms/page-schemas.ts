// Page schemas define the exact config keys each page uses
// These correspond 1:1 with what the production pages fetch from site_config

export interface FieldSchema {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number';
  placeholder?: string;
}

export interface SectionSchema {
  id: string;
  title: string;
  description?: string;
  fields: FieldSchema[];
}

export interface PageSchema {
  title: string;
  description: string;
  productionUrl: string;
  sections: SectionSchema[];
}

export const pageSchemas: Record<string, PageSchema> = {
  // =====================================================
  // SERVICES HUB PAGE
  // =====================================================
  'services': {
    title: 'Services Hub',
    description: 'Main services page with 3 service cards',
    productionUrl: '/services',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        fields: [
          { key: 'services_hero_title', label: 'Title', type: 'text', placeholder: 'HVAC Services' },
          { key: 'services_hero_description', label: 'Description', type: 'textarea', placeholder: 'From emergency repairs to preventive maintenance...' },
        ]
      },
      {
        id: 'ac-card',
        title: 'AC Repair Card',
        fields: [
          { key: 'services_ac_badge', label: 'Badge', type: 'text', placeholder: 'Same-Day' },
          { key: 'services_ac_title', label: 'Title', type: 'text', placeholder: 'AC Repair' },
          { key: 'services_ac_description', label: 'Description', type: 'textarea', placeholder: 'AC not cooling? Making weird noises?...' },
          { key: 'services_ac_feature_1', label: 'Feature 1', type: 'text', placeholder: 'All major brands' },
          { key: 'services_ac_feature_2', label: 'Feature 2', type: 'text', placeholder: 'Upfront pricing' },
          { key: 'services_ac_feature_3', label: 'Feature 3', type: 'text', placeholder: 'Parts warranty' },
          { key: 'services_ac_button', label: 'Button Text', type: 'text', placeholder: 'Schedule Repair' },
        ]
      },
      {
        id: 'heating-card',
        title: 'Heating Card',
        fields: [
          { key: 'services_heating_title', label: 'Title', type: 'text', placeholder: 'Heating' },
          { key: 'services_heating_description', label: 'Description', type: 'textarea', placeholder: 'Furnace acting up? Heat pump on the fritz?...' },
          { key: 'services_heating_feature_1', label: 'Feature 1', type: 'text', placeholder: 'Furnace repair' },
          { key: 'services_heating_feature_2', label: 'Feature 2', type: 'text', placeholder: 'Heat pumps' },
          { key: 'services_heating_feature_3', label: 'Feature 3', type: 'text', placeholder: 'Emergency service' },
          { key: 'services_heating_button', label: 'Button Text', type: 'text', placeholder: 'Schedule Service' },
        ]
      },
      {
        id: 'tuneups-card',
        title: 'Tune-Ups Card',
        fields: [
          { key: 'services_tuneups_badge', label: 'Badge', type: 'text', placeholder: 'FREE for Qualifying' },
          { key: 'services_tuneups_title', label: 'Title', type: 'text', placeholder: 'CoolSaver Tune-Ups' },
          { key: 'services_tuneups_description', label: 'Description', type: 'textarea', placeholder: '13-point inspection to catch problems...' },
          { key: 'services_tuneups_feature_1', label: 'Feature 1', type: 'text', placeholder: '13-point inspection' },
          { key: 'services_tuneups_feature_2', label: 'Feature 2', type: 'text', placeholder: 'Filter replacement' },
          { key: 'services_tuneups_feature_3', label: 'Feature 3', type: 'text', placeholder: 'Coil cleaning' },
          { key: 'services_tuneups_button', label: 'Button Text', type: 'text', placeholder: 'Check If You Qualify' },
        ]
      },
    ]
  },

  // =====================================================
  // AC REPAIR PAGE
  // =====================================================
  'air-conditioning-repair': {
    title: 'AC Repair',
    description: 'AC repair service page with problems and FAQs',
    productionUrl: '/services/air-conditioning-repair',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        fields: [
          { key: 'ac_repair_hero_title', label: 'Title', type: 'text', placeholder: "AC Dead? We're On It." },
          { key: 'ac_repair_hero_description', label: 'Description', type: 'textarea', placeholder: 'Fast diagnosis, straight quotes, fixed right the first time...' },
          { key: 'ac_repair_hero_primary_button', label: 'Primary Button', type: 'text', placeholder: 'Schedule AC Repair' },
          { key: 'ac_repair_hero_secondary_button', label: 'Secondary Button', type: 'text', placeholder: 'Call (832) 437-1000' },
          { key: 'ac_repair_hero_trust_1', label: 'Trust Signal 1', type: 'text', placeholder: 'Same-day service' },
          { key: 'ac_repair_hero_trust_2', label: 'Trust Signal 2', type: 'text', placeholder: 'All brands serviced' },
          { key: 'ac_repair_hero_trust_3', label: 'Trust Signal 3', type: 'text', placeholder: 'No hidden fees' },
        ]
      },
      {
        id: 'brands',
        title: 'Brands Section',
        fields: [
          { key: 'ac_repair_brands_label', label: 'Brands Label', type: 'text', placeholder: 'We service:' },
        ]
      },
      {
        id: 'problems',
        title: 'Common Problems Section',
        fields: [
          { key: 'ac_repair_problems_title', label: 'Section Title', type: 'text', placeholder: 'Common AC Problems We Fix' },
          { key: 'ac_repair_problems_subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'With years of Houston experience...' },
          { key: 'ac_repair_problem_1_title', label: 'Problem 1 Title', type: 'text', placeholder: 'AC Not Cooling' },
          { key: 'ac_repair_problem_1_desc', label: 'Problem 1 Description', type: 'text', placeholder: 'Refrigerant leaks, compressor issues...' },
          { key: 'ac_repair_problem_2_title', label: 'Problem 2 Title', type: 'text', placeholder: 'Strange Noises' },
          { key: 'ac_repair_problem_2_desc', label: 'Problem 2 Description', type: 'text', placeholder: 'Grinding, squealing, or banging...' },
          { key: 'ac_repair_problem_3_title', label: 'Problem 3 Title', type: 'text', placeholder: "Won't Turn On" },
          { key: 'ac_repair_problem_3_desc', label: 'Problem 3 Description', type: 'text', placeholder: 'Electrical, thermostat, or capacitor...' },
          { key: 'ac_repair_problem_4_title', label: 'Problem 4 Title', type: 'text', placeholder: 'Frozen Coils' },
          { key: 'ac_repair_problem_4_desc', label: 'Problem 4 Description', type: 'text', placeholder: 'Ice buildup from restricted airflow...' },
          { key: 'ac_repair_problem_5_title', label: 'Problem 5 Title', type: 'text', placeholder: 'Water Leaks' },
          { key: 'ac_repair_problem_5_desc', label: 'Problem 5 Description', type: 'text', placeholder: 'Clogged drain lines...' },
          { key: 'ac_repair_problem_6_title', label: 'Problem 6 Title', type: 'text', placeholder: 'High Energy Bills' },
          { key: 'ac_repair_problem_6_desc', label: 'Problem 6 Description', type: 'text', placeholder: 'Inefficient operation...' },
        ]
      },
      {
        id: 'faq',
        title: 'FAQ Section',
        fields: [
          { key: 'ac_repair_faq_subtitle', label: 'FAQ Subtitle', type: 'text', placeholder: "Got questions? We've got answers." },
          { key: 'ac_repair_faq_1_q', label: 'FAQ 1 Question', type: 'text', placeholder: 'How fast can you get here?' },
          { key: 'ac_repair_faq_1_a', label: 'FAQ 1 Answer', type: 'textarea', placeholder: 'Usually same day in Houston...' },
          { key: 'ac_repair_faq_2_q', label: 'FAQ 2 Question', type: 'text', placeholder: 'Do you work on my brand?' },
          { key: 'ac_repair_faq_2_a', label: 'FAQ 2 Answer', type: 'textarea', placeholder: 'Ruud, Lennox, Goodman...' },
          { key: 'ac_repair_faq_3_q', label: 'FAQ 3 Question', type: 'text', placeholder: "What's this gonna cost me?" },
          { key: 'ac_repair_faq_3_a', label: 'FAQ 3 Answer', type: 'textarea', placeholder: "Depends what's broken..." },
          { key: 'ac_repair_faq_4_q', label: 'FAQ 4 Question', type: 'text', placeholder: 'Should I just replace this thing?' },
          { key: 'ac_repair_faq_4_a', label: 'FAQ 4 Answer', type: 'textarea', placeholder: 'If your unit is 10-15+ years old...' },
        ]
      },
    ]
  },

  // =====================================================
  // HEATING PAGE
  // =====================================================
  'heating': {
    title: 'Heating Services',
    description: 'Heating service page with inspection phases and warnings',
    productionUrl: '/services/heating',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        fields: [
          { key: 'heating_page_hero_title', label: 'Title', type: 'text', placeholder: "Heat Out? We're On It." },
          { key: 'heating_page_hero_description', label: 'Description', type: 'textarea', placeholder: 'Furnaces, heat pumps, all brands...' },
          { key: 'heating_page_hero_primary_button', label: 'Primary Button', type: 'text', placeholder: 'Schedule Heating Service' },
          { key: 'heating_page_hero_secondary_button', label: 'Secondary Button', type: 'text', placeholder: 'Call (832) 437-1000' },
        ]
      },
      {
        id: 'services',
        title: 'Services Section',
        fields: [
          { key: 'heating_page_services_badge', label: 'Badge', type: 'text', placeholder: 'Heating Services' },
          { key: 'heating_page_services_title', label: 'Title', type: 'text', placeholder: 'Everything Heating' },
          { key: 'heating_page_services_description', label: 'Description', type: 'textarea', placeholder: 'From "won\'t turn on" to "smells weird"...' },
          { key: 'heating_page_service_1_title', label: 'Service 1 Title', type: 'text', placeholder: 'Heating Repair' },
          { key: 'heating_page_service_1_description', label: 'Service 1 Description', type: 'textarea', placeholder: 'We fix furnaces, heat pumps...' },
          { key: 'heating_page_service_1_stat', label: 'Service 1 Stat', type: 'text', placeholder: '24/7' },
          { key: 'heating_page_service_1_stat_label', label: 'Service 1 Stat Label', type: 'text', placeholder: 'emergency' },
          { key: 'heating_page_service_2_title', label: 'Service 2 Title', type: 'text', placeholder: 'New Installation' },
          { key: 'heating_page_service_2_description', label: 'Service 2 Description', type: 'textarea', placeholder: 'Need a new system?...' },
          { key: 'heating_page_service_2_stat', label: 'Service 2 Stat', type: 'text', placeholder: 'Free' },
          { key: 'heating_page_service_2_stat_label', label: 'Service 2 Stat Label', type: 'text', placeholder: 'estimates' },
        ]
      },
      {
        id: 'inspection',
        title: 'Inspection Section',
        fields: [
          { key: 'heating_page_inspection_title', label: 'Title', type: 'text', placeholder: '12-Point Furnace Inspection' },
          { key: 'heating_page_inspection_description', label: 'Description', type: 'textarea', placeholder: 'Our inspection covers Safety, Performance...' },
          { key: 'heating_page_phase_1_name', label: 'Phase 1 Name', type: 'text', placeholder: 'Safety' },
          { key: 'heating_page_phase_1_item_1', label: 'Phase 1 Item 1', type: 'text', placeholder: 'We make sure all safety switches...' },
          { key: 'heating_page_phase_1_item_2', label: 'Phase 1 Item 2', type: 'text', placeholder: 'We look for dangerous gas leaks' },
          { key: 'heating_page_phase_1_item_3', label: 'Phase 1 Item 3', type: 'text', placeholder: 'Carbon monoxide detector test' },
          { key: 'heating_page_phase_1_item_4', label: 'Phase 1 Item 4', type: 'text', placeholder: 'Gas lines and vents inspection' },
          { key: 'heating_page_phase_2_name', label: 'Phase 2 Name', type: 'text', placeholder: 'Performance' },
          { key: 'heating_page_phase_2_item_1', label: 'Phase 2 Item 1', type: 'text', placeholder: 'We test all electrical connections' },
          { key: 'heating_page_phase_2_item_2', label: 'Phase 2 Item 2', type: 'text', placeholder: 'We verify it heats properly' },
          { key: 'heating_page_phase_2_item_3', label: 'Phase 2 Item 3', type: 'text', placeholder: 'We adjust the flame and fan' },
          { key: 'heating_page_phase_2_item_4', label: 'Phase 2 Item 4', type: 'text', placeholder: 'We clean the burners' },
          { key: 'heating_page_phase_3_name', label: 'Phase 3 Name', type: 'text', placeholder: 'Efficiency' },
          { key: 'heating_page_phase_3_item_1', label: 'Phase 3 Item 1', type: 'text', placeholder: 'Thermostat accuracy check' },
          { key: 'heating_page_phase_3_item_2', label: 'Phase 3 Item 2', type: 'text', placeholder: 'Filter replacement if needed' },
          { key: 'heating_page_phase_3_item_3', label: 'Phase 3 Item 3', type: 'text', placeholder: 'Efficiency rating assessment' },
          { key: 'heating_page_phase_3_item_4', label: 'Phase 3 Item 4', type: 'text', placeholder: 'Personalized recommendations' },
        ]
      },
      {
        id: 'safety',
        title: 'Safety Callout',
        fields: [
          { key: 'heating_page_safety_title', label: 'Title', type: 'text', placeholder: 'Carbon Monoxide: The Silent Killer' },
          { key: 'heating_page_safety_description', label: 'Description', type: 'textarea', placeholder: 'A cracked heat exchanger can leak...' },
        ]
      },
      {
        id: 'warnings',
        title: 'Warning Signs Section',
        fields: [
          { key: 'heating_page_warnings_badge', label: 'Badge', type: 'text', placeholder: 'Know the Signs' },
          { key: 'heating_page_warnings_title', label: 'Title', type: 'text', placeholder: 'Is Your Heater Asking for Help?' },
          { key: 'heating_page_warnings_description', label: 'Description', type: 'textarea', placeholder: 'Your heating system gives you clues...' },
          { key: 'heating_page_emergency_title', label: 'Emergency Title', type: 'text', placeholder: 'Smell Gas? Get Out Now.' },
          { key: 'heating_page_emergency_subtitle', label: 'Emergency Subtitle', type: 'text', placeholder: "Leave immediately. Don't flip switches..." },
          { key: 'heating_page_warning_1_title', label: 'Warning 1 Title', type: 'text', placeholder: 'Yellow Pilot Light' },
          { key: 'heating_page_warning_1_description', label: 'Warning 1 Description', type: 'text', placeholder: 'Should be blue. Yellow means...' },
          { key: 'heating_page_warning_2_title', label: 'Warning 2 Title', type: 'text', placeholder: 'Strange Sounds' },
          { key: 'heating_page_warning_2_description', label: 'Warning 2 Description', type: 'text', placeholder: 'Banging, squealing, or rattling...' },
          { key: 'heating_page_warning_3_title', label: 'Warning 3 Title', type: 'text', placeholder: 'Short Cycling' },
          { key: 'heating_page_warning_3_description', label: 'Warning 3 Description', type: 'text', placeholder: 'Turns on and off constantly?...' },
          { key: 'heating_page_warning_4_title', label: 'Warning 4 Title', type: 'text', placeholder: 'Higher Bills' },
          { key: 'heating_page_warning_4_description', label: 'Warning 4 Description', type: 'text', placeholder: 'Sudden spike in energy costs?...' },
        ]
      },
      {
        id: 'faq',
        title: 'FAQ Section',
        fields: [
          { key: 'heating_page_faq_subtitle', label: 'FAQ Subtitle', type: 'text', placeholder: 'Everything you need to know...' },
          { key: 'heating_page_faq_1_question', label: 'FAQ 1 Question', type: 'text', placeholder: 'How often do I need to service my heater?' },
          { key: 'heating_page_faq_1_answer', label: 'FAQ 1 Answer', type: 'textarea', placeholder: 'Once a year, before winter...' },
          { key: 'heating_page_faq_2_question', label: 'FAQ 2 Question', type: 'text', placeholder: "Furnace or heat pump—what's the difference?" },
          { key: 'heating_page_faq_2_answer', label: 'FAQ 2 Answer', type: 'textarea', placeholder: 'Furnaces burn fuel to make heat...' },
          { key: 'heating_page_faq_3_question', label: 'FAQ 3 Question', type: 'text', placeholder: 'How long will my heater last?' },
          { key: 'heating_page_faq_3_answer', label: 'FAQ 3 Answer', type: 'textarea', placeholder: 'Furnaces: 15-20 years...' },
          { key: 'heating_page_faq_4_question', label: 'FAQ 4 Question', type: 'text', placeholder: 'Can I finance a new system?' },
          { key: 'heating_page_faq_4_answer', label: 'FAQ 4 Answer', type: 'textarea', placeholder: "Yep. We've got flexible financing..." },
        ]
      },
    ]
  },

  // =====================================================
  // AC TUNE-UPS PAGE
  // =====================================================
  'air-conditioning-tune-ups': {
    title: 'AC Tune-Ups',
    description: 'CoolSaver tune-ups page with checklist and benefits',
    productionUrl: '/services/air-conditioning-tune-ups',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        fields: [
          { key: 'tuneups_page_hero_title', label: 'Title', type: 'text', placeholder: 'Annual AC Tune-Up & Preventative Maintenance' },
          { key: 'tuneups_page_hero_description', label: 'Description', type: 'textarea', placeholder: 'Keep your system running at peak efficiency...' },
          { key: 'tuneups_page_hero_primary_button', label: 'Primary Button', type: 'text', placeholder: 'Check If You Qualify — FREE' },
          { key: 'tuneups_page_hero_secondary_button', label: 'Secondary Button', type: 'text', placeholder: 'Call (832) 437-1000' },
          { key: 'tuneups_page_trust_1', label: 'Trust Signal 1', type: 'text', placeholder: 'NATE certified techs' },
          { key: 'tuneups_page_trust_2', label: 'Trust Signal 2', type: 'text', placeholder: '100% satisfaction guaranteed' },
          { key: 'tuneups_page_trust_3', label: 'Trust Signal 3', type: 'text', placeholder: 'Veteran owned' },
        ]
      },
      {
        id: 'info-card',
        title: 'Info Card',
        fields: [
          { key: 'tuneups_page_card_badge', label: 'Badge', type: 'text', placeholder: 'Annual Maintenance' },
          { key: 'tuneups_page_card_title', label: 'Title', type: 'text', placeholder: 'AC Inspection & Tune-Up' },
          { key: 'tuneups_page_card_key_highlight', label: 'Key Highlight', type: 'text', placeholder: 'Any system 1 year or older' },
          { key: 'tuneups_page_card_key_point', label: 'Key Point', type: 'textarea', placeholder: 'should have an annual inspection/tune-up...' },
          { key: 'tuneups_page_card_feature_1', label: 'Feature 1', type: 'text', placeholder: 'Increase system efficiency' },
          { key: 'tuneups_page_card_feature_2', label: 'Feature 2', type: 'text', placeholder: 'Prevent unexpected breakdowns' },
          { key: 'tuneups_page_card_feature_3', label: 'Feature 3', type: 'text', placeholder: 'Ensure adequate cooling' },
          { key: 'tuneups_page_card_feature_4', label: 'Feature 4', type: 'text', placeholder: 'Lower electrical costs' },
          { key: 'tuneups_page_card_contact_label', label: 'Contact Label', type: 'text', placeholder: 'Questions? Contact us:' },
          { key: 'tuneups_page_card_email', label: 'Email', type: 'text', placeholder: 'customerservice@mrairservices.com' },
        ]
      },
      {
        id: 'checklist',
        title: 'Checklist Section',
        fields: [
          { key: 'tuneups_page_checklist_badge', label: 'Badge', type: 'text', placeholder: 'Complete Inspection' },
          { key: 'tuneups_page_checklist_title', label: 'Title', type: 'text', placeholder: 'What We Check' },
          { key: 'tuneups_page_checklist_description', label: 'Description', type: 'textarea', placeholder: 'A thorough inspection that catches problems...' },
          { key: 'tuneups_page_checklist_1', label: 'Item 1', type: 'text', placeholder: 'Inspect refrigerant level' },
          { key: 'tuneups_page_checklist_2', label: 'Item 2', type: 'text', placeholder: 'Inspect and clean condenser coils' },
          { key: 'tuneups_page_checklist_3', label: 'Item 3', type: 'text', placeholder: 'Inspect and clean contactor' },
          { key: 'tuneups_page_checklist_4', label: 'Item 4', type: 'text', placeholder: 'Check and calibrate thermostat' },
          { key: 'tuneups_page_checklist_5', label: 'Item 5', type: 'text', placeholder: 'Inspect airflow for proper specifications' },
          { key: 'tuneups_page_checklist_6', label: 'Item 6', type: 'text', placeholder: 'Inspect the evaporator coil' },
          { key: 'tuneups_page_checklist_7', label: 'Item 7', type: 'text', placeholder: 'Clean electrical and blower compartments' },
          { key: 'tuneups_page_checklist_8', label: 'Item 8', type: 'text', placeholder: 'Tighten electrical connections' },
          { key: 'tuneups_page_checklist_9', label: 'Item 9', type: 'text', placeholder: 'Inspect capacitors and relays' },
          { key: 'tuneups_page_checklist_10', label: 'Item 10', type: 'text', placeholder: 'Inspect all drain lines' },
          { key: 'tuneups_page_checklist_11', label: 'Item 11', type: 'text', placeholder: 'Check compressor for proper amp draw' },
          { key: 'tuneups_page_checklist_12', label: 'Item 12', type: 'text', placeholder: 'Check all motors for proper amp draw' },
          { key: 'tuneups_page_checklist_13', label: 'Item 13', type: 'text', placeholder: 'Oil the motors if required' },
        ]
      },
      {
        id: 'benefits',
        title: 'Benefits Section',
        fields: [
          { key: 'tuneups_page_benefits_title', label: 'Title', type: 'text', placeholder: 'Three Reasons to' },
          { key: 'tuneups_page_benefits_highlight', label: 'Title Highlight', type: 'text', placeholder: 'Act Today' },
          { key: 'tuneups_page_benefits_subtitle', label: 'Subtitle', type: 'text', placeholder: 'Not tomorrow. Not next month. Today.' },
          { key: 'tuneups_page_benefit_1_title', label: 'Benefit 1 Title', type: 'text', placeholder: 'Lower Your Energy Bills' },
          { key: 'tuneups_page_benefit_1_description', label: 'Benefit 1 Description', type: 'textarea', placeholder: 'A clean, well-maintained system...' },
          { key: 'tuneups_page_benefit_2_title', label: 'Benefit 2 Title', type: 'text', placeholder: 'Prevent Costly Repairs' },
          { key: 'tuneups_page_benefit_2_description', label: 'Benefit 2 Description', type: 'textarea', placeholder: 'We catch small issues before...' },
          { key: 'tuneups_page_benefit_3_title', label: 'Benefit 3 Title', type: 'text', placeholder: 'Extend System Lifespan' },
          { key: 'tuneups_page_benefit_3_description', label: 'Benefit 3 Description', type: 'textarea', placeholder: 'A well-maintained system lasts...' },
        ]
      },
    ]
  },

  // =====================================================
  // FINANCING PAGE
  // =====================================================
  'financing-payments': {
    title: 'Financing & Payments',
    description: 'Financing options page with how-it-works and FAQs',
    productionUrl: '/financing-payments',
    sections: [
      {
        id: 'hero',
        title: 'Hero Section',
        fields: [
          { key: 'financing_page_hero_title', label: 'Title', type: 'text', placeholder: "Don't Sweat the Bill" },
          { key: 'financing_page_hero_description', label: 'Description', type: 'textarea', placeholder: "New AC isn't cheap. Neither is sleeping in a 90-degree house..." },
          { key: 'financing_page_hero_subtitle', label: 'Subtitle', type: 'text', placeholder: '5-minute application. Decision before we leave...' },
          { key: 'financing_page_hero_primary_button', label: 'Primary Button', type: 'text', placeholder: 'Apply for Financing' },
          { key: 'financing_page_hero_secondary_button', label: 'Secondary Button', type: 'text', placeholder: 'Call (832) 437-1000' },
          { key: 'financing_page_trust_1', label: 'Trust Signal 1', type: 'text', placeholder: 'Quick Decision' },
          { key: 'financing_page_trust_2', label: 'Trust Signal 2', type: 'text', placeholder: '5-Min Apply' },
          { key: 'financing_page_trust_3', label: 'Trust Signal 3', type: 'text', placeholder: 'No Penalties' },
        ]
      },
      {
        id: 'reality',
        title: 'Reality Section',
        fields: [
          { key: 'financing_page_reality_title', label: 'Title', type: 'text', placeholder: "Don't Let a Big Bill Catch You Off Guard" },
          { key: 'financing_page_reality_description', label: 'Description', type: 'textarea', placeholder: "We get it—nobody budgets for a dead AC..." },
          { key: 'financing_page_without_title', label: 'Without Title', type: 'text', placeholder: 'Without Financing' },
          { key: 'financing_page_without_description', label: 'Without Description', type: 'text', placeholder: 'Big upfront cost. Credit card debt...' },
          { key: 'financing_page_with_title', label: 'With Title', type: 'text', placeholder: 'With Financing' },
          { key: 'financing_page_with_description', label: 'With Description', type: 'text', placeholder: 'Easy monthly payments. Keep your savings...' },
          { key: 'financing_page_stat_value', label: 'Stat Value', type: 'text', placeholder: '5 min' },
          { key: 'financing_page_stat_label', label: 'Stat Label', type: 'text', placeholder: 'to apply' },
          { key: 'financing_page_reality_button', label: 'Button Text', type: 'text', placeholder: 'See Your Payment Options' },
        ]
      },
      {
        id: 'how-it-works',
        title: 'How It Works Section',
        fields: [
          { key: 'financing_page_hiw_badge', label: 'Badge', type: 'text', placeholder: 'Simple Process' },
          { key: 'financing_page_hiw_title', label: 'Title', type: 'text', placeholder: 'How It Works' },
          { key: 'financing_page_hiw_description', label: 'Description', type: 'textarea', placeholder: 'From quote to approval in one visit...' },
          { key: 'financing_page_hiw_button', label: 'Button Text', type: 'text', placeholder: 'Start Your Application' },
          { key: 'financing_page_step_1_title', label: 'Step 1 Title', type: 'text', placeholder: 'Get a Quote' },
          { key: 'financing_page_step_1_description', label: 'Step 1 Description', type: 'text', placeholder: 'We tell you exactly what it costs...' },
          { key: 'financing_page_step_2_title', label: 'Step 2 Title', type: 'text', placeholder: 'Apply in 5 Minutes' },
          { key: 'financing_page_step_2_description', label: 'Step 2 Description', type: 'text', placeholder: 'Your tech helps you right there...' },
          { key: 'financing_page_step_3_title', label: 'Step 3 Title', type: 'text', placeholder: 'Instant Decision' },
          { key: 'financing_page_step_3_description', label: 'Step 3 Description', type: 'text', placeholder: "You'll know before we leave..." },
          { key: 'financing_page_step_4_title', label: 'Step 4 Title', type: 'text', placeholder: 'Stay Comfortable' },
          { key: 'financing_page_step_4_description', label: 'Step 4 Description', type: 'text', placeholder: 'We do the work. You make easy monthly payments...' },
        ]
      },
      {
        id: 'faq',
        title: 'FAQ Section',
        fields: [
          { key: 'financing_page_faq_subtitle', label: 'FAQ Subtitle', type: 'text', placeholder: "Questions about financing? We've got real answers." },
          { key: 'financing_page_faq_1_question', label: 'FAQ 1 Question', type: 'text', placeholder: 'What credit score do I need?' },
          { key: 'financing_page_faq_1_answer', label: 'FAQ 1 Answer', type: 'textarea', placeholder: 'Honestly? We work with a bunch of different lenders...' },
          { key: 'financing_page_faq_2_question', label: 'FAQ 2 Question', type: 'text', placeholder: "What's the interest rate?" },
          { key: 'financing_page_faq_2_answer', label: 'FAQ 2 Answer', type: 'textarea', placeholder: 'Rates depend on your credit profile...' },
          { key: 'financing_page_faq_3_question', label: 'FAQ 3 Question', type: 'text', placeholder: 'How do I apply?' },
          { key: 'financing_page_faq_3_answer', label: 'FAQ 3 Answer', type: 'textarea', placeholder: 'Takes 5 minutes. Your tech can help you...' },
          { key: 'financing_page_faq_4_question', label: 'FAQ 4 Question', type: 'text', placeholder: 'What if I get denied?' },
          { key: 'financing_page_faq_4_answer', label: 'FAQ 4 Answer', type: 'textarea', placeholder: "We've got multiple financing partners..." },
          { key: 'financing_page_faq_5_question', label: 'FAQ 5 Question', type: 'text', placeholder: 'Can I pay it off early?' },
          { key: 'financing_page_faq_5_answer', label: 'FAQ 5 Answer', type: 'textarea', placeholder: 'Yep. No prepayment penalties...' },
          { key: 'financing_page_faq_6_question', label: 'FAQ 6 Question', type: 'text', placeholder: "What's the minimum to finance?" },
          { key: 'financing_page_faq_6_answer', label: 'FAQ 6 Answer', type: 'textarea', placeholder: 'Minimums vary by lender...' },
          { key: 'financing_page_faq_7_question', label: 'FAQ 7 Question', type: 'text', placeholder: 'Any discounts for veterans or seniors?' },
          { key: 'financing_page_faq_7_answer', label: 'FAQ 7 Answer', type: 'textarea', placeholder: "Absolutely. We've got discounts..." },
        ]
      },
      {
        id: 'final-cta',
        title: 'Final CTA Section',
        fields: [
          { key: 'financing_page_cta_title', label: 'Title', type: 'text', placeholder: 'Already a customer with an invoice?' },
          { key: 'financing_page_cta_subtitle', label: 'Subtitle', type: 'text', placeholder: 'Pay your invoice quickly and securely online.' },
          { key: 'financing_page_cta_primary', label: 'Primary Button', type: 'text', placeholder: 'Pay Your Invoice' },
          { key: 'financing_page_cta_secondary', label: 'Secondary Button', type: 'text', placeholder: 'Questions? (832) 437-1000' },
        ]
      },
    ]
  },

  // =====================================================
  // PAY INVOICE PAGE
  // =====================================================
  'pay-invoice': {
    title: 'Pay Invoice',
    description: 'Simple payment page with invoice form',
    productionUrl: '/pay-invoice',
    sections: [
      {
        id: 'main',
        title: 'Main Content',
        fields: [
          { key: 'pay_invoice_title', label: 'Title', type: 'text', placeholder: 'Pay Your Invoice' },
          { key: 'pay_invoice_description', label: 'Description', type: 'textarea', placeholder: 'Quick, secure payment. Takes less than a minute.' },
          { key: 'pay_invoice_trust_1', label: 'Trust Signal 1', type: 'text', placeholder: 'Secure payment' },
          { key: 'pay_invoice_trust_2', label: 'Trust Signal 2', type: 'text', placeholder: 'All cards accepted' },
          { key: 'pay_invoice_trust_3', label: 'Trust Signal 3', type: 'text', placeholder: 'Instant confirmation' },
          { key: 'pay_invoice_help_title', label: 'Help Title', type: 'text', placeholder: 'Need Help?' },
          { key: 'pay_invoice_help_description', label: 'Help Description', type: 'textarea', placeholder: 'Questions about your invoice or payment options?' },
          { key: 'pay_invoice_financing_link', label: 'Financing Link Text', type: 'text', placeholder: 'View financing options' },
        ]
      },
    ]
  },
};

// Helper to get all keys from a page schema
export function getAllKeysFromSchema(slug: string): string[] {
  const schema = pageSchemas[slug];
  if (!schema) return [];

  return schema.sections.flatMap(section =>
    section.fields.map(field => field.key)
  );
}

// Get list of editable pages
export function getEditablePages() {
  return Object.entries(pageSchemas).map(([slug, schema]) => ({
    slug,
    title: schema.title,
    description: schema.description,
    productionUrl: schema.productionUrl,
    fieldCount: schema.sections.reduce((acc, s) => acc + s.fields.length, 0),
  }));
}
