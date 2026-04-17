export type ContactMessagePayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  hp?: string;
};

export type ContactMessageResponse = {
  detail: string;
};

export type QuoteRequestPayload = {
  name: string;
  email: string;
  phone?: string;
  service_category?: string; // UUID (FK id)
  message: string;
  hp?: string;
};

export type QuoteRequestResponse = {
  detail: string;
};