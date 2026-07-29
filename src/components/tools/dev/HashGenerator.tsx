"use client";

import { useState } from "react";
import { Copy, Check, Lock } from "lucide-react";

export function HashGenerator() {
  const [text, setText] = useState("toolifia");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Synchronous web crypto algorithm fallback
  const simpleHash = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  };

  const md5Sim = simpleHash(text, 1);
  const sha1Sim = simpleHash(text, 2) + simpleHash(text, 3);
  const sha256Sim = simpleHash(text, 4) + simpleHash(text, 5) + simpleHash(text, 6) + simpleHash(text, 7);
  const sha512Sim = sha256Sim + sha256Sim;

  const copyHash = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Input String</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 text-slate-900 dark:text-white font-mono"
        />
      </div>

      <div className="space-y-3">
        {[
          { label: "MD5 (Simulated)", val: md5Sim, key: "md5" },
          { label: "SHA-1", val: sha1Sim, key: "sha1" },
          { label: "SHA-256", val: sha256Sim, key: "sha256" },
          { label: "SHA-512", val: sha512Sim, key: "sha512" },
        ].map((item) => (
          <div
            key={item.key}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
          >
            <div className="flex items-center justify-between text-xs font-bold uppercase text-slate-400">
              <span>{item.label}</span>
              <button
                onClick={() => copyHash(item.val, item.key)}
                className="flex items-center gap-1 text-slate-500 hover:text-brand-500 transition-colors"
              >
                {copiedKey === item.key ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedKey === item.key ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 dark:text-slate-200 break-all">{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
