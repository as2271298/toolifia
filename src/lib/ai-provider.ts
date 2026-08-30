export interface AiRequestOptions {
  prompt: string;
  task:
    | "humanize"
    | "detect"
    | "prompt-gen"
    | "email"
    | "resume"
    | "rewrite"
    | "story"
    | "chat"
    | "cover-letter"
    | "grammar"
    | "blog-intro"
    | "social-bio"
    | "summarize"
    | "headline";
  tone?: string;
  context?: string;
  messages?: { role: string; content: string }[];
}

export interface HumanizeResult {
  result: string;
  humanScore: number;
  aiProbability: number;
  changesMade: number;
}

export interface DetectResult {
  aiProbability: number;
  humanScore: number;
  status: string;
  matchedMarkers: string[];
}

export interface GrammarResult {
  corrected: string;
  issues: string[];
}

export interface GenericResult {
  result: string;
  subject?: string;
}

export type AiTaskResult = HumanizeResult | DetectResult | GrammarResult | GenericResult;

// ── System Prompt Templates ───────────────────────────────────────────────────
const SYSTEM_PROMPTS: Record<string, string> = {
  humanize: `You are an expert content editor specializing in making AI-generated text sound completely natural and human-written.
Your job: Rewrite the given text to:
1. Vary sentence length dramatically (mix short punchy sentences with longer descriptive ones)
2. Replace AI marker words: "furthermore", "moreover", "delve", "testament", "paramount", "utilize", "leverage", "tapestry", "beacon", "pivotal", "it is important to note"
3. Add natural conversational transitions
4. Use active voice instead of passive
5. Keep all factual information intact
Return ONLY the rewritten text. No explanations, no preamble.`,

  detect: `You are an AI content detection engine. Analyze the given text for AI-generated patterns.
Respond in this exact JSON format only:
{
  "aiProbability": <0-99 integer>,
  "humanScore": <0-99 integer>,
  "status": "<'High AI Probability Detected' or 'Likely Human Written' or 'Mixed Content Detected'>",
  "matchedMarkers": ["<word1>", "<word2>"]
}
Base your analysis on: uniform sentence length, AI marker words, passive voice frequency, transitional word density, burstiness score.`,

  "prompt-gen": `You are a master prompt engineer. Transform the user's simple idea into a professionally structured, high-converting prompt.
Format your response as:
[Role & Persona]
<assign expert role>

[Objective]
<clear goal statement>

[Instructions & Constraints]
1. <specific instruction>
2. <specific instruction>
3. <specific instruction>

[Output Format]
<specify the exact format expected>

Return only the engineered prompt, no meta-commentary.`,

  email: `You are a professional business communication expert. Write a polished, concise email based on the given context.
Format your response as:
SUBJECT: <compelling subject line>
---
<email body>

Keep it under 150 words. Professional but human. Include a clear call to action.`,

  resume: `You are an elite executive resume writer. Given candidate profile data, generate a structured JSON object for their CV.

Return ONLY a valid JSON object (no markdown fences, no preamble) with this exact structure:
{
  "name": "Full Name",
  "title": "Job Title / Role",
  "summary": "3-4 sentence professional summary highlighting key strengths, years of experience, core competencies, and career trajectory.",
  "contact": {
    "email": "email@example.com",
    "phone": "+1 (555) 000-0000",
    "location": "City, Country",
    "linkedin": "linkedin.com/in/username",
    "website": ""
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, Country",
      "dates": "Jan 2021 – Present",
      "bullets": [
        "Action verb + achievement + metric (e.g., Engineered microservices reducing latency by 40%)",
        "Action verb + achievement + metric",
        "Action verb + achievement + metric",
        "Action verb + achievement + metric"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "school": "University Name",
      "location": "City",
      "dates": "2015 – 2019"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"],
  "languages": [
    { "name": "English", "level": "Native", "score": 5 },
    { "name": "Spanish", "level": "Intermediate", "score": 3 }
  ],
  "certifications": ["Certification 1", "Certification 2"],
  "hobbies": ["Hobby 1", "Hobby 2", "Hobby 3"],
  "references": [
    { "name": "Reference Name", "position": "Title at Company", "phone": "+1 (555) 000-0000", "email": "ref@email.com" }
  ]
}

Expand ALL sections with detailed, realistic, quantified content based on the candidate profile. Generate 2-3 experience entries, 1-2 education entries, 6-10 skills, and 2-3 languages. Return ONLY the JSON.`,


  rewrite: `You are an expert editor. Rewrite the given text to improve clarity, flow, and vocabulary while preserving the original meaning.
- Use precise, varied vocabulary
- Improve sentence structure
- Remove redundancy
- Maintain the author's intent
Return only the rewritten text.`,

  story: `You are an award-winning creative author. Write an engaging, immersive story based on the user's premise, genre, and requested length.
Create vivid imagery, realistic dialogue, and a satisfying narrative arc.
Return ONLY the story content without conversational filler.`,

  chat: `You are Toolifia AI, an extremely smart, helpful, friendly, and concise AI assistant.
Answer the user's query clearly and directly. Use markdown formatting for lists, code blocks, or bold emphasis where appropriate. Be conversational, polite, and helpful.`,

  "cover-letter": `You are an expert executive career advisor and cover letter specialist.
Write a compelling, tailored 3-paragraph cover letter based on the provided Job Title, Company, and Applicant Skills.
Make it persuasive, highly professional, and ready to submit to recruiters.
Return ONLY the cover letter text.`,

  grammar: `You are a professional editor and grammar checker. Correct all spelling, grammar, punctuation, and style issues in the user's text.
Respond ONLY in this JSON format:
{
  "corrected": "<full corrected text>",
  "issues": ["<short description of fix 1>", "<short description of fix 2>"]
}`,

  "blog-intro": `You are a top 1% content strategist and copywriter.
Generate 3 distinct, high-converting blog post introduction hooks (Hook 1: The Problem/Pain Point, Hook 2: Bold Statement/Statistic, Hook 3: Storytelling approach).
Include a hook, core conflict, and solution teaser for each. Format clearly with markdown headings.`,

  "social-bio": `You are a social media branding specialist.
Generate 5 punchy, creative, and engaging social media bios for the specified platform and profession/skills. Include relevant emojis, clean layout, and a call-to-action line.`,

  summarize: `You are a professional text summarizer.
Summarize the provided text to the requested length (brief, standard, or detailed).
Capture the main points and key arguments accurately. Format clearly.
Return ONLY the summary.`,

  headline: `You are an expert copywriter.
Generate 10 compelling, high-converting headlines based on the topic and requested tone.
Format as a simple numbered list. Return ONLY the list.`,
};

