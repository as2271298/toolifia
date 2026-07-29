"use client";

import { useState } from "react";
import { Copy, Check, Wand2 } from "lucide-react";

export function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const sample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const handleGenerate = () => {
    const list = Array.from({ length: paragraphs }, () => sample);
    setOutput(list.join("\n\n"));
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Paragraphs:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-20 p-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-center font-bold"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md shadow-amber-500/25 flex items-center gap-2 transition-all"
        >
          <Wand2 className="w-4 h-4" /> Generate Lorem Ipsum
        </button>
      </div>

      {output && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Generated Dummy Text</span>
            <button
              onClick={copyText}
              className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Text"}
            </button>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
