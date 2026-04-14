import type { ReactNode } from "react";
import {
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiCloud,
  FiCloudRain,
  FiDroplet,
  FiHome,
  FiLayers,
  FiMapPin,
  FiNavigation,
  FiScissors,
  FiSettings,
  FiStar,
  FiSun,
  FiThumbsUp,
  FiTool,
  FiTrash2,
  FiWind,
} from "react-icons/fi";

export const SERVICE_ICON_NAMES = [
  "scissors",
  "wind",
  "droplet",
  "layers",
  "home",
  "trash",
  "tool",
  "sun",
  "cloud",
  "rain",
  "activity",
  "check",
  "award",
  "thumbs",
  "star",
  "location",
  "navigation",
  "settings",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

export const SERVICE_ICON_MAP = {
  scissors: FiScissors,
  wind: FiWind,
  droplet: FiDroplet,
  layers: FiLayers,
  home: FiHome,
  trash: FiTrash2,
  tool: FiTool,
  sun: FiSun,
  cloud: FiCloud,
  rain: FiCloudRain,
  activity: FiActivity,
  check: FiCheckCircle,
  award: FiAward,
  thumbs: FiThumbsUp,
  star: FiStar,
  location: FiMapPin,
  navigation: FiNavigation,
  settings: FiSettings,
} as const;

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