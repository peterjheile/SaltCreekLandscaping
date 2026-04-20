"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, CheckCircle2, Clock3, MapPin } from "lucide-react";


import type {
  FAQHeroContent,
  FAQCategoryData
} from "@/features/marketing/faqs/types";

type FAQ = {
  id: string | number;
  question: string;
  answer: string;
};

type FAQsAllProps = {
  categories: FAQCategoryData[];
  heroContent: FAQHeroContent | null;
};

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="border-b border-primary/10 last:border-b-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-primary">
          {faq.question}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className={`mt-0.5 rounded-full p-1 ${
            open ? "bg-primary" : "bg-primary/8"
          }`}
        >
          <Plus
            className={`h-4 w-4 ${
              open ? "text-text-inverse" : "text-primary"
            }`}
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text/70 whitespace-pre-line">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HeroStatItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-text-inverse/80">
      <span className="text-highlight">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function FAQsAll({
  categories,
  heroContent,
}: FAQsAllProps) {
  const totalFAQs = useMemo(() => {
    return categories.reduce((sum, c) => sum + c.items.length, 0);
  }, [categories]);

  // ✅ backend-driven hero content
  const eyebrow = heroContent?.eyebrow || "Got questions?";
  const title =
    heroContent?.title || "Frequently asked questions";
  const subtitle =
    heroContent?.subtitle ||
    `${totalFAQs} answers to the things we hear most often.`;
  const heroImageUrl =
    heroContent?.heroImageUrl || "/lawn.png";

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)]">

            <div className="max-w-3xl">
              <motion.p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-highlight">
                {eyebrow}
              </motion.p>

              <motion.h1 className="text-left text-4xl font-bold text-text-inverse md:text-5xl lg:text-6xl">
                {title}
              </motion.h1>

              <motion.p className="mt-5 text-sm text-text-inverse/80">
                {subtitle}
              </motion.p>
            </div>

            <motion.div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-5xl font-bold text-text-inverse">
                {totalFAQs}
              </p>
              <p className="mt-2 text-sm text-text-inverse/85">
                Common questions answered
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <HeroStatItem
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  text="Free estimates available"
                />
                <HeroStatItem
                  icon={<Clock3 className="h-4 w-4" />}
                  text="Fast responses"
                />
                <HeroStatItem
                  icon={<MapPin className="h-4 w-4" />}
                  text="Local, reliable service"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 pt-16">
          {categories.map((category) => (
            <div key={category.id} className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="rounded-full bg-primary px-3 py-1 text-xs text-text-inverse">
                  {category.title}
                </span>
                <div className="h-px flex-1 bg-primary/10" />
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white px-6">
                {category.items.map((faq, index) => (
                  <FAQItem key={faq.id} faq={faq} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>




        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-14 rounded-[1.75rem] border border-primary/15 bg-[color:color-mix(in_srgb,var(--color-primary)_6%,white)] px-8 py-10 text-center"
          >
            <p className="text-xl font-semibold text-primary">
              Have a different question?
            </p>

            <p className="mt-2 text-sm text-text/70">
              We’ll reach out within one business day to help with any questions.
            </p>

            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90"
            >
              Ask a Question
              <svg
                className="h-4 w-4"
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
          </motion.div>
        </div>






        
      </section>
      



    </main>
  );
}