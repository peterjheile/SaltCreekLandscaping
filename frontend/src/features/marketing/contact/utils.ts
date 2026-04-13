import {
    ContactPageContentApi,
    ContactHeroContent
} from "./types"

export function mapContactHeroContent(
  data: ContactPageContentApi
): ContactHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    heroImageUrl: data.heroImageUrl,
  };
}

export function getContactHeroContentFallback(): ContactHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    heroImageUrl: null,
  };
}