"use client";

import { useState } from "react";
import { Copy, Check, Droplet } from "lucide-react";

export function ColorPicker() {
  const [color, setColor] = useState("#0c8ce9");
  const [copied, setCopied] = useState<string | null>(null);

  // HEX to RGB
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b, str: `rgb(${r}, ${g}, ${b})` };
  };

  const rgb = hexToRgb(color);

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-24 h-24 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-lg"
          />
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white uppercase font-mono">{color}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{rgb.str}</div>
          </div>
        </div>

        <div className="w-full sm:w-48 h-20 rounded-2xl shadow-inner border border-white/20" style={{ backgroundColor: color }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">HEX Code</div>
            <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">{color}</div>
          </div>
          <button
            onClick={() => copyVal(color, "hex")}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {copied === "hex" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">RGB Value</div>
            <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">{rgb.str}</div>
          </div>
          <button
            onClick={() => copyVal(rgb.str, "rgb")}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            {copied === "rgb" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
