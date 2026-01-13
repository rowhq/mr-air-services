"use client";

import { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import type { BlockSettings, BlockType } from "@/types/cms";

// Icon options for features/stats
const ICON_OPTIONS = [
  { value: "shield-check", label: "Shield Check" },
  { value: "clock", label: "Clock" },
  { value: "users", label: "Users" },
  { value: "star", label: "Star" },
  { value: "award", label: "Award" },
  { value: "truck", label: "Truck" },
  { value: "wrench", label: "Wrench" },
  { value: "thermometer", label: "Thermometer" },
  { value: "home", label: "Home" },
  { value: "phone", label: "Phone" },
  { value: "calendar", label: "Calendar" },
  { value: "check-circle", label: "Check Circle" },
  { value: "dollar-sign", label: "Dollar Sign" },
  { value: "percent", label: "Percent" },
  { value: "tool", label: "Tool" },
  { value: "zap", label: "Zap" },
];

export function PropertiesPanel() {
  const { draftBlocks, selectedBlockId, updateBlockContent, updateBlock } =
    useEditorStore();

  const selectedBlock = draftBlocks.find((b) => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400 p-8 text-center">
          <div>
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <p className="text-sm">Select a block to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  const content = selectedBlock.content as unknown as Record<string, unknown>;
  const settings = selectedBlock.settings as BlockSettings;

  const handleContentChange = (key: string, value: unknown) => {
    updateBlockContent(selectedBlock.id, { [key]: value });
  };

  const handleSettingsChange = (key: keyof BlockSettings, value: unknown) => {
    updateBlock(selectedBlock.id, {
      settings: { ...settings, [key]: value },
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">
          {getBlockLabel(selectedBlock.type)} Properties
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Content Fields */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Content
          </h3>
          <ContentFields
            type={selectedBlock.type}
            content={content}
            onChange={handleContentChange}
          />
        </div>

        {/* Settings Fields */}
        <div className="p-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Layout & Style
          </h3>

          {/* Padding */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Padding
            </label>
            <select
              value={settings.padding || "md"}
              onChange={(e) =>
                handleSettingsChange(
                  "padding",
                  e.target.value as BlockSettings["padding"]
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="none">None</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>

          {/* Background */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background
            </label>
            <select
              value={settings.background || "white"}
              onChange={(e) =>
                handleSettingsChange(
                  "background",
                  e.target.value as BlockSettings["background"]
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="white">White</option>
              <option value="gray">Gray</option>
              <option value="dark">Dark</option>
              <option value="gradient">Gradient</option>
            </select>
          </div>

          {/* Max Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Width
            </label>
            <select
              value={settings.maxWidth || "container"}
              onChange={(e) =>
                handleSettingsChange(
                  "maxWidth",
                  e.target.value as BlockSettings["maxWidth"]
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="full">Full Width</option>
              <option value="container">Container</option>
              <option value="narrow">Narrow</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBlockLabel(type: BlockType): string {
  const labels: Record<string, string> = {
    hero: "Hero",
    "services-overview": "Services Overview",
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
    "benefits-grid": "Benefits Grid",
    "comparison-section": "Comparison",
    "payment-form": "Payment Form",
  };
  return labels[type] || type;
}

interface ContentFieldsProps {
  type: BlockType;
  content: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

function ContentFields({ type, content, onChange }: ContentFieldsProps) {
  // Render different fields based on block type
  switch (type) {
    case "hero": {
      const primaryCta = (content.primaryCta as { text?: string; href?: string; variant?: string }) || {};
      const secondaryCta = (content.secondaryCta as { text?: string; href?: string; type?: string }) || {};
      const trustBadges = (content.trustBadges as Array<{ id: string; icon: string; text: string }>) || [];
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextField
            label="Title Highlight"
            value={(content.titleHighlight as string) || ""}
            onChange={(v) => onChange("titleHighlight", v)}
            placeholder="Part of title to highlight"
          />
          <TextareaField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />

          {/* Background Media */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Background</h4>
            <div className="space-y-3">
              <TextField
                label="Background Image URL"
                value={(content.backgroundImage as string) || ""}
                onChange={(v) => onChange("backgroundImage", v)}
                placeholder="/images/hero-bg.jpg"
              />
              <TextField
                label="Background Video URL"
                value={(content.backgroundVideo as string) || ""}
                onChange={(v) => onChange("backgroundVideo", v)}
                placeholder="/videos/hero.mp4 (optional)"
              />
              <SelectField
                label="Overlay"
                value={(content.overlay as string) || "medium"}
                options={[
                  { value: "none", label: "None" },
                  { value: "light", label: "Light" },
                  { value: "medium", label: "Medium" },
                  { value: "dark", label: "Dark" },
                ]}
                onChange={(v) => onChange("overlay", v)}
              />
            </div>
          </div>

          <SelectField
            label="Layout"
            value={(content.layout as string) || "centered"}
            options={[
              { value: "centered", label: "Centered" },
              { value: "left-aligned", label: "Left Aligned" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Primary CTA */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Primary Button</h4>
            <div className="space-y-3">
              <TextField
                label="Button Text"
                value={primaryCta.text || ""}
                onChange={(v) => onChange("primaryCta", { ...primaryCta, text: v })}
              />
              <TextField
                label="Button Link"
                value={primaryCta.href || ""}
                onChange={(v) => onChange("primaryCta", { ...primaryCta, href: v })}
                placeholder="/contact or tel:+1..."
              />
              <SelectField
                label="Variant"
                value={primaryCta.variant || "primary"}
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "secondary", label: "Secondary" },
                ]}
                onChange={(v) => onChange("primaryCta", { ...primaryCta, variant: v })}
              />
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Secondary Button (Optional)</h4>
            <div className="space-y-3">
              <TextField
                label="Button Text"
                value={secondaryCta.text || ""}
                onChange={(v) => onChange("secondaryCta", { ...secondaryCta, text: v })}
                placeholder="e.g. (832) 437-1000"
              />
              <TextField
                label="Button Link"
                value={secondaryCta.href || ""}
                onChange={(v) => onChange("secondaryCta", { ...secondaryCta, href: v })}
                placeholder="tel:+18324371000"
              />
              <SelectField
                label="Type"
                value={secondaryCta.type || "link"}
                options={[
                  { value: "link", label: "Link" },
                  { value: "phone", label: "Phone" },
                ]}
                onChange={(v) => onChange("secondaryCta", { ...secondaryCta, type: v })}
              />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Trust Badges</h4>
              <button
                onClick={() => {
                  const newBadge = {
                    id: crypto.randomUUID(),
                    icon: "shield-check",
                    text: "New Badge",
                  };
                  onChange("trustBadges", [...trustBadges, newBadge]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Badge
              </button>
            </div>
            <div className="space-y-3">
              {trustBadges.map((badge, index) => (
                <TrustBadgeEditor
                  key={badge.id}
                  badge={badge}
                  index={index}
                  onChange={(updated) => {
                    const newBadges = [...trustBadges];
                    newBadges[index] = updated;
                    onChange("trustBadges", newBadges);
                  }}
                  onDelete={() => {
                    onChange("trustBadges", trustBadges.filter((_, i) => i !== index));
                  }}
                />
              ))}
              {trustBadges.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No badges yet. Click &quot;Add Badge&quot; to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "services-overview":
      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextareaField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "3-col"}
            options={[
              { value: "2-col", label: "2 Columns" },
              { value: "3-col", label: "3 Columns" },
              { value: "4-col", label: "4 Columns" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />
          <CheckboxField
            label="Show CTA"
            checked={(content.showCta as boolean) || false}
            onChange={(v) => onChange("showCta", v)}
          />
        </div>
      );

    case "testimonials": {
      const testimonialIds = content.testimonialIds as string[] | "featured" | undefined;
      const useFeatured = testimonialIds === "featured" || testimonialIds === undefined;

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "grid"}
            options={[
              { value: "grid", label: "Grid" },
              { value: "carousel", label: "Carousel" },
              { value: "masonry", label: "Masonry" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />
          <NumberField
            label="Max Items"
            value={(content.maxItems as number) || 3}
            onChange={(v) => onChange("maxItems", v)}
            min={1}
            max={12}
          />
          <CheckboxField
            label="Show Source"
            checked={(content.showSource as boolean) || false}
            onChange={(v) => onChange("showSource", v)}
          />

          {/* Testimonial Selection */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Testimonial Selection</h4>
            <CheckboxField
              label="Show Featured Testimonials"
              checked={useFeatured}
              onChange={(checked) => {
                if (checked) {
                  onChange("testimonialIds", "featured");
                } else {
                  onChange("testimonialIds", []);
                }
              }}
            />
            <p className="text-xs text-gray-400 mt-2">
              {useFeatured
                ? "Showing testimonials marked as featured in the Testimonials admin."
                : "Select specific testimonials to display."}
            </p>
            {!useFeatured && (
              <p className="text-xs text-blue-500 mt-2">
                To select specific testimonials, use the Testimonials admin to manage which are featured.
              </p>
            )}
          </div>
        </div>
      );
    }

    case "faq": {
      const categories = (content.categories as string[]) || [];
      const availableCategories = [
        { value: "general", label: "General" },
        { value: "ac-repair", label: "AC Repair" },
        { value: "heating", label: "Heating" },
        { value: "tune-ups", label: "Tune-ups" },
        { value: "maintenance", label: "Maintenance" },
        { value: "financing", label: "Financing" },
        { value: "installation", label: "Installation" },
        { value: "air-quality", label: "Air Quality" },
        { value: "emergency", label: "Emergency Service" },
      ];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <TextField
            label="Filter by Page Slug"
            value={(content.pageSlug as string) || ""}
            onChange={(v) => onChange("pageSlug", v)}
            placeholder="e.g. air-conditioning-repair"
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "accordion"}
            options={[
              { value: "accordion", label: "Accordion" },
              { value: "two-column", label: "Two Column" },
              { value: "tabs", label: "Tabs" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />
          <NumberField
            label="Max Items"
            value={(content.maxItems as number) || 10}
            onChange={(v) => onChange("maxItems", v)}
            min={1}
            max={50}
          />

          {/* Categories Multi-select */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Filter by Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCategories.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(cat.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange("categories", [...categories, cat.value]);
                      } else {
                        onChange("categories", categories.filter((c) => c !== cat.value));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cat.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {categories.length === 0
                ? "No category filter - showing all FAQs (filtered by page slug if set)."
                : `Showing FAQs from: ${categories.join(", ")}`}
            </p>
          </div>
        </div>
      );
    }

    case "services-grid":
      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextareaField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "3-col"}
            options={[
              { value: "2-col", label: "2 Columns" },
              { value: "3-col", label: "3 Columns" },
              { value: "4-col", label: "4 Columns" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />
          <CheckboxField
            label="Show CTA"
            checked={(content.showCta as boolean) || false}
            onChange={(v) => onChange("showCta", v)}
          />
          <p className="text-xs text-gray-400 mt-2">
            Shows all published services. Use Services admin to manage which services appear.
          </p>
        </div>
      );

    case "final-cta": {
      const primaryButton = (content.primaryButton as { text?: string; href?: string }) || {};
      const secondaryButton = (content.secondaryButton as { text?: string; href?: string; type?: string }) || {};
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextareaField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />
          <SelectField
            label="Background"
            value={(content.background as string) || "gradient"}
            options={[
              { value: "gradient", label: "Gradient" },
              { value: "solid", label: "Solid Color" },
              { value: "image", label: "Image" },
            ]}
            onChange={(v) => onChange("background", v)}
          />
          {content.background === "image" && (
            <TextField
              label="Background Image URL"
              value={(content.backgroundImage as string) || ""}
              onChange={(v) => onChange("backgroundImage", v)}
              placeholder="/images/cta-bg.jpg"
            />
          )}

          {/* Primary Button */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Primary Button</h4>
            <div className="space-y-3">
              <TextField
                label="Button Text"
                value={primaryButton.text || ""}
                onChange={(v) => onChange("primaryButton", { ...primaryButton, text: v })}
              />
              <TextField
                label="Button Link"
                value={primaryButton.href || ""}
                onChange={(v) => onChange("primaryButton", { ...primaryButton, href: v })}
                placeholder="/contact"
              />
            </div>
          </div>

          {/* Secondary Button */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Secondary Button (Optional)</h4>
            <div className="space-y-3">
              <TextField
                label="Button Text"
                value={secondaryButton.text || ""}
                onChange={(v) => onChange("secondaryButton", { ...secondaryButton, text: v })}
                placeholder="e.g. (832) 437-1000"
              />
              <TextField
                label="Button Link"
                value={secondaryButton.href || ""}
                onChange={(v) => onChange("secondaryButton", { ...secondaryButton, href: v })}
                placeholder="tel:+18324371000"
              />
              <SelectField
                label="Type"
                value={secondaryButton.type || "link"}
                options={[
                  { value: "link", label: "Link" },
                  { value: "phone", label: "Phone" },
                ]}
                onChange={(v) => onChange("secondaryButton", { ...secondaryButton, type: v })}
              />
            </div>
          </div>
        </div>
      );
    }

    case "text-content":
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextareaField
            label="Content"
            value={(content.content as string) || ""}
            onChange={(v) => onChange("content", v)}
            rows={6}
          />
          <SelectField
            label="Alignment"
            value={(content.alignment as string) || "left"}
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
            onChange={(v) => onChange("alignment", v)}
          />
        </div>
      );

    case "why-choose-us": {
      const features = (content.features as Array<{
        id: string;
        icon: string;
        title: string;
        description: string;
        stat: string;
        statLabel: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <CheckboxField
            label="Show Image"
            checked={(content.showImage as boolean) || false}
            onChange={(v) => onChange("showImage", v)}
          />
          {Boolean(content.showImage) && (
            <TextField
              label="Image URL"
              value={(content.imageUrl as string) || ""}
              onChange={(v) => onChange("imageUrl", v)}
              placeholder="/images/why-choose-us.jpg"
            />
          )}
          <CheckboxField
            label="Show Veteran Badge"
            checked={(content.showVeteranBadge as boolean) ?? true}
            onChange={(v) => onChange("showVeteranBadge", v)}
          />

          {/* Features Array Editor */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Features</h4>
              <button
                onClick={() => {
                  const newFeature = {
                    id: crypto.randomUUID(),
                    icon: "shield-check",
                    title: "New Feature",
                    description: "Feature description",
                    stat: "",
                    statLabel: "",
                  };
                  onChange("features", [...features, newFeature]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <FeatureEditor
                  key={feature.id}
                  feature={feature}
                  index={index}
                  onChange={(updated) => {
                    const newFeatures = [...features];
                    newFeatures[index] = updated;
                    onChange("features", newFeatures);
                  }}
                  onDelete={() => {
                    onChange("features", features.filter((_, i) => i !== index));
                  }}
                  onMoveUp={index > 0 ? () => {
                    const newFeatures = [...features];
                    [newFeatures[index - 1], newFeatures[index]] = [newFeatures[index], newFeatures[index - 1]];
                    onChange("features", newFeatures);
                  } : undefined}
                  onMoveDown={index < features.length - 1 ? () => {
                    const newFeatures = [...features];
                    [newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]];
                    onChange("features", newFeatures);
                  } : undefined}
                />
              ))}
              {features.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No features yet. Click &quot;Add Feature&quot; to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "areas-served": {
      const highlightedAreas = (content.highlightedAreas as string[]) || [];
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />
          <CheckboxField
            label="Show Map"
            checked={(content.showMap as boolean) ?? true}
            onChange={(v) => onChange("showMap", v)}
          />
          <CheckboxField
            label="Show List"
            checked={(content.showList as boolean) ?? true}
            onChange={(v) => onChange("showList", v)}
          />

          {/* Highlighted Areas */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Highlighted Areas</h4>
              <button
                onClick={() => {
                  onChange("highlightedAreas", [...highlightedAreas, "New Area"]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Area
              </button>
            </div>
            <div className="space-y-2">
              {highlightedAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => {
                      const newAreas = [...highlightedAreas];
                      newAreas[index] = e.target.value;
                      onChange("highlightedAreas", newAreas);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g. Katy, Sugar Land..."
                  />
                  <button
                    onClick={() => {
                      onChange("highlightedAreas", highlightedAreas.filter((_, i) => i !== index));
                    }}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {highlightedAreas.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No highlighted areas. Click &quot;Add Area&quot; to feature specific locations.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "image-text":
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextareaField
            label="Content"
            value={(content.content as string) || ""}
            onChange={(v) => onChange("content", v)}
            rows={4}
          />
          <TextField
            label="Image URL"
            value={(content.imageUrl as string) || ""}
            onChange={(v) => onChange("imageUrl", v)}
            placeholder="/images/..."
          />
          <TextField
            label="Image Alt Text"
            value={(content.imageAlt as string) || ""}
            onChange={(v) => onChange("imageAlt", v)}
          />
          <SelectField
            label="Image Position"
            value={(content.imagePosition as string) || "left"}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
            onChange={(v) => onChange("imagePosition", v)}
          />
          <CheckboxField
            label="Show CTA Button"
            checked={(content.showCta as boolean) || false}
            onChange={(v) => onChange("showCta", v)}
          />
          {Boolean(content.showCta) && (
            <>
              <TextField
                label="CTA Text"
                value={(content.ctaText as string) || ""}
                onChange={(v) => onChange("ctaText", v)}
              />
              <TextField
                label="CTA Link"
                value={(content.ctaHref as string) || ""}
                onChange={(v) => onChange("ctaHref", v)}
              />
            </>
          )}
        </div>
      );

    case "stats-grid": {
      const stats = (content.stats as Array<{
        id: string;
        value: string;
        label: string;
        icon?: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "3-col"}
            options={[
              { value: "2-col", label: "2 Columns" },
              { value: "3-col", label: "3 Columns" },
              { value: "4-col", label: "4 Columns" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Stats Array Editor */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Stats</h4>
              <button
                onClick={() => {
                  const newStat = {
                    id: crypto.randomUUID(),
                    value: "100+",
                    label: "Stat Label",
                    icon: "star",
                  };
                  onChange("stats", [...stats, newStat]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Stat
              </button>
            </div>

            <div className="space-y-3">
              {stats.map((stat, index) => (
                <StatEditor
                  key={stat.id}
                  stat={stat}
                  index={index}
                  onChange={(updated) => {
                    const newStats = [...stats];
                    newStats[index] = updated;
                    onChange("stats", newStats);
                  }}
                  onDelete={() => {
                    onChange("stats", stats.filter((_, i) => i !== index));
                  }}
                  onMoveUp={index > 0 ? () => {
                    const newStats = [...stats];
                    [newStats[index - 1], newStats[index]] = [newStats[index], newStats[index - 1]];
                    onChange("stats", newStats);
                  } : undefined}
                  onMoveDown={index < stats.length - 1 ? () => {
                    const newStats = [...stats];
                    [newStats[index], newStats[index + 1]] = [newStats[index + 1], newStats[index]];
                    onChange("stats", newStats);
                  } : undefined}
                />
              ))}
              {stats.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No stats yet. Click &quot;Add Stat&quot; to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "contact-info":
      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />
          <CheckboxField
            label="Show Phone"
            checked={(content.showPhone as boolean) ?? true}
            onChange={(v) => onChange("showPhone", v)}
          />
          <CheckboxField
            label="Show Email"
            checked={(content.showEmail as boolean) ?? true}
            onChange={(v) => onChange("showEmail", v)}
          />
          <CheckboxField
            label="Show Hours"
            checked={(content.showHours as boolean) ?? true}
            onChange={(v) => onChange("showHours", v)}
          />
          <CheckboxField
            label="Show Locations"
            checked={(content.showLocations as boolean) ?? true}
            onChange={(v) => onChange("showLocations", v)}
          />
          <CheckboxField
            label="Show Map"
            checked={(content.showMap as boolean) || false}
            onChange={(v) => onChange("showMap", v)}
          />
        </div>
      );

    case "repair-process": {
      const repairSteps = (content.steps as Array<{
        id: string;
        number: string;
        title: string;
        description: string;
        badge?: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "horizontal"}
            options={[
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
              { value: "timeline", label: "Timeline" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Steps Array Editor */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Process Steps</h4>
              <button
                onClick={() => {
                  const newStep = {
                    id: crypto.randomUUID(),
                    number: String(repairSteps.length + 1),
                    title: "New Step",
                    description: "Step description",
                    badge: "",
                  };
                  onChange("steps", [...repairSteps, newStep]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-3">
              {repairSteps.map((step, index) => (
                <RepairStepEditor
                  key={step.id}
                  step={step}
                  index={index}
                  onChange={(updated) => {
                    const newSteps = [...repairSteps];
                    newSteps[index] = updated;
                    onChange("steps", newSteps);
                  }}
                  onDelete={() => {
                    onChange("steps", repairSteps.filter((_, i) => i !== index));
                  }}
                  onMoveUp={index > 0 ? () => {
                    const newSteps = [...repairSteps];
                    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
                    onChange("steps", newSteps);
                  } : undefined}
                  onMoveDown={index < repairSteps.length - 1 ? () => {
                    const newSteps = [...repairSteps];
                    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
                    onChange("steps", newSteps);
                  } : undefined}
                />
              ))}
              {repairSteps.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No steps yet. Click &quot;Add Step&quot; to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "how-it-works": {
      const howSteps = (content.steps as Array<{
        id: string;
        number: string;
        title: string;
        shortTitle?: string;
        description: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "cards"}
            options={[
              { value: "cards", label: "Cards" },
              { value: "timeline", label: "Timeline" },
              { value: "accordion", label: "Accordion" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Steps Array Editor */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Steps</h4>
              <button
                onClick={() => {
                  const newStep = {
                    id: crypto.randomUUID(),
                    number: String(howSteps.length + 1),
                    title: "New Step",
                    shortTitle: "",
                    description: "Step description",
                  };
                  onChange("steps", [...howSteps, newStep]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-3">
              {howSteps.map((step, index) => (
                <HowItWorksStepEditor
                  key={step.id}
                  step={step}
                  index={index}
                  onChange={(updated) => {
                    const newSteps = [...howSteps];
                    newSteps[index] = updated;
                    onChange("steps", newSteps);
                  }}
                  onDelete={() => {
                    onChange("steps", howSteps.filter((_, i) => i !== index));
                  }}
                  onMoveUp={index > 0 ? () => {
                    const newSteps = [...howSteps];
                    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
                    onChange("steps", newSteps);
                  } : undefined}
                  onMoveDown={index < howSteps.length - 1 ? () => {
                    const newSteps = [...howSteps];
                    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
                    onChange("steps", newSteps);
                  } : undefined}
                />
              ))}
              {howSteps.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">
                  No steps yet. Click &quot;Add Step&quot; to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "legal-content": {
      const sections = (content.sections as Array<{
        id: string;
        heading: string;
        content: string;
        listItems?: string[];
      }>) || [];
      const contactInfo = (content.contactInfo as { phone?: string; email?: string }) || {};

      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextField
            label="Last Updated"
            value={(content.lastUpdated as string) || ""}
            onChange={(v) => onChange("lastUpdated", v)}
            placeholder="January 2024"
          />

          {/* Contact Info */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Info</h4>
            <div className="space-y-3">
              <TextField
                label="Phone"
                value={contactInfo.phone || ""}
                onChange={(v) => onChange("contactInfo", { ...contactInfo, phone: v })}
              />
              <TextField
                label="Email"
                value={contactInfo.email || ""}
                onChange={(v) => onChange("contactInfo", { ...contactInfo, email: v })}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Sections</h4>
              <button
                onClick={() => {
                  const newSection = {
                    id: crypto.randomUUID(),
                    heading: "New Section",
                    content: "",
                    listItems: [],
                  };
                  onChange("sections", [...sections, newSection]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Section
              </button>
            </div>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <LegalSectionEditor
                  key={section.id}
                  section={section}
                  index={index}
                  onChange={(updated) => {
                    const newSections = [...sections];
                    newSections[index] = updated;
                    onChange("sections", newSections);
                  }}
                  onDelete={() => {
                    onChange("sections", sections.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "contact-form": {
      const successMessage = (content.successMessage as { title?: string; description?: string }) || {};
      const serviceOptions = (content.serviceOptions as Array<{ id: string; label: string; icon: string }>) || [];
      const preferredTimes = (content.preferredTimes as string[]) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextareaField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />
          <TextField
            label="Submit Button Text"
            value={(content.submitButtonText as string) || ""}
            onChange={(v) => onChange("submitButtonText", v)}
          />
          <CheckboxField
            label="Show Business Info"
            checked={(content.showBusinessInfo as boolean) ?? true}
            onChange={(v) => onChange("showBusinessInfo", v)}
          />
          <CheckboxField
            label="Show Service Area"
            checked={(content.showServiceArea as boolean) ?? true}
            onChange={(v) => onChange("showServiceArea", v)}
          />

          {/* Success Message */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Success Message</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={successMessage.title || ""}
                onChange={(v) => onChange("successMessage", { ...successMessage, title: v })}
              />
              <TextareaField
                label="Description"
                value={successMessage.description || ""}
                onChange={(v) => onChange("successMessage", { ...successMessage, description: v })}
              />
            </div>
          </div>

          {/* Service Options */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Service Options</h4>
              <button
                onClick={() => {
                  const newOption = {
                    id: crypto.randomUUID(),
                    label: "New Service",
                    icon: "wrench",
                  };
                  onChange("serviceOptions", [...serviceOptions, newOption]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {serviceOptions.map((opt, index) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => {
                      const newOpts = [...serviceOptions];
                      newOpts[index] = { ...opt, label: e.target.value };
                      onChange("serviceOptions", newOpts);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => {
                      onChange("serviceOptions", serviceOptions.filter((_, i) => i !== index));
                    }}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Times */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Preferred Times</h4>
              <button
                onClick={() => {
                  onChange("preferredTimes", [...preferredTimes, "New Time"]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {preferredTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => {
                      const newTimes = [...preferredTimes];
                      newTimes[index] = e.target.value;
                      onChange("preferredTimes", newTimes);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="e.g. Morning (8AM-12PM)"
                  />
                  <button
                    onClick={() => {
                      onChange("preferredTimes", preferredTimes.filter((_, i) => i !== index));
                    }}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "brand-logos": {
      const brands = (content.brands as Array<{ id: string; name: string; logo?: string }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "inline"}
            options={[
              { value: "inline", label: "Inline" },
              { value: "grid", label: "Grid" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Brands */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Brands</h4>
              <button
                onClick={() => {
                  const newBrand = {
                    id: crypto.randomUUID(),
                    name: "New Brand",
                    logo: "",
                  };
                  onChange("brands", [...brands, newBrand]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Brand
              </button>
            </div>
            <div className="space-y-3">
              {brands.map((brand, index) => (
                <BrandEditor
                  key={brand.id}
                  brand={brand}
                  index={index}
                  onChange={(updated) => {
                    const newBrands = [...brands];
                    newBrands[index] = updated;
                    onChange("brands", newBrands);
                  }}
                  onDelete={() => {
                    onChange("brands", brands.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "problem-grid": {
      const problems = (content.problems as Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "3-col"}
            options={[
              { value: "2-col", label: "2 Columns" },
              { value: "3-col", label: "3 Columns" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Problems */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Problems</h4>
              <button
                onClick={() => {
                  const newProblem = {
                    id: crypto.randomUUID(),
                    title: "New Problem",
                    description: "",
                    icon: "wrench",
                  };
                  onChange("problems", [...problems, newProblem]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Problem
              </button>
            </div>
            <div className="space-y-3">
              {problems.map((problem, index) => (
                <ProblemEditor
                  key={problem.id}
                  problem={problem}
                  index={index}
                  onChange={(updated) => {
                    const newProblems = [...problems];
                    newProblems[index] = updated;
                    onChange("problems", newProblems);
                  }}
                  onDelete={() => {
                    onChange("problems", problems.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "warning-signs": {
      const signs = (content.signs as Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
        isEmergency?: boolean;
      }>) || [];
      const emergencyBanner = (content.emergencyBanner as {
        title?: string;
        description?: string;
        ctaText?: string;
        ctaHref?: string;
      }) || {};

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />

          {/* Emergency Banner */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Emergency Banner (Optional)</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={emergencyBanner.title || ""}
                onChange={(v) => onChange("emergencyBanner", { ...emergencyBanner, title: v })}
              />
              <TextField
                label="Description"
                value={emergencyBanner.description || ""}
                onChange={(v) => onChange("emergencyBanner", { ...emergencyBanner, description: v })}
              />
              <TextField
                label="CTA Text"
                value={emergencyBanner.ctaText || ""}
                onChange={(v) => onChange("emergencyBanner", { ...emergencyBanner, ctaText: v })}
              />
              <TextField
                label="CTA Link"
                value={emergencyBanner.ctaHref || ""}
                onChange={(v) => onChange("emergencyBanner", { ...emergencyBanner, ctaHref: v })}
              />
            </div>
          </div>

          {/* Signs */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Warning Signs</h4>
              <button
                onClick={() => {
                  const newSign = {
                    id: crypto.randomUUID(),
                    title: "New Sign",
                    description: "",
                    icon: "alert-triangle",
                    isEmergency: false,
                  };
                  onChange("signs", [...signs, newSign]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Sign
              </button>
            </div>
            <div className="space-y-3">
              {signs.map((sign, index) => (
                <WarningSignEditor
                  key={sign.id}
                  sign={sign}
                  index={index}
                  onChange={(updated) => {
                    const newSigns = [...signs];
                    newSigns[index] = updated;
                    onChange("signs", newSigns);
                  }}
                  onDelete={() => {
                    onChange("signs", signs.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "inspection-phases": {
      const phases = (content.phases as Array<{
        id: string;
        name: string;
        icon: string;
        items: string[];
      }>) || [];
      const safetyCallout = (content.safetyCallout as { title?: string; content?: string }) || {};

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />

          {/* Safety Callout */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Safety Callout (Optional)</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={safetyCallout.title || ""}
                onChange={(v) => onChange("safetyCallout", { ...safetyCallout, title: v })}
              />
              <TextareaField
                label="Content"
                value={safetyCallout.content || ""}
                onChange={(v) => onChange("safetyCallout", { ...safetyCallout, content: v })}
              />
            </div>
          </div>

          {/* Phases */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Phases</h4>
              <button
                onClick={() => {
                  const newPhase = {
                    id: crypto.randomUUID(),
                    name: "New Phase",
                    icon: "check-circle",
                    items: [],
                  };
                  onChange("phases", [...phases, newPhase]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Phase
              </button>
            </div>
            <div className="space-y-3">
              {phases.map((phase, index) => (
                <InspectionPhaseEditor
                  key={phase.id}
                  phase={phase}
                  index={index}
                  onChange={(updated) => {
                    const newPhases = [...phases];
                    newPhases[index] = updated;
                    onChange("phases", newPhases);
                  }}
                  onDelete={() => {
                    onChange("phases", phases.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "checklist-grid": {
      const items = (content.items as string[]) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <NumberField
            label="Initially Visible Items"
            value={(content.initialVisibleCount as number) || 6}
            onChange={(v) => onChange("initialVisibleCount", v)}
            min={1}
            max={50}
          />
          <CheckboxField
            label="Show Expand Button"
            checked={(content.showExpandButton as boolean) ?? true}
            onChange={(v) => onChange("showExpandButton", v)}
          />

          {/* Checklist Items */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Checklist Items</h4>
              <button
                onClick={() => {
                  onChange("items", [...items, "New item"]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Item
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index] = e.target.value;
                      onChange("items", newItems);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => {
                      onChange("items", items.filter((_, i) => i !== index));
                    }}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "benefits-grid": {
      const benefits = (content.benefits as Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
      }>) || [];

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <SelectField
            label="Layout"
            value={(content.layout as string) || "3-col"}
            options={[
              { value: "2-col", label: "2 Columns" },
              { value: "3-col", label: "3 Columns" },
              { value: "4-col", label: "4 Columns" },
            ]}
            onChange={(v) => onChange("layout", v)}
          />

          {/* Benefits */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Benefits</h4>
              <button
                onClick={() => {
                  const newBenefit = {
                    id: crypto.randomUUID(),
                    title: "New Benefit",
                    description: "",
                    icon: "check-circle",
                  };
                  onChange("benefits", [...benefits, newBenefit]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Benefit
              </button>
            </div>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <BenefitEditor
                  key={benefit.id}
                  benefit={benefit}
                  index={index}
                  onChange={(updated) => {
                    const newBenefits = [...benefits];
                    newBenefits[index] = updated;
                    onChange("benefits", newBenefits);
                  }}
                  onDelete={() => {
                    onChange("benefits", benefits.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "comparison-section": {
      const leftOption = (content.leftOption as {
        title?: string;
        description?: string;
        icon?: string;
        variant?: string;
      }) || {};
      const rightOption = (content.rightOption as {
        title?: string;
        description?: string;
        icon?: string;
        variant?: string;
      }) || {};
      const floatingStat = (content.floatingStat as { value?: string; label?: string }) || {};

      return (
        <div className="space-y-4">
          <TextField
            label="Section Title"
            value={(content.sectionTitle as string) || ""}
            onChange={(v) => onChange("sectionTitle", v)}
          />
          <TextField
            label="Subtitle"
            value={(content.sectionSubtitle as string) || ""}
            onChange={(v) => onChange("sectionSubtitle", v)}
          />
          <TextField
            label="Image URL"
            value={(content.imageUrl as string) || ""}
            onChange={(v) => onChange("imageUrl", v)}
            placeholder="/images/comparison.jpg"
          />

          {/* Left Option (Negative) */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Left Option (Problem)</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={leftOption.title || ""}
                onChange={(v) => onChange("leftOption", { ...leftOption, title: v })}
              />
              <TextareaField
                label="Description"
                value={leftOption.description || ""}
                onChange={(v) => onChange("leftOption", { ...leftOption, description: v })}
              />
              <SelectField
                label="Icon"
                value={leftOption.icon || "x-circle"}
                options={ICON_OPTIONS}
                onChange={(v) => onChange("leftOption", { ...leftOption, icon: v })}
              />
            </div>
          </div>

          {/* Right Option (Positive) */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Right Option (Solution)</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={rightOption.title || ""}
                onChange={(v) => onChange("rightOption", { ...rightOption, title: v })}
              />
              <TextareaField
                label="Description"
                value={rightOption.description || ""}
                onChange={(v) => onChange("rightOption", { ...rightOption, description: v })}
              />
              <SelectField
                label="Icon"
                value={rightOption.icon || "check-circle"}
                options={ICON_OPTIONS}
                onChange={(v) => onChange("rightOption", { ...rightOption, icon: v })}
              />
            </div>
          </div>

          {/* Floating Stat */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Floating Stat (Optional)</h4>
            <div className="space-y-3">
              <TextField
                label="Value"
                value={floatingStat.value || ""}
                onChange={(v) => onChange("floatingStat", { ...floatingStat, value: v })}
                placeholder="e.g. 40%"
              />
              <TextField
                label="Label"
                value={floatingStat.label || ""}
                onChange={(v) => onChange("floatingStat", { ...floatingStat, label: v })}
                placeholder="e.g. Energy Savings"
              />
            </div>
          </div>
        </div>
      );
    }

    case "payment-form": {
      const trustSignals = (content.trustSignals as Array<{ id: string; icon: string; text: string }>) || [];
      const helpBox = (content.helpBox as {
        title?: string;
        description?: string;
        phone?: string;
        financingText?: string;
        financingLink?: string;
      }) || {};

      return (
        <div className="space-y-4">
          <TextField
            label="Title"
            value={(content.title as string) || ""}
            onChange={(v) => onChange("title", v)}
          />
          <TextareaField
            label="Subtitle"
            value={(content.subtitle as string) || ""}
            onChange={(v) => onChange("subtitle", v)}
          />
          <TextField
            label="Payment URL"
            value={(content.paymentUrl as string) || ""}
            onChange={(v) => onChange("paymentUrl", v)}
            placeholder="https://payment.provider.com/..."
          />

          {/* Help Box */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Help Box</h4>
            <div className="space-y-3">
              <TextField
                label="Title"
                value={helpBox.title || ""}
                onChange={(v) => onChange("helpBox", { ...helpBox, title: v })}
              />
              <TextField
                label="Description"
                value={helpBox.description || ""}
                onChange={(v) => onChange("helpBox", { ...helpBox, description: v })}
              />
              <TextField
                label="Phone"
                value={helpBox.phone || ""}
                onChange={(v) => onChange("helpBox", { ...helpBox, phone: v })}
              />
              <TextField
                label="Financing Text"
                value={helpBox.financingText || ""}
                onChange={(v) => onChange("helpBox", { ...helpBox, financingText: v })}
              />
              <TextField
                label="Financing Link"
                value={helpBox.financingLink || ""}
                onChange={(v) => onChange("helpBox", { ...helpBox, financingLink: v })}
              />
            </div>
          </div>

          {/* Trust Signals */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">Trust Signals</h4>
              <button
                onClick={() => {
                  const newSignal = {
                    id: crypto.randomUUID(),
                    icon: "shield-check",
                    text: "New Signal",
                  };
                  onChange("trustSignals", [...trustSignals, newSignal]);
                }}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
              >
                + Add Signal
              </button>
            </div>
            <div className="space-y-3">
              {trustSignals.map((signal, index) => (
                <TrustSignalEditor
                  key={signal.id}
                  signal={signal}
                  index={index}
                  onChange={(updated) => {
                    const newSignals = [...trustSignals];
                    newSignals[index] = updated;
                    onChange("trustSignals", newSignals);
                  }}
                  onDelete={() => {
                    onChange("trustSignals", trustSignals.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    default:
      return (
        <div className="text-sm text-gray-500">
          Edit fields for this block type coming soon.
        </div>
      );
  }
}

// Field Components
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextField({ label, value, onChange, placeholder }: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 3,
}: TextareaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function NumberField({ label, value, onChange, min, max }: NumberFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min={min}
        max={max}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}

// =====================================================
// Array Item Editors
// =====================================================

// Collapsible Item Wrapper
interface CollapsibleItemProps {
  title: string;
  index: number;
  children: React.ReactNode;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function CollapsibleItem({ title, index, children, onDelete, onMoveUp, onMoveDown }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 truncate">{title}</span>
        <div className="flex items-center gap-1">
          {onMoveUp && (
            <button
              onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Move up"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          {onMoveDown && (
            <button
              onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Move down"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1 text-red-400 hover:text-red-600"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-3 space-y-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}

// Feature Editor (for why-choose-us)
interface FeatureEditorProps {
  feature: {
    id: string;
    icon: string;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
  };
  index: number;
  onChange: (feature: FeatureEditorProps["feature"]) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function FeatureEditor({ feature, index, onChange, onDelete, onMoveUp, onMoveDown }: FeatureEditorProps) {
  return (
    <CollapsibleItem
      title={feature.title || `Feature ${index + 1}`}
      index={index}
      onDelete={onDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <SelectField
        label="Icon"
        value={feature.icon || "shield-check"}
        options={ICON_OPTIONS}
        onChange={(v) => onChange({ ...feature, icon: v })}
      />
      <TextField
        label="Title"
        value={feature.title}
        onChange={(v) => onChange({ ...feature, title: v })}
      />
      <TextareaField
        label="Description"
        value={feature.description}
        onChange={(v) => onChange({ ...feature, description: v })}
        rows={2}
      />
      <div className="grid grid-cols-2 gap-2">
        <TextField
          label="Stat Value"
          value={feature.stat}
          onChange={(v) => onChange({ ...feature, stat: v })}
          placeholder="e.g. 15+"
        />
        <TextField
          label="Stat Label"
          value={feature.statLabel}
          onChange={(v) => onChange({ ...feature, statLabel: v })}
          placeholder="e.g. years"
        />
      </div>
    </CollapsibleItem>
  );
}

// Stat Editor (for stats-grid)
interface StatEditorProps {
  stat: {
    id: string;
    value: string;
    label: string;
    icon?: string;
  };
  index: number;
  onChange: (stat: StatEditorProps["stat"]) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function StatEditor({ stat, index, onChange, onDelete, onMoveUp, onMoveDown }: StatEditorProps) {
  return (
    <CollapsibleItem
      title={`${stat.value} - ${stat.label}` || `Stat ${index + 1}`}
      index={index}
      onDelete={onDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <TextField
        label="Value"
        value={stat.value}
        onChange={(v) => onChange({ ...stat, value: v })}
        placeholder="e.g. 100+ or 98%"
      />
      <TextField
        label="Label"
        value={stat.label}
        onChange={(v) => onChange({ ...stat, label: v })}
        placeholder="e.g. Happy Customers"
      />
      <SelectField
        label="Icon (optional)"
        value={stat.icon || ""}
        options={[{ value: "", label: "No Icon" }, ...ICON_OPTIONS]}
        onChange={(v) => onChange({ ...stat, icon: v || undefined })}
      />
    </CollapsibleItem>
  );
}

// Repair Step Editor (for repair-process)
interface RepairStepEditorProps {
  step: {
    id: string;
    number: string;
    title: string;
    description: string;
    badge?: string;
  };
  index: number;
  onChange: (step: RepairStepEditorProps["step"]) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function RepairStepEditor({ step, index, onChange, onDelete, onMoveUp, onMoveDown }: RepairStepEditorProps) {
  return (
    <CollapsibleItem
      title={`${step.number}. ${step.title}` || `Step ${index + 1}`}
      index={index}
      onDelete={onDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <TextField
        label="Step Number"
        value={step.number}
        onChange={(v) => onChange({ ...step, number: v })}
        placeholder="1, 2, 3..."
      />
      <TextField
        label="Title"
        value={step.title}
        onChange={(v) => onChange({ ...step, title: v })}
      />
      <TextareaField
        label="Description"
        value={step.description}
        onChange={(v) => onChange({ ...step, description: v })}
        rows={2}
      />
      <TextField
        label="Badge (optional)"
        value={step.badge || ""}
        onChange={(v) => onChange({ ...step, badge: v || undefined })}
        placeholder="e.g. Free or 24/7"
      />
    </CollapsibleItem>
  );
}

// How It Works Step Editor
interface HowItWorksStepEditorProps {
  step: {
    id: string;
    number: string;
    title: string;
    shortTitle?: string;
    description: string;
  };
  index: number;
  onChange: (step: HowItWorksStepEditorProps["step"]) => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

function HowItWorksStepEditor({ step, index, onChange, onDelete, onMoveUp, onMoveDown }: HowItWorksStepEditorProps) {
  return (
    <CollapsibleItem
      title={`${step.number}. ${step.title}` || `Step ${index + 1}`}
      index={index}
      onDelete={onDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
    >
      <TextField
        label="Step Number"
        value={step.number}
        onChange={(v) => onChange({ ...step, number: v })}
        placeholder="1, 2, 3..."
      />
      <TextField
        label="Title"
        value={step.title}
        onChange={(v) => onChange({ ...step, title: v })}
      />
      <TextField
        label="Short Title (optional)"
        value={step.shortTitle || ""}
        onChange={(v) => onChange({ ...step, shortTitle: v || undefined })}
        placeholder="For compact displays"
      />
      <TextareaField
        label="Description"
        value={step.description}
        onChange={(v) => onChange({ ...step, description: v })}
        rows={2}
      />
    </CollapsibleItem>
  );
}

// Trust Badge Editor (for hero)
interface TrustBadgeEditorProps {
  badge: { id: string; icon: string; text: string };
  index: number;
  onChange: (badge: TrustBadgeEditorProps["badge"]) => void;
  onDelete: () => void;
}

function TrustBadgeEditor({ badge, index, onChange, onDelete }: TrustBadgeEditorProps) {
  return (
    <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
      <select
        value={badge.icon}
        onChange={(e) => onChange({ ...badge, icon: e.target.value })}
        className="px-2 py-1 border border-gray-300 rounded text-xs"
      >
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <input
        type="text"
        value={badge.text}
        onChange={(e) => onChange({ ...badge, text: e.target.value })}
        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
        placeholder="Badge text"
      />
      <button
        onClick={onDelete}
        className="p-1 text-red-400 hover:text-red-600"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Legal Section Editor
interface LegalSectionEditorProps {
  section: {
    id: string;
    heading: string;
    content: string;
    listItems?: string[];
  };
  index: number;
  onChange: (section: LegalSectionEditorProps["section"]) => void;
  onDelete: () => void;
}

function LegalSectionEditor({ section, index, onChange, onDelete }: LegalSectionEditorProps) {
  return (
    <CollapsibleItem
      title={section.heading || `Section ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Heading"
        value={section.heading}
        onChange={(v) => onChange({ ...section, heading: v })}
      />
      <TextareaField
        label="Content"
        value={section.content}
        onChange={(v) => onChange({ ...section, content: v })}
        rows={4}
      />
    </CollapsibleItem>
  );
}

// Brand Editor
interface BrandEditorProps {
  brand: { id: string; name: string; logo?: string };
  index: number;
  onChange: (brand: BrandEditorProps["brand"]) => void;
  onDelete: () => void;
}

function BrandEditor({ brand, index, onChange, onDelete }: BrandEditorProps) {
  return (
    <CollapsibleItem
      title={brand.name || `Brand ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Name"
        value={brand.name}
        onChange={(v) => onChange({ ...brand, name: v })}
      />
      <TextField
        label="Logo URL (optional)"
        value={brand.logo || ""}
        onChange={(v) => onChange({ ...brand, logo: v || undefined })}
        placeholder="/images/brands/..."
      />
    </CollapsibleItem>
  );
}

// Problem Editor
interface ProblemEditorProps {
  problem: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
  onChange: (problem: ProblemEditorProps["problem"]) => void;
  onDelete: () => void;
}

function ProblemEditor({ problem, index, onChange, onDelete }: ProblemEditorProps) {
  return (
    <CollapsibleItem
      title={problem.title || `Problem ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Title"
        value={problem.title}
        onChange={(v) => onChange({ ...problem, title: v })}
      />
      <TextareaField
        label="Description"
        value={problem.description}
        onChange={(v) => onChange({ ...problem, description: v })}
        rows={2}
      />
      <SelectField
        label="Icon"
        value={problem.icon || "wrench"}
        options={ICON_OPTIONS}
        onChange={(v) => onChange({ ...problem, icon: v })}
      />
    </CollapsibleItem>
  );
}

// Warning Sign Editor
interface WarningSignEditorProps {
  sign: {
    id: string;
    title: string;
    description: string;
    icon: string;
    isEmergency?: boolean;
  };
  index: number;
  onChange: (sign: WarningSignEditorProps["sign"]) => void;
  onDelete: () => void;
}

function WarningSignEditor({ sign, index, onChange, onDelete }: WarningSignEditorProps) {
  return (
    <CollapsibleItem
      title={sign.title || `Sign ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Title"
        value={sign.title}
        onChange={(v) => onChange({ ...sign, title: v })}
      />
      <TextareaField
        label="Description"
        value={sign.description}
        onChange={(v) => onChange({ ...sign, description: v })}
        rows={2}
      />
      <SelectField
        label="Icon"
        value={sign.icon || "alert-triangle"}
        options={ICON_OPTIONS}
        onChange={(v) => onChange({ ...sign, icon: v })}
      />
      <CheckboxField
        label="Is Emergency"
        checked={sign.isEmergency || false}
        onChange={(v) => onChange({ ...sign, isEmergency: v })}
      />
    </CollapsibleItem>
  );
}

// Inspection Phase Editor
interface InspectionPhaseEditorProps {
  phase: {
    id: string;
    name: string;
    icon: string;
    items: string[];
  };
  index: number;
  onChange: (phase: InspectionPhaseEditorProps["phase"]) => void;
  onDelete: () => void;
}

function InspectionPhaseEditor({ phase, index, onChange, onDelete }: InspectionPhaseEditorProps) {
  return (
    <CollapsibleItem
      title={phase.name || `Phase ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Name"
        value={phase.name}
        onChange={(v) => onChange({ ...phase, name: v })}
      />
      <SelectField
        label="Icon"
        value={phase.icon || "check-circle"}
        options={ICON_OPTIONS}
        onChange={(v) => onChange({ ...phase, icon: v })}
      />
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Checklist Items</label>
          <button
            onClick={() => onChange({ ...phase, items: [...phase.items, "New item"] })}
            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
          >
            + Add
          </button>
        </div>
        <div className="space-y-1">
          {phase.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-1">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...phase.items];
                  newItems[itemIndex] = e.target.value;
                  onChange({ ...phase, items: newItems });
                }}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <button
                onClick={() => {
                  onChange({ ...phase, items: phase.items.filter((_, i) => i !== itemIndex) });
                }}
                className="p-1 text-red-400 hover:text-red-600"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </CollapsibleItem>
  );
}

// Benefit Editor
interface BenefitEditorProps {
  benefit: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  index: number;
  onChange: (benefit: BenefitEditorProps["benefit"]) => void;
  onDelete: () => void;
}

function BenefitEditor({ benefit, index, onChange, onDelete }: BenefitEditorProps) {
  return (
    <CollapsibleItem
      title={benefit.title || `Benefit ${index + 1}`}
      index={index}
      onDelete={onDelete}
    >
      <TextField
        label="Title"
        value={benefit.title}
        onChange={(v) => onChange({ ...benefit, title: v })}
      />
      <TextareaField
        label="Description"
        value={benefit.description}
        onChange={(v) => onChange({ ...benefit, description: v })}
        rows={2}
      />
      <SelectField
        label="Icon"
        value={benefit.icon || "check-circle"}
        options={ICON_OPTIONS}
        onChange={(v) => onChange({ ...benefit, icon: v })}
      />
    </CollapsibleItem>
  );
}

// Trust Signal Editor (for payment-form)
interface TrustSignalEditorProps {
  signal: { id: string; icon: string; text: string };
  index: number;
  onChange: (signal: TrustSignalEditorProps["signal"]) => void;
  onDelete: () => void;
}

function TrustSignalEditor({ signal, index, onChange, onDelete }: TrustSignalEditorProps) {
  return (
    <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
      <select
        value={signal.icon}
        onChange={(e) => onChange({ ...signal, icon: e.target.value })}
        className="px-2 py-1 border border-gray-300 rounded text-xs"
      >
        {ICON_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <input
        type="text"
        value={signal.text}
        onChange={(e) => onChange({ ...signal, text: e.target.value })}
        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
        placeholder="Signal text"
      />
      <button
        onClick={onDelete}
        className="p-1 text-red-400 hover:text-red-600"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
