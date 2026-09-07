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
import { CssMinifier } from "@/components/tools/dev/CssMinifier";
import { JsMinifier } from "@/components/tools/dev/JsMinifier";
import { HtmlMinifier } from "@/components/tools/dev/HtmlMinifier";
import { HtmlEntityEncoder } from "@/components/tools/dev/HtmlEntityEncoder";
import { UrlEncoder } from "@/components/tools/dev/UrlEncoder";
import { CsvToJson } from "@/components/tools/dev/CsvToJson";
import { JsonToCsv } from "@/components/tools/dev/JsonToCsv";
import { JsonToYaml } from "@/components/tools/dev/JsonToYaml";
import { YamlToJson } from "@/components/tools/dev/YamlToJson";
import { HtmlToMarkdown } from "@/components/tools/dev/HtmlToMarkdown";
import { MarkdownToHtml } from "@/components/tools/dev/MarkdownToHtml";
import { SqlFormatter } from "@/components/tools/dev/SqlFormatter";
import { DiffChecker } from "@/components/tools/dev/DiffChecker";
import { CurlToFetch } from "@/components/tools/dev/CurlToFetch";
import { CronJobParser } from "@/components/tools/dev/CronJobParser";
import { HtpasswdGenerator } from "@/components/tools/dev/HtpasswdGenerator";
import { UserAgentParser } from "@/components/tools/dev/UserAgentParser";
import { DnsLookupTool } from "@/components/tools/dev/DnsLookupTool";
import { SubdomainFinder } from "@/components/tools/dev/SubdomainFinder";
import { IpLookup } from "@/components/tools/dev/IpLookup";

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
import { TipCalculator } from "@/components/tools/math/TipCalculator";
import { AspectRatioCalculator } from "@/components/tools/math/AspectRatioCalculator";
import { LoanCalculator } from "@/components/tools/math/LoanCalculator";
import { DiscountCalculator } from "@/components/tools/math/DiscountCalculator";
import { GpaCalculator } from "@/components/tools/math/GpaCalculator";
import { CalorieCalculator } from "@/components/tools/math/CalorieCalculator";
import { FractionCalculator } from "@/components/tools/math/FractionCalculator";
import { SalesTaxCalculator } from "@/components/tools/math/SalesTaxCalculator";
import { GstTaxCalculator } from "@/components/tools/math/GstTaxCalculator";
import { LoanPayoffCalculator } from "@/components/tools/math/LoanPayoffCalculator";

// Unit & Converters
import { UnitConverter } from "@/components/tools/unit/UnitConverter";
import { TemperatureConverter } from "@/components/tools/unit/TemperatureConverter";
import { LengthConverter } from "@/components/tools/unit/LengthConverter";
import { WeightConverter } from "@/components/tools/unit/WeightConverter";
import { SpeedConverter } from "@/components/tools/unit/SpeedConverter";
import { RomanNumeralsConverter } from "@/components/tools/unit/RomanNumeralsConverter";
import { BinaryConverter } from "@/components/tools/unit/BinaryConverter";
import { HexToRgbConverter } from "@/components/tools/unit/HexToRgbConverter";
import { CurrencyConverter } from "@/components/tools/unit/CurrencyConverter";
import { EmToPxConverter } from "@/components/tools/unit/EmToPxConverter";
import { PxToRemConverter } from "@/components/tools/unit/PxToRemConverter";

// NEW TOOLS
import { AiSummarizer } from "@/components/tools/text/AiSummarizer";
import { AiHeadlineGenerator } from "@/components/tools/text/AiHeadlineGenerator";
import { CitationGenerator } from "@/components/tools/text/CitationGenerator";
import { WordCounter2 } from "@/components/tools/text/WordCounter2";
import { ReadabilityChecker } from "@/components/tools/text/ReadabilityChecker";
import { CharacterFrequencyCounter } from "@/components/tools/text/CharacterFrequencyCounter";
import { StringUtilities } from "@/components/tools/text/StringUtilities";
import { TwitterCharacterCounter } from "@/components/tools/text/TwitterCharacterCounter";
import { NoteTakingTool } from "@/components/tools/text/NoteTakingTool";
import { TextToSpeech } from "@/components/tools/text/TextToSpeech";
import { UrlSlugGenerator } from "@/components/tools/text/UrlSlugGenerator";

import { MetaTitleLengthChecker } from "@/components/tools/seo/MetaTitleLengthChecker";
import { OpenGraphValidator } from "@/components/tools/seo/OpenGraphValidator";
import { HashtagGenerator } from "@/components/tools/seo/HashtagGenerator";
import { GradientGenerator } from "@/components/tools/seo/GradientGenerator";

