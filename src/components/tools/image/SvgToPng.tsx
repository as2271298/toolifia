"use client";
import { useState, useRef } from "react";
import { Download, Upload } from "lucide-react";

export function SvgToPng() {
  const [svgInput, setSvgInput] = useState("");
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [pngUrl, setPngUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgInput(content);
      convertSvg(content, parseInt(width) || 800, parseInt(height) || 600);
    };
    reader.readAsText(file);
  };

  const convertSvg = (svgText: string, w: number, h: number) => {
    if (!svgText.trim()) return;
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const URLObj = window.URL || window.webkitURL || window;
    const blobURL = URLObj.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(image, 0, 0, w, h);
        const png = canvas.toDataURL("image/png");
        setPngUrl(png);
      }
      URLObj.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  };

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-5">
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-brand-500 transition cursor-pointer relative bg-slate-50 dark:bg-slate-800/50">
        <input type="file" accept=".svg" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        <Upload className="w-8 h-8 text-brand-500 mx-auto mb-2" />
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Upload SVG File or Drag & Drop</p>
        <p className="text-xs text-slate-400 mt-1">.svg files up to 10MB</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Or Paste SVG Code</label>
        <textarea
          className={inp}
          rows={5}
          value={svgInput}
          onChange={(e) => {
            setSvgInput(e.target.value);
            convertSvg(e.target.value, parseInt(width) || 800, parseInt(height) || 600);
          }}
          placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...>...</svg>"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Output Width (px)</label>
          <input
            className={inp}
            type="number"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              convertSvg(svgInput, parseInt(e.target.value) || 800, parseInt(height) || 600);
            }}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Output Height (px)</label>
          <input
            className={inp}
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              convertSvg(svgInput, parseInt(width) || 800, parseInt(e.target.value) || 600);
            }}
          />
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {pngUrl && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">PNG Preview ({width} × {height}px)</p>
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-[200px]">
            <img src={pngUrl} alt="Converted PNG" className="max-h-72 object-contain" />
          </div>
          <a
            href={pngUrl}
            download="converted.png"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition shadow-lg shadow-brand-500/20"
          >
            <Download className="w-4 h-4" /> Download PNG
          </a>
        </div>
      )}
    </div>
  );
}
