import { config } from "@/lib/config";
import type {
  HomePageHeroContentApi,
  HomePageHeroContent,
  AboutModule,
  AboutModuleApi,
} from "./types";

import {
  mapHomePageHeroContent,
  getHomePageHeroContentFallback,
  getAboutModulesFallback,
  mapAboutModules,
} from "./utils";

const HOME_PAGE_CONTENT_ENDPOINT = `${config.apiBaseUrl}/api/marketing/home-page-content/`;
const HOME_ABOUT_MODULES_ENDPOINT = `${config.apiBaseUrl}/api/marketing/home-about-modules/`;

export async function getHomePageHeroContent(): Promise<HomePageHeroContent> {
  try {
    const response = await fetch(HOME_PAGE_CONTENT_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      return getHomePageHeroContentFallback();
    }

    const data: HomePageHeroContentApi = await response.json();
    return mapHomePageHeroContent(data);
  } catch {
    return getHomePageHeroContentFallback();
  }
}

export async function getAboutModules(): Promise<AboutModule[]> {
  try {
    const response = await fetch(HOME_ABOUT_MODULES_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      return getAboutModulesFallback();
    }

    const data: AboutModuleApi[] = await response.json();
    return mapAboutModules(data);
  } catch (error) {
    console.error("Failed to fetch about modules:", error);
    return getAboutModulesFallback();
  }
}