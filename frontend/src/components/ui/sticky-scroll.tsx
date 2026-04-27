"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { AboutModule } from "@/features/marketing/home/types";

type StickyScrollProps = {
  content: AboutModule[];
  contentClassName?: string;
};

const PANEL_GRADIENTS = [
  `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 18%, white), color-mix(in srgb, var(--color-primary) 8%, white))`,
  `linear-gradient(135deg, color-mix(in srgb, var(--color-secondary) 18%, white), color-mix(in srgb, var(--color-secondary) 8%, white))`,
  `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 14%, white), color-mix(in srgb, var(--color-secondary) 12%, white))`,
];

const TEXT_REVEAL_TRANSITION = {
  duration: 0.3,
  ease: "easeOut" as const,
};

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);

  const itemRefs = useMemo(
    () => content.map(() => React.createRef<HTMLDivElement>()),
    [content]
  );

  const [panelGradient, setPanelGradient] = useState(PANEL_GRADIENTS[0]);

  useEffect(() => {
    if (!content.length) {
      setActiveCard(0);
      return;
    }

    const handleScroll = () => {
      const triggerLine = window.innerHeight * 0.45;
      let current = 0;

      itemRefs.forEach((ref, index) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) current = index;
      });

      setActiveCard(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [content, itemRefs]);

  useEffect(() => {
    setPanelGradient(PANEL_GRADIENTS[activeCard % PANEL_GRADIENTS.length]);
  }, [activeCard]);

  if (!content.length) return null;

  const activeItem = content[activeCard] ?? content[0];

  return (
    <section className="relative w-full bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-20 md:flex md:flex-col md:items-center lg:block">
          <div className="w-full md:max-w-2xl lg:max-w-none">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-highlight">
              About Us
            </p>

            <h2
              className="text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl"
              style={{ color: "var(--color-primary)" }}
            >
              Why{" "}
              <span className="relative inline-block">
                Salt Creek
                <span
                  className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full blur-[0.2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-highlight) 0%, color-mix(in srgb, var(--color-highlight) 88%, transparent) 58%, color-mix(in srgb, var(--color-highlight) 62%, transparent) 82%, color-mix(in srgb, var(--color-highlight) 28%, transparent) 100%)",
                  }}
                />
              </span>
              ?
            </h2>
          </div>
        </div>

        <div className="flex gap-16 lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="min-w-0 flex-[1.15] lg:pt-16">
            {content.map((item, index) => {
              const isActive = activeCard === index;

              const revealAnimation = {
                opacity: isActive ? 1 : 0.28,
                x: isActive ? 0 : -10,
              };

              return (
                <div
                  key={`${item.title}-${index}`}
                  ref={itemRefs[index]}
                  className={cn(
                    "transition-opacity duration-500 md:flex md:flex-col md:items-center lg:block",
                    "lg:min-h-[21rem]",
                    index !== 0 && "mt-16 lg:mt-32",
                    index !== content.length - 1 && "mb-16 lg:mb-32"
                  )}
                >
                  <div className="w-full md:max-w-2xl lg:max-w-none">
                    <motion.p
                      animate={revealAnimation}
                      transition={TEXT_REVEAL_TRANSITION}
                      className="mb-3 text-sm font-semibold tabular-nums text-highlight"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.p>

                    <motion.h3
                      animate={revealAnimation}
                      transition={TEXT_REVEAL_TRANSITION}
                      className="text-2xl font-bold leading-snug tracking-tight md:text-3xl"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.title}
                    </motion.h3>

                    <motion.p
                      animate={revealAnimation}
                      transition={TEXT_REVEAL_TRANSITION}
                      className="mt-5 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg"
                    >
                      {item.description}
                    </motion.p>

                    {item.ctaText && item.ctaLink && (
                      <motion.a
                        href={item.ctaLink}
                        animate={revealAnimation}
                        transition={TEXT_REVEAL_TRANSITION}
                        className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                        style={{ background: "var(--color-primary)" }}
                      >
                        {item.ctaText}

                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.a>
                    )}
                  </div>

                  {item.image && (
                    <div className="mt-6 w-full md:mt-8 md:max-w-2xl lg:hidden">
                      <div className="overflow-hidden rounded-2xl">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          className="h-[20rem] w-full object-cover sm:h-[22rem] md:h-[24rem]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="h-24" />
          </div>

          {/* RIGHT IMAGE PANEL */}
          <div className="relative hidden -mt-8 w-[clamp(28rem,38vw,42rem)] shrink-0 lg:block">
            <div className="sticky top-[calc(50vh-18rem)]">
              <motion.div
                animate={{ background: panelGradient }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "relative h-[clamp(24rem,34vw,36rem)] overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.10)]",
                  contentClassName
                )}
              >
                <AnimatePresence mode="wait">
                  {activeItem.image ? (
                    <motion.img
                      key={activeItem.image}
                      src={activeItem.image}
                      alt={activeItem.imageAlt || activeItem.title}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <motion.div className="flex h-full items-center justify-center p-12">
                      <p
                        className="text-center text-4xl font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {activeItem.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* DOTS */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  {content.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: activeCard === i ? 18 : 6,
                      }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "h-1.5 rounded-full",
                        activeCard === i ? "bg-primary" : "bg-primary/30"
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};