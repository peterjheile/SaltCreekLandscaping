"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiPhone, FiStar } from "react-icons/fi";

export default function HeroHeader() {
  return (
    <section className="relative isolate overflow-hidden">


      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-18 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-green-300/95"
            >
              Cedar Creek Landscaping
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.16)] sm:text-6xl lg:text-7xl"
            >
              Dependable lawn care with a clean, professional finish.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.10 }}
              className="mt-7 max-w-2xl text-base leading-8 text-[#f4efe6]/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.22)] sm:text-lg"
            >
              From routine mowing to seasonal cleanup and property refreshes, we
              help homeowners keep their outdoor spaces neat, healthy, and
              consistently well cared for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
              >
                Book a Service
                <FiArrowRight className="h-4 w-4" />
              </a>

              <a
                href="tel:+10000000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/28 bg-white/8 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/14"
              >
                <FiPhone className="h-4 w-4" />
                Call Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-8 flex flex-col gap-3 text-sm text-[#f4efe6]/92 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3"
            >
              <div className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-green-300" />
                Reliable scheduling
              </div>
              <div className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-green-300" />
                Clean, finished look
              </div>
              <div className="inline-flex items-center gap-2">
                <FiCheckCircle className="h-4 w-4 text-green-300" />
                Local and professional
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="hidden lg:block relative"
          >
            <div className="rounded-[2rem] border border-white/18 bg-white/10 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-md">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))]">
                <div className="aspect-[4/5] w-full bg-[linear-gradient(160deg,rgba(43,75,47,0.52)_0%,rgba(110,92,62,0.32)_52%,rgba(255,255,255,0.18)_100%)] p-6 sm:p-7">
                  <div className="flex h-full flex-col justify-between">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                      <FiStar className="h-3.5 w-3.5 text-green-300" />
                      Trusted property care
                    </div>

                    <div className="rounded-[1.5rem] border border-white/15 bg-white/12 p-5 backdrop-blur-sm">
                      <p className="text-sm uppercase tracking-[0.22em] text-white/72">
                        What you can expect
                      </p>

                      <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white/92">
                          Consistent lawn maintenance
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white/92">
                          Sharp edging and cleanup
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white/92">
                          Service that feels reliable
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/8 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}