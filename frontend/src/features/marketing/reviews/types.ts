export type ReviewsPageContentApi = {
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

export type ReviewsHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
};

export type ReviewCardApi = {
  id: string | number;
  name: string;
  review: string;
  profileImageUrl: string | null;
  rating: number;
  showOnHomepage: boolean;
  reviewDate: string | null;
};

export type ReviewCardData = {
  id: string | number;
  name: string;
  image: string | null;
  context: string;
  rating: number;
  showOnHomepage: boolean;
  reviewDate: string | null;
};