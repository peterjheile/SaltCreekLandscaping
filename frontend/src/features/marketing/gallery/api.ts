import { config } from "@/lib/config";
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

const GALLERY_PAGE_CONTENT_ENDPOINT = `${config.apiBaseUrl}/api/marketing/gallery-page-content/`;
const GALLERY_PHOTOS_ENDPOINT = `${config.apiBaseUrl}/api/marketing/gallery/`;
const HOMEPAGE_GALLERY_PHOTOS_ENDPOINT = `${config.apiBaseUrl}/api/marketing/gallery/homepage/`;

export async function getActiveGalleryHeroContent(): Promise<GalleryHeroContent> {
  try {
    const response = await fetch(GALLERY_PAGE_CONTENT_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
    });

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
    const response = await fetch(GALLERY_PHOTOS_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
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
    const response = await fetch(HOMEPAGE_GALLERY_PHOTOS_ENDPOINT, {
      next: { revalidate: config.revalidateSeconds },
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