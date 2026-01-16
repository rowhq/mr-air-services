// Block Types
export type BlockType =
  | "hero"
  | "services-overview"
  | "services-grid"
  | "testimonials"
  | "faq"
  | "why-choose-us"
  | "areas-served"
  | "final-cta"
  | "contact-info"
  | "text-content"
  | "image-text"
  | "stats-grid"
  | "repair-process"
  | "how-it-works"
  // New block types for full CMS coverage
  | "legal-content"
  | "contact-form"
  | "brand-logos"
  | "problem-grid"
  | "warning-signs"
  | "inspection-phases"
  | "checklist-grid"
  | "benefits-grid"
  | "comparison-section"
  | "payment-form";

export interface BlockSettings {
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "gray" | "dark" | "gradient" | "custom";
  customBgColor?: string;
  maxWidth?: "full" | "container" | "narrow";
}

// Block Content Types
export interface HeroBlockContent {
  title: string;
  titleHighlight?: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay: "none" | "light" | "medium" | "dark";
  trustBadges: TrustBadge[];
  primaryCta: {
    text: string;
    href: string;
    variant: "primary" | "secondary";
  };
  secondaryCta?: {
    text: string;
    href: string;
    type: "link" | "phone";
  };
  layout: "centered" | "left-aligned";
}

export interface TrustBadge {
  id: string;
  icon: string;
  text: string;
}

export interface ServicesOverviewBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  serviceIds: string[] | "featured";
  layout: "2-col" | "3-col" | "4-col";
  showCta: boolean;
}

export interface TestimonialsBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  testimonialIds: string[] | "featured";
  layout: "grid" | "carousel" | "masonry";
  maxItems: number;
  showSource: boolean;
}

export interface FAQBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  categories: string[];
  pageSlug?: string;
  layout: "accordion" | "two-column" | "tabs";
  maxItems: number;
}

export interface WhyChooseUsBlockContent {
  sectionTitle: string;
  features: {
    id: string;
    icon: string;
    title: string;
    description: string;
    stat: string;
    statLabel: string;
  }[];
  showImage: boolean;
  imageUrl?: string;
  showVeteranBadge: boolean;
}

export interface ContactInfoBlockContent {
  title: string;
  subtitle?: string;
  showPhone: boolean;
  showEmail: boolean;
  showHours: boolean;
  showLocations: boolean;
  locationIds?: string[];
  showMap: boolean;
}

export interface FinalCTABlockContent {
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    type: "link" | "phone";
  };
  background: "gradient" | "solid" | "image";
  backgroundImage?: string;
}

export interface TextContentBlockContent {
  title?: string;
  content: string;
  alignment: "left" | "center" | "right";
}

export interface ImageTextBlockContent {
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  showCta: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface StatsGridBlockContent {
  title?: string;
  stats: {
    id: string;
    value: string;
    label: string;
    icon?: string;
  }[];
  layout: "2-col" | "3-col" | "4-col";
}

export interface AreasServedBlockContent {
  title: string;
  subtitle?: string;
  showMap: boolean;
  showList: boolean;
  highlightedAreas?: string[];
}

export interface RepairProcessBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  steps: {
    id: string;
    number: string;
    title: string;
    description: string;
    badge?: string;
  }[];
  layout: "horizontal" | "vertical" | "timeline";
}

export interface HowItWorksBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  steps: {
    id: string;
    number: string;
    title: string;
    shortTitle?: string;
    description: string;
  }[];
  layout: "cards" | "timeline" | "accordion";
}

// === NEW BLOCK TYPES FOR FULL CMS COVERAGE ===

export interface LegalContentBlockContent {
  title: string;
  lastUpdated: string;
  sections: {
    id: string;
    heading: string;
    content: string; // HTML content
    listItems?: string[];
  }[];
  contactInfo?: {
    phone: string;
    email: string;
  };
}

export interface ContactFormBlockContent {
  title: string;
  subtitle: string;
  successMessage: {
    title: string;
    description: string;
  };
  serviceOptions: {
    id: string;
    label: string;
    icon: string;
  }[];
  preferredTimes: string[];
  submitButtonText: string;
  showBusinessInfo: boolean;
  showServiceArea: boolean;
}

export interface BrandLogosBlockContent {
  sectionTitle?: string;
  sectionSubtitle?: string;
  brands: {
    id: string;
    name: string;
    logo?: string;
  }[];
  layout: "inline" | "grid";
}

export interface ProblemGridBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  problems: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  layout: "2-col" | "3-col";
}

