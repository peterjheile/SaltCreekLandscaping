"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useMemo(
    () => content.map(() => React.createRef<HTMLDivElement>()),
    [content]
  );

  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
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

        // Activate when the TOP of the item reaches halfway up the viewport
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
              className={cn(
                "mt-32",
                index !== content.length - 1 && "mb-32"
              )}
            >
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-slate-100 md:text-4xl"
              >
                {item.title}
              </motion.h2>

              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg"
              >
                {item.description}
              </motion.p>
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
          {content[activeCard]?.content ?? null}
        </motion.div>
      </div>
    </motion.section>
  );
};