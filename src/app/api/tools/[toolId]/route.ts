import { NextRequest, NextResponse } from "next/server";
import { TOOLS } from "@/config/tools.registry";
import { processAiTask, type AiTaskResult } from "@/lib/ai-provider";
import { db } from "@/lib/db";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ toolId: string }> }
) {
  try {
    const params = await props.params;
    const { toolId } = params;
    const tool = TOOLS.find((t) => t.slug === toolId);

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, any>;

    // Smart input extraction across all client component payloads
    let input =
      body.input ||
      body.prompt ||
      body.text ||
      body.topic ||
      body.idea ||
      (body.role ? `Role: ${body.role}. Skills: ${body.skills || ""}` : "") ||
      (body.jobTitle ? `${body.jobTitle} at ${body.company || "Company"}. Skills: ${body.skills || ""}` : "") ||
      (body.messages && Array.isArray(body.messages) ? body.messages[body.messages.length - 1]?.content : "");

    const tone = body.tone || "conversational";

    if (!input && !body.messages) {
      return NextResponse.json(
        { error: "Missing required input or text parameters" },
        { status: 400 }
      );
    }

    let data: AiTaskResult | { tool: string; processed: boolean; output: string };
    let taskName = "generic";
    let outputText = "";

    if (tool.category === "ai-tools" || tool.category === "writing-tools") {
      if (toolId === "ai-humanizer") {
        taskName = "humanize";
        const res = await processAiTask({ prompt: input, task: "humanize", tone });
        data = res;
        outputText = res.result;
      } else if (toolId === "ai-detector") {
        taskName = "detect";
        data = await processAiTask({ prompt: input, task: "detect" });
        outputText = (data as any).status || "Analysis Complete";
      } else if (toolId === "resume-builder") {
        taskName = "resume";
        const res = await processAiTask({ prompt: input, task: "resume" });

        // ── Robust AI JSON Cleaner ──────────────────────────────────────────
        let cvData: Record<string, unknown> | null = null;
        try {
          // 1. Strip markdown fences
          let raw = res.result
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

          // 2. Extract only the JSON object (first { to matching last })
          const start = raw.indexOf("{");
          const end = raw.lastIndexOf("}");
          if (start !== -1 && end !== -1 && end > start) {
            raw = raw.slice(start, end + 1);
          }

          // 3. Fix trailing commas before ] or } (common AI mistake)
          raw = raw.replace(/,\s*([}\]])/g, "$1");

          // 4. Fix unescaped newlines inside JSON string values
          //    Replace literal \n inside strings with \\n
          raw = raw.replace(/"((?:[^"\\]|\\.)*)"/g, (_match: string, inner: string) => {
            const fixed = inner
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/\t/g, "\\t");
            return `"${fixed}"`;
          });

          // 5. Attempt parse
          cvData = JSON.parse(raw);
        } catch (parseErr) {
          console.error("[resume-builder] JSON parse failed:", (parseErr as Error).message);
          // Last resort: try to extract partial data with regex
          try {
            const nameMatch = res.result.match(/"name"\s*:\s*"([^"]+)"/);
            const titleMatch = res.result.match(/"title"\s*:\s*"([^"]+)"/);
            const summaryMatch = res.result.match(/"summary"\s*:\s*"([^"]+)"/);
            if (nameMatch) {
              cvData = {
                name: nameMatch[1] || "Professional Candidate",
                title: titleMatch?.[1] || "Professional",
                summary: summaryMatch?.[1] || "Experienced professional.",
                contact: { email: "", phone: "", location: "", linkedin: "", website: "" },
                experience: [], education: [], skills: [],
                languages: [], certifications: [], hobbies: [], references: [],
              };
            }
          } catch { /* ignore */ }
        }

        return NextResponse.json({
          success: true,
          tool: toolId,
          timestamp: new Date().toISOString(),
          result: res.result,
          cvData: cvData ?? null,
          data: res,
        });

      } else if (toolId === "email-writer") {
        taskName = "email";
        const res = await processAiTask({ prompt: input, task: "email" });
        data = res;
        outputText = res.result;
      } else if (toolId === "text-rewriter") {
        taskName = "rewrite";
        const res = await processAiTask({ prompt: input, task: "rewrite" });
        data = res;
        outputText = res.result;
      } else if (toolId === "ai-story-generator") {
        taskName = "story";
        const promptText = `Genre: ${body.genre || "Fiction"}, Length: ${body.length || "medium"}. Premise: ${input}`;
        const res = await processAiTask({ prompt: promptText, task: "story" });
        data = res;
        outputText = res.result;
      } else if (toolId === "ai-chat-assistant") {
        taskName = "chat";
        const res = await processAiTask({
          prompt: input || "Hello",
          task: "chat",
          messages: body.messages,
        });
        data = res;
        outputText = res.result;
      } else if (toolId === "cover-letter-generator") {
        taskName = "cover-letter";
        const promptText = `Job Title: ${body.jobTitle}, Company: ${body.company}, Skills: ${body.skills}, Tone: ${body.tone || "Professional"}`;
        const res = await processAiTask({ prompt: promptText, task: "cover-letter" });
        data = res;
        outputText = res.result;
      } else if (toolId === "grammar-checker") {
        taskName = "grammar";
        const res = await processAiTask({ prompt: input, task: "grammar" });
        data = res;
        outputText = (res as any).corrected || input;
      } else if (toolId === "blog-intro-generator") {
        taskName = "blog-intro";
        const res = await processAiTask({ prompt: input, task: "blog-intro" });
        data = res;
        outputText = res.result;
      } else if (toolId === "social-bio-writer") {
        taskName = "social-bio";
        const res = await processAiTask({ prompt: input, task: "social-bio" });
        data = res;
        outputText = res.result;
      } else {
        taskName = "prompt-gen";
        const res = await processAiTask({ prompt: input, task: "prompt-gen" });
        data = res;
        outputText = res.result;
      }
    } else {
      data = { tool: tool.name, processed: true, output: input };
      outputText = input;
    }

    // ── Log usage to DB (non-blocking) ────────────────────────────────────────
    db.aiUsageLog
      .create({
        data: {
          toolSlug: toolId,
          task: taskName,
          inputLen: input ? input.length : 0,
          outputLen: outputText ? outputText.length : 0,
          model: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b-instruct:free",
          success: true,
        },
      })
      .catch(() => {});

    // ── Increment usage counter (non-blocking) ────────────────────────────────
    db.tool
      .update({ where: { slug: toolId }, data: { usageCount: { increment: 1 } } })
      .catch(() => {});

    // Ensure result field is present at top-level of response data for client ease
    const responseResult = (data as any).result || (data as any).output || (data as any).corrected || JSON.stringify(data);

    return NextResponse.json({
      success: true,
      tool: tool.slug,
      timestamp: new Date().toISOString(),
      result: responseResult,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
