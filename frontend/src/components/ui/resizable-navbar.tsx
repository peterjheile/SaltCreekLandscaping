"use client";

import React, { useEffect, useState, type ElementType, type ReactNode } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Hamburger from "hamburger-react";

import { cn } from "@/lib/utils";

type WithChildren = {
  children: ReactNode;
  className?: string;
};

type WithVisible = WithChildren & {
  visible?: boolean;
};

type NavItem = {
  name: string;
  link: string;
};

const NAV_SHADOW =
  "0 0 24px color-mix(in_srgb,var(--color-primary)_8%,transparent), 0 1px 1px color-mix(in_srgb,var(--color-primary)_10%,transparent), 0 0 0 1px color-mix(in_srgb,var(--color-primary)_8%,transparent), 0 0 4px color-mix(in_srgb,var(--color-primary)_10%,transparent), 0 16px 68px color-mix(in_srgb,var(--color-primary)_10%,transparent), 0 1px 0 color-mix(in_srgb,var(--color-text-inverse)_45%,transparent) inset";

const SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 50,
};

interface NavbarProps extends WithChildren {}

interface NavBodyProps extends WithVisible {}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps extends WithVisible {}

interface MobileNavHeaderProps extends WithChildren {}

interface MobileNavMenuProps extends WithChildren {
  isOpen: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 10);

    if (latest < 0) {
      setShowNavbar(true);
      setLastScrollY(latest);
      return;
    }

    if (Math.abs(latest - lastScrollY) < 5) return;

    setShowNavbar(latest < lastScrollY);
    setLastScrollY(latest);
  });

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("fixed inset-x-0 top-0 z-40 mx-auto max-w-7xl lg:top-2", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, {
              visible,
            })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(10px)" : "none",
      boxShadow: visible ? NAV_SHADOW : "none",
      width: visible ? "40%" : "100%",
    }}
    transition={SPRING}
    style={{ minWidth: "800px" }}
    className={cn(
      "relative z-[60] mx-auto hidden h-16 w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
      visible && "bg-text-inverse/95 ring-1 ring-primary/10",
      className,
    )}
  >
    {children}
  </motion.div>
);

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center gap-1 text-sm font-medium text-text/70 transition duration-200 hover:text-text lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={item.link}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="relative inline-flex items-center rounded-full px-4 py-2 text-text/70 transition-colors hover:text-primary"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-primary/8"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
}: MobileNavProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(16px)" : "blur(10px)",
      boxShadow: visible ? NAV_SHADOW : "0 1px 0 color-mix(in_srgb,var(--color-primary)_10%,transparent)",
      borderRadius: visible ? "0px" : "0",
    }}
    transition={SPRING}
    className={cn(
      "relative z-50 mx-auto flex w-full max-w-[calc(100vw)] flex-col items-center justify-between overflow-visible px-2 py-2 lg:hidden",
      "bg-text-inverse/95 ring-1 ring-primary/10",
      className,
    )}
  >
    {children}
  </motion.div>
);

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div
    className={cn(
      "relative z-[70] flex w-full flex-row items-center justify-between text-text",
      className,
    )}
  >
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-40 mt-20 bg-primary/20 backdrop-blur-2xl"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              opacity: 0,
              y: -8,
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "absolute left-0 right-0 top-full z-[60] overflow-hidden bg-text-inverse/95 ring-1 ring-primary/10 shadow-[0_24px_80px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] backdrop-blur-xl",
              className,
            )}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.055,
                    delayChildren: 0.08,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.035,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex w-full flex-col gap-3 px-6 pb-10 pt-8"
            >
              {React.Children.map(children, (child, i) =>
                React.isValidElement(child) ? (
                  <motion.div
                    key={i}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 10 },
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    {child}
                  </motion.div>
                ) : (
                  child
                ),
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="text-text">
      <Hamburger
        toggled={isOpen}
        toggle={onClick}
        direction="left"
        size={20}
        color="currentColor"
        rounded
      />
    </div>
  );
};

type NavbarLogoProps = {
  src?: React.ComponentProps<typeof Image>["src"];
  alt?: string;
  text?: string;
};

export const NavbarLogo = ({
  src,
  alt = "Logo",
  text,
}: NavbarLogoProps) => (
  <a href="/" className="flex items-center gap-2 px-2 py-1">
    {src && (
      <div className="relative h-10 w-[120px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>
    )}

    {text && (
      <span className="hidden text-sm font-semibold tracking-wide text-text sm:block">
        {text}
      </span>
    )}
  </a>
);

type NavbarButtonProps<T extends ElementType = "a"> = {
  href?: string;
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.ComponentPropsWithoutRef<T>;

export const NavbarButton = <T extends ElementType = "a">({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: NavbarButtonProps<T>) => {
  const Tag = as || "a";

  const baseStyles =
    "button relative inline-block cursor-pointer rounded-md px-4 py-2 text-center text-sm font-bold transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "bg-primary text-text-inverse shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]",
    secondary: "bg-transparent text-text shadow-none",
    dark:
      "bg-text text-text-inverse shadow-[0_10px_30px_color-mix(in_srgb,var(--color-text)_18%,transparent)]",
    gradient:
      "bg-primary text-text-inverse shadow-[0px_2px_0px_0px_color-mix(in_srgb,var(--color-text-inverse)_30%,transparent)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};