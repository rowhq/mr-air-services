"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Media } from "@/types/database";
import { ToastProvider, useToast } from "@/components/ui";

function MediaPageContent() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [editingAltText, setEditingAltText] = useState<string>("");
  const [showLightbox, setShowLightbox] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/cms/media");
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
      toast("Failed to load media", "error");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLightbox(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "general");

      try {
        const response = await fetch("/api/cms/media", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const newMedia = await response.json();
          setMedia((prev) => [newMedia, ...prev]);
          toast("Image uploaded successfully", "success");
        } else {
          const error = await response.json();
          toast(`Error: ${error.error}`, "error");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast(`Failed to upload ${file.name}`, "error");
      }
    }

    setIsUploading(false);
  }

  async function handleReplace(file: File) {
    if (!selectedMedia) return;

    setIsReplacing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/cms/media/${selectedMedia.id}/replace`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updated = await response.json();
        setMedia((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setSelectedMedia(updated);
        toast("Image replaced successfully", "success");
      } else {
        const error = await response.json();
        toast(`Error: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Replace failed:", error);
      toast("Failed to replace image", "error");
    } finally {
      setIsReplacing(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`/api/cms/media/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
        setSelectedMedia(null);
        toast("Image deleted", "success");
      } else {
        const error = await response.json();
        toast(`Error: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast("Failed to delete image", "error");
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast("URL copied to clipboard", "success");
  }

  async function updateAltText(id: string, altText: string) {
    try {
      const response = await fetch(`/api/cms/media/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt_text: altText }),
      });

      if (response.ok) {
        const updated = await response.json();
        setMedia((prev) => prev.map((m) => (m.id === id ? updated : m)));
        setSelectedMedia(updated);
        toast("Alt text saved", "success");
      } else {
        const error = await response.json();
        toast(`Error: ${error.error}`, "error");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast("Failed to save alt text", "error");
    }
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer flex items-center gap-2">
          {isUploading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Images
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl transition-all h-full overflow-auto ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <svg className="w-8 h-8 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : media.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No images yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  Drag and drop images here, or click the button above to upload.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMedia(item);
                      setEditingAltText(item.alt_text || "");
                    }}
                    className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedMedia?.id === item.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={item.url}
                      alt={item.alt_text || item.original_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{item.original_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dragActive && (
              <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center pointer-events-none">
                <div className="text-blue-600 font-medium">Drop images here</div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Selected Media Details */}
        {selectedMedia && (
          <div className="w-80 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
            {/* Preview - Click to open lightbox */}
            <button
              onClick={() => setShowLightbox(true)}
              className="relative aspect-video group cursor-zoom-in"
            >
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.alt_text || selectedMedia.original_name}
                fill
                className="object-contain bg-gray-100"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  View Full Size
                </span>
              </div>
            </button>

            <div className="p-4 flex-1 overflow-auto">
              {/* File Info */}
              <h3 className="font-semibold text-gray-900 mb-1 truncate" title={selectedMedia.original_name}>
                {selectedMedia.original_name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {formatFileSize(selectedMedia.size)} · {selectedMedia.mime_type.split("/")[1].toUpperCase()}
              </p>
              {selectedMedia.width && selectedMedia.height && (
                <p className="text-sm text-gray-500 mb-4">
                  {selectedMedia.width} × {selectedMedia.height} px
                </p>
              )}
              {(!selectedMedia.width || !selectedMedia.height) && <div className="mb-4" />}
              <p className="text-xs text-gray-400 mb-4">
                Uploaded {new Date(selectedMedia.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </p>

              <div className="space-y-4">
                {/* Alt Text */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Alt Text (SEO/Accessibility)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingAltText}
                      onChange={(e) => setEditingAltText(e.target.value)}
                      placeholder="Image description..."
                      className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => updateAltText(selectedMedia.id, editingAltText)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                      title="Save alt text"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 truncate text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              {/* Primary Actions Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => copyToClipboard(selectedMedia.url)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy URL
                </button>
                <a
                  href={selectedMedia.url}
                  download={selectedMedia.original_name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>

              {/* Replace Image */}
              <button
                onClick={() => replaceInputRef.current?.click()}
                disabled={isReplacing}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isReplacing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Replacing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Replace Image
                  </>
                )}
              </button>
              <input
                ref={replaceInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (confirm("Replace the current image with the selected file?")) {
                      handleReplace(file);
                    }
                  }
                  e.target.value = "";
                }}
                className="hidden"
              />

              {/* Delete */}
              <button
                onClick={() => handleDelete(selectedMedia.id)}
                className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && selectedMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedMedia.url}
              alt={selectedMedia.alt_text || selectedMedia.original_name}
              width={1920}
              height={1080}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority
            />

            {/* Info bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-medium">{selectedMedia.original_name}</p>
              <p className="text-white/70 text-sm">
                {formatFileSize(selectedMedia.size)} · {selectedMedia.mime_type}
              </p>
            </div>

            {/* Download button in lightbox */}
            <a
              href={selectedMedia.url}
              download={selectedMedia.original_name}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition text-sm font-medium flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MediaPage() {
  return (
    <ToastProvider>
      <MediaPageContent />
    </ToastProvider>
  );
}
