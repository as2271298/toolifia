"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<"SoftwareApplication" | "FAQPage" | "HowTo">("SoftwareApplication");
  const [name, setName] = useState("My App");
  const [description, setDescription] = useState("A powerful web utility");
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    if (schemaType === "SoftwareApplication") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: name,
          operatingSystem: "All",
          applicationCategory: "WebApplication",
          description: description,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
        null,
        2
      );
    } else if (schemaType === "FAQPage") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `What is ${name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: description,
              },
            },
          ],
        },
        null,
        2
      );
    } else {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to use ${name}`,
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Step 1",
              text: description,
            },
          ],
        },
        null,
        2
      );
    }
  };

  const copySchema = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${getCode()}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        {(["SoftwareApplication", "FAQPage", "HowTo"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSchemaType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              schemaType === type
                ? "bg-brand-600 text-white shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Entity Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Entity Description / Text</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 p-3.5 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-brand-400 font-mono">JSON-LD Output</span>
            <button
              onClick={copySchema}
              className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:underline"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy JSON-LD"}
            </button>
          </div>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
            {`<script type="application/ld+json">\n${getCode()}\n</script>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
