"use client";
import { useState, useRef } from "react";
import { Upload, Copy, Check, Pipette } from "lucide-react";

export function ImageColorPicker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<{ hex: string; rgb: string; hsl: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      loadImageToCanvas(src);
    };
    reader.readAsDataURL(file);
  };

  const loadImageToCanvas = (src: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      }
    };
    img.src = src;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
    const rgb = `rgb(${r}, ${g}, ${b})`;

    // HSL
    const r1 = r / 255; const g1 = g / 255; const b1 = b / 255;
    const max = Math.max(r1, g1, b1); const min = Math.min(r1, g1, b1);
    let h = 0; let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r1 ? (g1 - b1) / d + (g1 < b1 ? 6 : 0) : max === g1 ? (b1 - r1) / d + 2 : (r1 - g1) / d + 4;
      h /= 6;
    }
    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    setPickedColor({ hex, rgb, hsl });
  };

  const copyHex = () => {
    if (!pickedColor) return;
    navigator.clipboard.writeText(pickedColor.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
        <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload Image to Pick Colors</p>
        <p className="text-xs text-slate-400 mt-1">Click anywhere on the image after uploading</p>
      </div>

      {pickedColor && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-700 shrink-0" style={{ backgroundColor: pickedColor.hex }} />
          <div className="flex-1 space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{pickedColor.hex.toUpperCase()}</span>
              <button onClick={copyHex} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-brand-600 transition">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs font-mono text-slate-500">{pickedColor.rgb} · {pickedColor.hsl}</p>
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
            <Pipette className="w-3.5 h-3.5" /> Click image to pick color
          </div>
          <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-auto flex justify-center cursor-crosshair">
            <canvas ref={canvasRef} onClick={handleCanvasClick} className="max-h-[500px] w-auto object-contain rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
