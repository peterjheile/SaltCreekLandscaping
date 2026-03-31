"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-green-300/95"
          >
            Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] sm:text-5xl"
          >
            Reliable outdoor services that keep your property looking its best
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl text-base leading-8 text-[#f4efe6]/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.25)] sm:text-[1.05rem]"
          >
            From routine lawn care to seasonal cleanups, each service is
            designed to deliver consistent results, clean finishes, and a
            property you can feel confident about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8"
          >
            <a
              href="#services-accordion"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/8 px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm transition hover:border-white/35 hover:bg-white/14"
            >
              Book Service
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}