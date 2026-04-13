export type BusinessHourApi = {
  id: number;
  label: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  sort_order: number;
};

export type SiteSettingsApi = {
  business_name: string;
  tagline: string;
  logo_url: string | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  service_area: string;
  facebook_url: string;
  instagram_url: string;
  google_business_url: string;
  primary_color: string;
  secondary_color: string;
  highlight_color: string;
  text_color: string;
  text_inverse_color: string;
  business_hours: BusinessHourApi[];
};

export type BusinessHour = {
  id: number;
  label: string;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
  sortOrder: number;
};

export type SiteSettings = {
  businessName: string;
  tagline: string;
  logoUrl: string | null;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceArea: string;
  facebookUrl: string;
  instagramUrl: string;
  googleBusinessUrl: string;
  primaryColor: string;
  secondaryColor: string;
  highlightColor: string;
  textColor: string;
  textInverseColor: string;
  businessHours: BusinessHour[];
};