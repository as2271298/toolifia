"use client";
import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

export function CssGradientGenerator() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [copied, setCopied] = useState(false);

  const gradientCss =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div
        className="w-full h-48 sm:h-64 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-all flex items-center justify-center"
        style={{ background: gradientCss }}
      >
        <span className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs font-mono border border-white/20">
          Preview
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Gradient Type</label>
          <select value={type} onChange={e => setType(e.target.value as any)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>

        {type === "linear" && (
          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>Angle</span>
              <span className="font-mono">{angle}°</span>
            </div>
            <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-brand-600" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Color 1</label>
            <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Color 2</label>
            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-12 h-10 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700" />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
        <code className="text-xs sm:text-sm font-mono text-emerald-400 break-all">
          background: {gradientCss};
        </code>
        <button onClick={handleCopy} className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}