export interface WarningSignsBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  signs: {
    id: string;
    title: string;
    description: string;
    icon: string;
    isEmergency?: boolean;
  }[];
  emergencyBanner?: {
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
  };
}

export interface InspectionPhasesBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  phases: {
    id: string;
    name: string;
    icon: string;
    items: string[];
  }[];
  safetyCallout?: {
    title: string;
    content: string;
  };
}

export interface ChecklistGridBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: string[];
  initialVisibleCount: number;
  showExpandButton: boolean;
}

export interface BenefitsGridBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  benefits: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  layout: "2-col" | "3-col" | "4-col";
}

export interface ComparisonSectionBlockContent {
  sectionTitle: string;
  sectionSubtitle?: string;
  leftOption: {
    title: string;
    description: string;
    icon: string;
    variant: "negative" | "neutral";
  };
  rightOption: {
    title: string;
    description: string;
    icon: string;
    variant: "positive";
  };
  floatingStat?: {
    value: string;
    label: string;
  };
  imageUrl?: string;
}

export interface PaymentFormBlockContent {
  title: string;
  subtitle: string;
  paymentUrl: string;
  trustSignals: {
    id: string;
    icon: string;
    text: string;
  }[];
  helpBox: {
    title: string;
    description: string;
    phone: string;
    financingText: string;
    financingLink: string;
  };
}

// Union type for all block content
export type BlockContent =
  | HeroBlockContent
  | ServicesOverviewBlockContent
  | TestimonialsBlockContent
  | FAQBlockContent
  | WhyChooseUsBlockContent
  | ContactInfoBlockContent
  | FinalCTABlockContent
  | TextContentBlockContent
  | ImageTextBlockContent
  | StatsGridBlockContent
  | AreasServedBlockContent
  | RepairProcessBlockContent
  | HowItWorksBlockContent
  // New block content types
  | LegalContentBlockContent
  | ContactFormBlockContent
  | BrandLogosBlockContent
  | ProblemGridBlockContent
  | WarningSignsBlockContent
  | InspectionPhasesBlockContent
  | ChecklistGridBlockContent
  | BenefitsGridBlockContent
  | ComparisonSectionBlockContent
  | PaymentFormBlockContent;

// Editor Block (with full typing)
export interface EditorBlock {
  id: string;
  type: BlockType;
  content: BlockContent;
  settings: BlockSettings;
  position: number;
  isVisible: boolean;
}

// Page with blocks
export interface PageWithBlocks {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  is_published: boolean;
  blocks: EditorBlock[];
}

// Preview data for live preview
export interface PreviewData {
  services: {
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
  }[];
  testimonials: {
    id: string;
    initials: string;
    location: string;
    rating: number;
    text: string;
    source: string;
    is_featured: boolean;
  }[];
  officeLocations: {
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
  }[];
}

// Editor state
export interface EditorState {
  // Current page
  pageSlug: string | null;
  page: PageWithBlocks | null;

  // UI State
  selectedBlockId: string | null;
  hoveredBlockId: string | null;
  isPanelOpen: boolean;
  activePanel: "blocks" | "settings" | "seo" | null;
  viewMode: "edit" | "preview";
  deviceMode: "desktop" | "tablet" | "mobile";

  // Draft State
  draftBlocks: EditorBlock[];
  hasUnsavedChanges: boolean;

  // Preview data for live preview
  previewData: PreviewData | null;

  // History
  history: EditorBlock[][];
  historyIndex: number;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;
  isPublishing: boolean;
}

// Editor actions
export interface EditorActions {
  // Page management
  loadPage: (slug: string) => Promise<void>;
  saveDraft: () => Promise<void>;
  publish: () => Promise<void>;
  loadPreviewData: () => Promise<void>;

  // Block management
  selectBlock: (id: string | null) => void;
  hoverBlock: (id: string | null) => void;
  addBlock: (type: BlockType, position: number) => void;
  updateBlock: (id: string, updates: Partial<EditorBlock>) => void;
  updateBlockContent: (id: string, content: Partial<BlockContent>) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  toggleBlockVisibility: (id: string) => void;
  duplicateBlock: (id: string) => void;

  // UI actions
  setActivePanel: (panel: "blocks" | "settings" | "seo" | null) => void;
  setViewMode: (mode: "edit" | "preview") => void;
  setDeviceMode: (mode: "desktop" | "tablet" | "mobile") => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  pushHistory: (blocks: EditorBlock[]) => void;
}

export type EditorStore = EditorState & EditorActions;
