"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Video, Film, Sparkles, Download, RefreshCw, Camera,
  Check, Copy, Wand2, Key, ExternalLink, Play, Pause,
  AlertCircle, ChevronDown, ChevronUp
} from "lucide-react";

const VIDEO_STYLES = [
  { id: "cinematic", name: "Cinematic Movie", icon: "🎬", prompt: "cinematic camera movement, film grain, anamorphic lens flare, dramatic lighting, 4K HDR, movie quality" },
  { id: "cyberpunk", name: "Cyberpunk / Neon", icon: "🌃", prompt: "cyberpunk city, neon lights flickering, rain reflections, flying cars, futuristic, blade runner aesthetic" },
  { id: "nature", name: "Nature & Wildlife", icon: "🦅", prompt: "slow motion nature footage, 8K drone shot, golden hour lighting, national geographic style, breathtaking" },
  { id: "anime", name: "Anime Motion", icon: "⚡", prompt: "anime style, dynamic action, sakura petals falling, Japanese animation, fluid motion" },
  { id: "3d", name: "3D Animation", icon: "🧸", prompt: "3D CGI animation, Pixar-like rendering, smooth character motion, volumetric lighting, ray tracing" },
  { id: "vintage", name: "Vintage / Retro", icon: "🎞️", prompt: "16mm film look, vintage color grading, film dust and scratches, warm kodak tones, nostalgic" },
];

const CAMERA_MOTIONS = [
  { id: "slow-zoom", label: "Slow Zoom In", icon: "🔍" },
  { id: "drone-fly", label: "Drone Flythrough", icon: "✈️" },
  { id: "360-orbit", label: "360° Orbit", icon: "🔄" },
  { id: "pan", label: "Cinematic Pan", icon: "↔️" },
  { id: "handheld", label: "Handheld Shake", icon: "📹" },
  { id: "dolly", label: "Dolly Push", icon: "🎥" },
];

const FAL_MODELS = [
  { id: "fal-ai/kling-video/v2.1/standard/text-to-video", name: "Kling 2.1 (Best)", badge: "⭐ Recommended" },
  { id: "fal-ai/wan/t2v-1.3b", name: "Wan T2V (Fast)", badge: "⚡ Fast" },
  { id: "fal-ai/minimax/video-01", name: "MiniMax Video", badge: "🎯 Realistic" },
];

