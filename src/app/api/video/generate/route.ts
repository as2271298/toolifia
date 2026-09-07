import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // 60 seconds max execution time for video generation

const DEFAULT_GEMINI_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      prompt,
      action,
      engine = "google-veo", // "google-veo" | "fal-ai"
      style = "cinematic",
      motion = "slow-zoom",
      aspectRatio = "16:9",
      duration = "5",
      apiKey = "",
    } = body;

    // ── Prompt Enhancement Action ───────────────────────────────────────────
    if (action === "enhance") {
      if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({ error: "Missing prompt to enhance" }, { status: 400 });
      }

      const enhanced = `${prompt.trim()}, highly detailed cinematic film shot, dynamic lighting, 8k resolution, volumetric atmosphere, masterwork cinematography, 35mm anamorphic lens, shallow depth of field, photorealistic textures`;

      return NextResponse.json({
        success: true,
        originalPrompt: prompt,
        enhancedPrompt: enhanced,
      });
    }

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Please enter a scene prompt to generate a video" }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();
    const styleModifiers: Record<string, string> = {
      cinematic: "cinematic 35mm movie film, dramatic volumetric lighting, anamorphic lens flare, photorealistic 8K, color graded",
      cyberpunk: "cyberpunk neo-tokyo aesthetic, glowing neon lights, rain reflections, futuristic city, blade runner atmosphere",
      nature: "national geographic wildlife documentary, golden hour sunbeams, ultra-detailed 8K nature footage, slow motion",
      anime: "studio ghibli inspired anime motion, vibrant colors, lush painted backgrounds, fluid hand-drawn animation, high frame rate",
      "3d": "pixar style 3D CGI animation, subsurface scattering, Disney movie render, smooth character motion, octane render 8k",
      vintage: "16mm retro kodachrome film look, warm nostalgic tones, subtle vintage grain and scratches, 1970s aesthetic",
      scifi: "interstellar sci-fi odyssey, deep space nebula, epic starship, zero-gravity floating particles, cosmos cinematography",
    };

    const motionModifiers: Record<string, string> = {
      "slow-zoom": "smooth slow zoom in towards the subject",
      "drone-fly": "sweeping FPV drone flythrough shot with wide perspective",
      "360-orbit": "360 degree dynamic orbital camera rotation",
      pan: "steady horizontal cinematic pan from left to right",
      handheld: "realistic handheld camera movement with subtle natural shake",
      dolly: "dolly forward push with shallow depth of field",
    };

    const fullPrompt = `${cleanPrompt}, ${styleModifiers[style] || styleModifiers.cinematic}, ${motionModifiers[motion] || motionModifiers["slow-zoom"]}, ${duration}s video clip, ultra high definition`;

    // ── Engine 1: Google Veo 3.1 ───────────────────────────────────────────
    if (engine === "google-veo") {
      const activeKey = apiKey.trim() || DEFAULT_GEMINI_KEY;

      if (!activeKey) {
        return NextResponse.json(
          { error: "Missing Google Gemini / Veo API Key. Please provide an active API key in settings." },
          { status: 400 }
        );
      }

      const veoUrl = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-fast-generate-preview:predictLongRunning?key=${activeKey}`;

      const veoPayload = {
        instances: [{ prompt: fullPrompt }],
        parameters: {
          aspectRatio: aspectRatio === "9:16" ? "9:16" : aspectRatio === "1:1" ? "1:1" : "16:9",
          durationSeconds: parseInt(duration, 10) || 5,
        },
      };

      const veoRes = await fetch(veoUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veoPayload),
      });

      if (veoRes.ok) {
        const veoData = await veoRes.json();
        const videoUri =
          veoData.videoUri ||
          veoData.predictions?.[0]?.videoUri ||
          veoData.response?.videoUri;

        return NextResponse.json({
          success: true,
          videoUrl: videoUri,
          operationName: veoData.name || null,
          model: "Google Veo 3.1 Fast",
          engine: "google-veo",
          prompt: cleanPrompt,
          aspectRatio,
          duration,
        });
      }

      const errJson = await veoRes.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || "";

      if (veoRes.status === 429 || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
        return NextResponse.json(
          {
            success: false,
            errorType: "VEO_QUOTA_EXHAUSTED",
            error: "Google Veo Quota Exceeded (Billing Required)",
            details:
              "Google AI Studio allows free access for text models, but video generation (Google Veo 3.1) requires a Google Cloud Project with active billing enabled. On free-tier Google keys, Veo video generation has a quota of 0 requests/min.",
            actionUrl: "https://aistudio.google.com/",
            suggestion:
              "To generate real MP4 videos with Google Veo, link a billing account in Google AI Studio, or switch to the Fal.ai engine (Kling 2.1 / Wan 2.1) which gives free trial credits upon signup.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Google Veo Error (${veoRes.status}): ${errMsg || "Failed to generate video"}`,
        },
        { status: veoRes.status }
      );
    }

    // ── Engine 2: Fal.ai (Kling 2.1 / Wan 2.1) ─────────────────────────────
    if (engine === "fal-ai") {
      const falKey = apiKey.trim() || process.env.FAL_KEY || "";

      if (!falKey) {
        return NextResponse.json(
          {
            success: false,
            errorType: "FAL_KEY_MISSING",
            error: "Missing Fal.ai API Key",
            details: "Fal.ai provides $10 in free credits upon signing up. Please enter your Fal.ai API key to generate real MP4 videos with Kling 2.1 or Wan 2.1.",
            actionUrl: "https://fal.ai/dashboard/keys",
          },
          { status: 400 }
        );
      }

      // Submit job to Fal.ai Kling 2.1
      const submitRes = await fetch("https://queue.fal.run/fal-ai/kling-video/v2.1/standard/text-to-video", {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          duration: parseInt(duration, 10) || 5,
          aspect_ratio: aspectRatio === "9:16" ? "9:16" : aspectRatio === "1:1" ? "1:1" : "16:9",
          negative_prompt: "blurry, low quality, distorted, artifacts",
        }),
      });

      if (!submitRes.ok) {
        const errJson = await submitRes.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            error: `Fal.ai Error (${submitRes.status}): ${errJson?.detail || errJson?.message || "Failed to start generation"}`,
          },
          { status: submitRes.status }
        );
      }

      const submitData = await submitRes.json();
      return NextResponse.json({
        success: true,
        requestId: submitData.request_id,
        statusUrl: submitData.status_url,
        responseUrl: submitData.response_url,
        engine: "fal-ai",
        model: "Kling 2.1 Standard",
      });
    }

    return NextResponse.json({ error: "Unsupported video generation engine" }, { status: 400 });
  } catch (error: any) {
    console.error("[video-generator] Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error during video generation request" },
      { status: 500 }
    );
  }
}