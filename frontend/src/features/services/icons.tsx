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
  "FiScissors",
  "FiWind",
  "FiDroplet",
  "FiLayers",
  "FiHome",
  "FiTrash2",
  "FiTool",
  "FiSun",
  "FiCloud",
  "FiCloudRain",
  "FiActivity",
  "FiCheckCircle",
  "FiAward",
  "FiThumbsUp",
  "FiStar",
  "FiMapPin",
  "FiNavigation",
  "FiSettings",
] as const;

export type ServiceIconName = (typeof SERVICE_ICON_NAMES)[number];

const SERVICE_ICON_MAP = {
  FiScissors,
  FiWind,
  FiDroplet,
  FiLayers,
  FiHome,
  FiTrash2,
  FiTool,
  FiSun,
  FiCloud,
  FiCloudRain,
  FiActivity,
  FiCheckCircle,
  FiAward,
  FiThumbsUp,
  FiStar,
  FiMapPin,
  FiNavigation,
  FiSettings,
} as const;

const FALLBACK_ICON = FiScissors;

export function isServiceIconName(value: string): value is ServiceIconName {
  return value in SERVICE_ICON_MAP;
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