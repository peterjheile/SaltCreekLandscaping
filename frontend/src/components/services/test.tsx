"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FiArrowRight,
  FiChevronDown,
  FiScissors,
  FiSun,
  FiHome,
  FiDroplet,
  FiWind,
  FiLayers,
} from "react-icons/fi";

type ServiceCategory = {
  id: string;
  eyebrow: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  included: string[];
  icon: React.ReactNode;
};

const SERVICES: ServiceCategory[] = [
  {
    id: "lawn-care",
    eyebrow: "Core Service",
    title: "Lawn Care",
    shortDescription:
      "Reliable mowing and routine care that keeps your property looking clean, healthy, and consistent.",
    longDescription:
      "Our lawn care service is built for homeowners who want a sharp, well-maintained yard without the hassle of doing it themselves. We focus on consistency, clean lines, and dependable upkeep so your property always looks cared for and professional.",
    included: [
      "Routine mowing",
      "String trimming",
      "Edging along walkways",
      "Blowing off hard surfaces",
      "Clean finish after each visit",
    ],
    icon: <FiScissors className="h-5 w-5" />,
  },
  {
    id: "seasonal-cleanups",
    eyebrow: "Seasonal",
    title: "Seasonal Cleanups",
    shortDescription:
      "Spring and fall cleanup services to remove debris and refresh your property for the season ahead.",
    longDescription:
      "Seasonal cleanup helps reset your yard after weather, leaf drop, and overgrowth. This service is ideal for bringing your property back to a neat, manageable condition before regular maintenance begins or after a busy season ends.",
    included: [
      "Leaf cleanup",
      "Stick and debris removal",
      "Bed cleanup",
      "Light overgrowth clearing",
      "Season-ready appearance",
    ],
    icon: <FiWind className="h-5 w-5" />,
  },
  {
    id: "mulch-beds",
    eyebrow: "Curb Appeal",
    title: "Mulch & Bed Refresh",
    shortDescription:
      "A simple way to make landscaping look newer, cleaner, and more defined.",
    longDescription:
      "Fresh mulch and cleaned landscape beds can dramatically improve curb appeal. This service helps your home look more polished while also making planted areas appear intentional and well maintained.",
    included: [
      "Bed cleanup",
      "Mulch spreading",
      "Defined bed edges",
      "Weed reduction touch-up",
      "Cleaner landscape presentation",
    ],
    icon: <FiLayers className="h-5 w-5" />,
  },
  {
    id: "property-detailing",
    eyebrow: "Detail Work",
    title: "Property Detailing",
    shortDescription:
      "Small finishing touches that make the whole property feel sharper and more complete.",
    longDescription:
      "Property detailing focuses on the visible finishing work that often gets overlooked. It is perfect for homeowners who want their yard and exterior spaces to feel more intentional, polished, and guest-ready.",
    included: [
      "Walkway edge touch-ups",
      "Blowing and surface cleanup",
      "Minor visual refinements",
      "Fence-line trimming",
      "General presentation improvements",
    ],
    icon: <FiHome className="h-5 w-5" />,
  },
  {
    id: "watering-plant-care",
    eyebrow: "Support",
    title: "Watering & Plant Care",
    shortDescription:
      "Helpful upkeep for planted areas that need light attention and routine support.",
    longDescription:
      "For properties with flowers, shrubs, or decorative beds, this service provides light support to keep everything looking alive and intentional. It is especially helpful during dry stretches or for homeowners who travel frequently.",
    included: [
      "Light watering support",
      "Basic plant observation",
      "Bed appearance upkeep",
      "Dry-area attention",
      "Simple maintenance support",
    ],
    icon: <FiDroplet className="h-5 w-5" />,
  },
  {
    id: "custom-projects",
    eyebrow: "Flexible",
    title: "Custom Outdoor Projects",
    shortDescription:
      "Need something a little different? We can discuss custom outdoor work based on your property.",
    longDescription:
      "Not every property fits into the same box. If you have a specific outdoor need, cleanup request, or small project in mind, we can talk through the details and see what makes sense for your space, schedule, and goals.",
    included: [
      "One-time service requests",
      "Small outdoor projects",
      "Special cleanup needs",
      "Property-specific requests",
      "Flexible estimates",
    ],
    icon: <FiSun className="h-5 w-5" />,
  },
];

const SECTION_HEIGHT = 1000;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const accordionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.2, 0.35, 0.55]);

  const handleScrollToAccordion = () => {
    accordionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-neutral-900"
    >
      <div
        style={{ minHeight: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative"
      >
        <motion.div
          style={{ scale: bgScale }}
          className="sticky top-0 h-screen overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),_transparent_40%),linear-gradient(to_bottom,_#ffffff,_#f8fafc)]" />

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(245,245,245,0.75))]"
          />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-10 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500 shadow-sm backdrop-blur">
                Professional Outdoor Services
              </div>

              <button
                onClick={handleScrollToAccordion}
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/85 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
              >
                View Services
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid items-end gap-10 pb-20 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="max-w-3xl">
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-green-700"
                >
                  Services
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl"
                >
                  Well-structured services that are easy to browse and built to
                  feel trustworthy.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg"
                >
                  Explore each service category to see what is included, what it
                  is best for, and how it helps keep your property looking
                  clean, healthy, and professionally maintained.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-green-50 p-3 text-green-700">
                    <FiScissors className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Easy Navigation
                    </p>
                    <p className="text-lg font-semibold text-neutral-900">
                      Browse by category
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {SERVICES.slice(0, 4).map((service) => (
                    <div
                      key={service.id}
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3"
                    >
                      <div className="mb-2 flex items-center gap-2 text-green-700">
                        {service.icon}
                        <span className="text-sm font-semibold text-neutral-800">
                          {service.title}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-neutral-600">
                        {service.shortDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <section
        ref={accordionRef}
        id="services-accordion"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 lg:px-12"
      >
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-green-700">
            Service Categories
          </p>
          <h3 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Find the service that fits your property best
          </h3>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Open any category below to view a more detailed description and the
            specific items that may be included.
          </p>
        </div>

        <ServicesAccordion services={SERVICES} />
      </section>
    </section>
  );
}

function ServicesAccordion({ services }: { services: ServiceCategory[] }) {
  const [openId, setOpenId] = useState<string>(services[0]?.id ?? "");

  const orderedServices = useMemo(() => services, [services]);

  return (
    <div className="space-y-4">
      {orderedServices.map((service, index) => {
        const isOpen = openId === service.id;

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.05 }}
            className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : service.id)}
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-neutral-50 sm:px-7 sm:py-6"
              aria-expanded={isOpen}
              aria-controls={`${service.id}-content`}
            >
              <div className="flex min-w-0 items-start gap-4">
                <div className="mt-1 rounded-2xl bg-green-50 p-3 text-green-700">
                  {service.icon}
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {service.eyebrow}
                  </p>
                  <h4 className="text-xl font-semibold text-neutral-950 sm:text-2xl">
                    {service.title}
                  </h4>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-full border border-neutral-200 p-2 text-neutral-500"
                >
                  <FiChevronDown className="h-5 w-5" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${service.id}-content`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-neutral-200 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                          Extended Description
                        </p>
                        <p className="mt-3 text-base leading-7 text-neutral-700">
                          {service.longDescription}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                          May Include
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {service.included.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}