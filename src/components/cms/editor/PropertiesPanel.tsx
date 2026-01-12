"use client";

import { useEditorStore } from "@/stores/editor-store";
import type { BlockSettings, BlockType } from "@/types/cms";

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

    case "testimonials":
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
        </div>
      );

    case "faq":
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
          <p className="text-xs text-gray-400 mt-2">
            Leave page slug empty to show general FAQs, or enter a page slug to show page-specific FAQs.
          </p>
        </div>
      );

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

    case "why-choose-us":
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
          <CheckboxField
            label="Show Veteran Badge"
            checked={(content.showVeteranBadge as boolean) ?? true}
            onChange={(v) => onChange("showVeteranBadge", v)}
          />
          <p className="text-xs text-gray-400 mt-2">
            Features can be edited in the database directly.
          </p>
        </div>
      );

    case "areas-served":
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
        </div>
      );

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

    case "stats-grid":
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
          <p className="text-xs text-gray-400 mt-2">
            Stats items can be edited in the database directly.
          </p>
        </div>
      );

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

    case "repair-process":
    case "how-it-works":
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
            ]}
            onChange={(v) => onChange("layout", v)}
          />
          <p className="text-xs text-gray-400 mt-2">
            Process steps can be edited in the database directly.
          </p>
        </div>
      );

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
