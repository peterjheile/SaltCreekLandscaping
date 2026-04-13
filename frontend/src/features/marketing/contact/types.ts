export type ContactPageContentApi = {
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

export type ContactHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
};