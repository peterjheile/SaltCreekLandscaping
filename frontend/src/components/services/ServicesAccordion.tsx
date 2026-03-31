"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { ServiceCategory } from "@/features/services/types";
import { ServiceIcon } from "@/features/services/icons";

type ServicesAccordionProps = {
  services: ServiceCategory[];
};

export default function ServicesAccordion({
  services,
}: ServicesAccordionProps) {
  const orderedServices = React.useMemo(() => services, [services]);

  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-4 px-2"
    >
      {orderedServices.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.05 }}
        >
          <AccordionItem value={service.id}>
            <AccordionTrigger>
              <div className="flex min-w-0 items-start gap-4">
                <div className="mt-1 rounded-2xl bg-green-50 p-3 text-green-700">
                  <ServiceIcon iconName={service.iconName} className="h-5 w-5" />
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
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
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
                    {service.includedItems.map((item) => (
                      <span
                        key={item.id}
                        className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}