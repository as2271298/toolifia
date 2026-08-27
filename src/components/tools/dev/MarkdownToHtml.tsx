'use client';
import React, { useState } from 'react';

export function MarkdownToHtml() {
  const [input, setInput] = useState('# Hello World\n\n**Bold text** and *italic text*.\n\n- List item 1\n- List item 2\n\n> Blockquote\n\n[Link](https://example.com)\n\n```\nconst x = 1;\n```');

  const convertToHtml = (md: string) => {
    let html = md;
    
    html = html.replace(/```([\s\S]*?)```/gm, '<pre class="bg-slate-800 p-4 rounded-xl overflow-x-auto text-sm my-4"><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-400">$1</code>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2 text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-5 mb-3 text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-6 mb-4 text-white">$1</h1>');
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 my-4 text-slate-300 italic">$1</blockquote>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<b class="font-bold text-white">$1</b>');
    html = html.replace(/\*(.*?)\*/gim, '<i class="italic">$1</i>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank' class='text-indigo-400 hover:text-indigo-300 underline'>$1</a>");
    html = html.replace(/^\s*- (.*$)/gim, '<li class="ml-6 list-disc mb-1">$1</li>');
    html = html.replace(/<\/li>\n<li/g, '</li><li'); 
    html = html.split('\n\n').map(p => {
      if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<blockquote') || p.startsWith('<li')) return p;
      return `<p class="mb-4 text-slate-300">${p}</p>`;
    }).join('\n');

    return html;
  };

  const htmlOutput = convertToHtml(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-xl text-slate-200">
      <h2 className="text-2xl font-bold text-white mb-6">Markdown to HTML Converter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-2 text-slate-400">Markdown Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[500px] p-4 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-mono text-sm resize-none"
            placeholder="Type your markdown here..."
          />
        </div>
        
        <div className="flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400">HTML Preview</label>
            <div className="space-x-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Copy HTML
              </button>
            </div>
          </div>
          
          <div className="w-full flex-1 p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </div>
        </div>
      </div>
    </div>
  );
}

