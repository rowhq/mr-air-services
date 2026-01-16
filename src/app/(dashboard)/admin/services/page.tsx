"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/types/database";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const res = await fetch("/api/cms/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setFormData(service);
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveService() {
    if (!editingId) return;

    try {
      await fetch(`/api/cms/services/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await loadServices();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save service:", error);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await fetch(`/api/cms/services/${id}`, { method: "DELETE" });
      await loadServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  }

  async function togglePublished(service: Service) {
    try {
      await fetch(`/api/cms/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, is_published: !service.is_published }),
      });
      await loadServices();
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
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={() => {
            setEditingId("new");
            setFormData({
              title: "",
              slug: "",
              short_description: "",
              description: "",
              icon: "wrench",
              features: [],
              cta_text: "Learn More",
              cta_link: "",
              position: services.length,
              is_published: true,
              is_featured: false,
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Service
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Slug
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                Featured
              </th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{service.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {service.short_description}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  /{service.slug}
                </td>
                <td className="px-6 py-4 text-center">
                  {service.is_featured && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => togglePublished(service)}
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      service.is_published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => startEdit(service)}
                    className="text-blue-600 hover:underline text-sm mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
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
                {editingId === "new" ? "New Service" : "Edit Service"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
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
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, short_description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={formData.icon || "wrench"}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <optgroup label="Main HVAC">
                      <option value="ac-repair">❄️ AC Repair</option>
                      <option value="heating">🔥 Heating</option>
                      <option value="tune-up">⚙️ Tune-Up / Maintenance</option>
                    </optgroup>
                    <optgroup label="Services">
                      <option value="snowflake">❄️ Snowflake (Cooling)</option>
                      <option value="thermometer">🌡️ Thermometer (Temperature)</option>
                      <option value="fan">💨 Fan (Ventilation)</option>
                      <option value="droplets">💧 Droplets (Humidity)</option>
                      <option value="wind">🌬️ Wind (Air)</option>
                    </optgroup>
                    <optgroup label="Service Type">
                      <option value="home">🏠 Home (Residential)</option>
                      <option value="building">🏢 Building (Commercial)</option>
                      <option value="clock">🕐 Clock (24/7)</option>
                      <option value="zap">⚡ Zap (Emergency)</option>
                    </optgroup>
                    <optgroup label="Quality">
                      <option value="shield">🛡️ Shield (Warranty)</option>
                      <option value="check-circle">✓ Check Circle (Verified)</option>
                      <option value="star">⭐ Star (Premium)</option>
                      <option value="award">🏆 Award (Certified)</option>
                    </optgroup>
                    <optgroup label="Tools">
                      <option value="wrench">🔧 Wrench (Repair)</option>
                      <option value="settings">⚙️ Settings (Configuration)</option>
                      <option value="tools">🛠️ Tools</option>
                    </optgroup>
                  </select>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Text
                  </label>
                  <input
                    type="text"
                    value={formData.cta_text || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cta_text: e.target.value })
                    }
                    placeholder="Learn More"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={formData.cta_link || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cta_link: e.target.value })
                    }
                    placeholder="/contact o tel:+18324371000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  value={Array.isArray(formData.features) ? (formData.features as string[]).join("\n") : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      features: e.target.value.split("\n").filter((f) => f.trim()),
                    })
                  }
                  rows={4}
                  placeholder="Same-day service&#10;Licensed technicians&#10;100% satisfaction guarantee"
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
                  <span className="text-sm text-gray-700">Featured</span>
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
                  <span className="text-sm text-gray-700">Published</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={saveService}
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
