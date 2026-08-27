"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CronJobParser() {
  const [cron, setCron] = useState("*/15 * * * *");
  const [copied, setCopied] = useState(false);

  const describeCron = (expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return "Invalid cron expression (must have 5 fields: min hour day month weekday)";

    const [min, hour, dom, mon, dow] = parts;

    const describePart = (val: string, name: string) => {
      if (val === "*") return `every ${name}`;
      if (val.startsWith("*/")) return `every ${val.slice(2)} ${name}s`;
      return `at ${name} ${val}`;
    };

    return `Runs ${describePart(min, "minute")}, ${describePart(hour, "hour")}, ${describePart(dom, "day-of-month")}, ${describePart(mon, "month")}, ${describePart(dow, "day-of-week")}.`;
  };

  const PRESETS = [
    { label: "Every Minute", expr: "* * * * *" },
    { label: "Every 5 Minutes", expr: "*/5 * * * *" },
    { label: "Every Hour", expr: "0 * * * *" },
    { label: "Every Day at Midnight", expr: "0 0 * * *" },
    { label: "Every Monday at 9 AM", expr: "0 9 * * 1" },
    { label: "1st of Every Month", expr: "0 0 1 * *" },
  ];

  const copy = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inp = "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.expr}
            onClick={() => setCron(p.expr)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              cron === p.expr
                ? "bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Cron Expression (5 parts)</label>
          <button onClick={copy} className="text-xs text-brand-600 hover:underline flex items-center gap-1 font-semibold">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} Copy Expression
          </button>
        </div>
        <input className={inp} value={cron} onChange={(e) => setCron(e.target.value)} placeholder="* * * * *" />
      </div>

      <div className="p-6 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-center">
        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Human-Readable Schedule</p>
        <p className="text-lg font-bold text-brand-600 dark:text-brand-400">{describeCron(cron)}</p>
      </div>

      <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono text-slate-500">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">minute (0-59)</div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">hour (0-23)</div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">day (1-31)</div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">month (1-12)</div>
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">weekday (0-6)</div>
      </div>
    </div>
  );
}
