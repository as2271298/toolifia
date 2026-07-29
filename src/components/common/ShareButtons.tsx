"use client";

import { useState } from "react";
import { Share2, Check, Copy, Twitter, Linkedin, Facebook } from "lucide-react";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUrl = encodeURIComponent(url || "");
  const encodedTitle = encodeURIComponent(`Check out ${title} on Toolifia:`);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Share:</span>
      <button
        onClick={copyUrl}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title="Copy Link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${currentUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-sky-500" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-blue-600" />
      </a>
    </div>
  );
}
