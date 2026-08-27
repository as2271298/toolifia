'use client';

import React, { useState } from 'react';

export function CsvToJson() {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');
  const [rowCount, setRowCount] = useState(0);

  const convert = (input: string) => {
    setCsv(input);
    try {
      const lines = input.trim().split('\n');
      if (lines.length === 0 || lines[0] === '') {
        setJson('');
        setRowCount(0);
        return;
      }
      const headers = lines[0].split(',').map(h => h.trim());
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = lines[i].split(',');
        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
        }
        result.push(obj);
      }
      setJson(JSON.stringify(result, null, 2));
      setRowCount(result.length);
    } catch (e) {
      setJson('Error parsing CSV');
      setRowCount(0);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
  };

  const downloadJson = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CSV to JSON Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">CSV Input (with header)</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={csv}
            onChange={(e) => convert(e.target.value)}
            placeholder="id,name,age&#10;1,John,30&#10;2,Jane,25"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">JSON Output ({rowCount} rows)</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={json}
            readOnly
            placeholder="[]"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Copy JSON
        </button>
        <button
          onClick={downloadJson}
          className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}

