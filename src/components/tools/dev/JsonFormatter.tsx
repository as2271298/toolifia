"use client";

import { useState } from "react";
import { Braces, Copy, Check, AlertCircle, Minimize2, Maximize2 } from "lucide-react";

export function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('{"name":"Toolifia","status":"active","tools":300}');
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormatted(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax!");
      setFormatted("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormatted(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax!");
      setFormatted("");
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(formatted || jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Braces className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">JSON Actions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-white shadow-md transition-all flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Beautify (2 Spaces)
          </button>
          <button
            onClick={() => handleFormat(4)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md transition-all flex items-center gap-1"
          >
            Beautify (4 Spaces)
          </button>
          <button
            onClick={handleMinify}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all flex items-center gap-1"
          >
            <Minimize2 className="w-3.5 h-3.5" /> Minify JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Raw JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON string here..."
            className="w-full h-72 p-4 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white resize-none font-mono"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-500">Formatted Output</label>
            {(formatted || jsonInput) && (
              <button
                onClick={copyResult}
                className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy JSON"}
              </button>
            )}
          </div>

          {error ? (
            <div className="w-full h-72 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-4 h-4" /> JSON Syntax Error
              </div>
              <div>{error}</div>
            </div>
          ) : (
            <pre className="w-full h-72 p-4 text-xs sm:text-sm bg-slate-950 text-emerald-400 border border-slate-800 rounded-2xl overflow-auto font-mono whitespace-pre-wrap">
              {formatted || jsonInput}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
