import type {
  ServiceHeroContent,
  ServicePageContentApi,
} from "./types";

import {
  getServiceHeroContentFallback,
  mapServiceHeroContent,
} from "./utils";



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function getActiveServiceHeroContent(): Promise<ServiceHeroContent> {
  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/service-page-content/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return getServiceHeroContentFallback();
    }

    const data: ServicePageContentApi = await response.json();
    return mapServiceHeroContent(data);
  } catch {
    return getServiceHeroContentFallback();
  }
}
