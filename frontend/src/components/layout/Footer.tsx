"use client";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

type FooterProps = {
  businessName: string;
  tagline: string;
  logoUrl: string | null;
  facebookUrl: string;
  instagramUrl: string;
};

const Footer = ({
  businessName,
  tagline,
  logoUrl,
  facebookUrl,
  instagramUrl,
}: FooterProps) => {
  const logoSrc = logoUrl || "/salt-creek-logo.png";

  return (
    <footer className="bg-white mt-10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          
          {/* Logo + Branding */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="/">
              <img
                src={logoSrc}
                alt={`${businessName} logo`}
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="max-w-sm text-sm text-gray-600 text-center md:text-left">
              {tagline || ""}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-start">
            <a href="/" className="text-gray-600 hover:text-black transition">
              Home
            </a>
            <a href="/services" className="text-gray-600 hover:text-black transition">
              Services
            </a>
            <a href="/gallery" className="text-gray-600 hover:text-black transition">
              Gallery
            </a>
            <a href="/contact" className="text-gray-600 hover:text-black transition">
              Contact
            </a>
              <a href="/faqs" className="text-gray-600 hover:text-black transition">
              FAQs
            </a>
            <a href="/reviews" className="text-gray-600 hover:text-black transition">
              Reviews
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;