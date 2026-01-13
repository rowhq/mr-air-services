"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroContent {
  title: string;
  subtitle: string;
  trustSignals: string[];
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface TuneUpsContent {
  hero: HeroContent;
  checklistItems: string[];
  benefits: Benefit[];
  checklistTitle: string;
  checklistSubtitle: string;
}

const defaultContent: TuneUpsContent = {
  hero: {
    title: "Annual AC Tune-Up & Preventative Maintenance",
    subtitle: "Keep your system running at peak efficiency. FREE CoolSaver tune-ups for qualifying homeowners, or schedule your annual inspection today.",
    trustSignals: ["NATE certified techs", "100% satisfaction guaranteed", "Veteran owned"],
  },
  checklistItems: [
    "Inspect refrigerant level",
    "Inspect and clean condenser coils",
    "Inspect and clean contactor",
    "Check and calibrate thermostat",
    "Inspect airflow for proper specifications",
    "Inspect the evaporator coil",
    "Clean electrical and blower compartments",
    "Tighten electrical connections",
    "Inspect capacitors and relays",
    "Inspect all drain lines",
    "Check compressor for proper amp draw",
    "Check all motors for proper amp draw",
    "Oil the motors if required",
  ],
  benefits: [
    { title: "Lower Your Energy Bills", description: "A clean, well-maintained system runs more efficiently. Better efficiency means lower monthly utility costs.", icon: "dollar" },
    { title: "Prevent Costly Repairs", description: "We catch small issues before they become expensive emergencies. Regular maintenance saves you money long-term.", icon: "shield" },
    { title: "Extend System Lifespan", description: "A well-maintained system lasts years longer. That's thousands you're not spending on a new unit.", icon: "clock" },
  ],
  checklistTitle: "What We Check",
  checklistSubtitle: "A thorough inspection that catches problems before they become expensive emergencies.",
};

const benefitIconOptions = ["dollar", "shield", "clock", "check", "star", "sparkles"];

export default function TuneUpsEditorPage() {
  const [content, setContent] = useState<TuneUpsContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/cms/config?key=tuneups_page");
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
        body: JSON.stringify({ key: "tuneups_page", value: content }),
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

  // Checklist Items
  function updateChecklistItem(index: number, value: string) {
    const newItems = [...content.checklistItems];
    newItems[index] = value;
    setContent({ ...content, checklistItems: newItems });
  }

  function addChecklistItem() {
    setContent({ ...content, checklistItems: [...content.checklistItems, ""] });
  }

  function removeChecklistItem(index: number) {
    const newItems = content.checklistItems.filter((_, i) => i !== index);
    setContent({ ...content, checklistItems: newItems });
  }

  // Benefits
  function updateBenefit(index: number, key: keyof Benefit, value: string) {
    const newBenefits = [...content.benefits];
    newBenefits[index] = { ...newBenefits[index], [key]: value };
    setContent({ ...content, benefits: newBenefits });
  }

  function addBenefit() {
    setContent({
      ...content,
      benefits: [...content.benefits, { title: "", description: "", icon: "check" }],
    });
  }

  function removeBenefit(index: number) {
    const newBenefits = content.benefits.filter((_, i) => i !== index);
    setContent({ ...content, benefits: newBenefits });
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
          <h1 className="text-2xl font-bold">Editor: CoolSaver Tune-Ups Page</h1>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {saveMessage}
            </span>
          )}
          <a
            href="/services/air-conditioning-tune-ups"
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
          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Trust Signals */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Trust Signals</h3>
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
        </div>

        {/* Checklist Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Seccion de Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo de la Seccion</label>
              <input
                type="text"
                value={content.checklistTitle}
                onChange={(e) => setContent({ ...content, checklistTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo de la Seccion</label>
              <input
                type="text"
                value={content.checklistSubtitle}
                onChange={(e) => setContent({ ...content, checklistSubtitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Items del Checklist (13-Point Inspection)</h3>
              <button
                onClick={addChecklistItem}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                + Agregar Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {content.checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={() => removeChecklistItem(index)}
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

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Beneficios</h2>
            <button
              onClick={addBenefit}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Beneficio
            </button>
          </div>
          <div className="space-y-4">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Beneficio {index + 1}</span>
                  <button
                    onClick={() => removeBenefit(index)}
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
                      value={benefit.title}
                      onChange={(e) => updateBenefit(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripcion</label>
                    <input
                      type="text"
                      value={benefit.description}
                      onChange={(e) => updateBenefit(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                    <select
                      value={benefit.icon}
                      onChange={(e) => updateBenefit(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      {benefitIconOptions.map((icon) => (
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
