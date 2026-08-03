export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDef {
  slug: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  featured?: boolean;
  trending?: boolean;
  rating: number;
  reviewsCount: number;
  keywords: string[];
  features: string[];
  benefits: string[];
  howTo: string[];
  commonMistakes: string[];
  faqs: ToolFAQ[];
}

export const TOOLS: ToolDef[] = [
  // ── AI TOOLS ─────────────────────────────────────────────────────────────
  {
    slug: "ai-image-generator",
    name: "AI Text to Image Generator",
    category: "ai-tools",
    description: "Generate 8K photorealistic images, 3D renders, anime artwork, and cyberpunk scenes from text prompts.",
    icon: "Image",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 8940,
    keywords: ["ai image generator", "free text to image", "ai picture maker", "midjourney alternative free", "stable diffusion online"],
    features: ["6 Art styles (Photorealistic, Anime, Cyberpunk, 3D Pixar, Digital Art, Cinematic)", "Multi-aspect ratio support (1:1, 16:9, 9:16)", "HD 8K resolution export", "Unlimited free image generations"],
    benefits: ["Create custom blog & social media visual assets", "Generate art concepts without design skills", "Download high-res artwork instantly"],
    howTo: ["Type a descriptive prompt of the scene you want to create.", "Select your preferred art style and aspect ratio.", "Click 'Generate AI Image' to render your artwork."],
    commonMistakes: ["Using vague single-word prompts without specifying lighting or mood."],
    faqs: [
      { question: "Is the AI Image Generator free to use?", answer: "Yes, Toolifia provides 100% free image generation without daily credits or account registration." },
      { question: "Can I use generated images commercially?", answer: "Yes, AI-generated images are royalty-free for personal and commercial projects." }
    ]
  },
  {
    slug: "ai-video-generator",
    name: "Free AI Video Generator — Text to Video Online (No Signup)",
    category: "video-tools",
    description: "Generate real AI videos from text prompts for free. Create cinematic clips, anime scenes, 3D animations, and drone footage with professional camera motion. No signup required. Higgsfield-style AI video generation powered by Kling, Wan, and MiniMax AI models.",
    icon: "Video",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 9840,
    keywords: [
      "ai video generator free",
      "text to video AI free",
      "ai video maker online free no signup",
      "higgsfield AI alternative free",
      "free ai video generator no watermark",
      "runway ml free alternative",
      "pika labs free alternative",
      "sora alternative free online",
      "AI video from text free",
      "best free ai video generator 2025",
      "kling ai free online",
      "text to video no credit card",
      "ai video generator online",
      "make ai video free",
      "ai video creation tool free",
      "generate video from text AI",
      "free video AI tool",
      "ai short video generator",
      "tiktok ai video generator free",
      "youtube shorts ai video maker"
    ],
    features: [
      "Real AI video generation via Kling 2.1, Wan T2V, and MiniMax Video models",
      "6 cinematic visual styles: Cinematic 4K, Cyberpunk, Nature Drone, Anime, 3D Animation, Vintage Film",
      "6 camera motion presets: Slow Zoom, FPV Drone, 360 Orbit, Cinematic Pan, Handheld, Dolly Push",
      "5s and 10s clip duration options",
      "Native HTML5 video player with play, pause, seek, volume, and fullscreen",
      "Download generated videos as MP4 files",
      "Storyboard preview mode for users without API key",
      "API key saved locally — enter once, generate forever",
      "No watermarks on output videos",
      "Works with fal.ai free tier — no credit card required"
    ],
    benefits: [
      "Create viral TikTok, YouTube Shorts, and Instagram Reels with AI in seconds",
      "Produce cinematic product ads and marketing clips without a film crew",
      "Visualize movie concepts, storyboards, and creative pitches instantly",
      "Save thousands on video production costs using AI automation",
      "No video editing skills required — just type a prompt",
      "Access enterprise-grade AI video models (Kling 2.1) for free",
      "Generate unlimted videos with your own free fal.ai API key"
    ],
    howTo: [
      "Enter your fal.ai free API key in the setup panel — get one free at fal.ai with no credit card needed.",
      "Type a detailed video prompt describing your scene, mood, lighting, and action.",
      "Select a visual style (Cinematic, Cyberpunk, Anime, etc.) and camera motion (Drone, Zoom, Pan).",
      "Choose your clip duration (5s or 10s) and click 'Generate Real AI Video'.",
      "Watch your video render in ~30–60 seconds, then play it in the built-in HTML5 player.",
      "Download your video as an MP4 file directly to your device — no watermarks."
    ],
    commonMistakes: [
      "Using vague one-word prompts — always describe lighting, mood, camera angle, and subject motion.",
      "Not specifying camera movement — include terms like 'slow zoom in' or 'aerial drone shot'.",
      "Skipping the visual style selection — each style changes how the AI interprets your scene.",
      "Generating without a fal.ai key — without a key you only get a static storyboard preview, not a real video.",
      "Expecting instant results — AI video generation takes 30–60 seconds for quality output."
    ],
    faqs: [
      {
        question: "Is this AI video generator really free?",
        answer: "Yes — it uses fal.ai's free tier which gives you credits upon signup with no credit card required. The tool itself is 100% free to use on Toolifia with no subscriptions."
      },
      {
        question: "Is this a Higgsfield alternative?",
        answer: "Yes! Toolifia's AI Video Generator uses the same underlying models as Higgsfield (Kling 2.1 via fal.ai), giving you professional cinematic AI video for free. No subscription, no watermarks."
      },
      {
        question: "What AI models power the video generation?",
        answer: "You can choose from Kling 2.1 (best quality, recommended), Wan T2V (fast generation), and MiniMax Video (realistic scenes). All are industry-leading models accessible through fal.ai."
      },
      {
        question: "Do I need to create an account on Toolifia?",
        answer: "No. Toolifia requires zero signup. You only need a free fal.ai API key which you get by signing up on fal.ai — completely free with no credit card."
      },
      {
        question: "How long does it take to generate a video?",
        answer: "AI video generation typically takes 30–60 seconds depending on the model selected and server load. Kling 2.1 produces the highest quality and may take slightly longer."
      },
      {
        question: "What format are the output videos?",
        answer: "Videos are generated as MP4 files which you can download directly. The built-in HTML5 player lets you watch and review before downloading."
      },
      {
        question: "Is this a Runway ML or Pika Labs alternative?",
        answer: "Yes! Unlike Runway ML and Pika Labs which require paid subscriptions, Toolifia's AI Video Generator gives you access to equivalent or superior AI models (Kling 2.1) completely free."
      },
      {
        question: "Can I use generated videos for commercial purposes?",
        answer: "Videos generated through fal.ai's models are royalty-free for personal and commercial use. Check fal.ai's terms for specific commercial licensing details."
      }
    ]
  },
  {
    slug: "ai-humanizer",
    name: "AI Text Humanizer",
    category: "ai-tools",
    description: "Transform robot-sounding AI text into natural, engaging human-written prose that passes detection filters.",
    icon: "Sparkles",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 1240,
    keywords: ["ai humanizer", "bypass ai detector", "humanize chatgpt", "make ai text human"],
    features: ["Natural burstiness & perplexity adjustments", "Context-aware phrasing replacement", "Tone options (Conversational, Academic, Professional)", "100% Free & Unlimited processing"],
    benefits: ["Bypass AI content flags naturally", "Improve readability and narrative flow", "Maintain key message integrity without generic filler"],
    howTo: ["Paste your AI-generated text into the input box.", "Select your preferred tone and target output format.", "Click 'Humanize Text' to instantly receive rewritten prose."],
    commonMistakes: ["Using overly short prompts without sufficient context.", "Ignoring tone alignment with target readers."],
    faqs: [
      { question: "How does the AI Text Humanizer work?", answer: "It rewrites structural patterns, varies sentence length, and replaces predictable phrasing while preserving original meaning." },
      { question: "Is this tool free to use?", answer: "Yes, 100% free with unlimited runs and no hidden subscriptions." }
    ]
  },
  {
    slug: "ai-detector",
    name: "AI Content Detector",
    category: "ai-tools",
    description: "Analyze text for AI probability, perplexity, and structural patterns generated by ChatGPT, Claude, or Gemini.",
    icon: "ShieldAlert",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 980,
    keywords: ["ai detector", "chatgpt checker", "detect ai writing", "ai score checker"],
    features: ["Deep linguistic analysis engine", "Percentage probability breakdown", "Sentence-by-sentence highlight heatmaps", "Fast multi-model scanning"],
    benefits: ["Verify originality before publishing", "Ensure academic and journalistic compliance", "Spot repetitive AI patterns instantly"],
    howTo: ["Paste your article or passage into the text area.", "Click 'Analyze Text'.", "Review the AI percentage probability and highlighted flags."],
    commonMistakes: ["Testing passages under 50 words which lower accuracy.", "Assuming 100% score implies intentional plagiarism."],
    faqs: [
      { question: "Can AI detectors be 100% accurate?", answer: "No detector is 100% infallible, but our tool provides a high-confidence probabilistic assessment." },
      { question: "What models does it check against?", answer: "It checks against patterns typical of GPT-4, Gemini, Claude, and Llama models." }
    ]
  },
  {
    slug: "prompt-generator",
    name: "AI Prompt Generator & Optimizer",
    category: "ai-tools",
    description: "Convert simple ideas into engineered, high-converting prompts tailored for Midjourney, ChatGPT, and Claude.",
    icon: "Terminal",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 750,
    keywords: ["prompt generator", "chatgpt prompt optimizer", "midjourney prompt maker", "prompt engineering"],
    features: ["Role & Persona assignment system", "Negative constraint injector", "One-click copyable format", "Multi-model targeting"],
    benefits: ["Get 10x better responses from LLMs", "Save time testing trial-and-error prompts", "Standardize prompt quality for work"],
    howTo: ["Enter a short description of what you want to achieve.", "Select your target AI model (ChatGPT, Claude, Midjourney).", "Click 'Generate Engineered Prompt'."],
    commonMistakes: ["Being too vague about desired output structure.", "Forgetting to specify target constraints."],
    faqs: [
      { question: "Why use engineered prompts?", answer: "Structured prompts provide explicit roles, context, and constraints, eliminating generic AI outputs." }
    ]
  },
  {
    slug: "resume-builder",
    name: "AI Resume & CV Builder",
    category: "ai-tools",
    description: "Generate bullet points, professional summary, and tailored skill descriptions optimized for ATS systems.",
    icon: "FileBadge",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 1530,
    keywords: ["ai resume builder", "ats resume generator", "free cv creator", "resume summary generator"],
    features: ["ATS-friendly keyword optimization", "Action-verb bullet suggestions", "Instant preview renderer", "Clean export options"],
    benefits: ["Pass ATS filters easily", "Highlight quantifiable achievements", "Create custom resumes in minutes"],
    howTo: ["Fill in your basic work history and job title.", "Click 'Generate AI Bullet Points'.", "Customize and download your formatted resume text."],
    commonMistakes: ["Listing duties instead of quantifiable achievements.", "Using unreadable non-standard resume fonts."],
    faqs: [
      { question: "Is the resume format ATS compliant?", answer: "Yes, it produces clean, structured markdown/plain text format preferred by ATS scanners." }
    ]
  },
  {
    slug: "ai-story-generator",
    name: "AI Story & Plot Generator",
    category: "ai-tools",
    description: "Generate compelling short stories, plot outlines, character bios, and creative narratives using AI.",
    icon: "BookOpen",
    featured: false,
    trending: true,
    rating: 4.7,
    reviewsCount: 610,
    keywords: ["ai story generator", "plot generator", "creative writing ai", "short story creator"],
    features: ["Genre selection (Sci-fi, Romance, Thriller, Fantasy)", "Character & setting builder", "Multiple story length options", "Dialogue generation support"],
    benefits: ["Overcome creative writer's block instantly", "Generate story outlines in seconds", "Explore multiple narrative directions"],
    howTo: ["Choose your genre and story length.", "Enter a one-sentence premise or idea.", "Click 'Generate Story' for a full narrative outline."],
    commonMistakes: ["Using very generic prompts like 'write a story'.", "Not specifying the protagonist or conflict."],
    faqs: [
      { question: "Can I use generated stories commercially?", answer: "Yes, all generated content is yours to use and modify freely." }
    ]
  },
  {
    slug: "ai-chat-assistant",
    name: "AI Chat Assistant",
    category: "ai-tools",
    description: "Chat with a powerful AI assistant for answers, brainstorming, code help, and creative tasks.",
    icon: "MessageSquare",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2100,
    keywords: ["ai chat", "chatgpt alternative", "ai assistant free", "chat with ai"],
    features: ["Multi-turn conversation memory", "Code generation & explanation", "Creative writing support", "Instant answers to any question"],
    benefits: ["Get expert-level help on any topic", "Brainstorm ideas 24/7 for free", "Save hours of research time"],
    howTo: ["Type your question or task in the chat box.", "Press Enter or click Send.", "Follow up with clarifying questions for deeper answers."],
    commonMistakes: ["Asking one massive complex question — break it into smaller parts.", "Not providing enough context for specific tasks."],
    faqs: [
      { question: "Does the AI remember previous messages?", answer: "Yes, context is maintained within the same session for natural multi-turn conversations." }
    ]
  },

  // ── WRITING TOOLS ─────────────────────────────────────────────────────────
  {
    slug: "email-writer",
    name: "AI Email Writer & Assistant",
    category: "writing-tools",
    description: "Draft persuasive outreach emails, professional replies, or cold pitches in seconds.",
    icon: "Mail",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 620,
    keywords: ["ai email writer", "cold email generator", "email responder", "professional email writer"],
    features: ["Tone customizer (Formal, Friendly, Urgency, Persuasive)", "Subject line generator", "Call-to-action inclusion", "Instant copy"],
    benefits: ["Overcome writer's block instantly", "Maintain consistent professional tone", "Improve email response rates"],
    howTo: ["Enter the core message or request.", "Choose tone and goal.", "Click 'Write Email' to generate subject line & body."],
    commonMistakes: ["Omitting recipient context.", "Sending without checking key names and dates."],
    faqs: [
      { question: "Can I use this for sales outreach?", answer: "Yes, select 'Persuasive' tone to generate cold outreach email templates." }
    ]
  },
  {
    slug: "cover-letter-generator",
    name: "AI Cover Letter Generator",
    category: "writing-tools",
    description: "Generate tailored, professional cover letters for any job application in seconds using AI.",
    icon: "FileText",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 890,
    keywords: ["cover letter generator", "ai cover letter", "job application letter", "cover letter writer"],
    features: ["Job-role tailored content", "Company name personalization", "Professional & conversational tones", "ATS-friendly formatting"],
    benefits: ["Stand out among hundreds of applicants", "Save hours of manual writing", "Highlight the right skills for each role"],
    howTo: ["Enter the job title and company name.", "Paste your top 3 relevant skills or achievements.", "Click 'Generate Cover Letter' and customize."],
    commonMistakes: ["Using the same cover letter for every job application.", "Forgetting to include a specific call to action."],
    faqs: [
      { question: "How long should a cover letter be?", answer: "Ideally 3-4 short paragraphs, fitting on a single page." }
    ]
  },
  {
    slug: "grammar-checker",
    name: "AI Grammar & Spell Checker",
    category: "writing-tools",
    description: "Detect and fix grammar errors, spelling mistakes, punctuation issues, and style problems instantly.",
    icon: "CheckSquare",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3200,
    keywords: ["grammar checker", "spell checker", "grammar fixer", "proofreading tool"],
    features: ["Real-time grammar error detection", "Spelling & punctuation correction", "Passive voice & wordiness alerts", "Style suggestions"],
    benefits: ["Write error-free content every time", "Improve professional document quality", "Save editing time significantly"],
    howTo: ["Paste or type your text into the editor.", "Click 'Check Grammar'.", "Review highlighted errors and apply fixes."],
    commonMistakes: ["Blindly accepting all suggestions without reading context.", "Not double-checking proper nouns."],
    faqs: [
      { question: "Does this replace a professional editor?", answer: "It catches most common errors but complex style editing benefits from human review." }
    ]
  },
  {
    slug: "blog-intro-generator",
    name: "Blog Intro & Hook Generator",
    category: "writing-tools",
    description: "Generate magnetic blog post introductions that hook readers and reduce bounce rate instantly.",
    icon: "Zap",
    featured: false,
    trending: true,
    rating: 4.7,
    reviewsCount: 420,
    keywords: ["blog intro generator", "hook generator", "blog opening line", "article introduction writer"],
    features: ["Multiple hook styles (Question, Statistic, Anecdote, Bold Claim)", "SEO-aware first paragraph", "Tone matching", "One-click regeneration"],
    benefits: ["Keep readers engaged past the first paragraph", "Reduce article bounce rate", "Start writing faster with a strong foundation"],
    howTo: ["Enter your blog title and target keyword.", "Select a hook style.", "Click 'Generate Introduction'."],
    commonMistakes: ["Choosing the wrong hook style for the target audience.", "Ignoring the keyword in the first paragraph."],
    faqs: [
      { question: "What makes a great blog hook?", answer: "A great hook creates curiosity, promises value, or presents a surprising fact within the first two sentences." }
    ]
  },
  {
    slug: "social-bio-writer",
    name: "Social Media Bio Generator",
    category: "writing-tools",
    description: "Create punchy, professional bios for Twitter/X, LinkedIn, Instagram, and TikTok profiles.",
    icon: "UserCheck",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 310,
    keywords: ["bio generator", "twitter bio writer", "instagram bio creator", "linkedin about section"],
    features: ["Platform-specific character limits", "Multiple personality tones", "Emoji integration option", "Keyword inclusion"],
    benefits: ["Make a strong first impression on any platform", "Attract the right followers and connections", "Showcase your personal brand clearly"],
    howTo: ["Select your target platform (Twitter, LinkedIn, Instagram).", "Describe yourself in 1-2 sentences.", "Click 'Generate Bio' and customize."],
    commonMistakes: ["Using the same bio on all platforms without adjusting tone.", "Failing to include a call to action or link."],
    faqs: [
      { question: "What is the Twitter bio character limit?", answer: "Twitter/X allows up to 160 characters for the bio field." }
    ]
  },

  // ── SEO TOOLS ────────────────────────────────────────────────────────────
  {
    slug: "meta-tag-generator",
    name: "Meta Tag & Open Graph Generator",
    category: "seo-tools",
    description: "Create complete SEO meta tags, title tags, descriptions, and OpenGraph social cards instantly.",
    icon: "Search",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2100,
    keywords: ["meta tag generator", "seo title description maker", "open graph generator", "twitter card generator"],
    features: ["Real-time Google search snippet preview", "Facebook & Twitter card live preview", "Character count warning badges", "Copy HTML snippet"],
    benefits: ["Boost click-through rates (CTR) on search engines", "Ensure social shares display images correctly", "Prevent title truncation"],
    howTo: ["Enter Page Title, Meta Description, URL, and Image URL.", "Preview how your site appears on Google & Facebook.", "Copy the generated `<meta>` tags into your `<head>`."],
    commonMistakes: ["Exceeding 60 characters for titles.", "Exceeding 160 characters for meta descriptions."],
    faqs: [
      { question: "What is the recommended meta description length?", answer: "Ideal length is between 140 to 160 characters for desktop and mobile displays." }
    ]
  },
  {
    slug: "schema-generator",
    name: "JSON-LD Schema Generator",
    category: "seo-tools",
    description: "Free JSON-LD schema generator for structured data markup. Build valid Schema.org JSON-LD code for Articles, FAQs, Products, Reviews, Local Business, Breadcrumbs, Events, HowTo, and more — no signup required.",
    icon: "Code2",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 1840,
    keywords: [
      "json-ld generator", "json-ld schema generator", "ld json schema generator", "json-ld builder",
      "json-ld code generator", "json ld generator free", "schema generator", "json-ld markup maker",
      "faq schema creator", "structured data generator", "schema.org generator", "schema markup generator",
      "json ld maker online", "rich snippet generator", "schema markup tool free", "article schema generator",
      "product schema generator", "faq rich snippet generator", "breadcrumb schema generator",
      "local business schema generator", "event schema markup", "howto schema generator",
      "google rich results schema", "seo schema markup", "json ld schema ai"
    ],
    features: [
      "10+ Schema.org types (Article, FAQ, Product, Review, Event, Local Business, Breadcrumb, HowTo, SoftwareApp, VideoObject)",
      "Valid Google Rich Results syntax — passes Rich Results Test",
      "Dynamic form-based field builder — no JSON knowledge required",
      "One-click copy of clean `<script type=\"application/ld+json\">` output",
      "Real-time JSON-LD preview and validation",
      "Free to use, no signup, no watermarks"
    ],
    benefits: [
      "Qualify for Google rich snippets and enhanced SERP features",
      "Improve search engine understanding of your content",
      "Stand out in search results with star ratings, FAQs, and breadcrumbs",
      "Boost click-through rate (CTR) by up to 30% with rich results",
      "No JSON-LD coding knowledge required — auto-generates valid markup"
    ],
    howTo: [
      "Select the Schema Type from the dropdown (Article, FAQ, Product, etc.).",
      "Fill out the structured form fields with your page's real data.",
      "Copy the generated `<script type=\"application/ld+json\">` code.",
      "Paste it inside your page's `<head>` section.",
      "Test with Google's Rich Results Test tool to verify."
    ],
    commonMistakes: [
      "Leaving required fields empty — all required properties must be present.",
      "Adding inaccurate info not actually visible on the web page.",
      "Forgetting to test with Google Rich Results Test after adding.",
      "Using JSON-LD for content not relevant to the page topic."
    ],
    faqs: [
      { question: "What is a JSON-LD schema generator?", answer: "A JSON-LD schema generator is a free online tool that creates valid Schema.org structured data markup in JSON-LD format. It helps Google understand your content and qualify for rich snippets in search results." },
      { question: "Where should I place the schema markup?", answer: "Paste the generated JSON-LD `<script>` tag inside the `<head>` section or right before the closing `</body>` tag of your HTML page." },
      { question: "What is the difference between JSON-LD and Microdata?", answer: "JSON-LD is a separate script block that Google recommends. Microdata is embedded inline in HTML. JSON-LD is easier to manage and is Google's preferred format." },
      { question: "Does JSON-LD markup directly improve rankings?", answer: "JSON-LD structured data doesn't directly boost rankings, but it enables rich results (FAQs, star ratings, breadcrumbs) which increase click-through rates and organic traffic." },
      { question: "Is this JSON-LD generator free?", answer: "Yes, Toolifia's JSON-LD Schema Generator is 100% free with no signup or credit card required." }
    ]
  },
  {
    slug: "robots-generator",
    name: "Robots.txt Generator",
    category: "seo-tools",
    description: "Generate a custom robots.txt file to guide search engine crawlers and block sensitive directories.",
    icon: "FileText",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 510,
    keywords: ["robots.txt generator", "crawler rules maker", "allow disallow robots", "sitemap robots.txt"],
    features: ["User-agent specific rules", "Disallow directory inputs", "Sitemap URL inclusion", "Direct file download"],
    benefits: ["Prevent indexing of private or duplicate pages", "Optimize crawl budget", "Ensure proper search bot access"],
    howTo: ["Specify default access rules (Allow all or Disallow).", "Add custom Disallow paths (e.g., `/admin/`).", "Add your XML Sitemap URL and copy or download."],
    commonMistakes: ["Accidentally blocking `Disallow: /` which de-indexes your entire site."],
    faqs: [
      { question: "Where should the robots.txt file reside?", answer: "It must be saved at the root directory of your domain (e.g., `example.com/robots.txt`)." }
    ]
  },
  {
    slug: "sitemap-generator",
    name: "XML Sitemap Generator Tool",
    category: "seo-tools",
    description: "Create standard XML sitemaps for website search engine submission and indexing.",
    icon: "FileCode",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 890,
    keywords: ["xml sitemap generator", "create sitemap xml", "google sitemap maker", "seo sitemap"],
    features: ["URL list parser", "Changefreq & Priority settings", "Lastmod timestamp generator", "Valid XML formatting"],
    benefits: ["Speed up indexing for new URLs", "Provide search engines complete URL structure", "Ensure zero missed pages"],
    howTo: ["Paste a list of website page URLs (one per line).", "Configure priority and update frequency.", "Click 'Generate Sitemap' and copy the XML output."],
    commonMistakes: ["Including non-canonical or 404 URLs in the sitemap."],
    faqs: [
      { question: "How many URLs can an XML sitemap hold?", answer: "A single XML sitemap can hold up to 50,000 URLs or 50MB uncompressed." }
    ]
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density & Frequency Checker",
    category: "seo-tools",
    description: "Analyze keyword usage, frequency ratios, 1-word, 2-word, and 3-word n-grams to prevent over-optimization.",
    icon: "BarChart3",
    featured: true,
    trending: false,
    rating: 4.7,
    reviewsCount: 640,
    keywords: ["keyword density checker", "keyword frequency analyzer", "seo content density", "over optimization checker"],
    features: ["Multi-word phrase breakdown", "Stop-word filter toggle", "Density percentage calculator", "Top keyword ranking list"],
    benefits: ["Avoid Google keyword stuffing penalties", "Maintain natural keyword distribution", "Identify missing topic terms"],
    howTo: ["Paste your blog post or web page text.", "Toggle stop-words exclusion.", "Analyze density percentages for key terms."],
    commonMistakes: ["Targeting keyword densities above 3-4% which triggers spam filters."],
    faqs: [
      { question: "What is an ideal keyword density?", answer: "Generally around 1% to 2% for primary keywords, supported by naturally related terms." }
    ]
  },
  {
    slug: "open-graph-generator",
    name: "Open Graph Meta Tag Generator",
    category: "seo-tools",
    description: "Create rich og:title, og:description, og:image meta tags for Facebook, LinkedIn, and Discord previews.",
    icon: "Share2",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 430,
    keywords: ["open graph generator", "og image tags", "facebook meta tag maker", "social tag generator"],
    features: ["OG protocol tags generator", "Twitter summary card creator", "Dimensions validation notice"],
    benefits: ["Increase social click-throughs", "Control exact title and image preview on social media"],
    howTo: ["Enter site title, description, and preview image URL.", "Click 'Generate OG Tags'.", "Paste into website `<head>`."],
    commonMistakes: ["Using small images under 1200x630 pixels."],
    faqs: [
      { question: "What is the best OG image size?", answer: "1200 x 630 pixels for crisp high-resolution cards across all platforms." }
    ]
  },
  {
    slug: "utm-builder",
    name: "UTM Campaign URL Builder",
    category: "seo-tools",
    description: "Build UTM-tagged URLs for Google Analytics campaign tracking across email, social, and paid ads.",
    icon: "Link2",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 720,
    keywords: ["utm builder", "utm campaign generator", "google analytics utm", "campaign url tracker"],
    features: ["All 5 UTM parameter fields", "Encoded URL output", "QR code of tracked URL", "Copy to clipboard"],
    benefits: ["Track exact traffic sources in Google Analytics", "Measure ROI of individual campaigns", "Compare channel performance accurately"],
    howTo: ["Enter your base URL.", "Fill UTM source, medium, campaign fields.", "Click 'Build UTM URL' and copy the tagged link."],
    commonMistakes: ["Using spaces in UTM values instead of hyphens.", "Forgetting to tag all links in the same campaign."],
    faqs: [
      { question: "What is a UTM parameter?", answer: "UTM (Urchin Tracking Module) parameters are tags appended to URLs to identify traffic sources in analytics." }
    ]
  },

  // ── TEXT TOOLS ───────────────────────────────────────────────────────────
  {
    slug: "word-counter",
    name: "Word & Character Counter",
    category: "text-tools",
    description: "Count words, characters (with & without spaces), sentences, paragraphs, and estimated reading time.",
    icon: "Hash",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3100,
    keywords: ["word counter", "character counter", "sentence counter", "reading time calculator"],
    features: ["Real-time instant counting", "Speaking and reading duration metric", "Longest word detector", "Clear text action"],
    benefits: ["Stay within essay & social character limits", "Track writing productivity", "Optimize content length"],
    howTo: ["Type or paste text directly into the live counter box.", "View statistics instantly updated below."],
    commonMistakes: ["Forgetting that spaces count towards character limits on Twitter/X."],
    faqs: [
      { question: "How is reading time calculated?", answer: "Based on an average adult reading speed of 200 to 250 words per minute." }
    ]
  },
  {
    slug: "case-converter",
    name: "Case Converter (Upper, Lower, Title, Camel)",
    category: "text-tools",
    description: "Convert text into UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, and kebab-case.",
    icon: "Type",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 1950,
    keywords: ["case converter", "uppercase to lowercase", "title case converter", "camelcase maker"],
    features: ["8 instant case transformation modes", "One-click copy to clipboard", "Spaces cleanup filter"],
    benefits: ["Fix accidentally caps-locked text", "Standardize code variable naming", "Format headline titles properly"],
    howTo: ["Paste text into input field.", "Click the button corresponding to your target case format.", "Copy converted text."],
    commonMistakes: ["Not double-checking acronyms when applying Title Case."],
    faqs: [
      { question: "What is camelCase vs PascalCase?", answer: "camelCase starts with lowercase (e.g. myVar), while PascalCase starts uppercase (e.g. MyVar)." }
    ]
  },
  {
    slug: "text-rewriter",
    name: "Text Rewriter & Paraphraser",
    category: "text-tools",
    description: "Rewrite sentences and paragraphs to improve clarity, vocabulary, and eliminate redundancy.",
    icon: "RefreshCw",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 1120,
    keywords: ["text rewriter", "paraphrase tool", "article rewriter", "sentence rewriter"],
    features: ["Synonym enhancement options", "Readability improver", "Side-by-side comparison"],
    benefits: ["Express ideas more clearly", "Avoid repetitive phrasing", "Enhance vocabulary"],
    howTo: ["Paste your draft text.", "Click 'Rewrite Text'.", "Review suggestions and copy modified text."],
    commonMistakes: ["Rewriting without reviewing specialized technical terminology."],
    faqs: [
      { question: "Does this change the meaning of my text?", answer: "No, the core message is preserved while enhancing word selection and flow." }
    ]
  },
  {
    slug: "slug-generator",
    name: "URL Slug Generator",
    category: "text-tools",
    description: "Convert titles and phrases into clean, SEO-friendly, lowercased URL slugs.",
    icon: "Link",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 780,
    keywords: ["url slug generator", "clean url maker", "seo slug creator", "permalink generator"],
    features: ["Special character stripper", "Accent mark normalizer", "Custom separator selection (- or _)"],
    benefits: ["Create search-engine friendly URLs", "Remove invalid URL symbols automatically"],
    howTo: ["Type your article title or phrase.", "Choose hyphen or underscore separator.", "Copy your clean slug."],
    commonMistakes: ["Using stop words that unnecessarily lengthen URLs."],
    faqs: [
      { question: "Why are lowercase slugs better for SEO?", answer: "URLs are case-sensitive on some servers; lowercase avoids duplicate content issues." }
    ]
  },
  {
    slug: "text-diff-checker",
    name: "Text Difference & Compare Tool",
    category: "text-tools",
    description: "Compare two blocks of text side by side and highlight additions, deletions, and changes.",
    icon: "GitCompare",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 540,
    keywords: ["text diff checker", "compare text online", "text comparison tool", "find differences in text"],
    features: ["Line-by-line diff highlighting", "Word-level change detection", "Added/Removed/Changed color coding", "Character-level precision"],
    benefits: ["Track document revisions easily", "Identify changes in contract versions", "Spot differences in code quickly"],
    howTo: ["Paste original text in the left box.", "Paste modified text in the right box.", "Click 'Compare' to see highlighted differences."],
    commonMistakes: ["Comparing files with different encoding formats."],
    faqs: [
      { question: "Can I compare code files?", answer: "Yes, any plain text including code, JSON, HTML, and CSV can be compared." }
    ]
  },
  {
    slug: "string-utilities",
    name: "String Utilities & Text Manipulator",
    category: "text-tools",
    description: "Reverse text, remove duplicate lines, sort alphabetically, trim whitespace, and count unique words.",
    icon: "Shuffle",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 390,
    keywords: ["reverse text", "remove duplicate lines", "sort lines alphabetically", "text manipulator online"],
    features: ["Reverse string or words", "Remove duplicate lines", "Sort A-Z or Z-A", "Trim extra whitespace & blank lines"],
    benefits: ["Quickly clean messy copied text", "Prepare data for spreadsheets", "Sort lists without manual effort"],
    howTo: ["Paste text in the input area.", "Select the desired operation.", "Copy the processed output."],
    commonMistakes: ["Sorting case-sensitively when you need case-insensitive order."],
    faqs: [
      { question: "Can I undo changes?", answer: "Yes, your original text is preserved until you clear the input manually." }
    ]
  },

  // ── DEVELOPER TOOLS ──────────────────────────────────────────────────────
  {
    slug: "uuid-generator",
    name: "UUID / GUID v4 Generator",
    category: "developer-tools",
    description: "Generate RFC-compliant Version-4 UUIDs (Universally Unique Identifiers) in bulk.",
    icon: "Cpu",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 1820,
    keywords: ["uuid generator", "guid generator", "v4 uuid maker", "bulk uuid generator"],
    features: ["Generate up to 100 UUIDs at once", "Hyphenated or raw hex format", "Uppercase / Lowercase options"],
    benefits: ["Generate guaranteed unique IDs for database primary keys", "Create API test tokens"],
    howTo: ["Select quantity of UUIDs needed.", "Choose format options.", "Click 'Generate UUIDs' and copy list."],
    commonMistakes: ["Using non-random numbers for UUID v4 generation."],
    faqs: [
      { question: "What is the probability of a UUID v4 collision?", answer: "The odds are virtually zero (1 in 2^122)." }
    ]
  },
  {
    slug: "regex-tester",
    name: "Regex Tester & Debugger",
    category: "developer-tools",
    description: "Test and debug regular expressions with real-time match highlighting, groups, and flags support.",
    icon: "Regex",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2450,
    keywords: ["regex tester", "regular expression debugger", "regex validator", "regex match online"],
    features: ["Real-time match highlighting", "Capture group display", "Flag toggles (i, g, m, s)", "Explanation breakdown"],
    benefits: ["Debug complex regex patterns instantly", "Understand regex groups visually", "Test patterns against sample data"],
    howTo: ["Enter your regex pattern in the pattern field.", "Paste your test string below.", "View matches highlighted in real time."],
    commonMistakes: ["Forgetting to escape special characters like `.` and `*`.", "Not setting global flag `g` for multiple matches."],
    faqs: [
      { question: "What regex flavors are supported?", answer: "This tool uses JavaScript's built-in regex engine (ECMAScript standard)." }
    ]
  },
  {
    slug: "cron-expression-generator",
    name: "Cron Expression Generator & Explainer",
    category: "developer-tools",
    description: "Build and explain cron job schedule expressions with a visual UI — no memorizing syntax required.",
    icon: "Clock",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 680,
    keywords: ["cron generator", "cron expression builder", "cron schedule maker", "cron job syntax"],
    features: ["Visual time picker UI", "Human-readable expression explanation", "Next 5 run times preview", "Common presets (hourly, daily, weekly)"],
    benefits: ["Stop memorizing obscure cron syntax", "Validate cron schedules before deploying", "Understand inherited cron jobs instantly"],
    howTo: ["Use the visual sliders for minutes, hours, days.", "See the generated cron expression update live.", "Copy the expression for your server or CI/CD pipeline."],
    commonMistakes: ["Using 6-field cron syntax when the server expects 5 fields."],
    faqs: [
      { question: "What does `*/5 * * * *` mean?", answer: "It runs the task every 5 minutes, every hour, every day." }
    ]
  },
  {
    slug: "jwt-decoder",
    name: "JWT Token Decoder & Inspector",
    category: "developer-tools",
    description: "Decode and inspect JSON Web Tokens (JWT) — view header, payload claims, and expiry status.",
    icon: "KeySquare",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 930,
    keywords: ["jwt decoder", "json web token inspector", "jwt payload viewer", "decode jwt online"],
    features: ["Three-part token breakdown (Header, Payload, Signature)", "Expiry timestamp converter", "Algorithm identification", "Claim inspection"],
    benefits: ["Debug authentication issues fast", "Inspect API token contents without code", "Verify claim values instantly"],
    howTo: ["Paste your JWT token into the input field.", "View the decoded header and payload.", "Check expiry time and algorithm used."],
    commonMistakes: ["Never paste production secrets or tokens from live systems into online tools."],
    faqs: [
      { question: "Is JWT decoding secure?", answer: "Decoding only reads the payload — it does NOT verify the signature. Never share secret tokens publicly." }
    ]
  },
  {
    slug: "ip-lookup",
    name: "IP Address Lookup & Geolocation",
    category: "developer-tools",
    description: "Look up any IP address to find its country, city, ISP, timezone, latitude, and longitude.",
    icon: "Globe2",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 820,
    keywords: ["ip lookup", "ip geolocation", "find ip location", "ip address checker"],
    features: ["Country, region, city detection", "ISP & organization info", "Timezone & coordinates", "My IP auto-detection"],
    benefits: ["Diagnose network and VPN issues", "Verify geolocation of server IPs", "Security analysis of suspicious IPs"],
    howTo: ["Enter an IP address or leave blank to check your own.", "Click 'Lookup IP'.", "View geolocation and network details."],
    commonMistakes: ["Expecting street-level accuracy — IP geolocation is city-level at best."],
    faqs: [
      { question: "How accurate is IP geolocation?", answer: "Typically accurate to city level (within ~50km), rarely to exact street address." }
    ]
  },

  // ── JSON TOOLS ───────────────────────────────────────────────────────────
  {
    slug: "json-formatter",
    name: "JSON Formatter, Validator & Minifier",
    category: "json-tools",
    description: "Format, validate, beautify, and minify JSON data with error highlights and tree structure.",
    icon: "Braces",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4200,
    keywords: ["json formatter", "json validator", "json beautifier", "json minifier"],
    features: ["Syntax error pinpointing", "Indentation control (2 or 4 spaces)", "One-click minification", "Collapsible tree visualizer"],
    benefits: ["Debug broken API responses in seconds", "Reduce JSON payload size for production", "Beautify messy JSON data"],
    howTo: ["Paste unformatted or stringified JSON.", "Click 'Format / Validate'.", "Review errors or copy beautified output."],
    commonMistakes: ["Leaving trailing commas in JSON objects, which causes syntax errors."],
    faqs: [
      { question: "Why is my JSON failing validation?", answer: "Check for unquoted property keys, single quotes instead of double quotes, or trailing commas." }
    ]
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV Converter",
    category: "json-tools",
    description: "Convert JSON arrays to CSV spreadsheet format instantly with custom delimiter and header options.",
    icon: "Table",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1120,
    keywords: ["json to csv", "convert json to csv", "json array to spreadsheet", "json csv converter"],
    features: ["Automatic column header detection", "Custom delimiter (comma, semicolon, tab)", "Nested object flattening", "Download as .csv file"],
    benefits: ["Import JSON API data into Excel or Google Sheets", "Share data with non-technical stakeholders", "Process data in spreadsheet apps"],
    howTo: ["Paste your JSON array into the input.", "Choose your delimiter.", "Click 'Convert' and download the CSV file."],
    commonMistakes: ["Trying to convert deeply nested JSON without flattening first."],
    faqs: [
      { question: "Does it handle nested JSON objects?", answer: "Yes, nested objects are automatically flattened using dot notation (e.g., user.name)." }
    ]
  },
  {
    slug: "json-to-yaml",
    name: "JSON to YAML Converter",
    category: "json-tools",
    description: "Convert JSON configuration files to YAML format and vice versa for DevOps and configuration management.",
    icon: "FileJson",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 680,
    keywords: ["json to yaml", "yaml to json", "json yaml converter", "configuration file converter"],
    features: ["Bidirectional JSON ↔ YAML conversion", "Indentation level control", "Comment preservation", "Syntax validation"],
    benefits: ["Switch between YAML and JSON for DevOps configs", "Use in Kubernetes, Docker Compose, and CI/CD files", "Instantly convert API responses to config format"],
    howTo: ["Paste JSON or YAML into the input field.", "Select conversion direction.", "Click 'Convert' and copy output."],
    commonMistakes: ["YAML is whitespace-sensitive — ensure consistent indentation."],
    faqs: [
      { question: "Is YAML a superset of JSON?", answer: "Yes, all valid JSON is valid YAML. YAML additionally supports comments and more human-friendly syntax." }
    ]
  },

  // ── HTML TOOLS ───────────────────────────────────────────────────────────
  {
    slug: "html-formatter",
    name: "HTML Code Formatter & Beautifier",
    category: "html-tools",
    description: "Format messy HTML code with proper indentation, tag alignment, and clean structure.",
    icon: "Code",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 940,
    keywords: ["html formatter", "html beautifier", "format html online", "clean html code"],
    features: ["Custom tab width selection", "Preserve or strip inline script tags", "Instant syntax check"],
    benefits: ["Improve code readability", "Clean up messy web scraper output"],
    howTo: ["Paste unformatted HTML code.", "Click 'Format HTML'.", "Copy clean beautified code."],
    commonMistakes: ["Formatting HTML with unclosed custom tags."],
    faqs: [
      { question: "Does this tool strip HTML comments?", answer: "You can toggle whether to preserve or remove HTML comments during formatting." }
    ]
  },
  {
    slug: "html-to-markdown",
    name: "HTML to Markdown Converter",
    category: "html-tools",
    description: "Convert HTML code into clean Markdown syntax for documentation, README files, and static site generators.",
    icon: "FileDown",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 460,
    keywords: ["html to markdown", "convert html to md", "html markdown converter", "website to markdown"],
    features: ["Handles headings, lists, links, images, tables", "Preserves code blocks", "Cleans up unnecessary tags", "Download as .md file"],
    benefits: ["Migrate HTML docs to Markdown quickly", "Convert web pages for GitHub README files", "Prepare content for Jekyll/Hugo static sites"],
    howTo: ["Paste your HTML code into the input.", "Click 'Convert to Markdown'.", "Copy or download the resulting .md file."],
    commonMistakes: ["Expecting pixel-perfect layout — Markdown has limited styling options."],
    faqs: [
      { question: "Can it convert a full webpage?", answer: "Paste the page's HTML source code for conversion. JavaScript-rendered content will not be available." }
    ]
  },
  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder & Decoder",
    category: "html-tools",
    description: "Encode special characters into HTML entities and decode HTML entities back to readable characters.",
    icon: "Code2",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 380,
    keywords: ["html entity encoder", "html encode decode", "special character encoder", "html escape tool"],
    features: ["Encode & decode mode toggle", "Named entity support (&amp;, &lt;, &gt;)", "Numeric entity support (&#60;)", "Bulk text processing"],
    benefits: ["Prevent XSS by encoding user input", "Fix broken HTML entities in legacy code", "Display code snippets safely on web pages"],
    howTo: ["Paste your text or HTML into the input.", "Select Encode or Decode mode.", "Copy the processed output."],
    commonMistakes: ["Double-encoding HTML entities, creating garbled text."],
    faqs: [
      { question: "When should I encode HTML entities?", answer: "Always encode untrusted user input before inserting it into HTML to prevent Cross-Site Scripting (XSS)." }
    ]
  },

  // ── CSS TOOLS ────────────────────────────────────────────────────────────
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    category: "css-tools",
    description: "Create beautiful linear, radial, and conic CSS gradients with a visual editor and live preview.",
    icon: "Palette",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2100,
    keywords: ["css gradient generator", "linear gradient maker", "radial gradient creator", "gradient css tool"],
    features: ["Linear, Radial & Conic gradient types", "Multi-stop color picker", "Angle & position controls", "Copy CSS code instantly"],
    benefits: ["Design stunning background gradients", "No more manual CSS gradient syntax", "Preview before copying code"],
    howTo: ["Choose gradient type (linear, radial, conic).", "Add color stops and set their positions.", "Copy the generated CSS background property."],
    commonMistakes: ["Forgetting browser prefix `-webkit-` for older Safari support."],
    faqs: [
      { question: "Can I use gradients as border colors?", answer: "Yes, use `border-image` with a gradient, though `background-clip: text` is more commonly used." }
    ]
  },
  {
    slug: "css-box-shadow-generator",
    name: "CSS Box Shadow Generator",
    category: "css-tools",
    description: "Create and customize CSS box-shadow properties visually with offset, blur, spread, and color controls.",
    icon: "Square",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 980,
    keywords: ["css box shadow", "box shadow generator", "css shadow maker", "box shadow designer"],
    features: ["X/Y offset sliders", "Blur & Spread radius control", "Inset shadow toggle", "Multi-shadow layer support"],
    benefits: ["Create depth & elevation effects for UI", "No need to memorize box-shadow syntax", "Layer multiple shadows for premium look"],
    howTo: ["Adjust offset, blur, and spread sliders.", "Pick shadow color and opacity.", "Copy the generated CSS `box-shadow` property."],
    commonMistakes: ["Using very high blur radius which can cause performance issues."],
    faqs: [
      { question: "Can I add multiple shadows?", answer: "Yes, add multiple shadow layers separated by commas in the CSS output." }
    ]
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier & Compressor",
    category: "css-tools",
    description: "Compress and minify CSS files by removing whitespace, comments, and redundant rules to reduce file size.",
    icon: "Minimize2",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 770,
    keywords: ["css minifier", "css compressor", "minify css online", "reduce css size"],
    features: ["Whitespace & comment removal", "Shorthand property consolidation", "Before/after size comparison", "Download minified file"],
    benefits: ["Reduce page load times and bandwidth", "Improve Google PageSpeed score", "Shrink CSS file size by up to 60%"],
    howTo: ["Paste your CSS code or upload a .css file.", "Click 'Minify CSS'.", "Copy or download the compressed output."],
    commonMistakes: ["Minifying unprocessed SCSS/Less files — compile first."],
    faqs: [
      { question: "Can minified CSS be reversed?", answer: "There are beautifiers that can reformat it, but lost comments and formatting cannot be recovered." }
    ]
  },
  {
    slug: "css-flexbox-generator",
    name: "CSS Flexbox Layout Generator",
    category: "css-tools",
    description: "Visually build Flexbox layouts with a live playground and copy ready CSS and HTML code.",
    icon: "LayoutDashboard",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1340,
    keywords: ["flexbox generator", "css flexbox tool", "flexbox playground", "flex layout maker"],
    features: ["Visual Flexbox container controls", "All flex properties (direction, wrap, justify, align)", "Child item controls", "Copy CSS + HTML code"],
    benefits: ["Learn Flexbox visually without memorizing properties", "Build responsive layouts in minutes", "Test alignment edge cases easily"],
    howTo: ["Adjust flex container properties using the controls.", "Add child items and set their flex properties.", "Copy generated HTML/CSS for your project."],
    commonMistakes: ["Setting `flex-shrink: 0` on items that should shrink on small screens."],
    faqs: [
      { question: "Should I use Flexbox or Grid?", answer: "Flexbox is ideal for 1D layouts (row or column). Grid is better for 2D layouts with rows AND columns." }
    ]
  },

  // ── JAVASCRIPT TOOLS ─────────────────────────────────────────────────────
  {
    slug: "js-minifier",
    name: "JavaScript Minifier & Compressor",
    category: "javascript-tools",
    description: "Minify JavaScript code by removing whitespace, comments, and shortening variable names for production.",
    icon: "FileCode2",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 860,
    keywords: ["javascript minifier", "js compressor", "minify js online", "javascript optimizer"],
    features: ["Variable name shortening", "Dead code elimination", "Comment stripping", "Size comparison report"],
    benefits: ["Reduce JS bundle size for faster page loads", "Improve Core Web Vitals performance scores", "Obfuscate code from casual readers"],
    howTo: ["Paste your JavaScript source code.", "Click 'Minify JS'.", "Copy or download the compressed output."],
    commonMistakes: ["Minifying code with dynamic `eval()` — can break variable name shortening."],
    faqs: [
      { question: "What is the average compression ratio?", answer: "Typically 40-70% reduction in file size depending on code verbosity." }
    ]
  },
  {
    slug: "js-formatter",
    name: "JavaScript Formatter & Beautifier",
    category: "javascript-tools",
    description: "Beautify and format minified or poorly indented JavaScript code to readable clean format.",
    icon: "AlignLeft",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1020,
    keywords: ["javascript formatter", "js beautifier", "format js online", "javascript pretty print"],
    features: ["Indentation control (2 or 4 spaces)", "Semicolon style options", "ES6+ syntax support", "Instant processing"],
    benefits: ["Read and debug minified third-party scripts", "Standardize team code formatting", "Prepare code for review or documentation"],
    howTo: ["Paste minified or unformatted JavaScript.", "Click 'Format JavaScript'.", "Copy the readable formatted code."],
    commonMistakes: ["Formatting transpiled code instead of the original source."],
    faqs: [
      { question: "Does this support TypeScript?", answer: "Basic TypeScript syntax is handled, but type-specific formatting works best with a TypeScript-aware formatter." }
    ]
  },

  // ── SECURITY TOOLS ───────────────────────────────────────────────────────
  {
    slug: "password-generator",
    name: "Strong Password Generator",
    category: "security-tools",
    description: "Generate highly secure, random passwords with custom length, symbols, numbers, and entropy analysis.",
    icon: "ShieldCheck",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4100,
    keywords: ["password generator", "strong password maker", "random password creator", "secure password tool"],
    features: ["Custom length (4-128 characters)", "Symbol, number, uppercase toggles", "Entropy strength meter", "Bulk generation mode"],
    benefits: ["Create unhackable passwords instantly", "Never reuse weak passwords again", "Generate passwords for all services at once"],
    howTo: ["Set desired password length.", "Toggle character types (uppercase, symbols, numbers).", "Click 'Generate Password' and copy."],
    commonMistakes: ["Storing generated passwords in plain text files."],
    faqs: [
      { question: "What makes a password strong?", answer: "Length (16+ chars), randomness, and a mix of uppercase, lowercase, numbers, and symbols." }
    ]
  },
  {
    slug: "password-strength-checker",
    name: "Password Strength Checker",
    category: "security-tools",
    description: "Analyze your password strength, entropy bits, crack time estimate, and get improvement suggestions.",
    icon: "Lock",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1560,
    keywords: ["password strength checker", "password security tester", "how strong is my password", "password entropy calculator"],
    features: ["Entropy bit calculation", "Crack time estimation", "Weakness pattern detection", "Improvement tips"],
    benefits: ["Know if your password is truly secure", "Understand why certain passwords are weak", "Improve account security immediately"],
    howTo: ["Type your password into the secure input field.", "View real-time strength analysis and crack time estimate.", "Follow suggestions to improve score."],
    commonMistakes: ["Testing your actual account passwords in any online tool."],
    faqs: [
      { question: "Is my password sent to your server?", answer: "No, all analysis is 100% client-side. Your password never leaves your browser." }
    ]
  },

  // ── ENCODING TOOLS ───────────────────────────────────────────────────────
  {
    slug: "base64-encoder",
    name: "Base64 Encoder & Decoder",
    category: "encoding-tools",
    description: "Encode text or binary data into Base64 strings, or decode Base64 back to plain text.",
    icon: "Binary",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 1670,
    keywords: ["base64 encoder", "base64 decoder", "base64 string converter", "encode decode base64"],
    features: ["UTF-8 character support", "Encode / Decode mode toggle", "Instant automatic conversion"],
    benefits: ["Safely transmit data across networks", "Embed small data payloads in URLs and code"],
    howTo: ["Select 'Encode' or 'Decode' mode.", "Enter input text.", "Copy the result immediately."],
    commonMistakes: ["Confusing Base64 encoding with security encryption."],
    faqs: [
      { question: "Is Base64 encryption?", answer: "No, Base64 is an encoding format, not an encryption or security algorithm." }
    ]
  },
  {
    slug: "url-encoder",
    name: "URL Encoder & Decoder",
    category: "encoding-tools",
    description: "Percent-encode special characters in URLs or decode encoded URL strings back to readable format.",
    icon: "Link2",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 920,
    keywords: ["url encoder", "url decoder", "percent encoding", "url encode decode"],
    features: ["Full URL and component encoding modes", "Decode encoded query strings", "Safe character detection"],
    benefits: ["Fix broken URLs with special characters", "Prepare API query parameters correctly", "Decode complex URL strings easily"],
    howTo: ["Enter a URL or string.", "Click 'Encode URL' or 'Decode URL'.", "Copy the processed result."],
    commonMistakes: ["Encoding a full URL instead of only the query parameter values."],
    faqs: [
      { question: "What characters need URL encoding?", answer: "Spaces, &, ?, =, #, and most non-ASCII characters require percent-encoding in URLs." }
    ]
  },

  // ── HASH TOOLS ───────────────────────────────────────────────────────────
  {
    slug: "hash-generator",
    name: "Cryptographic Hash Generator (MD5, SHA-256)",
    category: "hash-tools",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly from any text string.",
    icon: "Lock",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 1290,
    keywords: ["sha256 generator", "md5 hash generator", "sha512 maker", "crypto hash tool"],
    features: ["Simultaneous calculation of MD5, SHA1, SHA256, SHA512", "Upper/Lowercase hex format toggle", "Copy individually"],
    benefits: ["Verify data integrity", "Generate checksums for file verification"],
    howTo: ["Type or paste your text input.", "View all generated cryptographic hashes instantly below."],
    commonMistakes: ["Using MD5 for secure password hashing (use bcrypt/Argon2 instead)."],
    faqs: [
      { question: "Can a cryptographic hash be reversed?", answer: "No, cryptographic hashes are one-way mathematical functions." }
    ]
  },

  // ── IMAGE TOOLS ──────────────────────────────────────────────────────────
  {
    slug: "qr-generator",
    name: "Custom QR Code Generator",
    category: "image-tools",
    description: "Generate high-resolution QR codes for websites, Wi-Fi passwords, vCards, or text with download options.",
    icon: "QrCode",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3890,
    keywords: ["qr code generator", "free qr maker", "custom qr code", "wifi qr code generator"],
    features: ["URL, Text, WiFi, & Email payload modes", "Custom foreground & background colors", "Download as PNG", "High error correction"],
    benefits: ["Direct offline users to online links instantly", "Create print-ready QR graphics"],
    howTo: ["Select content type (URL, Text, WiFi).", "Enter details and pick colors.", "Click 'Download PNG' to save your QR code."],
    commonMistakes: ["Creating dark QR codes on dark backgrounds that cameras cannot scan."],
    faqs: [
      { question: "Do generated QR codes expire?", answer: "No, static QR codes never expire." }
    ]
  },
  {
    slug: "barcode-generator",
    name: "Online Barcode Generator",
    category: "image-tools",
    description: "Generate standard 1D barcodes (Code128, EAN-13, UPC) for inventory and product labeling.",
    icon: "Barcode",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 650,
    keywords: ["barcode generator", "code128 generator", "upc barcode maker", "free barcode tool"],
    features: ["Code128 format support", "Custom barcode height & width", "Download SVG or PNG"],
    benefits: ["Label products for retail & warehouse management", "Create scannable inventory codes"],
    howTo: ["Type alphanumeric string.", "Set bar height.", "Download image."],
    commonMistakes: ["Using invalid non-numeric characters for EAN-13 barcodes."],
    faqs: [
      { question: "What characters are supported in Code128?", answer: "Code128 supports all 128 standard ASCII characters." }
    ]
  },
  {
    slug: "image-resizer",
    name: "Image Resizer & Canvas Converter",
    category: "image-tools",
    description: "Resize images by exact pixels or percentage while converting between PNG, JPG, and WEBP formats directly in browser.",
    icon: "Image",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 1980,
    keywords: ["image resizer", "png to jpg converter", "webp converter", "resize image online"],
    features: ["100% Client-side processing (Privacy guaranteed)", "Aspect ratio lock option", "Format conversion (PNG, JPG, WEBP)", "Instant preview"],
    benefits: ["No image uploads to server - fast & secure", "Reduce image dimension for faster page loads"],
    howTo: ["Upload an image file.", "Specify target width/height or format.", "Click 'Download Resized Image'."],
    commonMistakes: ["Distorting images by unlocking aspect ratio unintentionally."],
    faqs: [
      { question: "Are my images stored on your server?", answer: "No, all processing happens locally inside your browser using HTML5 Canvas." }
    ]
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    category: "image-tools",
    description: "Convert any image or emoji into a browser favicon in multiple sizes (16x16, 32x32, 48x48) for your website.",
    icon: "Smile",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 540,
    keywords: ["favicon generator", "create favicon", "ico file generator", "favicon maker online"],
    features: ["Multiple size output (16px, 32px, 48px)", "PNG and ICO format download", "Emoji to favicon conversion", "Transparent background support"],
    benefits: ["Brand your browser tab professionally", "Create favicons from any image in seconds", "Improve website identity"],
    howTo: ["Upload your logo image or enter an emoji.", "Select desired favicon sizes.", "Click 'Generate & Download Favicon'."],
    commonMistakes: ["Using a low-resolution source image that becomes blurry at 16x16px."],
    faqs: [
      { question: "What format does favicon use?", answer: "Modern browsers support PNG and SVG favicons. ICO format is still used for maximum browser compatibility." }
    ]
  },

  // ── COLOR TOOLS ──────────────────────────────────────────────────────────
  {
    slug: "color-picker",
    name: "Color Picker, HEX/RGB/HSL & Palette Generator",
    category: "color-tools",
    description: "Pick colors, convert formats (HEX, RGB, HSL), calculate WCAG contrast ratios, and generate palettes.",
    icon: "Droplet",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2450,
    keywords: ["color picker", "hex to rgb", "wcag contrast checker", "color palette generator"],
    features: ["HEX, RGB, HSL instant converter", "WCAG AA/AAA accessibility contrast meter", "Monochromatic & complementary palette generation"],
    benefits: ["Ensure website UI meets accessibility compliance", "Create harmonious design palettes fast"],
    howTo: ["Use visual color wheel or type HEX code.", "View RGB and HSL equivalents.", "Check WCAG accessibility pass/fail indicators."],
    commonMistakes: ["Using low contrast text colors that fail WCAG standards."],
    faqs: [
      { question: "What is WCAG AA contrast ratio?", answer: "Minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text." }
    ]
  },
  {
    slug: "color-palette-generator",
    name: "AI Color Palette Generator",
    category: "color-tools",
    description: "Generate beautiful 5-color harmonious palettes from a base color — complementary, triadic, analogous & more.",
    icon: "Swatch",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 1780,
    keywords: ["color palette generator", "ai palette maker", "design color scheme", "complementary colors"],
    features: ["6 palette modes (Complementary, Analogous, Triadic, Monochromatic, Split-Complementary)", "HEX & RGB export", "CSS variable output", "Locked color re-generation"],
    benefits: ["Create professional design color schemes instantly", "Build accessible UI color systems", "Match brand colors consistently"],
    howTo: ["Enter a base HEX color or use the color picker.", "Select palette type (Complementary, Triadic, etc.).", "Copy individual colors or the full CSS variable set."],
    commonMistakes: ["Using too many vibrant colors — limit to 1-2 accent colors."],
    faqs: [
      { question: "What is a complementary color scheme?", answer: "Colors opposite each other on the color wheel — high contrast and visually striking." }
    ]
  },

  // ── GENERATORS ───────────────────────────────────────────────────────────
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Placeholder Generator",
    category: "generators",
    description: "Generate classic filler text by paragraphs, words, sentences, or lists for UI designs and mockups.",
    icon: "AlignLeft",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 890,
    keywords: ["lorem ipsum generator", "filler text maker", "dummy text generator", "latin dummy text"],
    features: ["Paragraphs, words, or lists generator", "Option to start with 'Lorem ipsum dolor...'", "Instant copy"],
    benefits: ["Speed up design workflow", "Fill UI mockups with natural text distribution"],
    howTo: ["Select quantity and type (Paragraphs, Sentences, Words).", "Click 'Generate Lorem Ipsum'.", "Copy text."],
    commonMistakes: ["Forgetting to replace placeholder text before pushing to production!"],
    faqs: [
      { question: "Where does Lorem Ipsum come from?", answer: "It originates from a 45 BC Latin manuscript by Cicero." }
    ]
  },
  {
    slug: "markdown-editor",
    name: "Live Markdown Editor & HTML Converter",
    category: "text-tools",
    description: "Write markdown with instant HTML preview, formatting toolbar, and export options.",
    icon: "Edit3",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 1410,
    keywords: ["markdown editor", "markdown to html", "live markdown preview", "md editor online"],
    features: ["Split-screen live rendering", "Download as `.md` or `.html`", "Cheat sheet quick bar"],
    benefits: ["Draft documentation faster", "Convert Markdown to clean HTML code instantly"],
    howTo: ["Type Markdown syntax on the left pane.", "View formatted output instantly on the right.", "Copy rendered HTML or download file."],
    commonMistakes: ["Forgetting blank lines between paragraphs."],
    faqs: [
      { question: "Can I copy the raw HTML?", answer: "Yes, click 'Copy HTML' to get the raw HTML code." }
    ]
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    category: "generators",
    description: "Generate one or multiple truly random numbers within any custom range with seed and exclusion options.",
    icon: "Dices",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1200,
    keywords: ["random number generator", "random number picker", "number randomizer", "lottery number generator"],
    features: ["Custom min/max range", "Bulk number generation", "No-repeat unique number mode", "Seed reproducibility option"],
    benefits: ["Run fair raffles and lotteries", "Generate test data for development", "Make unbiased random decisions"],
    howTo: ["Set minimum and maximum range values.", "Choose how many numbers to generate.", "Click 'Generate' and copy results."],
    commonMistakes: ["Using small ranges with no-repeat mode when asking for more numbers than range allows."],
    faqs: [
      { question: "Are these truly random numbers?", answer: "Uses cryptographically secure random number generation via the Web Crypto API." }
    ]
  },
  {
    slug: "password-generator-random",
    name: "Random Word & Passphrase Generator",
    category: "generators",
    description: "Generate memorable passphrases from random English words — easier to remember than complex passwords.",
    icon: "Wand2",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 580,
    keywords: ["passphrase generator", "random word generator", "diceware passphrase", "memorable password"],
    features: ["2 to 8 word passphrases", "Word separator options (-, _, space)", "Number & symbol addition", "Entropy display"],
    benefits: ["Create passwords that are both secure AND memorable", "Eliminate the password recall problem", "Higher entropy than most complex passwords"],
    howTo: ["Select the number of words (4-6 recommended).", "Choose separator and extra character options.", "Click 'Generate Passphrase' and copy."],
    commonMistakes: ["Using fewer than 4 words — short passphrases are weak."],
    faqs: [
      { question: "Are passphrases more secure than complex passwords?", answer: "A 5-word passphrase has ~65 bits of entropy, stronger than most 8-character complex passwords." }
    ]
  },

  // ── SOCIAL MEDIA TOOLS ───────────────────────────────────────────────────
  {
    slug: "hashtag-generator",
    name: "AI Hashtag Generator",
    category: "social-media-tools",
    description: "Generate high-reach hashtags for Instagram, TikTok, Twitter, and LinkedIn based on your topic or post.",
    icon: "Hash",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 1870,
    keywords: ["hashtag generator", "instagram hashtags", "tiktok hashtags", "best hashtags for posts"],
    features: ["Platform-specific hashtag sets", "Mix of high/medium/niche reach", "One-click copy all", "30-tag limit grouping for Instagram"],
    benefits: ["Increase post discoverability significantly", "Reach new audiences beyond followers", "Save time researching hashtags manually"],
    howTo: ["Enter your post topic or keywords.", "Select target platform.", "Click 'Generate Hashtags' and copy the set."],
    commonMistakes: ["Using only mega-popular hashtags where your post gets buried instantly."],
    faqs: [
      { question: "How many hashtags should I use on Instagram?", answer: "Instagram recommends 3-5 highly relevant hashtags, though up to 30 are allowed." }
    ]
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    category: "social-media-tools",
    description: "Download any YouTube video thumbnail in all available resolutions (SD, HD, Full HD, Maxres) instantly.",
    icon: "Youtube",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2300,
    keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "yt thumbnail extractor", "youtube preview image"],
    features: ["All resolution options (SD, HQ, HD, Max)", "Instant URL parsing", "Direct image download", "Batch video support"],
    benefits: ["Download competitor thumbnails for research", "Reuse your own thumbnails across platforms", "Get HD thumbnail quickly without recording"],
    howTo: ["Paste a YouTube video URL.", "Choose desired image resolution.", "Click 'Download Thumbnail'."],
    commonMistakes: ["Using thumbnails from other creators without permission."],
    faqs: [
      { question: "What is the max YouTube thumbnail size?", answer: "The highest quality is maxresdefault.jpg at 1280x720 pixels." }
    ]
  },
  {
    slug: "twitter-character-counter",
    name: "Twitter / X Character Counter",
    category: "social-media-tools",
    description: "Count characters for Twitter/X posts with thread numbering, link handling, and engagement tips.",
    icon: "Twitter",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 620,
    keywords: ["twitter character counter", "tweet length checker", "x post counter", "280 character limit"],
    features: ["Real-time 280 character countdown", "Link counts as 23 chars detection", "Thread numbering mode", "Emoji count handling"],
    benefits: ["Never exceed tweet character limits", "Plan Twitter threads efficiently", "Optimize every character for impact"],
    howTo: ["Type or paste your tweet draft.", "Watch the character counter update in real-time.", "Split into thread if over 280 characters."],
    commonMistakes: ["Not accounting for links, which always count as 23 characters regardless of length."],
    faqs: [
      { question: "How many characters does Twitter/X allow?", answer: "Standard accounts get 280 characters. Twitter Blue/X Premium subscribers get up to 25,000 characters." }
    ]
  },

  // ── PRODUCTIVITY TOOLS ───────────────────────────────────────────────────
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Focus Timer",
    category: "productivity-tools",
    description: "Boost deep work sessions with customizable Pomodoro intervals, break timers, and session tracking.",
    icon: "Timer",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3200,
    keywords: ["pomodoro timer", "focus timer", "work timer online", "25 minute timer"],
    features: ["Customizable work/short/long break durations", "Session counter", "Browser notification alerts", "Ambient sound toggle"],
    benefits: ["Build sustainable deep work habits", "Reduce mental fatigue with structured breaks", "Track daily focus session count"],
    howTo: ["Set your focus duration (default 25 mins) and break times.", "Click 'Start Pomodoro'.", "Work until the timer rings, then take your break."],
    commonMistakes: ["Skipping short breaks — they are essential for sustained concentration."],
    faqs: [
      { question: "What is the Pomodoro Technique?", answer: "Developed by Francesco Cirillo in the 1980s, it uses 25-minute focused work sessions alternating with 5-minute breaks." }
    ]
  },
  {
    slug: "note-taking-tool",
    name: "Quick Notes & Sticky Notes",
    category: "productivity-tools",
    description: "Take quick notes, checklists, and sticky-note memos that auto-save in your browser locally.",
    icon: "StickyNote",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 760,
    keywords: ["online notepad", "sticky notes online", "quick note tool", "browser notes"],
    features: ["Auto-save to localStorage", "Multiple note tabs", "Checklist mode", "Export as .txt file"],
    benefits: ["Capture ideas without switching apps", "No account or login required", "Notes persist between sessions"],
    howTo: ["Click 'New Note' to create a note.", "Type freely — auto-saved instantly.", "Export as text file anytime."],
    commonMistakes: ["Clearing browser data, which deletes locally saved notes."],
    faqs: [
      { question: "Do notes sync across devices?", answer: "Notes are stored in browser localStorage. For cross-device sync, export and import the text file." }
    ]
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "productivity-tools",
    description: "Calculate exact reading time for any article or blog post at custom words-per-minute speeds.",
    icon: "BookOpen",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 410,
    keywords: ["reading time calculator", "how long to read", "article reading time", "wpm reading estimator"],
    features: ["Custom WPM speed settings (Slow 150, Average 225, Fast 300)", "Word count display", "Page estimate at 300 words/page", "Audio book time estimate"],
    benefits: ["Set reader expectations in blog posts", "Plan reading lists by available time", "Optimize article length for attention spans"],
    howTo: ["Paste your article text.", "Set your reading speed.", "View calculated reading time instantly."],
    commonMistakes: ["Using the default speed without adjusting for technical or dense content which reads slower."],
    faqs: [
      { question: "What is the average adult reading speed?", answer: "Approximately 200-250 words per minute for non-fiction, 300+ for light fiction." }
    ]
  },

  // ── MATH TOOLS ───────────────────────────────────────────────────────────
  {
    slug: "percentage-calculator",
    name: "Universal Percentage Calculator",
    category: "math-tools",
    description: "Calculate percentage change, percentage of a number, percentage increase/decrease, and discount values.",
    icon: "Calculator",
    featured: true,
    trending: false,
    rating: 4.8,
    reviewsCount: 1730,
    keywords: ["percentage calculator", "calculate percentage increase", "discount calculator", "percent difference"],
    features: ["4 calculation modes in 1 tool", "Instant calculation output", "Step-by-step mathematical breakdown"],
    benefits: ["Solve everyday math & financial discounts instantly", "Avoid mental math errors"],
    howTo: ["Select calculation mode.", "Fill in numbers.", "Read instant result."],
    commonMistakes: ["Confusing percentage change with total percentage."],
    faqs: [
      { question: "How do I calculate 20% off a price?", answer: "Multiply the total price by 0.20 and subtract that value from original price." }
    ]
  },
  {
    slug: "scientific-calculator",
    name: "Online Scientific Calculator",
    category: "math-tools",
    description: "Perform trigonometric (sin, cos, tan), logarithmic (log, ln), exponential, and algebraic calculations.",
    icon: "Atom",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1100,
    keywords: ["scientific calculator", "trigonometry calculator", "online calculator", "logarithm calculator"],
    features: ["Radian and Degree angle mode toggle", "Trig functions, exponents, square roots, pi, e", "Calculation history log"],
    benefits: ["Solve complex scientific & engineering homework equations"],
    howTo: ["Use onscreen buttons or keyboard input to evaluate mathematical expressions."],
    commonMistakes: ["Calculations in Radians when expecting Degrees mode."],
    faqs: [
      { question: "How do I switch between DEG and RAD?", answer: "Click the 'DEG/RAD' toggle button on top of the calculator." }
    ]
  },
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator & Simplifier",
    category: "math-tools",
    description: "Add, subtract, multiply, and divide fractions with automatic simplification and mixed number conversion.",
    icon: "Divide",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 720,
    keywords: ["fraction calculator", "simplify fractions", "add fractions", "mixed number calculator"],
    features: ["All 4 arithmetic operations", "GCD-based automatic simplification", "Mixed number output option", "Step-by-step solution"],
    benefits: ["Solve fraction homework in seconds", "Understand simplification steps visually", "Handle complex mixed number arithmetic"],
    howTo: ["Enter numerator and denominator for both fractions.", "Select operation (+, -, ×, ÷).", "Click 'Calculate' to see simplified result."],
    commonMistakes: ["Forgetting to find a common denominator before adding fractions."],
    faqs: [
      { question: "What is fraction simplification?", answer: "Dividing numerator and denominator by their Greatest Common Divisor (GCD) to get the smallest equivalent fraction." }
    ]
  },

  // ── HEALTH CALCULATORS ───────────────────────────────────────────────────
  {
    slug: "bmi-calculator",
    name: "Body Mass Index (BMI) Calculator",
    category: "health-calculators",
    description: "Calculate your Body Mass Index (BMI), ideal weight range, and WHO health categories.",
    icon: "HeartPulse",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 2900,
    keywords: ["bmi calculator", "body mass index", "ideal weight calculator", "health calculator"],
    features: ["Metric (kg/cm) and Imperial (lbs/inches) units", "WHO BMI category classification gauge", "Ideal weight target range"],
    benefits: ["Understand body mass metrics quickly", "Track health and fitness goals"],
    howTo: ["Select metric or imperial unit system.", "Enter your weight and height.", "Click 'Calculate BMI'."],
    commonMistakes: ["Confusing height in inches with height in feet."],
    faqs: [
      { question: "What is a normal BMI range?", answer: "According to WHO, a normal BMI for adults is between 18.5 and 24.9." }
    ]
  },
  {
    slug: "age-calculator",
    name: "Exact Age Calculator",
    category: "health-calculators",
    description: "Calculate your exact age down to years, months, weeks, days, hours, and minutes based on birthdate.",
    icon: "Calendar",
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 3400,
    keywords: ["age calculator", "calculate age in days", "exact age generator", "how old am i"],
    features: ["Years, Months, Days breakdown", "Total days, hours, minutes lived calculation", "Next birthday countdown timer"],
    benefits: ["Find exact age for legal & official forms", "Fun statistics on total days lived"],
    howTo: ["Select your Date of Birth.", "Click 'Calculate Age'.", "View breakdown of age metrics and birthday countdown."],
    commonMistakes: ["Selecting a future date as birthdate."],
    faqs: [
      { question: "Does this account for leap years?", answer: "Yes, exact leap year days are factored into calculations." }
    ]
  },
  {
    slug: "calorie-calculator",
    name: "Daily Calorie & TDEE Calculator",
    category: "health-calculators",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and recommended calorie intake based on activity level.",
    icon: "Flame",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1940,
    keywords: ["calorie calculator", "tdee calculator", "daily calorie needs", "bmr calculator"],
    features: ["BMR calculation (Mifflin-St Jeor formula)", "5 activity level multipliers", "Weight loss/gain calorie targets", "Macro split breakdown"],
    benefits: ["Plan diet and nutrition accurately", "Understand your maintenance calories", "Set realistic weight management goals"],
    howTo: ["Enter age, weight, height, and biological sex.", "Select your activity level.", "View TDEE, BMR, and goal-based calorie targets."],
    commonMistakes: ["Selecting 'Very Active' when only moderately active, overestimating calorie needs."],
    faqs: [
      { question: "What is TDEE?", answer: "Total Daily Energy Expenditure — the total calories your body burns per day including all activities." }
    ]
  },

  // ── FINANCE TOOLS ────────────────────────────────────────────────────────
  {
    slug: "emi-calculator",
    name: "EMI & Loan Mortgage Calculator",
    category: "finance-tools",
    description: "Calculate Equated Monthly Installments (EMI), total interest payable, and total loan payment breakdown.",
    icon: "DollarSign",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2150,
    keywords: ["emi calculator", "loan payment calculator", "mortgage calculator", "interest calculator"],
    features: ["Loan principal, interest rate & tenure input", "Total interest vs Principal visual gauge", "Amortization summary"],
    benefits: ["Plan financial budget before taking home/car loans", "Compare different interest rates easily"],
    howTo: ["Enter total loan amount.", "Specify annual interest rate percentage.", "Set tenure in years or months and click Calculate."],
    commonMistakes: ["Entering monthly interest rate instead of annual rate."],
    faqs: [
      { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment, a fixed payment made by a borrower to a lender at a specified date each month." }
    ]
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "finance-tools",
    description: "Calculate compound interest growth over time with principal, rate, compounding frequency, and time inputs.",
    icon: "TrendingUp",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 1680,
    keywords: ["compound interest calculator", "investment growth calculator", "interest compounding tool", "future value calculator"],
    features: ["Daily, monthly, quarterly, yearly compounding", "Regular contribution support", "Future value vs initial investment chart", "Inflation adjustment option"],
    benefits: ["Understand the power of compound growth", "Plan long-term investment strategy", "Compare different compounding frequencies"],
    howTo: ["Enter principal amount, annual interest rate, and time period.", "Select compounding frequency.", "Click 'Calculate' to see future value and interest earned."],
    commonMistakes: ["Confusing APR (annual percentage rate) with APY (annual percentage yield)."],
    faqs: [
      { question: "How often does compound interest compound?", answer: "It depends on the account — savings accounts may compound daily, bonds quarterly or annually." }
    ]
  },
  {
    slug: "gst-tax-calculator",
    name: "GST & Tax Calculator",
    category: "finance-tools",
    description: "Calculate GST, VAT, or sales tax amounts to add or remove from prices with multiple rate support.",
    icon: "Receipt",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1120,
    keywords: ["gst calculator", "vat calculator", "tax calculator", "sales tax estimator"],
    features: ["Add or Remove tax mode", "Custom tax rate input", "Multiple items batch mode", "Net & gross price display"],
    benefits: ["Quickly calculate invoicing amounts with taxes", "Verify supplier invoices", "Understand what portion is tax vs. base price"],
    howTo: ["Enter the original price.", "Input the tax rate percentage.", "Select 'Add Tax' or 'Remove Tax'.", "View breakdown instantly."],
    commonMistakes: ["Confusing 'Add GST' (for consumers) with 'Remove GST' (when the listed price includes tax)."],
    faqs: [
      { question: "What is GST?", answer: "Goods and Services Tax — a value-added tax levied on most goods and services sold domestically." }
    ]
  },

  // ── UNIT CONVERTERS ──────────────────────────────────────────────────────
  {
    slug: "unit-converter",
    name: "Universal Unit Converter",
    category: "unit-converters",
    description: "Convert units of Length, Weight/Mass, Temperature, Area, Volume, and Digital Data Storage.",
    icon: "ArrowLeftRight",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2670,
    keywords: ["unit converter", "length converter", "kg to lbs converter", "celsius to fahrenheit", "mb to gb"],
    features: ["6 Unit domains (Length, Weight, Temp, Storage, Speed, Area)", "Instant bidirectional conversion", "Precision decimal control"],
    benefits: ["Convert imperial and metric measurements effortlessly", "Helpful for engineering, travel, and cooking"],
    howTo: ["Select category tab (e.g. Length).", "Choose 'From' unit and 'To' unit.", "Enter value to convert."],
    commonMistakes: ["Selecting incompatible unit types."],
    faqs: [
      { question: "How many Bytes in a Megabyte?", answer: "There are 1,048,576 Bytes in a Megabyte (binary 1024^2)." }
    ]
  },
  {
    slug: "currency-converter",
    name: "Live Currency Converter",
    category: "unit-converters",
    description: "Convert between 160+ world currencies with daily updated exchange rates for travel and business.",
    icon: "Banknote",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 3100,
    keywords: ["currency converter", "live exchange rates", "usd to eur converter", "forex calculator"],
    features: ["160+ currency support", "Daily rate updates", "Multi-currency comparison", "Historical rate charts"],
    benefits: ["Plan travel budgets accurately", "Make informed international purchases", "Calculate business invoice amounts"],
    howTo: ["Select source and target currencies.", "Enter the amount to convert.", "View converted amount with current exchange rate."],
    commonMistakes: ["Using conversion results for live trading — exchange rates change by the second."],
    faqs: [
      { question: "How often are exchange rates updated?", answer: "Rates are refreshed daily from financial data sources." }
    ]
  },

  // ── STUDENT TOOLS ────────────────────────────────────────────────────────
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "student-tools",
    description: "Calculate your GPA (Grade Point Average) with weighted course credits for US, UK, or custom grading systems.",
    icon: "GraduationCap",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1540,
    keywords: ["gpa calculator", "grade point average", "cumulative gpa", "college gpa calculator"],
    features: ["US 4.0 scale and custom grade scale", "Weighted credit hour support", "Cumulative GPA tracking", "Target GPA planner"],
    benefits: ["Know your standing before report cards", "Plan courses needed to achieve target GPA", "Calculate weighted academic performance"],
    howTo: ["Enter each course name, grade, and credit hours.", "Click 'Calculate GPA'.", "View your semester and cumulative GPA."],
    commonMistakes: ["Not accounting for credit hours — a 3-credit course has 3x the GPA impact of a 1-credit course."],
    faqs: [
      { question: "What is a good GPA?", answer: "A GPA of 3.5 or above (on a 4.0 scale) is typically considered strong for graduate school applications." }
    ]
  },
  {
    slug: "citation-generator",
    name: "Academic Citation Generator",
    category: "student-tools",
    description: "Generate properly formatted APA, MLA, Chicago, and Harvard citations for books, websites, and journals.",
    icon: "Quote",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1980,
    keywords: ["citation generator", "apa citation maker", "mla citation tool", "bibliography generator"],
    features: ["APA 7th edition, MLA 9th, Chicago 17th, Harvard", "Website, book, journal, YouTube source types", "Copy formatted citation", "Full bibliography builder"],
    benefits: ["Avoid plagiarism with properly cited sources", "Save hours formatting bibliographies manually", "Ensure academic citation accuracy"],
    howTo: ["Select citation style (APA, MLA, Chicago, Harvard).", "Choose source type (website, book, article).", "Fill in source details and copy formatted citation."],
    commonMistakes: ["Not verifying generated citations — always double-check formatting against official style guides."],
    faqs: [
      { question: "Which citation style should I use?", answer: "APA is standard for social sciences. MLA for humanities. Chicago for history. Harvard is common in UK institutions." }
    ]
  },

  // ── NEW POPULAR & HIGH DEMAND UTILITY TOOLS (20 ADDITIONS) ────────────────
  {
    slug: "sql-formatter",
    name: "SQL Formatter & Beautifier",
    category: "developer-tools",
    description: "Format, beautify, and clean up messy SQL queries with customizable indentation and keyword casing (UPPERCASE / lowercase).",
    icon: "Database",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2450,
    keywords: ["sql formatter", "format sql online", "sql beautifier", "clean sql query", "sql syntax highlighter"],
    features: ["Supports PostgreSQL, MySQL, SQLite, T-SQL, Oracle", "Customizable indent size (2 or 4 spaces)", "Uppercase vs lowercase keyword conversion", "Minify or beautify queries instantly"],
    benefits: ["Improve database query readability", "Debug complex multi-join SQL queries effortlessly", "Enforce clean code formatting across engineering teams"],
    howTo: ["Paste raw or unformatted SQL code into the input area.", "Select keyword casing and tab indent settings.", "Click 'Format SQL' to copy clean, formatted SQL code."],
    commonMistakes: ["Pasting incomplete syntax strings — ensure SQL clauses have valid statement structure."],
    faqs: [
      { question: "Does this support dialects like PostgreSQL or MySQL?", answer: "Yes, it formats queries across all standard SQL dialects and vendor-specific syntax extensions." }
    ]
  },
  {
    slug: "yaml-to-json",
    name: "YAML to JSON Converter",
    category: "developer-tools",
    description: "Convert YAML configuration files to JSON data format and vice-versa instantly with real-time syntax validation.",
    icon: "FileCode",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1820,
    keywords: ["yaml to json", "convert yaml to json", "json to yaml", "yaml parser online"],
    features: ["Two-way conversion (YAML ↔ JSON)", "Instant syntax error highlighting", "Download converted file as .json or .yaml", "100% browser-based client side parsing"],
    benefits: ["Quickly translate Kubernetes or Docker compose configs", "Inspect complex YAML structure in JSON trees", "Zero latency data transformation"],
    howTo: ["Paste your YAML content into the editor.", "Click 'Convert to JSON'.", "Copy or download the output JSON file."],
    commonMistakes: ["Incorrect YAML indentation — YAML relies strictly on 2-space indentation."],
    faqs: [
      { question: "Can I convert JSON back to YAML?", answer: "Yes, the converter supports bi-directional parsing between JSON and YAML formats." }
    ]
  },
  {
    slug: "cron-job-parser",
    name: "Cron Expression Generator & Explainer",
    category: "developer-tools",
    description: "Build, parse, and translate complex 5-part and 6-part cron expressions into plain human-readable sentences with schedule previews.",
    icon: "Clock",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3120,
    keywords: ["cron generator", "cron expression explainer", "cron syntax maker", "crontab calculator"],
    features: ["Plain English cron translation", "Next 10 execution dates calculator", "Visual picker for minute, hour, day, month, weekday", "Supports Quartz & Linux crontab formats"],
    benefits: ["Eliminate errors when scheduling automated tasks", "Understand existing legacy crontabs instantly", "Verify schedule intervals before deployment"],
    howTo: ["Enter a 5 or 6 part cron expression (e.g. '0 0 * * 1').", "Read the human-readable explanation and next run dates.", "Or use the visual dropdown controls to build a custom cron schedule."],
    commonMistakes: ["Confusing 0-indexed vs 1-indexed weekday values in Linux vs Quartz."],
    faqs: [
      { question: "What does '0 0 * * *' mean?", answer: "It means run every day at midnight (00:00)." }
    ]
  },
  {
    slug: "curl-to-fetch",
    name: "cURL to Code Converter",
    category: "developer-tools",
    description: "Convert raw cURL command line requests into clean JavaScript fetch, Node.js, Python requests, Go, or PHP code snippets.",
    icon: "Terminal",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4210,
    keywords: ["curl to fetch", "curl to python", "curl to code", "convert curl to javascript"],
    features: ["Converts to JS fetch, Axios, Python requests, Go, PHP, Rust", "Parses headers, auth tokens, body payload (JSON/FormData)", "Clean formatted output snippet"],
    benefits: ["Import cURL snippets directly into backend projects", "Save time manually reconstructing HTTP requests in code", "Speed up API integrations"],
    howTo: ["Copy a cURL command from Chrome DevTools or Postman.", "Paste into the input box.", "Select your target language (JavaScript, Python, Go) and copy the code."],
    commonMistakes: ["Omitting quotation marks around URL containing query parameters."],
    faqs: [
      { question: "Can I convert POST requests with headers and JSON bodies?", answer: "Yes, all headers, request methods, query parameters, and request body payloads are fully converted." }
    ]
  },
  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder & Decoder",
    category: "developer-tools",
    description: "Safely encode special characters (&, <, >, \", ') to HTML entities and decode encoded string payloads to prevent XSS vulnerabilities.",
    icon: "Code",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 1290,
    keywords: ["html entity encoder", "html decode", "escape html characters", "xss html encoder"],
    features: ["HTML entity escaping & unescaping", "Supports named entities (&lt;) and numeric entities (&#60;)", "Real-time character count & encoding preview"],
    benefits: ["Prevent Cross-Site Scripting (XSS) in dynamic templates", "Render raw code snippets cleanly in HTML pages", "Decode obfuscated web data"],
    howTo: ["Paste text or code snippet.", "Select 'Encode' or 'Decode'.", "Copy the resulting safe HTML string."],
    commonMistakes: ["Double encoding text that has already been escaped."],
    faqs: [
      { question: "Why should I encode HTML entities?", answer: "Encoding prevents browsers from interpreting raw user inputs as executable HTML or JavaScript tags." }
    ]
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON Converter",
    category: "developer-tools",
    description: "Convert CSV spreadsheets or Excel exports into clean JSON array objects or key-value structures.",
    icon: "Table",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2150,
    keywords: ["csv to json", "convert csv to json", "excel to json", "csv parser online"],
    features: ["Header row detection", "Delimiter auto-detection (comma, tab, semicolon)", "Nested object key support", "Export JSON file"],
    benefits: ["Import tabular data into modern web applications", "Transform database exports into API test payloads", "Fast client-side parsing"],
    howTo: ["Upload or paste your CSV data.", "Configure header and delimiter settings.", "Click 'Convert to JSON' and copy or download the JSON file."],
    commonMistakes: ["Unescaped commas inside quote-enclosed field values."],
    faqs: [
      { question: "Is my file uploaded to a server?", answer: "No, all file parsing occurs 100% locally inside your web browser." }
    ]
  },
  {
    slug: "diff-checker",
    name: "Text & Code Diff Checker",
    category: "text-tools",
    description: "Compare two blocks of text, code, or documents side-by-side to highlight added, deleted, and modified lines in real-time.",
    icon: "GitCompare",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3890,
    keywords: ["diff checker", "compare text online", "code diff tool", "text comparison tool"],
    features: ["Side-by-side and inline split view", "Line-by-line and character-level difference highlighting", "Ignore whitespace option", "Instant diff count summary"],
    benefits: ["Catch subtle code modifications before committing", "Compare draft document revisions", "Spot accidental edits"],
    howTo: ["Paste original text on the left box.", "Paste modified text on the right box.", "View color-coded added (green) and removed (red) differences instantly."],
    commonMistakes: ["Comparing files with different line-ending styles (CRLF vs LF)."],
    faqs: [
      { question: "Can I use this for source code comparison?", answer: "Yes, it works for JavaScript, Python, HTML, CSS, Markdown, and raw text." }
    ]
  },
  {
    slug: "readability-score-checker",
    name: "Readability Score & Grade Level Checker",
    category: "writing-tools",
    description: "Analyze text readability using Flesch-Kincaid, Gunning Fog Index, and Coleman-Liau formulas to optimize content for your target audience.",
    icon: "BookOpenCheck",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1670,
    keywords: ["readability checker", "flesch kincaid score", "reading grade level", "writing complexity tool"],
    features: ["Flesch Reading Ease score", "Flesch-Kincaid Grade Level", "Gunning Fog Index", "Average sentence length & word count metrics"],
    benefits: ["Ensure content matches your target reader's grade level", "Improve SEO content engagement by reducing sentence complexity", "Write clearer sales copy"],
    howTo: ["Paste your blog post, essay, or article into the analyzer.", "Click 'Analyze Readability'.", "Review scores, grade level estimate, and suggestions to simplify heavy sentences."],
    commonMistakes: ["Writing overly long run-on sentences with multi-syllable jargon."],
    faqs: [
      { question: "What is a good Flesch Reading Ease score?", answer: "A score between 60 and 70 (approx 8th-9th grade level) is ideal for general public online articles." }
    ]
  },
  {
    slug: "ai-headline-generator",
    name: "AI Viral Headline & Title Generator",
    category: "ai-tools",
    description: "Generate 10 high-CTR, click-worthy headlines and article titles optimized for SEO, YouTube, blog posts, and ad campaigns.",
    icon: "Flame",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2980,
    keywords: ["ai headline generator", "blog title maker", "clickbait title generator", "youtube title generator"],
    features: ["Generates 10 distinct headline angles (Curiosity, How-To, Listicle, Emotional)", "CTR score prediction", "Character count for Google SERP compliance"],
    benefits: ["Increase organic click-through rates (CTR)", "Overcome writer's block with creative title ideas", "Tailor titles to target channels"],
    howTo: ["Enter your topic, product, or article subject.", "Select content type (Blog Post, YouTube, Email, Ad).", "Click 'Generate Headlines' to receive tailored options."],
    commonMistakes: ["Using generic titles without numbers or clear value propositions."],
    faqs: [
      { question: "Are these headlines optimized for Google SERP?", answer: "Yes, generated headlines are structured to stay within the 60-character Google display limit." }
    ]
  },
  {
    slug: "ai-summarizer",
    name: "AI Text & Article Summarizer",
    category: "ai-tools",
    description: "Instantly summarize long articles, research papers, essays, and documents into key takeaways, bullet points, or executive briefs.",
    icon: "FileText",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4510,
    keywords: ["ai summarizer", "summarize article online", "text summary generator", "article condenser"],
    features: ["3 Summary modes (Bullet Points, Executive Brief, Short Paragraph)", "Adjustable summary length", "Key facts & key quotes extraction"],
    benefits: ["Save hours reading lengthy reports", "Grasp core insights in seconds", "Produce quick meeting briefs"],
    howTo: ["Paste the text or article content into the input box.", "Select summary style and length.", "Click 'Summarize' to view core takeaways."],
    commonMistakes: ["Summarizing extremely short passages under 100 words."],
    faqs: [
      { question: "Can it handle complex technical or academic articles?", answer: "Yes, the AI identifies core thesis statements and key supporting data points." }
    ]
  },
  {
    slug: "social-hashtag-generator",
    name: "Social Media Hashtag Generator",
    category: "social-media-tools",
    description: "Discover trending, high-reach hashtags for Instagram, TikTok, LinkedIn, and Twitter/X based on your topic or niche.",
    icon: "Hash",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2130,
    keywords: ["hashtag generator", "instagram hashtags", "tiktok hashtag finder", "social media tags"],
    features: ["Categorized by popularity (High Reach, Niche, Trending)", "One-click copy all hashtags", "Platform-specific tag recommendations"],
    benefits: ["Boost post visibility and organic discovery", "Target relevant sub-communities", "Save time brainstorming tags"],
    howTo: ["Enter your topic or post keyword.", "Select target platform (Instagram, TikTok, LinkedIn).", "Copy recommended hashtag groups."],
    commonMistakes: ["Using banned or overly saturated generic hashtags (#love, #happy) which reduce reach."],
    faqs: [
      { question: "How many hashtags should I use on Instagram?", answer: "Instagram recommends 3-5 highly relevant hashtags, although up to 30 can be used." }
    ]
  },
  {
    slug: "meta-title-length-checker",
    name: "SERP Meta Title & Description Length Checker",
    category: "seo-tools",
    description: "Preview how your title tag and meta description look on Google desktop & mobile search results, checking character and pixel limits.",
    icon: "Eye",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1740,
    keywords: ["meta title length checker", "serp preview tool", "meta description character counter", "google snippet preview"],
    features: ["Pixel width measurement (600px title / 960px desc)", "Desktop and mobile SERP preview cards", "Truncation warning alerts"],
    benefits: ["Prevent title truncation on search engine result pages", "Improve search snippet click-through rates (CTR)", "Audit page metadata before publishing"],
    howTo: ["Type or paste your Title Tag and Meta Description.", "View live Google search result preview.", "Adjust text to ensure green checkmarks for character & pixel length."],
    commonMistakes: ["Relying only on character counts — pixel width determines when Google truncates text with ellipses (...)."],
    faqs: [
      { question: "What is the recommended title tag pixel width?", answer: "Google truncates titles wider than 600 pixels (typically 50-60 characters)." }
    ]
  },
  {
    slug: "open-graph-validator",
    name: "Open Graph (OG) Meta Tag Validator",
    category: "seo-tools",
    description: "Simulate and preview social media preview cards for Facebook, Twitter/X, LinkedIn, Slack, and Discord.",
    icon: "Share2",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 1450,
    keywords: ["open graph validator", "og image checker", "social media link preview", "twitter card validator"],
    features: ["Live Facebook, Twitter Card, LinkedIn & Slack previews", "OG Image aspect ratio & resolution checker", "Missing meta tag diagnostic report"],
    benefits: ["Ensure links look attractive when shared on social networks", "Catch broken OG images before launching campaigns", "Optimize viral link previews"],
    howTo: ["Enter your web page URL or paste raw OG meta HTML tags.", "Review social card previews across all platforms.", "Fix flagged issues like missing og:image or short og:description."],
    commonMistakes: ["Using OG images under 1200x630 pixels which appear small or cropped."],
    faqs: [
      { question: "What is the ideal OG image size?", answer: "1200 x 630 pixels (1.91:1 ratio) provides high-resolution cards across all platforms." }
    ]
  },
  {
    slug: "xml-sitemap-validator",
    name: "XML Sitemap Syntax Validator",
    category: "seo-tools",
    description: "Validate XML sitemap files for structural errors, missing tags, invalid URLs, and Google Search Console compliance.",
    icon: "FileCheck",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 1120,
    keywords: ["sitemap validator", "xml sitemap checker", "validate sitemap xml", "google sitemap validator"],
    features: ["XML schema syntax validation", "URL count verification (50,000 URL limit check)", "Encoding & XML header verification"],
    benefits: ["Ensure search engine crawlers index all pages without errors", "Identify invalid URLs or missing required tags", "Verify sitemap before submitting to Search Console"],
    howTo: ["Paste XML sitemap code or upload your sitemap.xml file.", "Click 'Validate Sitemap'.", "Review diagnostic report and fix highlighted XML errors."],
    commonMistakes: ["Including non-canonical or 404 URLs in the XML sitemap file."],
    faqs: [
      { question: "What is the maximum size for an XML sitemap?", answer: "An uncompressed XML sitemap cannot exceed 50MB or 50,000 URLs." }
    ]
  },
  {
    slug: "svg-to-png-converter",
    name: "SVG to PNG Image Converter",
    category: "image-tools",
    description: "Convert vector SVG graphics or code into high-resolution PNG images with custom dimensions and transparent background.",
    icon: "Image",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3410,
    keywords: ["svg to png", "convert svg to png", "svg rasterizer", "export svg as png"],
    features: ["Custom scale factor (1x, 2x, 4x, 8x HD)", "Transparent or custom background color", "Batch SVG conversion", "100% browser side conversion"],
    benefits: ["Rasterize vector logos for web and print", "Export high-resolution PNG assets from code", "Zero upload bandwidth needed"],
    howTo: ["Upload an SVG file or paste raw SVG code.", "Set target output width/height or scale multiplier.", "Click 'Download PNG' to save your image."],
    commonMistakes: ["Converting SVGs with external font dependencies that are not embedded."],
    faqs: [
      { question: "Can I export transparent PNGs?", answer: "Yes, transparency is preserved by default." }
    ]
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "image-tools",
    description: "Calculate missing dimensions (width or height) while preserving aspect ratios like 16:9, 4:3, 1:1, or custom proportions.",
    icon: "Scaling",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1560,
    keywords: ["aspect ratio calculator", "image ratio calculator", "16:9 calculator", "resize ratio calculator"],
    features: ["Common presets (16:9 HD, 4:3 Standard, 1:1 Square, 9:16 Story)", "Custom ratio lock", "Responsive grid dimension preview"],
    benefits: ["Resize video embeds and images without distortion", "Calculate responsive UI layout bounds accurately", "Prevent stretched or squished graphics"],
    howTo: ["Select a ratio preset or enter custom ratio (W:H).", "Enter either new Width or new Height.", "The calculated missing dimension updates automatically."],
    commonMistakes: ["Unlocking the ratio aspect lock before scaling dimensions."],
    faqs: [
      { question: "What is the standard ratio for social media stories?", answer: "9:16 (1080x1920 pixels) is the standard portrait ratio for TikTok, Reels, and Stories." }
    ]
  },
  {
    slug: "hex-to-rgb-converter",
    name: "HEX to RGB & HSL Color Converter",
    category: "color-tools",
    description: "Convert HEX color codes to RGB, RGBA, HSL, and HSV formats with live color picker preview and CSS snippet generator.",
    icon: "Palette",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 1980,
    keywords: ["hex to rgb", "convert hex to rgb", "hex to hsl", "color code converter"],
    features: ["Converts HEX ↔ RGB ↔ HSL ↔ HSV", "Alpha transparency slider for RGBA", "One-click copy CSS variables", "Color contrast score calculation"],
    benefits: ["Translate design specs into web development code", "Add opacity to HEX colors via RGBA", "Ensure WCAG color contrast accessibility"],
    howTo: ["Type or select a HEX color code (e.g. #3B82F6).", "View converted RGB, HSL, and HSV values.", "Click to copy the formatted CSS string."],
    commonMistakes: ["Forgetting the '#' prefix when pasting 6-digit hex values."],
    faqs: [
      { question: "Does this support 8-digit HEX codes with alpha?", answer: "Yes, 8-digit hex codes (e.g. #3B82F6FF) with alpha opacity are fully supported." }
    ]
  },
  {
    slug: "loan-payoff-calculator",
    name: "Loan Payoff & Amortization Calculator",
    category: "math-tools",
    description: "Calculate monthly loan payments, total interest costs, and extra payment payoff acceleration schedules.",
    icon: "Calculator",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 2890,
    keywords: ["loan payoff calculator", "amortization schedule calculator", "mortgage payment calculator", "interest payoff maker"],
    features: ["Monthly payment calculation", "Full month-by-month amortization schedule table", "Extra monthly payment impact estimator", "Total interest vs principal breakdown chart"],
    benefits: ["See how much money extra payments save on interest", "Plan loan payoff milestones", "Compare loan terms (15-yr vs 30-yr)"],
    howTo: ["Enter loan principal amount, annual interest rate (%), and loan term in years.", "Optionally enter extra monthly payment.", "View monthly payment, interest saved, and full schedule table."],
    commonMistakes: ["Entering interest rate as a decimal instead of percentage."],
    faqs: [
      { question: "How much does an extra $100/month save on a loan?", answer: "On a 30-year $300K loan at 6%, an extra $100/month saves over $40,000 in interest and shortens term by 4+ years." }
    ]
  },
  {
    slug: "time-zone-converter",
    name: "World Time Zone Converter & Meeting Planner",
    category: "utility-tools",
    description: "Convert time across global time zones (UTC, EST, PST, GMT, IST, JST) and find overlapping meeting hours across regions.",
    icon: "Globe",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3670,
    keywords: ["time zone converter", "world clock", "pst to est converter", "gmt to est calculator", "meeting time planner"],
    features: ["Multi-city time zone alignment grid", "UTC / GMT offset calculator", "Daylight Saving Time (DST) automatic adjustment", "Interactive time slider"],
    benefits: ["Schedule remote team meetings without time zone confusion", "Avoid waking up international clients", "Convert event start times accurately"],
    howTo: ["Add cities or time zones you want to compare.", "Move the time slider to set a local time.", "See equivalent times across all added regions."],
    commonMistakes: ["Forgetting Daylight Saving Time transitions in North America and Europe."],
    faqs: [
      { question: "Does this tool automatically handle Daylight Saving Time?", answer: "Yes, DST shifts are calculated automatically based on current date." }
    ]
  },
  {
    slug: "regex-pattern-library",
    name: "Regex Pattern Generator & Tester",
    category: "developer-tools",
    description: "Instant regex pattern generator and tester for email validation, phone numbers, URLs, credit cards, IP addresses, and dates.",
    icon: "Regex",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4120,
    keywords: ["regex generator", "regex patterns", "email regex", "phone number regex", "regex cheat sheet"],
    features: ["Pre-built patterns for Email, URL, Phone, IP, Credit Card, Date, Password", "Live regex test string matching", "Regex flags builder (g, i, m, s)", "Regex syntax explanation breakdown"],
    benefits: ["Stop re-writing common regex expressions from scratch", "Test custom regex match groups interactively", "Copy copy-paste ready regex for JS, Python, PHP"],
    howTo: ["Select a common pattern preset or write your regex pattern.", "Paste test text to see live highlights.", "Copy the regex pattern string and flags."],
    commonMistakes: ["Forgetting global flag 'g' when matching multiple instances in a string."],
    faqs: [
      { question: "What is the regex pattern for valid emails?", answer: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/ is standard for email validation." }
    ]
  },
  {
    slug: "tip-calculator",
    name: "Tip & Bill Splitter Calculator",
    category: "calculator-tools",
    description: "Calculate tip amounts, total bill totals, and split checks evenly among groups with custom tip percentages.",
    icon: "Receipt",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3450,
    keywords: ["tip calculator", "split bill calculator", "restaurant tip calculator", "tip rate splitter"],
    features: ["Custom percentage slider", "Per-person cost breakdown", "Instant rounding option", "Tax inclusive/exclusive calculation"],
    benefits: ["Never overpay or under-tip at restaurants", "Split group dinner bills effortlessly", "Calculate exact per-person owed amounts"],
    howTo: ["Enter total bill amount.", "Select tip percentage or enter custom value.", "Select number of people splitting."],
    commonMistakes: ["Applying tip percentage after tax instead of pre-tax."],
    faqs: [
      { question: "What is standard restaurant tipping in the US?", answer: "15% to 20% is standard for satisfactory restaurant service." }
    ]
  },
  {
    slug: "loan-calculator",
    name: "Loan Payment & EMI Calculator",
    category: "calculator-tools",
    description: "Calculate monthly loan payments, total interest payable, and amortization schedules for car, personal, and mortgage loans.",
    icon: "Landmark",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 4890,
    keywords: ["loan calculator", "emi calculator", "car loan calculator", "mortgage payment calculator"],
    features: ["Monthly payment breakdown", "Total interest vs principal chart data", "Loan term comparison", "Custom compounding frequency"],
    benefits: ["Plan major borrowing decisions accurately", "Compare loan offers side-by-side", "Know your exact monthly budget commitment"],
    howTo: ["Enter loan principal amount.", "Set annual interest rate.", "Choose loan tenure in years or months."],
    commonMistakes: ["Ignoring hidden loan processing fees or pre-payment penalties."],
    faqs: [
      { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment, the fixed payment amount made by a borrower to a lender each month." }
    ]
  },
  {
    slug: "roman-numerals-converter",
    name: "Roman Numerals Converter",
    category: "converter-tools",
    description: "Convert numbers to Roman numerals and Roman numerals to standard numbers instantly.",
    icon: "Hash",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 1890,
    keywords: ["roman numerals converter", "number to roman", "roman numeral decoder", "date in roman numerals"],
    features: ["Supports values 1 to 3,999,999", "Instant bi-directional conversion", "Historical notation chart", "Date to Roman numeral format helper"],
    benefits: ["Format tattoo dates accurately", "Decode copyright years on movies", "Translate historical inscriptions"],
    howTo: ["Type an integer or Roman numeral string.", "View instant converted result."],
    commonMistakes: ["Entering invalid Roman numeral combinations like 'IIII' instead of 'IV'."],
    faqs: [
      { question: "How do you write 2026 in Roman numerals?", answer: "2026 is written as MMXXVI." }
    ]
  },
  {
    slug: "binary-converter",
    name: "Binary to Text / Hex Converter",
    category: "converter-tools",
    description: "Translate binary code (0s and 1s) into plain English text, Decimal, Hexadecimal, and ASCII strings.",
    icon: "Binary",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2750,
    keywords: ["binary converter", "binary to text", "text to binary", "binary to hex"],
    features: ["Bi-directional binary translation", "ASCII code table reference", "Hex & Decimal multi-base output", "Clean 8-bit byte formatting"],
    benefits: ["Decode binary data strings instantly", "Understand low-level computer data formats", "Convert text for coding exercises"],
    howTo: ["Paste binary digits (separated by spaces or continuous).", "Read translated ASCII text output instantly."],
    commonMistakes: ["Omitting spaces between 8-bit bytes when pasting raw binary."],
    faqs: [
      { question: "What is binary code?", answer: "Binary is a base-2 numeral system representing text or computer instructions using 0 and 1." }
    ]
  },
  {
    slug: "temperature-converter",
    name: "Temperature Converter (Celsius, Fahrenheit, Kelvin)",
    category: "converter-tools",
    description: "Convert temperature values between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine.",
    icon: "Thermometer",
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 3100,
    keywords: ["temperature converter", "celsius to fahrenheit", "fahrenheit to celsius", "kelvin converter"],
    features: ["Instant 4-way temperature conversion", "Scientific formulas reference", "Absolute zero safeguards", "Preset temperature quick buttons"],
    benefits: ["Convert baking & oven temperatures", "Translate international weather forecasts", "Perform physics lab calculations"],
    howTo: ["Enter temperature number.", "Select input unit (°C, °F, K).", "View all converted values simultaneously."],
    commonMistakes: ["Forgetting that Celsius and Kelvin use the same step scale size."],
    faqs: [
      { question: "What is room temperature in Celsius and Fahrenheit?", answer: "Standard room temperature is approximately 20°C (68°F)." }
    ]
  },
  {
    slug: "length-converter",
    name: "Length & Distance Unit Converter",
    category: "converter-tools",
    description: "Convert length measurements between meters, feet, inches, kilometers, miles, yards, and nautical miles.",
    icon: "Ruler",
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 2420,
    keywords: ["length converter", "feet to meters", "inches to cm", "miles to km"],
    features: ["Supports Metric, Imperial, and Nautical units", "High-precision decimal controls", "Formula display breakdown"],
    benefits: ["Convert architectural blueprints", "Translate international height and road distances"],
    howTo: ["Select input unit and output unit.", "Type length quantity."],
    commonMistakes: ["Confusing survey feet with international standard feet."],
    faqs: [
      { question: "How many centimeters in an inch?", answer: "1 inch is exactly equal to 2.54 centimeters." }
    ]
  },
  {
    slug: "weight-converter",
    name: "Weight & Mass Unit Converter",
    category: "converter-tools",
    description: "Convert weight between kilograms, pounds, ounces, grams, stones, and metric tons.",
    icon: "Scale",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 2980,
    keywords: ["weight converter", "lbs to kg", "kg to lbs", "ounces to grams"],
    features: ["Metric & Imperial weight units", "Stones + Pounds UK unit format", "Scientific mass units (milligrams, micrograms)"],
    benefits: ["Calculate luggage weights for flights", "Convert fitness and recipe measurements"],
    howTo: ["Enter weight quantity and choose units."],
    commonMistakes: ["Forgetting 1 Stone equals 14 Pounds in UK imperial measurements."],
    faqs: [
      { question: "How many pounds in a kilogram?", answer: "1 kilogram equals approximately 2.20462 pounds." }
    ]
  },
  {
    slug: "speed-converter",
    name: "Speed & Velocity Unit Converter",
    category: "converter-tools",
    description: "Convert speed between miles per hour (mph), kilometers per hour (km/h), knots, and meters per second (m/s).",
    icon: "Gauge",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 1650,
    keywords: ["speed converter", "mph to kmh", "knots to mph", "kmh to mph"],
    features: ["Road, aviation, and maritime speed units", "Mach speed sound scale reference"],
    benefits: ["Compare driving speeds abroad", "Understand wind & nautical weather reports"],
    howTo: ["Enter speed value and pick units."],
    commonMistakes: ["Confusing statute miles per hour with nautical knots."],
    faqs: [
      { question: "How fast is 1 knot?", answer: "1 knot equals 1.15078 miles per hour or 1.852 km/h." }
    ]
  },
  {
    slug: "html-entity-encoder-decoder",
    name: "HTML Entity Encoder & Decoder",
    category: "developer-tools",
    description: "Encode special characters into HTML entities (&lt;, &gt;, &amp;) or decode entity strings back to readable HTML.",
    icon: "Code",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3900,
    keywords: ["html entity encoder", "decode html entities", "escape html characters", "html special chars"],
    features: ["Named, Decimal, and Hex entity encoding", "XSS protection helper", "Instant live translation"],
    benefits: ["Safely render user input in HTML without XSS", "Escape code snippets for documentation"],
    howTo: ["Paste text or HTML tags.", "Choose Encode or Decode."],
    commonMistakes: ["Double-encoding strings that already contain escaped entities."],
    faqs: [
      { question: "Why escape HTML entities?", answer: "Escaping prevents web browsers from interpreting user text as executable HTML/JavaScript tags." }
    ]
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator (RNG)",
    category: "generator-tools",
    description: "Generate cryptographically secure or pseudo-random numbers within any minimum and maximum custom range.",
    icon: "Dices",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 5120,
    keywords: ["random number generator", "rng tool", "number picker", "randomizer online"],
    features: ["Custom Min and Max range settings", "Allow or prevent duplicate numbers", "Sort output ascending/descending", "Bulk quantity generator"],
    benefits: ["Conduct fair raffles and giveaways", "Generate lottery and game dice rolls", "Create randomized sample indices"],
    howTo: ["Set lower and upper bound integers.", "Select quantity of numbers to generate.", "Click 'Generate Random Numbers'."],
    commonMistakes: ["Setting min higher than max value."],
    faqs: [
      { question: "Is this RNG cryptographically secure?", answer: "Yes, it uses Web Crypto API window.crypto.getRandomValues when available." }
    ]
  },
  {
    slug: "color-palette-generator",
    name: "AI Color Palette Generator",
    category: "generator-tools",
    description: "Generate harmonious color palettes for web design, apps, and branding. Export HEX, RGB, HSL, and Tailwind CSS classes.",
    icon: "Palette",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 4200,
    keywords: ["color palette generator", "palette maker", "brand colors", "tailwind color palette"],
    features: ["Monochromatic, Analogous, Complementary, Triadic modes", "WCAG AA/AAA contrast check", "Tailwind CSS class export"],
    benefits: ["Build gorgeous web color themes", "Ensure accessible text-to-background contrast"],
    howTo: ["Lock seed colors or click spacebar to generate.", "Copy color codes."],
    commonMistakes: ["Failing to test background/text contrast for accessibility."],
    faqs: [
      { question: "What is WCAG color accessibility?", answer: "WCAG guidelines require a minimum 4.5:1 contrast ratio for normal body text." }
    ]
  },
  {
    slug: "gradient-generator",
    name: "CSS Gradient Generator",
    category: "generator-tools",
    description: "Design linear, radial, and conic CSS background gradients visually and copy production-ready CSS code.",
    icon: "Sparkles",
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 3890,
    keywords: ["css gradient generator", "linear gradient maker", "background gradient css", "radial gradient"],
    features: ["Multi-stop color slider", "Angle & direction controls", "Copy CSS fallback + vendor prefixes", "Preset gallery"],
    benefits: ["Create modern mesh and vibrant background gradients", "No manual CSS math needed"],
    howTo: ["Add color stops.", "Adjust direction angle slider.", "Copy generated CSS code block."],
    commonMistakes: ["Omitting background fallback colors for legacy browsers."],
    faqs: [
      { question: "How do I make a 45 degree CSS gradient?", answer: "Use `background: linear-gradient(45deg, #color1, #color2);`" }
    ]
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier & Formatter",
    category: "developer-tools",
    description: "Compress HTML code by stripping whitespace, comments, and redundant attributes to boost website load speed.",
    icon: "FileCode",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 2150,
    keywords: ["html minifier", "compress html", "html beautifier", "clean html code"],
    features: ["Remove HTML comments", "Collapse whitespace", "Minify inline CSS & JS", "Compression ratio savings breakdown"],
    benefits: ["Improve PageSpeed Insights scores", "Reduce bandwidth usage"],
    howTo: ["Paste HTML code.", "Toggle minification options.", "Click Minify HTML."],
    commonMistakes: ["Stripping necessary whitespace inside pre or code blocks."],
    faqs: [
      { question: "Does minifying HTML break website layouts?", answer: "Proper minification removes unneeded whitespace without affecting rendering DOM structures." }
    ]
  },
  {
    slug: "image-color-picker",
    name: "Image Color Picker (Extract HEX from Image)",
    category: "image-tools",
    description: "Upload any image or screenshot to sample exact HEX, RGB, and HSL color values from any pixel.",
    icon: "EyeDropper",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3700,
    keywords: ["image color picker", "hex from image", "extract color palette", "pixel color finder"],
    features: ["Canvas pixel dropper tool", "Auto-extract top 5 dominant colors", "Copy HEX/RGB/HSL with one click"],
    benefits: ["Match brand colors from design mockups and logos", "Extract color palettes from photos"],
    howTo: ["Upload PNG, JPG, or WebP image.", "Click anywhere on the image to sample exact pixel color."],
    commonMistakes: ["Using compressed low-res JPGs where color artifacts blur exact hex codes."],
    faqs: [
      { question: "Are uploaded images stored on your servers?", answer: "No, all image processing occurs client-side inside your web browser." }
    ]
  },
  {
    slug: "text-to-speech",
    name: "Text to Speech (TTS) Online Reader",
    category: "ai-tools",
    description: "Convert written text into natural human voice audio using browser voice synthesis with speed and pitch controls.",
    icon: "Volume2",
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 4100,
    keywords: ["text to speech", "tts online", "voice generator free", "read text aloud"],
    features: ["Multiple accent & voice options", "Adjustable speech rate & pitch", "Live text highlight tracking"],
    benefits: ["Proofread articles by listening to them", "Accessibility support for visual impairment"],
    howTo: ["Paste text into the reader.", "Select voice and speed.", "Click Play Audio."],
    commonMistakes: ["Leaving typos in text which causes robotic pronunciation glitches."],
    faqs: [
      { question: "Is this TTS service free?", answer: "Yes, 100% free utilizing native browser Web Speech API." }
    ]
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator (High School & College)",
    category: "calculator-tools",
    description: "Calculate high school and college grade point averages (GPA) on a 4.0 weighted or unweighted scale.",
    icon: "GraduationCap",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3600,
    keywords: ["gpa calculator", "4.0 gpa calculator", "college gpa calculator", "weighted gpa"],
    features: ["4.0 scale letter grade conversion", "Weighted (AP/Honors) calculation", "Cumulative GPA predictor"],
    benefits: ["Track academic eligibility for scholarships and honor rolls", "Plan target grades needed for target GPA"],
    howTo: ["Add courses, grade received, and credit hours.", "Click Calculate GPA."],
    commonMistakes: ["Entering course credits as 1 instead of actual credit hours."],
    faqs: [
      { question: "What is an unweighted vs weighted GPA?", answer: "Unweighted scales cap grades at 4.0, while weighted GPAs add 0.5 to 1.0 extra points for AP/IB/Honors classes." }
    ]
  },
  {
    slug: "time-zone-converter-pro",
    name: "Global Time Zone Converter",
    category: "productivity-tools",
    description: "Compare world clock times across multiple global cities simultaneously with interactive time sliders.",
    icon: "Clock",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2950,
    keywords: ["time zone converter", "world clock converter", "pst to est", "utc time converter"],
    features: ["Multi-city timeline view", "Automatic DST calculation", "Meeting planner overlay"],
    benefits: ["Schedule international calls without math errors", "Coordinate remote distributed teams"],
    howTo: ["Search and add cities.", "Drag the hour slider."],
    commonMistakes: ["Forgetting half-hour timezone offsets like India (IST UTC+5:30)."],
    faqs: [
      { question: "Does this account for Daylight Saving Time?", answer: "Yes, DST changes are automatically factored based on selected date." }
    ]
  },
  {
    slug: "markdown-to-html-converter",
    name: "Markdown to HTML Converter",
    category: "developer-tools",
    description: "Convert Markdown (.md) documents into clean, semantic HTML markup with live side-by-side preview.",
    icon: "FileText",
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 2310,
    keywords: ["markdown to html", "md to html", "convert markdown", "markdown preview"],
    features: ["GitHub Flavored Markdown (GFM) support", "Code syntax highlighting", "Raw HTML & rendered preview tabs"],
    benefits: ["Convert README files to web content", "Format blog posts quickly"],
    howTo: ["Paste Markdown syntax.", "Copy converted HTML code."],
    commonMistakes: ["Mixing raw unclosed HTML tags inside Markdown blocks."],
    faqs: [
      { question: "Does it support GitHub Markdown tables?", answer: "Yes, full GFM tables, task lists, and code blocks are supported." }
    ]
  },
  {
    slug: "sql-beautifier-formatter",
    name: "SQL Formatter & Beautifier",
    category: "developer-tools",
    description: "Format messy SQL queries into clean, readable code with uppercase keywords and proper indentation.",
    icon: "Database",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3200,
    keywords: ["sql formatter", "sql beautifier", "format sql query", "prettify sql"],
    features: ["Supports PostgreSQL, MySQL, SQLite, Transact-SQL", "Uppercase SQL keywords option", "Custom indentation spacing"],
    benefits: ["Debug complex multi-join SQL queries faster", "Maintain team database query standards"],
    howTo: ["Paste raw SQL query.", "Click Format SQL."],
    commonMistakes: ["Pasting incomplete SQL statements with unbalanced quotes."],
    faqs: [
      { question: "Which SQL dialects are supported?", answer: "Standard ANSI SQL, MySQL, PostgreSQL, MS SQL Server, and Oracle SQL dialects." }
    ]
  },
  {
    slug: "url-slug-generator",
    name: "URL Slug Generator",
    category: "text-tools",
    description: "Convert article titles and product names into clean, SEO-friendly URL slugs by removing special characters.",
    icon: "Link",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1980,
    keywords: ["url slug generator", "slugify string", "make url friendly", "seo slug maker"],
    features: ["Lowercase conversion", "Hyphen / Underscore separator toggle", "Stop-words removal option"],
    benefits: ["Create clean URLs for WordPress, Next.js, and Shopify", "Improve keyword readability in SERPs"],
    howTo: ["Type title text.", "Copy generated slug string."],
    commonMistakes: ["Leaving uppercase letters or trailing spaces in manually edited slugs."],
    faqs: [
      { question: "What is an SEO slug?", answer: "An SEO slug is the portion of a URL that identifies a specific page in a human-readable format." }
    ]
  },
  {
    slug: "character-frequency-counter",
    name: "Character Frequency Counter",
    category: "text-tools",
    description: "Analyze letter and character distribution frequency in any text document with percentage rankings.",
    icon: "BarChart3",
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 1420,
    keywords: ["character frequency", "letter counter", "text analysis tool", "n-gram analyzer"],
    features: ["Letter frequency distribution chart", "Case-sensitive / insensitive toggle", "Unique character count"],
    benefits: ["Analyze secret ciphers and cryptography text", "Optimize keyboard layout frequencies"],
    howTo: ["Paste text passage.", "View frequency table."],
    commonMistakes: ["Including spaces and punctuation when analyzing pure alphabet letters."],
    faqs: [
      { question: "What is the most common letter in English text?", answer: "The letter 'E' is the most frequent character in written English." }
    ]
  },
  {
    slug: "csv-to-xml-converter",
    name: "CSV to XML Converter",
    category: "developer-tools",
    description: "Convert CSV data spreadsheets into structured XML data files with custom root and row tag names.",
    icon: "FileSpreadsheet",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1750,
    keywords: ["csv to xml", "convert csv to xml", "csv parser xml", "excel to xml"],
    features: ["Custom root and element node names", "Automatic data type detection", "Indented XML export"],
    benefits: ["Transform spreadsheet data for legacy API integrations"],
    howTo: ["Paste CSV content or upload file.", "Click Convert to XML."],
    commonMistakes: ["Using inconsistent CSV column headers."],
    faqs: [
      { question: "Does it handle comma vs tab separated CSVs?", answer: "Yes, auto-detects commas, tabs, and semicolon delimiters." }
    ]
  },
  {
    slug: "xml-formatter-beautifier",
    name: "XML Formatter & Validator",
    category: "developer-tools",
    description: "Format, indent, and validate XML documents for syntax errors and unclosed tags.",
    icon: "Code2",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 2100,
    keywords: ["xml formatter", "xml beautifier", "validate xml", "format xml online"],
    features: ["Syntax error detection", "Custom indent size (2 or 4 spaces)", "Minify XML mode"],
    benefits: ["Find missing closing XML tags fast", "Prettify soap and sitemap XML files"],
    howTo: ["Paste XML code.", "Click Format XML."],
    commonMistakes: ["Forgetting XML declaration headers like `<?xml version=\"1.0\"?>`."],
    faqs: [
      { question: "How to fix 'Unclosed Tag' XML errors?", answer: "Our validator highlights exact line numbers where closing tags are missing." }
    ]
  },
  {
    slug: "htpasswd-generator",
    name: "Htpasswd Generator (Apache Basic Auth)",
    category: "security-tools",
    description: "Generate encrypted htpasswd password credentials for Apache and NGINX basic HTTP authentication.",
    icon: "KeyRound",
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 2600,
    keywords: ["htpasswd generator", "apache basic auth", "bcrypt htpasswd", "nginx password hash"],
    features: ["Supports Bcrypt, MD5 ($apr1$), and Crypt algorithms", "Direct `.htpasswd` string output"],
    benefits: ["Protect staging web directories with basic auth passwords"],
    howTo: ["Enter username and password.", "Choose hash algorithm.", "Copy htpasswd line."],
    commonMistakes: ["Using weak Crypt encryption on modern server environments."],
    faqs: [
      { question: "Which algorithm is recommended for htpasswd?", answer: "Bcrypt is strongly recommended for security." }
    ]
  },
  {
    slug: "user-agent-parser",
    name: "User Agent Parser & Lookup",
    category: "developer-tools",
    description: "Parse HTTP User-Agent strings to identify browser name, version, OS, engine, and device type.",
    icon: "Laptop",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2890,
    keywords: ["user agent parser", "my user agent", "parse user agent string", "browser detector"],
    features: ["Auto-detect current visitor user agent", "Browser, OS, Device & CPU breakdown"],
    benefits: ["Debug responsive web issues and browser compatibility bugs"],
    howTo: ["Paste any user agent string or view auto-detected info."],
    commonMistakes: ["Relying solely on User-Agent string for feature detection instead of capability checks."],
    faqs: [
      { question: "What is my current User Agent?", answer: "Our tool auto-detects and displays your exact browser agent string upon load." }
    ]
  },
  {
    slug: "chmod-calculator",
    name: "Linux Chmod Permissions Calculator",
    category: "developer-tools",
    description: "Calculate Linux file permissions in octal (755, 644) and symbolic notation (rwxr-xr-x) with interactive checkboxes.",
    icon: "Shield",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3100,
    keywords: ["chmod calculator", "linux permissions calculator", "chmod 755", "chmod 644"],
    features: ["Interactive Read/Write/Execute grid for Owner, Group, Public", "Octal numeric & symbolic code outputs", "CLI `chmod` command helper"],
    benefits: ["Never guess Linux file permissions when setting up servers"],
    howTo: ["Check desired permissions boxes.", "Copy numeric octal code."],
    commonMistakes: ["Setting web files to 777 which creates critical security vulnerabilities."],
    faqs: [
      { question: "What is chmod 755?", answer: "755 gives full permissions to owner, and read/execute access to group and others." }
    ]
  },
  {
    slug: "px-to-rem-converter",
    name: "PX to REM Converter (CSS Units)",
    category: "developer-tools",
    description: "Convert pixel (px) font sizes and spacing to CSS REM and EM units based on root font size.",
    icon: "Type",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3780,
    keywords: ["px to rem", "rem converter", "css px to rem", "rem to px"],
    features: ["Custom root base font size (default 16px)", "Bi-directional conversion table", "Copyable CSS code"],
    benefits: ["Build scalable, accessible responsive typography layouts"],
    howTo: ["Enter pixel value.", "Copy REM equivalent."],
    commonMistakes: ["Assuming root font size is always 16px without checking global CSS."],
    faqs: [
      { question: "Why use REM instead of PX in CSS?", answer: "REM scales relative to user browser accessibility text preferences." }
    ]
  },
  {
    slug: "em-to-px-converter",
    name: "EM to PX Converter",
    category: "developer-tools",
    description: "Convert EM units to exact pixels (PX) based on parent element font size specifications.",
    icon: "ArrowLeftRight",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 1890,
    keywords: ["em to px", "convert em to pixels", "css em calculator"],
    features: ["Parent font size configuration", "Instant calculation output"],
    benefits: ["Understand element-relative typography scaling"],
    howTo: ["Enter EM value and parent pixel size."],
    commonMistakes: ["Confusing EM (relative to parent) with REM (relative to root)."],
    faqs: [
      { question: "What is the difference between EM and REM?", answer: "EM is relative to parent element font-size, while REM is relative to root html font-size." }
    ]
  },
  {
    slug: "css-clip-path-generator",
    name: "CSS Clip-Path Generator",
    category: "generator-tools",
    description: "Create geometric shapes (triangles, polygons, circles, stars) using CSS `clip-path` with drag points.",
    icon: "Crop",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 2940,
    keywords: ["css clip path generator", "clip path maker", "polygon css generator", "css shape cropper"],
    features: ["Visual drag-handle node editor", "Polygon, Circle, Ellipse, Inset presets", "CSS code output"],
    benefits: ["Create custom angled hero sections and non-rectangular image shapes"],
    howTo: ["Choose shape preset.", "Drag handles to customize.", "Copy CSS `clip-path` rule."],
    commonMistakes: ["Using too many complex polygon points which can impact mobile rendering performance."],
    faqs: [
      { question: "Is CSS clip-path supported on all browsers?", answer: "Yes, modern browsers support `clip-path: polygon(...)` natively." }
    ]
  },
  {
    slug: "meta-title-pixel-checker",
    name: "Google SERP Meta Title Pixel Width Checker",
    category: "seo-tools",
    description: "Test title tag and meta description lengths against Google Desktop and Mobile pixel width limits.",
    icon: "Search",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3400,
    keywords: ["title pixel width checker", "serp pixel checker", "google title length", "meta description pixel width"],
    features: ["580px Desktop limit indicator", "990px Mobile limit indicator", "Real-time Google SERP preview box"],
    benefits: ["Prevent title truncation (...) in Google Search results"],
    howTo: ["Type title and description text.", "Watch live pixel width gauge indicator."],
    commonMistakes: ["Counting character numbers instead of pixel width (e.g. 'W' takes more pixels than 'i')."],
    faqs: [
      { question: "What is the maximum pixel width for Google title tags?", answer: "Google truncates titles around 580 to 600 pixels width on desktop." }
    ]
  },
  {
    slug: "social-image-resizer",
    name: "Social Media Image Resizer & Cropper",
    category: "image-tools",
    description: "Crop and resize images to exact aspect ratios for YouTube thumbnails, Instagram posts, Twitter headers, and OpenGraph.",
    icon: "Image",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 3800,
    keywords: ["social media image resizer", "youtube thumbnail resizer", "instagram photo cropper", "og image resizer"],
    features: ["Presets for Twitter/X, Instagram, YouTube, LinkedIn, OG 1200x630", "Visual aspect crop box"],
    benefits: ["Ensure social media banner graphics render crisp without accidental cropping"],
    howTo: ["Upload image.", "Select target social platform preset.", "Download cropped image."],
    commonMistakes: ["Uploading low-res images that pixelate when scaled to 1200x630."],
    faqs: [
      { question: "What is standard Open Graph image dimension?", answer: "1200 x 630 pixels (1.91:1 aspect ratio) is standard." }
    ]
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax & VAT Calculator",
    category: "calculator-tools",
    description: "Calculate sales tax, Goods & Services Tax (GST), and Value Added Tax (VAT) additions or subtractions.",
    icon: "Calculator",
    featured: false,
    trending: false,
    rating: 4.8,
    reviewsCount: 2200,
    keywords: ["sales tax calculator", "vat calculator", "gst calculator", "add tax calculator"],
    features: ["Add Tax / Remove Tax modes", "Custom tax percentage input", "Net vs Gross breakdown"],
    benefits: ["Calculate invoice taxes accurately", "Extract net price from total tax-inclusive bills"],
    howTo: ["Enter base price.", "Set tax percentage rate.", "Choose Add or Extract tax."],
    commonMistakes: ["Subtracting tax percentage directly from gross price instead of reverse formula."],
    faqs: [
      { question: "How to reverse calculate tax from gross total?", answer: "`Net Price = Gross Total / (1 + Tax Rate)`." }
    ]
  },
  {
    slug: "discount-calculator",
    name: "Shopping Discount & Sale Calculator",
    category: "calculator-tools",
    description: "Calculate final sale prices, total money saved, and double stacked discount percentages.",
    icon: "Percent",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 2900,
    keywords: ["discount calculator", "sale price calculator", "percentage off calculator"],
    features: ["Single & double discount support", "Savings amount indicator", "Tax addition option"],
    benefits: ["Calculate bargain savings while shopping retail clearance sales"],
    howTo: ["Enter original price.", "Select discount percentage."],
    commonMistakes: ["Adding two percentage discounts together (e.g., 20% off + 10% off is not 30% off)."],
    faqs: [
      { question: "How do stacked discounts work?", answer: "The second discount percentage is applied to the already-reduced price." }
    ]
  },
  {
    slug: "subdomain-finder",
    name: "Subdomain Finder & Enumeration Tool",
    category: "security-tools",
    description: "Discover public subdomains and DNS record structures for security research and domain auditing.",
    icon: "Globe",
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 2450,
    keywords: ["subdomain finder", "find subdomains", "domain enumeration", "dns subdomains"],
    features: ["Public DNS certificate transparency lookup", "Download CSV list output"],
    benefits: ["Audit forgotten dev and staging subdomains for security leaks"],
    howTo: ["Enter root domain name (e.g. example.com).", "Click Search Subdomains."],
    commonMistakes: ["Including `https://` protocol prefix when searching root domains."],
    faqs: [
      { question: "Is subdomain searching legal?", answer: "Yes, searching public Certificate Transparency logs and DNS records is standard security auditing." }
    ]
  },
  {
    slug: "dns-lookup-tool",
    name: "DNS Record Lookup Tool (A, MX, CNAME, TXT, NS)",
    category: "developer-tools",
    description: "Query global DNS servers for domain A, AAAA, MX, TXT, CNAME, and NS record configurations.",
    icon: "Server",
    featured: false,
    trending: true,
    rating: 4.9,
    reviewsCount: 3100,
    keywords: ["dns lookup", "check dns records", "mx record lookup", "txt record checker"],
    features: ["All DNS record types (A, AAAA, MX, TXT, CNAME, NS, SOA)", "TTL cache duration indicators"],
    benefits: ["Verify domain email SPF/DKIM records and server IP changes"],
    howTo: ["Enter domain name.", "Select record type filter.", "Click Lookup DNS."],
    commonMistakes: ["Expecting instant DNS updates before global TTL propagation completes."],
    faqs: [
      { question: "How long does DNS propagation take?", answer: "DNS changes typically take 24 to 48 hours to fully propagate worldwide." }
    ]
  }
];