import { SvgToPng } from "@/components/tools/image/SvgToPng";
import { SocialImageResizer } from "@/components/tools/image/SocialImageResizer";
import { ImageColorPicker } from "@/components/tools/image/ImageColorPicker";
import { YouTubeThumbnailDownloader } from "@/components/tools/image/YouTubeThumbnailDownloader";
import { FaviconGenerator } from "@/components/tools/image/FaviconGenerator";

import { XmlFormatter } from "@/components/tools/dev/XmlFormatter";
import { XmlSitemapValidator } from "@/components/tools/dev/XmlSitemapValidator";
import { CssBoxShadowGenerator } from "@/components/tools/dev/CssBoxShadowGenerator";
import { CssFlexboxGenerator } from "@/components/tools/dev/CssFlexboxGenerator";
import { CssClipPathGenerator } from "@/components/tools/dev/CssClipPathGenerator";
import { ColorPaletteGenerator } from "@/components/tools/dev/ColorPaletteGenerator";
import { RegexPatternLibrary } from "@/components/tools/dev/RegexPatternLibrary";

import { siteConfig } from "@/config/site.config";

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// Custom per-tool SEO overrides for top Google rankings
const CUSTOM_METADATA: Record<string, { title: string; description: string; keywords: string }> = {
  "ai-video-generator": {
    title: "AI Video Generator — Free Online | Toolifia",
    description: "Generate cinematic AI videos from text prompts for free. No signup, no watermark, no credit card. Download MP4 video.",
    keywords: "ai video generator free, text to video AI free, free ai video generator no watermark, kling ai free, make ai video online"
  },
  "ai-image-generator": {
    title: "AI Image Generator — Free Online | Toolifia",
    description: "Generate stunning 8K AI images from text prompts for free. Photorealistic, anime, 3D Pixar styles. No account needed.",
    keywords: "ai image generator free, text to image AI, midjourney alternative free, stable diffusion online free, ai art generator"
  },
  "ai-humanizer": {
    title: "AI Humanizer Free No Sign Up — Humanize AI Text Online | Toolifia",
    description: "Free AI text humanizer with no sign up required. Humanize AI text, rewrite robotic phrasing into natural prose, and improve flow. 100% free online tool.",
    keywords: "ai humanizer free no sign up, ai humanizer without changing text free, how can i humanize ai text for free, ai humanizer for free, ai humanizer free unlimited word count, ai humanizer tool free online"
  },
  "ai-detector": {
    title: "AI Content Detector Free Online — Check ChatGPT Writing | Toolifia",
    description: "Free online AI content detector and humanizer. Analyze text for AI probability, perplexity, and phrasing patterns instantly. Accurate and 100% free with no signup.",
    keywords: "ai content detector free online, ai content detector and humanizer free, what is the best free ai content detector, ai content detector free no sign up, ai content detector tools free"
  },
  "json-formatter": {
    title: "JSON Formatter Online Free — Pretty Print & Beautify JSON | Toolifia",
    description: "Free online JSON formatter, beautifier, and validator with no login required. Format, pretty-print, validate, and minify JSON code instantly in your browser.",
    keywords: "json formatter online free, json formatter free online, json formatter online free no login, how to json format in notepad ++, json beautifier free online"
  },
  "meta-tag-generator": {
    title: "Meta Description & Title Checker Free — SEO Tag Generator | Toolifia",
    description: "Free meta title and description checker & generator. Build HTML meta tags, Open Graph cards, and preview search snippets. 100% free SEO tool.",
    keywords: "meta description length checker free, meta title and description checker free, meta description checker free, title tag and meta description length tools, meta description checker online"
  },
  "meta-title-length-checker": {
    title: "Meta Title Length Checker Online Free — SERP Character & Pixel Tool | Toolifia",
    description: "Free online meta title length checker with live Google SERP preview. Check meta title and description character limits and pixel width. 100% free online.",
    keywords: "meta title length checker online, meta title and description length checker, what is meta title character limit, meta title length in pixels, recommended meta title length for seo"
  },
  "keyword-density-checker": {
    title: "Keyword Density Checker Online Free — SEO Content Analyzer | Toolifia",
    description: "Free online keyword density checker and analysis tool. Calculate keyword frequency, ratios, and avoid over-optimization penalties instantly with no signup.",
    keywords: "keyword density checker online free, keyword density tool free, keyword density analyzer free, what is keyword density checker, keyword density checker tools"
  },
  "subdomain-finder": {
    title: "Subdomain Finder Online Free — Enumerate & Scan Subdomains | Toolifia",
    description: "Free online subdomain finder and scanner. Discover active subdomains, IP addresses, and public DNS records instantly for any domain. 100% free with no signup.",
    keywords: "subdomain finder online free, subdomain finder free api, how does a subdomain finder work, free subdomain scanner, subdomain lookup free, subdomain scanner online free"
  },
  "base64-encoder": {
    title: "Base64 Encoder Online Free — Text & Image to Base64 Tool | Toolifia",
    description: "Free online Base64 encoder and decoder. Encode text, images, and files into Base64 format instantly. 100% client-side with zero data uploads.",
    keywords: "base64 encoder online free, base64 image encoder free, base64 encoder and decoder online, how to base64 encode a string, base64 encoder free"
  },
  "open-graph-validator": {
    title: "Open Graph Tag Validator | Toolifia",
    description: "Validate and preview Open Graph meta tags for Facebook, Twitter/X, LinkedIn, and Discord. Free social snippet debugger.",
    keywords: "opengraph tag validator, og validator, open graph meta tags generator, og tag checker, social media preview validator"
  },
  "open-graph-generator": {
    title: "Open Graph Tag Generator | Toolifia",
    description: "Generate social media meta tags (og:title, og:description, og:image, twitter:card) for Facebook, Twitter/X, LinkedIn.",
    keywords: "open graph meta tags generator, og generator, social meta tag generator, open graph tags maker"
  },
  "ai-story-generator": {
    title: "AI Story & Plot Generator | Toolifia",
    description: "Generate creative story plots, characters, twists, and novel chapters using free AI. Best free plot generator.",
    keywords: "ai plot generator, story plot generator ai, storyline generator, ai story plot, ai story generator free"
  },
  "regex-tester": {
    title: "Regex Tester & Debugger | Toolifia",
    description: "Test and debug regular expressions in real-time with instant match highlighting and explanation cheat sheet.",
    keywords: "regex tester online free, regex validator, test regex online, regular expression checker, regex pattern tester"
  },
  "htpasswd-generator": {
    title: "Htpasswd Generator Online | Toolifia",
    description: "Generate secure htpasswd passwords using Bcrypt, MD5, and SHA-1 for Apache and Nginx HTTP basic authentication.",
    keywords: "htpasswd generator, htaccess htpasswd generator, generate htpasswd, apache htpasswd online, basic auth generator"
  },
  "password-generator": {
    title: "Random Password Generator | Toolifia",
    description: "Generate strong, secure random passwords instantly. Customize length, include symbols, numbers. 100% free.",
    keywords: "password generator free, random password generator, strong password generator, secure password maker"
  },
  "bmi-calculator": {
    title: "BMI Calculator Online Free — Body Mass Index by Age & Gender | Toolifia",
    description: "Free online BMI calculator for men, women, and kids. Calculate body mass index by age, gender, height (kg/cm or lbs/inches) instantly.",
    keywords: "bmi calculator online free, bmi calculator by age and gender, is bmi calculator free, which bmi calculator is most accurate, bmi calculator in kg and cm, bmi calculator app free"
  },
  "word-counter": {
    title: "Word & Character Counter | Toolifia",
    description: "Count words, characters, sentences, paragraphs, reading time, and Twitter/X character limits in real-time.",
    keywords: "word counter online free, character counter, twitter counter, tweet character counter, word count tool"
  },
  "qr-generator": {
    title: "Free QR Code Generator | Toolifia",
    description: "Generate QR codes for URLs, text, email, and phone numbers instantly for free. Download as PNG or SVG.",
    keywords: "qr code generator free, qr code maker online, free qr code, generate qr code, qr code creator"
  },
  "uuid-generator": {
    title: "UUID & GUID Generator Online | Toolifia",
    description: "Generate UUID v4 identifiers instantly for free. Bulk generate multiple UUIDs and copy to clipboard.",
    keywords: "uuid generator free, guid generator online, uuid v4 generator, random uuid, bulk uuid generator"
  },
  "schema-generator": {
    title: "JSON-LD Schema Generator | Toolifia",
    description: "Generate valid JSON-LD structured data schemas for free. Build Schema.org markup for Articles, FAQs, Products & more.",
    keywords: "json-ld generator, json-ld schema generator, ld json schema generator, schema generator free, schema markup generator"
  },
  "resume-builder": {
    title: "Free AI Resume Builder | Toolifia",
    description: "Build ATS-optimized AI resumes for free. Generate bullet points, skills & summaries. No signup needed.",
    keywords: "ai resume builder free, mis students resume builder, ats resume generator, ai resume writer, free resume builder"
  },
  "markdown-editor": {
    title: "Markdown Editor & Preview | Toolifia",
    description: "Write and preview Markdown online for free. Real-time preview with instant export to HTML & MD.",
    keywords: "markdown editor online free, live markdown preview, cross-platform markdown editor, online md editor"
  },
  "loan-calculator": {
    title: "Loan EMI Calculator Online Free — Monthly EMI & Loan Schedule | Toolifia",
    description: "Free online loan EMI calculator. Calculate monthly loan EMIs, interest rates, and full repayment schedules with extra payment options. 100% free.",
    keywords: "loan emi calculator online free, loan emi calculator app free download, personal loan emi calculator free, home loan emi calculator free, loan comparison calculator with extra payments"
  }
};


