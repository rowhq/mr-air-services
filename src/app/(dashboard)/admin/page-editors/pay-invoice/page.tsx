"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TrustSignal {
  icon: string;
  text: string;
}

interface HelpBox {
  title: string;
  phone: string;
  financingText: string;
  financingLink: string;
}

interface PayInvoiceContent {
  trustSignals: TrustSignal[];
  helpBox: HelpBox;
}

const defaultContent: PayInvoiceContent = {
  trustSignals: [
    { icon: "lock", text: "Secure payment" },
    { icon: "card", text: "All cards accepted" },
    { icon: "check", text: "Instant confirmation" },
  ],
  helpBox: {
    title: "Need Help?",
    phone: "(832) 437-1000",
    financingText: "View financing options",
    financingLink: "/financing-payments",
  },
};

const iconOptions = ["lock", "card", "check", "shield", "clock", "star", "phone", "mail"];

export default function PayInvoiceEditorPage() {
  const [content, setContent] = useState<PayInvoiceContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const res = await fetch("/api/cms/config?key=pay_invoice_page");
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
        body: JSON.stringify({ key: "pay_invoice_page", value: content }),
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

  function updateTrustSignal(index: number, key: keyof TrustSignal, value: string) {
    const newSignals = [...content.trustSignals];
    newSignals[index] = { ...newSignals[index], [key]: value };
    setContent({ ...content, trustSignals: newSignals });
  }

  function addTrustSignal() {
    setContent({
      ...content,
      trustSignals: [...content.trustSignals, { icon: "check", text: "" }],
    });
  }

  function removeTrustSignal(index: number) {
    const newSignals = content.trustSignals.filter((_, i) => i !== index);
    setContent({ ...content, trustSignals: newSignals });
  }

  function updateHelpBox(key: keyof HelpBox, value: string) {
    setContent({ ...content, helpBox: { ...content.helpBox, [key]: value } });
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
          <h1 className="text-2xl font-bold">Editor: Pay Invoice Page</h1>
        </div>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span className={`text-sm ${saveMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {saveMessage}
            </span>
          )}
          <a
            href="/pay-invoice"
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
          <div className="space-y-3">
            {content.trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                <div className="w-32">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icono</label>
                  <select
                    value={signal.icon}
                    onChange={(e) => updateTrustSignal(index, "icon", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Texto</label>
                  <input
                    type="text"
                    value={signal.text}
                    onChange={(e) => updateTrustSignal(index, "text", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g., Secure payment"
                  />
                </div>
                <button
                  onClick={() => removeTrustSignal(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Help Box */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Caja de Ayuda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
              <input
                type="text"
                value={content.helpBox.title}
                onChange={(e) => updateHelpBox("title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input
                type="text"
                value={content.helpBox.phone}
                onChange={(e) => updateHelpBox("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Financiamiento</label>
              <input
                type="text"
                value={content.helpBox.financingText}
                onChange={(e) => updateHelpBox("financingText", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link de Financiamiento</label>
              <input
                type="text"
                value={content.helpBox.financingLink}
                onChange={(e) => updateHelpBox("financingLink", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
