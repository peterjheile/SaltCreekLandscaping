const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const toNumber = (
  value: string | undefined,
  fallback: number,
  name: string
): number => {
  if (value === undefined || value === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }

  return parsed;
};






export const config = {
  apiBaseUrl: required(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "NEXT_PUBLIC_API_BASE_URL"
  ),
  siteUrl: required(
    process.env.NEXT_PUBLIC_SITE_URL,
    "NEXT_PUBLIC_SITE_URL"
  ),
  revalidateSeconds: toNumber(
    process.env.NEXT_PUBLIC_REVALIDATE_SECONDS,
    60,
    "NEXT_PUBLIC_REVALIDATE_SECONDS"
  ),
};