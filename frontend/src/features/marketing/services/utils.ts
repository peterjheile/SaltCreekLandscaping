import type { 
  ServiceHeroContent, 
  ServicePageContentApi,
} from "./types";



export function mapServiceHeroContent(
  data: ServicePageContentApi
): ServiceHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    heroImageUrl: data.heroImageUrl,
  };
}

export function getServiceHeroContentFallback(): ServiceHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    heroImageUrl: null,
  };
}