"use client";

import { useState } from "react";
import { Copy, Check, Binary } from "lucide-react";

export function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello World!");
  const [copied, setCopied] = useState(false);

  let output = "";
  let error = "";

  try {
    if (mode === "encode") {
      output = btoa(unescape(encodeURIComponent(input)));
    } else {
      output = decodeURIComponent(escape(atob(input)));
    }
  } catch (err: any) {
    error = "Invalid Base64 string for decoding!";
  }

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "encode" ? "bg-indigo-600 text-white shadow-md" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "decode" ? "bg-indigo-600 text-white shadow-md" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          Decode Base64
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-56 p-4 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none font-mono"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-500">Output Result</label>
            {output && !error && (
              <button
                onClick={copyResult}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Output"}
              </button>
            )}
          </div>
          {error ? (
            <div className="w-full h-56 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono">
              {error}
            </div>
          ) : (
            <pre className="w-full h-56 p-4 text-xs sm:text-sm bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl overflow-auto font-mono whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
