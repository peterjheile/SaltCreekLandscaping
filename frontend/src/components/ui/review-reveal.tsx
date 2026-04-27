"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { Star } from "lucide-react";

import { ReviewCard } from "@/components/ui/review-card";
import type { ReviewCardData } from "@/features/marketing/reviews/types";

type EntryDirection =
  | "top"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

type GridSlot = {
  from: EntryDirection;
};

type ReviewRevealProps = {
  reviews: ReviewCardData[];
};

const DESKTOP_SLOTS: GridSlot[] = [
  { from: "top-left" },
  { from: "top" },
  { from: "top-right" },
  { from: "left" },
  { from: "top" },
  { from: "right" },
  { from: "bottom-left" },
  { from: "bottom" },
  { from: "bottom-right" },
];

const TABLET_SLOTS = DESKTOP_SLOTS.slice(0, 6);
const MOBILE_SLOTS = DESKTOP_SLOTS.slice(0, 4);

const MAX_REVIEW_CHARS = 180;

function getOffset(from: EntryDirection) {
  switch (from) {
    case "top":
      return { x: 0, y: -140 };
    case "left":
      return { x: -160, y: 0 };
    case "right":
      return { x: 160, y: 0 };
    case "top-left":
      return { x: -120, y: -120 };
    case "top-right":
      return { x: 120, y: -120 };
    case "bottom-left":
      return { x: -120, y: 120 };
    case "bottom":
      return { x: 0, y: 140 };
    case "bottom-right":
      return { x: 120, y: 120 };
  }
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) {
    return text;
  }

  return `${text.slice(0, maxChars).trimEnd()}...`;
}

function AverageStars({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i < filled ? "var(--color-highlight)" : "none"}
          stroke={
            i < filled
              ? "var(--color-highlight)"
              : "color-mix(in srgb, var(--color-highlight) 20%, white)"
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function AnimatedGridCard({
  review,
  index,
  from,
  progress,
  horizontalOnly = false,
  horizontalDistance = 100,
  featured = false,
}: {
  review: ReviewCardData;
  index: number;
  from: EntryDirection;
  progress: MotionValue<number>;
  horizontalOnly?: boolean;
  horizontalDistance?: number;
  featured?: boolean;
}) {
  const desktopOffset = getOffset(from);
  const sideOnlyOffset = {
    x: index % 2 === 0 ? -horizontalDistance : horizontalDistance,
    y: 0,
  };

  const activeOffset = horizontalOnly ? sideOnlyOffset : desktopOffset;

  const x = useTransform(progress, [0, 1], [activeOffset.x, 0]);
  const y = useTransform(progress, [0, 1], [activeOffset.y, 0]);
  const opacity = useTransform(progress, [0, 0.2, 1], [0, 0.65, 1]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="relative z-0 flex w-full justify-center will-change-transform"
    >
      <ReviewCard data={review} featured={featured} />
    </motion.div>
  );
}

export function ReviewReveal({ reviews }: ReviewRevealProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const totalReviews = reviews.length;

  const homepageReviews = useMemo(
    () =>
      reviews
        .filter((review) => review.showOnHomepage)
        .map((review) => ({
          ...review,
          context: truncateText(review.context, MAX_REVIEW_CHARS),
        })),
    [reviews]
  );


  const avgRating = useMemo(() => {
    if (totalReviews === 0) return 0;

    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    );
  }, [reviews, totalReviews]);

  const mobileReviews = homepageReviews.slice(0, MOBILE_SLOTS.length);
  const tabletReviews = homepageReviews.slice(0, TABLET_SLOTS.length);
  const desktopReviews = homepageReviews.slice(0, DESKTOP_SLOTS.length);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "end 78%"],
  });

  const mobileProgress = useTransform(scrollYProgress, [0, 0.38], [0, 1], {
    clamp: true,
  });

  const tabletProgress = useTransform(scrollYProgress, [0, 0.43], [0, 1], {
    clamp: true,
  });

  const desktopProgress = useTransform(scrollYProgress, [0, 0.55], [0, 1], {
    clamp: true,
  });

  if (!homepageReviews.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-3 sm:bg-white lg:py-14"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 50%, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent 55%),
            radial-gradient(ellipse at 85% 50%, color-mix(in srgb, var(--color-secondary) 4%, transparent), transparent 50%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative z-20 mb-14 text-center lg:mb-16">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-secondary)" }}
          >
            Testimonials
          </p>

          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--color-primary)" }}
          >
            Trusted by homeowners who want it done right
          </h2>

          <div
            className="mt-3 inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-primary) 12%, transparent)",
            }}
          >
            <AverageStars rating={avgRating} />
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: "var(--color-primary)" }}
            >
              {avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-neutral-400">
              · {totalReviews}+ reviews
            </span>
          </div>
        </div>

        <div className="relative z-0 grid grid-cols-1 justify-items-center gap-5 md:hidden">
          {mobileReviews.map((review, index) => (
            <div key={review.id} className="flex w-full justify-center">
              <AnimatedGridCard
                review={review}
                index={index}
                from={MOBILE_SLOTS[index].from}
                progress={mobileProgress}
                horizontalOnly={true}
                horizontalDistance={90}
                featured={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="relative z-0 hidden grid-cols-2 justify-items-center gap-5 md:grid lg:hidden">
          {tabletReviews.map((review, index) => (
            <div key={review.id} className="flex w-full justify-center">
              <AnimatedGridCard
                review={review}
                index={index}
                from={TABLET_SLOTS[index].from}
                progress={tabletProgress}
                horizontalOnly={true}
                horizontalDistance={110}
                featured={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="relative z-0 hidden grid-cols-3 justify-items-center gap-5 lg:grid">
          {desktopReviews.map((review, index) => (
            <div key={review.id} className="flex w-full justify-center">
              <AnimatedGridCard
                review={review}
                index={index}
                from={DESKTOP_SLOTS[index].from}
                progress={desktopProgress}
                featured={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="relative z-20 mt-10 text-center">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:opacity-80"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-primary) 22%, transparent)",
              color: "var(--color-primary)",
            }}
          >
            Read all reviews
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}