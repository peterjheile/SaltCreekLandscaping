import type { 
  GalleryHeroContent, 
  GalleryPageContentApi,
  GalleryPhotoApi,
  GalleryPhoto,
} from "./types";



export function mapGalleryHeroContent(
  data: GalleryPageContentApi
): GalleryHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    heroImageUrl: data.heroImageUrl,
  };
}

export function getGalleryHeroContentFallback(): GalleryHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    heroImageUrl: null,
  };
}








export function mapGalleryPhoto(
  data: GalleryPhotoApi
): GalleryPhoto {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
  };
}

export function mapGalleryPhotos(
  data: GalleryPhotoApi[]
): GalleryPhoto[] {
  return data.map(mapGalleryPhoto);
}

export function getGalleryPhotosFallback(): GalleryPhoto[] {
  return [];
}