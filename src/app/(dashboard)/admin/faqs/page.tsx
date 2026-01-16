"use client";

import { useEffect, useState } from "react";
import type { FAQ } from "@/types/database";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({});
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    loadFAQs();
  }, []);

  async function loadFAQs() {
    try {
      const res = await fetch("/api/cms/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to load FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(faq: FAQ) {
    setEditingId(faq.id);
    setFormData(faq);
  }

  function startNew() {
    setEditingId("new");
    setFormData({
      question: "",
      answer: "",
      category: "general",
      page_slug: null,
      position: faqs.length,
      is_published: true,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveFAQ() {
    try {
      if (editingId === "new") {
        await fetch("/api/cms/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/cms/faqs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await loadFAQs();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    }
  }

  async function deleteFAQ(id: string) {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      await fetch(`/api/cms/faqs/${id}`, { method: "DELETE" });
      await loadFAQs();
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
    }
  }

  const categories = [...new Set(faqs.map((f) => f.category))];
  const filteredFAQs = filterCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === filterCategory);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <button
          onClick={startNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New FAQ
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filterCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({faqs.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filterCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat} ({faqs.filter((f) => f.category === cat).length})
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl shadow-sm p-6 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                    {faq.category}
                  </span>
                  {faq.page_slug && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                      /{faq.page_slug}
                    </span>
                  )}
                  {!faq.is_published && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded">
                      Draft
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => startEdit(faq)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteFAQ(faq.id)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingId === "new" ? "New FAQ" : "Edit FAQ"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer
                </label>
                <textarea
                  value={formData.answer || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    list="categories"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.page_slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, page_slug: e.target.value || null })
                    }
                    placeholder="ej: air-conditioning-repair"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="number"
                    value={formData.position ?? 0}
                    onChange={(e) =>
                      setFormData({ ...formData, position: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_published ?? true}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Published</span>
              </label>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={saveFAQ}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
