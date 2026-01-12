// Script to sync CMS content with real website content
// Uses @vercel/postgres

import { sql } from '@vercel/postgres';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '..', '.env.local') });

async function syncContent() {
  console.log('Starting CMS content sync...\n');

  try {
    // Get home page ID
    const { rows: homePages } = await sql`SELECT id FROM pages WHERE slug = 'home'`;
    let homePageId;

    if (homePages.length === 0) {
      console.log('Home page not found. Creating it...');
      const { rows: newPages } = await sql`
        INSERT INTO pages (title, slug, is_published)
        VALUES ('Home', 'home', TRUE)
        RETURNING id
      `;
      homePageId = newPages[0].id;
    } else {
      homePageId = homePages[0].id;
    }

    console.log(`Home page ID: ${homePageId}\n`);

    // =====================================================
    // UPDATE HERO BLOCK
    // =====================================================
    console.log('Updating Hero block...');
    const heroContent = JSON.stringify({
      title: "Free AC Tune-Ups for",
      titleHighlight: "Qualifying Homeowners",
      subtitle: "Your electric company charges you for this. Let us help you actually use it.",
      overlay: "medium",
      trustBadges: [
        { id: "1", icon: "badge", text: "Veteran Owned" },
        { id: "2", icon: "license", text: "TX Licensed" },
        { id: "3", icon: "shield", text: "EPA Certified" },
        { id: "4", icon: "check", text: "Fully Insured" }
      ],
      primaryCta: {
        text: "Check If You Qualify",
        href: "/contact",
        variant: "primary"
      },
      secondaryCta: {
        text: "(832) 437-1000",
        href: "tel:+18324371000",
        type: "phone"
      },
      layout: "left-aligned"
    });

    await sql`
      UPDATE blocks
      SET content = ${heroContent}::jsonb
      WHERE page_id = ${homePageId}
        AND type = 'hero'
    `;
    console.log('  Hero updated!');

    // =====================================================
    // UPDATE WHY CHOOSE US BLOCK
    // =====================================================
    console.log('Updating Why Choose Us block...');
    const whyChooseUsContent = JSON.stringify({
      sectionTitle: "Why People Call Us Back",
      features: [
        {
          id: "1",
          icon: "certified",
          title: "Experienced Pros",
          description: "Our guys show up on time, explain what's wrong in plain English, and fix it right. All major brands.",
          stat: "98%",
          statLabel: "on-time rate"
        },
        {
          id: "2",
          icon: "pricing",
          title: "Upfront Pricing",
          description: "We tell you what it costs before we touch anything. The price we quote is the price you pay.",
          stat: "$0",
          statLabel: "hidden fees"
        },
        {
          id: "3",
          icon: "guarantee",
          title: "Guaranteed Work",
          description: "Not happy? We come back. No arguments, no runaround. That's how we've kept customers for 15 years.",
          stat: "4.9/5",
          statLabel: "avg rating"
        }
      ],
      showImage: true,
      imageUrl: "/images/financing/technician-helping.jpg",
      showVeteranBadge: true
    });

    await sql`
      UPDATE blocks
      SET content = ${whyChooseUsContent}::jsonb
      WHERE page_id = ${homePageId}
        AND type = 'why-choose-us'
    `;
    console.log('  Why Choose Us updated!');

    // =====================================================
    // UPDATE SERVICES OVERVIEW BLOCK
    // =====================================================
    console.log('Updating Services Overview block...');
    const servicesContent = JSON.stringify({
      sectionTitle: "When It Breaks, We Fix It.",
      sectionSubtitle: "Before It Breaks, We Catch It.",
      serviceIds: "featured",
      layout: "3-col",
      showCta: true
    });

    await sql`
      UPDATE blocks
      SET content = ${servicesContent}::jsonb
      WHERE page_id = ${homePageId}
        AND type = 'services-overview'
    `;
    console.log('  Services Overview updated!');

    // =====================================================
    // UPDATE TESTIMONIALS BLOCK
    // =====================================================
    console.log('Updating Testimonials block...');
    const testimonialsContent = JSON.stringify({
      sectionTitle: "What Our Customers Say",
      testimonialIds: "featured",
      layout: "grid",
      maxItems: 3,
      showSource: true
    });

    await sql`
      UPDATE blocks
      SET content = ${testimonialsContent}::jsonb
      WHERE page_id = ${homePageId}
        AND type = 'testimonials'
    `;
    console.log('  Testimonials updated!');

    // =====================================================
    // UPDATE FINAL CTA BLOCK
    // =====================================================
    console.log('Updating Final CTA block...');
    const finalCtaContent = JSON.stringify({
      title: "Let's Get Your AC Sorted",
      subtitle: "AC acting up? Heater making weird noises? Or just want someone to check things out? Give us a call.",
      primaryButton: {
        text: "Schedule Your Service",
        href: "/contact"
      },
      secondaryButton: {
        text: "(832) 437-1000",
        href: "tel:+18324371000",
        type: "phone"
      },
      background: "gradient"
    });

    await sql`
      UPDATE blocks
      SET content = ${finalCtaContent}::jsonb
      WHERE page_id = ${homePageId}
        AND type = 'final-cta'
    `;
    console.log('  Final CTA updated!');

    // =====================================================
    // UPDATE NAVIGATION - HEADER
    // =====================================================
    console.log('\nUpdating Header navigation...');
    await sql`DELETE FROM navigation_items WHERE location = 'header'`;

    await sql`
      INSERT INTO navigation_items (location, label, href, position, is_external, is_visible)
      VALUES
        ('header', 'Home', '/', 0, FALSE, TRUE),
        ('header', 'Services', '/services', 1, FALSE, TRUE),
        ('header', 'Financing', '/financing-payments', 2, FALSE, TRUE),
        ('header', 'Pay Invoice', '/pay-invoice', 3, FALSE, TRUE),
        ('header', 'Contact', '/contact', 4, FALSE, TRUE)
    `;
    console.log('  Header navigation updated!');

    // =====================================================
    // UPDATE NAVIGATION - FOOTER
    // =====================================================
    console.log('Updating Footer navigation...');
    await sql`DELETE FROM navigation_items WHERE location = 'footer'`;

    await sql`
      INSERT INTO navigation_items (location, label, href, position, is_external, is_visible)
      VALUES
        ('footer', 'AC Repair', '/services/air-conditioning-repair', 0, FALSE, TRUE),
        ('footer', 'Tune-Ups', '/services/air-conditioning-tune-ups', 1, FALSE, TRUE),
        ('footer', 'Heating', '/services/heating', 2, FALSE, TRUE),
        ('footer', 'Contact', '/contact', 3, FALSE, TRUE),
        ('footer', 'Financing', '/financing-payments', 4, FALSE, TRUE),
        ('footer', 'Pay Invoice', '/pay-invoice', 5, FALSE, TRUE),
        ('footer', 'Privacy Policy', '/privacy-policy', 6, FALSE, TRUE),
        ('footer', 'Terms of Use', '/terms-of-use', 7, FALSE, TRUE)
    `;
    console.log('  Footer navigation updated!');

    // =====================================================
    // VERIFY
    // =====================================================
    console.log('\n--- Verification ---');

    const { rows: heroBlocks } = await sql`
      SELECT content->>'title' as title, content->>'titleHighlight' as highlight
      FROM blocks
      WHERE page_id = ${homePageId} AND type = 'hero'
    `;
    if (heroBlocks[0]) {
      console.log(`Hero: "${heroBlocks[0].title}" "${heroBlocks[0].highlight}"`);
    }

    const { rows: headerNav } = await sql`
      SELECT label, href FROM navigation_items
      WHERE location = 'header'
      ORDER BY position
    `;
    console.log(`Header Nav: ${headerNav.map(n => n.label).join(', ')}`);

    console.log('\n CMS content synced successfully!');

  } catch (error) {
    console.error('Error syncing content:', error);
    throw error;
  }
}

syncContent();
