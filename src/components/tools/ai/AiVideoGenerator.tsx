"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Video, Film, Sparkles, Download, RefreshCw, Camera,
  Check, Copy, Wand2, Key, Play, Pause,
  AlertCircle, Dices, ExternalLink, ShieldAlert, Cpu,
  Volume2, VolumeX, Type, Zap
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

export function AiVideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [cameraMotion, setCameraMotion] = useState("slow-zoom");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [duration, setDuration] = useState("5");

  // Engines: "json2video" (Fast MP4 Engine) | "google-veo" (Google AI Studio) | "fal-ai" (Kling 2.1)
  const [selectedEngine, setSelectedEngine] = useState<"json2video" | "google-veo" | "fal-ai">("json2video");
  const [customKey, setCustomKey] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);

  // Narration & Title Options
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [narrationText, setNarrationText] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  // Status
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{ title: string; desc: string; link?: string; linkText?: string } | null>(null);

  // Generated Real Video URL
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const savedJson2Video = localStorage.getItem("toolifia_json2video_key");
    const savedFal = localStorage.getItem("toolifia_fal_key");
    const savedGemini = localStorage.getItem("toolifia_gemini_api_key");
    if (selectedEngine === "json2video" && savedJson2Video) setCustomKey(savedJson2Video);
    if (selectedEngine === "fal-ai" && savedFal) setCustomKey(savedFal);
    if (selectedEngine === "google-veo" && savedGemini) setCustomKey(savedGemini);
  }, [selectedEngine]);

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
      if (data.suggestedNarration) {
        setNarrationText(data.suggestedNarration);
      }
    } catch {
      setPrompt(`${prompt.trim()}, highly detailed cinematic film shot, 35mm anamorphic lens, 8k resolution, volumetric atmospheric lighting`);
    }
    setIsEnhancing(false);
  };

  const startGeneration = async () => {
    if (!prompt.trim()) {
      setErrorDetails({
        title: "Prompt Required",
        desc: "Please describe the scene you want to generate in the prompt box above."
      });
      return;
    }

    setStatus("generating");
    setErrorDetails(null);
    setProgress(15);
    setStatusMessage(
      selectedEngine === "json2video"
        ? "Synthesizing cinematic visuals & camera trajectory..."
        : selectedEngine === "google-veo"
        ? "Connecting to Google Veo 3.1..."
        : "Connecting to Kling 2.1 Video Engine..."
    );

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 40) {
          setStatusMessage("Composing 3D camera pan & Ken Burns zoom...");
          return prev + 6;
        } else if (prev < 75) {
          setStatusMessage(
            narrationEnabled
              ? "Synthesizing neural voiceover & audio stream..."
              : "Rendering temporal video frames..."
          );
          return prev + 4;
        } else if (prev < 92) {
          setStatusMessage("Encoding final MP4 video stream on cloud CDN...");
          return prev + 2;
        }
        return prev;
      });
    }, 700);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          engine: selectedEngine,
          style: selectedStyle,
          motion: cameraMotion,
          aspectRatio,
          duration,
          apiKey: customKey,
          narration: narrationEnabled ? (narrationText.trim() || prompt.trim()) : "",
          showTitle,
        }),
      });

      clearInterval(progressInterval);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        if (data.errorType === "VEO_QUOTA_EXHAUSTED") {
          setErrorDetails({
            title: "Google Veo Quota Limit (Billing Required)",
            desc: "Google AI Studio offers free tier for Gemini text and multimodal chat models, but Google Veo (Video Generation) requires a Google Cloud project with Billing enabled. Free-tier Google keys currently have a Veo video quota of 0 requests/min.",
            link: "https://aistudio.google.com/",
            linkText: "Link Billing in Google AI Studio →"
          });
        } else if (data.errorType === "FAL_KEY_MISSING") {
          setErrorDetails({
            title: "Fal.ai Key Required for Kling 2.1",
            desc: "To generate real MP4 videos with Kling 2.1 or Wan 2.1, get a free key from Fal.ai (includes $10 free trial credits, no card required).",
            link: "https://fal.ai/dashboard/keys",
            linkText: "Get Free Fal.ai Key ($10 Credits) →"
          });
        } else if (data.errorType === "JSON2VIDEO_KEY_MISSING") {
          setErrorDetails({
            title: "Fast MP4 Engine Key Needed",
            desc: "Please provide a valid JSON2Video API key or configure it in server settings.",
            link: "https://json2video.com/",
            linkText: "Get Free JSON2Video Key →"
          });
        } else {
          setErrorDetails({
            title: "Generation Failed",
            desc: data.error || "Failed to generate video. Please verify your API key and quota status."
          });
        }
        return;
      }

      // If video URL returned directly
      if (data.videoUrl) {
        setProgress(100);
        setVideoUrl(data.videoUrl);
        setStatus("done");
      } else if (data.projectId && selectedEngine === "json2video") {
        // Poll JSON2Video status
        setStatusMessage("Encoding video on cloud render cluster...");
        await pollJson2Video(data.projectId);
      } else if (data.statusUrl && selectedEngine === "fal-ai") {
        // Poll Fal.ai status
        setStatusMessage("Waiting for Kling 2.1 GPU queue...");
        await pollFalVideo(data.statusUrl, data.responseUrl);
      } else {
        setStatus("error");
        setErrorDetails({
          title: "Processing in Queue",
          desc: "Video task submitted to queue. Final rendering may take a moment depending on server load."
        });
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setStatus("error");
      setErrorDetails({
        title: "Connection Error",
        desc: err.message || "Could not reach the video generation server. Please try again."
      });
    }
  };

  const pollJson2Video = async (projectId: string) => {
    let attempts = 0;
    const maxAttempts = 25;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const queryUrl = `/api/video/generate?project=${encodeURIComponent(projectId)}&engine=json2video${
          customKey ? `&apiKey=${encodeURIComponent(customKey)}` : ""
        }`;
        const checkRes = await fetch(queryUrl);
        const pollData = await checkRes.json();

        if (pollData.status === "done" && pollData.videoUrl) {
          clearInterval(interval);
          setVideoUrl(pollData.videoUrl);
          setProgress(100);
          setStatus("done");
        } else if (pollData.status === "error") {
          clearInterval(interval);
          setStatus("error");
          setErrorDetails({
            title: "Render Error",
            desc: pollData.message || "The video rendering job failed on the engine."
          });
        } else {
          setProgress((prev) => Math.min(prev + 2, 96));
        }
      } catch (e: any) {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setStatus("error");
          setErrorDetails({
            title: "Timeout",
            desc: "Video generation took longer than expected. Please try again."
          });
        }
      }
    }, 2500);
  };

  const pollFalVideo = async (statusUrl: string, responseUrl: string) => {
    let attempts = 0;
    const maxAttempts = 40;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const checkRes = await fetch(statusUrl, {
          headers: { Authorization: `Key ${customKey}` }
        });
        const statusData = await checkRes.json();

        if (statusData.status === "COMPLETED") {
          clearInterval(interval);
          const resultRes = await fetch(responseUrl, {
            headers: { Authorization: `Key ${customKey}` }
          });
          const resultData = await resultRes.json();
          const finalUrl = resultData.video?.url || resultData.output?.video_url;

          if (finalUrl) {
            setVideoUrl(finalUrl);
            setProgress(100);
            setStatus("done");
          } else {
            throw new Error("No video output returned from model");
          }
        } else if (statusData.status === "FAILED") {
          clearInterval(interval);
          setStatus("error");
          setErrorDetails({
            title: "Kling 2.1 Model Error",
            desc: statusData.error || "The video generation job failed on the GPU node."
          });
        }
      } catch (e: any) {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setStatus("error");
          setErrorDetails({
            title: "Timeout",
            desc: "Video generation took longer than expected. Please try again."
          });
        }
      }
    }, 2500);
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `toolifia_ai_video_${Date.now()}.mp4`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner: Engine Switcher & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">AI Video Generator (Real MP4 Video)</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                {selectedEngine === "json2video" ? "⚡ Fast MP4 Engine (Active)" : selectedEngine === "google-veo" ? "Google Veo 3.1" : "Kling 2.1 Standard"}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Generates actual playable, downloadable high-definition MP4 videos from text prompts.
            </p>
          </div>
        </div>

        {/* Engine Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedEngine("json2video")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedEngine === "json2video"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Fast MP4 (Real)
          </button>
          <button
            onClick={() => setSelectedEngine("google-veo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedEngine === "google-veo"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Google Veo 3.1
          </button>
          <button
            onClick={() => setSelectedEngine("fal-ai")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedEngine === "fal-ai"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" /> Kling 2.1
          </button>
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-white text-xs border border-slate-800 hover:border-slate-700 transition-colors"
            title="Configure API Key"
          >
            <Key className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Video Parameters & Prompt (7 Cols) */}
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
                placeholder="Describe your video scene... (e.g. A cyber samurai walking through a rainy neon city in slow motion with lens flares)"
                rows={4}
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none font-sans"
              />
              <span className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono">
                {prompt.length} chars
              </span>
            </div>
          </div>

          {/* Narration & Subtitle Options */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setNarrationEnabled(!narrationEnabled)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  narrationEnabled
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {narrationEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>AI Voiceover Narration: {narrationEnabled ? "Enabled (Azure Neural TTS)" : "Off"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowTitle(!showTitle)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  showTitle
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-300"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Subtitle Overlay: {showTitle ? "On" : "Off"}</span>
              </button>
            </div>

            {narrationEnabled && (
              <input
                type="text"
                value={narrationText}
                onChange={(e) => setNarrationText(e.target.value)}
                placeholder="Optional voiceover narration script (or leave empty to narrate your prompt automatically)..."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 font-sans"
              />
            )}
          </div>

          {/* Visual Style Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Cinematic Style
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
                  Generating Real MP4 Video ({progress}%)...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300" />
                  Generate Real MP4 Video ({selectedEngine === "json2video" ? "Fast MP4 Engine" : selectedEngine === "google-veo" ? "Google Veo 3.1" : "Kling 2.1"})
                </>
              )}
            </button>
          </div>

          {/* Detailed Error / Explanations Banner */}
          {errorDetails && (
            <div className="p-5 rounded-3xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{errorDetails.title}</h4>
                  <p className="mt-1 text-amber-300/90 leading-relaxed">{errorDetails.desc}</p>
                </div>
              </div>

              {errorDetails.link && (
                <div className="pt-1 flex flex-wrap gap-2">
                  <a
                    href={errorDetails.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    {errorDetails.linkText || "Open Dashboard →"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {selectedEngine !== "json2video" && (
                    <button
                      onClick={() => {
                        setSelectedEngine("json2video");
                        setErrorDetails(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-bold transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" /> Switch to Fast MP4 Engine (Active Key) →
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actual HTML5 Video Player (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 shadow-2xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" />
                MP4 Video Screen
              </span>
              {status === "done" && videoUrl && (
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Real MP4 Ready
                </span>
              )}
            </div>

            {/* Video Container */}
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
                    <p className="text-xs text-slate-400 font-mono">{progress}% rendered</p>
                  </div>
                  <div className="w-4/5 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : status === "done" && videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 text-slate-500">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500">
                    <Video className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-300">No Video Generated Yet</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">
                      Describe your scene on the left and click Generate to produce a full playable MP4 video.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons when Video is Ready */}
            {status === "done" && videoUrl && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" /> Download MP4 Video
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
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">API Key Settings</h3>
                  <p className="text-[11px] text-slate-400">
                    {selectedEngine === "json2video"
                      ? "Fast MP4 Engine (Pre-configured)"
                      : selectedEngine === "google-veo"
                      ? "Google AI Studio Key"
                      : "Fal.ai API Key"}
                  </p>
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
                {selectedEngine === "json2video"
                  ? "JSON2Video API Key"
                  : selectedEngine === "google-veo"
                  ? "Google Gemini / Veo API Key"
                  : "Fal.ai API Key (Kling 2.1)"}
              </label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => {
                  setCustomKey(e.target.value);
                  if (selectedEngine === "json2video") localStorage.setItem("toolifia_json2video_key", e.target.value);
                  if (selectedEngine === "fal-ai") localStorage.setItem("toolifia_fal_key", e.target.value);
                  if (selectedEngine === "google-veo") localStorage.setItem("toolifia_gemini_api_key", e.target.value);
                }}
                placeholder={
                  selectedEngine === "json2video"
                    ? "Pre-configured server key active (or enter custom key)..."
                    : selectedEngine === "google-veo"
                    ? "Pre-configured server key active (or enter custom key)..."
                    : "Enter Fal.ai key (e.g. xxxxxxxx-xxxx-xxxx...)"
                }
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <p className="text-[11px] text-slate-400">
                {selectedEngine === "json2video"
                  ? "Server key is active and configured. You do not need to enter a key unless you want to use your own personal JSON2Video account."
                  : selectedEngine === "google-veo"
                  ? "Your Google AI Studio key is configured on the server. Make sure billing is enabled on your Google Cloud project for Veo 3.1 video access."
                  : "Fal.ai provides $10 free credits upon signup for Kling 2.1 and Wan 2.1 video generation."}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-md shadow-rose-500/20"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
