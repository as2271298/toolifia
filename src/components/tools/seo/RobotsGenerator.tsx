"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function RobotsGenerator() {
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [disallowAdmin, setDisallowAdmin] = useState(true);
  const [disallowApi, setDisallowApi] = useState(true);
  const [copied, setCopied] = useState(false);

  const code = `User-agent: *
${disallowAdmin ? "Disallow: /admin/\n" : ""}${disallowApi ? "Disallow: /api/\n" : ""}Allow: /

Sitemap: ${sitemap}`;

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Sitemap URL</label>
            <input
              type="text"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={disallowAdmin}
                onChange={(e) => setDisallowAdmin(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              Disallow /admin/ directory
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={disallowApi}
                onChange={(e) => setDisallowApi(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              Disallow /api/ endpoints
            </label>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-brand-400 font-mono">robots.txt</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy File"}
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">{code}</pre>
        </div>
      </div>
    </div>
  );
}
