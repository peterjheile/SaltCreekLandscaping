import type {
  HomePageHeroContent,
  HomePageHeroContentApi,
  AboutModuleApi,
  AboutModule,
} from "./types";

export function mapHomePageHeroContent(
  data: HomePageHeroContentApi
): HomePageHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    expectItems: data.expect_items ?? [],
    videoUrl: data.video_url,
  };
}

export function getHomePageHeroContentFallback(): HomePageHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    expectItems: [],
    videoUrl: null,
  };
}







export function mapAboutModule(data: AboutModuleApi): AboutModule {
  return {
    title: data.title,
    description: data.description,
    image: data.image,
    imageAlt: data.imageAlt,
    ctaText: data.ctaText,
    ctaLink: data.ctaLink,
  };
}

export function mapAboutModules(data: AboutModuleApi[]): AboutModule[] {
  return data.map(mapAboutModule);
}

export function getAboutModuleFallback(): AboutModule {
  return {
    title: "",
    description: "",
    image: null,
    imageAlt: "",
    ctaText: "",
    ctaLink: "",
  };
}

export function getAboutModulesFallback(): AboutModule[] {
  return [];
}