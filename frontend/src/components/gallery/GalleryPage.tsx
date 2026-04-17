"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type {
  GalleryHeroContent,
  GalleryPhoto,
} from "@/features/marketing/gallery/types";

import { useQuoteRequestModal } from "@/features/quote-request/QuoteRequestModalProvider";

type GalleryImageWithAspect = GalleryPhoto & {
  stableAspect: string;
  stableIndex: number;
};

type GalleryPageProps = {
  images: GalleryPhoto[];
  heroContent: GalleryHeroContent | null;
};

const ASPECT_RATIOS = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[16/9]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[3/2]",
  "aspect-[2/3]",
  "aspect-[4/3]",
];

function getStableAspect(index: number) {
  return ASPECT_RATIOS[index % ASPECT_RATIOS.length];
}

function estimateAspectHeight(aspectClass: string) {
  switch (aspectClass) {
    case "aspect-[16/9]":
      return 0.5625;
    case "aspect-[3/2]":
      return 0.6667;
    case "aspect-[4/3]":
      return 0.75;
    case "aspect-[1/1]":
      return 1;
    case "aspect-[3/4]":
      return 1.3333;
    case "aspect-[2/3]":
      return 1.5;
    default:
      return 1;
  }
}

function splitIntoBalancedColumns(
  items: GalleryImageWithAspect[],
  count: number
): GalleryImageWithAspect[][] {
  const cols: GalleryImageWithAspect[][] = Array.from(
    { length: count },
    () => []
  );
  const heights = new Array(count).fill(0);

  for (const item of items) {
    const shortestColumnIndex = heights.indexOf(Math.min(...heights));
    cols[shortestColumnIndex].push(item);
    heights[shortestColumnIndex] += estimateAspectHeight(item.stableAspect);
  }

  return cols;
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(10, 18, 12, 0.94)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:left-8"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 md:right-8"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative mx-16 flex max-h-[82vh] max-w-5xl flex-col md:mx-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-[70vh] w-full overflow-hidden rounded-2xl">
          <img
            src={image.imageUrl ?? ""}
            alt={image.title}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="mt-4 px-1"
        >
          <p className="text-base font-semibold text-white">{image.title}</p>
          {image.description && (
            <p className="mt-1 text-sm leading-6 text-white/60">
              {image.description}
            </p>
          )}
          <p className="mt-2 text-xs text-white/30">
            {index + 1} / {images.length} · Press ← → to navigate, Esc to close
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImageWithAspect;
  index: number;
  onClick: () => void;
}) {
  const aspect = image.stableAspect;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      onClick={onClick}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <img
          src={image.imageUrl ?? "/lawn.png"}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to top,
              color-mix(in srgb, var(--color-primary) 85%, black) 0%,
              color-mix(in srgb, var(--color-primary) 40%, transparent) 50%,
              transparent 100%)`,
          }}
        />

        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-semibold leading-tight text-white">
            {image.title}
          </p>
          {image.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/75">
              {image.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function GalleryHero({
  count,
  heroContent,
}: {
  count: number;
  heroContent: GalleryHeroContent | null;
}) {
  const eyebrow = heroContent?.eyebrow || "Our work";
  const title = heroContent?.title || "Photo gallery";
  const subtitle =
    heroContent?.subtitle ||
    "Real results from real properties. Browse our work and see the Salt Creek difference for yourself.";
  const heroImageUrl = heroContent?.heroImageUrl || "/lawn.png";

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-highlight"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-left text-4xl font-bold tracking-tight text-text-inverse md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-2xl text-left text-sm leading-7 text-text-inverse/80 sm:text-base"
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-sm font-medium text-text-inverse/60"
          >
            {count} {count === 1 ? "photo" : "photos"}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function GalleryPage({
  images,
  heroContent,
}: GalleryPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { openQuoteRequestModal } = useQuoteRequestModal();

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const imagesWithAspect = useMemo<GalleryImageWithAspect[]>(
    () =>
      images.map((image, index) => ({
        ...image,
        stableAspect: getStableAspect(index),
        stableIndex: index,
      })),
    [images]
  );

  const cols = useMemo(
    () => splitIntoBalancedColumns(imagesWithAspect, columns),
    [imagesWithAspect, columns]
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <GalleryHero count={images.length} heroContent={heroContent} />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="h-[3px] w-full bg-white" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {images.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-text/50">No photos yet — check back soon.</p>
          </div>
        ) : (
          <div className="flex gap-4 lg:gap-5">
            {cols.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-1 flex-col gap-4 lg:gap-5">
                {col.map((image) => (
                  <GalleryCard
                    key={image.id}
                    image={image}
                    index={image.stableIndex}
                    onClick={() => openLightbox(image.stableIndex)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-16 rounded-[1.75rem] border border-primary/15 bg-[color:color-mix(in_srgb,var(--color-primary)_6%,white)] px-8 py-10 text-center"
          >
            <p className="text-xl font-semibold text-primary">
              Like what you see?
            </p>

            <p className="mt-2 text-sm text-text/70">
              Get a free quote and let&apos;s make your property look this good.
            </p>

            <a
              className="mt-6 hover:cursor-pointer inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90"
              onClick = {() => openQuoteRequestModal()}
            >
              <p>Book a Free Quote</p>
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
        )}
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}