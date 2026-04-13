import { ReviewReveal } from "@/components/ui/review-reveal";
import { getReviewCards } from "@/features/marketing/reviews/api";



export default async function TestimonySection() {
  const allReviews = await getReviewCards();

  return <ReviewReveal reviews={allReviews} />;
}