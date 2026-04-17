import { config } from "@/lib/config";
import type {
  ContactMessagePayload,
  ContactMessageResponse,
  QuoteRequestPayload,
  QuoteRequestResponse,
} from "./types";

const CONTACT_MESSAGES_ENDPOINT = `${config.apiBaseUrl}/api/inbox/contact-messages/`;
const QUOTE_REQUESTS_ENDPOINT = `${config.apiBaseUrl}/api/inbox/quote-requests/`;


async function parseJsonResponse<T>(response: Response): Promise<T> {
  let data: T | { detail?: string } | null = null;

  try {
    data = (await response.json()) as T | { detail?: string };
  } catch {
    data = null;
  }

  if (!response.ok) {
    const detail =
      data &&
      typeof data === "object" &&
      "detail" in data &&
      typeof data.detail === "string"
        ? data.detail
        : `Request failed with status ${response.status}`;

    throw new Error(detail);
  }

  return data as T;
}

export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> {
  const response = await fetch(CONTACT_MESSAGES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      subject: payload.subject,
      message: payload.message,
      hp: payload.hp ?? "",
    }),
  });

  return parseJsonResponse<ContactMessageResponse>(response);
}

export async function submitQuoteRequest(
  payload: QuoteRequestPayload
): Promise<QuoteRequestResponse> {
  const response = await fetch(QUOTE_REQUESTS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? "",
      service_category: payload.service_category ?? "",
      message: payload.message,
      hp: payload.hp ?? "",
    }),
  });

  return parseJsonResponse<QuoteRequestResponse>(response);
}