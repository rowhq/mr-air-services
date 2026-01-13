/**
 * Restore Service Pages with Original Content (CMS Editable)
 *
 * This script:
 * 1. Removes incorrectly created pages (AC Installation, Indoor Air Quality)
 * 2. Clears existing generic blocks from correct pages
 * 3. Inserts detailed blocks matching the original hardcoded content
 *
 * Run: DOTENV_CONFIG_PATH=.env.local node -r dotenv/config scripts/seed-all-pages.mjs
 */

import { sql } from '@vercel/postgres';
import 'dotenv/config';

// =====================================================
// CLEANUP FUNCTIONS
// =====================================================

async function cleanupIncorrectPages() {
  console.log('\n🧹 Cleaning up incorrect pages...\n');

  const incorrectSlugs = ['air-conditioning-installation', 'indoor-air-quality'];

  for (const slug of incorrectSlugs) {
    try {
      // First delete blocks for this page
      const pageResult = await sql`SELECT id FROM pages WHERE slug = ${slug}`;
      if (pageResult.rows.length > 0) {
        const pageId = pageResult.rows[0].id;
        await sql`DELETE FROM blocks WHERE page_id = ${pageId}`;
        await sql`DELETE FROM pages WHERE id = ${pageId}`;
        console.log(`   ✓ Deleted page: ${slug}`);
      } else {
        console.log(`   - Page ${slug} doesn't exist (OK)`);
      }
    } catch (error) {
      console.error(`   ✗ Error deleting ${slug}: ${error.message}`);
    }
  }
}

async function clearExistingBlocks(slug) {
  try {
    const pageResult = await sql`SELECT id FROM pages WHERE slug = ${slug}`;
    if (pageResult.rows.length === 0) return;

    const pageId = pageResult.rows[0].id;
    const result = await sql`DELETE FROM blocks WHERE page_id = ${pageId}`;
    console.log(`   - Cleared existing blocks from ${slug}`);
  } catch (error) {
    console.error(`   ✗ Error clearing blocks from ${slug}: ${error.message}`);
  }
}

// =====================================================
// SEED FUNCTION
// =====================================================

async function seedPage(slug, blocks) {
  try {
    // Ensure page exists
    let pageResult = await sql`SELECT id FROM pages WHERE slug = ${slug}`;

    if (pageResult.rows.length === 0) {
      // Create the page
      await sql`
        INSERT INTO pages (slug, title, description, is_published)
        VALUES (${slug}, ${blocks[0]?.pageTitle || slug}, ${blocks[0]?.pageDescription || ''}, true)
      `;
      pageResult = await sql`SELECT id FROM pages WHERE slug = ${slug}`;
      console.log(`   + Created page: ${slug}`);
    }

    const pageId = pageResult.rows[0].id;

    // Clear existing blocks
    await sql`DELETE FROM blocks WHERE page_id = ${pageId}`;

    // Insert new blocks
    for (const block of blocks) {
      await sql`
        INSERT INTO blocks (page_id, type, content, settings, position, is_visible)
        VALUES (${pageId}, ${block.type}, ${JSON.stringify(block.content)}, ${JSON.stringify(block.settings || {})}, ${block.position}, true)
      `;
    }

    console.log(`   ✓ ${slug}: inserted ${blocks.length} blocks`);
    return true;
  } catch (error) {
    console.error(`   ✗ ${slug}: Error - ${error.message}`);
    return false;
  }
}

// =====================================================
// PAGE CONTENT - SERVICES (Main Page)
// =====================================================

