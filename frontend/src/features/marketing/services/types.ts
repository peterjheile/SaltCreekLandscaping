export type ServicePageContentApi = {
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

export type ServiceHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
};