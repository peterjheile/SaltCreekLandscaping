import { ReviewReveal } from "@/components/ui/review-reveal";
import { getReviewCards } from "@/features/marketing/api";

export default async function TestimonySection() {
  const reviews = await getReviewCards();

  return <ReviewReveal reviews={reviews} />;
}