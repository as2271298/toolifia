"use client";

import React, { useState } from "react";
import {
  Sparkles, Download, RefreshCw, Image as ImageIcon,
  Wand2, Sliders, Dices, Copy, Check
} from "lucide-react";

const STYLES = [
  { id: "photorealistic", name: "Photorealistic 8K", icon: "📷", promptSuffix: "photorealistic, 8k resolution, highly detailed, professional photography, studio lighting" },
  { id: "cinematic", name: "Cinematic Movie", icon: "🎬", promptSuffix: "cinematic film still, 35mm lens, anamorphic lighting, movie scene, depth of field" },
  { id: "anime", name: "Anime Art", icon: "🎨", promptSuffix: "anime art style, vibrant colors, detailed illustration, studio ghibli aesthetic, trending on pixiv" },
  { id: "3d-render", name: "3D Pixar", icon: "🧸", promptSuffix: "3d character render, pixar style, unreal engine 5, soft volumetric lighting, ray tracing" },
  { id: "cyberpunk", name: "Cyberpunk Neo", icon: "🌃", promptSuffix: "cyberpunk aesthetic, glowing neon lights, futuristic city, cinematic mood, octane render" },
  { id: "digital-art", name: "Digital Painting", icon: "🖌️", promptSuffix: "digital art masterpiece, detailed brushwork, artstation trending, dramatic lighting" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "Square (1:1)", icon: "⏹️" },
  { id: "16:9", label: "Landscape (16:9)", icon: "🖼️" },
  { id: "9:16", label: "Portrait / Reel (9:16)", icon: "📱" },
];

const INSPIRATIONS = [
  "A majestic snow leopard walking across a snowy mountain ridge in 8K cinematic photography",
  "A futuristic cyberpunk city floating above neon clouds at twilight, ultra detailed",
  "An astronaut exploring a crystalline alien cave with glowing turquoise bioluminescent plants",
  "A cozy cottage in an enchanted autumn forest with golden fireflies at dusk, Pixar 3D",
  "A cute baby red panda wearing a tiny samurai armor, studio lighting, hyper-detailed"
];

export function AiImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000));
  const [copied, setCopied] = useState(false);

  const handleRandomPrompt = () => {
    const random = INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)];
    setPrompt(random);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    const styleObj = STYLES.find((s) => s.id === selectedStyle);
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          styleSuffix: styleObj?.promptSuffix || "",
        }),
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        // Preload image
        const img = new Image();
        img.src = data.imageUrl;
        img.onload = () => {
          setGeneratedImage(data.imageUrl);
          setIsGenerating(false);
        };
        img.onerror = () => {
          setGeneratedImage(data.imageUrl);
          setIsGenerating(false);
        };
      } else {
        throw new Error(data.error || "Generation failed");
      }
    } catch {
      // Automatic fallback
      const fullPrompt = encodeURIComponent(`${prompt.trim()}, ${styleObj?.promptSuffix || ""}`);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${fullPrompt}?width=1024&height=1024&seed=${newSeed}&nologo=true`;
      setGeneratedImage(fallbackUrl);
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold">AI Image Studio</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                ● Agnes AI 2.5 Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Generate photorealistic, anime, 3D, and cinematic images in seconds. Free & no signup.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRandomPrompt}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
        >
          <Dices className="w-3.5 h-3.5" /> Random Idea
        </button>
      </div>

      {/* Control Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            Describe the image you want to create
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A futuristic cyberpunk city floating above neon clouds at twilight, ultra detailed 8k photography..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed resize-none"
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Choose Art Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                  selectedStyle === style.id
                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md shadow-purple-900/30 ring-1 ring-purple-500"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-xl mb-1">{style.icon}</span>
                <span className="truncate w-full">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Aspect Ratio
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                type="button"
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
                  aspectRatio === ratio.id
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <span>{ratio.icon}</span>
                <span>{ratio.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm active:scale-[0.99]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Synthesizing AI Artwork with Agnes 2.5...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Image (Free)
              </>
            )}
          </button>

          {prompt && (
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          )}
        </div>
      </div>

      {/* Output Display Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        {isGenerating ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-purple-300 text-sm font-medium animate-pulse">
              Creating high-definition pixels with Agnes AI 2.5 Flash engine...
            </p>
          </div>
        ) : generatedImage ? (
          <div className="space-y-4">
            <div className="relative group inline-block overflow-hidden rounded-xl border border-slate-800 shadow-2xl bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generatedImage}
                alt="AI Generated Artwork"
                className="max-h-[550px] w-auto mx-auto rounded-xl object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={generatedImage}
                target="_blank"
                rel="noreferrer"
                download={`toolifia-ai-image-${seed}.png`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Download Full HD Image
              </a>
              <button
                type="button"
                onClick={handleGenerate}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate Variant
              </button>
            </div>
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-500 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
              <ImageIcon className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-400">Your AI-generated artwork will appear here</p>
            <p className="text-xs text-slate-600 max-w-sm">
              Type your prompt above or click Random Idea to produce a stunning image powered by Agnes AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
