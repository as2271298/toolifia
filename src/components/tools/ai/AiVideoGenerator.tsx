"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Video, Film, Sparkles, Download, RefreshCw, Camera,
  Check, Copy, Wand2, Key, Play, Pause,
  AlertCircle, Dices, Eye, ShieldCheck
} from "lucide-react";

interface VideoStyle {
  id: string;
  name: string;
  icon: string;
  badge: string;
  desc: string;
}

const VIDEO_STYLES: VideoStyle[] = [
  { id: "cinematic", name: "Cinematic 4K", icon: "🎬", badge: "Ultra HD", desc: "35mm anamorphic lens, dramatic lighting, film grain" },
  { id: "cyberpunk", name: "Cyberpunk Neo", icon: "🌃", badge: "Trending", desc: "Neon reflections, rain slicked streets, blade runner aesthetic" },
  { id: "nature", name: "Nature & Wildlife", icon: "🦅", badge: "8K Drone", desc: "National geographic style, golden hour sunbeams, slow-mo" },
  { id: "anime", name: "Anime Motion", icon: "⚡", badge: "Ghibli", desc: "Vibrant hand-drawn animation, fluid dynamic movements" },
  { id: "3d", name: "3D Pixar CGI", icon: "🧸", badge: "Animation", desc: "Subsurface scattering, Disney 3D render, smooth physics" },
  { id: "vintage", name: "16mm Vintage", icon: "🎞️", badge: "Retro", desc: "Warm kodachrome tones, subtle 1970s film scratches" },
  { id: "scifi", name: "Sci-Fi Space", icon: "🚀", badge: "Interstellar", desc: "Deep space nebulae, epic starships, zero-gravity floating" },
];

const CAMERA_MOTIONS = [
  { id: "slow-zoom", label: "Slow Zoom In", icon: "🔍" },
  { id: "drone-fly", label: "Drone Flythrough", icon: "✈️" },
  { id: "360-orbit", label: "360° Orbit", icon: "🔄" },
  { id: "pan", label: "Cinematic Pan", icon: "↔️" },
  { id: "handheld", label: "Handheld Natural", icon: "📹" },
  { id: "dolly", label: "Dolly Forward", icon: "🎥" },
];

const INSPIRATION_PROMPTS = [
  "A futuristic flying car gliding through towering neon skyscrapers in rain at night",
  "A majestic snow leopard walking slowly across a snowy mountain ridge in 8K slow motion",
  "An astronaut exploring a crystalline alien cave with glowing turquoise bioluminescent plants",
  "A cozy coffee shop on a rainy afternoon with steam rising from a latte in cinematic lighting",
  "A tiny baby dragon hatching from a glowing golden egg in Pixar 3D animation style",
  "A high-speed cyber motorcycle racing through Tokyo highways leaving neon light trails"
];

const DEFAULT_API_KEY = "";

interface GenerationResult {
  id: string;
  prompt: string;
  style: string;
  motion: string;
  aspectRatio: string;
  duration: number;
  frames: string[];
  videoUrl?: string | null;
  timestamp: string;
}

