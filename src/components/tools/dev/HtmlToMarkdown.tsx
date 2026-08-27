'use client';

import React, { useState } from 'react';

export function HtmlToMarkdown() {
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');

  const convert = (input: string) => {
    setHtml(input);
    let md = input;
    
    // Replace logic
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n');
    
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
    md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n');
    
    md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n');
    
    md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, function(match, p1) {
      return p1.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
    });
    md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, function(match, p1) {
      let count = 1;
      return p1.replace(/<li[^>]*>(.*?)<\/li>/gi, function(_m: any, p1li: string) {
        return `${count++}. ${p1li}\n`;
      }) + '\n';
    });
    
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    md = md.replace(/<br\s*\/?>/gi, '\n');
    
    // Clean up extra spaces/newlines
    md = md.replace(/\n{3,}/g, '\n\n');
    
    setMarkdown(md.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">HTML to Markdown Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">HTML Input</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={html}
            onChange={(e) => convert(e.target.value)}
            placeholder="<h1>Hello</h1><p>World!</p>"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">Markdown Output</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={markdown}
            readOnly
            placeholder="# Hello&#10;&#10;World!"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Copy Markdown
        </button>
      </div>
    </div>
  );
}