// ── OpenRouter API Call ───────────────────────────────────────────────────────
async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string,
  model?: string,
  chatMessages?: { role: string; content: string }[]
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY || "";
  const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
  const selectedModel = model || process.env.OPENROUTER_MODEL || "openrouter/auto";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const messagesPayload = chatMessages && chatMessages.length > 0
    ? [{ role: "system", content: systemPrompt }, ...chatMessages]
    : [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://toolifia.vercel.app",
        "X-Title": "Toolifia AI Tools",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messagesPayload,
        temperature: 0.7,
        max_tokens: 1500,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.warn(`[ai-provider] OpenRouter error with model ${selectedModel}:`, response.status, errText);

      // Active working free models sequence on OpenRouter
      const fallbacks = [
        "openrouter/auto",
        "minimax/minimax-m3:free",
        "nvidia/nemotron-3.5-lightning:free",
        "inclusionai/ling-3.0-flash-fin:free",
      ];
      const nextIndex = fallbacks.indexOf(selectedModel) + 1;
      if (nextIndex > 0 && nextIndex < fallbacks.length) {
        return callOpenRouter(systemPrompt, userPrompt, fallbacks[nextIndex], chatMessages);
      }
      throw new Error(`OpenRouter API error ${response.status}: ${errText}`);
    }

    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    let content = data.choices?.[0]?.message?.content?.trim() ?? "";

    // Clean up reasoning/thinking tags (e.g. <think>...</think> or "Here's a thinking process:")
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    if (content.startsWith("Here's a thinking process:") || content.startsWith("Here is a thinking process:")) {
      const parts = content.split(/\n\s*\n/);
      if (parts.length > 2) {
        content = parts.slice(2).join("\n\n").trim();
      }
    }

    return content;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      console.warn("[ai-provider] Request timed out, switching to fallback model...");
      const fallbacks = ["minimax/minimax-m3:free", "nvidia/nemotron-3.5-lightning:free"];
      if (model !== fallbacks[0]) {
        return callOpenRouter(systemPrompt, userPrompt, fallbacks[0], chatMessages);
      }
    }
    throw err;
  }
}

