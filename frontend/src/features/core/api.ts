import type { SiteSettings } from "./types";
import { mapSiteSettings, getSiteSettingsFallback } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const SITE_SETTINGS_ENDPOINT = `${API_BASE_URL}/api/core/site-settings/`;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(SITE_SETTINGS_ENDPOINT, {
      next: { revalidate: 60 }, // ISR
    });

    if (!res.ok) {
      throw new Error("Failed to fetch site settings");
    }

    const data = await res.json();

    return mapSiteSettings(data);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return getSiteSettingsFallback();
  }
}