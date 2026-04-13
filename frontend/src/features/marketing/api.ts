// src/features/marketing/api.ts

import type { HeroCard, ParallaxCard } from "./types";
import { prepareParallaxCards } from "./utils";
import type { FeatureCard, FeatureSectionCard } from "./types";
import { prepareStickyScrollContent } from "./utils";
import type { HeroContentApi, HeroContentData, } from "./types";
import {normalizeHeroContent } from "./utils";



async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}


const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const HERO_CARDS_ENDPOINT = `${API_BASE}/api/marketing/hero-cards/`;

export async function fetchHeroCards(): Promise<HeroCard[]> {
  // const res = await fetch(HERO_CARDS_ENDPOINT, {
  //   next: { revalidate: 300 },
  // });
  
  const res = await fetch(HERO_CARDS_ENDPOINT, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero cards");
  }

  return res.json();
}

export async function fetchParallaxCards(): Promise<ParallaxCard[]> {
  const cards = await fetchHeroCards();
  return prepareParallaxCards(cards);
}










const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function fetchFeatureCards() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
  }

  const res = await fetch(
    `${API_BASE_URL}/api/marketing/feature-cards/`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch feature cards");
  }

  const data: FeatureCard[] = await res.json();

  return prepareStickyScrollContent(data);
}




















const HERO_CONTENT_ENDPOINT = `${API_BASE_URL}/api/marketing/hero-content/`;

export async function getHeroContent(): Promise<HeroContentData> {
  const response = await fetch(HERO_CONTENT_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await handleResponse<HeroContentApi>(response);
  return normalizeHeroContent(data);
}