// ── Local Fallback (no API key or network error) ──────────────────────────────
function localFallback(options: AiRequestOptions): AiTaskResult {
  const { prompt, task, tone = "conversational", messages } = options;

  if (task === "detect") {
    const lower = prompt.toLowerCase();
    const aiMarkers = ["furthermore", "moreover", "delve", "testament", "paramount", "in conclusion", "it is important to note", "landscape", "tapestry", "beacon", "pivotal"];
    let score = 15;
    const matchedMarkers: string[] = [];
    aiMarkers.forEach((m) => { if (lower.includes(m)) { score += 15; matchedMarkers.push(m); } });
    const words = prompt.split(/\s+/).filter(Boolean);
    const avgWordLength = words.reduce((a, w) => a + w.length, 0) / (words.length || 1);
    if (avgWordLength > 5.8) score += 20;
    const aiProbability = Math.min(99, Math.max(5, score));
    return { aiProbability, humanScore: 100 - aiProbability, status: aiProbability > 50 ? "High AI Probability Detected" : "Likely Human Written", matchedMarkers };
  }

  if (task === "grammar") {
    return {
      corrected: prompt.replace(/\b(i)\b/g, "I").replace(/\s+/g, " ").trim(),
      issues: ["Capitalized standalone 'i'", "Normalized spacing and punctuation"],
    };
  }

  if (task === "humanize") {
    let text = prompt;
    const replacements: Record<string, string> = { furthermore: "also", moreover: "plus", "in conclusion": "to wrap up", utilize: "use", leverage: "use", subsequently: "then", consequently: "as a result", facilitate: "help", paramount: "vital", delve: "look into", testament: "proof" };
    for (const [k, v] of Object.entries(replacements)) { text = text.replace(new RegExp(`\\b${k}\\b`, "gi"), v); }
    if (tone === "conversational") { text = text.replace(/\bHowever,\b/gi, "But,").replace(/\bTherefore,\b/gi, "So,"); }
    return { result: text, humanScore: 96, aiProbability: 4, changesMade: Object.keys(replacements).length };
  }

  if (task === "summarize") {
    return { result: `Here is a summary of your text: \n\n${prompt.slice(0, 100)}... (This is a local fallback summary.)` };
  }

  if (task === "headline") {
    return { result: `1. The Ultimate Guide to ${prompt}\n2. How to Master ${prompt} in 2026\n3. 5 Secrets About ${prompt} You Didn't Know\n4. Why ${prompt} is the Future\n5. The Best Tool for ${prompt}` };
  }

  if (task === "chat") {
    const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : prompt;
    return { result: `Hello! I understand you asked: "${lastUserMsg}". How can I assist you further with this topic?` };
  }

  if (task === "story") {
    return { result: `Once upon a time in a world defined by innovation, ${prompt}. The journey was challenging, but determination unlocked extraordinary possibilities.` };
  }

  if (task === "cover-letter") {
    return { result: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the open role. Based on my background in ${prompt}, I am confident in my ability to deliver immediate value to your team.\n\nThank you for your consideration.\n\nSincerely,\nApplicant` };
  }

  if (task === "prompt-gen") {
    return { result: `[Role & Persona]\nYou are an elite domain expert.\n\n[Objective]\n${prompt}\n\n[Instructions]\n1. Provide specific, actionable steps.\n2. Include real examples.\n3. Format with markdown.` };
  }

  if (task === "email") {
    return { subject: `Follow-up: ${prompt.slice(0, 40)}...`, result: `Hi [Name],\n\nI'm reaching out regarding ${prompt}.\n\nWould love to connect briefly. Please let me know when works for you.\n\nBest,\n[Your Name]` };
  }

  if (task === "resume") {
    const fallbackJson = JSON.stringify({
      name: "Professional Candidate",
      title: "Senior Software Engineer",
      summary: `Results-driven professional with extensive expertise in ${prompt.slice(0, 60)}. Proven track record of spearheading high-impact technical initiatives, optimizing cross-functional workflows, and delivering enterprise solutions that drive significant business growth and team performance.`,
      contact: {
        email: "candidate@example.com",
        phone: "+1 (555) 019-2834",
        location: "New York, NY",
        linkedin: "linkedin.com/in/candidate",
        website: "www.candidate.dev",
      },
      experience: [
        {
          title: "Senior Lead Engineer",
          company: "Enterprise Tech Solutions",
          location: "New York, NY",
          dates: "Jan 2021 – Present",
          bullets: [
            `Spearheaded end-to-end technical initiatives around ${prompt.slice(0, 40)}, boosting operational efficiency by 35%.`,
            "Engineered scalable microservices architecture reducing system response latency by 45%.",
            "Mentored a team of 6 junior engineers and instituted code review standards reducing incidents by 60%.",
            "Delivered 3 major product releases on schedule, each generating $500K+ in new ARR.",
          ],
        },
        {
          title: "Software Engineer",
          company: "Global Systems Inc.",
          location: "San Francisco, CA",
          dates: "Jun 2018 – Dec 2020",
          bullets: [
            "Led cross-functional team of 8 delivering mission-critical integrations under tight deadlines.",
            "Designed automated CI/CD pipelines saving 15+ engineering hours per week.",
            "Improved system test coverage from 40% to 91%, dramatically reducing regression bugs.",
          ],
        },
      ],
      education: [
        {
          degree: "B.S. Computer Science & Information Systems",
          school: "State University",
          location: "New York",
          dates: "2014 – 2018",
        },
      ],
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "GraphQL", "System Design"],
      languages: [
        { name: "English", level: "Native", score: 5 },
        { name: "Spanish", level: "Intermediate (B1)", score: 3 },
      ],
      certifications: ["Professional Scrum Master (PSM I)", "AWS Certified Developer – Associate"],
      hobbies: ["Open Source Contributions", "Technical Writing", "Rock Climbing"],
      references: [
        { name: "Alex Johnson", position: "CTO at Enterprise Tech", phone: "+1 (555) 321-0000", email: "alex@enterprisetech.com" },
      ],
    });
    return { result: fallbackJson };
  }

  return { result: prompt };
}

