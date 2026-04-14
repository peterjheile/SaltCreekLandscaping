import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { Cinzel, Montserrat, Inter } from "next/font/google";
import type { CSSProperties } from "react";

import { getSiteSettings } from "@/features/core/api";
import { SiteSettingsProvider } from "@/features/core/providers";

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

export const metadata = {
  title: "Salt Creek Landscaping",
  description: "Professional lawn care and landscaping services",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings();

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
            />
          
        </body>
      </SiteSettingsProvider>
    </html>
  );
}