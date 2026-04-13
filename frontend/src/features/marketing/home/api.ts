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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/";



export async function getHomePageHeroContent(): Promise<HomePageHeroContent> {
  if (!API_BASE) {
    return getHomePageHeroContentFallback();
  }

  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/home-page-content/`,
      {
        next: { revalidate: 0 },
      }
    );

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
  if (!API_BASE) {
    return getAboutModulesFallback();
  }

  try {
    const response = await fetch(`${API_BASE}/api/marketing/home-about-modules/`, {
      next: { revalidate: 0 },
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



