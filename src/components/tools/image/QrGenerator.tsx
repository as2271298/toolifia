"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, QrCode, Sparkles } from "lucide-react";

export function QrGenerator() {
  const [text, setText] = useState("https://toolifia.com");
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && text.trim()) {
      QRCode.toCanvas(canvasRef.current, text, {
        width: 280,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      }).catch((err) => console.error(err));
    }
  }, [text, fgColor, bgColor]);

  const downloadQr = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">QR Code Content (URL or Text)</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. https://mywebsite.com"
              className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Foreground Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <canvas ref={canvasRef} className="rounded-2xl shadow-md border border-slate-200 dark:border-slate-800" />
          <button
            onClick={downloadQr}
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Download PNG QR Code
          </button>
        </div>
      </div>
    </div>
  );
}
