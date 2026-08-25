import { notFound } from "next/navigation";
import { TOOLS } from "@/config/tools.registry";
import { ToolWrapper } from "@/components/tools/ToolWrapper";
import { UniversalToolRunner } from "@/components/tools/UniversalToolRunner";
import { constructMetadata } from "@/lib/seo";

// AI & Writing Suite
import { AiHumanizer } from "@/components/tools/ai/AiHumanizer";
import { AiDetector } from "@/components/tools/ai/AiDetector";
import { PromptGenerator } from "@/components/tools/ai/PromptGenerator";
import { ResumeBuilder } from "@/components/tools/ai/ResumeBuilder";
import { EmailWriter } from "@/components/tools/ai/EmailWriter";
import { AiStoryGenerator } from "@/components/tools/ai/AiStoryGenerator";
import { AiChatAssistant } from "@/components/tools/ai/AiChatAssistant";
import { CoverLetterGenerator } from "@/components/tools/ai/CoverLetterGenerator";
import { GrammarChecker } from "@/components/tools/ai/GrammarChecker";
import { BlogIntroGenerator } from "@/components/tools/ai/BlogIntroGenerator";
import { SocialBioWriter } from "@/components/tools/ai/SocialBioWriter";
import { AiImageGenerator } from "@/components/tools/ai/AiImageGenerator";
import { AiVideoGenerator } from "@/components/tools/ai/AiVideoGenerator";

// SEO Suite
import { MetaTagGenerator } from "@/components/tools/seo/MetaTagGenerator";
import { SchemaGenerator } from "@/components/tools/seo/SchemaGenerator";
import { RobotsGenerator } from "@/components/tools/seo/RobotsGenerator";
import { SitemapGenerator } from "@/components/tools/seo/SitemapGenerator";
import { KeywordDensityChecker } from "@/components/tools/seo/KeywordDensityChecker";
import { OpenGraphGenerator } from "@/components/tools/seo/OpenGraphGenerator";
import { UtmBuilder } from "@/components/tools/seo/UtmBuilder";

// Text Suite
import { WordCounter } from "@/components/tools/text/WordCounter";
import { CaseConverter } from "@/components/tools/text/CaseConverter";
import { TextRewriter } from "@/components/tools/text/TextRewriter";
import { SlugGenerator } from "@/components/tools/text/SlugGenerator";
import { LoremIpsumGenerator } from "@/components/tools/text/LoremIpsumGenerator";
import { MarkdownEditor } from "@/components/tools/text/MarkdownEditor";

// Developer Suite
import { JsonFormatter } from "@/components/tools/dev/JsonFormatter";
import { Base64Encoder } from "@/components/tools/dev/Base64Encoder";
import { HashGenerator } from "@/components/tools/dev/HashGenerator";
import { UuidGenerator } from "@/components/tools/dev/UuidGenerator";
import { HtmlFormatter } from "@/components/tools/dev/HtmlFormatter";
import { RegexTester } from "@/components/tools/dev/RegexTester";
import { PasswordGenerator } from "@/components/tools/dev/PasswordGenerator";
import { JwtDecoder } from "@/components/tools/dev/JwtDecoder";
import { CssGradientGenerator } from "@/components/tools/dev/CssGradientGenerator";

// Image Suite
import { QrGenerator } from "@/components/tools/image/QrGenerator";
import { BarcodeGenerator } from "@/components/tools/image/BarcodeGenerator";
import { ColorPicker } from "@/components/tools/image/ColorPicker";
import { ImageResizer } from "@/components/tools/image/ImageResizer";

// Math, Finance & Health Suite
import { BmiCalculator } from "@/components/tools/math/BmiCalculator";
import { AgeCalculator } from "@/components/tools/math/AgeCalculator";
import { EmiCalculator } from "@/components/tools/math/EmiCalculator";
import { PercentageCalculator } from "@/components/tools/math/PercentageCalculator";
import { ScientificCalculator } from "@/components/tools/math/ScientificCalculator";
import { CompoundInterestCalculator } from "@/components/tools/math/CompoundInterestCalculator";
import { PomodoroTimer } from "@/components/tools/math/PomodoroTimer";

