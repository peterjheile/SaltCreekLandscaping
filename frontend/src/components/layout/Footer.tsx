"use client";

import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

type FooterProps = {
  businessName: string;
  tagline: string;
  logoUrl: string | null;
  facebookUrl: string;
  instagramUrl: string;
  googleUrl: string;
};

const Footer = ({
  businessName,
  tagline,
  logoUrl,
  facebookUrl,
  instagramUrl,
  googleUrl,
}: FooterProps) => {
  const logoSrc = logoUrl || "/salt-creek-logo.png";

  return (
    <footer className="mt-10 bg-white text-text">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          {/* Logo + Branding */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <a href="/">
              <img
                src={logoSrc}
                alt={`${businessName} logo`}
                className="h-10 w-auto object-contain"
              />
            </a>

            <p className="max-w-sm text-center text-sm text-text md:text-left">
              {tagline || ""}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:justify-start">
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
              ["FAQs", "/faqs"],
              ["Reviews", "/reviews"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-text transition-colors duration-200 hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary transition-colors duration-200 hover:text-primary/65"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary transition-colors duration-200 hover:text-primary/65"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            )}

            {googleUrl && (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Business"
                className="text-primary transition-colors duration-200 hover:text-primary/65"
              >
                <FaGoogle className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <Separator className="bg-primary/10" />

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm text-text">
          © {new Date().getFullYear()} {businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;