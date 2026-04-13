import type {
  GalleryHeroContent,
  GalleryPageContentApi,
  GalleryPhoto,
  GalleryPhotoApi,
} from "./types";

import {
  getGalleryHeroContentFallback,
  getGalleryPhotosFallback,
  mapGalleryHeroContent,
  mapGalleryPhotos,
} from "./utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";





export async function getActiveGalleryHeroContent(): Promise<GalleryHeroContent> {
  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/gallery-page-content/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return getGalleryHeroContentFallback();
    }

    const data: GalleryPageContentApi = await response.json();
    return mapGalleryHeroContent(data);
  } catch {
    return getGalleryHeroContentFallback();
  }
}






export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const response = await fetch(`${API_BASE}/api/marketing/gallery/`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return getGalleryPhotosFallback();
    }

    const data: GalleryPhotoApi[] = await response.json();
    return mapGalleryPhotos(data);
  } catch {
    return getGalleryPhotosFallback();
  }
}






export async function getHomepageGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const response = await fetch(
      `${API_BASE}/api/marketing/gallery/homepage/`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return getGalleryPhotosFallback();
    }

    const data: GalleryPhotoApi[] = await response.json();
    return mapGalleryPhotos(data);
  } catch {
    return getGalleryPhotosFallback();
  }
}