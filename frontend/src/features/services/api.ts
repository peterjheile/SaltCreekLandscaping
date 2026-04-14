import { config } from "@/lib/config";
import type { ServiceCategory } from "./types";
import {
  mapApiServiceCategories,
  type ApiServiceCategory,
} from "./utils";

const SERVICES_ENDPOINT = `${config.apiBaseUrl}/api/marketing/services/`;

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const response = await fetch(SERVICES_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: config.revalidateSeconds },
  });

  const data = await parseJsonResponse<ApiServiceCategory[]>(response);
  return mapApiServiceCategories(data);
}