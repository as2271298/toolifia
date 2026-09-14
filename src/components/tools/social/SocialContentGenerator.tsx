"use client";

import { useState } from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Sparkles,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Zap,
  Hash,
} from "lucide-react";

type Platform = "Instagram" | "Facebook" | "TikTok" | "LinkedIn";
type Goal = "engagement" | "traffic" | "leads" | "awareness" | "sales";
type ToneType = "casual" | "professional" | "funny" | "inspirational" | "educational";

interface GeneratedContent {
  caption: string;
  hashtags: string[];
  hook: string;
  cta: string;
  ideas: string[];
}

const PLATFORM_CONFIG: Record<
  Platform,
  {
    color: string;
    bg: string;
    text: string;
    badge: string;
    maxHashtags: number;
    charLimit: number;
    tip: string;
  }
> = {
  Instagram: {
    color: "from-pink-500 to-purple-600",
    bg: "bg-pink-500/10 border-pink-500/20",
    text: "text-pink-400",
    badge: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
    maxHashtags: 30,
    charLimit: 2200,
    tip: "Reels + carousels get 3x more reach. Put 20-30 hashtags in the first comment for max discoverability.",
  },
  Facebook: {
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-500/10 border-blue-500/20",
    text: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    maxHashtags: 5,
    charLimit: 63206,
    tip: "Native video and polls drive 50% more engagement than external link posts on Facebook.",
  },
  TikTok: {
    color: "from-rose-500 to-pink-700",
    bg: "bg-rose-500/10 border-rose-500/20",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    maxHashtags: 5,
    charLimit: 2200,
    tip: "Your hook must grab attention within the first 1 second. Trending sounds boost reach 3x.",
  },
  LinkedIn: {
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-500/10 border-sky-500/20",
    text: "text-sky-400",
    badge: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    maxHashtags: 5,
    charLimit: 3000,
    tip: "Personal stories with data insights get 2x more shares than promotional posts on LinkedIn.",
  },
};

const PLATFORM_ICONS: Record<Platform, React.ComponentType<{ className?: string }>> = {
  Instagram: Instagram,
  Facebook: Facebook,
  TikTok: Zap,
  LinkedIn: Linkedin,
};

export function SocialContentGenerator() {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState<Goal>("engagement");
  const [tone, setTone] = useState<ToneType>("casual");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const cfg = PLATFORM_CONFIG[platform];
  const PlatformIcon = PLATFORM_ICONS[platform];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/tools/social-content-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: topic, platform, goal, tone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      const d = json.data ?? json;
      setResult({
        caption: d.caption ?? json.result ?? "",
        hashtags: Array.isArray(d.hashtags) ? d.hashtags : [],
        hook: d.hook ?? "",
        cta: d.cta ?? "",
        ideas: Array.isArray(d.ideas) ? d.ideas : [],
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const fullPost = result
    ? `${result.caption}\\n\\n${result.hashtags.join(" ")}`
    : "";

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10 border border-pink-500/20 space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> AI Social Media Content Generator
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Generate Viral Posts for Any Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            AI writes platform-native captions, scroll-stopping hooks, optimized hashtags, and CTAs for
            Instagram, Facebook, TikTok &amp; LinkedIn — instantly and for free.
          </p>
        </div>

        {/* Platform selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PLATFORM_CONFIG) as Platform[]).map((p) => {
            const Icon = PLATFORM_ICONS[p];
            const isActive = platform === p;
            return (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isActive
                    ? `bg-gradient-to-r ${PLATFORM_CONFIG[p].color} text-white border-transparent shadow-lg`
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {p}
              </button>
            );
          })}
        </div>

        {/* Platform tip */}
        <div
          className={`px-4 py-2.5 rounded-xl text-xs font-medium ${cfg.badge} flex items-center gap-2`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>
            <strong>{platform} Tip:</strong> {cfg.tip}
          </span>
        </div>
      </div>

      {/* Input form */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Topic, Product, or Brand Message
          </label>
          <textarea
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={`e.g. "Toolifia — free AI tools platform. We just launched an AI Video Generator that creates cinematic clips from text in 10 seconds, no signup required."`}
            className="w-full p-3.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Content Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as Goal)}
              className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white"
            >
              <option value="engagement">💬 Maximize Engagement (Likes, Comments)</option>
              <option value="traffic">🔗 Drive Website Traffic</option>
              <option value="leads">📧 Generate Leads &amp; Sign-ups</option>
              <option value="awareness">📣 Brand Awareness</option>
              <option value="sales">💰 Direct Sales &amp; Conversions</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Tone of Voice
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneType)}
              className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-slate-900 dark:text-white"
            >
              <option value="casual">😊 Casual &amp; Conversational</option>
              <option value="professional">👔 Professional &amp; Authoritative</option>
              <option value="funny">😂 Witty &amp; Humorous</option>
              <option value="inspirational">🔥 Motivational &amp; Inspirational</option>
              <option value="educational">📚 Educational &amp; Informative</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 bg-gradient-to-r ${cfg.color} hover:opacity-90`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading
            ? `Generating ${platform} Post...`
            : `✨ Generate AI ${platform} Post`}
        </button>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Caption card */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <PlatformIcon className={`w-4 h-4 ${cfg.text}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {platform} Caption
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${cfg.badge}`}
                >
                  {result.caption.length} / {cfg.charLimit} chars
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                  title="Regenerate"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copy(fullPost, "full")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${cfg.color} text-white`}
                >
                  {copied === "full" ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied === "full" ? "Copied!" : "Copy Full Post"}
                </button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed">
              {result.caption}
            </pre>

            {result.hashtags.length > 0 && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${cfg.text} flex items-center gap-1.5`}
                  >
                    <Hash className="w-3.5 h-3.5" />
                    Hashtags ({result.hashtags.length}/{cfg.maxHashtags})
                  </span>
                  <button
                    onClick={() => copy(result.hashtags.join(" "), "hashtags")}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copied === "hashtags" ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Copy All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.hashtags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => copy(tag, `tag-${i}`)}
                      className={`text-xs px-2.5 py-1 rounded-full ${cfg.badge} hover:opacity-80 transition-opacity`}
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hook + CTA row */}
          {(result.hook || result.cta) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.hook && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      🎣 Scroll-Stopping Hook
                    </span>
                    <button
                      onClick={() => copy(result.hook, "hook")}
                      className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copied === "hook" ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                    {result.hook}
                  </p>
                </div>
              )}
              {result.cta && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      📣 Call to Action
                    </span>
                    <button
                      onClick={() => copy(result.cta, "cta")}
                      className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copied === "cta" ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold leading-snug">
                    {result.cta}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Content variation ideas */}
          {result.ideas.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                💡 3 Content Variation Ideas
              </span>
              <div className="space-y-2">
                {result.ideas.map((idea, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80"
                  >
                    <span
                      className={`text-xs font-black px-1.5 py-0.5 rounded ${cfg.badge} shrink-0 mt-0.5`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {idea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
