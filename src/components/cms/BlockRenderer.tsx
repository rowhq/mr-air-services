"use client";

import type {
  EditorBlock,
  BlockSettings,
  HeroBlockContent,
  ServicesOverviewBlockContent,
  TestimonialsBlockContent,
  FAQBlockContent,
  FinalCTABlockContent,
  WhyChooseUsBlockContent,
  AreasServedBlockContent,
  TextContentBlockContent,
  ContactInfoBlockContent,
  ImageTextBlockContent,
  StatsGridBlockContent,
  RepairProcessBlockContent,
  HowItWorksBlockContent,
} from "@/types/cms";

// Import section components
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AreasServed } from "@/components/sections/AreasServed";

// Data types from API
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  features: string[];
  cta_text: string;
  cta_link: string;
  is_featured: boolean;
  position: number;
}

interface Testimonial {
  id: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  source: string;
  is_featured: boolean;
}

interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  hours: Record<string, string>;
  is_primary: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  page_slug: string | null;
  position: number;
  is_published: boolean;
}

interface BlockRendererProps {
  blocks: EditorBlock[];
  services?: Service[];
  testimonials?: Testimonial[];
  officeLocations?: OfficeLocation[];
  faqs?: FAQ[];
}

/**
 * BlockRenderer - Renders CMS blocks dynamically with resolved data
 * Now properly passes services, testimonials, and locations to components
 */
export function BlockRenderer({
  blocks,
  services = [],
  testimonials = [],
  officeLocations = [],
  faqs = [],
}: BlockRendererProps) {
  const visibleBlocks = blocks
    .filter((b) => b.isVisible)
    .sort((a, b) => a.position - b.position);

  return (
    <>
      {visibleBlocks.map((block) => (
        <BlockWrapper key={block.id} settings={block.settings}>
          <Block
            block={block}
            services={services}
            testimonials={testimonials}
            officeLocations={officeLocations}
            faqs={faqs}
          />
        </BlockWrapper>
      ))}
    </>
  );
}

interface BlockWrapperProps {
  settings: BlockSettings;
  children: React.ReactNode;
}

function BlockWrapper({ settings, children }: BlockWrapperProps) {
  // Most section components handle their own padding/background
  return <>{children}</>;
}

interface BlockProps {
  block: EditorBlock;
  services: Service[];
  testimonials: Testimonial[];
  officeLocations: OfficeLocation[];
  faqs: FAQ[];
}

function Block({ block, services, testimonials, officeLocations, faqs }: BlockProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlock content={block.content as HeroBlockContent} />;

    case "services-overview":
    case "services-grid":
      return (
        <ServicesOverviewBlock
          content={block.content as ServicesOverviewBlockContent}
          allServices={services}
        />
      );

    case "testimonials":
      return (
        <TestimonialsBlock
          content={block.content as TestimonialsBlockContent}
          allTestimonials={testimonials}
        />
      );

    case "faq":
      return <FAQBlock content={block.content as FAQBlockContent} allFaqs={faqs} />;

    case "final-cta":
      return <FinalCTABlock content={block.content as FinalCTABlockContent} />;

    case "why-choose-us":
      return (
        <WhyChooseUsBlock content={block.content as WhyChooseUsBlockContent} />
      );

    case "areas-served":
      return (
        <AreasServedBlock
          content={block.content as AreasServedBlockContent}
          locations={officeLocations}
        />
      );

    case "text-content":
      return (
        <TextContentBlock content={block.content as TextContentBlockContent} />
      );

    case "contact-info":
      return (
        <ContactInfoBlock
          content={block.content as ContactInfoBlockContent}
          locations={officeLocations}
        />
      );

    case "image-text":
      return (
        <ImageTextBlock content={block.content as ImageTextBlockContent} />
      );

    case "stats-grid":
      return (
        <StatsGridBlock content={block.content as StatsGridBlockContent} />
      );

    case "repair-process":
      return (
        <RepairProcessBlock content={block.content as RepairProcessBlockContent} />
      );

    case "how-it-works":
      return (
        <HowItWorksBlock content={block.content as HowItWorksBlockContent} />
      );

    default:
      if (process.env.NODE_ENV === "development") {
        return (
          <div className="py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="container">
              <p className="text-yellow-800 text-sm">
                Unknown block type: <code>{block.type}</code>
              </p>
            </div>
          </div>
        );
      }
      return null;
  }
}

