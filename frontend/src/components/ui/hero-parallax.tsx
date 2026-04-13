"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  AnimatePresence,
} from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryPhoto } from "@/features/marketing/gallery/types";

type HomepageGallerySectionProps = {
  photos: GalleryPhoto[];
};

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>("desktop");

  React.useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      if (window.innerWidth < 768) return "mobile";
      if (window.innerWidth < 1280) return "tablet";
      return "desktop";
    };

    const handler = () => setBp(getBreakpoint());
    handler();

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return bp;
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

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  React.useEffect(() => {
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
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[var(--color-text-inverse)] backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[var(--color-text-inverse)] backdrop-blur-sm transition hover:bg-white/20 md:left-8"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[var(--color-text-inverse)] backdrop-blur-sm transition hover:bg-white/20 md:right-8"
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
          <p className="text-base font-semibold text-[var(--color-text-inverse)]">
            {image.title}
          </p>
          <p className="mt-2 text-xs text-white/30">
            {index + 1} / {images.length} · Press ← → to navigate, Esc to close
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HomepageGallerySection({
  photos,
}: HomepageGallerySectionProps) {
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  const cardsPerRow = isMobile ? 5 : isTablet ? 7 : 9;
  const targetCount = cardsPerRow * 3;

  const originalPhotos = React.useMemo(
    () => photos.filter((p) => Boolean(p.imageUrl)),
    [photos]
  );

  const filledPhotos = React.useMemo(() => {
    if (!originalPhotos.length) return [];

    const out: GalleryPhoto[] = [];
    let i = 0;

    while (out.length < targetCount) {
      const photo = originalPhotos[i % originalPhotos.length];
      out.push({
        ...photo,
        id: `${photo.id}-${out.length}`,
      });
      i++;
    }

    return out;
  }, [originalPhotos, targetCount]);

  const [firstRow, secondRow, thirdRow] = React.useMemo(() => {
    const n = cardsPerRow;
    return [
      filledPhotos.slice(0, n),
      filledPhotos.slice(n, n * 2),
      filledPhotos.slice(n * 2, n * 3),
    ];
  }, [filledPhotos, cardsPerRow]);

  const sectionRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const spring = { stiffness: 95, damping: 30, bounce: 0 };

  const fwdRange: [number, number] = isMobile
    ? [-14, 150]
    : isTablet
    ? [-56, 310]
    : [-90, 500];

  const revRange: [number, number] = isMobile
    ? [0, -58]
    : isTablet
    ? [0, -220]
    : [0, -390];

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], fwdRange),
    spring
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], revRange),
    spring
  );

  const rotateXFrom = isMobile ? 16 : isTablet ? 22 : 42;
  const rotateZFrom = isMobile ? -8 : isTablet ? -12 : -18;

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [rotateXFrom, 0]),
    spring
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [rotateZFrom, 0]),
    spring
  );

  const translateYStart = isMobile ? -82 : isTablet ? -180 : -235;
  const translateYEnd = isMobile ? 36 : isTablet ? 96 : 138;

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [translateYStart, translateYEnd]),
    spring
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.12], [isMobile ? 0.7 : 0.52, 1]),
    spring
  );

  const innerRef = React.useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!innerRef.current) return;
    const el = innerRef.current;

    const measure = () => {
      const h = el.getBoundingClientRect().height;
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;

      const ultraShortWide =
        !isMobile && viewportW >= 1750 && viewportH <= 760;

      const wideDesktop =
        !isMobile && !ultraShortWide && viewportW >= 1500;

      if (ultraShortWide) {
        setSectionHeight(Math.ceil(h + 720));
        return;
      }

      const extraOffset = isMobile
        ? translateYEnd * 0.9
        : isTablet
        ? translateYEnd * 0.82
        : wideDesktop
        ? translateYEnd * 0.9
        : translateYEnd * 0.82;

      const startAllowance = isMobile
        ? Math.abs(translateYStart) * 0.1
        : isTablet
        ? Math.abs(translateYStart) * 0.12
        : wideDesktop
        ? Math.abs(translateYStart) * 0.14
        : Math.abs(translateYStart) * 0.13;

      const buffer = isMobile ? 24 : isTablet ? 34 : wideDesktop ? 52 : 44;

      const naturalHeight = h + extraOffset + startAllowance + buffer;

      const minHeightFromViewport = isMobile
        ? viewportH * 0.5
        : isTablet
        ? viewportH * 0.6
        : wideDesktop
        ? viewportH * 0.72
        : viewportH * 0.66;

      setSectionHeight(
        Math.ceil(Math.max(naturalHeight, minHeightFromViewport))
      );
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [translateYEnd, translateYStart, isMobile, isTablet, filledPhotos.length]);

  const fallback = isMobile ? 430 : isTablet ? 620 : 860;

  const innerStyle: React.CSSProperties = {
    position: "relative",
    left: isMobile ? "-10%" : isTablet ? "-15%" : "-20%",
    width: isMobile ? "135%" : isTablet ? "148%" : "160%",
    transformOrigin: "center center",
  };

  const gap = isMobile ? "gap-3" : isTablet ? "gap-4" : "gap-5 xl:gap-6";

  const row2cls = isMobile
    ? "mb-3 ml-4 flex flex-row"
    : isTablet
    ? "mb-4 ml-8 flex flex-row"
    : "mb-5 ml-10 flex flex-row xl:ml-14";

  const row3cls = isMobile
    ? "ml-2 flex flex-row-reverse"
    : isTablet
    ? "ml-6 flex flex-row-reverse"
    : "ml-8 flex flex-row-reverse xl:ml-10";

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const openLightbox = React.useCallback(
    (photo: GalleryPhoto) => {
      const originalId = String(photo.id).split("-")[0];
      const idx = originalPhotos.findIndex(
        (p) => String(p.id) === originalId
      );
      if (idx !== -1) setLightboxIndex(idx);
    },
    [originalPhotos]
  );

  const closeLightbox = React.useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = React.useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? 0 : (i + 1) % originalPhotos.length
    );
  }, [originalPhotos.length]);

  const goPrev = React.useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + originalPhotos.length) % originalPhotos.length
    );
  }, [originalPhotos.length]);

  if (!originalPhotos.length) return null;

  return (
    <>
      <div
        ref={sectionRef}
        style={{ height: sectionHeight ?? fallback }}
        className="relative w-full overflow-x-clip [perspective:900px] [transform-style:preserve-3d]"
      >
        <motion.div
          style={{ ...innerStyle, rotateX, rotateZ, translateY, opacity }}
        >
          <div ref={innerRef}>
            <motion.div className={`mb-3 flex flex-row-reverse ${gap}`}>
              {firstRow.map((photo, i) => (
                <PhotoCard
                  key={`r1-${photo.id}-${i}`}
                  photo={photo}
                  translate={translateX}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </motion.div>

            <motion.div className={`${row2cls} ${gap}`}>
              {secondRow.map((photo, i) => (
                <PhotoCard
                  key={`r2-${photo.id}-${i}`}
                  photo={photo}
                  translate={translateXReverse}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </motion.div>

            <motion.div className={`${row3cls} ${gap}`}>
              {thirdRow.map((photo, i) => (
                <PhotoCard
                  key={`r3-${photo.id}-${i}`}
                  photo={photo}
                  translate={translateX}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  onClick={() => openLightbox(photo)}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && originalPhotos.length > 0 && (
          <Lightbox
            images={originalPhotos}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function PhotoCard({
  photo,
  translate,
  isMobile,
  isTablet,
  onClick,
}: {
  photo: GalleryPhoto;
  translate: MotionValue<number>;
  isMobile: boolean;
  isTablet: boolean;
  onClick: () => void;
}) {
  const width = isMobile
    ? "clamp(8.5rem, 30vw, 11rem)"
    : isTablet
    ? "clamp(11rem, 20vw, 16rem)"
    : "clamp(15rem, 18vw, 24rem)";

  const height = isMobile
    ? "clamp(5.75rem, 18vw, 7.5rem)"
    : isTablet
    ? "clamp(7.5rem, 13vw, 10.5rem)"
    : "clamp(10rem, 14vw, 15.5rem)";

  return (
    <motion.button
      type="button"
      style={{ x: translate, width, height }}
      whileHover={
        isMobile
          ? undefined
          : { y: -8, scale: 1.015, transition: { duration: 0.18 } }
      }
      onClick={onClick}
      className="
        group relative shrink-0 overflow-hidden
        rounded-[1rem] md:rounded-[1.25rem] lg:rounded-[1.5rem]
        shadow-[0_16px_40px_rgba(0,0,0,0.22)]
        lg:shadow-[0_22px_56px_rgba(0,0,0,0.28)]
        will-change-transform
      "
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--color-secondary)" }}
      />

      <img
        src={photo.imageUrl ?? "/lawn.png"}
        alt={photo.title}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to top,
            color-mix(in srgb, var(--color-primary) 85%, black) 0%,
            color-mix(in srgb, var(--color-highlight) 24%, transparent) 50%,
            transparent 100%)`,
        }}
      />

      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[var(--color-text-inverse)] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" />
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:p-4 lg:p-5">
        <p className="text-sm font-semibold leading-tight text-[var(--color-text-inverse)] md:text-base lg:text-lg">
          {photo.title}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/0 transition-all duration-300 group-hover:ring-white/20" />
    </motion.button>
  );
}