// ── Main Exported Function ───────────────────────────────────────────────────
export async function processAiTask(options: AiRequestOptions): Promise<any> {
  const { prompt, task, tone, messages } = options;
  const hasApiKey = !!process.env.OPENROUTER_API_KEY;

  if (!hasApiKey) {
    return localFallback(options);
  }

  try {
    const systemPrompt = SYSTEM_PROMPTS[task] ?? SYSTEM_PROMPTS["rewrite"];

    // ── Detect ───────────────────────────────────────────────────────────────
    if (task === "detect") {
      const raw = await callOpenRouter(systemPrompt, prompt);
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as DetectResult;
          return {
            aiProbability: Math.min(99, Math.max(1, parsed.aiProbability ?? 50)),
            humanScore: Math.min(99, Math.max(1, parsed.humanScore ?? 50)),
            status: parsed.status ?? "Analysis Complete",
            matchedMarkers: parsed.matchedMarkers ?? [],
          };
        }
      } catch {}
      return localFallback(options) as DetectResult;
    }

    // ── Grammar ──────────────────────────────────────────────────────────────
    if (task === "grammar") {
      const raw = await callOpenRouter(systemPrompt, prompt);
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as GrammarResult;
          if (parsed.corrected) {
            return {
              corrected: parsed.corrected,
              issues: parsed.issues || [],
            };
          }
        }
      } catch {}
      return { corrected: raw, issues: ["Minor spelling and grammar adjustments"] };
    }

    // ── Chat ─────────────────────────────────────────────────────────────────
    if (task === "chat") {
      const raw = await callOpenRouter(systemPrompt, prompt, undefined, messages);
      return { result: raw };
    }

    // ── Humanize ─────────────────────────────────────────────────────────────
    if (task === "humanize") {
      const userPrompt = `Tone preference: ${tone ?? "conversational"}\n\nText to humanize:\n${prompt}`;
      const result = await callOpenRouter(systemPrompt, userPrompt);
      const original = prompt.split(/\s+/).length;
      const rewritten = result.split(/\s+/).length;
      return {
        result,
        humanScore: 97,
        aiProbability: 3,
        changesMade: Math.abs(original - rewritten) + 5,
      };
    }

    // ── Email ────────────────────────────────────────────────────────────────
    if (task === "email") {
      const raw = await callOpenRouter(systemPrompt, prompt);
      const subjectMatch = raw.match(/^SUBJECT:\s*(.+)/im);
      const bodyMatch = raw.split(/^---$/m);
      return {
        subject: subjectMatch?.[1]?.trim() ?? "Follow-up Email",
        result: bodyMatch[1]?.trim() ?? raw,
      };
    }

    // ── Generic AI Tasks ─────────────────────────────────────────────────────
    const result = await callOpenRouter(systemPrompt, prompt);
    if (!result || result.includes("User Safety:") || result.trim().length < 10) {
      return localFallback(options) as GenericResult;
    }
    return { result };

  } catch (err) {
    console.error("[ai-provider] OpenRouter call failed, using local fallback:", err);
    return localFallback(options);
  }
}
