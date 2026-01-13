"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
}

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface RealitySection {
  title: string;
  subtitle: string;
  withoutFinancing: string[];
  withFinancing: string[];
  floatingStats: Array<{
    value: string;
    label: string;
    position: string;
  }>;
}

interface FinancingPageContent {
  hero: HeroContent;
  trustSignals: string[];
  financingUrl: string;
  howItWorks: HowItWorksStep[];
  realitySection: RealitySection;
}

const defaultContent: FinancingPageContent = {
  hero: {
    title: "Financing Made Simple",
    subtitle: "Don't let cost keep you uncomfortable.",
    description: "Get pre-approved in minutes with no impact to your credit score. We partner with Service Finance Company to offer flexible payment options that fit your budget.",
    backgroundImage: "",
  },
  trustSignals: ["Quick Decision", "5-Min Apply", "No Penalties"],
  financingUrl: "https://apply.svcfin.com/application/prequalify/SVC1M3Q5X0",
  howItWorks: [
    { step: 1, title: "Check Eligibility", description: "Quick pre-qualification with no credit impact", icon: "clipboard" },
    { step: 2, title: "Get Pre-Approved", description: "Know your options before we arrive", icon: "check" },
    { step: 3, title: "Choose Your Plan", description: "Select from multiple payment options", icon: "calculator" },
    { step: 4, title: "Enjoy Comfort", description: "Start enjoying your new system today", icon: "home" },
  ],
  realitySection: {
    title: "Don't Let a Big Bill Catch You Off Guard",
    subtitle: "Life happens. Be prepared.",
    withoutFinancing: [
      "Drain savings on emergency repairs",
      "Put off repairs until it's too late",
      "Settle for the cheapest fix",
    ],
    withFinancing: [
      "Keep emergency fund intact",
      "Fix it right, the first time",
      "Get the system you actually need",
    ],
    floatingStats: [
      { value: "$0", label: "Down Payment", position: "top-left" },
      { value: "5min", label: "Application", position: "bottom-right" },
    ],
  },
};

const iconOptions = ["clipboard", "check", "calculator", "home", "shield", "clock", "star", "sparkles"];

export default function FinancingEditorPage() {
  const [content, setContent] = useState<FinancingPageContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/cms/config?key=financing_page");
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
        body: JSON.stringify({ key: "financing_page", value: content }),
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

  function updateTrustSignal(index: number, value: string) {
    const newSignals = [...content.trustSignals];
    newSignals[index] = value;
    setContent({ ...content, trustSignals: newSignals });
  }

  function addTrustSignal() {
    setContent({ ...content, trustSignals: [...content.trustSignals, ""] });
  }

  function removeTrustSignal(index: number) {
    const newSignals = content.trustSignals.filter((_, i) => i !== index);
    setContent({ ...content, trustSignals: newSignals });
  }

  function updateStep(index: number, key: keyof HowItWorksStep, value: string | number) {
    const newSteps = [...content.howItWorks];
    newSteps[index] = { ...newSteps[index], [key]: value };
    setContent({ ...content, howItWorks: newSteps });
  }

  function addStep() {
    const newStep: HowItWorksStep = {
      step: content.howItWorks.length + 1,
      title: "",
      description: "",
      icon: "clipboard",
    };
    setContent({ ...content, howItWorks: [...content.howItWorks, newStep] });
  }

  function removeStep(index: number) {
    const newSteps = content.howItWorks.filter((_, i) => i !== index);
    // Re-number steps
    newSteps.forEach((step, i) => (step.step = i + 1));
    setContent({ ...content, howItWorks: newSteps });
  }

  function updateReality(key: keyof RealitySection, value: string | string[]) {
    setContent({ ...content, realitySection: { ...content.realitySection, [key]: value } });
  }

  function updateRealityItem(list: "withoutFinancing" | "withFinancing", index: number, value: string) {
    const newList = [...content.realitySection[list]];
    newList[index] = value;
    updateReality(list, newList);
  }

  function addRealityItem(list: "withoutFinancing" | "withFinancing") {
    const newList = [...content.realitySection[list], ""];
    updateReality(list, newList);
  }

  function removeRealityItem(list: "withoutFinancing" | "withFinancing", index: number) {
    const newList = content.realitySection[list].filter((_, i) => i !== index);
    updateReality(list, newList);
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
          <h1 className="text-2xl font-bold">Editor: Financing Page</h1>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {saveMessage}
            </span>
          )}
          <a
            href="/financing-payments"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
              <textarea
                value={content.hero.description}
                onChange={(e) => updateHero("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Trust Signals</h2>
            <button
              onClick={addTrustSignal}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar
            </button>
          </div>
          <div className="space-y-2">
            {content.trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={signal}
                  onChange={(e) => updateTrustSignal(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Quick Decision"
                />
                <button
                  onClick={() => removeTrustSignal(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Financing URL */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">URL de Financiamiento</h2>
          <input
            type="url"
            value={content.financingUrl}
            onChange={(e) => setContent({ ...content, financingUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://apply.svcfin.com/..."
          />
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Como Funciona (Pasos)</h2>
            <button
              onClick={addStep}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              + Agregar Paso
            </button>
          </div>
          <div className="space-y-4">
            {content.howItWorks.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Paso {step.step}</span>
                  <button
                    onClick={() => removeStep(index)}
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
                      value={step.title}
                      onChange={(e) => updateStep(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripcion</label>
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateStep(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                    <select
                      value={step.icon}
                      onChange={(e) => updateStep(index, "icon", e.target.value)}
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

        {/* Reality Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Seccion de Realidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
              <input
                type="text"
                value={content.realitySection.title}
                onChange={(e) => updateReality("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitulo</label>
              <input
                type="text"
                value={content.realitySection.subtitle}
                onChange={(e) => updateReality("subtitle", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without Financing */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-red-600">Sin Financiamiento</h3>
                <button
                  onClick={() => addRealityItem("withoutFinancing")}
                  className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  + Agregar
                </button>
              </div>
              <div className="space-y-2">
                {content.realitySection.withoutFinancing.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateRealityItem("withoutFinancing", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={() => removeRealityItem("withoutFinancing", index)}
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

            {/* With Financing */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-green-600">Con Financiamiento</h3>
                <button
                  onClick={() => addRealityItem("withFinancing")}
                  className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                >
                  + Agregar
                </button>
              </div>
              <div className="space-y-2">
                {content.realitySection.withFinancing.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateRealityItem("withFinancing", index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      onClick={() => removeRealityItem("withFinancing", index)}
                      className="p-1 text-green-500 hover:bg-green-50 rounded"
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
      </div>
    </div>
  );
}
