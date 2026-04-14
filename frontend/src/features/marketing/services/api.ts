import { config } from "@/lib/config";
import type {
  ServiceHeroContent,
  ServicePageContentApi,
} from "./types";

import {
  getServiceHeroContentFallback,
  mapServiceHeroContent,
} from "./utils";

const SERVICE_PAGE_CONTENT_ENDPOINT = `${config.apiBaseUrl}/api/marketing/service-page-content/`;

export async function getActiveServiceHeroContent(): Promise<ServiceHeroContent> {
  try {
    const response = await fetch(SERVICE_PAGE_CONTENT_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      return getServiceHeroContentFallback();
    }

    const data: ServicePageContentApi = await response.json();
    return mapServiceHeroContent(data);
  } catch {
    return getServiceHeroContentFallback();
  }
}