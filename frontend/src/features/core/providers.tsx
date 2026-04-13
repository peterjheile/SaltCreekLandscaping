"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "./types";

const SiteSettingsContext = createContext<SiteSettings | null>(null);

type Props = {
  value: SiteSettings;
  children: React.ReactNode;
};

export function SiteSettingsProvider({ value, children }: Props) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider"
    );
  }

  return context;
}