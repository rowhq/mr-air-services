"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Page } from "@/types/database";

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Page>>({});

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      const res = await fetch("/api/cms/pages");
      const data = await res.json();
      setPages(data);
    } catch (error) {
      console.error("Failed to load pages:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(page: Page) {
    setEditingId(page.id);
    setFormData(page);
  }

  function startCreate() {
    setEditingId("new");
    setFormData({
      title: "",
      slug: "",
      description: "",
      seo_title: "",
      seo_description: "",
      is_published: false,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function savePage() {
    if (!editingId) return;

    try {
      if (editingId === "new") {
        await fetch("/api/cms/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/cms/pages/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await loadPages();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save page:", error);
    }
  }

  async function deletePage(id: string, slug: string) {
    // Prevent deleting core pages
    if (["home", "services", "contact"].includes(slug)) {
      alert("No se puede eliminar esta pagina principal.");
      return;
    }
    if (!confirm("Seguro que deseas eliminar esta pagina?")) return;

    try {
      await fetch(`/api/cms/pages/${id}`, { method: "DELETE" });
      await loadPages();
    } catch (error) {
      console.error("Failed to delete page:", error);
    }
  }

  async function togglePublished(page: Page) {
    try {
      await fetch(`/api/cms/pages/${page.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...page, is_published: !page.is_published }),
      });
      await loadPages();
    } catch (error) {
      console.error("Failed to toggle published:", error);
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
        <h1 className="text-2xl font-bold">Paginas</h1>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Nueva Pagina
        </button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Pagina
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                URL
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                Estado
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{page.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {page.description || "Sin descripcion"}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  /{page.slug}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => togglePublished(page)}
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      page.is_published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {page.is_published ? "Publicada" : "Borrador"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/editor/${page.slug}`}
                    className="text-purple-600 hover:underline text-sm"
                  >
                    Editor
                  </Link>
                  <button
                    onClick={() => startEdit(page)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Editar
                  </button>
                  {!["home", "services", "contact"].includes(page.slug) && (
                    <button
                      onClick={() => deletePage(page.id, page.slug)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingId === "new" ? "Nueva Pagina" : "Editar Pagina"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titulo
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  disabled={editingId !== "new"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripcion
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">SEO</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={formData.seo_title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, seo_title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO Description
                    </label>
                    <textarea
                      value={formData.seo_description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo_description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OG Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.og_image || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, og_image: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published ?? false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_published: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Publicada</span>
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
                onClick={savePage}
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
