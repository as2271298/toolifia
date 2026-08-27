"use client";
import { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";

interface Preset {
  name: string;
  w: number;
  h: number;
  platform: string;
}

const PRESETS: Preset[] = [
  { name: "Instagram Square", w: 1080, h: 1080, platform: "Instagram" },
  { name: "Instagram Story / Reel", w: 1080, h: 1920, platform: "Instagram" },
  { name: "Instagram Landscape", w: 1080, h: 566, platform: "Instagram" },
  { name: "Facebook Post", w: 1200, h: 630, platform: "Facebook" },
  { name: "Facebook Cover", w: 820, h: 312, platform: "Facebook" },
  { name: "Twitter / X Post", w: 1600, h: 900, platform: "Twitter" },
  { name: "Twitter Header", w: 1500, h: 500, platform: "Twitter" },
  { name: "LinkedIn Post", w: 1200, h: 627, platform: "LinkedIn" },
  { name: "YouTube Thumbnail", w: 1280, h: 720, platform: "YouTube" },
  { name: "Pinterest Pin", w: 1000, h: 1500, platform: "Pinterest" },
];

export function SocialImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      renderResized(src, selectedPreset);
    };
    reader.readAsDataURL(file);
  };

  const renderResized = (src: string, preset: Preset) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = preset.w;
      canvas.height = preset.h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, preset.w, preset.h);

        // Aspect fit / cover
        const scale = Math.max(preset.w / img.width, preset.h / img.height);
        const x = (preset.w / 2) - (img.width / 2) * scale;
        const y = (preset.h / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        setResizedDataUrl(canvas.toDataURL("image/jpeg", 0.92));
      }
    };
    img.src = src;
  };

  const selectPreset = (p: Preset) => {
    setSelectedPreset(p);
    if (imageSrc) {
      renderResized(imageSrc, p);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
        <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Image to Resize</p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP formats</p>
      </div>

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase mb-3">Select Social Media Format</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => selectPreset(p)}
              className={`p-3 rounded-xl text-left border transition ${
                selectedPreset.name === p.name
                  ? "bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500/50"
              }`}
            >
              <p className="text-xs font-bold truncate">{p.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{p.w} × {p.h}px</p>
            </button>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {resizedDataUrl && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{selectedPreset.name}</p>
              <p className="text-xs text-slate-400">{selectedPreset.w} × {selectedPreset.h}px ({selectedPreset.platform})</p>
            </div>
            <a
              href={resizedDataUrl}
              download={`${selectedPreset.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition shadow-lg shadow-brand-500/20"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          </div>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center max-h-96 overflow-hidden">
            <img src={resizedDataUrl} alt="Resized preview" className="max-h-80 object-contain rounded-lg shadow-md" />
          </div>
        </div>
      )}
    </div>
  );
}
