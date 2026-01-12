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
    description: s.short_description || s.description,
    href: `/services/${s.slug}`,
    cta: s.cta_link,
    ctaLabel: s.cta_text || "Learn More",
    isEmergency: s.slug === "air-conditioning-repair",
    featured: s.is_featured,
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

export default BlockRenderer;
