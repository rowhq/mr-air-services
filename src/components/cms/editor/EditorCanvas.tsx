"use client";

import { useEditorStore } from "@/stores/editor-store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { EditorBlock } from "@/types/cms";
import { BlockRenderer } from "@/components/cms/BlockRenderer";
import { FloatingBlockInserter, BlockGapInserter } from "./FloatingBlockInserter";

interface SortableBlockProps {
  block: EditorBlock;
}

function SortableBlock({ block }: SortableBlockProps) {
  const {
    selectedBlockId,
    hoveredBlockId,
    selectBlock,
    hoverBlock,
    deleteBlock,
    toggleBlockVisibility,
    duplicateBlock,
  } = useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id;

  const blockTypeLabels: Record<string, string> = {
    hero: "Hero",
    "services-overview": "Services",
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group border-2 rounded-lg transition-all ${
        isSelected
          ? "border-blue-500 shadow-lg"
          : isHovered
            ? "border-blue-300"
            : "border-transparent hover:border-gray-300"
      } ${!block.isVisible ? "opacity-50" : ""}`}
      onClick={() => selectBlock(block.id)}
      onMouseEnter={() => hoverBlock(block.id)}
      onMouseLeave={() => hoverBlock(null)}
    >
      {/* Block Label */}
      <div
        className={`absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium rounded ${
          isSelected
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
        }`}
      >
        {blockTypeLabels[block.type] || block.type}
      </div>

      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1.5 bg-white rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
        title="Drag to reorder"
      >
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8h16M4 16h16"
          />
        </svg>
      </button>

      {/* Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBlockVisibility(block.id);
          }}
          className="p-1.5 bg-white rounded shadow-sm hover:bg-gray-50"
          title={block.isVisible ? "Hide block" : "Show block"}
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {block.isVisible ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            )}
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            duplicateBlock(block.id);
          }}
          className="p-1.5 bg-white rounded shadow-sm hover:bg-gray-50"
          title="Duplicate block"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Delete this block?")) {
              deleteBlock(block.id);
            }
          }}
          className="p-1.5 bg-white rounded shadow-sm hover:bg-red-50"
          title="Delete block"
        >
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Block Preview */}
      <div className="p-6 min-h-[120px] bg-gray-50 rounded-lg">
        <BlockPreview block={block} />
      </div>
    </div>
  );
}

function BlockPreview({ block }: { block: EditorBlock }) {
  // Simple preview based on block type
  const content = block.content as unknown as Record<string, unknown>;

  switch (block.type) {
    case "hero":
      return (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {(content.title as string) || "Hero Title"}
          </h2>
          <p className="text-gray-600 mt-2">
            {(content.subtitle as string) || "Hero subtitle"}
          </p>
        </div>
      );
    case "services-overview":
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {(content.sectionTitle as string) || "Services"}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      );
    case "testimonials":
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {(content.sectionTitle as string) || "Testimonials"}
          </h3>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      );
    case "faq":
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {(content.sectionTitle as string) || "FAQ"}
          </h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      );
    case "final-cta":
      return (
        <div className="text-center py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
          <h3 className="text-xl font-bold text-white">
            {(content.title as string) || "Call to Action"}
          </h3>
          <p className="text-blue-100 text-sm mt-1">
            {(content.subtitle as string) || "Subtitle"}
          </p>
        </div>
      );
    default:
      return (
        <div className="flex items-center justify-center h-20 text-gray-400">
          <span className="text-sm">{block.type} block</span>
        </div>
      );
  }
}

export function EditorCanvas() {
  const {
    draftBlocks,
    deviceMode,
    reorderBlocks,
    viewMode,
    previewData,
    selectedBlockId,
    hoveredBlockId,
    selectBlock,
    hoverBlock,
  } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderBlocks(active.id as string, over.id as string);
    }
  };

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  // Live preview mode - renders actual components with draft data
  // Blocks are clickable to select them for editing
  if (viewMode === "preview") {
    return (
      <div className="flex-1 bg-gray-100 overflow-auto">
        <div
          className="mx-auto bg-white shadow-lg transition-all duration-300"
          style={{
            width: deviceWidths[deviceMode],
            minHeight: "100%",
          }}
        >
          {previewData ? (
            <BlockRenderer
              blocks={draftBlocks}
              services={previewData.services}
              testimonials={previewData.testimonials}
              officeLocations={previewData.officeLocations}
              isEditing={true}
              selectedBlockId={selectedBlockId}
              hoveredBlockId={hoveredBlockId}
              onBlockClick={selectBlock}
              onBlockHover={hoverBlock}
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Loading preview...</p>
              </div>
            </div>
          )}
        </div>

        {/* Floating inserter button */}
        <div className="fixed bottom-6 right-80 z-50">
          <FloatingBlockInserter />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 overflow-auto p-8">
      <div
        className="mx-auto bg-white shadow-lg rounded-lg p-6 transition-all duration-300"
        style={{
          width: deviceWidths[deviceMode],
          minHeight: "calc(100vh - 200px)",
        }}
      >
        {draftBlocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <p className="text-lg font-medium">No blocks yet</p>
            <p className="text-sm">Click the + button to add your first block</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={draftBlocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {/* Gap inserter before first block */}
                <BlockGapInserter position={0} />

                {draftBlocks.map((block, index) => (
                  <div key={block.id}>
                    <SortableBlock block={block} />
                    {/* Gap inserter after each block */}
                    <BlockGapInserter position={index + 1} />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Floating inserter button */}
      <div className="fixed bottom-6 right-80 z-50">
        <FloatingBlockInserter />
      </div>
    </div>
  );
}
