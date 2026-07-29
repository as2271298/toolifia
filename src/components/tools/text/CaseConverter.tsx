"use client";

import { useState } from "react";
import { Copy, Check, Type } from "lucide-react";

export function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () =>
    setText(
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    );
  const toCamel = () =>
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    );
  const toSnake = () =>
    setText(
      text
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/\s+/g, "_")
        .toLowerCase()
    );
  const toKebab = () =>
    setText(
      text
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase()
    );

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <button onClick={toUpper} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          UPPERCASE
        </button>
        <button onClick={toLower} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          lowercase
        </button>
        <button onClick={toTitle} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          Title Case
        </button>
        <button onClick={toCamel} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          camelCase
        </button>
        <button onClick={toSnake} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          snake_case
        </button>
        <button onClick={toKebab} className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-brand-500 hover:text-white transition-all">
          kebab-case
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase text-slate-500">Transformable Text Area</label>
          <button
            onClick={copyText}
            className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy Result"}
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to apply case transformations instantly..."
          className="w-full h-64 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
        />
      </div>
    </div>
  );
}
