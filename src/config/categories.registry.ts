export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
  icon: string;
  featured?: boolean;
  color: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "ai-tools",
    name: "AI Tools",
    description: "Next-gen AI utilities for text humanizing, AI detection, prompt optimization, story writing, and AI generation.",
    icon: "Sparkles",
    featured: true,
    color: "from-purple-500 to-indigo-600",
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    description: "Technical SEO utilities, SERP previewers, meta tag builders, JSON-LD schema generators, and keyword density analyzers.",
    icon: "Search",
    featured: true,
    color: "from-blue-500 to-cyan-600",
  },
  {
    slug: "text-tools",
    name: "Text Tools",
    description: "Word counters, Twitter character meters, text rewriters, case converters, slug generators, and reading time calculators.",
    icon: "FileText",
    featured: true,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "JSON/XML/HTML/CSS formatters, minifiers, regex testers, cron parsers, cURL to fetch, and IP/DNS lookups.",
    icon: "Code",
    featured: true,
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "calculator-tools",
    name: "Calculators",
    description: "Free online calculators for BMI, calories, loans & EMI, compound interest, percentages, GPA, and scientific math.",
    icon: "Calculator",
    featured: true,
    color: "from-orange-500 to-amber-600",
  },
  {
    slug: "converter-tools",
    name: "Unit Converters",
    description: "Convert length, weight, temperature, speed, currency, binary, hex color, and CSS units with instant precision.",
    icon: "ArrowLeftRight",
    featured: true,
    color: "from-teal-400 to-cyan-600",
  },
  {
    slug: "security-tools",
    name: "Security Tools",
    description: "Strong password generators, password strength analyzers, MD5/SHA256 hash generators, and Base64 encoders.",
    icon: "ShieldCheck",
    featured: true,
    color: "from-slate-700 to-zinc-900",
  },
  {
    slug: "image-tools",
    name: "Image Tools",
    description: "QR code generators, barcode makers, image resizers, SVG to PNG converters, and YouTube thumbnail extractors.",
    icon: "Image",
    featured: true,
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    slug: "css-tools",
    name: "CSS & Design Tools",
    description: "CSS gradient builders, box shadow creators, flexbox visualizers, clip path generators, and color palettes.",
    icon: "Palette",
    featured: true,
    color: "from-pink-500 to-purple-600",
  },
  {
    slug: "productivity-tools",
    name: "Productivity Tools",
    description: "Pomodoro focus timer, hashtag generators, and random number utilities to boost workflow efficiency.",
    icon: "Zap",
    featured: true,
    color: "from-yellow-500 to-orange-600",
  },
  // Legacy aliases for backward compatibility with existing search engine indexing
  {
    slug: "writing-tools",
    name: "Writing Tools",
    description: "AI writing assistants, email writers, cover letters, and grammar checkers.",
    icon: "PenTool",
    featured: false,
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "unit-converters",
    name: "Unit & Currency Converters",
    description: "Fast unit converters for length, mass, temperature, speed, and currency.",
    icon: "ArrowLeftRight",
    featured: false,
    color: "from-teal-500 to-emerald-600",
  },
  {
    slug: "math-tools",
    name: "Math & Scientific Calculators",
    description: "Scientific calculators, percentage calculators, and fraction simplifiers.",
    icon: "Calculator",
    featured: false,
    color: "from-blue-600 to-indigo-800",
  },
  {
    slug: "finance-tools",
    name: "Finance & Loan Calculators",
    description: "EMI calculators, compound interest calculators, and GST tax tools.",
    icon: "DollarSign",
    featured: false,
    color: "from-green-500 to-emerald-700",
  },
  {
    slug: "health-calculators",
    name: "Health & Fitness Calculators",
    description: "BMI, TDEE daily calorie estimators, and age calculators.",
    icon: "HeartPulse",
    featured: false,
    color: "from-rose-400 to-red-600",
  },
  {
    slug: "social-media-tools",
    name: "Social Media Tools",
    description: "Hashtag generators, Twitter character limits, and social image tools.",
    icon: "Share2",
    featured: false,
    color: "from-sky-400 to-blue-600",
  },
];

// Mapping for legacy URL aliases so no existing URLs fail
const CATEGORY_ALIAS_MAP: Record<string, string[]> = {
  "writing-tools": ["email-writer", "cover-letter-generator", "grammar-checker", "blog-intro-generator", "social-bio-writer", "resume-builder"],
  "unit-converters": ["unit-converter", "length-converter", "weight-converter", "temperature-converter", "speed-converter", "currency-converter", "roman-numerals-converter", "binary-converter", "hex-to-rgb-converter", "em-to-px-converter", "px-to-rem-converter", "time-zone-converter", "time-zone-converter-pro"],
  "math-tools": ["percentage-calculator", "scientific-calculator", "fraction-calculator", "aspect-ratio-calculator", "compound-interest-calculator", "gpa-calculator"],
  "finance-tools": ["emi-calculator", "loan-calculator", "loan-payoff-calculator", "compound-interest-calculator", "sales-tax-calculator", "gst-tax-calculator", "discount-calculator", "tip-calculator"],
  "health-calculators": ["bmi-calculator", "calorie-calculator", "age-calculator"],
  "social-media-tools": ["social-bio-writer", "twitter-character-counter", "hashtag-generator", "social-hashtag-generator", "social-image-resizer", "open-graph-generator", "youtube-thumbnail-downloader"],
};

export function getToolsForCategory(categorySlug: string, allTools: any[]) {
  // If it's a legacy alias, return its specific tools
  if (CATEGORY_ALIAS_MAP[categorySlug]) {
    const slugs = CATEGORY_ALIAS_MAP[categorySlug];
    return allTools.filter((t) => slugs.includes(t.slug));
  }
  // Otherwise, exact direct match with the tool's primary category
  return allTools.filter((t) => t.category === categorySlug);
}
