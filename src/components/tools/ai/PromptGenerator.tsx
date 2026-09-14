"use client";

import { useState, useMemo } from "react";
import { 
  Sparkles, Copy, Check, Wand2, ShieldCheck, 
  Video, Image as ImageIcon, Sliders, CheckCircle2, Zap, Loader2, Bot
} from "lucide-react";

type FrameworkType = "crispe" | "cot" | "rtf" | "image" | "video";
type ModelTarget = "chatgpt" | "claude" | "gemini" | "deepseek" | "midjourney" | "kling";

interface Preset {
  id: string;
  name: string;
  framework: FrameworkType;
  model: ModelTarget;
  role: string;
  task: string;
  context: string;
  format: string;
  constraints: string;
  examples?: string;
  imageDetails?: {
    subject: string;
    lighting: string;
    camera: string;
    style: string;
    aspectRatio: string;
    negative: string;
  };
  videoDetails?: {
    action: string;
    cameraMotion: string;
    lighting: string;
    pacing: string;
    duration: string;
  };
}

const PRESETS: Preset[] = [
  {
    id: "fullstack-architect",
    name: "🚀 Full-Stack Code Architect",
    framework: "cot",
    model: "claude",
    role: "Principal Software Architect specializing in TypeScript, Next.js App Router, and scalable system design",
    task: "Design and implement a robust, production-ready rate-limiting middleware for API routes with distributed Redis caching",
    context: "High-traffic multi-tenant SaaS application receiving 10,000 requests per second. Need resilience against DDoS attacks and abuse.",
    format: "Provide architectural overview diagram (Mermaid), TypeScript implementation with zero dependencies beyond ioredis, unit tests, and edge-case failure modes.",
    constraints: "Never use deprecated APIs. Strictly type all interfaces. Do not omit error handling or type assertions. Include graceful fallbacks.",
  },
  {
    id: "seo-aeo-strategist",
    name: "🔍 Answer Engine & AEO Strategist",
    framework: "crispe",
    model: "chatgpt",
    role: "World-class SEO and Answer Engine Optimization (AEO) consultant",
    task: "Develop a content blueprint optimized for citation in Perplexity, ChatGPT Search, and Google AI Overviews",
    context: "B2B SaaS tech company publishing comprehensive technical guides. Our objective is to capture featured AI answer capsules.",
    format: "40-word direct answer capsule, 5 empirical data triples, JSON-LD FAQ schema, and semantic H2/H3 outline.",
    constraints: "Avoid generic fluff or subjective claims. Focus exclusively on measurable data, named entities, and definitive answers.",
  },
  {
    id: "midjourney-photoreal",
    name: "🎨 Photorealistic Midjourney v6",
    framework: "image",
    model: "midjourney",
    role: "",
    task: "",
    context: "",
    format: "",
    constraints: "",
    imageDetails: {
      subject: "A weathered 65-year-old watchmaker with magnifying loupe glasses meticulously assembling an intricate antique tourbillon clock mechanism",
      lighting: "Dramatic golden hour rim lighting filtering through dusty attic window, soft volumetric sunbeams",
      camera: "Shot on Hasselblad H6D-100c, 85mm f/1.4 lens, shallow depth of field, micro-detail on brass gears and wrinkles",
      style: "Hyper-realistic editorial portrait, cinematic 35mm film grain, high dynamic range",
      aspectRatio: "16:9",
      negative: "cartoon, 3d render, blurry, distorted hands, extra fingers, over-saturated, plastic skin",
    },
  },
  {
    id: "cinematic-kling-video",
    name: "🎬 Cinematic Kling / Runway Video",
    framework: "video",
    model: "kling",
    role: "",
    task: "",
    context: "",
    format: "",
    constraints: "",
    videoDetails: {
      action: "A sleek futuristic solar rover glides across crimson martian sand dunes, kicking up fine red dust particles into the thin atmosphere",
      cameraMotion: "Dynamic smooth low-angle tracking shot moving parallel to rover, subtle upward tilt revealing colossal Olympus Mons volcano in background",
      lighting: "Harsh direct solar flare, long dramatic shadows, atmospheric haze with amber tint",
      pacing: "Smooth cinematic 60fps slow motion, fluid kinetic movement",
      duration: "5 seconds, seamless continuous motion",
    },
  },
];

