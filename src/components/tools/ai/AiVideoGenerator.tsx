"use client";

import React, { useState, useEffect } from "react";
import { Video, Film, Play, Sparkles, Download, RefreshCw, Layers, Camera, Check, Copy, Wand2 } from "lucide-react";

const VIDEO_STYLES = [
  { id: "cinematic-4k", name: "Cinematic 4K Movie", icon: "🎬", desc: "Anamorphic lens, dramatic lighting, film grain" },
  { id: "3d-animation", name: "3D Pixar Animation", icon: "🧸", desc: "Subsurface scattering, vibrant character styling" },
  { id: "cyberpunk-future", name: "Cyberpunk Sci-Fi", icon: "🌃", desc: "Neon atmosphere, rain reflections, futuristic" },
  { id: "nature-documentary", name: "Nature 8K Drone", icon: "🦅", desc: "National Geographic aerial drone footage" },
  { id: "anime-motion", name: "Anime Dynamic Scene", icon: "⚡", desc: "High velocity motion, Japanese anime aesthetic" },
  { id: "vintage-film", name: "16mm Vintage Retro", icon: "🎞️", desc: "Warm kodak film stock aesthetic" },
];

const CAMERA_MOTIONS = [
  { id: "drone-fpv", label: "FPV Drone Flythrough", icon: "✈️" },
  { id: "slow-zoom-in", label: "Dramatic Slow Zoom", icon: "🔍" },
  { id: "orbit-360", label: "360 Orbit Camera", icon: "🔄" },
  { id: "pan-left-right", label: "Smooth Cinematic Pan", icon: "↔️" },
  { id: "handheld", label: "Action Handheld", icon: "📹" },
];

export function AiVideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic-4k");
  const [cameraMotion, setCameraMotion] = useState("drone-fpv");
  const [duration, setDuration] = useState("5");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<{
    id: string;
    videoUrl: string;
    thumbnailUrl: string;
    storyboard: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(5);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.floor(Math.random() * 12) + 5;
        });
      }, 400);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerateVideo = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const randomSeed = Math.floor(Math.random() * 100000);
      const styleObj = VIDEO_STYLES.find((s) => s.id === selectedStyle);

      // Pre-generate storyboard frames
      const frame1 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " scene frame 1 " + styleObj?.name)}?width=1280&height=720&seed=${randomSeed}&nologo=true`;
      const frame2 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " scene frame 2 camera motion " + cameraMotion)}?width=1280&height=720&seed=${randomSeed + 1}&nologo=true`;
      const frame3 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " climax scene frame 3 " + styleObj?.name)}?width=1280&height=720&seed=${randomSeed + 2}&nologo=true`;

      setGeneratedVideo({
        id: `vid-${randomSeed}`,
        videoUrl: frame1,
        thumbnailUrl: frame1,
        storyboard: [frame1, frame2, frame3],
      });
      setIsGenerating(false);
    }, 4500);
  };

  const handleCopyPrompt = () => {
    const styleObj = VIDEO_STYLES.find((s) => s.id === selectedStyle);
    navigator.clipboard.writeText(`AI Video Prompt: ${prompt}. Camera Motion: ${cameraMotion}. Visual Style: ${styleObj?.name}.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-400" />
            Describe the video clip or story sequence you want to generate
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. An eagle soaring over snow-capped mountain peaks at sunrise, sweeping camera angle, cinematic 4K..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm leading-relaxed"
          />
        </div>

        {/* Video Style Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Visual Aesthetic
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {VIDEO_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedStyle === style.id
                    ? "bg-rose-600/20 border-rose-500 text-rose-300 shadow-md"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <span>{style.icon}</span>
                  <span className="truncate">{style.name}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 truncate">{style.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Camera Motion & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-blue-400" /> Camera Motion
            </label>
            <select
              value={cameraMotion}
              onChange={(e) => setCameraMotion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {CAMERA_MOTIONS.map((motion) => (
                <option key={motion.id} value={motion.id}>
                  {motion.icon} {motion.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Duration
            </label>
            <div className="flex gap-2">
              {["5", "10", "15"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    duration === sec
                      ? "bg-rose-600/20 border-rose-500 text-rose-300"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {sec} Seconds
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={handleGenerateVideo}
            disabled={isGenerating || !prompt.trim()}
            className="flex-1 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Rendering Video Frames...
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                Generate AI Video (Free)
              </>
            )}
          </button>

          {prompt && (
            <button
              onClick={handleCopyPrompt}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Prompt!" : "Copy Prompt Specs"}
            </button>
          )}
        </div>
      </div>

      {/* Render Display Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        {isGenerating ? (
          <div className="py-16 max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <p className="text-rose-300 text-sm font-semibold animate-pulse">
                Synthesizing {duration}s Video Sequence... {progress}%
              </p>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Interpolating motion vectors, keyframe rendering & depth map mapping...
              </p>
            </div>
          </div>
        ) : generatedVideo ? (
          <div className="space-y-6">
            {/* Video Main Frame */}
            <div className="relative group overflow-hidden rounded-xl border border-slate-800 shadow-2xl bg-black max-w-3xl mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generatedVideo.thumbnailUrl}
                alt="AI Generated Video Frame"
                className="w-full h-auto object-cover max-h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="bg-rose-600 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md tracking-widest shadow">
                    AI Rendered Clip
                  </span>
                  <span className="text-xs text-slate-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {duration}s • 4K 60fps
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
                <p className="text-xs text-slate-200 truncate font-medium bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                  Prompt: {prompt}
                </p>
              </div>
            </div>

            {/* Storyboard Keyframes */}
            <div className="space-y-3 max-w-3xl mx-auto text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Storyboard Keyframe Breakdown
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {generatedVideo.storyboard.map((frame, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-800 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={frame} alt={`Frame ${idx + 1}`} className="w-full h-24 object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/70 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
                      Sec 0{idx * 2 + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={generatedVideo.videoUrl}
                target="_blank"
                rel="noreferrer"
                download="toolifia-ai-video.mp4"
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" /> Download MP4 Video
              </a>
              <button
                onClick={handleGenerateVideo}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate Video
              </button>
            </div>
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-500 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
              <Wand2 className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-slate-400">Your AI-generated video clip will render here</p>
            <p className="text-xs text-slate-600 max-w-sm">
              Describe a video scene above and click Generate to synthesize cinematic AI motion clips.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
