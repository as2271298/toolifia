"use client";

import React from "react";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  // Split content into code blocks and normal markdown sections
  const codeBlockRegex = /```([a-z0-9]*)\n([\s\S]*?)```/gi;
  const parts: { type: "code" | "md"; lang?: string; text: string }[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "md", text: content.slice(lastIndex, match.index) });
    }
    parts.push({
      type: "code",
      lang: match[1] || "text",
      text: match[2].trim(),
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "md", text: content.slice(lastIndex) });
  }

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed">
      {parts.map((part, index) => {
        if (part.type === "code") {
          return (
            <div key={index} className="my-6 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 font-mono text-xs">
              <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <span>{part.lang || "Code"}</span>
                <span className="text-emerald-400">● Live Code</span>
              </div>
              <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed">
                <code>{part.text}</code>
              </pre>
            </div>
          );
        }

        // Render Markdown block (headings, tables, lists, paragraphs)
        return <RenderMarkdownBlocks key={index} text={part.text} />;
      })}
    </div>
  );
}

function RenderMarkdownBlocks({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let tableRows: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 my-4 font-medium">
            {currentList.map((li, i) => (
              <li key={i}>{formatInline(li)}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 my-4 font-medium">
            {currentList.map((li, i) => (
              <li key={i}>{formatInline(li)}</li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const parsedRows = tableRows
        .filter((r) => !r.includes("---"))
        .map((r) => r.split("|").map((cell) => cell.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1));

      if (parsedRows.length > 0) {
        const header = parsedRows[0];
        const body = parsedRows.slice(1);

        elements.push(
          <div key={`table-${elements.length}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
                <tr>
                  {header.map((th, i) => (
                    <th key={i} className="py-3.5 px-4">{formatInline(th)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950 font-medium text-slate-700 dark:text-slate-300">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4">{formatInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Empty line
    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      tableRows.push(line);
      continue;
    } else {
      flushTable();
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200/50 dark:border-slate-800/50">
          {formatInline(line.replace("### ", ""))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-8 pb-3 tracking-tight border-b border-slate-200 dark:border-slate-800">
          {formatInline(line.replace("## ", ""))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={i} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white pt-6 pb-2 tracking-tight">
          {formatInline(line.replace("# ", ""))}
        </h1>
      );
      continue;
    }

    // Bullet Lists
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      currentList.push(line.slice(2));
      continue;
    }

    // Numbered Lists
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      if (listType !== "ol") flushList();
      listType = "ol";
      currentList.push(numMatch[2]);
      continue;
    }

    // Blockquote / Callout
    if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={i} className="my-4 p-4 rounded-2xl bg-brand-500/10 border-l-4 border-brand-500 text-slate-800 dark:text-slate-200 italic font-medium">
          {formatInline(line.replace("> ", ""))}
        </blockquote>
      );
      continue;
    }

    // Normal Paragraph
    flushList();
    elements.push(
      <p key={i} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        {formatInline(line)}
      </p>
    );
  }

  flushList();
  flushTable();

  return <>{elements}</>;
}

// Inline formatting for **bold**, `code`, and [links](url)
function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-mono text-xs font-semibold">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-extrabold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a key={index} href={linkMatch[2]} className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}
