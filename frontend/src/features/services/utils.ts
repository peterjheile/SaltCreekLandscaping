import type {
  ServiceCategory,
  ServiceCategoryAccordionItem,
  ServiceIconKey,
  ServiceIncludedItem,
} from "./types";

/* =========================
   API TYPES (snake_case)
========================= */

export type ApiServiceIncludedItem = {
  id: string;
  name: string;
  sort_order: number;
};

export type ApiServiceCategory = {
  id: string;
  title: string;
  eyebrow: string;
  slug: string;
  short_description: string;
  long_description: string;
  icon_name: string | null;
  sort_order: number;
  is_published: boolean;
  included_items: ApiServiceIncludedItem[];
};

/* =========================
   TYPE GUARDS
========================= */

export function isServiceIconKey(value: string): value is ServiceIconKey {
  return [
    "scissors",
    "wind",
    "layers",
    "home",
    "droplet",
    "sun",
  ].includes(value);
}

export function normalizeServiceIconName(
  iconName: string | null | undefined
): ServiceIconKey | null {
  if (!iconName) return null;
  return isServiceIconKey(iconName) ? iconName : null;
}

/* =========================
   MAPPERS (API → DOMAIN)
========================= */

export function mapApiServiceIncludedItem(
  item: ApiServiceIncludedItem
): ServiceIncludedItem {
  return {
    id: item.id,
    name: item.name,
    sortOrder: item.sort_order,
  };
}

export function mapApiServiceCategory(
  service: ApiServiceCategory
): ServiceCategory {
  return {
    id: service.id,
    title: service.title,
    eyebrow: service.eyebrow,
    slug: service.slug,
    shortDescription: service.short_description,
    longDescription: service.long_description,
    iconName: normalizeServiceIconName(service.icon_name),
    sortOrder: service.sort_order,
    isPublished: service.is_published,
    includedItems: service.included_items.map(mapApiServiceIncludedItem),
  };
}

export function mapApiServiceCategories(
  services: ApiServiceCategory[]
): ServiceCategory[] {
  return services.map(mapApiServiceCategory);
}

/* =========================
   DOMAIN → UI (NO JSX)
========================= */

export function mapServiceCategoryToAccordionItem(
  service: ServiceCategory
): ServiceCategoryAccordionItem {
  return {
    id: service.id,
    eyebrow: service.eyebrow,
    title: service.title,
    shortDescription: service.shortDescription,
    longDescription: service.longDescription,
    iconName: service.iconName,
    included: service.includedItems.map((item) => item.name),
  };
}

export function mapServiceCategoriesToAccordionItems(
  services: ServiceCategory[]
): ServiceCategoryAccordionItem[] {
  return services.map(mapServiceCategoryToAccordionItem);
}