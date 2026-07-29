"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Trash2 } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

export function AiChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hi! I'm your AI assistant. Ask me anything — writing help, coding questions, explanations, brainstorming, or general knowledge." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/tools/ai-chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.result || data.error || "Sorry, I couldn't respond." }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Network error. Please try again." }]); }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[550px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-brand-500" /><span className="font-semibold text-slate-800 dark:text-white text-sm">AI Assistant</span><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /></div>
        <button onClick={() => setMessages([{ role: "assistant", content: "Chat cleared! How can I help you?" }])} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-3 h-3" />Clear</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <div className="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0 mt-1"><Bot className="w-4 h-4 text-brand-500" /></div>}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-brand-600 text-white rounded-tr-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm"}`}>
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
            {msg.role === "user" && <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1"><User className="w-4 h-4 text-slate-500" /></div>}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-brand-500" /></div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-100 dark:bg-slate-800"><Loader2 className="w-4 h-4 animate-spin text-brand-500" /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())} placeholder="Ask anything..." className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
        <button onClick={send} disabled={loading || !input.trim()} className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
