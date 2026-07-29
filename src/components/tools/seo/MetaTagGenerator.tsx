"use client";

import { useState } from "react";
import { Copy, Check, Eye } from "lucide-react";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("https://example.com");
  const [ogImage, setOgImage] = useState("https://example.com/og-image.jpg");
  const [copied, setCopied] = useState(false);

  const generatedCode = `<meta name="title" content="${title}" />
<meta name="description" content="${description}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${ogImage}" />`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
              <span>Page Title ({title.length}/60 chars)</span>
              {title.length > 60 && <span className="text-amber-500">Over recommended limit!</span>}
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free Online AI Tools & SEO Platform | Toolifia"
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-1">
              <span>Meta Description ({description.length}/160 chars)</span>
              {description.length > 160 && <span className="text-amber-500">Over recommended limit!</span>}
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Access 300+ free online tools for AI text humanization, SEO optimization, PDF converting, developer utilities, and calculations."
              className="w-full h-28 p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Canonical Web URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">OG Share Image URL</label>
            <input
              type="text"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Live Search Engine Snippet Preview */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400 mb-3">
              <Eye className="w-4 h-4 text-brand-500" /> Google Search Preview
            </div>
            <div className="space-y-1 font-sans">
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{url}</div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {title || "Your Page Title Goes Here"}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {description || "Your meta description snippet will appear here in search engine results."}
              </div>
            </div>
          </div>

          {/* Generated Code Output */}
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-brand-400 font-mono">HTML Meta Tags</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy Tags"}
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {generatedCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
