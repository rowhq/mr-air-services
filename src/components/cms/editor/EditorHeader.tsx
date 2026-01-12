"use client";

import Link from "next/link";
import { useEditorStore } from "@/stores/editor-store";

interface EditorHeaderProps {
  pageTitle: string;
}

export function EditorHeader({ pageTitle }: EditorHeaderProps) {
  const {
    hasUnsavedChanges,
    isSaving,
    isPublishing,
    saveDraft,
    publish,
    viewMode,
    setViewMode,
    deviceMode,
    setDeviceMode,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useEditorStore();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
      {/* Left: Back + Page Title */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Back to Admin"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="font-semibold text-gray-900">{pageTitle}</h1>
          <span className="text-xs text-gray-500">
            {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
          </span>
        </div>
      </div>

      {/* Center: View Mode + Device */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center border-r border-gray-200 pr-3 mr-3">
          <button
            onClick={undo}
            disabled={!canUndo()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
            title="Undo (Ctrl+Z)"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30"
            title="Redo (Ctrl+Shift+Z)"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
              />
            </svg>
          </button>
        </div>

        {/* View Mode */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "edit"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "preview"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Device Mode */}
        <div className="flex items-center gap-1 border-l border-gray-200 pl-3 ml-1">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === "desktop"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Desktop"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === "tablet"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Tablet"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === "mobile"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Mobile"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right: Save + Publish */}
      <div className="flex items-center gap-3">
        <button
          onClick={saveDraft}
          disabled={!hasUnsavedChanges || isSaving}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={publish}
          disabled={isPublishing}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </header>
  );
}
