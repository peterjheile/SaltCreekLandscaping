export type FAQPageContentApi = {
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

export type FAQHeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImageUrl: string | null;
};





export type FAQApi = {
  id: string | number;
  question: string;
  answer: string;
};

export type FAQCategoryApi = {
  id: string | number;
  name: string;
  slug: string;
  faqs: FAQApi[];
};

export type FAQData = {
  id: string | number;
  question: string;
  answer: string;
};

export type FAQCategoryData = {
  id: string | number;
  title: string;
  slug: string;
  items: FAQData[];
};