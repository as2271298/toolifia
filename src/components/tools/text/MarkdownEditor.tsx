"use client";

import { useState } from "react";
import { Copy, Check, Edit3 } from "lucide-react";

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Welcome to Markdown Editor\n\nWrite **bold text**, *italics*, or lists:\n\n- Item 1\n- Item 2");
  const [copied, setCopied] = useState(false);

  // Simple converter
  const htmlOutput = markdown
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/\n/gim, "<br />");

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Markdown Code</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-72 p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none font-mono"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase text-slate-500">Live HTML Preview</label>
            <button
              onClick={copyHtml}
              className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy HTML"}
            </button>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
            className="w-full h-72 p-4 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto prose dark:prose-invert max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
