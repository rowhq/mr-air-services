"use client";

import { useState, useMemo } from "react";
import {
  LayoutDashboardIcon,
  PaletteIcon,
  FileTextIcon,
  WrenchIcon,
  MessageSquareIcon,
  ImageIcon,
  MapPinIcon,
  LinkIcon,
  SettingsIcon,
  MailIcon,
  SearchIcon,
  ChevronDownIcon,
  HelpCircleIcon,
} from "@/components/admin/icons";

// Types
interface HelpStep {
  title: string;
  items: string[];
}

interface HelpTip {
  type: "tip" | "warning" | "info";
  text: string;
}

interface HelpSection {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  steps: HelpStep[];
  tips?: HelpTip[];
  shortcuts?: { key: string; action: string }[];
}

// Help content data
const helpSections: HelpSection[] = [
  {
    id: "quick-start",
    icon: LayoutDashboardIcon,
    title: "Quick Start",
    description: "Learn the basics in 5 minutes",
    steps: [
      {
        title: "1. System Access",
        items: [
          "Navigate to yourdomain.com/login",
          "Enter your email and password",
          "Use the eye icon to show/hide password",
          "Click 'Sign In' to access the panel",
        ],
      },
      {
        title: "2. Main Dashboard",
        items: [
          "View statistics for pages, services, and testimonials",
          "Quickly access recently edited pages",
          "Use quick actions to edit content",
        ],
      },
      {
        title: "3. Sidebar Navigation",
        items: [
          "Main: Dashboard",
          "Content: Pages, Services, Testimonials, Media",
          "Settings: Locations, Navigation, Settings",
          "Leads: Form submissions",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "You can collapse the sidebar by clicking the arrow to get more space." },
    ],
  },
  {
    id: "visual-editor",
    icon: PaletteIcon,
    title: "Visual Editor",
    description: "Create and edit pages with drag & drop",
    steps: [
      {
        title: "Editor Interface",
        items: [
          "Left panel: Page preview",
          "Right panel: Selected block properties",
          "Top bar: View modes, undo/redo, save options",
        ],
      },
      {
        title: "Working with Blocks",
        items: [
          "Drag the ≡ icon to move blocks",
          "Click the eye icon to hide/show blocks",
          "Use the duplicate button to copy blocks",
          "Delete blocks with the trash icon",
        ],
      },
      {
        title: "Adding New Blocks",
        items: [
          "Hover between blocks to see '+ Add Block'",
          "Click and select the block type",
          "The block will be inserted at that position",
        ],
      },
      {
        title: "Save and Publish",
        items: [
          "Save Draft: Saves without publishing (draft only)",
          "Publish: Publishes changes to the live site",
          "The indicator shows if there are unsaved changes",
        ],
      },
    ],
    shortcuts: [
      { key: "Ctrl/Cmd + S", action: "Save draft" },
      { key: "Ctrl/Cmd + Z", action: "Undo" },
      { key: "Ctrl/Cmd + Shift + Z", action: "Redo" },
      { key: "Escape", action: "Deselect block" },
    ],
    tips: [
      { type: "warning", text: "Changes are NOT published automatically. You must click 'Publish' for them to be visible." },
    ],
  },
  {
    id: "pages",
    icon: FileTextIcon,
    title: "Page Management",
    description: "Manage your website pages",
    steps: [
      {
        title: "Editor Types",
        items: [
          "Visual Editor: For pages like Home, Contact, About (drag & drop)",
          "Content Editor: For service pages (form-based)",
        ],
      },
      {
        title: "Content Editor",
        items: [
          "Live preview while editing",
          "Collapsible sections to organize fields",
          "Changes reflect automatically in preview",
          "Field completion indicator (X/Y)",
        ],
      },
      {
        title: "View Modes",
        items: [
          "Desktop: Full width view",
          "Tablet: 768px width",
          "Mobile: 375px width",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Each page shows its status: Published or Draft." },
    ],
  },
  {
    id: "services",
    icon: WrenchIcon,
    title: "Services Management",
    description: "Create and edit offered services",
    steps: [
      {
        title: "Create a Service",
        items: [
          "Click '+ New Service'",
          "Fill in the title and slug (URL)",
          "Add short and full descriptions",
          "Select a representative icon",
          "Set the position (display order)",
          "Add features (one per line)",
        ],
      },
      {
        title: "Service Options",
        items: [
          "Featured: Appears on the homepage",
          "Published: Visible on the site",
          "Position: Controls display order",
        ],
      },
      {
        title: "Available Icons",
        items: [
          "HVAC: AC, Heating, Tune-Up",
          "Services: Snowflake, Thermometer, Fan, Droplets",
          "Quality: Shield, Check, Star, Award",
          "Tools: Wrench, Settings, Tools",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Use low numbers in 'Position' for the service to appear first." },
    ],
  },
  {
    id: "testimonials",
    icon: MessageSquareIcon,
    title: "Testimonials Management",
    description: "Manage customer reviews",
    steps: [
      {
        title: "Create a Testimonial",
        items: [
          "Click '+ New Testimonial'",
          "Enter customer initials (2 letters)",
          "Add location (city)",
          "Select rating (1-5 stars)",
          "Choose source (Google, Yelp, Facebook, Website)",
          "Write the testimonial text",
        ],
      },
      {
        title: "Manage Testimonials",
        items: [
          "Click the star to feature/unfeature",
          "Featured testimonials appear first",
          "You can hide testimonials without deleting them",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Google and Yelp testimonials generate more trust." },
    ],
  },
  {
    id: "media",
    icon: ImageIcon,
    title: "Media Library",
    description: "Upload and manage images",
    steps: [
      {
        title: "Upload Images",
        items: [
          "Drag and drop files into the upload area",
          "Or click '+ Upload Images' to select files",
          "You can upload multiple files at once",
        ],
      },
      {
        title: "Manage Images",
        items: [
          "Click an image to view its details",
          "Add Alt Text for SEO and accessibility",
          "Copy URL to use elsewhere",
          "Download or replace the image if needed",
        ],
      },
      {
        title: "Recommended Sizes",
        items: [
          "Hero/Banner: 1920 x 1080 px",
          "Thumbnails: 400 x 300 px",
          "Logos: 200 x 200 px (transparent PNG)",
          "OG Image (social media): 1200 x 630 px",
        ],
      },
    ],
    tips: [
      { type: "warning", text: "Always add descriptive Alt Text. It improves SEO and accessibility." },
    ],
  },
  {
    id: "locations",
    icon: MapPinIcon,
    title: "Office Locations",
    description: "Manage branch offices",
    steps: [
      {
        title: "Add Location",
        items: [
          "Click '+ New Location'",
          "Enter name, address, city, state, and zip code",
          "Add phone and email (optional)",
          "Set business hours for each day",
        ],
      },
      {
        title: "Primary Location",
        items: [
          "Mark a location as 'Primary'",
          "The primary location is displayed prominently",
          "There can only be one primary location",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Default hours: Mon-Fri 7AM-6PM, Sat 8AM-4PM, Sun Closed." },
    ],
  },
  {
    id: "navigation",
    icon: LinkIcon,
    title: "Site Navigation",
    description: "Edit header and footer menus",
    steps: [
      {
        title: "Edit Navigation",
        items: [
          "Select the Header or Footer tab",
          "Each link shows: Label, URL, Type, Visibility",
          "Use arrows to reorder items",
        ],
      },
      {
        title: "Create a Link",
        items: [
          "Click '+ New Link'",
          "Select location (Header or Footer)",
          "Enter text (Label) and URL",
          "Check 'External' if it opens in a new tab",
          "Select a parent to create submenus",
        ],
      },
      {
        title: "Link Types",
        items: [
          "Internal: Links within the site (/contact, /services)",
          "External: Links to other sites (https://...)",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "You can temporarily hide links without deleting them using the visibility toggle." },
    ],
  },
  {
    id: "settings",
    icon: SettingsIcon,
    title: "General Settings",
    description: "Global site configuration",
    steps: [
      {
        title: "Company Information",
        items: [
          "Company name",
          "Main phone number",
          "Main email",
          "Physical address",
        ],
      },
      {
        title: "Business Hours",
        items: [
          "Set hours for each day",
          "Include emergency hours",
          "These hours are displayed on the site",
        ],
      },
      {
        title: "Social Media",
        items: [
          "Facebook, Instagram, Twitter/X",
          "LinkedIn, YouTube, Yelp",
          "Google Business Profile",
        ],
      },
      {
        title: "Default SEO",
        items: [
          "Default title for pages without a title",
          "Title suffix (appears on all pages)",
          "Default description",
          "OG image for social sharing",
        ],
      },
    ],
    tips: [
      { type: "warning", text: "Remember to save changes with the 'Save Changes' button." },
    ],
  },
  {
    id: "leads",
    icon: MailIcon,
    title: "Lead Management",
    description: "Manage form submissions",
    steps: [
      {
        title: "View Leads",
        items: [
          "Top cards show count by status",
          "Click a card to filter",
          "Select a lead to view details",
        ],
      },
      {
        title: "Lead Statuses",
        items: [
          "New (Blue): Newly received lead",
          "Contacted (Yellow): Customer has been contacted",
          "Converted (Green): Became a customer",
          "Closed (Gray): Lead closed",
        ],
      },
      {
        title: "Workflow",
        items: [
          "1. Lead arrives as 'New'",
          "2. When contacted, change to 'Contacted'",
          "3. If they confirm service, change to 'Converted'",
          "4. When complete, change to 'Closed'",
        ],
      },
    ],
    tips: [
      { type: "tip", text: "Check new leads daily for quick response." },
    ],
  },
  {
    id: "shortcuts",
    icon: HelpCircleIcon,
    title: "Keyboard Shortcuts",
    description: "Work faster with shortcuts",
    steps: [
      {
        title: "Visual Editor",
        items: [
          "Ctrl/Cmd + S: Save draft",
          "Ctrl/Cmd + Z: Undo last change",
          "Ctrl/Cmd + Shift + Z: Redo change",
          "Escape: Deselect current block",
        ],
      },
      {
        title: "General Navigation",
        items: [
          "Ctrl/Cmd + K: Open sidebar search",
        ],
      },
    ],
    tips: [
      { type: "info", text: "Shortcuts work on Mac (Cmd) and Windows/Linux (Ctrl)." },
    ],
  },
];

// Quick access cards component
function QuickAccessCard({
  section,
  onClick,
  isActive,
}: {
  section: HelpSection;
  onClick: () => void;
  isActive: boolean;
}) {
  const Icon = section.icon;
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl border-2 text-left transition-all
        hover:border-secondary hover:shadow-md
        ${isActive
          ? "border-secondary bg-secondary/5 dark:bg-secondary/10"
          : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-lg
          ${isActive
            ? "bg-secondary text-white"
            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          }
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
            {section.title}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {section.description}
          </p>
        </div>
      </div>
    </button>
  );
}

// Accordion section component
function AccordionSection({
  section,
  isExpanded,
  onToggle,
}: {
  section: HelpSection;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              {section.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {section.description}
            </p>
          </div>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className={`
        overflow-hidden transition-all duration-300 ease-out
        ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
      `}>
        <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-700">
          {/* Steps */}
          <div className="space-y-6">
            {section.steps.map((step, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                  {step.title}
                </h4>
                <ul className="space-y-2">
                  {step.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-secondary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Shortcuts */}
          {section.shortcuts && section.shortcuts.length > 0 && (
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                Keyboard Shortcuts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {section.shortcuts.map((shortcut, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs font-mono text-neutral-700 dark:text-neutral-300">
                      {shortcut.key}
                    </kbd>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {shortcut.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {section.tips && section.tips.length > 0 && (
            <div className="mt-6 space-y-3">
              {section.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className={`
                    p-4 rounded-lg text-sm flex items-start gap-3
                    ${tip.type === "tip"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                      : tip.type === "warning"
                      ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    }
                  `}
                >
                  <span className="font-medium">
                    {tip.type === "tip" ? "Tip:" : tip.type === "warning" ? "Important:" : "Info:"}
                  </span>
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("quick-start");

  // Filter sections based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return helpSections;

    const query = searchQuery.toLowerCase();
    return helpSections.filter(section => {
      // Search in title and description
      if (section.title.toLowerCase().includes(query)) return true;
      if (section.description.toLowerCase().includes(query)) return true;

      // Search in steps
      for (const step of section.steps) {
        if (step.title.toLowerCase().includes(query)) return true;
        for (const item of step.items) {
          if (item.toLowerCase().includes(query)) return true;
        }
      }

      return false;
    });
  }, [searchQuery]);

  const handleQuickAccessClick = (sectionId: string) => {
    setExpandedSection(sectionId);
    // Scroll to section
    setTimeout(() => {
      document.getElementById(`section-${sectionId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Help Center
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Learn how to use the Mr. Air Services CMS
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search help..."
          className="
            w-full pl-12 pr-4 py-3
            bg-white dark:bg-neutral-800
            border border-neutral-200 dark:border-neutral-700
            rounded-xl text-neutral-900 dark:text-white
            placeholder:text-neutral-400
            focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary
            transition-all
          "
        />
      </div>

      {/* Quick Access Grid */}
      {!searchQuery && (
        <div>
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {helpSections.map((section) => (
              <QuickAccessCard
                key={section.id}
                section={section}
                onClick={() => handleQuickAccessClick(section.id)}
                isActive={expandedSection === section.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Accordion Sections */}
      <div>
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
          {searchQuery ? `Results (${filteredSections.length})` : "Detailed Guides"}
        </h2>

        {filteredSections.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <HelpCircleIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400">
              No results found for &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <div key={section.id} id={`section-${section.id}`}>
                <AccordionSection
                  section={section}
                  isExpanded={expandedSection === section.id}
                  onToggle={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Need more help? Contact the system administrator.
        </p>
      </div>
    </div>
  );
}
