import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { Cinzel, Montserrat, Inter } from "next/font/google";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

import { getSiteSettings } from "@/features/core/api";
import { SiteSettingsProvider } from "@/features/core/providers";
import { QuoteRequestModalProvider } from "@/features/quote-request/QuoteRequestModalProvider";
import { getServiceCategories } from "@/features/services/api";
import { ServiceProvider } from "@/features/services/ServiceProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saltcreeklandscaping.com"),

  title: {
    default: "Salt Creek Landscaping",
    template: "%s",
  },

  description:
    "Salt Creek Landscaping is a local, owner-operated company based in Bloomington, Indiana. We handle lawn care, landscaping, tree work, and hardscaping for homeowners who want their property done right.",

  openGraph: {
    title: "Salt Creek Landscaping",
    description:
      "Salt Creek Landscaping is a local, owner-operated company based in Bloomington, Indiana. We handle lawn care, landscaping, tree work, and hardscaping for homeowners who want their property done right.",
    url: "https://saltcreeklandscaping.com",
    siteName: "Salt Creek Landscaping",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salt Creek Landscaping in Bloomington, Indiana",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Salt Creek Landscaping",
    description:
      "Salt Creek Landscaping is a local, owner-operated company based in Bloomington, Indiana. We handle lawn care, landscaping, tree work, and hardscaping for homeowners who want their property done right.",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();
  const serviceCategories = await getServiceCategories();

  const themeVars = {
    "--color-primary": siteSettings.primaryColor,
    "--color-secondary": siteSettings.secondaryColor,
    "--color-highlight": siteSettings.highlightColor,
    "--color-text": siteSettings.textColor,
    "--color-text-inverse": siteSettings.textInverseColor,
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} ${inter.variable} ${geist.variable}`}
    >
      <SiteSettingsProvider value={siteSettings}>
        <ServiceProvider serviceCategories={serviceCategories}>
          <QuoteRequestModalProvider>
            <body className="overflow-x-hidden text-text" style={themeVars}>
              <Navbar
                businessName={siteSettings.businessName}
                logoUrl={siteSettings.logoUrl}
              />

              <main className="mt-16 lg:mt-20">{children}</main>

              <Footer
                businessName={siteSettings.businessName}
                tagline={siteSettings.tagline}
                logoUrl={siteSettings.logoUrl}
                facebookUrl={siteSettings.facebookUrl}
                instagramUrl={siteSettings.instagramUrl}
                googleUrl={siteSettings.googleBusinessUrl}
                serviceArea={siteSettings.serviceArea}
              />
            </body>
          </QuoteRequestModalProvider>
        </ServiceProvider>
      </SiteSettingsProvider>
    </html>
  );
}