"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEditorStore } from "@/stores/editor-store";
import {
  EditorHeader,
  BlocksSidebar,
  EditorCanvas,
  PropertiesPanel,
} from "@/components/cms/editor";

export default function EditorPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { loadPage, page, isLoading, viewMode } = useEditorStore();

  useEffect(() => {
    if (slug) {
      loadPage(slug);
    }
  }, [slug, loadPage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        useEditorStore.getState().saveDraft();
      }
      // Ctrl/Cmd + Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        useEditorStore.getState().undo();
      }
      // Ctrl/Cmd + Shift + Z = Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        useEditorStore.getState().redo();
      }
      // Escape = Deselect
      if (e.key === "Escape") {
        useEditorStore.getState().selectBlock(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600">
            The page &quot;{slug}&quot; could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <EditorHeader pageTitle={page.title} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Blocks */}
        {viewMode === "edit" && <BlocksSidebar />}

        {/* Main Canvas */}
        <EditorCanvas />

        {/* Right Sidebar - Properties */}
        {viewMode === "edit" && <PropertiesPanel />}
      </div>
    </div>
  );
}
