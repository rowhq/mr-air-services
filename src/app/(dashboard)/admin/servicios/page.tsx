"use client";

import { useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
}

export default function ServiciosAdmin() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Instalación",
      description: "Instalación profesional de equipos de aire acondicionado residencial y comercial.",
    },
    {
      id: 2,
      title: "Mantenimiento",
      description: "Servicio de mantenimiento preventivo y correctivo para mantener tu equipo funcionando.",
    },
    {
      id: 3,
      title: "Reparación",
      description: "Diagnóstico y reparación de fallas en todo tipo de sistemas de climatización.",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSave = (id: number, title: string, description: string) => {
    setServices(services.map(s =>
      s.id === id ? { ...s, title, description } : s
    ));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = Math.max(...services.map(s => s.id)) + 1;
    setServices([...services, { id: newId, title: "Nuevo Servicio", description: "Descripción del servicio" }]);
    setEditingId(newId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Administrar Servicios</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Agregar Servicio
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm">
            {editingId === service.id ? (
              <ServiceForm
                service={service}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(service.id)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service;
  onSave: (id: number, title: string, description: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(service.id, title, description)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
