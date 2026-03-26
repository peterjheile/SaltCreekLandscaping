"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

import logo from "@/public/salt-creek-logo.png"

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Home",
      link: "#services",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Gallery",
      link: "#gallery",
    },
    {
      name: "Contact",
      link: "#contact",
    },
        {
      name: "FAQs",
      link: "#faqs",
    },
    {
      name: "Reviews",
      link: "#reviews",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  return (
    <>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
        <NavbarLogo
          src={logo}
          alt="Logo"
        />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo           
              src={logo}
              alt="Logo"/>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-5">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
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
