"use client";

import React, { useState, useRef } from "react";
import {
  Sparkles, Download, RefreshCw, Image as ImageIcon,
  Wand2, Dices, Copy, Check, Upload, X, AlertCircle
} from "lucide-react";

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
  "A cute baby red panda wearing tiny samurai armor, studio lighting, hyper-detailed",
  "A glass bottle floating on calm turquoise ocean waves containing a miniature galaxy inside"
];

export function AiImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000));
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reference Image (Image-to-Image)
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("Image size must be under 15MB");
      return;
    }
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setAttachedImage(null);
    setImageName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRandomPrompt = () => {
    const random = INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)];
    setPrompt(random);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !attachedImage) {
      setErrorMessage("Please enter a prompt or upload an image to transform.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setErrorMessage(null);

    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed);

    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          image: attachedImage || "",
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
    } catch (err: any) {
      // Automatic fallback
      const fullPrompt = encodeURIComponent(prompt.trim() || "cinematic high definition photography");
      const fallbackUrl = `https://image.pollinations.ai/prompt/${fullPrompt}?width=1024&height=1024&seed=${newSeed}&nologo=true`;
      setGeneratedImage(fallbackUrl);
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold">AI Image Studio</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                ● Agnes AI 2.5 Active
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium">
                100% Free · No Signup
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate from text prompts or upload reference images for Image-to-Image transformation.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRandomPrompt}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
        >
          <Dices className="w-3.5 h-3.5 text-purple-400" /> Random Idea
        </button>
      </div>

      {/* 2 Simple Creation Modes Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Text-to-Image</h4>
            <p className="text-[11px] text-slate-400">Describe any scene or character to create from scratch</p>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Image-to-Image</h4>
            <p className="text-[11px] text-slate-400">Click <em>+ Add Reference Image</em> to restyle photos</p>
          </div>
        </div>
      </div>

      {/* Control Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            Describe the image you want to create or transform
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              attachedImage
                ? "Describe how to transform or restyle this image (e.g. Turn into a Pixar 3D character, add cyberpunk neon lighting)..."
                : "e.g. A futuristic cyberpunk city floating above neon clouds at twilight, ultra detailed 8k photography..."
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed resize-none"
          />
        </div>

        {/* Reference Image Attachment (Image-to-Image) */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-purple-400" /> Reference Image (Optional)
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {!attachedImage ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-purple-500/50 hover:bg-slate-950 transition-all flex items-center justify-center gap-3 text-center group"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white group-hover:text-purple-300 block">
                  + Add Reference Image (Image-to-Image)
                </span>
                <span className="text-[11px] text-slate-500">
                  Upload a photo to guide style, composition, or character design
                </span>
              </div>
            </button>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-purple-500/40 text-white shadow-md">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={attachedImage}
                  alt="Reference preview"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-300 truncate max-w-[200px]">
                      {imageName || "Reference Image"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                      Image-to-Image Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    AI will use this photo as visual reference and style guide.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
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
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500 shadow-md"
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
            disabled={isGenerating || (!prompt.trim() && !attachedImage)}
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
                {attachedImage ? "Transform Image with AI (Free)" : "Generate AI Image (Free)"}
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

        {/* Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
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
              Type your prompt above or upload an image to produce a high-definition artwork powered by Agnes AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
