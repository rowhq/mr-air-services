"use client";

import { useEffect, useState } from "react";
import type { OfficeLocation } from "@/types/database";

const defaultHours = {
  monday: "7:00 AM - 6:00 PM",
  tuesday: "7:00 AM - 6:00 PM",
  wednesday: "7:00 AM - 6:00 PM",
  thursday: "7:00 AM - 6:00 PM",
  friday: "7:00 AM - 6:00 PM",
  saturday: "8:00 AM - 4:00 PM",
  sunday: "Closed",
};

export default function OfficeLocationsPage() {
  const [locations, setLocations] = useState<OfficeLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<OfficeLocation>>({});

  useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    try {
      const res = await fetch("/api/cms/office-locations");
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      console.error("Failed to load locations:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(location: OfficeLocation) {
    setEditingId(location.id);
    setFormData(location);
  }

  function startCreate() {
    setEditingId("new");
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "TX",
      zip: "",
      phone: "",
      email: "",
      latitude: null,
      longitude: null,
      hours: defaultHours,
      is_primary: false,
      position: locations.length,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData({});
  }

  async function saveLocation() {
    if (!editingId) return;

    try {
      if (editingId === "new") {
        await fetch("/api/cms/office-locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch(`/api/cms/office-locations/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      await loadLocations();
      cancelEdit();
    } catch (error) {
      console.error("Failed to save location:", error);
    }
  }

  async function deleteLocation(id: string) {
    if (!confirm("Are you sure you want to delete this location?")) return;

    try {
      await fetch(`/api/cms/office-locations/${id}`, { method: "DELETE" });
      await loadLocations();
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  }

  async function setPrimary(location: OfficeLocation) {
    try {
      await fetch(`/api/cms/office-locations/${location.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...location, is_primary: true }),
      });
      await loadLocations();
    } catch (error) {
      console.error("Failed to set primary:", error);
    }
  }

  function updateHours(day: string, value: string) {
    setFormData({
      ...formData,
      hours: {
        ...(formData.hours as Record<string, string>),
        [day]: value,
      },
    });
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
        <h1 className="text-2xl font-bold">Office Locations</h1>
        <button
          onClick={startCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + New Location
        </button>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden ${
              location.is_primary ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{location.name}</h3>
                  {location.is_primary && (
                    <span className="text-xs text-blue-600 font-medium">
                      Primary
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>{location.address}</p>
                <p>
                  {location.city}, {location.state} {location.zip}
                </p>
                {location.phone && <p>Tel: {location.phone}</p>}
                {location.email && <p>Email: {location.email}</p>}
              </div>

              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="space-x-2">
                  <button
                    onClick={() => startEdit(location)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteLocation(location.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
                {!location.is_primary && (
                  <button
                    onClick={() => setPrimary(location)}
                    className="text-gray-500 hover:text-blue-600 text-sm"
                  >
                    Make primary
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500">No locations configured</p>
          <button
            onClick={startCreate}
            className="mt-4 text-blue-600 hover:underline"
          >
            Add first location
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingId === "new" ? "New Location" : "Edit Location"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Houston Main Office"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="123 Main St"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="Houston"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state || "TX"}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={formData.zip || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    placeholder="77001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(832) 437-1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@mrairservices.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.latitude || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        latitude: parseFloat(e.target.value) || null,
                      })
                    }
                    placeholder="29.7604"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.longitude || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        longitude: parseFloat(e.target.value) || null,
                      })
                    }
                    placeholder="-95.3698"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(defaultHours).map(([day]) => (
                    <div key={day}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {day === "monday"
                          ? "Monday"
                          : day === "tuesday"
                          ? "Tuesday"
                          : day === "wednesday"
                          ? "Wednesday"
                          : day === "thursday"
                          ? "Thursday"
                          : day === "friday"
                          ? "Friday"
                          : day === "saturday"
                          ? "Saturday"
                          : "Sunday"}
                      </label>
                      <input
                        type="text"
                        value={
                          (formData.hours as Record<string, string>)?.[day] || ""
                        }
                        onChange={(e) => updateHours(day, e.target.value)}
                        placeholder="7:00 AM - 6:00 PM"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_primary || false}
                    onChange={(e) =>
                      setFormData({ ...formData, is_primary: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    Primary Location
                  </span>
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
                onClick={saveLocation}
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
