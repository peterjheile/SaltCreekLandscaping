"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  content?: React.ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollItem[];
  contentClassName?: string;
};

export const StickyScroll = ({
  content,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useMemo(
    () => content.map(() => React.createRef<HTMLDivElement>()),
    [content]
  );

  const backgroundColors = ["#ffffff", "#f8f8f7", "#f1f5f9"];
  const linearGradients = [
    "linear-gradient(to bottom right, #dbeafe, #bfdbfe)",
    "linear-gradient(to bottom right, #e2e8f0, #cbd5e1)",
    "linear-gradient(to bottom right, #dcfce7, #bbf7d0)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.innerHeight * 0.5;
      let currentActive = 0;

      itemRefs.forEach((ref, index) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= triggerLine) {
          currentActive = index;
        }
      });

      setActiveCard(currentActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [itemRefs]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  const activeItem = content[activeCard];

  return (
    <motion.section
      ref={sectionRef}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative mx-auto flex min-h-[180vh] w-full max-w-7xl gap-10 rounded-3xl px-6 py-20 lg:px-8"
    >
      <div className="flex-1 py-8">
        <div className="mx-auto max-w-2xl">
          {content.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              ref={itemRefs[index]}
              className={cn("mt-32", index !== content.length - 1 && "mb-32")}
            >
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-3xl font-bold text-slate-900 md:text-4xl"
              >
                {item.title}
              </motion.h2>

              <motion.p
                  animate={{ opacity: activeCard === index ? 1 : 0.45 }}
                  className="mt-6 max-w-xl text-base leading-8 text-slate-700 md:text-lg"
                >
                  {item.description}
                </motion.p>

                {item.ctaText && item.ctaLink && (
                  <motion.a
                    href={item.ctaLink}
                    animate={{ opacity: activeCard === index ? 1 : 0.4 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    {item.ctaText}
                  </motion.a>
                )}
            </div>
          ))}

          <div className="h-16" />
        </div>
      </div>

      <div className="relative hidden w-[30rem] shrink-0 lg:block">
        <motion.div
          style={{ background: backgroundGradient }}
          className={cn(
            "sticky top-[calc(50vh-16rem)] h-[32rem] overflow-hidden rounded-2xl",
            contentClassName
          )}
        >
          {activeItem?.content ? (
            activeItem.content
          ) : (
            <AnimatePresence>
              {activeItem?.image ? (
                <motion.img
                  key={activeItem.image}
                  src={activeItem.image}
                  alt={activeItem.imageAlt ?? activeItem.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};