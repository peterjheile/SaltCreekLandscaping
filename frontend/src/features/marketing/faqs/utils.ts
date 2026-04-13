import type { 
  FAQHeroContent, 
  FAQPageContentApi,
  FAQApi,
  FAQCategoryApi,
  FAQData,
  FAQCategoryData,
} from "./types";



export function mapFAQHeroContent(
  data: FAQPageContentApi
): FAQHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    heroImageUrl: data.heroImageUrl,
  };
}

export function getFAQHeroContentFallback(): FAQHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    heroImageUrl: null,
  };
}






//Utility for FAQ api calls
export function mapFAQ(apiFaq: FAQApi): FAQData {
  return {
    id: apiFaq.id,
    question: apiFaq.question,
    answer: apiFaq.answer,
  };
}

export function mapFAQCategory(apiCategory: FAQCategoryApi): FAQCategoryData {
  return {
    id: apiCategory.id,
    title: apiCategory.name,
    slug: apiCategory.slug,
    items: apiCategory.faqs.map(mapFAQ),
  };
}

export function normalizeFAQCategories(
  apiCategories: FAQCategoryApi[]
): FAQCategoryData[] {
  return apiCategories.map(mapFAQCategory);
}