"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openItems: string[];
  toggleItem: (value: string) => void;
  isOpen: (value: string) => boolean;
  type: "single" | "multiple";
  collapsible: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used within <Accordion />");
  }

  return context;
}

type AccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
};

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
}: AccordionProps) {
  const initialOpenItems = React.useMemo(() => {
    if (defaultValue == null) return [];

    if (Array.isArray(defaultValue)) return defaultValue;

    return [defaultValue];
  }, [defaultValue]);

  const [openItems, setOpenItems] = React.useState<string[]>(initialOpenItems);

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const currentlyOpen = prev.includes(value);

        if (type === "multiple") {
          if (currentlyOpen) {
            return prev.filter((item) => item !== value);
          }

          return [...prev, value];
        }

        if (currentlyOpen) {
          return collapsible ? [] : prev;
        }

        return [value];
      });
    },
    [type, collapsible]
  );

  const isOpen = React.useCallback(
    (value: string) => openItems.includes(value),
    [openItems]
  );

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, isOpen, type, collapsible }}
    >
      <div className={cn("space-y-4", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "AccordionItem subcomponents must be used within <AccordionItem />"
    );
  }

  return context;
}

type AccordionItemProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function AccordionItem({
  value,
  className,
  children,
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)]",
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = {
  className?: string;
  children: React.ReactNode;
  iconClassName?: string;
};

export function AccordionTrigger({
  className,
  children,
  iconClassName,
}: AccordionTriggerProps) {
  const { value } = useAccordionItemContext();
  const { toggleItem, isOpen } = useAccordionContext();

  const open = isOpen(value);
  const contentId = `${value}-content`;
  const triggerId = `${value}-trigger`;

  return (
    <button
      id={triggerId}
      type="button"
      onClick={() => toggleItem(value)}
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        "flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-neutral-50 sm:px-7 sm:py-6",
        className
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>

      <div className="flex shrink-0 items-center">
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "rounded-full border border-neutral-200 p-2 text-neutral-500",
            iconClassName
          )}
        >
          <FiChevronDown className="h-5 w-5" />
        </motion.div>
      </div>
    </button>
  );
}

type AccordionContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function AccordionContent({
  className,
  children,
}: AccordionContentProps) {
  const { value } = useAccordionItemContext();
  const { isOpen } = useAccordionContext();

  const open = isOpen(value);
  const contentId = `${value}-content`;
  const triggerId = `${value}-trigger`;

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={cn("border-t border-neutral-200", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}