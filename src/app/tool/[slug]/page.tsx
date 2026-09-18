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
import { SocialContentGenerator } from "@/components/tools/social/SocialContentGenerator";
import { AiImageGenerator } from "@/components/tools/ai/AiImageGenerator";
import { AiVideoGenerator } from "@/components/tools/ai/AiVideoGenerator";

// SEO Suite
import { MetaTagGenerator } from "@/components/tools/seo/MetaTagGenerator";
import { AeoGenerator } from "@/components/tools/seo/AeoGenerator";
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
  "prompt-generator": {
    title: "AI Prompt Engineering Studio Free — ChatGPT, Claude & Midjourney | Toolifia",
    description: "Free enterprise AI prompt generator and optimizer. Build prompts using CRISPE, Chain-of-Thought, Midjourney v6 parameters, and Kling AI Video dynamics. No signup required.",
    keywords: "prompt generator free, ai prompt engineering tool, chatgpt prompt generator, midjourney prompt builder, prompt optimizer free, claude prompt generator"
  },
  "social-content-generator": {
    title: "AI Social Media Content Generator Free — Instagram, TikTok, LinkedIn | Toolifia",
    description: "Free AI social media caption generator. Create viral Instagram captions, TikTok scripts, LinkedIn posts and Facebook content with AI-crafted hooks, hashtags and CTAs in seconds.",
    keywords: "ai social media content generator free, instagram caption generator ai, tiktok caption generator ai, linkedin post generator ai free, facebook post generator"
  },
  "aeo-generator": {
    title: "Answer Engine Optimizer (AEO) — Rank in Perplexity & ChatGPT Search | Toolifia",
    description: "Free Answer Engine Optimization (AEO) tool. Generate AI search answer capsules, empirical RAG data anchors, and JSON-LD schema for Perplexity and Google AI Overviews.",
    keywords: "aeo generator, answer engine optimization tool, perplexity seo generator, chatgpt search ranking tool, google ai overviews optimization, schema generator aeo"
  },

  "ai-video-generator": {
    title: "Free Unlimited AI Video Generator Online — Text & Image to Video | Toolifia",
    description: "Free unlimited AI video generator online with no watermark and no signup. Generate cinematic AI videos from text prompts, animate photos (Image-to-Video), or remix clips into MP4.",
    keywords: "free unlimited ai video generator, ai video generator free, unlimited ai video generator no watermark, free ai video maker no signup, text to video ai free, image to video ai free, animate photo to video, ai video generator unlimited free, kling ai free online alternative"
  },
  "ai-image-generator": {
    title: "Free Unlimited AI Image Generator Online — Text & Image to Image | Toolifia",
    description: "Free unlimited AI image generator online. Create high-resolution AI art and realistic photos from text prompts or reference photos with no watermark, no signup, and unlimited renders on Toolifia.",
    keywords: "free unlimited ai image generator, ai image generator free, unlimited ai image generator no watermark, free ai art generator, text to image ai free, image to image ai free, midjourney alternative free, free unlimited ai photo generator"
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
  "word-counter": {
    title: "Word & Character Counter — Free Online Word Count Tool | Toolifia",
    description: "Free online word and character counter. Count words, characters (with and without spaces), sentences, paragraphs, reading time, and social media limits in real-time. 100% free with no signup.",
    keywords: "word counter, character counter, sentence counter, paragraph counter, reading time calculator, word count tool online, free word counter, count characters online"
  },
  "sentence-counter": {
    title: "Sentence Counter Online Free — Count Sentences in Text | Toolifia",
    description: "Free online sentence counter tool. Quickly count the exact number of sentences, average sentence length, words, and readability in your essays and articles. No signup needed.",
    keywords: "sentence counter, sentence counter online, count sentences, how many sentences, sentence length checker, essay sentence counter, sentence counter free online"
  },
  "paragraph-counter": {
    title: "Paragraph Counter Online Free — Count Paragraphs in Text | Toolifia",
    description: "Free online paragraph counter. Accurately count paragraphs, line breaks, word distribution, and content structure for blogs, essays, and manuscripts in real time.",
    keywords: "paragraph counter, paragraph counter online, count paragraphs in text, paragraph tracker, essay paragraph checker, free paragraph counter online"
  },
  "reading-time-calculator": {
    title: "Reading Time Calculator — Estimate Read Duration & WPM | Toolifia",
    description: "Free reading time calculator for writers, bloggers, and copywriters. Estimate read duration based on 200–250 WPM, speaking time, word count, and paragraph metrics.",
    keywords: "reading time calculator, calculate reading time, estimate reading time, reading time for blog post, speech time calculator, how long to read"
  },
  "json-formatter": {
    title: "JSON Formatter Online Free — Beautify, Validate & Minify JSON | Toolifia",
    description: "Free online JSON formatter, beautifier, and validator with no login required. Format, pretty-print, validate syntax, fix errors, and minify JSON code instantly in your browser.",
    keywords: "json formatter online free, json validator, json beautifier online, json formatter, validate json online, pretty print json free, json formatting tool"
  },
  "uuid-generator": {
    title: "Free UUID v4 Generator — Bulk GUID & Unique ID Creator | Toolifia",
    description: "Generate RFC 4122 compliant UUID v4 and GUIDs online for free. Single or bulk UUID generation with instant copy, hyphen options, uppercase/lowercase, and zero tracking.",
    keywords: "uuid generator, guid generator, free uuid v4 generator, random uuid generator, bulk uuid generator, online guid maker, uuid maker free"
  },
  "regex-tester": {
    title: "Online Regex Tester & Debugger — Real-Time Regular Expression Tool | Toolifia",
    description: "Free online regular expression (regex) tester and debugger with real-time match highlighting, regex cheat sheet, flag toggles (g, i, m), and instant capture group inspection.",
    keywords: "regex tester online, regex debugger, regular expression tester, online regex validator, test regex online free, regex pattern checker"
  },
  "cron-expression-generator": {
    title: "Cron Expression Generator & Explainer — Free Crontab Schedule Tool | Toolifia",
    description: "Free online cron expression generator and schedule explainer. Build, test, and convert crontab syntax into plain English schedules. Supports standard 5-part Linux cron format.",
    keywords: "cron expression generator, crontab generator online, cron schedule maker, cron parser online, linux cron generator, cron syntax explainer"
  },
  "jwt-decoder": {
    title: "JWT Decoder Online Free — Decode JSON Web Tokens In-Browser | Toolifia",
    description: "Free online JWT decoder tool. Safely decode JSON Web Token headers, payloads, claims, and expiration dates in real-time. 100% client-side security with zero data transmission.",
    keywords: "jwt decoder, json web token decoder, jwt decode online free, jwt payload inspector, decode jwt token client side, jwt viewer online"
  },
  "base64-encoder": {
    title: "Base64 Encoder Online Free — Text & File to Base64 Tool | Toolifia",
    description: "Free online Base64 encoder. Convert plain text, code, and binary data into Base64 format instantly with zero latency. 100% client-side security and privacy.",
    keywords: "base64 encoder online free, base64 encode text, encode to base64, string to base64 online, base64 converter, base64 maker"
  },
  "base64-decoder": {
    title: "Base64 Decoder Online Free — Decode Base64 to Plain Text | Toolifia",
    description: "Free online Base64 decoder. Instantly decode Base64 strings, hashes, and data into readable plain text or raw code. Runs 100% in your browser with no data uploaded.",
    keywords: "base64 decoder online free, decode base64, base64 to text converter, base64 string decoder, unbase64 online, decode base64 string free"
  },
  "url-encoder": {
    title: "URL Encoder Online Free — Percent-Encoding Query & Path Tool | Toolifia",
    description: "Free online URL encoder. Convert URLs, query strings, and special characters into standard percent-encoded format (RFC 3986) instantly in your browser.",
    keywords: "url encoder online free, percent encoding tool, url encode string, encode url online, uri component encoder"
  },
  "url-decoder": {
    title: "URL Decoder Online Free — Convert Percent-Encoded URLs to Text | Toolifia",
    description: "Free online URL decoder. Decode percent-encoded URLs, query parameters (%20, %26, etc.), and escaped strings back to human-readable plain text instantly.",
    keywords: "url decoder online free, decode url string, percent decode online, unescape url parameters, url decode tool"
  },
  "qr-generator": {
    title: "Free QR Code Generator — Websites, Wi-Fi, vCard & Text | Toolifia",
    description: "Free custom QR code generator with no expiration. Create high-resolution QR codes for websites, Wi-Fi network logins, vCard digital business cards, and email. Download PNG/SVG.",
    keywords: "qr code generator free, wifi qr code generator, vcard qr code generator, custom qr code maker, free qr code with logo, qr code generator no signup"
  },
  "case-converter": {
    title: "Case Converter Online — UPPER, lower, Title Case, camelCase & snake_case | Toolifia",
    description: "Free online text case converter. Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case instantly.",
    keywords: "case converter online, title case converter, uppercase to lowercase, sentence case tool, camelcase converter, snake case converter"
  },
  "slug-generator": {
    title: "URL Slug Generator — Create SEO-Friendly Clean URL Slugs | Toolifia",
    description: "Free online URL slug generator. Convert titles and headings into SEO-friendly, clean, readable URL slugs with lowercase formatting and custom hyphens.",
    keywords: "url slug generator, seo slug generator, slugify online, make url slug, clean url slug generator free"
  },
  "meta-tag-generator": {
    title: "Meta Tag Generator — Create SEO Title, Description & Open Graph Tags | Toolifia",
    description: "Free online meta tag generator for SEO. Create Google search snippet tags, meta titles, descriptions, viewport tags, and Open Graph social cards with live preview.",
    keywords: "meta tag generator, seo meta tag generator, google snippet generator, meta title and description generator, html meta tags creator"
  },
  "schema-generator": {
    title: "JSON-LD Schema Generator — Build Schema.org Rich Snippet Markup | Toolifia",
    description: "Free online JSON-LD schema markup generator. Build valid Schema.org structured data for Articles, FAQs, Local Businesses, Products, and How-To guides for Google rich snippets.",
    keywords: "json-ld schema generator, schema markup generator, schema.org generator, structured data generator, faq schema generator, google rich snippet schema"
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
  "social-content-generator": SocialContentGenerator,
  "meta-tag-generator": MetaTagGenerator,
  "aeo-generator": AeoGenerator,
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
  "sentence-counter": WordCounter,
  "paragraph-counter": WordCounter,
  "base64-decoder": Base64Encoder,
  "url-decoder": UrlEncoder,
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
      {SpecificComponent ? <SpecificComponent tool={tool} /> : <UniversalToolRunner tool={tool} />}
    </ToolWrapper>
  );
}
