# Toolifia - World-Class AI Tools & SEO Platform Documentation

## 1. Executive Summary
**Toolifia** is a modular, high-performance web platform designed for free AI utilities, technical SEO tools, developer formatters, document converters, calculators, and generators.

It is built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Prisma ORM.

## 2. Rebranding Architecture
All site branding, metadata, links, social handles, and ad publisher IDs are centralized in a single configuration file:
- `src/config/site.config.ts`

Changing the brand name, domain URL, or AdSense ID in `site.config.ts` updates the entire application automatically.

## 3. Tool & Category Registry System
- **Categories Registry**: `src/config/categories.registry.ts` (Defines all 35 taxonomies).
- **Tools Registry**: `src/config/tools.registry.ts` (Defines metadata, FAQs, keywords, features, benefits, and how-to steps for each tool).

## 4. Technical SEO Engine
- **Structured Schemas**: Includes `SoftwareApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `Article`, and `WebSite` JSON-LD schemas.
- **Dynamic Sitemap**: Generated dynamically at `/sitemap.xml`.
- **Robots.txt**: Generated dynamically at `/robots.txt`.
- **Zero-CLS Monetization**: Ad slots wrapped in fixed min-height containers preventing layout shift.

## 5. Development & Deployment
```bash
# Install dependencies
npm install

# Run Prisma schema generation
npx prisma generate

# Run local development server
npm run dev

# Production Build
npm run build
npm run start
```
