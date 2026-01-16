"use client";

import React from "react";
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
  // New block types
  LegalContentBlockContent,
  ContactFormBlockContent,
  BrandLogosBlockContent,
  ProblemGridBlockContent,
  WarningSignsBlockContent,
  InspectionPhasesBlockContent,
  ChecklistGridBlockContent,
  BenefitsGridBlockContent,
  ComparisonSectionBlockContent,
  PaymentFormBlockContent,
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

interface BlockRendererProps {
  blocks: EditorBlock[];
  services?: Service[];
  testimonials?: Testimonial[];
  officeLocations?: OfficeLocation[];
  // Editing mode props for click-to-select
  isEditing?: boolean;
  selectedBlockId?: string | null;
  hoveredBlockId?: string | null;
  onBlockClick?: (id: string) => void;
  onBlockHover?: (id: string | null) => void;
}

/**
 * BlockRenderer - Renders CMS blocks dynamically with resolved data
 * Now properly passes services, testimonials, and locations to components
 * Supports click-to-select in editing mode
 */
export function BlockRenderer({
  blocks,
  services = [],
  testimonials = [],
  officeLocations = [],
  isEditing = false,
  selectedBlockId,
  hoveredBlockId,
  onBlockClick,
  onBlockHover,
}: BlockRendererProps) {
  const visibleBlocks = blocks
    .filter((b) => b.isVisible)
    .sort((a, b) => a.position - b.position);

  return (
    <>
      {visibleBlocks.map((block) => {
        const isSelected = selectedBlockId === block.id;
        const isHovered = hoveredBlockId === block.id;

        const blockContent = (
          <BlockWrapper key={block.id} settings={block.settings}>
            <Block
              block={block}
              services={services}
              testimonials={testimonials}
              officeLocations={officeLocations}
            />
          </BlockWrapper>
        );

        // In editing mode, wrap with clickable overlay
        if (isEditing) {
          return (
            <div
              key={block.id}
              className={`relative transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : isHovered
                    ? "ring-2 ring-blue-300 ring-offset-1"
                    : ""
              }`}
              onClick={() => onBlockClick?.(block.id)}
              onMouseEnter={() => onBlockHover?.(block.id)}
              onMouseLeave={() => onBlockHover?.(null)}
            >
              {/* Selection indicator label */}
              {(isSelected || isHovered) && (
                <div
                  className={`absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium rounded z-10 ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-blue-300 text-blue-900"
                  }`}
                >
                  {getBlockLabel(block.type)}
                </div>
              )}
              {blockContent}
            </div>
          );
        }

        return blockContent;
      })}
    </>
  );
}

// Helper to get human-readable block labels
function getBlockLabel(type: string): string {
  const labels: Record<string, string> = {
    hero: "Hero",
    "services-overview": "Services",
    "services-grid": "Services Grid",
    testimonials: "Testimonials",
    faq: "FAQ",
    "why-choose-us": "Why Choose Us",
    "areas-served": "Areas Served",
    "final-cta": "Call to Action",
    "text-content": "Text Block",
    "image-text": "Image + Text",
    "stats-grid": "Stats",
    "contact-info": "Contact Info",
    "repair-process": "Repair Process",
    "how-it-works": "How It Works",
    "legal-content": "Legal Content",
    "contact-form": "Contact Form",
    "brand-logos": "Brand Logos",
    "problem-grid": "Problem Grid",
    "warning-signs": "Warning Signs",
    "inspection-phases": "Inspection Phases",
    "checklist-grid": "Checklist",
    "benefits-grid": "Benefits",
    "comparison-section": "Comparison",
    "payment-form": "Payment Form",
  };
  return labels[type] || type;
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
}

