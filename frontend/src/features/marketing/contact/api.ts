import { config } from "@/lib/config";
import type {
  ContactHeroContent,
  ContactPageContentApi,
} from "./types";
import {
  getContactHeroContentFallback,
  mapContactHeroContent,
} from "./utils";

const CONTACT_PAGE_CONTENT_ENDPOINT = `${config.apiBaseUrl}/api/marketing/contact-page-content/`;

export async function getActiveContactHeroContent(): Promise<ContactHeroContent> {
  try {
    const response = await fetch(CONTACT_PAGE_CONTENT_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      return getContactHeroContentFallback();
    }

    const data: ContactPageContentApi = await response.json();
    return mapContactHeroContent(data);
  } catch {
    return getContactHeroContentFallback();
  }
}