"use client";

import { useEffect, useState } from "react";

interface CompanyConfig {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface HoursConfig {
  weekdays: string;
  saturday: string;
  sunday: string;
  emergency: string;
}

interface SocialConfig {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  yelp: string;
  google: string;
}

interface SeoConfig {
  default_title: string;
  title_suffix: string;
  default_description: string;
  default_og_image: string;
}

interface ConfigState {
  company: CompanyConfig;
  hours: HoursConfig;
  social: SocialConfig;
  seo: SeoConfig;
}

const defaultConfig: ConfigState = {
  company: {
    name: "Mr. Air Services",
    phone: "(832) 437-1000",
    email: "info@mrairservices.com",
    address: "Houston, TX",
  },
  hours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 4:00 PM",
    sunday: "Closed",
    emergency: "24/7 Emergency Available",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    yelp: "",
    google: "",
  },
  seo: {
    default_title: "Mr. Air Services | Houston HVAC Experts",
    title_suffix: " | Mr. Air Services",
    default_description:
      "Houston's trusted HVAC experts. Professional air conditioning repair, heating services, and maintenance plans.",
    default_og_image: "",
  },
};

export default function SiteConfigPage() {
  const [config, setConfig] = useState<ConfigState>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      const res = await fetch("/api/cms/config");
      if (res.ok) {
        const data = await res.json();
        // Merge with defaults to ensure all fields exist
        setConfig({
          company: { ...defaultConfig.company, ...data.company },
          hours: { ...defaultConfig.hours, ...data.hours },
          social: { ...defaultConfig.social, ...data.social },
          seo: { ...defaultConfig.seo, ...data.seo },
        });
      }
    } catch (error) {
      console.error("Failed to load config:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveConfig() {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Save each config section
      await Promise.all([
        fetch("/api/cms/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "company", value: config.company }),
        }),
        fetch("/api/cms/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hours", value: config.hours }),
        }),
        fetch("/api/cms/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "social", value: config.social }),
        }),
        fetch("/api/cms/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "seo", value: config.seo }),
        }),
      ]);

      setSaveMessage("Configuration saved successfully");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save config:", error);
      setSaveMessage("Error saving configuration");
    } finally {
      setIsSaving(false);
    }
  }

  function updateCompany(key: keyof CompanyConfig, value: string) {
    setConfig({
      ...config,
      company: { ...config.company, [key]: value },
    });
  }

  function updateHours(key: keyof HoursConfig, value: string) {
    setConfig({
      ...config,
      hours: { ...config.hours, [key]: value },
    });
  }

  function updateSocial(key: keyof SocialConfig, value: string) {
    setConfig({
      ...config,
      social: { ...config.social, [key]: value },
    });
  }

  function updateSeo(key: keyof SeoConfig, value: string) {
    setConfig({
      ...config,
      seo: { ...config.seo, [key]: value },
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
        <h1 className="text-2xl font-bold">Site Configuration</h1>
        <div className="flex items-center gap-4">
          {saveMessage && (
            <span
              className={`text-sm ${
                saveMessage.includes("Error")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {saveMessage}
            </span>
          )}
          <button
            onClick={saveConfig}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={config.company.name}
                onChange={(e) => updateCompany("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Phone
              </label>
              <input
                type="text"
                value={config.company.phone}
                onChange={(e) => updateCompany("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Email
              </label>
              <input
                type="email"
                value={config.company.email}
                onChange={(e) => updateCompany("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={config.company.address}
                onChange={(e) => updateCompany("address", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Business Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monday - Friday
              </label>
              <input
                type="text"
                value={config.hours.weekdays}
                onChange={(e) => updateHours("weekdays", e.target.value)}
                placeholder="7:00 AM - 6:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saturday
              </label>
              <input
                type="text"
                value={config.hours.saturday}
                onChange={(e) => updateHours("saturday", e.target.value)}
                placeholder="8:00 AM - 4:00 PM"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sunday
              </label>
              <input
                type="text"
                value={config.hours.sunday}
                onChange={(e) => updateHours("sunday", e.target.value)}
                placeholder="Closed"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency
              </label>
              <input
                type="text"
                value={config.hours.emergency}
                onChange={(e) => updateHours("emergency", e.target.value)}
                placeholder="24/7 Available"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="url"
                value={config.social.facebook}
                onChange={(e) => updateSocial("facebook", e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="url"
                value={config.social.instagram}
                onChange={(e) => updateSocial("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter / X
              </label>
              <input
                type="url"
                value={config.social.twitter}
                onChange={(e) => updateSocial("twitter", e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="url"
                value={config.social.linkedin}
                onChange={(e) => updateSocial("linkedin", e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube
              </label>
              <input
                type="url"
                value={config.social.youtube}
                onChange={(e) => updateSocial("youtube", e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yelp
              </label>
              <input
                type="url"
                value={config.social.yelp}
                onChange={(e) => updateSocial("yelp", e.target.value)}
                placeholder="https://yelp.com/biz/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Business
              </label>
              <input
                type="url"
                value={config.social.google}
                onChange={(e) => updateSocial("google", e.target.value)}
                placeholder="https://g.page/..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Default SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Title
              </label>
              <input
                type="text"
                value={config.seo.default_title}
                onChange={(e) => updateSeo("default_title", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title Suffix
              </label>
              <input
                type="text"
                value={config.seo.title_suffix}
                onChange={(e) => updateSeo("title_suffix", e.target.value)}
                placeholder=" | Mr. Air Services"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Added to the end of each page title
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Description
              </label>
              <textarea
                value={config.seo.default_description}
                onChange={(e) => updateSeo("default_description", e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default OG Image
              </label>
              <input
                type="url"
                value={config.seo.default_og_image}
                onChange={(e) => updateSeo("default_og_image", e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