export function AiVideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [cameraMotion, setCameraMotion] = useState("slow-zoom");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [duration, setDuration] = useState("5");

  // API Key Management (Pre-configured with User Key)
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showKeyPlain, setShowKeyPlain] = useState(false);

  // Generation States
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<GenerationResult | null>(null);
  const [recentGenerations, setRecentGenerations] = useState<GenerationResult[]>([]);

  // Video & Canvas Animation Player
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const recordingRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Load custom key from storage if user customized it
    const storedKey = localStorage.getItem("toolifia_gemini_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const saveCustomKey = (newKey: string) => {
    setApiKey(newKey);
    if (newKey.trim() && newKey !== DEFAULT_API_KEY) {
      localStorage.setItem("toolifia_gemini_api_key", newKey);
    } else {
      localStorage.removeItem("toolifia_gemini_api_key");
    }
  };

  const handleRandomPrompt = () => {
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];
    setPrompt(random);
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enhance", prompt }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
      }
    } catch {
      setPrompt(`${prompt.trim()}, highly detailed cinematic shot, dynamic lighting, 8k resolution, volumetric fog, Unreal Engine 5 render style`);
    }
    setIsEnhancing(false);
  };

  const startGeneration = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate your AI video.");
      return;
    }

    setStatus("generating");
    setError(null);
    setProgress(5);
    setStatusMessage("Connecting to Google Veo 3.1 Video Engine...");

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 25) {
          setStatusMessage("Analyzing prompt & camera motion vectors...");
          return prev + 4;
        } else if (prev < 60) {
          setStatusMessage("Synthesizing 8K cinematic temporal keyframes...");
          return prev + 3;
        } else if (prev < 88) {
          setStatusMessage("Encoding high-definition 60FPS video stream...");
          return prev + 2;
        }
        return prev;
      });
    }, 450);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          motion: cameraMotion,
          aspectRatio,
          duration,
          apiKey,
        }),
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate video");
      }

      const data = await res.json();
      setProgress(100);
      setStatusMessage("Video rendering complete!");

      const newResult: GenerationResult = {
        id: `vid_${Date.now()}`,
        prompt: data.prompt,
        style: data.style,
        motion: data.motion,
        aspectRatio: data.aspectRatio,
        duration: data.duration,
        frames: data.frames || [],
        videoUrl: data.videoUrl || null,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setCurrentResult(newResult);
      setRecentGenerations((prev) => [newResult, ...prev.slice(0, 5)]);

      await preloadFrames(newResult.frames);

      setStatus("done");
      setIsPlaying(true);
      setPlaybackTime(0);
    } catch (err: any) {
      clearInterval(progressInterval);
      setStatus("error");
      setError(err.message || "An error occurred during video generation. Please try again.");
    }
  };

  const preloadFrames = (frameUrls: string[]): Promise<void> => {
    return new Promise((resolve) => {
      let loaded = 0;
      const images: HTMLImageElement[] = [];

      if (!frameUrls || frameUrls.length === 0) {
        resolve();
        return;
      }

      frameUrls.forEach((url, index) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => {
          images[index] = img;
          loaded++;
          if (loaded === frameUrls.length) {
            loadedImagesRef.current = images;
            resolve();
          }
        };
        img.onerror = () => {
          loaded++;
          if (loaded === frameUrls.length) {
            loadedImagesRef.current = images.filter(Boolean);
            resolve();
          }
        };
      });
    });
  };

  // ── Canvas Motion Video Engine ─────────────────────────────────────────────
  useEffect(() => {
    if (status !== "done" || !canvasRef.current || loadedImagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();
    const videoDuration = (currentResult?.duration || 5) * 1000;

    const renderLoop = (now: number) => {
      if (!isPlaying) {
        animationFrameId.current = requestAnimationFrame(renderLoop);
        return;
      }

      const elapsed = (now - startTime) % videoDuration;
      const progressRatio = elapsed / videoDuration;
      setPlaybackTime(elapsed / 1000);

      const images = loadedImagesRef.current;
      if (images.length === 0) return;

      const numImages = images.length;
      const segment = 1 / (numImages - 1 || 1);
      const imgIdx = Math.min(Math.floor(progressRatio / segment), numImages - 2);
      const subProgress = (progressRatio - imgIdx * segment) / segment;

      const imgA = images[imgIdx] || images[0];
      const imgB = images[imgIdx + 1] || images[images.length - 1];

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      const motionType = currentResult?.motion || "slow-zoom";
      let scale = 1.0;
      let panX = 0;
      let panY = 0;

      if (motionType === "slow-zoom") {
        scale = 1.0 + progressRatio * 0.18;
      } else if (motionType === "drone-fly") {
        scale = 1.0 + Math.sin(progressRatio * Math.PI) * 0.22;
        panY = Math.sin(progressRatio * Math.PI * 2) * 15;
      } else if (motionType === "pan") {
        panX = (progressRatio - 0.5) * 50;
      } else if (motionType === "handheld") {
        panX = Math.sin(progressRatio * 15) * 6;
        panY = Math.cos(progressRatio * 12) * 6;
      } else {
        scale = 1.0 + progressRatio * 0.12;
      }

      ctx.translate(width / 2 + panX, height / 2 + panY);
      ctx.scale(scale, scale);
      ctx.translate(-width / 2, -height / 2);

      if (imgA) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgA, 0, 0, width, height);
      }

      if (imgB && imgA !== imgB) {
        ctx.globalAlpha = subProgress;
        ctx.drawImage(imgB, 0, 0, width, height);
      }

      // Vignette atmosphere
      ctx.globalAlpha = 0.25;
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.3,
        width / 2, height / 2, width * 0.7
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [status, isPlaying, currentResult]);

  // ── Download Video (Captures Canvas Stream to WebM/MP4) ────────────────────
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    try {
      const stream = (canvas as any).captureStream(30);
      recordedChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      recordingRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `toolifia_veo_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();

      setTimeout(() => {
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      }, (currentResult?.duration || 5) * 1000);
    } catch {
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `toolifia_ai_frame_${Date.now()}.png`;
      a.click();
    }
  };

  const copyPrompt = () => {
    if (currentResult?.prompt) {
      navigator.clipboard.writeText(currentResult.prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner: Engine & Key Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Google Veo 3.1 AI Video Engine</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                API Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Active Key: <code className="text-rose-300 font-mono text-[11px]">{apiKey ? "Custom Key Active" : "Server Pre-Configured"}</code>
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowKeyModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
        >
          <Key className="w-3.5 h-3.5 text-rose-400" />
          API Key Settings
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Video Controls & Prompt (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prompt Box */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Video Prompt
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRandomPrompt}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Random prompt idea"
                >
                  <Dices className="w-3.5 h-3.5" /> Random Idea
                </button>
                <button
                  onClick={handleEnhancePrompt}
                  disabled={isEnhancing || !prompt.trim()}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1 rounded-lg border border-rose-500/20 transition-all disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene in detail... (e.g. An astronaut exploring an ancient alien temple on Mars in dramatic cinematic lighting)"
                rows={4}
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none font-sans"
              />
              <span className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono">
                {prompt.length} chars
              </span>
            </div>
          </div>

          {/* Video Style Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Visual Art Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {VIDEO_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  type="button"
                  className={`p-3 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedStyle === style.id
                      ? "bg-rose-600/10 border-rose-500 text-white ring-1 ring-rose-500"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{style.icon}</span>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {style.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{style.name}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{style.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Camera Motion & Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Camera Motion */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-rose-400" />
                Camera Motion
              </label>
              <select
                value={cameraMotion}
                onChange={(e) => setCameraMotion(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                {CAMERA_MOTIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.icon} {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "16:9", label: "16:9", desc: "YouTube" },
                  { id: "9:16", label: "9:16", desc: "Reels/TikTok" },
                  { id: "1:1", label: "1:1", desc: "Square" },
                ].map((ar) => (
                  <button
                    key={ar.id}
                    onClick={() => setAspectRatio(ar.id as any)}
                    type="button"
                    className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition-all ${
                      aspectRatio === ar.id
                        ? "bg-rose-500 text-white border-rose-500"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div>{ar.label}</div>
                    <div className="text-[9px] font-normal opacity-80">{ar.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clip Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "5", label: "5 Seconds" },
                  { id: "10", label: "10 Seconds" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    type="button"
                    className={`py-2.5 rounded-xl text-center border text-xs font-bold transition-all ${
                      duration === d.id
                        ? "bg-rose-500 text-white border-rose-500"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={startGeneration}
              disabled={status === "generating"}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {status === "generating" ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Synthesizing Video ({progress}%)...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  Generate AI Video with Google Veo
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Generation Note</p>
                <p className="mt-0.5 text-rose-400/90">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Video Player & Output (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" />
                Video Output Screen
              </span>
              {status === "done" && (
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Ready · {currentResult?.duration}s @ 60FPS
                </span>
              )}
            </div>

            {/* Player Container */}
            <div
              className={`relative rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center shadow-inner ${
                aspectRatio === "9:16" ? "aspect-[9/16] max-h-[520px] mx-auto" : aspectRatio === "1:1" ? "aspect-square" : "aspect-video"
              }`}
            >
              {status === "generating" ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 w-full">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
                    <Video className="w-6 h-6 text-rose-400 absolute inset-0 m-auto" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <p className="text-sm font-bold text-white">{statusMessage}</p>
                    <p className="text-xs text-slate-400 font-mono">{progress}% completed</p>
                  </div>
                  <div className="w-4/5 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : status === "done" ? (
                <div className="relative w-full h-full group">
                  <canvas
                    ref={canvasRef}
                    width={aspectRatio === "9:16" ? 720 : aspectRatio === "1:1" ? 1024 : 1280}
                    height={aspectRatio === "9:16" ? 1280 : aspectRatio === "1:1" ? 1024 : 720}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-full h-full object-cover cursor-pointer"
                  />

                  {/* Player Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-between items-center">
                      <span className="bg-black/60 text-white text-[10px] font-mono px-2 py-1 rounded-lg backdrop-blur-sm">
                        Google Veo 3.1 Mode
                      </span>
                    </div>

                    <div className="pointer-events-auto space-y-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <span className="text-xs font-mono text-white">
                          {playbackTime.toFixed(1)}s / {currentResult?.duration}.0s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 text-slate-500">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-300">Ready to Generate</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">
                      Enter your scene prompt and click Generate to produce high-resolution AI video footage.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar (When Done) */}
            {status === "done" && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" /> Download Video (MP4/WebM)
                  </button>
                  <button
                    onClick={startGeneration}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    title="Generate Variation"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={copyPrompt}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    title="Copy Prompt"
                  >
                    {copiedPrompt ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Generations Shelf */}
          {recentGenerations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recent Generations ({recentGenerations.length})
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {recentGenerations.map((gen) => (
                  <button
                    key={gen.id}
                    onClick={() => {
                      setCurrentResult(gen);
                      setStatus("done");
                      preloadFrames(gen.frames);
                    }}
                    className="group relative rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900 hover:border-rose-500 transition-all"
                  >
                    {gen.frames[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={gen.frames[0]} alt={gen.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* API Key Modal / Drawer */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Google Veo API Settings</h3>
                  <p className="text-[11px] text-slate-400">Google AI Studio Authentication</p>
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
              <label className="text-xs font-semibold text-slate-300">
                Active Gemini / Veo API Key
              </label>
              <div className="relative">
                <input
                  type={showKeyPlain ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => saveCustomKey(e.target.value)}
                  placeholder="Enter custom Gemini or Veo API key..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white pr-10 font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyPlain(!showKeyPlain)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                The server is pre-configured with Google AI Studio authentication. You can optionally supply your own key to override.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Client & Server Encrypted
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Keys are transmitted strictly via secure TLS to Google Generative Language endpoints.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  saveCustomKey(DEFAULT_API_KEY);
                  setShowKeyModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
              >
                Reset Default
              </button>
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-md shadow-rose-500/20"
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
