import type {
  ReviewsPageContentApi,
  ReviewsHeroContent,
  ReviewCardApi,
  ReviewCardData
} from "./types";

export function mapReviewsHeroContent(
  data: ReviewsPageContentApi
): ReviewsHeroContent {
  return {
    eyebrow: data.eyebrow,
    title: data.title,
    subtitle: data.subtitle,
    heroImageUrl: data.heroImageUrl,
  };
}

export function getReviewsHeroContentFallback(): ReviewsHeroContent {
  return {
    eyebrow: "",
    title: "",
    subtitle: "",
    heroImageUrl: null,
  };
}

export function mapReviewCard(apiCard: ReviewCardApi): ReviewCardData {
  return {
    id: apiCard.id,
    name: apiCard.name,
    image: apiCard.profileImageUrl,
    context: apiCard.review,
    rating: apiCard.rating,
    showOnHomepage: apiCard.showOnHomepage,
    reviewDate: apiCard.reviewDate,
  };
}

export function normalizeReviewCards(apiCards: ReviewCardApi[]): ReviewCardData[] {
  return apiCards.map(mapReviewCard);
}