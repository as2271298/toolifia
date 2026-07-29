"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, Cpu } from "lucide-react";

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const list = Array.from({ length: Math.min(count, 50) }, () => generateUuidv4());
    setUuids(list);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-rose-500" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Quantity:</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 p-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-center font-bold"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-500/25 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Generate UUID v4
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-rose-400 font-mono">Generated RFC4122 UUIDs</span>
            <button
              onClick={copyAll}
              className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy All"}
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap max-h-72">
            {uuids.join("\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
