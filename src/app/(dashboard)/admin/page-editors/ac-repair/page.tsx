"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  trustSignals: string[];
}

interface Brand {
  name: string;
  logo: string;
}

interface RepairType {
  title: string;
  description: string;
  icon: string;
}

interface ACRepairContent {
  hero: HeroContent;
  brands: Brand[];
  repairTypes: RepairType[];
  problemsTitle: string;
  problemsSubtitle: string;
}

const defaultContent: ACRepairContent = {
  hero: {
    title: "AC Dead? We're On It.",
    subtitle: "Fast diagnosis, straight quotes, fixed right the first time. Same-day service available.",
    backgroundImage: "/images/services/diagnostics-repairs.webp",
    trustSignals: ["Same-day service", "All brands serviced", "No hidden fees"],
  },
  brands: [
    { name: "Ruud", logo: "/images/brands/ruud.svg" },
    { name: "Lennox", logo: "/images/brands/lennox.svg" },
    { name: "Goodman", logo: "/images/brands/goodman.svg" },
    { name: "Trane", logo: "/images/brands/trane.svg" },
    { name: "American Standard", logo: "/images/brands/american-standard.svg" },
    { name: "Carrier", logo: "/images/brands/carrier.svg" },
  ],
  repairTypes: [
    { title: "AC Not Cooling", description: "Refrigerant leaks, compressor issues, or airflow problems", icon: "cooling" },
    { title: "Strange Noises", description: "Grinding, squealing, or banging sounds from your unit", icon: "noise" },
    { title: "Won't Turn On", description: "Electrical, thermostat, or capacitor failures", icon: "power" },
    { title: "Frozen Coils", description: "Ice buildup from restricted airflow or low refrigerant", icon: "ice" },
    { title: "Water Leaks", description: "Clogged drain lines or damaged condensate pans", icon: "water" },
    { title: "High Energy Bills", description: "Inefficient operation or failing components", icon: "bills" },
  ],
  problemsTitle: "Common AC Problems We Fix",
  problemsSubtitle: "With years of Houston experience, we diagnose and repair these issues daily",
};

const iconOptions = ["cooling", "noise", "power", "ice", "water", "bills", "fan", "thermostat"];

export default function ACRepairEditorPage() {
  const [content, setContent] = useState<ACRepairContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/cms/config?key=ac_repair_page");
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
        body: JSON.stringify({ key: "ac_repair_page", value: content }),
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

  function updateHero(key: keyof HeroContent, value: string | string[]) {
    setContent({ ...content, hero: { ...content.hero, [key]: value } });
  }

  function updateHeroTrustSignal(index: number, value: string) {
    const newSignals = [...content.hero.trustSignals];
    newSignals[index] = value;
    updateHero("trustSignals", newSignals);
  }

  function addHeroTrustSignal() {
    updateHero("trustSignals", [...content.hero.trustSignals, ""]);
  }

  function removeHeroTrustSignal(index: number) {
    const newSignals = content.hero.trustSignals.filter((_, i) => i !== index);
    updateHero("trustSignals", newSignals);
  }

  function updateBrand(index: number, key: keyof Brand, value: string) {
    const newBrands = [...content.brands];
    newBrands[index] = { ...newBrands[index], [key]: value };
    setContent({ ...content, brands: newBrands });
  }

  function addBrand() {
    setContent({ ...content, brands: [...content.brands, { name: "", logo: "" }] });
  }

  function removeBrand(index: number) {
    const newBrands = content.brands.filter((_, i) => i !== index);
    setContent({ ...content, brands: newBrands });
  }

  function updateRepairType(index: number, key: keyof RepairType, value: string) {
    const newTypes = [...content.repairTypes];
    newTypes[index] = { ...newTypes[index], [key]: value };
    setContent({ ...content, repairTypes: newTypes });
  }

  function addRepairType() {
    setContent({
      ...content,
      repairTypes: [...content.repairTypes, { title: "", description: "", icon: "cooling" }],
    });
  }

  function removeRepairType(index: number) {
    const newTypes = content.repairTypes.filter((_, i) => i !== index);
    setContent({ ...content, repairTypes: newTypes });
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
          <h1 className="text-2xl font-bold">Editor: AC Repair Page</h1>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {saveMessage}
            </span>
          )}
          <a
            href="/services/air-conditioning-repair"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Fondo (URL)</label>
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

          {/* Hero Trust Signals */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Trust Signals del Hero</h3>
              <button
                onClick={addHeroTrustSignal}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                + Agregar
              </button>
            </div>
            <div className="space-y-2">
              {content.hero.trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={signal}
                    onChange={(e) => updateHeroTrustSignal(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Same-day service"
                  />
                  <button
                    onClick={() => removeHeroTrustSignal(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Marcas</h2>
            <button
              onClick={addBrand}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Marca
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.brands.map((brand, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Marca {index + 1}</span>
                  <button
                    onClick={() => removeBrand(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={brand.name}
                  onChange={(e) => updateBrand(index, "name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm mb-2"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={brand.logo}
                  onChange={(e) => updateBrand(index, "logo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="URL del Logo"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Problems Section Titles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Seccion de Problemas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo de la Seccion</label>
              <input
                type="text"
                value={content.problemsTitle}
                onChange={(e) => setContent({ ...content, problemsTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo de la Seccion</label>
              <input
                type="text"
                value={content.problemsSubtitle}
                onChange={(e) => setContent({ ...content, problemsSubtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Repair Types */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Tipos de Reparacion</h2>
            <button
              onClick={addRepairType}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Tipo
            </button>
          </div>
          <div className="space-y-3">
            {content.repairTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Problema {index + 1}</span>
                  <button
                    onClick={() => removeRepairType(index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Titulo</label>
                    <input
                      type="text"
                      value={type.title}
                      onChange={(e) => updateRepairType(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripcion</label>
                    <input
                      type="text"
                      value={type.description}
                      onChange={(e) => updateRepairType(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                    <select
                      value={type.icon}
                      onChange={(e) => updateRepairType(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {iconOptions.map((icon) => (
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
