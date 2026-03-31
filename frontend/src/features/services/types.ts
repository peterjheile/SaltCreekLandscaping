import type { ReactNode } from "react";

export const SERVICE_ICON_KEYS = [
  "scissors",
  "wind",
  "layers",
  "home",
  "droplet",
  "sun",
] as const;

export type ServiceIconKey = (typeof SERVICE_ICON_KEYS)[number];

export type ServiceIncludedItem = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ServiceCategory = {
  id: string;
  title: string;
  eyebrow: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  iconName: ServiceIconKey | null;
  sortOrder: number;
  isPublished: boolean;
  includedItems: ServiceIncludedItem[];
};

export type ServiceCategoryAccordionItem = {
  id: string;
  eyebrow: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: ServiceIconKey | null;
  included: string[];
};