"use client";

import { useMemo } from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";

import { ReviewCard } from "@/components/ui/review-card";
import type {
  ReviewCardData,
  ReviewsHeroContent,
} from "@/features/marketing/reviews/types";


import { useQuoteRequestModal } from "@/features/quote-request/QuoteRequestModalProvider";

type ReviewAllProps = {
  reviews: ReviewCardData[];
  heroContent: ReviewsHeroContent | null;
};

function AverageStar({ filled }: { filled: boolean }) {
  return (
    <Star
      className={
        filled
          ? "h-5 w-5 fill-highlight text-highlight"
          : "h-5 w-5 text-text-inverse/30"
      }
    />
  );
}

function splitIntoBalancedColumns(
  reviews: ReviewCardData[],
  columnCount: number
): ReviewCardData[][] {
  const columns: ReviewCardData[][] = Array.from(
    { length: columnCount },
    () => []
  );

  const heights = new Array(columnCount).fill(0);

  for (const review of reviews) {
    const shortestColumnIndex = heights.indexOf(Math.min(...heights));
    columns[shortestColumnIndex].push(review);

    const estimatedHeight = 140 + (review.context?.length ?? 120);

    heights[shortestColumnIndex] += estimatedHeight;
  }

  return columns;
}

export default function ReviewAll({
  reviews,
  heroContent,
}: ReviewAllProps) {
  const totalReviews = reviews.length;

  const { openQuoteRequestModal } = useQuoteRequestModal();

  const averageRating = useMemo(() => {
    if (totalReviews === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  }, [reviews, totalReviews]);

  const ratingCounts = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
      })),
    [reviews]
  );

  const twoColumnReviews = useMemo(
    () => splitIntoBalancedColumns(reviews, 2),
    [reviews]
  );

  const threeColumnReviews = useMemo(
    () => splitIntoBalancedColumns(reviews, 3),
    [reviews]
  );

  const eyebrow = heroContent?.eyebrow || "Customer Reviews";
  const title = heroContent?.title || "What our clients say";
  const subtitle =
    heroContent?.subtitle ||
    "Real feedback from homeowners who trusted us to keep their properties looking clean, sharp, and professionally maintained.";
  const heroImageUrl = heroContent?.heroImageUrl || "/lawn.png";

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:gap-12">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-highlight"
              >
                {eyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left text-4xl font-bold tracking-tight text-text-inverse md:text-5xl lg:text-6xl"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 max-w-2xl text-left text-sm leading-7 text-text-inverse/80 sm:text-base"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
                <div className="min-w-0">
                  <p className="text-5xl font-bold text-text-inverse">
                    {totalReviews > 0 ? averageRating.toFixed(1) : "0.0"}
                  </p>

                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AverageStar
                        key={i}
                        filled={i < Math.round(averageRating)}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-text-inverse/70">
                    {totalReviews} reviews
                  </p>
                </div>

                <div className="h-px w-full bg-white/20 sm:h-16 sm:w-px" />

                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    {ratingCounts.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="w-3 text-xs text-text-inverse/80">
                          {star}
                        </span>

                        <div className="h-1.5 flex-1 rounded-full bg-white/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                totalReviews > 0
                                  ? `${(count / totalReviews) * 100}%`
                                  : "0%",
                            }}
                            className="h-full rounded-full bg-highlight"
                          />
                        </div>

                        <span className="text-xs text-text-inverse/60">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="h-[3px] w-full bg-white" />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-5 sm:hidden">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex min-w-0 justify-center"
              >
                <ReviewCard data={review} featured={index === 0} />
              </motion.div>
            ))}
          </div>

          <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
            {twoColumnReviews.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-5">
                {column.map((review, rowIndex) => {
                  const globalIndex = colIndex + rowIndex * 2;

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex min-w-0 justify-center"
                    >
                      <ReviewCard
                        data={review}
                        featured={globalIndex === 0}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="hidden gap-5 lg:grid lg:grid-cols-3">
            {threeColumnReviews.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-5">
                {column.map((review, rowIndex) => {
                  const globalIndex = colIndex + rowIndex * 3;

                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex min-w-0 justify-center"
                    >
                      <ReviewCard
                        data={review}
                        featured={globalIndex === 0}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-[1.75rem] border border-primary/15 bg-[color:color-mix(in_srgb,var(--color-primary)_6%,white)] px-8 py-10 text-center"
          >
            <p className="text-xl font-semibold text-primary">
              Like what you see?
            </p>

            <p className="mt-2 text-sm text-text/70">
              Join our happy clients and get a free quote today.
            </p>

            <div
              className="mt-6 hover:cursor-pointer inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90"
              onClick = {() => openQuoteRequestModal()}
            >
              Book a Free Quote
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}