export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const tool = TOOLS.find((t) => t.slug === params.slug);
  if (!tool) return constructMetadata();

  const custom = CUSTOM_METADATA[params.slug];

  return constructMetadata({
    title: custom?.title || `${tool.name} — Free Online | ${siteConfig.name}`,
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
  "tip-calculator": TipCalculator,
  "aspect-ratio-calculator": AspectRatioCalculator,
  "loan-calculator": LoanCalculator,
  "discount-calculator": DiscountCalculator,
  "gpa-calculator": GpaCalculator,
  "calorie-calculator": CalorieCalculator,
  "fraction-calculator": FractionCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "gst-tax-calculator": GstTaxCalculator,
  "loan-payoff-calculator": LoanPayoffCalculator,
  "unit-converter": UnitConverter,
  "temperature-converter": TemperatureConverter,
  "length-converter": LengthConverter,
  "weight-converter": WeightConverter,
  "speed-converter": SpeedConverter,
  "roman-numerals-converter": RomanNumeralsConverter,
  "binary-converter": BinaryConverter,
  "hex-to-rgb-converter": HexToRgbConverter,
  "currency-converter": CurrencyConverter,
  "em-to-px-converter": EmToPxConverter,
  "px-to-rem-converter": PxToRemConverter,
  
  // New Tools Mapping
  "ai-summarizer": AiSummarizer,
  "ai-headline-generator": AiHeadlineGenerator,
  "citation-generator": CitationGenerator,
  "reading-time-calculator": WordCounter2,
  "readability-score-checker": ReadabilityChecker,
  "character-frequency-counter": CharacterFrequencyCounter,
  "string-utilities": StringUtilities,
  "twitter-character-counter": TwitterCharacterCounter,
  "note-taking-tool": NoteTakingTool,
  "text-to-speech": TextToSpeech,
  "url-slug-generator": UrlSlugGenerator,
  
  "meta-title-length-checker": MetaTitleLengthChecker,
  "open-graph-validator": OpenGraphValidator,
  "hashtag-generator": HashtagGenerator,
  "social-hashtag-generator": HashtagGenerator,
  "gradient-generator": GradientGenerator,
  
  "svg-to-png-converter": SvgToPng,
  "social-image-resizer": SocialImageResizer,
  "image-color-picker": ImageColorPicker,
  "youtube-thumbnail-downloader": YouTubeThumbnailDownloader,
  "favicon-generator": FaviconGenerator,
  
  "xml-formatter-beautifier": XmlFormatter,
  "xml-sitemap-validator": XmlSitemapValidator,
  "css-box-shadow-generator": CssBoxShadowGenerator,
  "css-flexbox-generator": CssFlexboxGenerator,
  "css-clip-path-generator": CssClipPathGenerator,
  "color-palette-generator": ColorPaletteGenerator,
  "regex-pattern-library": RegexPatternLibrary,

  // Developer Suite Additions
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "html-minifier": HtmlMinifier,
  "html-entity-encoder": HtmlEntityEncoder,
  "html-entity-encoder-decoder": HtmlEntityEncoder,
  "url-encoder": UrlEncoder,
  "csv-to-json": CsvToJson,
  "json-to-csv": JsonToCsv,
  "json-to-yaml": JsonToYaml,
  "yaml-to-json": YamlToJson,
  "html-to-markdown": HtmlToMarkdown,
  "markdown-to-html-converter": MarkdownToHtml,
  "sql-formatter": SqlFormatter,
  "sql-beautifier-formatter": SqlFormatter,
  "diff-checker": DiffChecker,
  "text-diff-checker": DiffChecker,
  "curl-to-fetch": CurlToFetch,
  "cron-job-parser": CronJobParser,
  "cron-expression-generator": CronJobParser,
  "htpasswd-generator": HtpasswdGenerator,
  "user-agent-parser": UserAgentParser,
  "dns-lookup-tool": DnsLookupTool,
  "subdomain-finder": SubdomainFinder,
  "ip-lookup": IpLookup,
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