// Block Components - Transform CMS data to component format

function HeroBlock({ content }: { content: HeroBlockContent }) {
  return <Hero content={content} />;
}

function ServicesOverviewBlock({
  content,
  allServices,
}: {
  content: ServicesOverviewBlockContent;
  allServices: Service[];
}) {
  // Resolve serviceIds to actual services
  let resolvedServices = allServices;

  if (content.serviceIds === "featured") {
    // Filter to featured services only
    resolvedServices = allServices.filter((s) => s.is_featured);
  } else if (Array.isArray(content.serviceIds) && content.serviceIds.length > 0) {
    // Filter to specific IDs
    resolvedServices = allServices.filter((s) =>
      content.serviceIds.includes(s.id)
    );
  }

  // Transform database format to component format
  const serviceItems = resolvedServices.map((s) => ({
    title: s.title,
    description: s.description || s.short_description,
    href: `/services/${s.slug}`,
    cta: s.cta_link,
    ctaLabel: s.cta_text || "Learn More",
    isEmergency: s.slug === "air-conditioning-repair",
    featured: s.slug === "air-conditioning-tune-ups",
    useModal: s.slug === "air-conditioning-tune-ups",
    icon: mapServiceIcon(s.icon),
  }));

  return <ServicesOverview content={content} services={serviceItems} />;
}

// Map database icon names to component icon keys
function mapServiceIcon(icon: string): string {
  const iconMap: Record<string, string> = {
    wrench: "ac-repair",
    settings: "tune-up",
    flame: "heating",
    "plus-circle": "ac-repair",
    wind: "ac-repair",
  };
  return iconMap[icon] || "ac-repair";
}

function TestimonialsBlock({
  content,
  allTestimonials,
}: {
  content: TestimonialsBlockContent;
  allTestimonials: Testimonial[];
}) {
  // Resolve testimonialIds to actual testimonials
  let resolvedTestimonials = allTestimonials;

  if (content.testimonialIds === "featured") {
    // Filter to featured testimonials only
    resolvedTestimonials = allTestimonials.filter((t) => t.is_featured);
  } else if (
    Array.isArray(content.testimonialIds) &&
    content.testimonialIds.length > 0
  ) {
    // Filter to specific IDs
    resolvedTestimonials = allTestimonials.filter((t) =>
      content.testimonialIds.includes(t.id)
    );
  }

  // Transform database format to component format
  const testimonialItems = resolvedTestimonials.map((t) => ({
    id: t.id,
    initials: t.initials,
    location: t.location,
    rating: t.rating,
    text: t.text,
    source: t.source,
  }));

  return <Testimonials content={content} testimonials={testimonialItems} />;
}

function FAQBlock({
  content,
  allFaqs,
}: {
  content: FAQBlockContent;
  allFaqs: FAQ[];
}) {
  // Filter FAQs by categories or page_slug if specified
  let resolvedFaqs = allFaqs;

  if (content.pageSlug) {
    resolvedFaqs = allFaqs.filter((f) => f.page_slug === content.pageSlug);
  }

  if (content.categories && content.categories.length > 0) {
    resolvedFaqs = resolvedFaqs.filter((f) =>
      content.categories.includes(f.category)
    );
  }

  // Limit to maxItems
  if (content.maxItems) {
    resolvedFaqs = resolvedFaqs.slice(0, content.maxItems);
  }

  // Transform to component format
  const faqItems = resolvedFaqs.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));

  return <FAQSection content={content} faqs={faqItems} />;
}

