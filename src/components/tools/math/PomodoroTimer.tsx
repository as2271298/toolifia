"use client";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";

export function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const switchMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "work") setTimeLeft(25 * 60);
    if (newMode === "shortBreak") setTimeLeft(5 * 60);
    if (newMode === "longBreak") setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-4">
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
        <button onClick={() => switchMode("work")} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${mode === "work" ? "bg-brand-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"}`}>
          Pomodoro (25m)
        </button>
        <button onClick={() => switchMode("shortBreak")} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${mode === "shortBreak" ? "bg-emerald-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"}`}>
          Short Break (5m)
        </button>
        <button onClick={() => switchMode("longBreak")} className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${mode === "longBreak" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400"}`}>
          Long Break (15m)
        </button>
      </div>

      <div className="text-6xl sm:text-8xl font-extrabold font-mono tracking-tighter text-slate-900 dark:text-white">
        {formatTime(timeLeft)}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-lg shadow-lg shadow-brand-500/20 transition-all">
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => switchMode(mode)} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors">
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
