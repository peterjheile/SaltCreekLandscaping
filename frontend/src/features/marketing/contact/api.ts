import type {
  ContactHeroContent,
  ContactPageContentApi,
} from "./types";

import {
  getContactHeroContentFallback,
  mapContactHeroContent,
} from "./utils";



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function getActiveContactHeroContent(): Promise<ContactHeroContent> {
  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/contact-page-content/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return getContactHeroContentFallback();
    }

    const data: ContactPageContentApi = await response.json();
    return mapContactHeroContent(data);
  } catch {
    return getContactHeroContentFallback();
  }
}