// Unit & Converters
import { UnitConverter } from "@/components/tools/unit/UnitConverter";
import { siteConfig } from "@/config/site.config";

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// Custom per-tool SEO overrides for top Google rankings
const CUSTOM_METADATA: Record<string, { title: string; description: string; keywords: string }> = {
  "ai-video-generator": {
    title: "Free AI Video Generator — Text to Video Online, No Signup | Toolifia",
    description: "Generate real AI videos from text prompts for free. Higgsfield-style cinematic videos using Kling 2.1, Wan, & MiniMax. No signup, no watermark, no credit card. Download MP4. Best free alternative to Runway ML, Pika Labs & Sora.",
    keywords: "ai video generator free, text to video AI free, higgsfield alternative free, free ai video generator no watermark, runway ml free alternative, pika labs alternative, sora alternative free, kling ai free, make ai video online, ai video maker no signup"
  },
  "ai-image-generator": {
    title: "Free AI Image Generator — Text to Image Online, No Signup | Toolifia",
    description: "Generate stunning 8K AI images from text prompts for free. Photorealistic, anime, cyberpunk, 3D Pixar styles. Best free Midjourney & DALL-E alternative. No account, no limits, instant results.",
    keywords: "ai image generator free, text to image AI, midjourney alternative free, dall-e alternative, stable diffusion online free, ai art generator, generate image from text"
  },
  "ai-humanizer": {
    title: "Free AI Text Humanizer — Bypass AI Detectors Instantly | Toolifia",
    description: "Humanize AI text and bypass AI detectors for free. Transform ChatGPT, Claude & Gemini text into undetectable human writing. No signup required. Works on GPTZero, Turnitin & Originality.ai.",
    keywords: "ai humanizer free, bypass ai detector, humanize chatgpt, make ai text human, undetectable ai, ai content humanizer"
  },
  "ai-detector": {
    title: "Free AI Content Detector — Detect ChatGPT & AI Writing Instantly | Toolifia",
    description: "Detect AI-generated content for free. Check if text was written by ChatGPT, Claude, or Gemini. Works with GPTZero, Turnitin & Originality.ai detection methods. No signup required.",
    keywords: "ai content detector free, detect chatgpt writing, ai detector no signup, chatgpt detector, ai writing detector, gptzero alternative free"
  },
  "json-formatter": {
    title: "Free JSON Formatter & Validator Online — Pretty Print JSON | Toolifia",
    description: "Format, validate, and pretty-print JSON online for free. Instant JSON formatter with syntax highlighting, error detection, and minification. No account required.",
    keywords: "json formatter online free, json validator, pretty print json, json beautifier, format json online, json minifier"
  },
  "meta-tag-generator": {
    title: "Free Meta Tag Generator — SEO Title, Description & Open Graph Builder | Toolifia",
    description: "Generate perfect HTML meta tags for SEO. Build meta title, meta description, robots, canonical tags, and Open Graph cards with live SERP preview. 100% free online tool.",
    keywords: "meta tag generator free, seo meta tags, title tag generator, meta description generator, open graph generator, twitter card generator, serp title and description generator"
  },
  "meta-title-length-checker": {
    title: "Free Meta Title & Description Length Checker — Google SERP Preview | Toolifia",
    description: "Check meta title and description character length & pixel width for Google SERP. Live search snippet preview, pixel counter, and truncation warnings. 100% free, no signup.",
    keywords: "meta title checker, meta description length, meta description length checker, meta title and description checker, meta desc checker, meta description checker, meta title length checker, meta title length check, meta title length, check meta description length, seo title length checker, length of meta title, meta description length check, meta title check, seo meta description length, meta description check, meta length, meta description character count"
  },
  "keyword-density-checker": {
    title: "Free Keyword Density Analyzer Tool — Check Keyword Frequency Online | Toolifia",
    description: "Analyze keyword density, frequency ratios, and 1/2/3-word n-grams online for free. Prevent keyword stuffing and optimize for Google SEO algorithms. No signup required.",
    keywords: "keyword density tool, keyword density analyzer tool, keyword density, keyword density analysis tool, keyword density analysis, keyword density analyzer, analyze keyword density, keyword density tool seo, keyword density tools, measure keyword density, best keyword density, tool keyword density, keyword density checker tools, best keyword density tool, keyword density for seo, keywords density analyzer, keyword density check, best keyword density checker, keywords density analysis"
  },
  "open-graph-validator": {
    title: "Free Open Graph (OG) Tag Validator — Social Media Preview Checker | Toolifia",
    description: "Validate and preview Open Graph (og:title, og:description, og:image) meta tags for Facebook, Twitter/X, LinkedIn, and Discord. Free social snippet debugger.",
    keywords: "opengraph tag validator, og validator, open graph meta tags generator, og tag checker, social media preview validator"
  },
  "open-graph-generator": {
    title: "Free Open Graph Meta Tag Generator — Create Social Share Cards | Toolifia",
    description: "Generate social media meta tags (og:title, og:description, og:image, twitter:card) for Facebook, Twitter/X, LinkedIn, and Discord. Instant copy & paste.",
    keywords: "open graph meta tags generator, og generator, social meta tag generator, open graph tags maker"
  },
  "ai-story-generator": {
    title: "Free AI Story & Plot Generator — Write Creative Stories Online | Toolifia",
    description: "Generate creative story plots, characters, twists, and complete novel chapters using free AI. Best free plot and storyline generator with no signup.",
    keywords: "ai plot generator, story plot generator ai, storyline generator, ai story plot, plot generator toolbaz, online story plot generator, ai story generator free"
  },
  "regex-tester": {
    title: "Free Regex Tester & Regular Expression Validator Online | Toolifia",
    description: "Test and debug regular expressions in real-time with instant match highlighting, explanation breakdown, and cheat sheet. 100% free developer tool.",
    keywords: "regex tester online free, regex validator, test regex online, regular expression checker, regex pattern tester"
  },
  "htpasswd-generator": {
    title: "Free Htpasswd Generator Online — Apache & Nginx Basic Auth | Toolifia",
    description: "Generate secure htpasswd passwords using Bcrypt, MD5 (APR1), and SHA-1 for Apache and Nginx HTTP basic authentication. 100% free in-browser generation.",
    keywords: "htpasswd generator, htaccess htpasswd generator, generate htpasswd, apache htpasswd online, basic auth generator"
  },
  "password-generator": {
    title: "Free Random Password Generator — Strong & Secure Passwords | Toolifia",
    description: "Generate strong, secure random passwords instantly. Customize length, include symbols, numbers, uppercase. 100% free, generated locally in your browser — never stored.",
    keywords: "password generator free, random password generator, strong password generator, secure password maker, online password generator"
  },
  "bmi-calculator": {
    title: "Free BMI Calculator Online — Body Mass Index Calculator | Toolifia",
    description: "Calculate your BMI (Body Mass Index) instantly for free. Supports metric (kg/cm) and imperial (lb/in) units. Instant results with weight category classification.",
    keywords: "bmi calculator free, body mass index calculator, bmi calculator online, calculate bmi, bmi checker"
  },
  "word-counter": {
    title: "Free Word Counter & Twitter Character Limit Counter Online | Toolifia",
    description: "Count words, characters, sentences, paragraphs, reading time, and Twitter/X character limits in real-time. Free, instant, offline-capable in your browser.",
    keywords: "word counter online free, character counter, twitter counter, tweet character counter, twitter character counter, character counter twitter, count characters for twitter, word count tool, sentence counter, reading time calculator"
  },
  "qr-generator": {
    title: "Free QR Code Generator Online — Download PNG & SVG | Toolifia",
    description: "Generate QR codes for URLs, text, email, and phone numbers instantly for free. Download as PNG or SVG. No account or signup required.",
    keywords: "qr code generator free, qr code maker online, free qr code, generate qr code, qr code creator"
  },
  "uuid-generator": {
    title: "Free UUID / GUID Generator Online — v4 UUID Bulk Generator | Toolifia",
    description: "Generate UUID v4 identifiers instantly for free. Bulk generate multiple UUIDs, copy to clipboard. No account required. Used by developers for database IDs.",
    keywords: "uuid generator free, guid generator online, uuid v4 generator, random uuid, bulk uuid generator"
  },
  "schema-generator": {
    title: "Free JSON-LD Schema Generator — JSON-LD Builder & Markup Tool | Toolifia",
    description: "Generate valid JSON-LD structured data schemas for free. Build Schema.org markup for Articles, FAQs, Products, Breadcrumbs, Reviews, Events, Local Business & more. Instantly copy the LD+JSON code. Best free json-ld generator, no signup needed.",
    keywords: "json-ld generator, json-ld schema generator, ld json schema generator, json-ld builder, json-ld code generator, json ld generator, schema generator free, json-ld schema guide, ld json schema ai, schema markup generator, structured data generator, schema.org generator, json ld maker online"
  },
  "resume-builder": {
    title: "Free AI Resume Builder — ATS Resume Builder for Students & Pros | Toolifia",
    description: "Build ATS-optimized AI resumes for free. Solve formatting challenges for MIS students and job seekers. Generate bullet points, skills & summaries. No signup needed.",
    keywords: "ai resume builder free, mis students resume builder, ats resume generator, ai resume writer, free resume builder online"
  },
  "markdown-editor": {
    title: "Free Markdown Editor Online — Real-Time Live Preview | Toolifia",
    description: "Write and preview Markdown online for free. Solve cross-platform editor formatting problems. Instant export to HTML & MD. 100% free in your browser.",
    keywords: "markdown editor online free, live markdown preview, cross-platform markdown editor, markdown writer, online md editor"
  },
  "loan-calculator": {
    title: "Free EMI & Loan Calculator — Accurate Repayment Schedule | Toolifia",
    description: "Calculate monthly loan EMIs, interest rates & full repayment schedules instantly. Solve common calculator errors. 100% free online EMI tool.",
    keywords: "loan calculator free, emi calculator online, emi calculator problems, loan interest calculator, calculate emi free"
  }
};


