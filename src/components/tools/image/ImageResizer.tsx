"use client";

import { useState } from "react";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

export function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("jpeg");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadResized = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL(`image/${format}`);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `resized-image.${format}`;
      a.click();
    };
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 text-center flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          onChange={handleImageUpload}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors"
        >
          <div className="p-4 rounded-full bg-brand-500/10 text-brand-500">
            <Upload className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold">Click to select an image from your device</span>
          <span className="text-xs text-slate-400">PNG, JPG, WEBP formats supported (100% Client-side privacy)</span>
        </label>
      </div>

      {imageSrc && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Target Format</label>
              <select
                value={format}
                onChange={(e: any) => setFormat(e.target.value)}
                className="w-full p-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold"
              >
                <option value="jpeg">JPG / JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={downloadResized}
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Resized Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
