import { config } from "@/lib/config";
import type { ServiceCategory } from "./types";
import {
  mapApiServiceCategories,
  type ApiServiceCategory,
} from "./utils";

const SERVICES_ENDPOINT = `${config.apiBaseUrl}/api/marketing/services/`;

async function parseJsonResponse<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    console.warn(`API request failed with status ${response.status}`);
    return null;
  }

  return response.json() as Promise<T>;
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const response = await fetch(SERVICES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: config.revalidateSeconds },
    });

    const data = await parseJsonResponse<ApiServiceCategory[]>(response);

    if (!data) {
      return [];
    }

    return mapApiServiceCategories(data);
  } catch (error) {
    console.warn("Failed to fetch service categories:", error);
    return [];
  }
}