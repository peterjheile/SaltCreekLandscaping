import { config } from "@/lib/config";
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

const REVIEW_HERO_ENDPOINT = `${config.apiBaseUrl}/api/marketing/reviews-page-content/`;
const REVIEW_CARDS_ENDPOINT = `${config.apiBaseUrl}/api/marketing/reviews/`;
const HOMEPAGE_REVIEW_CARDS_ENDPOINT = `${config.apiBaseUrl}/api/marketing/reviews/homepage/`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getActiveReviewsHeroContent(): Promise<ReviewsHeroContent> {
  try {
    const response = await fetch(REVIEW_HERO_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: config.revalidateSeconds },
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

export async function getReviewCards(): Promise<ReviewCardData[]> {
  const response = await fetch(REVIEW_CARDS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: config.revalidateSeconds },
  });

  const data = await handleResponse<ReviewCardApi[]>(response);
  return normalizeReviewCards(data);
}

export async function getHomepageReviewCards(): Promise<ReviewCardData[]> {
  const response = await fetch(HOMEPAGE_REVIEW_CARDS_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: config.revalidateSeconds },
  });

  const data = await handleResponse<ReviewCardApi[]>(response);
  return normalizeReviewCards(data);
}