export function PromptGenerator() {
  const [framework, setFramework] = useState<FrameworkType>("crispe");
  const [model, setModel] = useState<ModelTarget>("chatgpt");
  const [role, setRole] = useState("Senior Technical Product Manager and AI Systems Engineer");
  const [task, setTask] = useState("Analyze our user onboarding funnel drop-off and generate an actionable 30-day conversion optimization roadmap");
  const [context, setContext] = useState("B2B SaaS tool with 45,000 monthly active users. Funnel drop-off is highest at Step 3 (workspace setup). Target audience is non-technical marketing leads.");
  const [format, setFormat] = useState("Executive summary table with Impact vs Effort matrix, numbered step-by-step experiment backlog, and primary KPI metrics.");
  const [constraints, setConstraints] = useState("Keep recommendations under $5,000 implementation budget. Must not require full database re-architecture. Ground all claims in proven CRO benchmarks.");
  const [examples, setExamples] = useState("");

  // Image prompt state
  const [imgSubject, setImgSubject] = useState("An ethereal bioluminescent forest with glowing neon crystal flora and floating pollen embers");
  const [imgLighting, setImgLighting] = useState("Bioluminescent cyan and magenta glow, soft rim lighting, ambient deep indigo night shadows");
  const [imgCamera, setImgCamera] = useState("Shot on Sony A7R V, 35mm f/1.8 lens, sharp focus, atmospheric depth");
  const [imgStyle, setImgStyle] = useState("Ultra-detailed photorealistic concept art, Octane render aesthetic, 8K resolution");
  const [imgAspect, setImgAspect] = useState("16:9");
  const [imgNegative, setImgNegative] = useState("oversaturated, low resolution, deformed, blurry, cartoonish");

  // Video prompt state
  const [vidAction, setVidAction] = useState("A lone astronaut in a reflective gold-visored spacesuit discovers a glowing crystalline monolith in an icy cavern");
  const [vidCamera, setVidCamera] = useState("Slow continuous push-in dolly shot toward astronaut's visor reflecting glowing blue light");
  const [vidLighting, setVidLighting] = useState("Cold blue cavern ambient light with warm pulsating emerald glow from monolith");
  const [vidPacing, setVidPacing] = useState("Cinematic slow motion, steady gimbal stabilization");
  const [vidDuration, setVidDuration] = useState("5s");

  const [copied, setCopied] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState("");

  // Apply Preset
  const applyPreset = (preset: Preset) => {
    setFramework(preset.framework);
    setModel(preset.model);
    if (preset.framework === "image" && preset.imageDetails) {
      setImgSubject(preset.imageDetails.subject);
      setImgLighting(preset.imageDetails.lighting);
      setImgCamera(preset.imageDetails.camera);
      setImgStyle(preset.imageDetails.style);
      setImgAspect(preset.imageDetails.aspectRatio);
      setImgNegative(preset.imageDetails.negative);
    } else if (preset.framework === "video" && preset.videoDetails) {
      setVidAction(preset.videoDetails.action);
      setVidCamera(preset.videoDetails.cameraMotion);
      setVidLighting(preset.videoDetails.lighting);
      setVidPacing(preset.videoDetails.pacing);
      setVidDuration(preset.videoDetails.duration);
    } else {
      setRole(preset.role);
      setTask(preset.task);
      setContext(preset.context);
      setFormat(preset.format);
      setConstraints(preset.constraints);
      if (preset.examples) setExamples(preset.examples);
    }
  };

  // Live Prompt Generation
  const generatedPrompt = useMemo(() => {
    if (framework === "image") {
      let prompt = `${imgSubject}, ${imgLighting}, ${imgCamera}, ${imgStyle}`;
      if (model === "midjourney") {
        prompt += ` --ar ${imgAspect} --v 6.0 --style raw`;
        if (imgNegative.trim()) prompt += ` --no ${imgNegative.trim()}`;
      } else {
        if (imgNegative.trim()) prompt += `\n\n[Negative Prompt]: ${imgNegative.trim()}`;
        prompt += `\n[Aspect Ratio]: ${imgAspect}`;
      }
      return prompt;
    }

    if (framework === "video") {
      return `[Subject & Action]: ${vidAction}
[Camera Motion & Direction]: ${vidCamera}
[Lighting & Atmosphere]: ${vidLighting}
[Pacing & Motion Quality]: ${vidPacing}
[Duration]: ${vidDuration}
[Style]: Hyper-realistic 4K video, natural physics, continuous fluid motion, zero morphing artifacts`;
    }

    // Text Prompts
    if (model === "claude") {
      return `<system>
You are an expert ${role}. You provide precise, rigorous, and deeply actionable output without conversational filler.
</system>

<context>
${context}
</context>

<instructions>
Your primary task is:
${task}

Think step-by-step before answering. Verify each assumption against the context provided.
</instructions>

<constraints>
${constraints}
</constraints>

<output_format>
${format}
</output_format>${examples ? `\n\n<examples>\n${examples}\n</examples>` : ""}`;
    }

    if (framework === "cot") {
      return `### ROLE & PERSONA
Act as an elite ${role}.

### BACKGROUND CONTEXT
${context}

### PRIMARY OBJECTIVE
${task}

### STEP-BY-STEP REASONING PROTOCOL
Before providing your final solution, adhere strictly to this reasoning workflow:
1. Deconstruct the core problem into its foundational components.
2. Identify potential failure modes, trade-offs, and critical bottlenecks.
3. Formulate the optimal strategy supported by empirical evidence.
4. Synthesize the final deliverables according to the required specification.

### CONSTRAINTS & BOUNDARIES
${constraints}

### REQUIRED OUTPUT FORMAT
${format}${examples ? `\n\n### FEW-SHOT EXAMPLES\n${examples}` : ""}`;
    }

    // CRISPE / RTF Standard
    return `### CAPACITY & ROLE
You are a top-tier ${role}.

### REQUEST & CORE TASK
${task}

### INSIGHT & CONTEXT
${context}

### STATEMENT OF CONSTRAINTS
- ${constraints.split(".").filter(Boolean).map(s => s.trim()).filter(Boolean).join("\n- ")}

### PERSONALITY & TONE
Authoritative, analytically rigorous, concise, and structured. Zero boilerplate or pleasantries.

### EXPERIMENT & OUTPUT FORMAT
${format}${examples ? `\n\n### EXAMPLES\n${examples}` : ""}`;
  }, [framework, model, role, task, context, format, constraints, examples, imgSubject, imgLighting, imgCamera, imgStyle, imgAspect, imgNegative, vidAction, vidCamera, vidLighting, vidPacing, vidDuration]);

  // Prompt Quality Score Calculation
  const promptScore = useMemo(() => {
    if (framework === "image") {
      let score = 30;
      if (imgSubject.length > 20) score += 20;
      if (imgLighting.length > 10) score += 15;
      if (imgCamera.length > 10) score += 15;
      if (imgStyle.length > 10) score += 10;
      if (imgNegative.length > 5) score += 10;
      return Math.min(score, 100);
    }
    if (framework === "video") {
      let score = 30;
      if (vidAction.length > 20) score += 25;
      if (vidCamera.length > 15) score += 20;
      if (vidLighting.length > 10) score += 15;
      if (vidPacing.length > 5) score += 10;
      return Math.min(score, 100);
    }

    let score = 20;
    if (role.trim().length > 15) score += 15;
    if (task.trim().length > 25) score += 20;
    if (context.trim().length > 30) score += 15;
    if (format.trim().length > 20) score += 15;
    if (constraints.trim().length > 15) score += 15;
    return Math.min(score, 100);
  }, [framework, imgSubject, imgLighting, imgCamera, imgStyle, imgNegative, vidAction, vidCamera, vidLighting, vidPacing, role, task, context, format, constraints]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunWithAI = async () => {
    setAiLoading(true);
    setAiError("");
    setAiResult("");
    try {
      const res = await fetch("/api/tools/prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: generatedPrompt }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "AI request failed");
      setAiResult(json.result || json.data?.result || "");
    } catch (e: unknown) {
      setAiError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner & Preset Quick Select */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-slate-900/10 border border-brand-500/20 backdrop-blur-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Prompt Engineering Studio
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Enterprise Prompt Builder & Optimizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Synthesize high-performance prompts using CRISPE, Chain-of-Thought, Anthropic XML schemas, or cinematic generative video parameters.
            </p>
          </div>

          {/* Live Prompt Quality Gauge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Prompt Score</span>
              <span className={`text-lg font-black ${
                promptScore >= 85 ? "text-emerald-500" : promptScore >= 60 ? "text-amber-500" : "text-rose-500"
              }`}>
                {promptScore}/100
              </span>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              {promptScore >= 85 ? (
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              ) : (
                <Sliders className="w-5 h-5 text-amber-500" />
              )}
            </div>
          </div>
        </div>

        {/* Quick-Load Presets */}
        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
            Load High-Converting Template:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Zap className="w-3 h-3 text-brand-500" />
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode & Target Model Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Framework Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-brand-500" /> Prompt Framework
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {[
              { id: "crispe", label: "CRISPE" },
              { id: "cot", label: "CoT (Reasoning)" },
              { id: "rtf", label: "Role-Task" },
              { id: "image", label: "Midjourney" },
              { id: "video", label: "Kling Video" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFramework(f.id as FrameworkType)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  framework === f.id
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target Model Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-500" /> Target LLM / Diffusion Engine
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {[
              { id: "chatgpt", label: "ChatGPT" },
              { id: "claude", label: "Claude 3.5" },
              { id: "deepseek", label: "DeepSeek" },
              { id: "gemini", label: "Gemini" },
              { id: "midjourney", label: "Midjourney" },
              { id: "kling", label: "Kling 2.1" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id as ModelTarget)}
                className={`px-2 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                  model === m.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Input Form */}
      {framework === "image" ? (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <ImageIcon className="w-4 h-4 text-brand-500" /> Visual & Image Generation Parameters
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Subject & Foreground Composition
              </label>
              <textarea
                rows={2}
                value={imgSubject}
                onChange={(e) => setImgSubject(e.target.value)}
                placeholder="Describe central subject, pose, materials, textures..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Lighting & Atmospheric Ambience
                </label>
                <input
                  type="text"
                  value={imgLighting}
                  onChange={(e) => setImgLighting(e.target.value)}
                  placeholder="e.g. Volumetric golden hour, bioluminescent, Rembrandt lighting"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Camera, Lens & Depth of Field
                </label>
                <input
                  type="text"
                  value={imgCamera}
                  onChange={(e) => setImgCamera(e.target.value)}
                  placeholder="e.g. Hasselblad 85mm f/1.4, macro lens, shallow depth"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Art Style & Render Engine
                </label>
                <input
                  type="text"
                  value={imgStyle}
                  onChange={(e) => setImgStyle(e.target.value)}
                  placeholder="e.g. Photorealistic editorial, Unreal Engine 5 render, oil painting"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={imgAspect}
                  onChange={(e) => setImgAspect(e.target.value)}
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                >
                  <option value="16:9">16:9 (Landscape / Widescreen)</option>
                  <option value="9:16">9:16 (Vertical Reel / TikTok)</option>
                  <option value="1:1">1:1 (Square / Instagram)</option>
                  <option value="4:5">4:5 (Portrait Feed)</option>
                  <option value="21:9">21:9 (Cinematic Ultrawide)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Negative Prompt (Elements to Exclude)
              </label>
              <input
                type="text"
                value={imgNegative}
                onChange={(e) => setImgNegative(e.target.value)}
                placeholder="e.g. blur, deformed hands, cartoon, text, watermarks"
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      ) : framework === "video" ? (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Video className="w-4 h-4 text-rose-500" /> Generative Video Scene Parameters (Kling, Runway, Sora)
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                Primary Scene Action & Movement
              </label>
              <textarea
                rows={2}
                value={vidAction}
                onChange={(e) => setVidAction(e.target.value)}
                placeholder="Describe character motion, environmental dynamics, kinetic interaction..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Camera Motion (Pan, Tilt, Dolly, Drone)
                </label>
                <input
                  type="text"
                  value={vidCamera}
                  onChange={(e) => setVidCamera(e.target.value)}
                  placeholder="e.g. Smooth forward dolly push-in, low-angle tracking shot"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Lighting & Color Palette
                </label>
                <input
                  type="text"
                  value={vidLighting}
                  onChange={(e) => setVidLighting(e.target.value)}
                  placeholder="e.g. Neon cybernetic lighting, misty morning fog, cold twilight"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Motion Pacing & Framerate
                </label>
                <input
                  type="text"
                  value={vidPacing}
                  onChange={(e) => setVidPacing(e.target.value)}
                  placeholder="e.g. Cinematic slow motion 60fps, high-speed chase"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Duration & Loopability
                </label>
                <input
                  type="text"
                  value={vidDuration}
                  onChange={(e) => setVidDuration(e.target.value)}
                  placeholder="e.g. 5 seconds, seamless loop"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                1. Persona & Capacity (Who should the AI act as?)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Principal System Architect, Award-winning copywriter, PhD Data Scientist..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                2. Core Task & Objective (What exact work must be done?)
              </label>
              <textarea
                rows={2}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Audit this SQL query, formulate a marketing strategy, generate a unit test suite..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                3. Insight & Context (Background variables, domain nuances, audience)
              </label>
              <textarea
                rows={2}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Provide all background knowledge, constraints, company stage, target user profile..."
                className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  4. Required Output Format
                </label>
                <input
                  type="text"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="e.g. Markdown table, JSON schema, bulleted roadmap"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  5. Constraints & Negative Instructions
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g. Zero fluff, strict TypeScript, no external dependencies"
                  className="w-full p-3 text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Output Card */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Engineered Output Prompt
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
              {model.toUpperCase()} · {framework.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunWithAI}
              disabled={aiLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-brand-600 hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5 disabled:opacity-60"
            >
              {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
              {aiLoading ? "Running..." : "✨ Run with AI"}
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="relative">
          <pre className="p-4 rounded-2xl bg-slate-900/90 text-slate-200 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed border border-slate-800/80 overflow-x-auto selection:bg-brand-500 selection:text-white max-h-[500px] overflow-y-auto">
            {generatedPrompt}
          </pre>
        </div>

        {/* Quality Audit Tips */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
            <span>
              <strong>Tip:</strong> Click "Run with AI" to execute this prompt instantly, or paste into {model === "claude" ? "Claude 3.5 Sonnet Artifacts" : model === "midjourney" ? "Midjourney Discord / Web" : model === "kling" ? "Toolifia AI Video Generator" : "ChatGPT Plus"}.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 shrink-0">
            {generatedPrompt.length} characters · ~{Math.ceil(generatedPrompt.length / 4)} tokens
          </span>
        </div>

        {/* AI Error */}
        {aiError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            {aiError}
          </div>
        )}
      </div>

      {/* AI Response Output */}
      {aiResult && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 via-brand-500/5 to-slate-900/10 border border-purple-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">AI Response</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {model.toUpperCase()} via Toolifia AI
              </span>
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(aiResult); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all"
            >
              <Copy className="w-3 h-3" /> Copy Response
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-slate-200 font-sans leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800 max-h-[600px] overflow-y-auto">
            {aiResult}
          </pre>
        </div>
      )}
    </div>
  );
}