function FinalCTABlock({ content }: { content: FinalCTABlockContent }) {
  return <FinalCTA content={content} />;
}

function WhyChooseUsBlock({ content }: { content: WhyChooseUsBlockContent }) {
  return <WhyChooseUs content={content} />;
}

function AreasServedBlock({
  content,
  locations,
}: {
  content: AreasServedBlockContent;
  locations: OfficeLocation[];
}) {
  // Transform database format to component format (matching OfficeLocation interface)
  const locationItems = locations.map((loc) => ({
    name: loc.name,
    address: loc.address,
    city: loc.city,
    state: loc.state,
    zip: loc.zip,
    coordinates: [loc.latitude || 0, loc.longitude || 0] as [number, number],
  }));

  return <AreasServed content={content} locations={locationItems} />;
}

function TextContentBlock({ content }: { content: TextContentBlockContent }) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div
        className={`container max-w-3xl ${alignmentClasses[content.alignment || "left"]}`}
      >
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
            {content.title}
          </h2>
        )}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </section>
  );
}

function ContactInfoBlock({
  content,
  locations,
}: {
  content: ContactInfoBlockContent;
  locations: OfficeLocation[];
}) {
  const primaryLocation = locations.find((l) => l.is_primary) || locations[0];

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container">
        <div className="text-center mb-12">
          {content.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {content.title}
            </h2>
          )}
          {content.subtitle && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {content.showPhone && primaryLocation && (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Phone</h3>
              <a href={`tel:${primaryLocation.phone}`} className="text-primary hover:underline">
                {primaryLocation.phone}
              </a>
            </div>
          )}

          {content.showEmail && primaryLocation && (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Email</h3>
              <a href={`mailto:${primaryLocation.email}`} className="text-primary hover:underline">
                {primaryLocation.email}
              </a>
            </div>
          )}

          {content.showLocations && primaryLocation && (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Location</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {primaryLocation.city}, {primaryLocation.state}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageTextBlock({ content }: { content: ImageTextBlockContent }) {
  const isImageLeft = content.imagePosition === "left";

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageLeft ? "" : "lg:flex-row-reverse"}`}>
          <div className={isImageLeft ? "order-1" : "order-1 lg:order-2"}>
            <img
              src={content.imageUrl}
              alt={content.imageAlt}
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
          <div className={isImageLeft ? "order-2" : "order-2 lg:order-1"}>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
              {content.title}
            </h2>
            <div
              className="prose prose-lg dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
            {content.showCta && content.ctaText && content.ctaHref && (
              <a
                href={content.ctaHref}
                className="inline-flex items-center mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition"
              >
                {content.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsGridBlock({ content }: { content: StatsGridBlockContent }) {
  const colClasses = {
    "2-col": "grid-cols-2",
    "3-col": "grid-cols-3",
    "4-col": "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container">
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 dark:text-white mb-12">
            {content.title}
          </h2>
        )}
        <div className={`grid ${colClasses[content.layout]} gap-8`}>
          {content.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RepairProcessBlock({ content }: { content: RepairProcessBlockContent }) {
  return (
    <section id="process" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 scroll-mt-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.sectionTitle}
          </h2>
          {content.sectionSubtitle && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {content.sectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.steps.map((step, index) => (
            <div
              key={step.id}
              className="relative bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {step.number || String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
              {step.badge && (
                <span className="inline-flex items-center mt-4 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {step.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksBlock({ content }: { content: HowItWorksBlockContent }) {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.sectionTitle}
          </h2>
          {content.sectionSubtitle && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {content.sectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.steps.map((step, index) => (
            <div key={step.id} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                {step.number || index + 1}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {step.title}
              </h3>
              {step.shortTitle && (
                <p className="text-sm text-primary font-medium mb-2">
                  {step.shortTitle}
                </p>
              )}
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlockRenderer;
