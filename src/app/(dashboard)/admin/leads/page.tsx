"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/types/database";

type LeadStatus = "new" | "contacted" | "converted" | "closed";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const statusLabels: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  converted: "Convertido",
  closed: "Cerrado",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const res = await fetch("/api/cms/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to load leads:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: string, status: LeadStatus) {
    try {
      await fetch(`/api/cms/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await loadLeads();
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Seguro que deseas eliminar este lead?")) return;

    try {
      await fetch(`/api/cms/leads/${id}`, { method: "DELETE" });
      await loadLeads();
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  }

  const filteredLeads =
    filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const stats = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

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
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="text-sm text-gray-500">
          Total: {leads.length} leads
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setFilter("new")}
          className={`p-4 rounded-xl text-left transition ${
            filter === "new" ? "ring-2 ring-blue-500" : ""
          } bg-blue-50`}
        >
          <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
          <p className="text-sm text-blue-700">Nuevos</p>
        </button>
        <button
          onClick={() => setFilter("contacted")}
          className={`p-4 rounded-xl text-left transition ${
            filter === "contacted" ? "ring-2 ring-yellow-500" : ""
          } bg-yellow-50`}
        >
          <p className="text-3xl font-bold text-yellow-600">{stats.contacted}</p>
          <p className="text-sm text-yellow-700">Contactados</p>
        </button>
        <button
          onClick={() => setFilter("converted")}
          className={`p-4 rounded-xl text-left transition ${
            filter === "converted" ? "ring-2 ring-green-500" : ""
          } bg-green-50`}
        >
          <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
          <p className="text-sm text-green-700">Convertidos</p>
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`p-4 rounded-xl text-left transition ${
            filter === "closed" ? "ring-2 ring-gray-500" : ""
          } bg-gray-50`}
        >
          <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
          <p className="text-sm text-gray-700">Cerrados</p>
        </button>
      </div>

      {filter !== "all" && (
        <button
          onClick={() => setFilter("all")}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Ver todos los leads
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Contacto
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Fecha
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No hay leads {filter !== "all" ? `con estado "${statusLabels[filter as LeadStatus]}"` : ""}
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedLead?.id === lead.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lead.created_at).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                          statusColors[lead.status as LeadStatus] || statusColors.new
                        }`}
                      >
                        {statusLabels[lead.status as LeadStatus] || lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Lead Detail */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedLead ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold">{selectedLead.name}</h2>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Eliminar
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                {selectedLead.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Telefono</p>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                )}

                {selectedLead.preferred_time && (
                  <div>
                    <p className="text-sm text-gray-500">Horario preferido</p>
                    <p className="text-gray-900">{selectedLead.preferred_time}</p>
                  </div>
                )}

                {selectedLead.services && selectedLead.services.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Servicios</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLead.services.map((service: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLead.message && (
                  <div>
                    <p className="text-sm text-gray-500">Mensaje</p>
                    <p className="text-gray-900 text-sm whitespace-pre-wrap">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Origen</p>
                  <p className="text-gray-900">{selectedLead.source}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="text-gray-900">
                    {new Date(selectedLead.created_at).toLocaleString("es-ES")}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Cambiar estado</p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(statusLabels) as LeadStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedLead.id, status)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition ${
                          selectedLead.status === status
                            ? statusColors[status]
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Selecciona un lead para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
