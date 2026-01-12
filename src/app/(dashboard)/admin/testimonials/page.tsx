"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types/database";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      const res = await fetch("/api/cms/testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(testimonial: Testimonial) {
    setEditingId(testimonial.id);
    setFormData(testimonial);
  }

  function startNew() {
    setEditingId("new");
    setFormData({
      initials: "",
      location: "",
      rating: 5,
      text: "",
      source: "Google",
      is_featured: false,
      is_published: true,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveTestimonial() {
    try {
      if (editingId === "new") {
        await fetch("/api/cms/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/cms/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await loadTestimonials();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save testimonial:", error);
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Seguro que deseas eliminar este testimonio?")) return;

    try {
      await fetch(`/api/cms/testimonials/${id}`, { method: "DELETE" });
      await loadTestimonials();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  }

  async function toggleFeatured(testimonial: Testimonial) {
    try {
      await fetch(`/api/cms/testimonials/${testimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...testimonial, is_featured: !testimonial.is_featured }),
      });
      await loadTestimonials();
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  }

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
        <h1 className="text-2xl font-bold">Testimonios</h1>
        <button
          onClick={startNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Nuevo Testimonio
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-sm p-6 relative group"
          >
            {/* Actions */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-2">
              <button
                onClick={() => toggleFeatured(testimonial)}
                className={`p-2 rounded-lg transition ${
                  testimonial.is_featured
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-400 hover:text-yellow-600"
                }`}
                title={testimonial.is_featured ? "Quitar destacado" : "Destacar"}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
              <button
                onClick={() => startEdit(testimonial)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-600 mb-4 line-clamp-4">&ldquo;{testimonial.text}&rdquo;</p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {testimonial.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{testimonial.location}</p>
                <p className="text-xs text-gray-500">{testimonial.source}</p>
              </div>
            </div>

            {/* Featured badge */}
            {testimonial.is_featured && (
              <span className="absolute top-4 left-4 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                Destacado
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingId === "new" ? "Nuevo Testimonio" : "Editar Testimonio"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Iniciales
                  </label>
                  <input
                    type="text"
                    value={formData.initials || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, initials: e.target.value.toUpperCase().slice(0, 2) })
                    }
                    maxLength={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ubicacion
                  </label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    value={formData.rating || 5}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} estrellas</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuente
                  </label>
                  <select
                    value={formData.source || "Google"}
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Google">Google</option>
                    <option value="Yelp">Yelp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Website">Website</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonio
                </label>
                <textarea
                  value={formData.text || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured || false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Destacado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, is_published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Publicado</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={saveTestimonial}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
