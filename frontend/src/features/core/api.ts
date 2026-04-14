import { config } from "@/lib/config";
import type { SiteSettings } from "./types";
import { mapSiteSettings, getSiteSettingsFallback } from "./utils";

const SITE_SETTINGS_ENDPOINT = `${config.apiBaseUrl}/api/core/site-settings/`;

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(SITE_SETTINGS_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch site settings");
    }

    const data = await res.json();

    return mapSiteSettings(data);
  } catch (error) {
    return getSiteSettingsFallback();
  }
}