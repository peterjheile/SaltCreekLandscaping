"use client";

import { motion } from "motion/react";

type ReviewCardData = {
  name: string;
  image: string;
  context: string;
  rating: number; // 1–5
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${
        filled ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
    >
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
    </svg>
  );
}

export function ReviewCard({ data }: { data: ReviewCardData }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      {/* Top section */}
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100"
        />

        <div className="flex flex-col">
          <p className="text-base font-semibold text-gray-900">
            {data.name}
          </p>

          {/* Stars */}
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} filled={i <= data.rating} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-gray-100" />

      {/* Review text */}
      <p className="text-sm leading-relaxed text-gray-600">
        “{data.context}”
      </p>
    </motion.div>
  );
}