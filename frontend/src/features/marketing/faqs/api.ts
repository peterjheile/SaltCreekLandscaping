import type {
  FAQHeroContent,
  FAQPageContentApi,
  FAQCategoryApi,
  FAQCategoryData
} from "./types";

import {
  getFAQHeroContentFallback,
  mapFAQHeroContent,
  normalizeFAQCategories
} from "./utils";







const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}






export async function getActiveFAQHeroContent(): Promise<FAQHeroContent> {
  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/faq-page-content/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return getFAQHeroContentFallback();
    }

    const data: FAQPageContentApi = await response.json();
    return mapFAQHeroContent(data);
  } catch {
    return getFAQHeroContentFallback();
  }
}








//Here we have the faq api calls
const FAQS_ENDPOINT = `${API_BASE}/api/marketing/faqs/`;
export async function getFAQCategories(): Promise<FAQCategoryData[]> {
  const response = await fetch(FAQS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await handleResponse<FAQCategoryApi[]>(response);
  return normalizeFAQCategories(data);
}