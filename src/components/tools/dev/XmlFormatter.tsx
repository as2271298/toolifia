'use client';
import React, { useState } from 'react';

export function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [minify, setMinify] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatXml = (xml: string, isMinify: boolean) => {
    let formatted = '';
    let pad = 0;
    xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    if (isMinify) {
      return xml.replace(/\r\n/g, '').replace(/\n/g, '').replace(/\t/g, '').replace(/\s{2,}/g, ' ');
    }
    xml.split('\r\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      formatted += '  '.repeat(pad) + node + '\r\n';
      pad += indent;
    });
    return formatted.trim();
  };

  const handleFormat = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'application/xml');
      const parserError = doc.getElementsByTagName('parsererror');
      if (parserError.length > 0) {
        setError('Invalid XML: ' + parserError[0].textContent);
        setOutput('');
        return;
      }
      setOutput(formatXml(input, minify));
    } catch (e) {
      setError('Invalid XML structure.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">XML Formatter & Beautifier</h2>
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={minify} onChange={(e) => setMinify(e.target.checked)} className="rounded border-slate-700 bg-slate-800 text-brand-600 focus:ring-brand-600" />
          Minify
        </label>
        <button onClick={handleFormat} className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">Format XML</button>
      </div>
      {error && <div className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-lg">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Raw XML</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-96 p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-600 font-mono text-sm resize-none outline-none" placeholder="Paste your XML here..." />
        </div>
        <div className="relative">
          <label className="block text-sm mb-2">Formatted XML</label>
          <textarea value={output} readOnly className="w-full h-96 p-3 bg-slate-800 border border-slate-700 rounded-lg font-mono text-sm resize-none outline-none" placeholder="Result will appear here..." />
          {output && (
            <button onClick={copyToClipboard} className="absolute top-9 right-2 p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition text-xs font-semibold" title="Copy">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

