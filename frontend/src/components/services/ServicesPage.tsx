"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ServiceCategory } from "@/features/services/types";
import type { ServiceHeroContent } from "@/features/marketing/services/types";
import { ServiceIcon } from "@/features/services/icons";

type ServicesHeroProps = {
  heroContent: ServiceHeroContent | null;
};

function ServicesHero({ heroContent }: ServicesHeroProps) {
  const eyebrow = heroContent?.eyebrow || "Services";
  const title =
    heroContent?.title || "Reliable outdoor services, consistent results";
  const subtitle =
    heroContent?.subtitle ||
    "From routine lawn care to seasonal cleanups, every service is designed to deliver clean finishes and a property you can feel confident about.";
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-highlight"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-left text-4xl font-bold leading-[1.08] tracking-tight text-text-inverse sm:text-5xl lg:text-6xl"
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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-text transition hover:opacity-90"
            >
              Book a service
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
            <button
              onClick={() => {
                const el = document.getElementById("services-list");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-text-inverse backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
            >
              Browse services
              <ChevronDown className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({
  service,
  index,
}: {
  service: ServiceCategory;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.48, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border bg-white transition-shadow duration-300"
      style={{
        borderColor: open
          ? "color-mix(in srgb, var(--color-primary) 25%, transparent)"
          : "color-mix(in srgb, var(--color-primary) 10%, transparent)",
        boxShadow: open
          ? "0 8px 32px color-mix(in srgb, var(--color-primary) 8%, transparent)"
          : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors sm:px-7 sm:py-6"
        style={{
          background: open
            ? "color-mix(in srgb, var(--color-primary) 4%, white)"
            : "white",
        }}
      >
        <div
          className="mt-0.5 shrink-0 rounded-2xl p-3 transition-colors duration-300"
          style={{
            background: open
              ? "color-mix(in srgb, var(--color-primary) 14%, transparent)"
              : "color-mix(in srgb, var(--color-primary) 8%, transparent)",
          }}
        >
          <ServiceIcon iconName={service.iconName} className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1 pr-2">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
            {service.eyebrow}
          </p>

          <h3 className="text-xl font-bold leading-[1.15] tracking-tight text-primary sm:text-2xl">
            {service.title}
          </h3>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-text/70 sm:text-base">
            {service.shortDescription}
          </p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-1 shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-text/45" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="border-t px-6 pb-6 pt-5 sm:px-7 sm:pb-6 sm:pt-5"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-primary) 8%, transparent)",
              }}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                    About this service
                  </p>

                  <p className="max-w-3xl text-sm leading-7 text-text/75 sm:text-base">
                    {service.longDescription}
                  </p>

                  <div className="mt-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text-inverse transition hover:opacity-90"
                    >
                      Book this service
                      <svg
                        className="h-3.5 w-3.5"
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
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                    May include
                  </p>

                  {service.includedItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {service.includedItems.map((item) => (
                        <span
                          key={item.id}
                          className="rounded-full border px-3 py-1.5 text-sm font-medium leading-none"
                          style={{
                            borderColor:
                              "color-mix(in srgb, var(--color-primary) 22%, transparent)",
                            background:
                              "color-mix(in srgb, var(--color-primary) 6%, transparent)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 text-text/70">
                      Service details vary based on your property and needs.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type ServicesPageProps = {
  services: ServiceCategory[];
  heroContent: ServiceHeroContent | null;
};

export default function ServicesPage({
  services,
  heroContent,
}: ServicesPageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <ServicesHero heroContent={heroContent} />

      <section className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="h-[3px] w-full bg-white" />
        </div>
      </section>

      <section id="services-list" className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-10"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-highlight">
              What we offer
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Our services
            </h2>
          </motion.div>

          <div className="mb-10 flex flex-col gap-4">
            {services.map((service, index) => (
              <ServiceItem key={service.id} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-14 rounded-[1.75rem] border border-primary/15 bg-[color:color-mix(in_srgb,var(--color-primary)_6%,white)] px-8 py-10 text-center"
          >
            <p className="text-xl font-semibold text-primary">
              Don&apos;t see what you need?
            </p>

            <p className="mt-2 text-sm text-text/70">
              We handle a wide range of outdoor and property care requests.
              Reach out and we&apos;ll figure it out together.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90"
            >
              Get in touch
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