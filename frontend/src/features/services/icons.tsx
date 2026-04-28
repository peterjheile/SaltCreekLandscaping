import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import {
  FaLeaf,
  FaTree,
  FaSnowflake,
  FaTrashAlt,
  FaTruckPickup,
  FaWater,
  FaBroom,
  FaMountain,
  FaBolt,
  FaCloudSunRain,
  FaCloudRain,
} from "react-icons/fa";

import {
  FiScissors,
  FiTool,
  FiHome,
  FiSun,
  FiWind,
  FiDroplet,
  FiCheckCircle,
  FiStar,
  FiMapPin,
  FiClock,
  FiGrid,
} from "react-icons/fi";

import { MdGrass } from "react-icons/md";

/**
 * Curated landscaping / lawncare focused icon set
 */

export const SERVICE_ICON_NAMES = [
  "mowing",
  "grass",
  "tree",
  "rock",
  "mulch",
  "cleanup",
  "trash",
  "hauling",
  "watering",
  "sprinkler",
  "trimming",
  "hedge",
  "snow",
  "sun",
  "wind",
  "storm",
  "rain",
  "lightning",
  "home",
  "tools",
  "patio",
  "check",
  "premium",
  "location",
  "schedule",
  "design",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

export const SERVICE_ICON_MAP = {
  // core requested
  mowing: FiScissors,
  grass: MdGrass,
  tree: FaTree,
  rock: FaMountain,

  // lawn / landscaping
  mulch: FaLeaf,
  cleanup: FaBroom,
  trash: FaTrashAlt,
  hauling: FaTruckPickup,
  watering: FiDroplet,
  sprinkler: FaWater,
  trimming: FiScissors,
  hedge: FaLeaf,
  patio: FiGrid,
  design: FiGrid,

  // seasonal / weather services
  snow: FaSnowflake,
  sun: FiSun,
  wind: FiWind,
  storm: FaCloudSunRain,
  rain: FaCloudRain,
  lightning: FaBolt,

  // general useful service items
  home: FiHome,
  tools: FiTool,
  check: FiCheckCircle,
  premium: FiStar,
  location: FiMapPin,
  schedule: FiClock,
} satisfies Record<ServiceIconName, IconType>;

const FALLBACK_ICON = FiScissors;

export function isServiceIconName(value: string): value is ServiceIconName {
  return (SERVICE_ICON_NAMES as readonly string[]).includes(value);
}

export function normalizeServiceIconName(
  value: string | null | undefined
): ServiceIconName | null {
  if (!value) return null;
  return isServiceIconName(value) ? value : null;
}

type ServiceIconProps = {
  iconName: string | null | undefined;
  className?: string;
};

export function ServiceIcon({
  iconName,
  className = "h-5 w-5",
}: ServiceIconProps) {
  const normalizedIconName = normalizeServiceIconName(iconName);

  const Icon = normalizedIconName
    ? SERVICE_ICON_MAP[normalizedIconName]
    : FALLBACK_ICON;

  return <Icon className={className} />;
}

export function getServiceIcon(
  iconName: string | null | undefined,
  className = "h-5 w-5"
): ReactNode {
  const normalizedIconName = normalizeServiceIconName(iconName);

  const Icon = normalizedIconName
    ? SERVICE_ICON_MAP[normalizedIconName]
    : FALLBACK_ICON;

  return <Icon className={className} />;
}