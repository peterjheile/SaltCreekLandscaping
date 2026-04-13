import type {
  ReviewsPageContentApi,
  ReviewsHeroContent,
  ReviewCardApi,
  ReviewCardData,
} from "./types";

import {
  mapReviewsHeroContent,
  getReviewsHeroContentFallback,
  normalizeReviewCards,
} from "./utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const REVIEW_HERO_ENDPOINT = `${API_BASE}/api/marketing/reviews-page-content/`;

export async function getActiveReviewsHeroContent(): Promise<ReviewsHeroContent> {
  try {
    const response = await fetch(REVIEW_HERO_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return getReviewsHeroContentFallback();
    }

    const data: ReviewsPageContentApi = await response.json();

    return mapReviewsHeroContent(data);
  } catch {
    return getReviewsHeroContentFallback();
  }
}







const REVIEW_CARDS_ENDPOINT = `${API_BASE}/api/marketing/reviews/`;

export async function getReviewCards(): Promise<ReviewCardData[]> {
  const response = await fetch(REVIEW_CARDS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await handleResponse<ReviewCardApi[]>(response);
  return normalizeReviewCards(data);
}









const HOMEPAGE_REVIEW_CARDS_ENDPOINT = `${API_BASE}/api/marketing/reviews/homepage/`;

export async function getHomepageReviewCards(): Promise<ReviewCardData[]> {
  const response = await fetch(HOMEPAGE_REVIEW_CARDS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await handleResponse<ReviewCardApi[]>(response);
  return normalizeReviewCards(data);
}