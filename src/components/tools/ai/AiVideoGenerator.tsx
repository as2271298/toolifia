"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Video, Film, Sparkles, Download, RefreshCw,
  Check, Copy, Wand2, Dices, AlertCircle, Image as ImageIcon,
  Upload, X, Play, Clock, AlertTriangle
} from "lucide-react";

const INSPIRATION_PROMPTS = [
  "A futuristic flying car gliding through towering neon skyscrapers in rain at night",
  "A majestic snow leopard walking slowly across a snowy mountain ridge in 8K slow motion",
  "An astronaut exploring a crystalline alien cave with glowing turquoise bioluminescent plants",
  "A cozy coffee shop on a rainy afternoon with steam rising from a latte in cinematic lighting",
  "A tiny baby dragon hatching from a glowing golden egg in Pixar 3D animation style",
  "A cinematic drone shot sweeping across sunny tropical ocean beach waves at sunset"
];

export function AiVideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [duration, setDuration] = useState("5");

  // Media attachments: Image-to-Video & Video-to-Video
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [attachedVideo, setAttachedVideo] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  // Status
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Upstream Error Diagnostics & Auto-retry
  const [errorInfo, setErrorInfo] = useState<{
    type?: "QUEUE_FULL" | "RATE_LIMITED" | "AGNES_ERROR" | "GENERAL";
    title: string;
    details?: string;
    retryAfter?: number;
  } | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  const cancelCountdown = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setCountdown(null);
  };

  // Generated Real Video URL
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("Image size must be under 15MB");
      return;
    }
    setImageName(file.name);
    setAttachedVideo(null); // Mutually exclusive reference
    setVideoName("");
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage("Video size must be under 25MB");
      return;
    }
    setVideoName(file.name);
    setAttachedImage(null); // Mutually exclusive reference
    setImageName("");
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedVideo(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setAttachedImage(null);
    setImageName("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeVideo = () => {
    setAttachedVideo(null);
    setVideoName("");
    if (videoInputRef.current) videoInputRef.current.value = "";
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
      setPrompt(`${prompt.trim()}, cinematic film shot, 35mm lens, 8k resolution, volumetric atmosphere`);
    }
    setIsEnhancing(false);
  };

  const startCountdown = (seconds: number) => {
    cancelCountdown();
    setCountdown(seconds);
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;
          startGeneration();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startGeneration = async () => {
    cancelCountdown();
    setErrorInfo(null);
    setErrorMessage(null);

    if (!prompt.trim() && !attachedImage && !attachedVideo) {
      const msg = "Please enter a scene prompt or upload an image/video to animate.";
      setErrorMessage(msg);
      setErrorInfo({ type: "GENERAL", title: msg });
      return;
    }

    setStatus("generating");
    setProgress(15);
    setStatusMessage(
      attachedImage
        ? "Analyzing starting image & camera trajectory..."
        : attachedVideo
        ? "Processing source video reference frames..."
        : "Connecting to Agnes AI 2.5 GPU cluster..."
    );

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 40) {
          setStatusMessage("Synthesizing temporal visual frames...");
          return prev + 5;
        } else if (prev < 75) {
          setStatusMessage("Composing 3D camera trajectory and motion...");
          return prev + 4;
        } else if (prev < 92) {
          setStatusMessage("Encoding final MP4 video stream on cloud CDN...");
          return prev + 2;
        }
        return prev;
      });
    }, 900);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          engine: "agnes",
          aspectRatio,
          duration,
          image: attachedImage || "",
          video: attachedVideo || "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        clearInterval(progressInterval);
        setStatus("error");
        const errType = data.errorType || "GENERAL";
        const errTitle = data.error || "Failed to start video generation. Please try again.";
        const errDetails = data.details || "";
        const retrySec = data.retryAfter || (errType === "QUEUE_FULL" ? 15 : null);

        setErrorInfo({
          type: errType,
          title: errTitle,
          details: errDetails,
          retryAfter: retrySec || undefined,
        });
        setErrorMessage(errTitle);

        if (retrySec && errType === "QUEUE_FULL") {
          startCountdown(retrySec);
        }
        return;
      }

      if (data.videoUrl) {
        clearInterval(progressInterval);
        setProgress(100);
        setVideoUrl(data.videoUrl);
        setStatus("done");
      } else if (data.projectId) {
        setStatusMessage("Rendering high-definition video frames...");
        await pollVideoStatus(data.projectId, data.engine || "agnes", progressInterval);
      } else {
        clearInterval(progressInterval);
        setStatus("error");
        const msg = "Unexpected response from generation engine. Please try again.";
        setErrorInfo({ type: "GENERAL", title: msg });
        setErrorMessage(msg);
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setStatus("error");
      const msg = err?.message || "Network error. Please check your connection and try again.";
      setErrorInfo({ type: "GENERAL", title: msg });
      setErrorMessage(msg);
    }
  };

  const pollVideoStatus = async (projectId: string, engine: string, progressInterval: NodeJS.Timeout) => {
    let attempts = 0;
    const maxAttempts = 40;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const queryUrl = `/api/video/generate?project=${encodeURIComponent(projectId)}&engine=${encodeURIComponent(engine)}`;
        const checkRes = await fetch(queryUrl);
        const pollData = await checkRes.json();

        if (pollData.status === "done" && pollData.videoUrl) {
          clearInterval(interval);
          clearInterval(progressInterval);
          setVideoUrl(pollData.videoUrl);
          setProgress(100);
          setStatus("done");
        } else if (pollData.status === "error") {
          clearInterval(interval);
          clearInterval(progressInterval);
          setStatus("error");
          const errMsg = pollData.message || "Video rendering encountered an issue. Please try again.";
          setErrorInfo({
            type: "GENERAL",
            title: errMsg,
            details: "Upstream video rendering encountered an error. Please retry.",
          });
          setErrorMessage(errMsg);
        } else {
          if (typeof pollData.progress === "number" && pollData.progress > 0) {
            setProgress(Math.max(pollData.progress, 20));
          }
        }
      } catch {
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          clearInterval(progressInterval);
          setStatus("error");
          const timeoutMsg = "Video generation timed out. Please try again.";
          setErrorInfo({ type: "GENERAL", title: timeoutMsg });
          setErrorMessage(timeoutMsg);
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
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-white">AI Video Generator Studio</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                ● Agnes AI 2.5 Active
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium">
                100% Free · No Signup
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Generate from text, animate photos into video, or restyle clips in high definition MP4.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRandomPrompt}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Dices className="w-3.5 h-3.5 text-rose-400" /> Random Idea
          </button>
        </div>
      </div>

      {/* 3 Simple Creation Modes Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
            1
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Text-to-Video</h4>
            <p className="text-[11px] text-slate-400">Type any prompt to generate scenes</p>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Image-to-Video</h4>
            <p className="text-[11px] text-slate-400">Click <em>+ Add Image</em> to animate photos</p>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
            3
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Video-to-Video</h4>
            <p className="text-[11px] text-slate-400">Click <em>+ Add Video</em> to remix footage</p>
          </div>
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
                Describe your video or animation
              </label>
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

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  attachedImage
                    ? "Describe how you want this image to be animated (e.g. Slow zoom in, hair blowing gently in wind, cinematic sunlight)..."
                    : attachedVideo
                    ? "Describe how to transform or remix this video (e.g. Cyberpunk neo style, cinematic lighting)..."
                    : "Describe your scene... (e.g. A cyber samurai walking through a rainy neon city in slow motion with lens flares)"
                }
                rows={3}
                className="w-full rounded-2xl border border-slate-700/80 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Media Attachments: Image Adding & Video Adding */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Upload className="w-3.5 h-3.5 text-rose-400" />
              Reference Media (Optional)
            </label>

            {/* Hidden file inputs */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />

            {!attachedImage && !attachedVideo ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Add Image Button */}
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="p-4 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-rose-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-rose-300">
                      + Add Image
                    </h4>
                    <p className="text-[11px] text-slate-400">Image-to-Video Animation</p>
                  </div>
                </button>

                {/* Add Video Button */}
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="p-4 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-rose-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-rose-300">
                      + Add Video
                    </h4>
                    <p className="text-[11px] text-slate-400">Video-to-Video Transform</p>
                  </div>
                </button>
              </div>
            ) : attachedImage ? (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-purple-500/40 text-white shadow-md">
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={attachedImage}
                    alt="Attached reference"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-300 truncate max-w-[200px]">
                        {imageName || "Reference Image"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                        Image-to-Video Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      AI will animate this photo into a cinematic video clip.
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
            ) : (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-rose-500/40 text-white shadow-md">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Film className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-300 truncate max-w-[200px]">
                        {videoName || "Reference Video"}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        Video-to-Video Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      AI will restyle and remix this video using Agnes 2.5.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeVideo}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition-colors"
                  title="Remove Video"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Aspect Ratio & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        ? "bg-rose-500 text-white border-rose-500 shadow-md"
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
                        ? "bg-rose-500 text-white border-rose-500 shadow-md"
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
                  <Film className="w-5 h-5" />
                  {attachedImage
                    ? "Animate Image to Video (Free)"
                    : attachedVideo
                    ? "Transform Video to Video (Free)"
                    : "Generate AI Video (Free)"}
                </>
              )}
            </button>
          </div>

          {/* Error Banner with Upstream Diagnostics & Retry */}
          {errorInfo && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                errorInfo.type === "QUEUE_FULL"
                  ? "bg-amber-950/30 border-amber-500/40 text-amber-200"
                  : errorInfo.type === "RATE_LIMITED"
                  ? "bg-orange-950/30 border-orange-500/40 text-orange-200"
                  : "bg-rose-950/40 border-rose-800/60 text-rose-200"
              } space-y-3 shadow-lg`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      errorInfo.type === "QUEUE_FULL"
                        ? "bg-amber-500/20 text-amber-400"
                        : errorInfo.type === "RATE_LIMITED"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-rose-500/20 text-rose-400"
                    }`}
                  >
                    {errorInfo.type === "QUEUE_FULL" ? (
                      <Clock className="w-4 h-4" />
                    ) : errorInfo.type === "RATE_LIMITED" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {errorInfo.title}
                      </h4>
                      {errorInfo.type === "QUEUE_FULL" && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                          Agnes GPU Queue Busy
                        </span>
                      )}
                      {errorInfo.type === "RATE_LIMITED" && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold border border-orange-500/30">
                          Free Quota Cooldown
                        </span>
                      )}
                    </div>
                    {errorInfo.details && (
                      <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
                        {errorInfo.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Countdown */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => startGeneration()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-white shadow-md active:scale-95 ${
                    errorInfo.type === "QUEUE_FULL"
                      ? "bg-amber-600 hover:bg-amber-500"
                      : errorInfo.type === "RATE_LIMITED"
                      ? "bg-orange-600 hover:bg-orange-500"
                      : "bg-rose-600 hover:bg-rose-500"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${countdown !== null ? "animate-spin" : ""}`} />
                  {countdown !== null ? `Retry Now (Auto in ${countdown}s)` : "Retry Generation"}
                </button>

                {countdown !== null && (
                  <button
                    type="button"
                    onClick={cancelCountdown}
                    className="px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    Cancel Auto-Retry
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Actual HTML5 Video Player (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-2xl space-y-4">
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
                      Type your scene prompt on the left or upload an image/video to produce an MP4 video.
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

            {/* Quick Instructions Helper Card */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs space-y-2.5">
              <div className="font-bold text-slate-300 flex items-center gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Quick Instructions
              </div>
              <ul className="space-y-1.5 text-slate-400 text-[11px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Text-to-Video:</strong> Type a prompt and click Generate.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">•</span>
                  <span><strong>Image-to-Video:</strong> Click <em>+ Add Image</em> to animate any still photo.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Video-to-Video:</strong> Click <em>+ Add Video</em> to restyle motion clips.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>MP4 Download:</strong> 100% clean video with no watermarks or logos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
