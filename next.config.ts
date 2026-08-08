import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Standalone output for Netlify & Vercel
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "prisma"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.toolifia.vercel.app" }],
        destination: "https://toolifia.vercel.app/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/:path*.(svg|jpg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: "Thu, 31 Dec 2037 23:59:59 GMT",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: "Thu, 31 Dec 2037 23:59:59 GMT",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
