'use client';

import React, { useState } from 'react';

export function JsonToCsv() {
  const [json, setJson] = useState('');
  const [csv, setCsv] = useState('');

  const convert = (input: string) => {
    setJson(input);
    try {
      if (!input.trim()) {
        setCsv('');
        return;
      }
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        setCsv('Error: JSON must be an array of objects');
        return;
      }
      if (data.length === 0) {
        setCsv('');
        return;
      }
      
      const headers = Object.keys(data[0]);
      const csvRows = [];
      csvRows.push(headers.join(','));
      
      for (const row of data) {
        const values = headers.map(header => {
          const val = row[header];
          const escaped = ('' + val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }
      setCsv(csvRows.join('\n'));
    } catch (e) {
      setCsv('Error parsing JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csv);
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">JSON to CSV Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">JSON Input (Array of Objects)</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={json}
            onChange={(e) => convert(e.target.value)}
            placeholder={'[\n  {\n    "id": 1,\n    "name": "John"\n  }\n]'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">CSV Output</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={csv}
            readOnly
            placeholder="id,name&#10;1,John"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Copy CSV
        </button>
        <button
          onClick={downloadCsv}
          className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}

