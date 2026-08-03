"use client";

import React, { useState } from "react";
import { Video, Sparkles, ShieldCheck, Image as ImageIcon, Terminal } from "lucide-react";
import { AiHumanizer } from "../tools/ai/AiHumanizer";
import { AiDetector } from "../tools/ai/AiDetector";
import { AiImageGenerator } from "../tools/ai/AiImageGenerator";
import { AiVideoGenerator } from "../tools/ai/AiVideoGenerator";

export function HeroPlayground() {
  const [activeTab, setActiveTab] = useState<"video" | "humanizer" | "detector" | "image">("video");

  const tabs = [
    { id: "video", name: "AI Video Generator", icon: Video, badge: "Kling 2.1" },
    { id: "humanizer", name: "AI Text Humanizer", icon: Sparkles, badge: "99% Human" },
    { id: "detector", name: "AI Content Detector", icon: ShieldCheck, badge: "GPTZero" },
    { id: "image", name: "AI Image Generator", icon: ImageIcon, badge: "8K Art" },
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-[#070a12] border border-white/[0.1] shadow-2xl overflow-hidden text-left font-sans transition-all duration-300">
      {/* Top Header / Tab Switcher Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0b0f19] border-b border-white/[0.08] overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[11px] font-mono text-slate-400">toolifia / live-playground</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 shrink-0 ${
                  isActive
                    ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
                {isActive && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Live Tool Playground Area */}
      <div className="p-4 sm:p-6 bg-[#070a12]">
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Interactive Execution Mode — No Registration
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Instant Client-Side Run</span>
        </div>

        {activeTab === "video" && <AiVideoGenerator />}
        {activeTab === "humanizer" && <AiHumanizer />}
        {activeTab === "detector" && <AiDetector />}
        {activeTab === "image" && <AiImageGenerator />}
      </div>
    </div>
  );
}
