'use client';

import React, { useState } from 'react';

export function YamlToJson() {
  const [yaml, setYaml] = useState('');
  const [json, setJson] = useState('');

  // A very basic YAML parser for simple structures
  const parseYaml = (yamlStr: string) => {
    const lines = yamlStr.split('\n');
    const result: any = {};
    let currentKey = '';
    let isArray = false;
    let arrayKey = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const content = line.trim();

      if (content.startsWith('- ')) {
        if (!isArray) {
          isArray = true;
          result[arrayKey] = [];
        }
        const val = content.substring(2).trim();
        result[arrayKey].push(isNaN(Number(val)) ? val : Number(val));
      } else if (content.includes(':')) {
        isArray = false;
        const [key, ...rest] = content.split(':');
        const value = rest.join(':').trim();
        
        if (value === '') {
          arrayKey = key;
        } else {
          result[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    }
    return result;
  };

  const convert = (input: string) => {
    setYaml(input);
    try {
      if (!input.trim()) {
        setJson('');
        return;
      }
      const data = parseYaml(input);
      setJson(JSON.stringify(data, null, 2));
    } catch (e) {
      setJson('Error parsing YAML');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(json);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">YAML to JSON Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">YAML Input</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={yaml}
            onChange={(e) => convert(e.target.value)}
            placeholder="name: Toolifia&#10;features:&#10;  - fast&#10;  - secure"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">JSON Output</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={json}
            readOnly
            placeholder={'{\n  "name": "Toolifia"\n}'}
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Copy JSON
        </button>
      </div>
    </div>
  );
}

