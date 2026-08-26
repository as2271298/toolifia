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
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleapis.com" },
      { protocol: "https", hostname: "**.gstatic.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.toolifia.vercel.app" },
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
      { source: "/index.html",  destination: "/", statusCode: 301 },
      { source: "/index.htm",   destination: "/", statusCode: 301 },
      { source: "/index.php",   destination: "/", statusCode: 301 },
      { source: "/index.asp",   destination: "/", statusCode: 301 },
      { source: "/index.aspx",  destination: "/", statusCode: 301 },
      { source: "/index.jsp",   destination: "/", statusCode: 301 },
      { source: "/index",       destination: "/", statusCode: 301 },
      { source: "/default.html",destination: "/", statusCode: 301 },
      { source: "/default.aspx",destination: "/", statusCode: 301 },
      { source: "/home",        destination: "/", statusCode: 301 },
      { source: "/home.html",   destination: "/", statusCode: 301 },
      // WWW → non-WWW canonical redirect (301)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.toolifia.vercel.app" }],
        destination: "https://toolifia.vercel.app/:path*",
        statusCode: 301,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // ── Prevent MIME sniffing attacks ──────────────────────────────
          { key: "X-Content-Type-Options", value: "nosniff" },
          // ── Block clickjacking ─────────────────────────────────────────
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // ── Enable browser XSS filter ──────────────────────────────────
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // ── DNS prefetch for performance ───────────────────────────────
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // ── HSTS — force HTTPS for 2 years ────────────────────────────
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // ── Control referrer info sent to 3rd parties ──────────────────
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // ── Disable browser features not needed ───────────────────────
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
              "payment=()",
              "usb=()",
              "magnetometer=()",
              "accelerometer=()",
              "gyroscope=()",
            ].join(", "),
          },
          // ── Content Security Policy ────────────────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: self + inline (Next.js needs unsafe-inline) + trusted CDNs
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://widget.trustpilot.com https://cdn.trustpilot.net https://apis.google.com",
              // Styles: self + inline (Tailwind inlines styles)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              // Images: self + data URIs + known CDNs
              "img-src 'self' data: blob: https: http:",
              // Connections (fetch/XHR)
              "connect-src 'self' https://formspree.io https://api.openai.com https://openrouter.ai https://generativelanguage.googleapis.com https://api.indexnow.org https://www.bing.com https://*.vercel.app https://vitals.vercel-insights.com",
              // Frames: AdSense + Trustpilot
              "frame-src 'self' https://www.google.com https://googleads.g.doubleclick.net https://widget.trustpilot.com https://www.youtube.com",
              // Workers
              "worker-src 'self' blob:",
              // Manifest
              "manifest-src 'self'",
              // Base URI
              "base-uri 'self'",
              // Form submissions only go to self or formspree
              "form-action 'self' https://formspree.io",
              // No mixed content
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // ── Default caching for HTML pages ────────────────────────────
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=59",
          },
        ],
      },
      // ── Long-cache static assets ─────────────────────────────────────────
      {
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico|gif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // ── API routes: no caching, CORS locked down ─────────────────────────
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Access-Control-Allow-Origin", value: "https://toolifia.vercel.app" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;

