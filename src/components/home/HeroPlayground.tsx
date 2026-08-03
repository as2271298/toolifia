"use client";

import React, { useState } from "react";
import { Video, Sparkles, ShieldCheck, Image as ImageIcon, Wand2, RefreshCw, Check, Copy, AlertCircle, ArrowRight } from "lucide-react";
import { AiHumanizer } from "../tools/ai/AiHumanizer";
import { AiDetector } from "../tools/ai/AiDetector";
import { AiImageGenerator } from "../tools/ai/AiImageGenerator";
import { AiVideoGenerator } from "../tools/ai/AiVideoGenerator";

export function HeroPlayground() {
  const [activeTab, setActiveTab] = useState<"video" | "humanizer" | "detector" | "image">("video");

  const tabs = [
    { id: "video", name: "AI Video Generator", icon: Video, badge: "New Kling 2.1", color: "from-rose-500 to-purple-600" },
    { id: "humanizer", name: "AI Text Humanizer", icon: Sparkles, badge: "99% Human", color: "from-purple-500 to-indigo-600" },
    { id: "detector", name: "AI Content Detector", icon: ShieldCheck, badge: "GPTZero Test", color: "from-blue-500 to-cyan-600" },
    { id: "image", name: "AI Image Generator", icon: ImageIcon, badge: "8K Photorealistic", color: "from-emerald-500 to-teal-600" },
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-950/90 border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-2xl text-left font-sans transition-all duration-300">
      {/* Top Header / Tab Switcher Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-slate-500 ml-2 hidden sm:inline">toolifia.com/live-playground</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 shrink-0 ${
                  isActive
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-purple-500/20 scale-105`
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(" ")[1] || tab.name}</span>
                {isActive && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-200">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Live Tool Playground Area */}
      <div className="p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="mb-4 flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Live Demo — Try Without Signup
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">100% Free · Runs On-Site</span>
        </div>

        {activeTab === "video" && <AiVideoGenerator />}
        {activeTab === "humanizer" && <AiHumanizer />}
        {activeTab === "detector" && <AiDetector />}
        {activeTab === "image" && <AiImageGenerator />}
      </div>
    </div>
  );
}
