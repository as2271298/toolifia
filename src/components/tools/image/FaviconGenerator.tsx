"use client";
import { useState, useRef } from "react";
import { Download, Upload, Copy, Check } from "lucide-react";

export function FaviconGenerator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState("⚡");
  const [bgColor, setBgColor] = useState("#6d28d9");
  const [textColor, setTextColor] = useState("#ffffff");
  const [mode, setMode] = useState<"upload" | "text">("text");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const downloadFavicon = (size: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (mode === "upload" && imageSrc) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, size, size);
        triggerDownload(canvas, `favicon-${size}x${size}.png`);
      };
      img.src = imageSrc;
    } else {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, size * 0.2);
      ctx.fill();

      ctx.fillStyle = textColor;
      ctx.font = `${Math.floor(size * 0.65)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2 + size * 0.05);

      triggerDownload(canvas, `favicon-${size}x${size}.png`);
    }
  };

  const triggerDownload = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const headCode = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  const copyCode = () => {
    navigator.clipboard.writeText(headCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("text")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            mode === "text" ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          Generate from Emoji / Letter
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            mode === "upload" ? "bg-brand-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          Upload Image
        </button>
      </div>

      {mode === "text" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Letter or Emoji</label>
            <input className={inp} value={text} maxLength={2} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Background Color</label>
            <div className="flex gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer" />
              <input className={inp} value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Text Color</label>
            <div className="flex gap-2">
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-12 h-10 rounded-xl cursor-pointer" />
              <input className={inp} value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
          <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Square Logo / Icon</p>
          <p className="text-xs text-slate-400 mt-1">PNG, SVG, or JPG (min 512×512 recommended)</p>
        </div>
      )}

      {/* Preview Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <p className="text-xs font-bold text-slate-500 uppercase">Favicon Sizes Preview & Download</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SIZES.map((size) => (
            <div key={size} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
              <div
                className="rounded-lg shadow-sm flex items-center justify-center overflow-hidden"
                style={{
                  width: Math.min(64, Math.max(24, size)),
                  height: Math.min(64, Math.max(24, size)),
                  backgroundColor: mode === "text" ? bgColor : "transparent",
                }}
              >
                {mode === "text" ? (
                  <span style={{ color: textColor, fontSize: Math.min(36, size * 0.6) }}>{text}</span>
                ) : imageSrc ? (
                  <img src={imageSrc} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{size} × {size}px</p>
              </div>
              <button
                onClick={() => downloadFavicon(size)}
                className="w-full py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" /> PNG
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HTML Head Code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase">HTML Tag Embed Code</p>
          <button onClick={copyCode} className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-semibold">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} Copy HTML
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono overflow-auto">{headCode}</pre>
      </div>
    </div>
  );
}
