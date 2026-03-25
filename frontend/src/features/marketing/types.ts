// src/features/marketing/types.ts

export type HeroCard = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

export type ParallaxCard = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};




// these are the feature cards below the hero cards on the homepage.
export type FeatureCard = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  sortOrder: number;
};

export type FeatureSectionCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
};









export type ReviewCardApi = {
  id: string | number;
  name: string;
  tag: string;
  review: string;
  image: string | null;
};

export type ReviewCardData = {
  name: string;
  tag: string;
  image: string;
  context: string;
};







export type HeroContentApi = {
  id: string | number;
  title: string;
  subtitle: string;
};

export type HeroContentData = {
  title: string;
  subtitle: string;
};