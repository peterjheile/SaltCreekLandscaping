import type {
  SiteSettingsApi,
  SiteSettings,
  BusinessHourApi,
  BusinessHour,
} from "./types";


function mapBusinessHour(data: BusinessHourApi): BusinessHour {
  return {
    id: data.id,
    label: data.label,
    openTime: data.open_time,
    closeTime: data.close_time,
    isClosed: data.is_closed,
    sortOrder: data.sort_order,
  };
}


export function mapSiteSettings(data: SiteSettingsApi): SiteSettings {
  return {
    businessName: data.business_name,
    tagline: data.tagline,
    logoUrl: data.logo_url,
    phone: data.phone,
    email: data.email,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zip_code,
    serviceArea: data.service_area,
    facebookUrl: data.facebook_url,
    instagramUrl: data.instagram_url,
    googleBusinessUrl: data.google_business_url,
    primaryColor: data.primary_color,
    secondaryColor: data.secondary_color,
    highlightColor: data.highlight_color,
    textColor: data.text_color,
    textInverseColor: data.text_inverse_color,
    businessHours: data.business_hours.map(mapBusinessHour),
  };
}


export function getSiteSettingsFallback(): SiteSettings {
  return {
    businessName: "",
    tagline: "",
    logoUrl: null,
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceArea: "",
    facebookUrl: "",
    instagramUrl: "",
    googleBusinessUrl: "",
    primaryColor: "#013220",
    secondaryColor: "#ada18c",
    highlightColor: "#c49c48",
    textColor: "#000000",
    textInverseColor: "#ffffff",
    businessHours: [],
  };
}