const servicesPageBlocks = [
  {
    pageTitle: 'Services',
    pageDescription: 'Professional HVAC services for Houston homeowners',
    type: 'hero',
    position: 0,
    content: {
      title: 'HVAC',
      titleHighlight: 'Services',
      subtitle: 'From emergency repairs to preventive maintenance. Same-day service available.',
      overlay: 'dark',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'Veteran Owned' },
        { id: '2', icon: 'license', text: 'TX Licensed' },
        { id: '3', icon: 'shield', text: 'Fully Insured' }
      ],
      primaryCta: { text: 'Get a Quote', href: '/contact', variant: 'primary' },
      layout: 'centered'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'services-grid',
    position: 1,
    content: {
      sectionTitle: '',
      sectionSubtitle: '',
      serviceIds: 'featured',
      layout: '3-col',
      showCta: true
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'final-cta',
    position: 2,
    content: {
      title: 'Ready to Get Started?',
      subtitle: 'Schedule your service today and experience the Mr. Air difference.',
      primaryButton: { text: 'Contact Us', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// PAGE CONTENT - AC REPAIR
// =====================================================

const acRepairPageBlocks = [
  {
    pageTitle: 'AC Repair',
    pageDescription: 'Fast, reliable AC repair in Houston. Same-day service available.',
    type: 'hero',
    position: 0,
    content: {
      title: "AC Dead?",
      titleHighlight: "We're On It.",
      subtitle: "Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.",
      backgroundImage: '/images/services/diagnostics-repairs.webp',
      overlay: 'dark',
      trustBadges: [
        { id: '1', icon: 'clock', text: 'Same-day service' },
        { id: '2', icon: 'shield', text: 'All brands serviced' },
        { id: '3', icon: 'check', text: 'No hidden fees' }
      ],
      primaryCta: { text: 'Schedule AC Repair', href: '/contact', variant: 'secondary' },
      secondaryCta: { text: 'Call (832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'brand-logos',
    position: 1,
    content: {
      sectionTitle: 'We service:',
      brands: [
        { id: '1', name: 'Ruud', logo: '/images/brands/ruud.svg' },
        { id: '2', name: 'Lennox', logo: '/images/brands/lennox.svg' },
        { id: '3', name: 'Goodman', logo: '/images/brands/goodman.svg' },
        { id: '4', name: 'Trane', logo: '/images/brands/trane.svg' },
        { id: '5', name: 'American Standard', logo: '/images/brands/american-standard.svg' },
        { id: '6', name: 'Carrier', logo: '/images/brands/carrier.svg' }
      ],
      layout: 'inline'
    },
    settings: { padding: 'sm', background: 'gray' }
  },
  {
    type: 'problem-grid',
    position: 2,
    content: {
      sectionTitle: 'Common AC Problems We Fix',
      sectionSubtitle: 'With years of Houston experience, we diagnose and repair these issues daily',
      problems: [
        { id: '1', title: 'AC Not Cooling', description: 'Refrigerant leaks, compressor issues, or airflow problems', icon: 'snowflake' },
        { id: '2', title: 'Strange Noises', description: 'Grinding, squealing, or banging sounds from your unit', icon: 'volume' },
        { id: '3', title: "Won't Turn On", description: 'Electrical, thermostat, or capacitor failures', icon: 'power' },
        { id: '4', title: 'Frozen Coils', description: 'Ice buildup from restricted airflow or low refrigerant', icon: 'ice' },
        { id: '5', title: 'Water Leaks', description: 'Clogged drain lines or damaged condensate pans', icon: 'droplet' },
        { id: '6', title: 'High Energy Bills', description: 'Inefficient operation or failing components', icon: 'chart' }
      ],
      layout: '3-col'
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 3,
    content: {
      sectionTitle: 'Common Questions',
      sectionSubtitle: '',
      categories: [],
      pageSlug: 'air-conditioning-repair',
      layout: 'accordion',
      maxItems: 4
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 4,
    content: {
      title: 'AC Emergency?',
      subtitle: "Don't sweat it. We offer same-day service for urgent repairs.",
      primaryButton: { text: 'Get Help Now', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// PAGE CONTENT - HEATING
// =====================================================

const heatingPageBlocks = [
  {
    pageTitle: 'Heating Services',
    pageDescription: 'Expert heating repair, maintenance, and installation in Houston.',
    type: 'hero',
    position: 0,
    content: {
      title: "Heat Out?",
      titleHighlight: "We're On It.",
      subtitle: "Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.",
      backgroundImage: '/images/services/heating-services.webp',
      overlay: 'dark',
      trustBadges: [
        { id: '1', icon: 'clock', text: '24/7 emergency' },
        { id: '2', icon: 'shield', text: 'All systems' },
        { id: '3', icon: 'badge', text: 'Veteran Owned' }
      ],
      primaryCta: { text: 'Schedule Heating Service', href: '/contact', variant: 'secondary' },
      secondaryCta: { text: 'Call (832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'why-choose-us',
    position: 1,
    content: {
      sectionTitle: 'Everything Heating',
      features: [
        {
          id: '1',
          icon: 'wrench',
          title: 'Heating Repair',
          description: "We fix furnaces, heat pumps, all brands. Same-day emergency service available.",
          stat: '24/7',
          statLabel: 'emergency'
        },
        {
          id: '2',
          icon: 'plus',
          title: 'New Installation',
          description: "Need a new system? We help you pick the right size for your home. Financing available.",
          stat: 'Free',
          statLabel: 'estimates'
        }
      ],
      showImage: false,
      showVeteranBadge: false
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'inspection-phases',
    position: 2,
    content: {
      sectionTitle: 'Our Heating Tune-Up Process',
      sectionSubtitle: 'Comprehensive inspection to keep you safe and warm',
      phases: [
        {
          id: '1',
          name: 'Safety',
          icon: 'shield',
          items: [
            'We check all safety switches work',
            'We look for dangerous gas leaks',
            'Carbon monoxide detector test',
            'Gas lines and vents inspection'
          ]
        },
        {
          id: '2',
          name: 'Performance',
          icon: 'zap',
          items: [
            'We test all electrical connections',
            'We verify it heats properly',
            'We adjust the flame and fan',
            'We clean the burners'
          ]
        },
        {
          id: '3',
          name: 'Efficiency',
          icon: 'chart',
          items: [
            'Thermostat accuracy check',
            'Filter replacement if needed',
            'Efficiency rating assessment',
            'Personalized recommendations'
          ]
        }
      ]
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'faq',
    position: 3,
    content: {
      sectionTitle: 'Heating FAQs',
      sectionSubtitle: '',
      categories: [],
      pageSlug: 'heating',
      layout: 'accordion',
      maxItems: 4
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'final-cta',
    position: 4,
    content: {
      title: 'Need Heating Help?',
      subtitle: "Don't freeze—call us today for fast, reliable heating service.",
      primaryButton: { text: 'Schedule Service', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// PAGE CONTENT - AC TUNE-UPS
// =====================================================

const tuneUpsPageBlocks = [
  {
    pageTitle: 'CoolSaver Tune-Ups',
    pageDescription: 'Professional AC maintenance to keep your system running efficiently.',
    type: 'hero',
    position: 0,
    content: {
      title: 'CoolSaver',
      titleHighlight: 'Tune-Ups',
      subtitle: '13-point inspection. Catch problems before they become emergencies. FREE for qualifying homeowners.',
      overlay: 'dark',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'NATE certified techs' },
        { id: '2', icon: 'check', text: '100% satisfaction' },
        { id: '3', icon: 'shield', text: 'Veteran owned' }
      ],
      primaryCta: { text: 'Check If You Qualify', href: '/contact', variant: 'primary' },
      secondaryCta: { text: 'Call (832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'centered'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'checklist-grid',
    position: 1,
    content: {
      sectionTitle: 'What We Check',
      sectionSubtitle: 'Our comprehensive 13-point inspection covers every critical component',
      items: [
        'Inspect refrigerant level',
        'Inspect and clean condenser coils',
        'Inspect and clean contactor',
        'Check and calibrate thermostat',
        'Inspect airflow for proper specifications',
        'Inspect the evaporator coil',
        'Clean electrical and blower compartments',
        'Tighten electrical connections',
        'Inspect capacitors and relays',
        'Inspect all drain lines',
        'Check compressor for proper amp draw',
        'Check all motors for proper amp draw',
        'Oil the motors if required'
      ],
      initialVisibleCount: 8,
      showExpandButton: true
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'benefits-grid',
    position: 2,
    content: {
      sectionTitle: 'Why Get a Tune-Up?',
      sectionSubtitle: 'Regular maintenance pays for itself',
      benefits: [
        {
          id: '1',
          title: 'Lower Your Energy Bills',
          description: 'A well-maintained AC runs more efficiently, using less energy to cool your home.',
          icon: 'dollar'
        },
        {
          id: '2',
          title: 'Prevent Costly Repairs',
          description: 'Catch small issues before they turn into expensive emergency repairs.',
          icon: 'shield'
        },
        {
          id: '3',
          title: 'Extend System Lifespan',
          description: 'Regular maintenance can add years to your AC system, protecting your investment.',
          icon: 'clock'
        }
      ],
      layout: '3-col'
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'faq',
    position: 3,
    content: {
      sectionTitle: 'Tune-Up FAQs',
      sectionSubtitle: '',
      categories: [],
      pageSlug: 'air-conditioning-tune-ups',
      layout: 'accordion',
      maxItems: 4
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'final-cta',
    position: 4,
    content: {
      title: 'Ready for Your Tune-Up?',
      subtitle: 'Schedule your 13-point inspection today. FREE for qualifying homeowners.',
      primaryButton: { text: 'Check If You Qualify', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// PAGE CONTENT - FINANCING
// =====================================================

const financingPageBlocks = [
  {
    pageTitle: 'Financing & Payments',
    pageDescription: 'Flexible financing options for HVAC services.',
    type: 'hero',
    position: 0,
    content: {
      title: 'Flexible',
      titleHighlight: 'Financing',
      subtitle: "Don't let cost stop you from staying comfortable. Flexible options to fit your budget.",
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'check', text: '0% APR Available' },
        { id: '2', icon: 'clock', text: 'Quick Approval' },
        { id: '3', icon: 'shield', text: 'No Hidden Fees' }
      ],
      primaryCta: { text: 'Apply Now', href: '/contact', variant: 'primary' },
      layout: 'centered'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'stats-grid',
    position: 1,
    content: {
      title: '',
      stats: [
        { id: '1', value: '0%', label: 'APR Available' },
        { id: '2', value: '60', label: 'Month Terms' },
        { id: '3', value: '$0', label: 'Down Payment' },
        { id: '4', value: '2min', label: 'Approval Time' }
      ],
      layout: '4-col'
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Common Questions',
      sectionSubtitle: 'About payment options',
      categories: [],
      pageSlug: 'financing-payments',
      layout: 'accordion',
      maxItems: 4
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'Ready to Get Started?',
      subtitle: 'Apply for financing in minutes. No obligation.',
      primaryButton: { text: 'Contact Us', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// PAGE CONTENT - PAY INVOICE
// =====================================================

const payInvoicePageBlocks = [
  {
    pageTitle: 'Pay Invoice',
    pageDescription: 'Pay your invoice online securely.',
    type: 'hero',
    position: 0,
    content: {
      title: 'Pay Your',
      titleHighlight: 'Invoice',
      subtitle: 'Quick, secure online payment. Have your invoice number ready.',
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'shield', text: 'Secure Payment' },
        { id: '2', icon: 'check', text: 'Instant Confirmation' }
      ],
      primaryCta: { text: 'Pay Now', href: '#payment-form', variant: 'primary' },
      layout: 'centered'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'contact-info',
    position: 1,
    content: {
      title: 'Need Help?',
      subtitle: 'Contact us if you have questions about your invoice',
      showPhone: true,
      showEmail: true,
      showHours: false,
      showLocations: false,
      showMap: false
    },
    settings: { padding: 'lg', background: 'gray' }
  }
];

// =====================================================
// MAIN EXECUTION
// =====================================================

async function main() {
  console.log('\n🚀 Restoring Service Pages with Original Content...\n');

  // Step 1: Clean up incorrect pages
  await cleanupIncorrectPages();

  // Step 2: Seed correct pages with detailed content
  console.log('\n📦 Inserting detailed blocks...\n');
  console.log('=' .repeat(50));

  const results = [];

  results.push(await seedPage('services', servicesPageBlocks));
  results.push(await seedPage('air-conditioning-repair', acRepairPageBlocks));
  results.push(await seedPage('heating', heatingPageBlocks));
  results.push(await seedPage('air-conditioning-tune-ups', tuneUpsPageBlocks));
  results.push(await seedPage('financing-payments', financingPageBlocks));
  results.push(await seedPage('pay-invoice', payInvoicePageBlocks));

  console.log('=' .repeat(50));

  const successCount = results.filter(r => r).length;
  const totalCount = results.length;

  console.log(`\n✅ Completed: ${successCount}/${totalCount} pages processed`);

  // Verification query
  console.log('\n📊 Verification - Block counts per page:\n');

  const verification = await sql`
    SELECT p.slug, COUNT(b.id)::int as block_count
    FROM pages p
    LEFT JOIN blocks b ON p.id = b.page_id
    WHERE p.slug IN (
      'services', 'air-conditioning-repair', 'heating',
      'air-conditioning-tune-ups', 'financing-payments', 'pay-invoice'
    )
    GROUP BY p.slug
    ORDER BY p.slug
  `;

  for (const row of verification.rows) {
    const status = row.block_count > 0 ? '✓' : '✗';
    console.log(`   ${status} ${row.slug}: ${row.block_count} blocks`);
  }

  // Verify incorrect pages are gone
  console.log('\n🔍 Verifying cleanup:\n');
  const cleanupCheck = await sql`
    SELECT slug FROM pages WHERE slug IN ('air-conditioning-installation', 'indoor-air-quality')
  `;

  if (cleanupCheck.rows.length === 0) {
    console.log('   ✓ Incorrect pages removed successfully');
  } else {
    console.log('   ✗ Some incorrect pages still exist:', cleanupCheck.rows.map(r => r.slug));
  }

  console.log('\n🎉 Done!\n');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
