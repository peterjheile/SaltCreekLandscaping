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
        if (rect.top <= triggerLine) {
          current = index;
        }
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

  if (!content.length) {
    return null;
  }

  const activeItem = content[activeCard] ?? content[0];

  return (
    <section className="relative w-full bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-[84rem]">
        <div className="mb-16 md:text-center lg:text-left">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.26em]"
            style={{ color: "var(--color-secondary)" }}
          >
            About Us
          </p>
          <h2
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl"
            style={{ color: "var(--color-primary)" }}
          >
            Why Salt Creek?
          </h2>
        </div>

        <div className="flex gap-16 lg:gap-20">
          <div className="min-w-0 flex-[1.15] lg:pt-16">
            {content.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                ref={itemRefs[index]}
                className={cn(
                  "transition-opacity duration-500 md:flex md:flex-col md:items-center lg:block",
                  "lg:min-h-[26rem]",
                  index !== 0 && "mt-16 lg:mt-40",
                  index !== content.length - 1 && "mb-16 lg:mb-40"
                )}
              >
                <div className="w-full md:max-w-2xl lg:max-w-none">
                  <motion.p
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                      x: activeCard === index ? 0 : -6,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-3 text-sm font-semibold tabular-nums"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.p>

                  <motion.h3
                    animate={{
                      opacity: activeCard === index ? 1 : 0.28,
                      x: activeCard === index ? 0 : -4,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold leading-snug tracking-tight md:text-3xl"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg"
                  >
                    {item.description}
                  </motion.p>

                  {item.ctaText && item.ctaLink && (
                    <motion.a
                      href={item.ctaLink}
                      animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                      transition={{ duration: 0.25 }}
                      className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
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
            ))}

            <div className="h-24" />
          </div>

          <div className="relative hidden w-[42rem] shrink-0 lg:block">
            <div className="sticky top-[calc(50vh-18rem)]">
              <motion.div
                animate={{ background: panelGradient }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "relative h-[36rem] overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.10)]",
                  contentClassName
                )}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-20 blur-3xl"
                  style={{ background: "var(--color-primary)" }}
                />
                <div
                  className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-15 blur-3xl"
                  style={{ background: "var(--color-secondary)" }}
                />

                <AnimatePresence mode="wait">
                  {activeItem.image ? (
                    <motion.img
                      key={activeItem.image}
                      src={activeItem.image}
                      alt={activeItem.imageAlt || activeItem.title}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="flex h-full items-center justify-center p-12"
                    >
                      <p
                        className="text-center text-4xl font-bold leading-tight tracking-tight"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {activeItem.title}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                  {content.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: activeCard === i ? 24 : 8,
                        opacity: activeCard === i ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-2 rounded-full"
                      style={{ background: "var(--color-primary)" }}
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