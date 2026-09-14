import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 45;

const DEFAULT_AGNES_KEY = process.env.AGNES_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      prompt,
      engine = "agnes",
      aspectRatio = "1:1",
      styleSuffix = "",
      apiKey = "",
    } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Please enter a prompt" }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();
    const fullPrompt = styleSuffix ? `${cleanPrompt}, ${styleSuffix}` : cleanPrompt;

    const sizeMap: Record<string, { w: number; h: number; str: string }> = {
      "1:1": { w: 1024, h: 1024, str: "1024x1024" },
      "16:9": { w: 1280, h: 720, str: "1280x720" },
      "9:16": { w: 720, h: 1280, str: "720x1280" },
    };
    const dims = sizeMap[aspectRatio] || sizeMap["1:1"];

    // ── Engine 1: Agnes AI Image Engine ──────────────────────────────────────
    if (engine === "agnes") {
      const agnesKey = apiKey.trim() || DEFAULT_AGNES_KEY;

      if (!agnesKey) {
        return NextResponse.json(
          {
            success: false,
            errorType: "AGNES_KEY_MISSING",
            error: "Agnes AI Key Required",
            details:
              "Agnes provides free API keys for image & video generation. Get your key at https://platform.agnes-ai.com or switch to the Free Instant Engine.",
            actionUrl: "https://platform.agnes-ai.com",
          },
          { status: 400 }
        );
      }

      const agnesPayload = {
        model: "agnes-image-2.5-flash",
        prompt: fullPrompt,
        n: 1,
        size: dims.str,
        response_format: "url",
      };

      const agnesRes = await fetch("https://apihub.agnes-ai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${agnesKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agnesPayload),
      });

      if (!agnesRes.ok) {
        const errJson = await agnesRes.json().catch(() => ({}));
        const errMsg =
          errJson?.error?.message || errJson?.message || "Agnes image generation failed";
        return NextResponse.json(
          {
            success: false,
            error: `Agnes AI Error (${agnesRes.status}): ${errMsg}`,
            details: "Please verify your key has remaining quota at platform.agnes-ai.com.",
          },
          { status: agnesRes.status }
        );
      }

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

      return NextResponse.json(
        { error: "No image output returned from Agnes AI" },
        { status: 500 }
      );
    }

    // ── Engine 2: Pollinations AI (Instant Free) ─────────────────────────────
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(fullPrompt);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${dims.w}&height=${dims.h}&seed=${seed}&nologo=true`;

    return NextResponse.json({
      success: true,
      imageUrl: pollinationsUrl,
      engine: "pollinations",
      model: "Pollinations Flux / SDXL",
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
