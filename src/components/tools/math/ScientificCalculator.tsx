"use client";

import { useState } from "react";

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0");

  const append = (val: string) => {
    setDisplay((prev) => (prev === "0" ? val : prev + val));
  };

  const clear = () => setDisplay("0");

  const evaluate = () => {
    try {
      const sanitized = display.replace(/×/g, "*").replace(/÷/g, "/");
      const res = Function(`"use strict"; return (${sanitized})`)();
      setDisplay(String(res));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-right font-mono text-2xl text-emerald-400 font-bold overflow-x-auto">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2 text-sm font-bold">
        <button onClick={clear} className="p-3.5 rounded-xl bg-rose-500/20 text-rose-400">C</button>
        <button onClick={() => append("(")} className="p-3.5 rounded-xl bg-slate-800 text-slate-300">(</button>
        <button onClick={() => append(")")} className="p-3.5 rounded-xl bg-slate-800 text-slate-300">)</button>
        <button onClick={() => append("÷")} className="p-3.5 rounded-xl bg-brand-600 text-white">÷</button>

        <button onClick={() => append("7")} className="p-3.5 rounded-xl bg-slate-900 text-white">7</button>
        <button onClick={() => append("8")} className="p-3.5 rounded-xl bg-slate-900 text-white">8</button>
        <button onClick={() => append("9")} className="p-3.5 rounded-xl bg-slate-900 text-white">9</button>
        <button onClick={() => append("×")} className="p-3.5 rounded-xl bg-brand-600 text-white">×</button>

        <button onClick={() => append("4")} className="p-3.5 rounded-xl bg-slate-900 text-white">4</button>
        <button onClick={() => append("5")} className="p-3.5 rounded-xl bg-slate-900 text-white">5</button>
        <button onClick={() => append("6")} className="p-3.5 rounded-xl bg-slate-900 text-white">6</button>
        <button onClick={() => append("-")} className="p-3.5 rounded-xl bg-brand-600 text-white">-</button>

        <button onClick={() => append("1")} className="p-3.5 rounded-xl bg-slate-900 text-white">1</button>
        <button onClick={() => append("2")} className="p-3.5 rounded-xl bg-slate-900 text-white">2</button>
        <button onClick={() => append("3")} className="p-3.5 rounded-xl bg-slate-900 text-white">3</button>
        <button onClick={() => append("+")} className="p-3.5 rounded-xl bg-brand-600 text-white">+</button>

        <button onClick={() => append("0")} className="col-span-2 p-3.5 rounded-xl bg-slate-900 text-white">0</button>
        <button onClick={() => append(".")} className="p-3.5 rounded-xl bg-slate-900 text-white">.</button>
        <button onClick={evaluate} className="p-3.5 rounded-xl bg-emerald-600 text-white">=</button>
      </div>
    </div>
  );
}
