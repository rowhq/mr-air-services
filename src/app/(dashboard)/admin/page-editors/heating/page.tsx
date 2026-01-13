"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

interface HeatingService {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

interface InspectionPhase {
  phase: string;
  items: string[];
}

interface WarningSign {
  title: string;
  description: string;
  icon: string;
}

interface HeatingContent {
  hero: HeroContent;
  services: HeatingService[];
  inspectionPhases: InspectionPhase[];
  warningSigns: WarningSign[];
}

const defaultContent: HeatingContent = {
  hero: {
    title: "Heat Out? We're On It.",
    subtitle: "Furnaces, heat pumps, all brands. Same-day emergency service when you need it most.",
    backgroundImage: "/images/services/heating-services.webp",
  },
  services: [
    { title: "Heating Repair", description: "We fix furnaces, heat pumps, all brands. Same-day emergency service available.", stat: "24/7", statLabel: "emergency", icon: "repair" },
    { title: "New Installation", description: "Need a new system? We help you pick the right size for your home. Financing available.", stat: "Free", statLabel: "estimates", icon: "install" },
  ],
  inspectionPhases: [
    { phase: "Safety", items: ["We make sure all safety switches actually work", "We look for dangerous gas leaks", "Carbon monoxide detector test", "Gas lines and vents inspection"] },
    { phase: "Performance", items: ["We test all electrical connections", "We verify it heats properly", "We adjust the flame and fan", "We clean the burners"] },
    { phase: "Efficiency", items: ["Thermostat accuracy check", "Filter replacement if needed", "Efficiency rating assessment", "Personalized recommendations"] },
  ],
  warningSigns: [
    { title: "Yellow Pilot Light", description: "Should be blue. Yellow means incomplete combustion—schedule a checkup.", icon: "flame" },
    { title: "Strange Sounds", description: "Banging, squealing, or rattling usually means parts are wearing out.", icon: "sound" },
    { title: "Short Cycling", description: "Turns on and off constantly? Could be the thermostat or a dirty filter.", icon: "cycle" },
    { title: "Higher Bills", description: "Sudden spike in energy costs? Your system may be losing efficiency.", icon: "bills" },
  ],
};

const serviceIconOptions = ["repair", "install", "maintenance", "emergency"];
const warningIconOptions = ["flame", "sound", "cycle", "bills", "warning", "alert"];

export default function HeatingEditorPage() {
  const [content, setContent] = useState<HeatingContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/cms/config?key=heating_page");
      if (res.ok) {
        const data = await res.json();
        if (data.value) {
          setContent({ ...defaultContent, ...data.value });
        }
      }
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveContent() {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/cms/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "heating_page", value: content }),
      });

      if (res.ok) {
        setSaveMessage("Guardado exitosamente");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveMessage("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  }

  function updateHero(key: keyof HeroContent, value: string) {
    setContent({ ...content, hero: { ...content.hero, [key]: value } });
  }

  // Services
  function updateService(index: number, key: keyof HeatingService, value: string) {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [key]: value };
    setContent({ ...content, services: newServices });
  }

  function addService() {
    setContent({
      ...content,
      services: [...content.services, { title: "", description: "", stat: "", statLabel: "", icon: "repair" }],
    });
  }

  function removeService(index: number) {
    const newServices = content.services.filter((_, i) => i !== index);
    setContent({ ...content, services: newServices });
  }

  // Inspection Phases
  function updatePhase(index: number, key: keyof InspectionPhase, value: string | string[]) {
    const newPhases = [...content.inspectionPhases];
    newPhases[index] = { ...newPhases[index], [key]: value };
    setContent({ ...content, inspectionPhases: newPhases });
  }

  function updatePhaseItem(phaseIndex: number, itemIndex: number, value: string) {
    const newPhases = [...content.inspectionPhases];
    const newItems = [...newPhases[phaseIndex].items];
    newItems[itemIndex] = value;
    newPhases[phaseIndex] = { ...newPhases[phaseIndex], items: newItems };
    setContent({ ...content, inspectionPhases: newPhases });
  }

  function addPhaseItem(phaseIndex: number) {
    const newPhases = [...content.inspectionPhases];
    newPhases[phaseIndex] = { ...newPhases[phaseIndex], items: [...newPhases[phaseIndex].items, ""] };
    setContent({ ...content, inspectionPhases: newPhases });
  }

  function removePhaseItem(phaseIndex: number, itemIndex: number) {
    const newPhases = [...content.inspectionPhases];
    newPhases[phaseIndex] = {
      ...newPhases[phaseIndex],
      items: newPhases[phaseIndex].items.filter((_, i) => i !== itemIndex),
    };
    setContent({ ...content, inspectionPhases: newPhases });
  }

  function addPhase() {
    setContent({
      ...content,
      inspectionPhases: [...content.inspectionPhases, { phase: "", items: [""] }],
    });
  }

  function removePhase(index: number) {
    const newPhases = content.inspectionPhases.filter((_, i) => i !== index);
    setContent({ ...content, inspectionPhases: newPhases });
  }

  // Warning Signs
  function updateWarningSign(index: number, key: keyof WarningSign, value: string) {
    const newSigns = [...content.warningSigns];
    newSigns[index] = { ...newSigns[index], [key]: value };
    setContent({ ...content, warningSigns: newSigns });
  }

  function addWarningSign() {
    setContent({
      ...content,
      warningSigns: [...content.warningSigns, { title: "", description: "", icon: "warning" }],
    });
  }

  function removeWarningSign(index: number) {
    const newSigns = content.warningSigns.filter((_, i) => i !== index);
    setContent({ ...content, warningSigns: newSigns });
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Editor: Heating Page</h1>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {saveMessage}
            </span>
          )}
          <a
            href="/services/heating"
            target="_blank"
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Ver Pagina
          </a>
          <button
            onClick={saveContent}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo</label>
              <input
                type="text"
                value={content.hero.backgroundImage}
                onChange={(e) => updateHero("backgroundImage", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Servicios de Calefaccion</h2>
            <button
              onClick={addService}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Servicio
            </button>
          </div>
          <div className="space-y-4">
            {content.services.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Servicio {index + 1}</span>
                  <button
                    onClick={() => removeService(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titulo</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateService(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripcion</label>
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => updateService(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Estadistica</label>
                    <input
                      type="text"
                      value={service.stat}
                      onChange={(e) => updateService(index, "stat", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="e.g., 24/7"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Etiqueta</label>
                    <input
                      type="text"
                      value={service.statLabel}
                      onChange={(e) => updateService(index, "statLabel", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="e.g., emergency"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                    <select
                      value={service.icon}
                      onChange={(e) => updateService(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {serviceIconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection Phases */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Fases de Inspeccion</h2>
            <button
              onClick={addPhase}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Fase
            </button>
          </div>
          <div className="space-y-4">
            {content.inspectionPhases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">Fase {phaseIndex + 1}</span>
                    <input
                      type="text"
                      value={phase.phase}
                      onChange={(e) => updatePhase(phaseIndex, "phase", e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Nombre de la fase"
                    />
                  </div>
                  <button
                    onClick={() => removePhase(phaseIndex)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updatePhaseItem(phaseIndex, itemIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Item de inspeccion"
                      />
                      <button
                        onClick={() => removePhaseItem(phaseIndex, itemIndex)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addPhaseItem(phaseIndex)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    + Agregar item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Signs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Senales de Advertencia</h2>
            <button
              onClick={addWarningSign}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Senal
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.warningSigns.map((sign, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Senal {index + 1}</span>
                  <button
                    onClick={() => removeWarningSign(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titulo</label>
                    <input
                      type="text"
                      value={sign.title}
                      onChange={(e) => updateWarningSign(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripcion</label>
                    <input
                      type="text"
                      value={sign.description}
                      onChange={(e) => updateWarningSign(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                    <select
                      value={sign.icon}
                      onChange={(e) => updateWarningSign(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {warningIconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
