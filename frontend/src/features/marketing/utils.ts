// src/features/marketing/utils.ts

import type { HeroCard, ParallaxCard, FeatureCard, FeatureSectionCard } from "./types";
import type { HeroContentApi, HeroContentData } from "./types";



const MAX_HERO_CARDS = 15;
const MAX_FEATURE_CARDS = 4;

export function mapHeroCardToParallaxCard(card: HeroCard): ParallaxCard {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    thumbnail: card.image_url ?? "",
  };
}

export function normalizeHeroCards(cards: HeroCard[]): HeroCard[] {
  if (cards.length === 0) return [];

  if (cards.length >= MAX_HERO_CARDS) {
    return cards.slice(0, MAX_HERO_CARDS);
  }

  const normalized: HeroCard[] = [];
  let index = 0;

  while (normalized.length < MAX_HERO_CARDS) {
    normalized.push(cards[index % cards.length]);
    index++;
  }

  return normalized;
}

export function prepareParallaxCards(cards: HeroCard[]): ParallaxCard[] {
  const normalized = normalizeHeroCards(cards);
  return normalized.map(mapHeroCardToParallaxCard);
}

export function mapFeatureCardToSectionCard(
  card: FeatureCard
): FeatureSectionCard {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    image: card.imageUrl ?? "",
    ctaText: card.ctaText || undefined,
    ctaLink: card.ctaLink || undefined,
  };
}








export function normalizeFeatureCards(
  cards: FeatureCard[]
): FeatureSectionCard[] {
  const mapped = cards.map(mapFeatureCardToSectionCard);

  if (mapped.length === 0) return [];

  if (mapped.length >= MAX_FEATURE_CARDS) {
    return mapped.slice(0, MAX_FEATURE_CARDS);
  }

  const normalized: FeatureSectionCard[] = [...mapped];
  let index = 0;

  while (normalized.length < MAX_FEATURE_CARDS) {
    const cardToDuplicate = mapped[index % mapped.length];

    normalized.push({
      ...cardToDuplicate,
      id: Number(`${cardToDuplicate.id}${index + 1}`),
    });

    index++;
  }

  return normalized;
}


export function prepareFeatureCards(
  cards: FeatureCard[]
): FeatureSectionCard[] {
  return normalizeFeatureCards(cards);
}

export function mapFeatureSectionCardToStickyScrollItem(
  card: FeatureSectionCard
) {
  return {
    title: card.title,
    description: card.description,
    image: card.image,
    imageAlt: card.title,
    ctaText: card.ctaText,
    ctaLink: card.ctaLink,
  };
}

export function prepareStickyScrollContent(cards: FeatureCard[]) {
  const normalized = prepareFeatureCards(cards);
  return normalized.map(mapFeatureSectionCardToStickyScrollItem);
}















export function normalizeHeroContent(
  apiContent: HeroContentApi
): HeroContentData {
  return {
    title: apiContent.title,
    subtitle: apiContent.subtitle,
  };
}










