import { sql } from "@vercel/postgres";
import type {
  SiteConfig,
  NavigationItem,
  ServiceItem,
  OfficeLocation,
  SiteDataProps,
} from "@/types/site-config";

// Default config values in case DB fails
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

// Fetch site configuration directly from database
async function fetchConfig(): Promise<SiteConfig> {
  try {
    const result = await sql`
      SELECT key, value FROM site_config
      WHERE key IN ('company', 'hours', 'social', 'seo')
    `;

    const configMap: Record<string, unknown> = {};
    for (const row of result.rows) {
      configMap[row.key] = row.value;
    }

    return {
      company: (configMap.company as SiteConfig["company"]) || defaultConfig.company,
      hours: (configMap.hours as SiteConfig["hours"]) || defaultConfig.hours,
      social: (configMap.social as SiteConfig["social"]) || defaultConfig.social,
      seo: (configMap.seo as SiteConfig["seo"]) || defaultConfig.seo,
    };
  } catch (error) {
    console.error("Error fetching config:", error);
    return defaultConfig;
  }
}

// Fetch navigation items directly from database
async function fetchNavigation(): Promise<NavigationItem[]> {
  try {
    const result = await sql`
      SELECT * FROM navigation_items
      WHERE is_visible = true
      ORDER BY position
    `;
    return result.rows as NavigationItem[];
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

// Fetch services directly from database
async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const result = await sql`
      SELECT * FROM services
      WHERE is_published = true
      ORDER BY position
    `;
    return result.rows as ServiceItem[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch office locations directly from database
async function fetchLocations(): Promise<OfficeLocation[]> {
  try {
    const result = await sql`
      SELECT * FROM office_locations
      ORDER BY position
    `;
    return result.rows as OfficeLocation[];
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
