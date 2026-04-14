"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type NavbarDemoProps = {
  businessName: string;
  logoUrl: string | null;
};

export default function NavbarDemo({
  businessName,
  logoUrl,
}: NavbarDemoProps) {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Gallery", link: "/gallery" },
    { name: "Contact", link: "/contact" },
    { name: "FAQs", link: "/faqs" },
    { name: "Reviews", link: "/reviews" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const buttonStyles =
    "bg-primary text-text-inverse shadow-[0_2px_8px_color-mix(in_srgb,var(--color-primary)_14%,transparent),0_6px_18px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] ring-1 ring-primary/15 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_color-mix(in_srgb,var(--color-primary)_20%,transparent),0_10px_26px_color-mix(in_srgb,var(--color-primary)_24%,transparent)]";

  const logoSrc = logoUrl || "/salt-creek-logo.png";
  const logoAlt = businessName ? `${businessName} logo` : "Logo";

  const Logo = () => (
    <img
      src={logoSrc}
      alt={logoAlt}
      className="h-10 w-auto object-contain"
    />
  );

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-30 bg-primary/25 backdrop-blur-xl lg:hidden"
          />
        )}
      </AnimatePresence>

      <Navbar>
        <NavBody>
          <Logo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" className={buttonStyles}>
              Book Service
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-text/70 transition-colors hover:text-primary"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="mt-5 flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className={`w-full ${buttonStyles}`}
              >
                Book a Service
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}