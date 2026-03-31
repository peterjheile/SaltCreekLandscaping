import type { ServiceCategory } from "./types";
import {
  mapApiServiceCategories,
  type ApiServiceCategory,
} from "./utils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const SERVICES_ENDPOINT = `${API_BASE_URL}/api/services/categories/`;

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
    cache: "no-store"
  });

  const data = await parseJsonResponse<ApiServiceCategory[]>(response);
  return mapApiServiceCategories(data);
}