'use client';

import React, { useState } from 'react';

export function JsonToYaml() {
  const [json, setJson] = useState('');
  const [yaml, setYaml] = useState('');

  const jsonToYamlString = (obj: any, indent: number = 0): string => {
    let result = '';
    const spaces = ' '.repeat(indent);
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      result += '\n';
      obj.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          const itemYaml = jsonToYamlString(item, indent + 2);
          result += `${spaces}- ${itemYaml.trimStart()}`;
        } else {
          result += `${spaces}- ${item}\n`;
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      if (Object.keys(obj).length === 0) return '{}';
      if (indent > 0) result += '\n';
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
          result += `${spaces}${key}: ${jsonToYamlString(value, indent + 2)}`;
        } else {
          result += `${spaces}${key}: ${value}\n`;
        }
      }
    } else {
      result += `${obj}\n`;
    }
    
    return result;
  };

  const convert = (input: string) => {
    setJson(input);
    try {
      if (!input.trim()) {
        setYaml('');
        return;
      }
      const data = JSON.parse(input);
      setYaml(jsonToYamlString(data).trim());
    } catch (e) {
      setYaml('Error parsing JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yaml);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">JSON to YAML Converter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">JSON Input</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={json}
            onChange={(e) => convert(e.target.value)}
            placeholder={'{\n  "name": "Toolifia",\n  "features": [\n    "fast",\n    "secure"\n  ]\n}'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">YAML Output</label>
          <textarea
            className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono focus:ring-2 focus:ring-brand-600 focus:outline-none"
            value={yaml}
            readOnly
            placeholder="name: Toolifia&#10;features:&#10;  - fast&#10;  - secure"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={copyToClipboard}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          Copy YAML
        </button>
      </div>
    </div>
  );
}

