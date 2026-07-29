"use client";

import { useState } from "react";
import { Download, Barcode } from "lucide-react";

export function BarcodeGenerator() {
  const [code, setCode] = useState("TOOLIFIA123456");

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Barcode String (Code 128)</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="e.g. PRODUCT12345"
          className="w-full p-4 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white font-mono"
        />
      </div>

      <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center font-mono">
          <div className="flex items-center justify-center space-x-1 mb-2">
            {code.split("").map((char, idx) => (
              <div
                key={idx}
                className="bg-slate-950 h-20"
                style={{
                  width: `${(char.charCodeAt(0) % 4) + 2}px`,
                  marginLeft: `${(idx % 2) * 2}px`,
                }}
              />
            ))}
          </div>
          <span className="text-xs tracking-widest font-bold text-slate-900">{code}</span>
        </div>
      </div>
    </div>
  );
}
