import type {
  SiteConfig,
  NavigationItem,
  ServiceItem,
  OfficeLocation,
  SiteDataProps,
} from "@/types/site-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Default config values in case API fails
const defaultConfig: SiteConfig = {
  company: {
    name: "Mr. Air Services",
    tagline: "Houston HVAC Experts",
    phone: "(832) 437-1000",
    email: "info@mrairservices.com",
  },
  hours: {
    weekday: "Mon-Fri: 8AM-5PM",
    saturday: "Sat: 9AM-2PM",
    sunday: "Closed",
    emergency: "24/7 Emergency Service",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
  },
  seo: {
    defaultTitle: "Mr. Air Services | Houston HVAC Experts",
    defaultDescription:
      "Professional HVAC services in Houston. AC repair, installation, maintenance and indoor air quality solutions.",
  },
};

// Fetch site configuration from CMS
async function fetchConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${BASE_URL}/api/cms/config`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error("Failed to fetch config:", res.status);
      return defaultConfig;
    }

    const data = await res.json();

    return {
      company: data.company || defaultConfig.company,
      hours: data.hours || defaultConfig.hours,
      social: data.social || defaultConfig.social,
      seo: data.seo || defaultConfig.seo,
    };
  } catch (error) {
    console.error("Error fetching config:", error);
    return defaultConfig;
  }
}

// Fetch navigation items from CMS
async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cms/navigation`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch navigation:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

// Fetch services from CMS
async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cms/services`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch services:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch office locations from CMS
async function fetchLocations(): Promise<OfficeLocation[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/cms/office-locations`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch locations:", res.status);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}

// Fetch all site data in parallel
export async function getSiteData(): Promise<SiteDataProps> {
  const [config, navigation, services, locations] = await Promise.all([
    fetchConfig(),
    fetchNavigation(),
    fetchServices(),
    fetchLocations(),
  ]);

  const primaryLocation = locations.find((loc) => loc.is_primary) || locations[0];

  return {
    config,
    navigation,
    services,
    primaryLocation,
  };
}

// Export individual fetchers for components that need specific data
export { fetchConfig, fetchNavigation, fetchServices, fetchLocations };
