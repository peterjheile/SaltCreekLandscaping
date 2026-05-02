import type { NextConfig } from "next";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",

    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "saltcreeklandscaping.com",
        pathname: "/media/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;