export function AiVideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [cameraMotion, setCameraMotion] = useState("slow-zoom");
  const [duration, setDuration] = useState("5");
  const [falKey, setFalKey] = useState("");
  const [selectedModel, setSelectedModel] = useState(FAL_MODELS[0].id);
  const [showKeySetup, setShowKeySetup] = useState(false);

  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("fal_api_key");
    if (savedKey) setFalKey(savedKey);
  }, []);

  const saveKey = (key: string) => {
    setFalKey(key);
    localStorage.setItem("fal_api_key", key);
  };

  const buildFullPrompt = () => {
    const style = VIDEO_STYLES.find(s => s.id === selectedStyle);
    const motion = CAMERA_MOTIONS.find(m => m.id === cameraMotion);
    return `${prompt.trim()}, ${style?.prompt || ""}, ${motion?.label || ""} camera motion, ${duration} second video clip, high quality`;
  };

  const generateWithFalAI = async () => {
    if (!falKey.trim()) {
      // If no fal.ai key, automatically run the free instant AI storyboard generator
      return generatePreviewImages();
    }

    setStatus("generating");
    setError(null);
    setVideoUrl(null);
    setProgress(10);
    setProgressMsg("Submitting to fal.ai...");

    const fullPrompt = buildFullPrompt();

    try {
      // Submit job
      const submitRes = await fetch(`https://queue.fal.run/${selectedModel}`, {
        method: "POST",
        headers: {
          "Authorization": `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          duration: parseInt(duration),
          aspect_ratio: "16:9",
          ...(selectedModel.includes("kling") ? { negative_prompt: "blurry, low quality, artifacts" } : {}),
        }),
      });

      if (!submitRes.ok) {
        const errBody = await submitRes.json().catch(() => ({}));
        throw new Error(errBody?.detail || `fal.ai error: ${submitRes.status} - Check your API key is valid`);
      }

      const submitData = await submitRes.json();
      const requestId = submitData.request_id;

      if (!requestId) throw new Error("No request ID returned from fal.ai");

      setProgress(20);
      setProgressMsg("Request queued. Waiting for GPU...");

      // Poll status
      let attempts = 0;
      while (attempts < 60) {
        await new Promise(r => setTimeout(r, 3000));
        attempts++;

        const statusRes = await fetch(`https://queue.fal.run/${selectedModel}/requests/${requestId}/status`, {
          headers: { "Authorization": `Key ${falKey}` },
        });

        const statusData = await statusRes.json();

        if (statusData.status === "COMPLETED") {
          setProgress(90);
          setProgressMsg("Fetching video result...");

          const resultRes = await fetch(`https://queue.fal.run/${selectedModel}/requests/${requestId}`, {
            headers: { "Authorization": `Key ${falKey}` },
          });

          const resultData = await resultRes.json();
          const url = resultData?.video?.url || resultData?.videos?.[0]?.url || resultData?.output?.video?.url;

          if (!url) throw new Error("No video URL in result. Check fal.ai dashboard for output.");

          setVideoUrl(url);
          setProgress(100);
          setProgressMsg("Video ready!");
          setStatus("done");
          setIsPlaying(true);
          return;
        } else if (statusData.status === "FAILED") {
          throw new Error(statusData.error || "Generation failed on fal.ai. Try a different model or prompt.");
        }

        // Update progress smoothly
        const pct = Math.min(20 + Math.floor((attempts / 60) * 65), 85);
        setProgress(pct);
        const msgs = [
          "Initializing GPU cluster...",
          "Generating motion frames...",
          "Applying camera motion vectors...",
          "Rendering temporal consistency...",
          "Encoding high-quality output...",
          "Adding motion interpolation...",
          "Finalizing video output...",
        ];
        setProgressMsg(msgs[Math.floor(attempts / 9)] || "Rendering...");
      }

      throw new Error("Timed out waiting for video. Try again or check fal.ai dashboard.");

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      setStatus("error");
    }
  };

  const generatePreviewImages = async () => {
    if (!prompt.trim()) return;
    setStatus("generating");
    setError(null);
    setProgress(10);
    setProgressMsg("Generating AI preview frames...");

    const style = VIDEO_STYLES.find(s => s.id === selectedStyle);
    const seed = Math.floor(Math.random() * 999999);
    const base = encodeURIComponent(`${prompt}, ${style?.prompt}`);
    const frames = [
      `https://image.pollinations.ai/prompt/${base}?width=1280&height=720&seed=${seed}&nologo=true`,
      `https://image.pollinations.ai/prompt/${base}%20mid%20frame?width=1280&height=720&seed=${seed + 1}&nologo=true`,
      `https://image.pollinations.ai/prompt/${base}%20final%20frame?width=1280&height=720&seed=${seed + 2}&nologo=true`,
    ];

    const loadedImgs: string[] = [];
    for (let i = 0; i < frames.length; i++) {
      setProgress(20 + i * 25);
      setProgressMsg(`Generating frame ${i + 1} of 3...`);
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = frames[i];
        img.onload = () => { loadedImgs.push(frames[i]); resolve(); };
        img.onerror = () => { loadedImgs.push(frames[i]); resolve(); };
        setTimeout(resolve, 6000);
      });
    }

    setPreviewImages(loadedImgs);
    setProgress(100);
    setProgressMsg("Preview storyboard ready!");
    setStatus("done");
  };

  const handleDownloadVideo = async () => {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = `toolifia-ai-video-${Date.now()}.mp4`;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildFullPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasFalKey = falKey.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* API Key Setup Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-800/40 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowKeySetup(!showKeySetup)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${hasFalKey ? "bg-green-600" : "bg-rose-600"}`}>
              <Key className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {hasFalKey ? "✅ fal.ai API Key Connected — Real Video Generation Ready" : "🔑 Connect fal.ai API Key to Generate Real Videos"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {hasFalKey ? "Using Kling/Wan/MiniMax to generate actual MP4 videos" : "Free credits on signup · No credit card required · Takes ~30 seconds"}
              </p>
            </div>
          </div>
          {showKeySetup ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showKeySetup && (
          <div className="border-t border-slate-800/50 p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { step: "1", title: "Sign up free", desc: "Go to fal.ai and create a free account", href: "https://fal.ai" },
                { step: "2", title: "Get your key", desc: "Dashboard → Keys → Create new key", href: "https://fal.ai/dashboard/keys" },
                { step: "3", title: "Paste below", desc: "Enter your key and generate real videos", href: "#" },
              ].map(s => (
                <div key={s.step} className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">{s.step}</span>
                    <span className="font-semibold text-slate-200">{s.title}</span>
                    {s.href !== "#" && (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="ml-auto text-rose-400 hover:text-rose-300">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="password"
                value={falKey}
                onChange={(e) => saveKey(e.target.value)}
                placeholder="Paste your fal.ai API key here (e.g. 12345678-xxxx-...)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
              />
              {hasFalKey && (
                <div className="flex items-center gap-2 bg-green-950/60 border border-green-800/50 rounded-xl px-4 text-green-400 text-xs font-medium">
                  <Check className="w-4 h-4" /> Saved
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-slate-400">Select Video Model</p>
              <div className="flex flex-wrap gap-2">
                {FAL_MODELS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${selectedModel === m.id ? "bg-rose-600/20 border-rose-500 text-rose-300" : "bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600"}`}
                  >
                    {m.badge} {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Input Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-400" />
            Describe your video scene
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A futuristic city at night with flying cars weaving between neon skyscrapers, cinematic aerial view..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm leading-relaxed"
          />
        </div>

        {/* Video Style */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Visual Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {VIDEO_STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStyle(s.id)}
                className={`p-3 rounded-xl border text-left transition-all ${selectedStyle === s.id ? "bg-rose-600/20 border-rose-500 shadow-md" : "bg-slate-950/60 border-slate-800 hover:border-slate-700"}`}
              >
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <span>{s.icon}</span>
                  <span className="truncate">{s.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Camera & Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-blue-400" /> Camera Motion
            </label>
            <select
              value={cameraMotion}
              onChange={(e) => setCameraMotion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {CAMERA_MOTIONS.map(m => (
                <option key={m.id} value={m.id}>{m.icon} {m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Duration</label>
            <div className="flex gap-2">
              {["5", "10"].map(s => (
                <button
                  key={s}
                  onClick={() => setDuration(s)}
                  className={`flex-1 py-3 rounded-xl border text-xs font-medium transition-all ${duration === s ? "bg-rose-600/20 border-rose-500 text-rose-300" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"}`}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3">
          {hasFalKey ? (
            <button
              onClick={generateWithFalAI}
              disabled={status === "generating" || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm"
            >
              {status === "generating" ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Generating Real Video...</>
              ) : (
                <><Video className="w-4 h-4" /> Generate Real AI Video</>
              )}
            </button>
          ) : (
            <button
              onClick={generatePreviewImages}
              disabled={status === "generating" || !prompt.trim()}
              className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:opacity-90 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-sm border border-slate-600"
            >
              {status === "generating" ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Generating Preview...</>
              ) : (
                <><Wand2 className="w-4 h-4" /> Preview Storyboard (No Key)</>
              )}
            </button>
          )}

          {prompt && (
            <button
              onClick={handleCopy}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-3.5 rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-medium transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          )}
        </div>

        {!hasFalKey && (
          <div className="text-center">
            <button
              onClick={() => setShowKeySetup(true)}
              className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2"
            >
              Add free fal.ai API key above → to generate real Higgsfield-style AI videos ↑
            </button>
          </div>
        )}
      </div>

      {/* Progress & Result Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {status === "generating" && (
          <div className="py-12 max-w-md mx-auto space-y-5 text-center">
            <div className="w-16 h-16 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <p className="text-rose-300 text-sm font-semibold">{progressMsg}</p>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{progress}% complete{hasFalKey ? " — Real AI video generation takes ~30–60 seconds" : ""}</p>
            </div>
          </div>
        )}

        {status === "error" && error && (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-center max-w-md">
              <p className="text-red-400 font-semibold text-sm mb-1">
                {error.includes("Exhausted balance") || error.includes("locked")
                  ? "fal.ai API Credit Balance Exhausted"
                  : "Generation Failed"}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">{error}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {/* 1-Click fallback to free preview mode */}
              <button
                onClick={() => {
                  setError(null);
                  generatePreviewImages();
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow flex items-center gap-2 transition-all"
              >
                <Wand2 className="w-3.5 h-3.5" /> Generate Free Storyboard Preview (No Balance Needed)
              </button>

              <a
                href="https://fal.ai/dashboard/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 underline bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Top Up Balance on fal.ai
              </a>
            </div>
          </div>
        )}

        {/* Real Video Player */}
        {status === "done" && videoUrl && (
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-xl border border-slate-700 shadow-2xl bg-black max-w-3xl mx-auto">
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                playsInline
                controls
                className="w-full max-h-[480px]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest shadow">
                  AI Video
                </span>
                <span className="bg-black/70 text-slate-300 text-[10px] px-2.5 py-1 rounded-md">
                  {FAL_MODELS.find(m => m.id === selectedModel)?.name}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownloadVideo}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" /> Download Video (MP4)
              </button>
              <button
                onClick={() => { setStatus("idle"); setVideoUrl(null); }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-5 rounded-xl text-sm flex items-center gap-2 border border-slate-700"
              >
                <RefreshCw className="w-4 h-4" /> Generate Another
              </button>
            </div>
          </div>
        )}

        {/* Storyboard Preview (No Key Mode) */}
        {status === "done" && !videoUrl && previewImages.length > 0 && (
          <div className="space-y-5">
            <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-300 text-sm font-semibold">This is a storyboard preview, not a video</p>
                <p className="text-amber-600 text-xs mt-1">To generate an actual playable MP4 video like Higgsfield, add your free fal.ai API key above. Takes ~30 seconds per video.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {previewImages.map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Frame ${i + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Frame {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => setShowKeySetup(true)}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all"
              >
                <Key className="w-4 h-4" /> Add Free API Key → Generate Real Video
              </button>
            </div>
          </div>
        )}

        {status === "idle" && (
          <div className="py-16 flex flex-col items-center text-slate-600 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-sm font-medium text-slate-400">Your AI video will appear here</p>
            <p className="text-xs text-slate-600 max-w-sm text-center">
              {hasFalKey
                ? "Enter a prompt above and click Generate Real AI Video to create an actual MP4 with camera motion."
                : "Add a free fal.ai API key for real video generation, or click Preview Storyboard for static frames."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
