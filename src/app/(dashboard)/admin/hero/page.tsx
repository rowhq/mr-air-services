"use client";

import { useState } from "react";

export default function HeroAdmin() {
  const [formData, setFormData] = useState({
    title: "Expertos en Aire Acondicionado",
    subtitle: "Instalación, mantenimiento y reparación profesional",
    buttonText: "Solicitar Cotización",
    buttonLink: "#contacto",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar guardado
    alert("Cambios guardados correctamente");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Sección Hero</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título Principal
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Texto del Botón
              </label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enlace del Botón
              </label>
              <input
                type="text"
                value={formData.buttonLink}
                onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Vista Previa</h2>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 rounded-xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">{formData.title}</h3>
            <p className="text-lg opacity-90 mb-6">{formData.subtitle}</p>
            <span className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
              {formData.buttonText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
