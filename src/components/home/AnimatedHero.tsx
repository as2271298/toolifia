"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const ROTATING_WORDS = [
  { word: "AI Video Generator", color: "#a78bfa" },
  { word: "Text Humanizer", color: "#06b6d4" },
  { word: "SEO Meta Tags", color: "#10b981" },
  { word: "JSON Formatter", color: "#f59e0b" },
  { word: "Password Generator", color: "#f43f5e" },
  { word: "BMI Calculator", color: "#fb923c" },
  { word: "QR Code Maker", color: "#e879f9" },
  { word: "Image Resizer", color: "#38bdf8" },
];

const FLOATING_CHIPS = [
  { emoji: "🤖", label: "AI Tools" },
  { emoji: "📊", label: "SEO Tools" },
  { emoji: "⚡", label: "Dev Tools" },
  { emoji: "🧮", label: "Calculators" },
  { emoji: "🔄", label: "Converters" },
  { emoji: "🖼️", label: "Image Tools" },
  { emoji: "📄", label: "PDF Tools" },
  { emoji: "🔒", label: "Security" },
  { emoji: "✍️", label: "Text Tools" },
  { emoji: "📱", label: "Social Media" },
  { emoji: "🎨", label: "Generators" },
  { emoji: "📈", label: "Productivity" },
];

const STATS = [
  { value: "300+", label: "Free Tools", icon: Zap, color: "#a78bfa" },
  { value: "0", label: "Signup Needed", icon: Shield, color: "#10b981" },
  { value: "10M+", label: "Monthly Users", icon: Globe, color: "#06b6d4" },
  { value: "4.9★", label: "User Rating", icon: Sparkles, color: "#f59e0b" },
];

export function AnimatedHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect
  useEffect(() => {
    const current = ROTATING_WORDS[wordIndex].word;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    } else {
      const speed = isDeleting ? 40 : 70;
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* ── Mesh Gradient Background Orbs ── */}
      <div className="mesh-bg">
        <div className="mesh-orb mesh-orb-violet" />
        <div className="mesh-orb mesh-orb-cyan" />
        <div className="mesh-orb mesh-orb-indigo" />
        {/* Star field */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          />
        ))}
      </div>

      {/* ── Grid Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-5xl mx-auto w-full">

        {/* Top badge */}
        <div className="animate-fade-up">
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>300+ Free Browser Tools · Zero Signup · AI-Powered</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="animate-fade-up-d1 space-y-3">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02]">
            <span className="text-gradient-white block">The free toolkit</span>
            <span className="text-gradient-white block">for your</span>
          </h1>
          {/* Typewriter line */}
          <div className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] h-[1.1em] flex items-center justify-center">
            <span
              style={{ color: ROTATING_WORDS[wordIndex].color, transition: "color 0.3s ease" }}
              className="drop-shadow-lg"
            >
              {displayText}
            </span>
            <span
              className="animate-cursor ml-1 inline-block w-[3px] h-[0.85em] rounded-sm"
              style={{ background: ROTATING_WORDS[wordIndex].color }}
            />
          </div>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-up-d2 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
          Run AI tools, SEO generators, calculators, and converters — 
          <strong className="text-slate-200 font-medium"> directly in your browser.</strong> No accounts, no paywalls, no redirects.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="animate-fade-up-d2 w-full max-w-2xl"
        >
          <div className="relative group search-glow rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 flex items-center gap-3 px-5 py-4 shadow-2xl">
            <Search className="w-5 h-5 text-slate-400 shrink-0 group-focus-within:text-violet-400 transition-colors" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 300+ tools — AI Humanizer, JSON Formatter, BMI Calculator..."
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none font-light"
            />
            <button
              type="submit"
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 shrink-0"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2.5 text-xs text-slate-500 text-center">
            Popular: &nbsp;
            {["AI Humanizer", "QR Generator", "JSON Formatter", "BMI Calculator"].map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => { setQuery(t); router.push(`/tools?search=${encodeURIComponent(t)}`); }}
                className="text-slate-400 hover:text-violet-400 transition-colors underline-offset-2 hover:underline"
              >
                {t}{i < 3 ? " · " : ""}
              </button>
            ))}
          </p>
        </form>

        {/* CTA Buttons */}
        <div className="animate-fade-up-d3 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tools"
            className="btn-primary px-7 py-3.5 rounded-2xl text-sm font-bold text-white flex items-center gap-2.5 shadow-xl"
          >
            <Zap className="w-4 h-4" />
            Explore All Tools
          </Link>
          <Link
            href="#categories"
            className="btn-secondary px-7 py-3.5 rounded-2xl text-sm font-semibold text-slate-200 flex items-center gap-2"
          >
            Browse Categories
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="animate-fade-up-d4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-2">
          {STATS.map(({ value, label, icon: Icon, color }) => (
            <div key={label} className="stat-card rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black" style={{ color }}>{value}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                <Icon className="w-3 h-3" style={{ color }} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scrolling Category Marquee ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-white/[0.05]">
        <div className="marquee-track">
          {[...FLOATING_CHIPS, ...FLOATING_CHIPS].map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-3 px-4 py-2 rounded-full glass-card text-sm font-medium text-slate-300 whitespace-nowrap shrink-0"
            >
              <span>{chip.emoji}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
