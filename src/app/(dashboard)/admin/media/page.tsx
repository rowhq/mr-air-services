"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Media } from "@/types/database";

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/cms/media");
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

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
        } else {
          const error = await response.json();
          alert(`Error uploading ${file.name}: ${error.error}`);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert(`Error uploading ${file.name}`);
      }
    }

    setIsUploading(false);
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
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
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
    alert("URL copied to clipboard!");
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
                    onClick={() => setSelectedMedia(item)}
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
            <div className="relative aspect-video">
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.alt_text || selectedMedia.original_name}
                fill
                className="object-contain bg-gray-100"
              />
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <h3 className="font-semibold text-gray-900 mb-1 truncate">
                {selectedMedia.original_name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {formatFileSize(selectedMedia.size)} | {selectedMedia.mime_type}
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 truncate"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedMedia.url)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Folder
                  </label>
                  <p className="text-sm text-gray-900">{selectedMedia.folder}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Uploaded
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedMedia.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => copyToClipboard(selectedMedia.url)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Copy URL
              </button>
              <button
                onClick={() => handleDelete(selectedMedia.id)}
                className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium"
              >
                Delete Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
