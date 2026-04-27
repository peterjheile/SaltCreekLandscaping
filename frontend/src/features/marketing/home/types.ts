export type HomePageHeroContentApi = {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  expect_items: string[];
  image_url: string | null;
  video_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type HomePageHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  expectItems: string[];
  imageUrl: string | null;
  videoUrl: string | null;
};

export type AboutModuleApi = {
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
};

export type AboutModule = {
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
};