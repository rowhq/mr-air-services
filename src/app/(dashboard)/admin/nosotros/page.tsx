"use client";

import { useState } from "react";

export default function NosotrosAdmin() {
  const [content, setContent] = useState({
    title: "Sobre Nosotros",
    description: `Con más de 10 años de experiencia en el sector, Mr. Air Services se ha consolidado como líder en servicios de aire acondicionado. Nuestro equipo de técnicos certificados está comprometido con brindar soluciones de climatización de la más alta calidad.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cambios guardados correctamente");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Sección Nosotros</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título de la Sección
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
        <div className="bg-gray-50 py-12 px-6 rounded-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
            <p className="text-gray-600">{content.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
