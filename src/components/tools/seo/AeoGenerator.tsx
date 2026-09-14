"use client";

import { useState, useMemo, useCallback } from "react";
import { 
  Search, Copy, Check, Sparkles, ShieldCheck, 
  Code2, Eye, FileText, CheckCircle2, AlertCircle, Zap, Globe, Loader2, Bot, Wand2
} from "lucide-react";

export function AeoGenerator() {
  const [question, setQuestion] = useState("What is Answer Engine Optimization (AEO) and how does it differ from traditional SEO?");
  const [directAnswer, setDirectAnswer] = useState("Answer Engine Optimization (AEO) is the practice of structuring web content specifically for direct citation and synthesis by AI answer engines such as Perplexity, ChatGPT Search, and Google AI Overviews. Unlike traditional SEO which optimizes for blue-link click-through rates, AEO targets definitive 40-to-60-word concise answer capsules, empirical factual claims, and semantic schema entities.");
  const [takeaways, setTakeaways] = useState("• AEO focuses on AI citation frequency and knowledge-graph grounding rather than SERP position.\n• AI search engines extract direct answer capsules containing between 40 and 60 words.\n• Content with structured JSON-LD schema receives up to 3.4x higher AI citation probability.\n• Empirical data triples (subject-predicate-object) prevent hallucination during RAG synthesis.");
  const [entityName, setEntityName] = useState("Toolifia Research");
  const [entityType, setEntityType] = useState("TechArticle");
  const [topicDomain, setTopicDomain] = useState("Search Engine Optimization");

  const [activeTab, setActiveTab] = useState<"preview" | "markdown" | "html" | "schema">("preview");
  const [copied, setCopied] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleAiGenerate = useCallback(async () => {
    if (!aiTopic.trim()) return;
    setAiLoading(true);
    setAiError("");
    try {
      const res = await fetch("/api/tools/aeo-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: aiTopic }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "AI request failed");
      const text: string = json.result || json.data?.result || "";
      // Parse out sections from AI response
      const qMatch = text.match(/QUESTION:\s*([^\n]+)/i);
      const aMatch = text.match(/ANSWER:\s*([\s\S]+?)(?=(?:TAKEAWAYS|KEY POINTS|$))/i);
      const bMatch = text.match(/(?:TAKEAWAYS|KEY POINTS):\s*([\s\S]+?)(?=(?:ENTITY:|$))/i);
      if (qMatch?.[1]) setQuestion(qMatch[1].trim());
      if (aMatch?.[1]) setDirectAnswer(aMatch[1].trim());
      if (bMatch?.[1]) {
        const bullets = bMatch[1]
          .split(/\r?\n/)
          .map((l: string) => l.trim())
          .filter((l: string) => l.length > 10)
          .map((l: string) => (l.startsWith("•") || l.startsWith("-") ? l : "• " + l))
          .join("\n");
        setTakeaways(bullets);
      }
    } catch (e: unknown) {
      setAiError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setAiLoading(false);
    }
  }, [aiTopic]);

  // Word count of direct answer
  const answerWordCount = useMemo(() => {
    return directAnswer.trim().split(/\s+/).filter(Boolean).length;
  }, [directAnswer]);

  // AEO Audit Score
  const aeoAudit = useMemo(() => {
    const checks = [
      {
        id: "length",
        label: "Direct Answer Length (40–60 words optimal)",
        passed: answerWordCount >= 35 && answerWordCount <= 70,
        tip: `Current length: ${answerWordCount} words. ${answerWordCount < 35 ? "Too brief for AI synthesis." : answerWordCount > 70 ? "Trim to avoid AI truncation." : "Optimal 40–60 word range."}`,
      },
      {
        id: "empirical",
        label: "Empirical Data & Numerical Evidence",
        passed: /\d/.test(directAnswer) || /\d/.test(takeaways),
        tip: "LLMs prioritize citing answers containing numbers, metrics, or benchmarks.",
      },
      {
        id: "entity",
        label: "Entity & Subject Clarity",
        passed: !/^(It|This|They|These|He|She)\b/i.test(directAnswer.trim()),
        tip: "Never start direct answers with vague pronouns (It, This). Always lead with the named subject.",
      },
      {
        id: "bullets",
        label: "High-Information Takeaways Present",
        passed: takeaways.trim().split("\n").filter(Boolean).length >= 3,
        tip: "Provide at least 3 structured bullet points for multi-hop RAG retrieval.",
      },
      {
        id: "schema",
        label: "Structured Schema Compatibility",
        passed: Boolean(entityName && question),
        tip: "FAQPage and TechArticle JSON-LD schema ready for machine parsing.",
      },
    ];

    const passedCount = checks.filter(c => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    return { checks, score };
  }, [answerWordCount, directAnswer, takeaways, entityName, question]);

  // JSON-LD Schema
  const jsonLdSchema = useMemo(() => {
    const parsedBullets = takeaways.split("\n").map(s => s.replace(/^[•\-\*\d\.]+\s*/, "").trim()).filter(Boolean);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Question",
          "name": question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": directAnswer,
            "author": {
              "@type": "Organization",
              "name": entityName || "Toolifia"
            }
          }
        },
        {
          "@type": entityType,
          "headline": question,
          "about": {
            "@type": "Thing",
            "name": topicDomain
          },
          "author": {
            "@type": "Organization",
            "name": entityName || "Toolifia"
          },
          "abstract": directAnswer,
          "keywords": [topicDomain, "AEO", "AI Search Optimization"]
        }
      ]
    };

    return JSON.stringify(schema, null, 2);
  }, [question, directAnswer, takeaways, entityName, entityType, topicDomain]);

  // Markdown Output
  const markdownOutput = useMemo(() => {
    return `## ${question}

> **Quick Answer:** ${directAnswer}

### Key Takeaways & Empirical Facts
${takeaways}

---
*Source Entity: ${entityName} | Field: ${topicDomain}*`;
  }, [question, directAnswer, takeaways, entityName, topicDomain]);

  // Semantic HTML Output
  const htmlOutput = useMemo(() => {
    const parsedBullets = takeaways.split("\n").map(s => s.replace(/^[•\-\*\d\.]+\s*/, "").trim()).filter(Boolean);
    const bulletsHtml = parsedBullets.map(b => `    <li>${b}</li>`).join("\n");

    return `<section class="aeo-answer-capsule" itemscope itemtype="https://schema.org/Question">
  <h2 itemprop="name">${question}</h2>
  <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
    <p class="direct-answer" itemprop="text">
      <strong>Direct Answer:</strong> ${directAnswer}
    </p>
  </div>
  <h3>Key Insights</h3>
  <ul>
${bulletsHtml}
  </ul>
</section>

<!-- JSON-LD Structured Data for AI Crawlers -->
<script type="application/ld+json">
${jsonLdSchema}
</script>`;
  }, [question, directAnswer, takeaways, jsonLdSchema]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* AI Auto-Generate Panel */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-brand-500/5 to-slate-900/10 border border-purple-500/20 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">AI Auto-Generate</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Powered by Toolifia AI
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter any topic or question — AI will write your AEO-optimized answer, takeaways, and fill all fields automatically.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAiGenerate()}
            placeholder="e.g. What is Answer Engine Optimization and how does it work?"
            className="flex-1 p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-slate-900 dark:text-white"
          />
          <button
            onClick={handleAiGenerate}
            disabled={aiLoading || !aiTopic.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-brand-600 text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-purple-500/20"
          >
            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {aiLoading ? "Generating..." : "✨ Auto-Generate with AI"}
          </button>
        </div>
        {aiError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            {aiError}
          </div>
        )}
        {aiLoading && (
          <div className="flex items-center gap-2 text-xs text-purple-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            AI is crafting your AEO-optimized content...
          </div>
        )}
      </div>
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-900/10 border border-emerald-500/20 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Answer Engine Optimization (AEO)
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              AI Search Capsule & Schema Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Optimize content to be selected and cited by Perplexity, ChatGPT Search, Claude, and Google AI Overviews.
            </p>
          </div>

          {/* Live AEO Readiness Score */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">AEO Readiness</span>
              <span className={`text-lg font-black ${
                aeoAudit.score >= 80 ? "text-emerald-500" : aeoAudit.score >= 60 ? "text-amber-500" : "text-rose-500"
              }`}>
                {aeoAudit.score}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              {aeoAudit.score >= 80 ? (
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              ) : (
                <Zap className="w-5 h-5 text-amber-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Configuration Form */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-500" /> Target Query or User Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is the difference between AI Humanizer and AI Detector?"
              className="w-full p-3.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-500" /> Direct Answer Capsule (Target: 40–60 words)
              </label>
              <span className={`text-xs font-mono font-bold ${
                answerWordCount >= 40 && answerWordCount <= 60 ? "text-emerald-500" : "text-amber-500"
              }`}>
                {answerWordCount} words
              </span>
            </div>
            <textarea
              rows={3}
              value={directAnswer}
              onChange={(e) => setDirectAnswer(e.target.value)}
              placeholder="Provide a definitive, self-contained 2-3 sentence answer starting with the subject..."
              className="w-full p-3.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Key Empirical Takeaways (Bulleted Data Anchors for RAG)
            </label>
            <textarea
              rows={4}
              value={takeaways}
              onChange={(e) => setTakeaways(e.target.value)}
              placeholder="• Point 1 with exact numbers or metrics&#10;• Point 2 defining core mechanism&#10;• Point 3 stating key differentiator"
              className="w-full p-3.5 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Source Entity / Brand Name
              </label>
              <input
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="e.g. Toolifia Research"
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Topic / Subject Domain
              </label>
              <input
                type="text"
                value={topicDomain}
                onChange={(e) => setTopicDomain(e.target.value)}
                placeholder="e.g. Natural Language Processing"
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Schema Schema.org Type
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="TechArticle">TechArticle</option>
                <option value="Article">Article</option>
                <option value="FAQPage">FAQPage</option>
                <option value="DefinedTerm">DefinedTerm</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Checklist */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> AI Engine Citation Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {aeoAudit.checks.map((c) => (
            <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5">
              {c.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{c.label}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{c.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Output Tabs & Code Viewer */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {[
              { id: "preview", label: "AI SERP Preview", icon: Eye },
              { id: "markdown", label: "Markdown Capsule", icon: FileText },
              { id: "html", label: "HTML + Microdata", icon: Code2 },
              { id: "schema", label: "JSON-LD Schema", icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Copy Button */}
          <button
            onClick={() => {
              const contentToCopy =
                activeTab === "schema"
                  ? jsonLdSchema
                  : activeTab === "html"
                  ? htmlOutput
                  : markdownOutput;
              handleCopy(contentToCopy);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : `Copy ${activeTab === "schema" ? "JSON-LD" : activeTab === "html" ? "HTML" : "Markdown"}`}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "preview" && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Simulated Perplexity & ChatGPT Citation Card
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Extracted Snippet
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {question}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
                {directAnswer}
              </p>
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Insights:</span>
                <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-emerald-500">
                  {takeaways.split("\n").map((b, i) => (
                    <li key={i}>{b.replace(/^[•\-\*\d\.]+\s*/, "")}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800/60 flex items-center justify-between">
                <span>Source: {entityName}</span>
                <span>Category: {topicDomain}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "markdown" && (
          <pre className="p-4 rounded-2xl bg-slate-900/90 text-slate-200 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed border border-slate-800/80 overflow-x-auto max-h-[400px]">
            {markdownOutput}
          </pre>
        )}

        {activeTab === "html" && (
          <pre className="p-4 rounded-2xl bg-slate-900/90 text-emerald-300 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed border border-slate-800/80 overflow-x-auto max-h-[400px]">
            {htmlOutput}
          </pre>
        )}

        {activeTab === "schema" && (
          <pre className="p-4 rounded-2xl bg-slate-900/90 text-amber-300 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed border border-slate-800/80 overflow-x-auto max-h-[400px]">
            {jsonLdSchema}
          </pre>
        )}
      </div>
    </div>
  );
}