function Block({ block, services, testimonials, officeLocations }: BlockProps) {
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
      return <FAQBlock content={block.content as FAQBlockContent} />;

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

    // === NEW BLOCK TYPES ===
    case "legal-content":
      return (
        <LegalContentBlock content={block.content as LegalContentBlockContent} />
      );

    case "contact-form":
      return (
        <ContactFormBlock
          content={block.content as ContactFormBlockContent}
          services={services}
        />
      );

    case "brand-logos":
      return (
        <BrandLogosBlock content={block.content as BrandLogosBlockContent} />
      );

    case "problem-grid":
      return (
        <ProblemGridBlock content={block.content as ProblemGridBlockContent} />
      );

    case "warning-signs":
      return (
        <WarningSignsBlock content={block.content as WarningSignsBlockContent} />
      );

    case "inspection-phases":
      return (
        <InspectionPhasesBlock content={block.content as InspectionPhasesBlockContent} />
      );

    case "checklist-grid":
      return (
        <ChecklistGridBlock content={block.content as ChecklistGridBlockContent} />
      );

    case "benefits-grid":
      return (
        <BenefitsGridBlock content={block.content as BenefitsGridBlockContent} />
      );

    case "comparison-section":
      return (
        <ComparisonSectionBlock content={block.content as ComparisonSectionBlockContent} />
      );

    case "payment-form":
      return (
        <PaymentFormBlock content={block.content as PaymentFormBlockContent} />
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
    // HVAC Principal
    "ac-repair": "ac-repair",
    "tune-up": "tune-up",
    "heating": "heating",
    // Servicios
    "snowflake": "snowflake",
    "thermometer": "thermometer",
    "fan": "fan",
    "droplets": "droplets",
    "wind": "wind",
    // Tipo de Servicio
    "home": "home",
    "building": "building",
    "clock": "clock",
    "zap": "zap",
    // Calidad
    "shield": "shield",
    "check-circle": "check-circle",
    "star": "star",
    "award": "award",
    // Herramientas
    "wrench": "wrench",
    "settings": "settings",
    "tools": "tools",
    // Legacy mappings (backwards compatibility)
    "flame": "heating",
    "plus-circle": "ac-repair",
  };
  return iconMap[icon] || icon || "ac-repair";
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
}: {
  content: FAQBlockContent;
}) {
  // FAQs are now managed per-page via site_config, not from a centralized faqs table
  // This block renders with the content configuration but no dynamic FAQs
  return <FAQSection content={content} />;
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

// === NEW BLOCK RENDER FUNCTIONS ===

function LegalContentBlock({ content }: { content: LegalContentBlockContent }) {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.title}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Last updated: {content.lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {content.sections.map((section) => (
            <div key={section.id} className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                {section.heading}
              </h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
              {section.listItems && section.listItems.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.listItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info */}
        {content.contactInfo && (
          <div className="mt-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <p>
                Phone:{" "}
                <a href={`tel:${content.contactInfo.phone}`} className="text-primary hover:underline">
                  {content.contactInfo.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${content.contactInfo.email}`} className="text-primary hover:underline">
                  {content.contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactFormBlock({
  content,
  services,
}: {
  content: ContactFormBlockContent;
  services: Service[];
}) {
  // Use services from CMS if available, otherwise use content.serviceOptions
  const serviceOptions = services.length > 0
    ? services.map(s => ({ id: s.id, label: s.title, icon: s.icon }))
    : content.serviceOptions;

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {content.subtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-neutral-800"
                placeholder="Your name"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-neutral-800"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-neutral-800"
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Service Needed
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-2 p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg cursor-pointer hover:border-primary transition"
                  >
                    <input type="checkbox" className="rounded text-primary" />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Time */}
            {content.preferredTimes && content.preferredTimes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Preferred Time
                </label>
                <select className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-neutral-800">
                  <option value="">Select a time...</option>
                  {content.preferredTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-neutral-800"
                placeholder="Tell us about your HVAC needs..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition"
            >
              {content.submitButtonText || "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function BrandLogosBlock({ content }: { content: BrandLogosBlockContent }) {
  return (
    <section className="py-12 bg-white dark:bg-neutral-900">
      <div className="container">
        {content.sectionTitle && (
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
              {content.sectionTitle}
            </h2>
            {content.sectionSubtitle && (
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                {content.sectionSubtitle}
              </p>
            )}
          </div>
        )}
        <div className={`flex flex-wrap justify-center items-center gap-8 ${content.layout === "grid" ? "grid grid-cols-3 md:grid-cols-6" : ""}`}>
          {content.brands.map((brand) => (
            <div
              key={brand.id}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
            >
              <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemGridBlock({ content }: { content: ProblemGridBlockContent }) {
  const colClasses = {
    "2-col": "grid-cols-1 md:grid-cols-2",
    "3-col": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section id="problems" className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
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

        <div className={`grid ${colClasses[content.layout]} gap-6`}>
          {content.problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white dark:bg-neutral-900 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="text-2xl">{problem.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {problem.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WarningSignsBlock({ content }: { content: WarningSignsBlockContent }) {
  return (
    <section id="warnings" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 scroll-mt-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.signs.map((sign) => (
            <div
              key={sign.id}
              className={`rounded-xl p-6 ${sign.isEmergency ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-neutral-50 dark:bg-neutral-800"}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${sign.isEmergency ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"}`}>
                <span className="text-2xl">{sign.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {sign.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {sign.description}
              </p>
              {sign.isEmergency && (
                <span className="inline-block mt-3 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                  Emergency
                </span>
              )}
            </div>
          ))}
        </div>

        {content.emergencyBanner && (
          <div className="mt-12 bg-red-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">{content.emergencyBanner.title}</h3>
            <p className="mb-6 opacity-90">{content.emergencyBanner.description}</p>
            <a
              href={content.emergencyBanner.ctaHref}
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-neutral-100 transition"
            >
              {content.emergencyBanner.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function InspectionPhasesBlock({ content }: { content: InspectionPhasesBlockContent }) {
  return (
    <section id="inspection" className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.phases.map((phase) => (
            <div key={phase.id} className="bg-white dark:bg-neutral-900 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="text-2xl">{phase.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                {phase.name}
              </h3>
              <ul className="space-y-2">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {content.safetyCallout && (
          <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">
              {content.safetyCallout.title}
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              {content.safetyCallout.content}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ChecklistGridBlock({ content }: { content: ChecklistGridBlockContent }) {
  const [showAll, setShowAll] = React.useState(false);
  const visibleItems = showAll ? content.items : content.items.slice(0, content.initialVisibleCount);

  return (
    <section id="checklist" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 scroll-mt-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {visibleItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
            >
              <svg className="w-6 h-6 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
            </div>
          ))}
        </div>

        {content.showExpandButton && content.items.length > content.initialVisibleCount && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {showAll ? "Show Less" : `Show All ${content.items.length} Items`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function BenefitsGridBlock({ content }: { content: BenefitsGridBlockContent }) {
  const colClasses = {
    "2-col": "grid-cols-1 md:grid-cols-2",
    "3-col": "grid-cols-1 md:grid-cols-3",
    "4-col": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800 scroll-mt-20">
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

        <div className={`grid ${colClasses[content.layout]} gap-8`}>
          {content.benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white dark:bg-neutral-900 rounded-xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSectionBlock({ content }: { content: ComparisonSectionBlockContent }) {
  return (
    <section id="comparison" className="py-16 lg:py-24 bg-white dark:bg-neutral-900 scroll-mt-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left Option (Negative) */}
          <div className={`rounded-2xl p-8 ${content.leftOption.variant === "negative" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-neutral-100 dark:bg-neutral-800"}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${content.leftOption.variant === "negative" ? "bg-red-100 text-red-600" : "bg-neutral-200 text-neutral-600"}`}>
              <span className="text-2xl">{content.leftOption.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {content.leftOption.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {content.leftOption.description}
            </p>
          </div>

          {/* Right Option (Positive) */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
              <span className="text-2xl">{content.rightOption.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {content.rightOption.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {content.rightOption.description}
            </p>
          </div>
        </div>

        {content.floatingStat && (
          <div className="text-center mt-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full">
              <span className="text-2xl font-bold">{content.floatingStat.value}</span>
              <span>{content.floatingStat.label}</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function PaymentFormBlock({ content }: { content: PaymentFormBlockContent }) {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            {content.subtitle}
          </p>
        </div>

        {/* Trust Signals */}
        {content.trustSignals && content.trustSignals.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {content.trustSignals.map((signal) => (
              <div
                key={signal.id}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 rounded-full shadow-sm"
              >
                <span>{signal.icon}</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {signal.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Payment Iframe/Link */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg text-center">
          <a
            href={content.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition"
          >
            Pay Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Help Box */}
        {content.helpBox && (
          <div className="mt-8 bg-white dark:bg-neutral-900 rounded-xl p-6 text-center">
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
              {content.helpBox.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              {content.helpBox.description}
            </p>
            <a
              href={`tel:${content.helpBox.phone}`}
              className="text-primary font-semibold hover:underline"
            >
              {content.helpBox.phone}
            </a>
            <p className="mt-4">
              <a
                href={content.helpBox.financingLink}
                className="text-primary hover:underline"
              >
                {content.helpBox.financingText}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlockRenderer;
