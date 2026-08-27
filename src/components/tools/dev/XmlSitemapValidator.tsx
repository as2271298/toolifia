'use client';
import React, { useState } from 'react';

export function XmlSitemapValidator() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState<{ total: number, valid: number, invalid: number } | null>(null);
  const [urls, setUrls] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleValidate = () => {
    setError('');
    setSummary(null);
    setUrls([]);
    if (!input.trim()) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'application/xml');
      const parserError = doc.getElementsByTagName('parsererror');
      
      if (parserError.length > 0) {
        setError('Invalid XML: ' + parserError[0].textContent);
        return;
      }

      const urlset = doc.getElementsByTagName('urlset');
      if (urlset.length === 0) {
        setError('Missing <urlset> tag.');
        return;
      }

      const urlElements = doc.getElementsByTagName('url');
      const urlData = [];
      let validCount = 0;
      let invalidCount = 0;

      for (let i = 0; i < urlElements.length; i++) {
        const el = urlElements[i];
        const loc = el.getElementsByTagName('loc')[0]?.textContent || '';
        const lastmod = el.getElementsByTagName('lastmod')[0]?.textContent || '-';
        const changefreq = el.getElementsByTagName('changefreq')[0]?.textContent || '-';
        const priority = el.getElementsByTagName('priority')[0]?.textContent || '-';
        
        const isValidLoc = loc.startsWith('http://') || loc.startsWith('https://');
        if (isValidLoc) validCount++; else invalidCount++;
        
        urlData.push({ loc, lastmod, changefreq, priority, isValid: isValidLoc });
      }

      setSummary({ total: urlData.length, valid: validCount, invalid: invalidCount });
      setUrls(urlData);
    } catch (e) {
      setError('Failed to parse XML Sitemap.');
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <h2 className="text-2xl font-bold mb-4 text-brand-600">XML Sitemap Validator</h2>
      <div className="mb-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-48 p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-600 font-mono text-sm resize-none outline-none mb-3" placeholder="Paste your XML Sitemap here..." />
        <button onClick={handleValidate} className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition">Validate Sitemap</button>
      </div>
      
      {error && <div className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-lg">{error}</div>}
      
      {summary && (
        <div className="mt-6">
          <div className="flex gap-4 mb-4">
            <div className="bg-slate-800 p-4 rounded-xl flex-1 text-center">
              <div className="text-3xl font-bold">{summary.total}</div>
              <div className="text-sm text-slate-400">Total URLs</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl flex-1 text-center text-green-400">
              <div className="text-3xl font-bold">{summary.valid}</div>
              <div className="text-sm">Valid Locations</div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl flex-1 text-center text-red-400">
              <div className="text-3xl font-bold">{summary.invalid}</div>
              <div className="text-sm">Invalid Locations</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-slate-300">
                  <th className="p-3 rounded-tl-lg">Status</th>
                  <th className="p-3">Location (&lt;loc&gt;)</th>
                  <th className="p-3">Last Mod</th>
                  <th className="p-3">Freq</th>
                  <th className="p-3 rounded-tr-lg">Priority</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((u, i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${u.isValid ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {u.isValid ? 'Valid' : 'Invalid'}
                      </span>
                    </td>
                    <td className="p-3 font-mono truncate max-w-xs" title={u.loc}>{u.loc || 'Missing'}</td>
                    <td className="p-3">{u.lastmod}</td>
                    <td className="p-3">{u.changefreq}</td>
                    <td className="p-3">{u.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

