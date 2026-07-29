"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

export function UnitConverter() {
  const [val, setVal] = useState(1);
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");

  const metersMap: Record<string, number> = {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    inch: 0.0254,
    mi: 1609.34,
  };

  const converted = (val * metersMap[fromUnit]) / metersMap[toUnit];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 items-center">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Value</label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full p-3 text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">From Unit</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full p-3 text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="ft">Feet (ft)</option>
            <option value="inch">Inches (in)</option>
            <option value="mi">Miles (mi)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">To Unit</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full p-3 text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
          >
            <option value="ft">Feet (ft)</option>
            <option value="m">Meters (m)</option>
            <option value="km">Kilometers (km)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="inch">Inches (in)</option>
            <option value="mi">Miles (mi)</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-teal-500/10 border border-teal-500/20 text-center">
        <div className="text-xs font-bold uppercase text-slate-400">Converted Output</div>
        <div className="text-3xl font-black text-teal-600 dark:text-teal-400 mt-1">
          {converted.toFixed(4)} {toUnit}
        </div>
      </div>
    </div>
  );
}
