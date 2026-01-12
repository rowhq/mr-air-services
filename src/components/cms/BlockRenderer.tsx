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

interface BlockRendererProps {
  blocks: EditorBlock[];
}

/**
 * BlockRenderer - Renders CMS blocks dynamically
 * Falls back to hardcoded components when CMS content is not available
 */
export function BlockRenderer({ blocks }: BlockRendererProps) {
  const visibleBlocks = blocks
    .filter((b) => b.isVisible)
    .sort((a, b) => a.position - b.position);

  return (
    <>
      {visibleBlocks.map((block) => (
        <BlockWrapper key={block.id} settings={block.settings}>
          <Block block={block} />
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
  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
    xl: "py-32",
  };

  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-neutral-50 dark:bg-neutral-800",
    dark: "bg-neutral-900 dark:bg-neutral-950",
    gradient: "bg-gradient-to-br from-secondary via-secondary to-primary",
    custom: "",
  };

  const maxWidthClasses = {
    full: "",
    container: "container mx-auto px-4",
    narrow: "max-w-3xl mx-auto px-4",
  };

  // If component handles its own styling, don't wrap
  // Most section components handle their own padding/background
  return <>{children}</>;
}

interface BlockProps {
  block: EditorBlock;
}

function Block({ block }: BlockProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlock content={block.content as HeroBlockContent} />;

    case "services-overview":
    case "services-grid":
      return (
        <ServicesOverviewBlock
          content={block.content as ServicesOverviewBlockContent}
        />
      );

    case "testimonials":
      return (
        <TestimonialsBlock content={block.content as TestimonialsBlockContent} />
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
        <AreasServedBlock content={block.content as AreasServedBlockContent} />
      );

    case "text-content":
      return (
        <TextContentBlock content={block.content as TextContentBlockContent} />
      );

    default:
      // Unknown block type - render placeholder in development
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

// Block Components - These wrap the actual section components
// and pass CMS content to them

function HeroBlock({ content }: { content: HeroBlockContent }) {
  return <Hero content={content} />;
}

function ServicesOverviewBlock({
  content,
}: {
  content: ServicesOverviewBlockContent;
}) {
  return <ServicesOverview content={content} />;
}

function TestimonialsBlock({ content }: { content: TestimonialsBlockContent }) {
  return <Testimonials content={content} />;
}

function FAQBlock({ content }: { content: FAQBlockContent }) {
  return <FAQSection content={content} />;
}

function FinalCTABlock({ content }: { content: FinalCTABlockContent }) {
  return <FinalCTA content={content} />;
}

function WhyChooseUsBlock({ content }: { content: WhyChooseUsBlockContent }) {
  return <WhyChooseUs content={content} />;
}

function AreasServedBlock({ content }: { content: AreasServedBlockContent }) {
  return <AreasServed content={content} />;
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
