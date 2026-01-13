/**
 * Seed All CMS Pages with Blocks
 *
 * This script populates the production database with all the CMS blocks
 * that should have been inserted by seed.sql but weren't.
 *
 * Run: node scripts/seed-all-pages.mjs
 */

import { sql } from '@vercel/postgres';
import 'dotenv/config';

// Page definitions that should exist (matching production schema)
const pageDefinitions = [
  { slug: 'services', title: 'Services', description: 'Professional HVAC services for Houston homeowners' },
  { slug: 'air-conditioning-repair', title: 'AC Repair', description: 'Fast, reliable AC repair in Houston. 24/7 emergency service.' },
  { slug: 'heating', title: 'Heating Services', description: 'Expert heating repair, maintenance, and installation in Houston.' },
  { slug: 'air-conditioning-tune-ups', title: 'AC Tune-Ups', description: 'Professional AC maintenance to keep your system running efficiently.' },
  { slug: 'air-conditioning-installation', title: 'AC Installation', description: 'Professional AC installation in Houston. New systems and replacements.' },
  { slug: 'indoor-air-quality', title: 'Indoor Air Quality', description: 'Improve your indoor air quality with our solutions.' },
  { slug: 'financing-payments', title: 'Financing & Payments', description: 'Flexible financing options for HVAC services.' },
  { slug: 'pay-invoice', title: 'Pay Invoice', description: 'Pay your invoice online securely.' }
];

// Create missing pages
async function ensurePagesExist() {
  console.log('📄 Checking/creating pages...\n');

  for (const page of pageDefinitions) {
    try {
      // Check if page exists
      const existing = await sql`SELECT id FROM pages WHERE slug = ${page.slug}`;

      if (existing.rows.length === 0) {
        // Create the page
        await sql`
          INSERT INTO pages (slug, title, description, is_published)
          VALUES (${page.slug}, ${page.title}, ${page.description}, true)
        `;
        console.log(`   + Created page: ${page.slug}`);
      } else {
        console.log(`   ✓ Page exists: ${page.slug}`);
      }
    } catch (error) {
      console.error(`   ✗ Error creating ${page.slug}: ${error.message}`);
    }
  }

  console.log('');
}

// Helper to insert blocks for a page
async function seedPage(slug, blocks) {
  try {
    // Get page ID
    const pageResult = await sql`SELECT id FROM pages WHERE slug = ${slug}`;
    if (pageResult.rows.length === 0) {
      console.log(`⚠️  Page "${slug}" not found in database`);
      return false;
    }
    const pageId = pageResult.rows[0].id;

    // Check if page already has blocks
    const existingResult = await sql`SELECT COUNT(*) as count FROM blocks WHERE page_id = ${pageId}`;
    const existingCount = parseInt(existingResult.rows[0].count);

    if (existingCount > 0) {
      console.log(`✓  ${slug}: already has ${existingCount} blocks, skipping`);
      return true;
    }

    // Insert each block
    for (const block of blocks) {
      await sql`
        INSERT INTO blocks (page_id, type, content, settings, position, is_visible)
        VALUES (${pageId}, ${block.type}, ${JSON.stringify(block.content)}, ${JSON.stringify(block.settings)}, ${block.position}, true)
      `;
    }

    console.log(`✓  ${slug}: inserted ${blocks.length} blocks`);
    return true;
  } catch (error) {
    console.error(`✗  ${slug}: Error - ${error.message}`);
    return false;
  }
}

// =====================================================
// PAGE CONTENT DEFINITIONS
// =====================================================

const servicesPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'Our',
      titleHighlight: 'Services',
      subtitle: 'Professional HVAC services for Houston homeowners',
      overlay: 'medium',
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
      sectionTitle: 'What We Do',
      sectionSubtitle: "From repairs to installations, we've got you covered",
      serviceIds: [],
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
      subtitle: 'Schedule your service today.',
      primaryButton: { text: 'Contact Us', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const acRepairPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'AC Repair',
      titleHighlight: 'Houston',
      subtitle: 'When your AC quits, you need it fixed. Fast, fair, done right.',
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'Veteran Owned' },
        { id: '2', icon: 'clock', text: 'Same-Day Service' },
        { id: '3', icon: 'shield', text: 'All Brands' }
      ],
      primaryCta: { text: 'Get Help Now', href: '/contact', variant: 'primary' },
      secondaryCta: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'repair-process',
    position: 1,
    content: {
      sectionTitle: 'How We Work',
      sectionSubtitle: 'No runaround. No surprises.',
      steps: [
        { id: '1', number: '01', title: 'You Call', description: 'We answer and schedule a visit', badge: 'Same day' },
        { id: '2', number: '02', title: 'We Diagnose', description: 'Find the real problem', badge: 'Honest assessment' },
        { id: '3', number: '03', title: 'You Approve', description: 'Know the price before we start', badge: 'No hidden fees' },
        { id: '4', number: '04', title: 'We Fix It', description: 'Quality parts, proper installation', badge: 'Guaranteed' }
      ],
      layout: 'horizontal'
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Common Questions',
      sectionSubtitle: "Straight answers to what you're probably wondering",
      pageSlug: 'air-conditioning-repair',
      categories: ['ac-repair'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'AC Problems?',
      subtitle: "Let's get it fixed. Call now or schedule online.",
      primaryButton: { text: 'Schedule Repair', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const heatingPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'Heating Services',
      titleHighlight: 'Houston',
      subtitle: 'Furnace acting up? Heat pump on the fritz? We fix it.',
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'Veteran Owned' },
        { id: '2', icon: 'certified', text: 'Licensed & Insured' },
        { id: '3', icon: 'shield', text: 'All Systems' }
      ],
      primaryCta: { text: 'Schedule Service', href: '/contact', variant: 'primary' },
      secondaryCta: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'how-it-works',
    position: 1,
    content: {
      sectionTitle: 'Getting Started Is Easy',
      sectionSubtitle: 'From call to comfort in 4 simple steps',
      steps: [
        { id: '1', number: '01', title: 'Contact Us', shortTitle: 'Get in touch', description: 'Call or book online' },
        { id: '2', number: '02', title: 'Pick a Time', shortTitle: 'Schedule your visit', description: 'Same-day available' },
        { id: '3', number: '03', title: 'We Arrive', shortTitle: 'Expert service', description: 'On time, every time' },
        { id: '4', number: '04', title: 'Stay Warm', shortTitle: 'Problem solved', description: 'Guaranteed work' }
      ],
      layout: 'cards'
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Heating FAQs',
      sectionSubtitle: 'What you need to know',
      pageSlug: 'heating',
      categories: ['heating'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'Need Heating Help?',
      subtitle: "Don't freeze—call us today.",
      primaryButton: { text: 'Schedule Service', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const tuneUpsPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'CoolSaver',
      titleHighlight: 'Tune-Ups',
      subtitle: '13-point inspection. Catch problems before they become emergencies.',
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'check', text: '13-Point Inspection' },
        { id: '2', icon: 'shield', text: 'Prevents Breakdowns' },
        { id: '3', icon: 'star', text: 'FREE for Qualifying Homeowners' }
      ],
      primaryCta: { text: 'Check If You Qualify', href: '/contact', variant: 'primary' },
      secondaryCta: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'why-choose-us',
    position: 1,
    content: {
      sectionTitle: "What's Included",
      features: [
        {
          id: '1',
          icon: 'check',
          title: 'Complete Inspection',
          description: 'We check every component of your system—refrigerant levels, electrical connections, airflow, and more.',
          stat: '13',
          statLabel: 'point inspection'
        },
        {
          id: '2',
          icon: 'shield',
          title: 'Prevent Costly Repairs',
          description: "Small problems caught early don't become expensive emergencies later.",
          stat: '90%',
          statLabel: 'of breakdowns preventable'
        },
        {
          id: '3',
          icon: 'leaf',
          title: 'Lower Energy Bills',
          description: 'A tuned-up system runs more efficiently, saving you money every month.',
          stat: '15%',
          statLabel: 'avg energy savings'
        }
      ],
      showImage: false,
      showVeteranBadge: true
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Tune-Up FAQs',
      sectionSubtitle: 'Common questions about AC maintenance',
      pageSlug: 'air-conditioning-tune-ups',
      categories: ['tune-ups'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'Ready for Your Tune-Up?',
      subtitle: "Don't wait for your AC to fail on the hottest day of the year.",
      primaryButton: { text: 'Schedule Tune-Up', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const financingPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'Financing',
      titleHighlight: '& Payments',
      subtitle: "Flexible options to fit your budget. Don't let cost stop you from staying comfortable.",
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'check', text: '0% APR Available' },
        { id: '2', icon: 'clock', text: 'Quick Approval' },
        { id: '3', icon: 'shield', text: 'No Hidden Fees' }
      ],
      primaryCta: { text: 'Apply Now', href: '/contact', variant: 'primary' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'stats-grid',
    position: 1,
    content: {
      title: 'Financing Options',
      stats: [
        { id: '1', value: '0%', label: 'APR Available', icon: 'percent' },
        { id: '2', value: '60', label: 'Month Terms', icon: 'calendar' },
        { id: '3', value: '$0', label: 'Down Payment', icon: 'dollar' },
        { id: '4', value: '2min', label: 'Approval Time', icon: 'clock' }
      ],
      layout: '4-col'
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Financing FAQs',
      sectionSubtitle: 'Common questions about payment options',
      pageSlug: 'financing-payments',
      categories: ['financing'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'Ready to Get Started?',
      subtitle: 'Apply for financing or pay your invoice online.',
      primaryButton: { text: 'Contact Us', href: '/contact' },
      secondaryButton: { text: 'Pay Invoice', href: '/pay-invoice', type: 'link' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const payInvoicePageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'Pay Your',
      titleHighlight: 'Invoice',
      subtitle: 'Quick, secure online payment. Have your invoice number ready.',
      overlay: 'light',
      trustBadges: [
        { id: '1', icon: 'shield', text: 'Secure Payment' },
        { id: '2', icon: 'check', text: 'Instant Confirmation' }
      ],
      primaryCta: { text: 'Pay Now', href: '#payment-form', variant: 'primary' },
      layout: 'centered'
    },
    settings: { padding: 'md', background: 'white' }
  },
  {
    type: 'contact-info',
    position: 1,
    content: {
      title: 'Need Help?',
      subtitle: "Questions about your invoice? We're here to help.",
      showPhone: true,
      showEmail: true,
      showHours: true,
      showLocations: false,
      showMap: false
    },
    settings: { padding: 'lg', background: 'gray' }
  }
];

const acInstallationPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'AC',
      titleHighlight: 'Installation',
      subtitle: "Need a new system? We'll help you choose the right AC for your home and budget.",
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'Veteran Owned' },
        { id: '2', icon: 'check', text: 'Free Estimates' },
        { id: '3', icon: 'dollar', text: 'Financing Available' }
      ],
      primaryCta: { text: 'Get Free Estimate', href: '/contact', variant: 'primary' },
      secondaryCta: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'why-choose-us',
    position: 1,
    content: {
      sectionTitle: 'Why Replace Your AC?',
      features: [
        {
          id: '1',
          icon: 'leaf',
          title: 'Energy Savings',
          description: 'Modern systems use 30-50% less energy than units from 10+ years ago. Lower bills every month.',
          stat: '30-50%',
          statLabel: 'energy savings'
        },
        {
          id: '2',
          icon: 'shield',
          title: 'Reliable Comfort',
          description: 'New systems cool evenly and quietly. No more hot spots or loud cycling.',
          stat: '10yr',
          statLabel: 'warranty'
        },
        {
          id: '3',
          icon: 'check',
          title: 'Peace of Mind',
          description: 'Full manufacturer warranty plus our workmanship guarantee. We stand behind our work.',
          stat: '100%',
          statLabel: 'satisfaction'
        }
      ],
      showImage: false,
      showVeteranBadge: true
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'how-it-works',
    position: 2,
    content: {
      sectionTitle: 'Our Installation Process',
      sectionSubtitle: 'From estimate to cool air in 4 simple steps',
      steps: [
        { id: '1', number: '01', title: 'Free Estimate', shortTitle: 'We assess your home', description: 'Calculate exact needs' },
        { id: '2', number: '02', title: 'Choose System', shortTitle: 'Pick your brand', description: 'Top brands available' },
        { id: '3', number: '03', title: 'Install Day', shortTitle: 'Professional setup', description: 'Usually one day' },
        { id: '4', number: '04', title: 'Stay Cool', shortTitle: 'Enjoy comfort', description: 'Full warranty' }
      ],
      layout: 'cards'
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'faq',
    position: 3,
    content: {
      sectionTitle: 'Installation FAQs',
      sectionSubtitle: 'Common questions about getting a new AC',
      pageSlug: 'air-conditioning-installation',
      categories: ['ac-installation'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'final-cta',
    position: 4,
    content: {
      title: 'Ready for a New AC?',
      subtitle: 'Get a free estimate. No pressure, no obligation.',
      primaryButton: { text: 'Get Free Estimate', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

const indoorAirQualityPageBlocks = [
  {
    type: 'hero',
    position: 0,
    content: {
      title: 'Indoor Air',
      titleHighlight: 'Quality',
      subtitle: 'Breathe easier at home. Air purification, humidity control, and ventilation solutions.',
      overlay: 'medium',
      trustBadges: [
        { id: '1', icon: 'badge', text: 'Veteran Owned' },
        { id: '2', icon: 'shield', text: 'Healthier Air' },
        { id: '3', icon: 'check', text: 'Expert Solutions' }
      ],
      primaryCta: { text: 'Improve Your Air', href: '/contact', variant: 'primary' },
      secondaryCta: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      layout: 'left-aligned'
    },
    settings: { padding: 'lg', background: 'dark' }
  },
  {
    type: 'why-choose-us',
    position: 1,
    content: {
      sectionTitle: 'Air Quality Solutions',
      features: [
        {
          id: '1',
          icon: 'air',
          title: 'Air Purification',
          description: "Remove allergens, bacteria, and viruses from your home's air with advanced filtration systems.",
          stat: '99%',
          statLabel: 'particles removed'
        },
        {
          id: '2',
          icon: 'humidity',
          title: 'Humidity Control',
          description: 'Balance humidity for comfort and health. Prevent mold growth and dry air problems.',
          stat: '30-50%',
          statLabel: 'ideal humidity'
        },
        {
          id: '3',
          icon: 'duct',
          title: 'Duct Cleaning',
          description: 'Remove years of dust, debris, and contaminants from your ductwork for cleaner air flow.',
          stat: '3-5yr',
          statLabel: 'recommended'
        }
      ],
      showImage: false,
      showVeteranBadge: true
    },
    settings: { padding: 'lg', background: 'white' }
  },
  {
    type: 'faq',
    position: 2,
    content: {
      sectionTitle: 'Air Quality FAQs',
      sectionSubtitle: 'Common questions about improving your indoor air',
      pageSlug: 'indoor-air-quality',
      categories: ['air-quality'],
      layout: 'accordion',
      maxItems: 10
    },
    settings: { padding: 'lg', background: 'gray' }
  },
  {
    type: 'final-cta',
    position: 3,
    content: {
      title: 'Ready to Breathe Easier?',
      subtitle: "Let us assess your home's air quality and recommend solutions.",
      primaryButton: { text: 'Get Assessment', href: '/contact' },
      secondaryButton: { text: '(832) 437-1000', href: 'tel:+18324371000', type: 'phone' },
      background: 'gradient'
    },
    settings: { padding: 'lg', background: 'gradient' }
  }
];

// =====================================================
// MAIN EXECUTION
// =====================================================

async function main() {
  console.log('\n🚀 Starting CMS Page Seeding...\n');

  // First, ensure all pages exist
  await ensurePagesExist();

  console.log('📦 Inserting blocks...\n');
  console.log('=' .repeat(50));

  const results = [];

  // Seed each page
  results.push(await seedPage('services', servicesPageBlocks));
  results.push(await seedPage('air-conditioning-repair', acRepairPageBlocks));
  results.push(await seedPage('heating', heatingPageBlocks));
  results.push(await seedPage('air-conditioning-tune-ups', tuneUpsPageBlocks));
  results.push(await seedPage('financing-payments', financingPageBlocks));
  results.push(await seedPage('pay-invoice', payInvoicePageBlocks));
  results.push(await seedPage('air-conditioning-installation', acInstallationPageBlocks));
  results.push(await seedPage('indoor-air-quality', indoorAirQualityPageBlocks));

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
      'air-conditioning-tune-ups', 'financing-payments', 'pay-invoice',
      'air-conditioning-installation', 'indoor-air-quality'
    )
    GROUP BY p.slug
    ORDER BY p.slug
  `;

  for (const row of verification.rows) {
    const status = row.block_count > 0 ? '✓' : '✗';
    console.log(`   ${status} ${row.slug}: ${row.block_count} blocks`);
  }

  console.log('\n🎉 Done!\n');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
