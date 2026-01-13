"use client";

import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/stores/editor-store";
import type { BlockType } from "@/types/cms";

interface BlockDefinition {
  type: BlockType;
  label: string;
  description: string;
  category: "Layout" | "Content" | "Basic" | "Forms" | "Advanced";
}

// All 24 block types with descriptions
const blockDefinitions: BlockDefinition[] = [
  // Layout
  {
    type: "hero",
    label: "Hero",
    description: "Main header with title, CTA and background",
    category: "Layout",
  },
  {
    type: "final-cta",
    label: "Call to Action",
    description: "Bottom section with CTA buttons",
    category: "Layout",
  },

  // Content
  {
    type: "services-overview",
    label: "Services Grid",
    description: "Display featured services in a grid",
    category: "Content",
  },
  {
    type: "services-grid",
    label: "All Services",
    description: "Complete services listing",
    category: "Content",
  },
  {
    type: "testimonials",
    label: "Testimonials",
    description: "Customer reviews and ratings",
    category: "Content",
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Frequently asked questions accordion",
    category: "Content",
  },
  {
    type: "why-choose-us",
    label: "Why Choose Us",
    description: "Features and benefits section",
    category: "Content",
  },
  {
    type: "areas-served",
    label: "Areas Served",
    description: "Service coverage map and list",
    category: "Content",
  },
  {
    type: "contact-info",
    label: "Contact Info",
    description: "Phone, email, hours and locations",
    category: "Content",
  },
  {
    type: "repair-process",
    label: "Repair Process",
    description: "Step-by-step process timeline",
    category: "Content",
  },
  {
    type: "how-it-works",
    label: "How It Works",
    description: "Process explanation cards",
    category: "Content",
  },
  {
    type: "brand-logos",
    label: "Brand Logos",
    description: "Partner or brand logo display",
    category: "Content",
  },

  // Basic
  {
    type: "text-content",
    label: "Text Block",
    description: "Simple text with optional title",
    category: "Basic",
  },
  {
    type: "image-text",
    label: "Image + Text",
    description: "Image alongside text content",
    category: "Basic",
  },
  {
    type: "stats-grid",
    label: "Stats Grid",
    description: "Numbers and statistics display",
    category: "Basic",
  },
  {
    type: "benefits-grid",
    label: "Benefits Grid",
    description: "Feature cards with icons",
    category: "Basic",
  },
  {
    type: "checklist-grid",
    label: "Checklist",
    description: "Expandable checklist items",
    category: "Basic",
  },

  // Forms
  {
    type: "contact-form",
    label: "Contact Form",
    description: "Customer inquiry form",
    category: "Forms",
  },
  {
    type: "payment-form",
    label: "Payment Form",
    description: "Payment integration section",
    category: "Forms",
  },

  // Advanced
  {
    type: "legal-content",
    label: "Legal Content",
    description: "Privacy policy, terms, etc.",
    category: "Advanced",
  },
  {
    type: "problem-grid",
    label: "Problem Grid",
    description: "Common issues display",
    category: "Advanced",
  },
  {
    type: "warning-signs",
    label: "Warning Signs",
    description: "Alert indicators with CTA",
    category: "Advanced",
  },
  {
    type: "inspection-phases",
    label: "Inspection Phases",
    description: "Multi-phase inspection guide",
    category: "Advanced",
  },
  {
    type: "comparison-section",
    label: "Comparison",
    description: "Side-by-side comparison view",
    category: "Advanced",
  },
];

const categoryOrder = ["Layout", "Content", "Basic", "Forms", "Advanced"];

const categoryIcons: Record<string, React.ReactNode> = {
  Layout: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  Content: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Basic: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  Forms: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Advanced: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

interface FloatingBlockInserterProps {
  insertPosition?: number;
}

export function FloatingBlockInserter({ insertPosition }: FloatingBlockInserterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { draftBlocks, addBlock } = useEditorStore();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when opening
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleAddBlock = (type: BlockType) => {
    const position = insertPosition ?? draftBlocks.length;
    addBlock(type, position);
    setIsOpen(false);
    setSearch("");
    setSelectedCategory(null);
  };

  // Filter blocks by search
  const filteredBlocks = blockDefinitions.filter((block) => {
    const matchesSearch =
      search === "" ||
      block.label.toLowerCase().includes(search.toLowerCase()) ||
      block.description.toLowerCase().includes(search.toLowerCase()) ||
      block.type.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = !selectedCategory || block.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedBlocks = categoryOrder.reduce(
    (acc, category) => {
      const blocks = filteredBlocks.filter((b) => b.category === category);
      if (blocks.length > 0) {
        acc[category] = blocks;
      }
      return acc;
    },
    {} as Record<string, BlockDefinition[]>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full shadow-lg
          transition-all duration-200 ease-out
          ${isOpen
            ? "bg-blue-600 text-white rotate-45 scale-110"
            : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
          }
        `}
        title="Add block"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
          {/* Search Header */}
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search blocks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-1 p-2 border-b border-gray-100 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Block List */}
          <div className="max-h-80 overflow-y-auto">
            {Object.keys(groupedBlocks).length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">No blocks found</p>
              </div>
            ) : (
              Object.entries(groupedBlocks).map(([category, blocks]) => (
                <div key={category} className="py-2">
                  <div className="px-3 py-1 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {categoryIcons[category]}
                    {category}
                  </div>
                  {blocks.map((block) => (
                    <button
                      key={block.type}
                      onClick={() => handleAddBlock(block.type)}
                      className="w-full px-3 py-2 flex items-start gap-3 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                        {categoryIcons[block.category]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{block.label}</div>
                        <div className="text-xs text-gray-500 truncate">{block.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-400 text-center">
              {filteredBlocks.length} blocks available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Between-blocks inserter that appears on hover
interface BlockGapInserterProps {
  position: number;
}

export function BlockGapInserter({ position }: BlockGapInserterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-6 -my-3 flex items-center justify-center z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isOpen && setIsHovered(false)}
    >
      {/* Hover line indicator */}
      <div
        className={`absolute inset-x-4 h-0.5 bg-blue-400 transition-opacity ${
          isHovered || isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Insert button */}
      <div
        className={`transition-all duration-150 ${
          isHovered || isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <FloatingBlockInserter insertPosition={position} />
      </div>
    </div>
  );
}
