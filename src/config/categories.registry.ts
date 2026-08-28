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
    description: "Next-gen AI utilities for text humanizing, detection, prompt optimization, and writing assistance.",
    icon: "Sparkles",
    featured: true,
    color: "from-purple-500 to-indigo-600",
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    description: "Technical SEO utilities, schema generators, robot.txt tools, and meta tag analyzers.",
    icon: "Search",
    featured: true,
    color: "from-blue-500 to-cyan-600",
  },
  {
    slug: "text-tools",
    name: "Text Tools",
    description: "Text formatting, case manipulation, word counters, slug generators, and rewriters.",
    icon: "FileText",
    featured: true,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "writing-tools",
    name: "Writing Tools",
    description: "Grammar tools, paraphrasers, email writers, cover letters, and article generators.",
    icon: "PenTool",
    featured: true,
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Essential utilities for programmers, formatters, validators, and code generators.",
    icon: "Code",
    featured: true,
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "json-tools",
    name: "JSON Tools",
    description: "JSON formatting, validation, beautifiers, and minifiers.",
    icon: "Braces",
    featured: true,
    color: "from-yellow-500 to-amber-600",
  },
  {
    slug: "html-tools",
    name: "HTML Tools",
    description: "HTML formatters, clean code utilities, and markup generators.",
    icon: "Code2",
    featured: false,
    color: "from-orange-500 to-red-600",
  },
  {
    slug: "css-tools",
    name: "CSS Tools",
    description: "Gradient generators, CSS beautifiers, minifiers, and styling generators.",
    icon: "Palette",
    featured: false,
    color: "from-sky-500 to-blue-600",
  },
  {
    slug: "javascript-tools",
    name: "JavaScript Tools",
    description: "JS formatters, obfuscators, minifiers, and playground helpers.",
    icon: "Terminal",
    featured: false,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    slug: "xml-tools",
    name: "XML Tools",
    description: "XML sitemaps, XML to JSON, and document formatters.",
    icon: "FileCode",
    featured: false,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    slug: "programming-tools",
    name: "Programming Tools",
    description: "Regex testers, diff checkers, and algorithm helpers.",
    icon: "Cpu",
    featured: false,
    color: "from-cyan-500 to-blue-700",
  },
  {
    slug: "color-tools",
    name: "Color Tools",
    description: "Color pickers, palette generators, HEX/RGB converters, and gradient design tools.",
    icon: "Droplet",
    featured: true,
    color: "from-pink-500 to-purple-600",
  },
  {
    slug: "image-tools",
    name: "Image Tools",
    description: "Image resizers, canvas converters, QR code generators, and color tools.",
    icon: "Image",
    featured: true,
    color: "from-violet-500 to-fuchsia-600",
  },
  {
    slug: "pdf-tools",
    name: "PDF Tools",
    description: "Utilities for viewing, splitting, merging, and converting document formats.",
    icon: "FileUp",
    featured: true,
    color: "from-red-500 to-rose-600",
  },
  {
    slug: "finance-tools",
    name: "Finance Tools",
    description: "EMI calculators, interest calculators, and investment estimators.",
    icon: "DollarSign",
    featured: true,
    color: "from-green-500 to-emerald-700",
  },
  {
    // calculator-tools is used by many tools in tools.registry.ts — this slug MUST be present
    slug: "calculator-tools",
    name: "Calculators",
    description: "Free online calculators for BMI, loans, EMI, percentages, age, GPA, compound interest, and more. Get instant results with no signup.",
    icon: "Calculator",
    featured: true,
    color: "from-orange-500 to-amber-600",
  },
  {
    slug: "math-tools",
    name: "Math Tools",
    description: "Scientific calculators, percentage calculators, and equation solvers.",
    icon: "Calculator",
    featured: true,
    color: "from-blue-600 to-indigo-800",
  },
  {
    slug: "health-calculators",
    name: "Health Calculators",
    description: "BMI calculators, calorie estimators, and age calculators.",
    icon: "HeartPulse",
    featured: true,
    color: "from-rose-400 to-red-600",
  },
  {
    slug: "unit-converters",
    name: "Unit Converters",
    description: "Convert length, mass, temperature, area, speed, and digital storage units.",
    icon: "ArrowLeftRight",
    featured: true,
    color: "from-teal-400 to-cyan-600",
  },
  {
    slug: "security-tools",
    name: "Security Tools",
    description: "Strong password generators, hash checkers, and security validators.",
    icon: "ShieldCheck",
    featured: true,
    color: "from-slate-700 to-zinc-900",
  },
  {
    slug: "hash-tools",
    name: "Hash Tools",
    description: "MD5, SHA-1, SHA-256, and SHA-512 cryptographic generators.",
    icon: "Lock",
    featured: false,
    color: "from-zinc-600 to-neutral-800",
  },
  {
    slug: "encoding-tools",
    name: "Encoding Tools",
    description: "Base64 encode/decode, URL encoding, HTML entity converters.",
    icon: "Binary",
    featured: false,
    color: "from-blue-700 to-indigo-900",
  },
  {
    slug: "generators",
    name: "Generators",
    description: "Lorem Ipsum, UUID generators, QR codes, and random text tools.",
    icon: "Wand2",
    featured: true,
    color: "from-amber-400 to-yellow-600",
  },
  {
    slug: "random-tools",
    name: "Random Tools",
    description: "Random numbers, random strings, coin flippers, and decision helpers.",
    icon: "Dices",
    featured: false,
    color: "from-indigo-500 to-purple-700",
  },
  {
    slug: "utility-tools",
    name: "Utility Tools",
    description: "Handy web utilities for daily tasks, conversions, and checks.",
    icon: "Wrench",
    featured: false,
    color: "from-gray-500 to-slate-700",
  },
  {
    slug: "social-media-tools",
    name: "Social Media Tools",
    description: "Hashtag generators, caption creators, and profile bio formatters.",
    icon: "Share2",
    featured: false,
    color: "from-sky-400 to-blue-600",
  },
  {
    slug: "productivity-tools",
    name: "Productivity Tools",
    description: "Reading time calculators, stopwatch tools, and work planners.",
    icon: "Zap",
    featured: false,
    color: "from-yellow-500 to-orange-600",
  },
  {
    slug: "student-tools",
    name: "Student Tools",
    description: "GPA calculators, citation helpers, and essay layout checkers.",
    icon: "GraduationCap",
    featured: false,
    color: "from-purple-600 to-indigo-800",
  },
  {
    slug: "business-tools",
    name: "Business Tools",
    description: "Invoice generators, ROI calculators, and business template tools.",
    icon: "Briefcase",
    featured: false,
    color: "from-blue-800 to-slate-900",
  },
  {
    slug: "marketing-tools",
    name: "Marketing Tools",
    description: "UTM builders, conversion estimators, and headline analyzers.",
    icon: "TrendingUp",
    featured: false,
    color: "from-emerald-600 to-teal-800",
  },
  {
    slug: "resume-tools",
    name: "Resume Tools",
    description: "Professional AI resume builders and cover letter generators.",
    icon: "FileBadge",
    featured: true,
    color: "from-cyan-600 to-blue-800",
  },
  {
    slug: "scientific-calculators",
    name: "Scientific Calculators",
    description: "Advanced trigonometry, logarithmic functions, and scientific math.",
    icon: "Atom",
    featured: false,
    color: "from-violet-700 to-purple-900",
  },
  {
    slug: "legal-templates",
    name: "Legal Templates",
    description: "Privacy policy generators, terms of service tools, and disclaimer builders.",
    icon: "Scale",
    featured: false,
    color: "from-amber-700 to-yellow-900",
  },
  {
    slug: "video-tools",
    name: "Video Tools",
    description: "AI video generation, cinematic motion clips, thumbnail downloaders, and video script writing.",
    icon: "Video",
    featured: true,
    color: "from-red-600 to-rose-700",
  },
  {
    slug: "audio-tools",
    name: "Audio Tools",
    description: "Speech to text, text to speech, and sound frequency utilities.",
    icon: "Headphones",
    featured: false,
    color: "from-indigo-600 to-purple-700",
  },
];

