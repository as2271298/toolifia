"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CurlToFetch() {
  const [curl, setCurl] = useState("");
  const [copied, setCopied] = useState(false);

  const parseCurl = (c: string) => {
    if (!c.trim()) return "";
    try {
      const urlMatch = c.match(/curl\s+(?:-[^\s]+\s+)*['"]?([^'"\s]+)/);
      const url = urlMatch ? urlMatch[1] : "https://api.example.com/data";

      const methodMatch = c.match(/-X\s+([A-Z]+)/);
      const method = methodMatch ? methodMatch[1] : c.includes("-d ") || c.includes("--data") ? "POST" : "GET";

      const headerMatches = [...c.matchAll(/-H\s+['"]([^'"]+)['"]/g)];
      const headers: Record<string, string> = {};
      headerMatches.forEach((m) => {
        const [k, ...v] = m[1].split(":");
        if (k && v.length) headers[k.trim()] = v.join(":").trim();
      });

      const dataMatch = c.match(/(?:-d|--data|--data-raw)\s+['"]([^'"]+)['"]/);
      const body = dataMatch ? dataMatch[1] : null;

      const options: Record<string, any> = { method };
      if (Object.keys(headers).length) options.headers = headers;
      if (body) {
        try {
          options.body = JSON.parse(body);
        } catch {
          options.body = body;
        }
      }

      return `const response = await fetch("${url}", {
  method: "${method}",
  headers: ${JSON.stringify(headers, null, 4)},
  ${body ? `body: JSON.stringify(${typeof options.body === "object" ? JSON.stringify(options.body, null, 4) : JSON.stringify(body)})` : ""}
});

const data = await response.json();
console.log(data);`;
    } catch {
      return "// Could not parse cURL command. Ensure format is standard.";
    }
  };

  const jsCode = parseCurl(curl);

  const copy = () => {
    navigator.clipboard.writeText(jsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Paste cURL Command</label>
        <textarea
          className={inp}
          rows={5}
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          placeholder={`curl -X POST https://api.example.com/items \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Item 1"}'`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-slate-500 uppercase">JavaScript Fetch Output</label>
          {jsCode && (
            <button onClick={copy} className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-semibold">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} Copy Code
            </button>
          )}
        </div>
        <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-auto leading-relaxed max-h-96">
          {jsCode || "// Output will appear here after pasting cURL command"}
        </pre>
      </div>
    </div>
  );
}
