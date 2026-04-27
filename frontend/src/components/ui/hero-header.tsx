"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiPhone,
  FiStar,
  FiMaximize2,
  FiX,
  FiPlay,
  FiCheckCircle,
} from "react-icons/fi";

import type { HomePageHeroContent } from "@/features/marketing/home/types";
import { useSiteSettings } from "@/features/core/providers";
import { useQuoteRequestModal } from "@/features/quote-request/useQuoteRequestModel";

type HeroHeaderProps = {
  heroContent: HomePageHeroContent;
};

function BookServiceButton() {
  const { openQuoteRequestModal } = useQuoteRequestModal();

  return (
    <button
      type="button"
      onClick={() => openQuoteRequestModal()}
      className="inline-flex transform-gpu hover:-translate-y-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition hover:cursor-pointer hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)]"
      style={{
        background: "var(--color-text-inverse)",
        color: "var(--color-text)",
      }}
    >
      Get a Free Quote
      <FiArrowRight
        className="h-4 w-4 translate-y-[1px]"
        style={{ color: "var(--color-text)" }}
      />
    </button>
  );
}

export default function HeroHeader({ heroContent }: HeroHeaderProps) {
  const siteSettings = useSiteSettings();

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const hasVideo = Boolean(heroContent.videoUrl);
  const phone = siteSettings.phone || "+10000000000";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!heroContent.imageUrl) {
      setHeroImageLoaded(false);
      return;
    }

    const img = new Image();
    img.src = heroContent.imageUrl;

    img.onload = () => {
      setHeroImageLoaded(true);
    };

    img.onerror = () => {
      setHeroImageLoaded(false);
    };
  }, [heroContent.imageUrl]);

  useEffect(() => {
    if (!isVideoOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVideoOpen]);

  const formattedPhone = phone.replace(/\D/g, "");
  const displayPhone = phone
    .replace(/^\+1/, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  return (
    <section
      aria-label="Hero — Salt Creek Landscaping"
      className="relative overflow-hidden font-inter"
    >
    {heroContent.imageUrl && heroImageLoaded ? (
      <>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ backgroundImage: `url('${heroContent.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </>
    ) : null}

      <div
        className={`relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-28 ${
          hasVideo ? "" : "max-w-5xl"
        }`}
      >
        <div
          className={`grid items-center gap-12 ${
            hasVideo
              ? "lg:grid-cols-[1.08fr_0.92fr] xl:grid-cols-[1.04fr_0.96fr]"
              : "grid-cols-1"
          }`}
        >
          {/* ── Left column ── */}
          <div className={hasVideo ? "max-w-3xl" : "max-w-4xl"}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em]"
              style={{ color: "var(--color-highlight)" }}
            >
              {heroContent.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-[var(--color-text-inverse)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.16)] sm:text-6xl lg:text-7xl"
            >
              {heroContent.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-7 max-w-2xl text-base leading-8 text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.22)] sm:text-lg"
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <BookServiceButton />

              <a
                href={`tel:+1${formattedPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium text-[var(--color-text-inverse)] backdrop-blur-sm transition hover:bg-white/14"
                style={{
                  borderColor: "rgba(255,255,255,0.28)",
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                <FiPhone
                  className="h-4 w-4"
                  style={{ color: "var(--color-highlight)" }}
                />
                {displayPhone || "Call Now"}
              </a>
            </motion.div>

            {/* Mobile expect list */}
            {hasVideo && (
              <motion.ul className="mt-8 flex flex-col gap-2 lg:hidden">
                {heroContent.expectItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <FiCheckCircle
                      className="h-4 w-4 shrink-0"
                      style={{ color: "var(--color-highlight)" }}
                    />
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* ── Right column ── */}
          {hasVideo && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="relative hidden lg:block"
            >
              <div
                className="rounded-[2rem] border p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <div className="flex flex-col gap-5">
                  {/* Video thumbnail */}
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    aria-label="Open video preview"
                    className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border text-left transition hover:brightness-110"
                    style={{
                      borderColor: "rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.75rem]">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={heroContent.videoUrl ?? ""}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        title="Salt Creek Landscaping preview"
                      />
                      <div className="absolute inset-0 bg-black/28" />

                      <div className="absolute inset-0 p-4 xl:p-5 2xl:p-6">
                        <div
                          className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm xl:text-xs"
                          style={{
                            borderColor: "rgba(255,255,255,0.16)",
                            background: "rgba(74,74,74,0.48)",
                          }}
                        >
                          <FiStar
                            className="h-3.5 w-3.5"
                            style={{ color: "var(--color-highlight)" }}
                          />
                          Trusted property care
                        </div>

                        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between xl:inset-x-5 xl:bottom-5 2xl:inset-x-6 2xl:bottom-6">
                          <span
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium text-white/88 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)] xl:text-xs"
                            style={{
                              borderColor: "rgba(255,255,255,0.14)",
                              background: "rgba(74,74,74,0.48)",
                            }}
                          >
                            <span
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ease-out hover:scale-110"
                              style={{ background: "rgba(255,255,255,0.14)" }}
                            >
                              <FiPlay
                                className="ml-0.5 h-4 w-4"
                                style={{ color: "var(--color-highlight)" }}
                              />
                            </span>
                            Watch Preview
                          </span>

                          <span
                            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-white/82 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
                            style={{
                              borderColor: "rgba(255,255,255,0.14)",
                              background: "rgba(74,74,74,0.48)",
                            }}
                          >
                            <FiMaximize2
                              className="h-4 w-4"
                              style={{ color: "var(--color-highlight)" }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expect card */}
                  <div
                    className="rounded-[1.5rem] border p-5 backdrop-blur-sm"
                    style={{
                      background: "rgba(255,255,255,0.14)",
                      borderColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-inverse)] xl:text-sm">
                      What you can expect
                    </p>
                    <div className="mt-4 space-y-3">
                      {heroContent.expectItems.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm text-white/92 xl:text-base"
                          style={{
                            background: "rgba(255,255,255,0.18)",
                            borderColor: "rgba(255,255,255,0.10)",
                          }}
                        >
                          <FiCheckCircle
                            className="h-4 w-4 shrink-0"
                            style={{ color: "var(--color-highlight)" }}
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full blur-2xl"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-highlight) 25%, transparent)",
                }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isMounted &&
        hasVideo &&
        createPortal(
          <AnimatePresence>
            {isVideoOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
                onClick={() => setIsVideoOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Video preview"
              >
                <div className="flex h-full items-center justify-center px-4 py-10 sm:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border shadow-[0_30px_120px_rgba(0,0,0,0.50)]"
                    style={{
                      borderColor: "rgba(255,255,255,0.16)",
                      background:
                        "color-mix(in srgb, var(--color-primary) 85%, black)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setIsVideoOpen(false)}
                      className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-white/88 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
                      style={{
                        borderColor: "rgba(255,255,255,0.14)",
                        background: "rgba(74,74,74,0.48)",
                      }}
                      aria-label="Close video preview"
                    >
                      <FiX
                        className="h-4 w-4"
                        style={{ color: "var(--color-highlight)" }}
                      />
                    </button>

                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={heroContent.videoUrl ?? ""}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        title="Salt Creek Landscaping full preview"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/10" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}