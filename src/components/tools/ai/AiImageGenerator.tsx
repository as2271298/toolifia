"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles, Download, RefreshCw, Image as ImageIcon, Wand2,
  Sliders, Check, Copy, Key, Zap, Cpu, AlertCircle, ExternalLink
} from "lucide-react";

const STYLES = [
  { id: "photorealistic", name: "Photorealistic 8K", icon: "📷", promptSuffix: "photorealistic, 8k resolution, highly detailed, professional photography, studio lighting" },
  { id: "cyberpunk", name: "Cyberpunk / Neon", icon: "🌃", promptSuffix: "cyberpunk aesthetic, glowing neon lights, futuristic city, cinematic mood, octane render" },
  { id: "anime", name: "Anime / Studio Ghibli", icon: "🎨", promptSuffix: "anime art style, vibrant colors, detailed illustration, studio ghibli aesthetic, trending on pixiv" },
  { id: "3d-render", name: "3D Pixar / Unreal", icon: "🎮", promptSuffix: "3d character render, pixar style, unreal engine 5, soft volumetric lighting, ray tracing" },
  { id: "digital-art", name: "Digital Painting", icon: "🖌️", promptSuffix: "digital art masterpiece, detailed brushwork, artstation trending, dramatic lighting" },
  { id: "cinematic", name: "Cinematic Movie", icon: "🎬", promptSuffix: "cinematic film still, 35mm lens, anamorphic lighting, movie scene, depth of field" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "Square (1:1)", width: 1024, height: 1024, icon: "⏹️" },
  { id: "16:9", label: "Landscape (16:9)", width: 1280, height: 720, icon: "🖼️" },
  { id: "9:16", label: "Story / Reel (9:16)", width: 720, height: 1280, icon: "📱" },
];

export function AiImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [selectedEngine, setSelectedEngine] = useState<"agnes" | "pollinations">("agnes");
  const [customKey, setCustomKey] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000));
  const [copied, setCopied] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{ title: string; desc: string; link?: string; linkText?: string } | null>(null);

  useEffect(() => {
    const savedAgnes = localStorage.getItem("toolifia_agnes_api_key");
    if (savedAgnes) setCustomKey(savedAgnes);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    setErrorDetails(null);

    const styleObj = STYLES.find((s) => s.id === selectedStyle);
    const aspectObj = ASPECT_RATIOS.find((a) => a.id === aspectRatio) || ASPECT_RATIOS[0];
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          engine: selectedEngine,
          aspectRatio,
          styleSuffix: styleObj?.promptSuffix || "",
          apiKey: customKey,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errorType === "AGNES_KEY_MISSING") {
          setErrorDetails({
            title: "Agnes AI Key Required",
            desc: "Agnes provides free API keys for AI image & video generation with agnes-image-2.5-flash. Get your free key at platform.agnes-ai.com, or switch to the Instant Free engine.",
            link: "https://platform.agnes-ai.com",
            linkText: "Get Free Agnes Key →",
          });
        } else {
          setErrorDetails({
            title: "Generation Failed",
            desc: data.error || "Failed to generate image. You can switch to the Instant Free engine.",
          });
        }
        setIsGenerating(false);
        return;
      }

      if (data.imageUrl) {
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
        throw new Error("No image output returned");
      }
    } catch (err: any) {
      // Fallback
      const fullPrompt = encodeURIComponent(`${prompt.trim()}, ${styleObj?.promptSuffix || ""}`);
      const fallbackUrl = `https://image.pollinations.ai/prompt/${fullPrompt}?width=${aspectObj.width}&height=${aspectObj.height}&seed=${newSeed}&nologo=true`;
      setGeneratedImage(fallbackUrl);
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    const styleObj = STYLES.find((s) => s.id === selectedStyle);
    navigator.clipboard.writeText(`${prompt}, ${styleObj?.promptSuffix || ""}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Engine Switcher Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">Image AI Engine:</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold">
                {selectedEngine === "agnes" ? "Agnes AI (2.5 Flash)" : "Pollinations (Instant Free)"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {selectedEngine === "agnes"
                ? "Powered by Agnes AI cloud platform (agnes-image-2.5-flash)"
                : "Instant diffusion synthesis with zero configuration needed"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedEngine("agnes")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedEngine === "agnes"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Agnes 2.5 Flash
          </button>
          <button
            type="button"
            onClick={() => setSelectedEngine("pollinations")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedEngine === "pollinations"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Instant Free
          </button>
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="px-2 py-1 rounded-lg text-slate-400 hover:text-white text-xs border border-slate-800 hover:border-slate-700"
            title="Configure Agnes API Key"
          >
            <Key className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Control Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            Describe the image you want to generate
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A majestic futuristic cyberpunk city floating above neon clouds at twilight, ultra detailed..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Select Art Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                  selectedStyle === style.id
                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-900/30"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-base">{style.icon}</span>
                <span className="truncate">{style.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Aspect Ratio
          </label>
          <div className="flex flex-wrap gap-2.5">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-medium transition-all ${
                  aspectRatio === ratio.id
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
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
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating AI Image ({selectedEngine === "agnes" ? "Agnes AI" : "Free Engine"})...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Image ({selectedEngine === "agnes" ? "Agnes 2.5 Flash" : "Instant Free"})
              </>
            )}
          </button>

          {prompt && (
            <button
              onClick={handleCopyPrompt}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Prompt!" : "Copy Full Prompt"}
            </button>
          )}
        </div>

        {/* Error / Key Notification */}
        {errorDetails && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs space-y-2.5">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white">{errorDetails.title}</h4>
                <p className="mt-0.5 text-amber-300/90 leading-relaxed">{errorDetails.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {errorDetails.link && (
                <a
                  href={errorDetails.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                >
                  {errorDetails.linkText || "Open Agnes Platform →"}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedEngine("pollinations");
                  setErrorDetails(null);
                  handleGenerate();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors shadow-sm"
              >
                <Zap className="w-3 h-3 text-amber-300" /> Generate with Instant Free Engine →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Output Display Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        {isGenerating ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-purple-300 text-sm font-medium animate-pulse">
              Synthesizing pixels with {selectedEngine === "agnes" ? "Agnes AI (agnes-image-2.5-flash)" : "Neural AI Diffusion"}...
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
                download={`toolifia-ai-image-${seed}.jpg`}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Download 8K Image
              </a>
              <button
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
              Type a prompt above and select your favorite style to create instant photorealistic or artistic images with Agnes AI or Instant Free.
            </p>
          </div>
        )}
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Agnes AI Key Settings</h3>
                  <p className="text-[11px] text-slate-400">Configure your Agnes AI Platform key</p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Agnes API Key</label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => {
                  setCustomKey(e.target.value);
                  localStorage.setItem("toolifia_agnes_api_key", e.target.value);
                }}
                placeholder="Enter Agnes key from platform.agnes-ai.com..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Free keys are available instantly from{" "}
                <a
                  href="https://platform.agnes-ai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 underline"
                >
                  platform.agnes-ai.com
                </a>
                . Keys are saved locally in your browser.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
