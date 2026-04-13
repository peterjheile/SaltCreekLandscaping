export type GalleryPageContentApi = {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type GalleryHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
};







export type GalleryPhotoApi = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  show_on_homepage: boolean;
  sort_order: number;
  created_at: string;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};