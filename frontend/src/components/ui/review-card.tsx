"use client";

import { Star } from "lucide-react";
import type { ReviewCardData } from "@/features/marketing/reviews/types";

type ReviewCardProps = {
  data: ReviewCardData;
  featured?: boolean;
};

function Stars({ rating }: { rating: ReviewCardData["rating"] }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            className={
              filled
                ? "h-4 w-4 fill-highlight text-highlight"
                : "h-4 w-4 text-primary/20"
            }
          />
        );
      })}
    </div>
  );
}

export function ReviewCard({ data, featured = false }: ReviewCardProps) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/75 backdrop-blur-xl",
        "shadow-[0_20px_60px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
        "transition-transform duration-300",
        featured
          ? "w-[280px] p-6 sm:w-[360px]"
          : "w-[240px] p-5 sm:w-[300px]",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.62))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-highlight/10 blur-2xl" />

      <div className="relative">
        <div className="mb-5 flex items-center gap-3">
          <div
            className={[
              "relative shrink-0 overflow-hidden rounded-full border border-primary/10 bg-primary/5",
              featured ? "h-14 w-14" : "h-12 w-12",
            ].join(" ")}
          >
            {data.image ? (
              <img
                src={data.image}
                alt={data.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <h3
              className={[
                "truncate font-semibold text-primary",
                featured ? "text-[1.05rem]" : "text-base",
              ].join(" ")}
            >
              {data.name}
            </h3>

            <div className="mt-1">
              <Stars rating={data.rating} />
            </div>
          </div>
        </div>

        <p
          className={[
            "text-left leading-7 text-text/80",
            featured ? "text-[0.98rem]" : "text-sm",
          ].join(" ")}
        >
          “{data.context}”
        </p>
      </div>
    </article>
  );
}