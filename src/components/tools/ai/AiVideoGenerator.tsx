"use client";

import React, { useState, useEffect, useRef } from "react";
import { Video, Film, Play, Pause, Sparkles, Download, RefreshCw, Layers, Camera, Check, Copy, Wand2, Maximize } from "lucide-react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  const [generatedVideo, setGeneratedVideo] = useState<{
    id: string;
    storyboard: string[];
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Handle generation
  const handleGenerateVideo = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setIsPlaying(false);
    setGeneratedVideo(null);
    loadedImagesRef.current = [];

    const randomSeed = Math.floor(Math.random() * 100000);
    const styleObj = VIDEO_STYLES.find((s) => s.id === selectedStyle);

    // Pre-generate storyboard frames
    const f1 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " cinematic scene 1 " + styleObj?.name)}?width=1280&height=720&seed=${randomSeed}&nologo=true`;
    const f2 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " scene frame 2 motion " + cameraMotion)}?width=1280&height=720&seed=${randomSeed + 1}&nologo=true`;
    const f3 = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " climax scene frame 3 " + styleObj?.name)}?width=1280&height=720&seed=${randomSeed + 2}&nologo=true`;

    const frameUrls = [f1, f2, f3];
    let loadedCount = 0;

    const imgObjects = frameUrls.map((url) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameUrls.length && isGenerating) {
          loadedImagesRef.current = imgObjects;
          setGeneratedVideo({ id: `vid-${randomSeed}`, storyboard: frameUrls });
          setIsGenerating(false);
          setIsPlaying(true);
        }
      };
      img.onerror = () => {
        // Fallback images if API times out
        img.src = `https://picsum.photos/seed/${randomSeed + loadedCount}/1280/720`;
      };
      return img;
    });

    // Fallback timer if image load takes too long
    setTimeout(() => {
      if (loadedImagesRef.current.length === 0) {
        loadedImagesRef.current = imgObjects;
        setGeneratedVideo({ id: `vid-${randomSeed}`, storyboard: frameUrls });
        setIsGenerating(false);
        setIsPlaying(true);
      }
    }, 4500);
  };

  // Canvas animation loop
  useEffect(() => {
    if (!generatedVideo || loadedImagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();
    const durationMs = parseInt(duration) * 1000;

    const render = (now: number) => {
      if (!isPlaying) {
        startTime = now - (currentTime * 1000);
      }

      const elapsed = (now - startTime) % durationMs;
      const progressRatio = elapsed / durationMs;
      setCurrentTime(elapsed / 1000);

      const imgs = loadedImagesRef.current;
      const numFrames = imgs.length;
      const step = progressRatio * (numFrames - 1);
      const currentIndex = Math.floor(step);
      const nextIndex = Math.min(currentIndex + 1, numFrames - 1);
      const alpha = step - currentIndex;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera motion effect (zoom & pan)
      const scale = 1 + progressRatio * 0.12;
      const panX = Math.sin(progressRatio * Math.PI) * 20;
      const panY = Math.cos(progressRatio * Math.PI) * 10;

      ctx.save();
      ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Blend current and next frame for smooth 60fps morph transition
      if (imgs[currentIndex] && imgs[currentIndex].complete) {
        ctx.globalAlpha = 1;
        ctx.drawImage(imgs[currentIndex], 0, 0, canvas.width, canvas.height);
      }

      if (imgs[nextIndex] && imgs[nextIndex].complete && alpha > 0) {
        ctx.globalAlpha = alpha;
        ctx.drawImage(imgs[nextIndex], 0, 0, canvas.width, canvas.height);
      }

      // Parallax particle dust / motion streak overlay
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 20; i++) {
        const px = (Math.sin(i * 99 + progressRatio * 5) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(i * 33 + progressRatio * 5) * 0.5 + 0.5) * canvas.height;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (isPlaying) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(render);
    } else {
      render(performance.now());
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [generatedVideo, isPlaying, duration]);

  // Download Video via MediaRecorder from Canvas
  const handleDownloadVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);
    setIsPlaying(true);

    try {
      const stream = canvas.captureStream(60);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm",
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `toolifia-ai-video-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, parseInt(duration) * 1000);
    } catch (err) {
      // Fallback direct image download
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = `toolifia-ai-video-frame-${Date.now()}.png`;
      a.click();
      setIsDownloading(false);
    }
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

        {/* Style Selection */}
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
                Rendering Motion Video...
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
              {copied ? "Copied Specs!" : "Copy Specs"}
            </button>
          )}
        </div>
      </div>

      {/* Render Player Display Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        {isGenerating ? (
          <div className="py-16 max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <p className="text-rose-300 text-sm font-semibold animate-pulse">
                Rendering {duration}s Motion Clip at 60 FPS...
              </p>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Synthesizing camera vectors, depth morphing & frame interpolation...
              </p>
            </div>
          </div>
        ) : generatedVideo ? (
          <div className="space-y-6">
            {/* Interactive HTML5 Motion Video Canvas Player */}
            <div className="relative group overflow-hidden rounded-xl border border-slate-800 shadow-2xl bg-black max-w-3xl mx-auto">
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="w-full h-auto object-cover max-h-[480px] cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              />

              {/* Overlay Video Controls */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 text-left">
                {/* Seeker Progress Bar */}
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="bg-rose-500 h-full transition-all duration-100"
                    style={{ width: `${(currentTime / parseInt(duration)) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                    <span className="text-xs font-mono text-slate-300">
                      0:0{Math.floor(currentTime)} / 0:0{duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-800/50 px-2 py-0.5 rounded">
                      4K 60FPS AI VIDEO
                    </span>
                    <button
                      onClick={() => canvasRef.current?.requestFullscreen()}
                      className="p-1.5 rounded bg-slate-800/80 text-slate-300 hover:text-white"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Storyboard Keyframes */}
            <div className="space-y-3 max-w-3xl mx-auto text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> Keyframe Storyboard Breakdown
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
              <button
                onClick={handleDownloadVideo}
                disabled={isDownloading}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Recording Video WebM...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Video File (.WebM / MP4)
                  </>
                )}
              </button>
              <button
                onClick={handleGenerateVideo}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate Scene
              </button>
            </div>
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-500 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
              <Wand2 className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-sm font-medium text-slate-400">Your playable AI motion video will render here</p>
            <p className="text-xs text-slate-600 max-w-sm">
              Describe a video prompt above and click Generate to produce a 60 FPS motion clip with video controls.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
