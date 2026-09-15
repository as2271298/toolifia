import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 45;

const DEFAULT_AGNES_KEY = process.env.AGNES_API_KEY || "sk-QoCfGig0SJZ0xIe73UzC3ihSQaglScfxeUSH7aefhLzDO9c0";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      prompt = "",
      engine = "agnes",
      aspectRatio = "1:1",
      styleSuffix = "",
      apiKey = "",
      image = "",
      imageUrl = "",
    } = body;

    const inputImage = image || imageUrl || "";
    const cleanPrompt = (typeof prompt === "string" ? prompt.trim() : "") ||
      (inputImage ? "Transform and enhance this image in ultra high definition photo quality" : "");

    if (!cleanPrompt) {
      return NextResponse.json({ error: "Please enter a prompt or upload an image" }, { status: 400 });
    }

    const fullPrompt = styleSuffix ? `${cleanPrompt}, ${styleSuffix}` : cleanPrompt;

    const sizeMap: Record<string, { w: number; h: number; str: string }> = {
      "1:1": { w: 1024, h: 1024, str: "1024x1024" },
      "16:9": { w: 1280, h: 720, str: "1280x720" },
      "9:16": { w: 720, h: 1280, str: "720x1280" },
    };
    const dims = sizeMap[aspectRatio] || sizeMap["1:1"];

    // ── Primary Engine: Agnes AI 2.5 Flash ───────────────────────────────────
    const agnesKey = apiKey.trim() || DEFAULT_AGNES_KEY;
    try {
      const agnesPayload: any = {
        model: "agnes-image-2.5-flash",
        prompt: fullPrompt,
        n: 1,
        size: dims.str,
        response_format: "url",
      };

      if (inputImage) {
        agnesPayload.extra_body = {
          response_format: "url",
          image: [inputImage],
        };
      }

      const agnesRes = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${agnesKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agnesPayload),
      });

      if (agnesRes.ok) {
        const agnesData = await agnesRes.json();
        const imageUrl =
          agnesData.data?.[0]?.url || agnesData.data?.[0]?.b64_json || agnesData.url;

        if (imageUrl) {
          return NextResponse.json({
            success: true,
            imageUrl,
            engine: "agnes",
            model: "agnes-image-2.5-flash",
            prompt: cleanPrompt,
          });
        }
      }
    } catch (err) {
      console.error("[Agnes Image Error]:", err);
    }

    // ── Fallback Engine: Pollinations AI (Instant Free) ───────────────────────
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(fullPrompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${dims.w}&height=${dims.h}&seed=${seed}&nologo=true`;

    return NextResponse.json({
      success: true,
      imageUrl: pollinationsUrl,
      engine: "pollinations",
      model: "Neural AI Engine",
      prompt: cleanPrompt,
    });
  } catch (error: any) {
    console.error("[image-generator] Server Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during image generation" },
      { status: 500 }
    );
  }
}
