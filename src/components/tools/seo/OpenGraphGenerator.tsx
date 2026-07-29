"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

export function OpenGraphGenerator() {
  const [ogTitle, setOgTitle] = useState("My Website Title");
  const [ogDesc, setOgDesc] = useState("Discover our amazing platform and tools.");
  const [ogUrl, setOgUrl] = useState("https://example.com");
  const [ogImg, setOgImg] = useState("https://example.com/social-card.png");
  const [copied, setCopied] = useState(false);

  const tags = `<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDesc}" />
<meta property="og:url" content="${ogUrl}" />
<meta property="og:image" content="${ogImg}" />
<meta property="og:type" content="website" />`;

  const copyTags = () => {
    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">og:title</label>
            <input
              type="text"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">og:description</label>
            <input
              type="text"
              value={ogDesc}
              onChange={(e) => setOgDesc(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">og:url</label>
            <input
              type="text"
              value={ogUrl}
              onChange={(e) => setOgUrl(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">og:image</label>
            <input
              type="text"
              value={ogImg}
              onChange={(e) => setOgImg(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-brand-400 font-mono">OpenGraph Tags</span>
            <button
              onClick={copyTags}
              className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Tags"}
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">{tags}</pre>
        </div>
      </div>
    </div>
  );
}
