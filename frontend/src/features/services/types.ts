import { SERVICE_ICON_MAP } from "./icons";

export type ServiceIconKey = keyof typeof SERVICE_ICON_MAP;

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