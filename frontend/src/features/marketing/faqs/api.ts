import { config } from "@/lib/config";
import type {
  FAQHeroContent,
  FAQPageContentApi,
  FAQCategoryApi,
  FAQCategoryData,
} from "./types";

import {
  getFAQHeroContentFallback,
  mapFAQHeroContent,
  normalizeFAQCategories,
} from "./utils";

const FAQ_PAGE_CONTENT_ENDPOINT = `${config.apiBaseUrl}/api/marketing/faq-page-content/`;
const FAQS_ENDPOINT = `${config.apiBaseUrl}/api/marketing/faqs/`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getActiveFAQHeroContent(): Promise<FAQHeroContent> {
  try {
    const response = await fetch(FAQ_PAGE_CONTENT_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      return getFAQHeroContentFallback();
    }

    const data: FAQPageContentApi = await response.json();
    return mapFAQHeroContent(data);
  } catch {
    return getFAQHeroContentFallback();
  }
}

// FAQ categories
export async function getFAQCategories(): Promise<FAQCategoryData[]> {
  const response = await fetch(FAQS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: config.revalidateSeconds },
  });

  const data = await handleResponse<FAQCategoryApi[]>(response);
  return normalizeFAQCategories(data);
}