// ── Smart Category-to-Tool Mapping (ensures ZERO empty categories across the platform) ──
export const CATEGORY_TOOL_MAP: Record<string, string[]> = {
  "ai-tools": [
    "ai-image-generator", "ai-video-generator", "ai-humanizer", "ai-detector", "prompt-generator",
    "ai-story-generator", "ai-chat-assistant", "ai-summarizer", "ai-headline-generator",
    "text-to-speech", "resume-builder", "email-writer", "cover-letter-generator", "grammar-checker",
    "blog-intro-generator", "social-bio-writer"
  ],
  "seo-tools": [
    "meta-tag-generator", "schema-generator", "robots-generator", "sitemap-generator",
    "keyword-density-checker", "open-graph-generator", "open-graph-validator", "utm-builder",
    "meta-title-length-checker", "meta-title-pixel-checker", "xml-sitemap-validator",
    "subdomain-finder", "dns-lookup-tool"
  ],
  "text-tools": [
    "word-counter", "case-converter", "text-rewriter", "slug-generator", "lorem-ipsum-generator",
    "markdown-editor", "reading-time-calculator", "readability-score-checker", "character-frequency-counter",
    "string-utilities", "twitter-character-counter", "note-taking-tool", "url-slug-generator",
    "citation-generator", "diff-checker", "text-diff-checker"
  ],
  "writing-tools": [
    "email-writer", "cover-letter-generator", "grammar-checker", "blog-intro-generator",
    "social-bio-writer", "citation-generator", "resume-builder", "ai-story-generator",
    "ai-humanizer", "text-rewriter", "markdown-editor"
  ],
  "developer-tools": [
    "json-formatter", "base64-encoder", "hash-generator", "uuid-generator", "html-formatter",
    "regex-tester", "jwt-decoder", "css-gradient-generator", "css-minifier", "js-minifier",
    "html-minifier", "html-entity-encoder", "url-encoder", "csv-to-json", "json-to-csv",
    "json-to-yaml", "yaml-to-json", "html-to-markdown", "markdown-to-html-converter",
    "sql-formatter", "diff-checker", "curl-to-fetch", "cron-job-parser", "htpasswd-generator",
    "user-agent-parser", "dns-lookup-tool", "subdomain-finder", "ip-lookup",
    "xml-formatter-beautifier", "regex-pattern-library", "color-palette-generator"
  ],
  "json-tools": [
    "json-formatter", "json-to-csv", "json-to-yaml", "csv-to-json", "yaml-to-json", "jwt-decoder"
  ],
  "html-tools": [
    "html-formatter", "html-minifier", "html-entity-encoder", "html-entity-encoder-decoder",
    "html-to-markdown", "markdown-to-html-converter", "meta-tag-generator"
  ],
  "css-tools": [
    "css-gradient-generator", "css-minifier", "css-box-shadow-generator", "css-flexbox-generator",
    "css-clip-path-generator", "gradient-generator", "color-picker", "color-palette-generator",
    "em-to-px-converter", "px-to-rem-converter"
  ],
  "javascript-tools": [
    "js-minifier", "js-formatter", "json-formatter", "jwt-decoder", "curl-to-fetch", "regex-tester"
  ],
  "xml-tools": [
    "xml-formatter-beautifier", "xml-sitemap-validator", "csv-to-xml-converter", "sitemap-generator"
  ],
  "programming-tools": [
    "regex-tester", "regex-pattern-library", "diff-checker", "text-diff-checker", "curl-to-fetch",
    "sql-formatter", "sql-beautifier-formatter", "cron-job-parser", "cron-expression-generator",
    "uuid-generator", "base64-encoder", "hash-generator", "user-agent-parser"
  ],
  "color-tools": [
    "color-picker", "image-color-picker", "color-palette-generator", "hex-to-rgb-converter",
    "gradient-generator", "css-gradient-generator"
  ],
  "image-tools": [
    "qr-generator", "barcode-generator", "color-picker", "image-resizer", "svg-to-png-converter",
    "social-image-resizer", "image-color-picker", "youtube-thumbnail-downloader",
    "favicon-generator", "aspect-ratio-calculator"
  ],
  "pdf-tools": [
    "markdown-editor", "markdown-to-html-converter", "html-to-markdown", "note-taking-tool",
    "resume-builder", "citation-generator"
  ],
  "finance-tools": [
    "emi-calculator", "compound-interest-calculator", "loan-calculator", "loan-payoff-calculator",
    "sales-tax-calculator", "gst-tax-calculator", "discount-calculator", "tip-calculator",
    "currency-converter", "percentage-calculator"
  ],
  "calculator-tools": [
    "bmi-calculator", "age-calculator", "emi-calculator", "percentage-calculator",
    "scientific-calculator", "compound-interest-calculator", "tip-calculator",
    "aspect-ratio-calculator", "loan-calculator", "discount-calculator", "gpa-calculator",
    "calorie-calculator", "fraction-calculator", "sales-tax-calculator", "gst-tax-calculator",
    "loan-payoff-calculator", "chmod-calculator"
  ],
  "math-tools": [
    "percentage-calculator", "scientific-calculator", "fraction-calculator",
    "aspect-ratio-calculator", "compound-interest-calculator", "random-number-generator",
    "binary-converter", "roman-numerals-converter"
  ],
  "health-calculators": [
    "bmi-calculator", "calorie-calculator", "age-calculator"
  ],
  "unit-converters": [
    "unit-converter", "temperature-converter", "length-converter", "weight-converter",
    "speed-converter", "roman-numerals-converter", "binary-converter", "hex-to-rgb-converter",
    "currency-converter", "em-to-px-converter", "px-to-rem-converter", "time-zone-converter",
    "time-zone-converter-pro"
  ],
  "converter-tools": [
    "unit-converter", "temperature-converter", "length-converter", "weight-converter",
    "speed-converter", "roman-numerals-converter", "binary-converter", "hex-to-rgb-converter",
    "currency-converter", "em-to-px-converter", "px-to-rem-converter", "time-zone-converter",
    "time-zone-converter-pro"
  ],
  "security-tools": [
    "password-generator", "password-strength-checker", "password-generator-random",
    "hash-generator", "htpasswd-generator", "jwt-decoder", "base64-encoder"
  ],
  "hash-tools": [
    "hash-generator", "htpasswd-generator", "base64-encoder", "jwt-decoder"
  ],
  "encoding-tools": [
    "base64-encoder", "url-encoder", "html-entity-encoder", "html-entity-encoder-decoder",
    "binary-converter", "hex-to-rgb-converter"
  ],
  "generators": [
    "lorem-ipsum-generator", "uuid-generator", "password-generator", "qr-generator",
    "barcode-generator", "color-palette-generator", "gradient-generator", "random-number-generator",
    "favicon-generator", "prompt-generator", "hashtag-generator"
  ],
  "generator-tools": [
    "lorem-ipsum-generator", "uuid-generator", "password-generator", "qr-generator",
    "barcode-generator", "color-palette-generator", "gradient-generator", "random-number-generator",
    "favicon-generator", "prompt-generator", "hashtag-generator"
  ],
  "random-tools": [
    "random-number-generator", "password-generator-random", "uuid-generator", "lorem-ipsum-generator"
  ],
  "utility-tools": [
    "pomodoro-timer", "time-zone-converter", "time-zone-converter-pro", "note-taking-tool",
    "user-agent-parser", "ip-lookup", "dns-lookup-tool", "subdomain-finder"
  ],
  "social-media-tools": [
    "social-bio-writer", "twitter-character-counter", "hashtag-generator",
    "social-hashtag-generator", "social-image-resizer", "open-graph-generator",
    "open-graph-validator", "youtube-thumbnail-downloader"
  ],
  "productivity-tools": [
    "pomodoro-timer", "note-taking-tool", "reading-time-calculator", "word-counter",
    "time-zone-converter", "time-zone-converter-pro", "markdown-editor"
  ],
  "student-tools": [
    "gpa-calculator", "citation-generator", "readability-score-checker", "fraction-calculator",
    "scientific-calculator", "resume-builder", "word-counter", "grammar-checker"
  ],
  "business-tools": [
    "gst-tax-calculator", "sales-tax-calculator", "loan-calculator", "emi-calculator",
    "discount-calculator", "cover-letter-generator", "email-writer", "utm-builder"
  ],
  "marketing-tools": [
    "utm-builder", "hashtag-generator", "meta-tag-generator", "open-graph-generator",
    "meta-title-length-checker", "ai-headline-generator", "social-image-resizer", "social-bio-writer"
  ],
  "resume-tools": [
    "resume-builder", "cover-letter-generator", "social-bio-writer", "grammar-checker"
  ],
  "scientific-calculators": [
    "scientific-calculator", "fraction-calculator", "binary-converter",
    "aspect-ratio-calculator", "calorie-calculator"
  ],
  "legal-templates": [
    "schema-generator", "robots-generator", "sitemap-generator"
  ],
  "video-tools": [
    "ai-video-generator", "youtube-thumbnail-downloader", "aspect-ratio-calculator", "social-image-resizer"
  ],
  "audio-tools": [
    "text-to-speech", "pomodoro-timer", "reading-time-calculator"
  ],
};

/**
 * Returns all tools belonging directly or via taxonomy mapping to the specified category.
 */
export function getToolsForCategory(categorySlug: string, allTools: any[]) {
  const mappedSlugs = CATEGORY_TOOL_MAP[categorySlug] || [];
  return allTools.filter(
    (t) => t.category === categorySlug || mappedSlugs.includes(t.slug)
  );
}