export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const tool = TOOLS.find((t) => t.slug === params.slug);
  if (!tool) return constructMetadata();

  const custom = CUSTOM_METADATA[params.slug];

  return constructMetadata({
    title: custom?.title || `${tool.name} — Free Online, No Signup | ${siteConfig.name}`,
    description: custom?.description || `Use ${tool.name} free online. No signup required. ${tool.description} Fast, instant, and 100% free on Toolifia.`,
    canonicalUrl: `${siteConfig.url}/tool/${tool.slug}`,
    ...(custom?.keywords ? { keywords: custom.keywords } : {}),
  });
}


const TOOL_COMPONENTS: Record<string, React.ComponentType<{ tool?: any }>> = {
  "ai-image-generator": AiImageGenerator,
  "ai-video-generator": AiVideoGenerator,
  "ai-humanizer": AiHumanizer,
  "ai-detector": AiDetector,
  "prompt-generator": PromptGenerator,
  "resume-builder": ResumeBuilder,
  "email-writer": EmailWriter,
  "ai-story-generator": AiStoryGenerator,
  "ai-chat-assistant": AiChatAssistant,
  "cover-letter-generator": CoverLetterGenerator,
  "grammar-checker": GrammarChecker,
  "blog-intro-generator": BlogIntroGenerator,
  "social-bio-writer": SocialBioWriter,
  "meta-tag-generator": MetaTagGenerator,
  "schema-generator": SchemaGenerator,
  "robots-generator": RobotsGenerator,
  "sitemap-generator": SitemapGenerator,
  "keyword-density-checker": KeywordDensityChecker,
  "open-graph-generator": OpenGraphGenerator,
  "utm-builder": UtmBuilder,
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "text-rewriter": TextRewriter,
  "slug-generator": SlugGenerator,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "markdown-editor": MarkdownEditor,
  "json-formatter": JsonFormatter,
  "base64-encoder": Base64Encoder,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "html-formatter": HtmlFormatter,
  "regex-tester": RegexTester,
  "password-generator": PasswordGenerator,
  "password-strength-checker": PasswordGenerator,
  "password-generator-random": PasswordGenerator,
  "jwt-decoder": JwtDecoder,
  "css-gradient-generator": CssGradientGenerator,
  "qr-generator": QrGenerator,
  "barcode-generator": BarcodeGenerator,
  "color-picker": ColorPicker,
  "image-resizer": ImageResizer,
  "bmi-calculator": BmiCalculator,
  "age-calculator": AgeCalculator,
  "emi-calculator": EmiCalculator,
  "percentage-calculator": PercentageCalculator,
  "scientific-calculator": ScientificCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "pomodoro-timer": PomodoroTimer,
  "unit-converter": UnitConverter,
};

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const tool = TOOLS.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const SpecificComponent = TOOL_COMPONENTS[tool.slug];

  return (
    <ToolWrapper tool={tool}>
      {SpecificComponent ? <SpecificComponent /> : <UniversalToolRunner tool={tool} />}
    </ToolWrapper>
  );
}
