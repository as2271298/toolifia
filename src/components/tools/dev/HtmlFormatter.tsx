"use client";

import { useState } from "react";
import { Copy, Check, Code } from "lucide-react";

export function HtmlFormatter() {
  const [htmlInput, setHtmlInput] = useState('<div className="card"><h1>Hello World</h1><p>Toolifia platform</p></div>');
  const [formatted, setFormatted] = useState("");
  const [copied, setCopied] = useState(false);

  const formatHtml = () => {
    let indent = "";
    const tab = "  ";
    let result = "";

    const lines = htmlInput
      .replace(/>\s*</g, ">\n<")
      .split("\n");

    lines.forEach((line) => {
      if (line.match(/<\/\w/)) {
        indent = indent.substring(tab.length);
      }
      result += indent + line + "\n";
      if (line.match(/<\w[^>]*[^\/]>$/) && !line.startsWith("<!")) {
        indent += tab;
      }
    });

    setFormatted(result.trim());
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(formatted || htmlInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={formatHtml}
          className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
        >
          <Code className="w-4 h-4" /> Format HTML Code
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Unformatted HTML</label>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            className="w-full h-72 p-4 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-500">Beautified HTML</label>
            <button
              onClick={copyHtml}
              className="flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Result"}
            </button>
          </div>
          <pre className="w-full h-72 p-4 text-xs font-mono bg-slate-950 text-slate-200 border border-slate-800 rounded-2xl overflow-auto whitespace-pre-wrap">
            {formatted || htmlInput}
          </pre>
        </div>
      </div>
    </div>
  );
}
