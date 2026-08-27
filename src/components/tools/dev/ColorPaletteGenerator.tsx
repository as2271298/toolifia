'use client';
import React, { useState } from 'react';

// Basic HSL to Hex utility
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Hex to HSL utility
function hexToHsl(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [h, s, l] = hexToHsl(baseColor);

  const generateAnalogous = () => [
    hslToHex((h - 60 + 360) % 360, s, l),
    hslToHex((h - 30 + 360) % 360, s, l),
    baseColor,
    hslToHex((h + 30) % 360, s, l),
    hslToHex((h + 60) % 360, s, l)
  ];

  const generateComplementary = () => [
    baseColor,
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 180) % 360, s, Math.max(20, l - 20))
  ];

  const generateMonochromatic = () => [
    hslToHex(h, s, Math.max(0, l - 40)),
    hslToHex(h, s, Math.max(0, l - 20)),
    baseColor,
    hslToHex(h, s, Math.min(100, l + 20)),
    hslToHex(h, s, Math.min(100, l + 40))
  ];

  const generateTriadic = () => [
    baseColor,
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l)
  ];

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(hex);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const copyCssVars = () => {
    const vars = generateAnalogous().map((c, i) => `--color-analogous-${i}: ${c};`).join('\n');
    navigator.clipboard.writeText(`:root {\n${vars}\n}`);
    setCopiedId('css');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderPalette = (title: string, colors: string[]) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">{title}</h3>
      <div className="flex gap-2">
        {colors.map((c, idx) => (
          <div key={idx} className="flex-1 group relative">
            <div 
              className="h-24 rounded-lg cursor-pointer transition transform hover:scale-105 hover:shadow-lg border border-slate-700/50" 
              style={{ backgroundColor: c }}
              onClick={() => copyColor(c)}
            />
            <div className="text-center mt-2 text-xs font-mono text-slate-400">{c}</div>
            {copiedId === c && <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] py-1 px-2 rounded">Copied!</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-slate-900 rounded-2xl text-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-600">Color Palette Generator</h2>
        <button onClick={copyCssVars} className="text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition">
          {copiedId === 'css' ? 'Copied CSS!' : 'Export CSS Vars'}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
        <label className="font-semibold text-slate-300">Seed Color:</label>
        <div className="flex items-center gap-2">
          <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-none bg-transparent" />
          <input type="text" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 w-28 outline-none focus:border-brand-600 font-mono text-sm uppercase" />
        </div>
      </div>

      {renderPalette('Analogous (5)', generateAnalogous())}
      {renderPalette('Monochromatic (5)', generateMonochromatic())}
      {renderPalette('Complementary (3)', generateComplementary())}
      {renderPalette('Triadic (3)', generateTriadic())}
    </div>
  );
}

