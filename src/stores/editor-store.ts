import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  EditorStore,
  EditorBlock,
  BlockType,
  BlockContent,
} from "@/types/cms";

// Database response types (snake_case from PostgreSQL)
interface DBBlock {
  id: string;
  type: string;
  content: unknown;
  settings: unknown;
  position: number;
  is_visible: boolean;
}

interface DBPageWithBlocks {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  is_published: boolean;
  blocks: DBBlock[];
}

const MAX_HISTORY = 50;

// Default content for new blocks
const defaultBlockContent: Record<BlockType, BlockContent> = {
  hero: {
    title: "New Hero Section",
    titleHighlight: "",
    subtitle: "Add your subtitle here",
    overlay: "medium",
    trustBadges: [],
    primaryCta: { text: "Get Started", href: "/contact", variant: "primary" },
    layout: "centered",
  },
  "services-overview": {
    sectionTitle: "Our Services",
    sectionSubtitle: "What we offer",
    serviceIds: [],
    layout: "3-col",
    showCta: true,
  },
  "services-grid": {
    sectionTitle: "All Services",
    sectionSubtitle: "",
    serviceIds: [],
    layout: "3-col",
    showCta: true,
  },
  testimonials: {
    sectionTitle: "What Our Customers Say",
    testimonialIds: "featured",
    layout: "grid",
    maxItems: 3,
    showSource: true,
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    sectionSubtitle: "",
    categories: ["general"],
    layout: "accordion",
    maxItems: 10,
  },
  "why-choose-us": {
    sectionTitle: "Why Choose Us",
    features: [],
    showImage: false,
    showVeteranBadge: true,
  },
  "areas-served": {
    title: "Areas We Serve",
    subtitle: "",
    showMap: true,
    showList: true,
  },
  "final-cta": {
    title: "Ready to Get Started?",
    subtitle: "Contact us today",
    primaryButton: { text: "Contact Us", href: "/contact" },
    background: "gradient",
  },
  "contact-info": {
    title: "Contact Us",
    showPhone: true,
    showEmail: true,
    showHours: true,
    showLocations: true,
    showMap: true,
  },
  "text-content": {
    title: "",
    content: "Add your content here...",
    alignment: "left",
  },
  "image-text": {
    title: "Section Title",
    content: "Your content here...",
    imageUrl: "",
    imageAlt: "",
    imagePosition: "right",
    showCta: false,
  },
  "stats-grid": {
    title: "",
    stats: [],
    layout: "4-col",
  },
  "repair-process": {
    sectionTitle: "Our Process",
    sectionSubtitle: "How we get your AC running again",
    steps: [
      { id: "1", number: "01", title: "You Call", description: "We answer and schedule a visit", badge: "Same day" },
      { id: "2", number: "02", title: "We Diagnose", description: "Find the real problem", badge: "Honest assessment" },
      { id: "3", number: "03", title: "You Approve", description: "Know the price before we start", badge: "No hidden fees" },
      { id: "4", number: "04", title: "We Fix It", description: "Quality parts, proper installation", badge: "Guaranteed" },
    ],
    layout: "horizontal",
  },
  "how-it-works": {
    sectionTitle: "How It Works",
    sectionSubtitle: "Getting started is easy",
    steps: [
      { id: "1", number: "01", title: "Contact Us", shortTitle: "Get in touch", description: "Call or book online" },
      { id: "2", number: "02", title: "Pick a Time", shortTitle: "Schedule your visit", description: "Same-day available" },
      { id: "3", number: "03", title: "We Arrive", shortTitle: "Expert service", description: "On time, every time" },
      { id: "4", number: "04", title: "Pay Your Way", shortTitle: "Transparent pricing", description: "Card, cash, or financing" },
    ],
    layout: "cards",
  },
};

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      pageSlug: null,
      page: null,
      selectedBlockId: null,
      hoveredBlockId: null,
      isPanelOpen: true,
      activePanel: "blocks",
      viewMode: "edit",
      deviceMode: "desktop",
      draftBlocks: [],
      hasUnsavedChanges: false,
      history: [],
      historyIndex: -1,
      isLoading: false,
      isSaving: false,
      isPublishing: false,

      // Page management
      loadPage: async (slug: string) => {
        set({ isLoading: true, pageSlug: slug });

        try {
          const response = await fetch(`/api/cms/pages/${slug}`);
          if (!response.ok) throw new Error("Failed to load page");

          const dbPage: DBPageWithBlocks = await response.json();

          // Transform database blocks to editor blocks
          const blocks: EditorBlock[] = dbPage.blocks.map((b) => ({
            id: b.id,
            type: b.type as BlockType,
            content: b.content as BlockContent,
            settings: b.settings as EditorBlock["settings"],
            position: b.position,
            isVisible: b.is_visible,
          }));

          // Transform to PageWithBlocks format for state
          const page = {
            id: dbPage.id,
            slug: dbPage.slug,
            title: dbPage.title,
            description: dbPage.description,
            seo_title: dbPage.seo_title,
            seo_description: dbPage.seo_description,
            og_image: dbPage.og_image,
            is_published: dbPage.is_published,
            blocks,
          };

          set({
            page,
            draftBlocks: blocks,
            history: [blocks],
            historyIndex: 0,
            isLoading: false,
            hasUnsavedChanges: false,
          });
        } catch (error) {
          console.error("Failed to load page:", error);
          set({ isLoading: false });
        }
      },

      saveDraft: async () => {
        const { page, draftBlocks } = get();
        if (!page) return;

        set({ isSaving: true });

        try {
          // Update block positions and save
          const savePromises = draftBlocks.map((block, index) =>
            fetch(`/api/cms/blocks/${block.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...block,
                position: index,
                is_visible: block.isVisible,
              }),
            })
          );

          await Promise.all(savePromises);
          set({ hasUnsavedChanges: false, isSaving: false });
        } catch (error) {
          console.error("Failed to save:", error);
          set({ isSaving: false });
        }
      },

      publish: async () => {
        const { page, saveDraft } = get();
        if (!page) return;

        set({ isPublishing: true });

        try {
          // Save first
          await saveDraft();

          // Then publish
          await fetch(`/api/cms/pages/${page.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...page, is_published: true }),
          });

          set({ isPublishing: false });
        } catch (error) {
          console.error("Failed to publish:", error);
          set({ isPublishing: false });
        }
      },

      // Block management
      selectBlock: (id) => {
        set({
          selectedBlockId: id,
          activePanel: id ? "settings" : "blocks",
        });
      },

      hoverBlock: (id) => set({ hoveredBlockId: id }),

      addBlock: async (type: BlockType, position: number) => {
        const { page, draftBlocks } = get();
        if (!page) return;

        try {
          const response = await fetch("/api/cms/blocks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              page_id: page.id,
              type,
              content: defaultBlockContent[type],
              settings: { padding: "md", background: "white" },
              position,
              is_visible: true,
            }),
          });

          const newBlock = await response.json();

          const editorBlock: EditorBlock = {
            id: newBlock.id,
            type: type,
            content: newBlock.content,
            settings: newBlock.settings,
            position: position,
            isVisible: true,
          };

          const newBlocks = [...draftBlocks];
          newBlocks.splice(position, 0, editorBlock);

          // Update positions
          newBlocks.forEach((b, i) => (b.position = i));

          get().pushHistory(newBlocks);
          set({
            draftBlocks: newBlocks,
            selectedBlockId: newBlock.id,
            hasUnsavedChanges: true,
          });
        } catch (error) {
          console.error("Failed to add block:", error);
        }
      },

      updateBlock: (id, updates) => {
        const { draftBlocks } = get();
        const newBlocks = draftBlocks.map((block) =>
          block.id === id ? { ...block, ...updates } : block
        );

        get().pushHistory(newBlocks);
        set({ draftBlocks: newBlocks, hasUnsavedChanges: true });
      },

      updateBlockContent: (id, contentUpdates) => {
        const { draftBlocks } = get();
        const newBlocks = draftBlocks.map((block) =>
          block.id === id
            ? {
                ...block,
                content: { ...block.content, ...contentUpdates } as BlockContent,
              }
            : block
        );

        get().pushHistory(newBlocks);
        set({ draftBlocks: newBlocks, hasUnsavedChanges: true });
      },

      deleteBlock: async (id) => {
        const { draftBlocks } = get();

        try {
          await fetch(`/api/cms/blocks/${id}`, { method: "DELETE" });

          const newBlocks = draftBlocks.filter((b) => b.id !== id);
          newBlocks.forEach((b, i) => (b.position = i));

          get().pushHistory(newBlocks);
          set({
            draftBlocks: newBlocks,
            selectedBlockId: null,
            hasUnsavedChanges: true,
          });
        } catch (error) {
          console.error("Failed to delete block:", error);
        }
      },

      reorderBlocks: (activeId, overId) => {
        const { draftBlocks } = get();

        const oldIndex = draftBlocks.findIndex((b) => b.id === activeId);
        const newIndex = draftBlocks.findIndex((b) => b.id === overId);

        if (oldIndex === -1 || newIndex === -1) return;

        const newBlocks = [...draftBlocks];
        const [removed] = newBlocks.splice(oldIndex, 1);
        newBlocks.splice(newIndex, 0, removed);

        newBlocks.forEach((b, i) => (b.position = i));

        get().pushHistory(newBlocks);
        set({ draftBlocks: newBlocks, hasUnsavedChanges: true });
      },

      toggleBlockVisibility: (id) => {
        const { draftBlocks } = get();
        const newBlocks = draftBlocks.map((block) =>
          block.id === id ? { ...block, isVisible: !block.isVisible } : block
        );

        get().pushHistory(newBlocks);
        set({ draftBlocks: newBlocks, hasUnsavedChanges: true });
      },

      duplicateBlock: async (id) => {
        const { page, draftBlocks } = get();
        if (!page) return;

        const blockToDuplicate = draftBlocks.find((b) => b.id === id);
        if (!blockToDuplicate) return;

        const position = blockToDuplicate.position + 1;

        try {
          const response = await fetch("/api/cms/blocks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              page_id: page.id,
              type: blockToDuplicate.type,
              content: blockToDuplicate.content,
              settings: blockToDuplicate.settings,
              position,
              is_visible: blockToDuplicate.isVisible,
            }),
          });

          const newBlock = await response.json();

          const editorBlock: EditorBlock = {
            id: newBlock.id,
            type: blockToDuplicate.type,
            content: { ...blockToDuplicate.content },
            settings: { ...blockToDuplicate.settings },
            position,
            isVisible: blockToDuplicate.isVisible,
          };

          const newBlocks = [...draftBlocks];
          newBlocks.splice(position, 0, editorBlock);
          newBlocks.forEach((b, i) => (b.position = i));

          get().pushHistory(newBlocks);
          set({
            draftBlocks: newBlocks,
            selectedBlockId: newBlock.id,
            hasUnsavedChanges: true,
          });
        } catch (error) {
          console.error("Failed to duplicate block:", error);
        }
      },

      // UI actions
      setActivePanel: (panel) => set({ activePanel: panel }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setDeviceMode: (mode) => set({ deviceMode: mode }),

      // History management
      pushHistory: (blocks: EditorBlock[]) => {
        const { history, historyIndex } = get();

        // Remove any future history if we're not at the end
        const newHistory = history.slice(0, historyIndex + 1);

        // Add new state
        newHistory.push(blocks);

        // Limit history size
        if (newHistory.length > MAX_HISTORY) {
          newHistory.shift();
        }

        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({
            draftBlocks: history[newIndex],
            historyIndex: newIndex,
            hasUnsavedChanges: true,
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({
            draftBlocks: history[newIndex],
            historyIndex: newIndex,
            hasUnsavedChanges: true,
          });
        }
      },

      canUndo: () => {
        const { historyIndex } = get();
        return historyIndex > 0;
      },

      canRedo: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
      },
    }),
    { name: "editor-store" }
  )
);
