"use client";

import { useEffect, useState } from "react";
import type { NavigationItem } from "@/types/database";

type NavLocation = "header" | "footer";

export default function NavigationPage() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NavLocation>("header");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NavigationItem>>({});

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const res = await fetch("/api/cms/navigation");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to load navigation:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(item: NavigationItem) {
    setEditingId(item.id);
    setFormData(item);
  }

  function startCreate() {
    const locationItems = items.filter((i) => i.location === activeTab);
    setEditingId("new");
    setFormData({
      location: activeTab,
      label: "",
      href: "",
      parent_id: null,
      is_external: false,
      is_visible: true,
      position: locationItems.length,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveItem() {
    if (!editingId) return;

    try {
      if (editingId === "new") {
        await fetch("/api/cms/navigation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/cms/navigation/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await loadItems();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Seguro que deseas eliminar este elemento?")) return;

    try {
      await fetch(`/api/cms/navigation/${id}`, { method: "DELETE" });
      await loadItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  async function toggleVisibility(item: NavigationItem) {
    try {
      await fetch(`/api/cms/navigation/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_visible: !item.is_visible }),
      });
      await loadItems();
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
    }
  }

  async function moveItem(item: NavigationItem, direction: "up" | "down") {
    const locationItems = items
      .filter((i) => i.location === item.location)
      .sort((a, b) => a.position - b.position);

    const currentIndex = locationItems.findIndex((i) => i.id === item.id);
    const newIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= locationItems.length) return;

    const otherItem = locationItems[newIndex];

    try {
      await Promise.all([
        fetch(`/api/cms/navigation/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, position: otherItem.position }),
        }),
        fetch(`/api/cms/navigation/${otherItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...otherItem, position: item.position }),
        }),
      ]);
      await loadItems();
    } catch (error) {
      console.error("Failed to move item:", error);
    }
  }

  const filteredItems = items
    .filter((i) => i.location === activeTab)
    .sort((a, b) => a.position - b.position);

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
        <h1 className="text-2xl font-bold">Navegacion</h1>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Nuevo Enlace
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("header")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "header"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Header
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "footer"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Footer
        </button>
      </div>

      {/* Navigation Items */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 w-12">
                Orden
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Etiqueta
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                URL
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                Tipo
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                Visible
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No hay elementos en {activeTab === "header" ? "el header" : "el footer"}
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(item, "up")}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveItem(item, "down")}
                        disabled={index === filteredItems.length - 1}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ↓
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.href}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.is_external ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                        Externo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                        Interno
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleVisibility(item)}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        item.is_visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.is_visible ? "Visible" : "Oculto"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingId === "new" ? "Nuevo Enlace" : "Editar Enlace"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicacion
                </label>
                <select
                  value={formData.location || "header"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value as NavLocation,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Etiqueta
                </label>
                <input
                  type="text"
                  value={formData.label || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  placeholder="Servicios"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="text"
                  value={formData.href || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, href: e.target.value })
                  }
                  placeholder="/services o https://..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Elemento padre (para submenu)
                </label>
                <select
                  value={formData.parent_id || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      parent_id: e.target.value || null,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sin padre (item principal)</option>
                  {items
                    .filter((i) => i.location === formData.location && !i.parent_id && i.id !== editingId)
                    .map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_external || false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_external: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Enlace externo (abre en nueva pestana)
                  </span>
                </label>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_visible ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, is_visible: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Visible</span>
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
                onClick={saveItem}
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
