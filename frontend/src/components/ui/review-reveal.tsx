"use client";

import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ReviewCard } from "@/components/ui/review-card";

type ReviewCardData = {
  name: string;
  tag: string;
  image: string;
  context: string;
};

type ReviewRevealProps = {
  reviews: ReviewCardData[];
};

type CardLayout = {
  top: string;
  left: string;
  fromX: number;
  fromY: number;
  fromScale: number;
  rotate: number;
};

type BackgroundCardLayout = {
  top: string;
  left: string;
  rotate: number;
  scale: number;
};

const ACTIVE_CARD_LAYOUTS: CardLayout[] = [
  {
    top: "15%",
    left: "10%",
    fromX: -260,
    fromY: -380,
    fromScale: 0.72,
    rotate: -10,
  },
  {
    top: "18%",
    left: "54%",
    fromX: 280,
    fromY: -140,
    fromScale: 0.76,
    rotate: 8,
  },
  {
    top: "56%",
    left: "18%",
    fromX: -300,
    fromY: 120,
    fromScale: 0.74,
    rotate: -7,
  },
  {
    top: "50%",
    left: "50%",
    fromX: 260,
    fromY: 180,
    fromScale: 0.78,
    rotate: 9,
  },
  {
    top: "34%",
    left: "34%",
    fromX: 0,
    fromY: -450,
    fromScale: 0.7,
    rotate: -4,
  },
];

const BACKGROUND_CARD_LAYOUTS: BackgroundCardLayout[] = [
  {
    top: "4%",
    left: "4%",
    rotate: -18,
    scale: 0.9,
  },
  {
    top: "9%",
    left: "31%",
    rotate: 6,
    scale: 0.94,
  },
  {
    top: "7%",
    left: "67%",
    rotate: 14,
    scale: 0.89,
  },
  {
    top: "30%",
    left: "0%",
    rotate: -9,
    scale: 0.97,
  },
  {
    top: "27%",
    left: "61%",
    rotate: 19,
    scale: 0.92,
  },
  {
    top: "50%",
    left: "11%",
    rotate: 11,
    scale: 0.88,
  },
  {
    top: "53%",
    left: "42%",
    rotate: -4,
    scale: 0.95,
  },
  {
    top: "47%",
    left: "74%",
    rotate: -15,
    scale: 0.91,
  },
  {
    top: "71%",
    left: "23%",
    rotate: 17,
    scale: 0.9,
  },
  {
    top: "69%",
    left: "58%",
    rotate: -7,
    scale: 0.93,
  },
];

function getCardWindow(index: number, total: number) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment * 0.9;
  return { start, end };
}

function AnimatedReviewCard({
  review,
  index,
  total,
  layout,
  scrollYProgress,
}: {
  review: ReviewCardData;
  index: number;
  total: number;
  layout: CardLayout;
  scrollYProgress: any;
}) {
  const { start, end } = getCardWindow(index, total);

  const x = useTransform(scrollYProgress, [start, end], [layout.fromX, 0], {
    clamp: true,
  });

  const y = useTransform(scrollYProgress, [start, end], [layout.fromY, 0], {
    clamp: true,
  });

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [layout.fromScale, 1],
    { clamp: true }
  );

  const rotate = useTransform(scrollYProgress, [start, end], [layout.rotate, 0], {
    clamp: true,
  });

  const blur = useTransform(scrollYProgress, [start, end], [1.5, 0], {
    clamp: true,
  });

  const opacity = useTransform(
    scrollYProgress,
    [start, start + (end - start) * 0.45],
    [1, 0.5],
    { clamp: true }
  );

  const filter = useTransform(blur, (value: number) => `blur(${value}px)`);

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        filter,
        top: layout.top,
        left: layout.left,
      }}
      className="absolute z-20 will-change-transform"
    >
      <ReviewCard data={review} />
    </motion.div>
  );
}

export function ReviewReveal({ reviews }: ReviewRevealProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const activeReviews = useMemo(() => reviews.slice(0, 5), [reviews]);

  const backgroundReviews = useMemo(() => {
    const base = reviews.slice(0, 5);
    return [...base, ...base].slice(0, 10);
  }, [reviews]);

  return (
    <section ref={sectionRef} className="relative h-[350vh] w-full">
      <div className="sticky top-0 h-screen overflow-x-hidden overflow-y-visible bg-white">
        <div className="relative mx-auto h-screen w-screen max-w-7xl overflow-clip px-6 lg:px-8">
          {backgroundReviews.map((review, index) => {
            const layout = BACKGROUND_CARD_LAYOUTS[index];

            return (
              <div
                key={`bg-${review.tag}-${index}`}
                className="absolute z-10 pointer-events-none"
                style={{
                  top: layout.top,
                  left: layout.left,
                  transform: `rotate(${layout.rotate}deg) scale(${layout.scale})`,
                  opacity: 0.14,
                  filter: "blur(1.5px)",
                }}
              >
                <ReviewCard data={review} />
              </div>
            );
          })}

          {activeReviews.map((review, index) => (
            <AnimatedReviewCard
              key={`active-${review.tag}-${index}`}
              review={review}
              index={index}
              total={activeReviews.length}
              layout={ACTIVE_CARD_LAYOUTS[index % ACTIVE_CARD_LAYOUTS.length]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}