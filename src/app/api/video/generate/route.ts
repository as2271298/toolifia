import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60; // 60 seconds max execution time for video generation

const DEFAULT_GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const DEFAULT_JSON2VIDEO_KEY = process.env.JSON2VIDEO_API_KEY || "";

// ── GET: Poll Generation Status ──────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("project");
    const engine = searchParams.get("engine") || "json2video";
    const apiKey = searchParams.get("apiKey") || "";

    if (!projectId) {
      return NextResponse.json({ error: "Missing project ID parameter" }, { status: 400 });
    }

    if (engine === "json2video") {
      const activeKey = apiKey.trim() || DEFAULT_JSON2VIDEO_KEY;
      if (!activeKey) {
        return NextResponse.json({ error: "Missing JSON2Video API key" }, { status: 400 });
      }

      const pollRes = await fetch(`https://api.json2video.com/v2/movies?project=${projectId}`, {
        headers: { "x-api-key": activeKey },
      });

      if (!pollRes.ok) {
        const err = await pollRes.json().catch(() => ({}));
        return NextResponse.json(
          { error: err?.message || "Failed to check movie status" },
          { status: pollRes.status }
        );
      }

      const pollData = await pollRes.json();
      const movie = pollData.movie || {};
      return NextResponse.json({
        success: true,
        status: movie.status || "running",
        videoUrl: movie.url || null,
        message: movie.message || null,
      });
    }

    return NextResponse.json({ error: "Unsupported engine for status polling" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to check generation status" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      prompt,
      action,
      engine = "json2video", // "json2video" | "google-veo" | "fal-ai"
      style = "cinematic",
      motion = "slow-zoom",
      aspectRatio = "16:9",
      duration = "5",
      apiKey = "",
      narration = "",
      showTitle = false,
    } = body;

    // ── Prompt Enhancement Action ───────────────────────────────────────────
    if (action === "enhance") {
      if (!prompt || typeof prompt !== "string") {
        return NextResponse.json({ error: "Missing prompt to enhance" }, { status: 400 });
      }

      const enhanced = `${prompt.trim()}, highly detailed cinematic film shot, dynamic lighting, 8k resolution, volumetric atmosphere, masterwork cinematography, 35mm anamorphic lens, shallow depth of field, photorealistic textures`;
      const generatedNarration = `Witness the scene: ${prompt.trim().replace(/[.]+$/, "")}.`;

      return NextResponse.json({
        success: true,
        originalPrompt: prompt,
        enhancedPrompt: enhanced,
        suggestedNarration: generatedNarration,
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

    // ── Engine 1: JSON2Video (Real MP4 Video Engine) ─────────────────────────
    if (engine === "json2video") {
      const activeKey = apiKey.trim() || DEFAULT_JSON2VIDEO_KEY;

      if (!activeKey) {
        return NextResponse.json(
          {
            success: false,
            errorType: "JSON2VIDEO_KEY_MISSING",
            error: "JSON2Video API Key Required",
            details: "Please configure JSON2VIDEO_API_KEY in server environment or enter it in settings.",
          },
          { status: 400 }
        );
      }

      const resolutionMap: Record<string, string> = {
        "16:9": "hd",
        "9:16": "instagram-story",
        "1:1": "squared",
      };
      const resVal = resolutionMap[aspectRatio] || "hd";

      const motionMap: Record<string, { zoom: number; pan: string }> = {
        "slow-zoom": { zoom: 3, pan: "center" },
        "drone-fly": { zoom: 4, pan: "top-right" },
        "360-orbit": { zoom: 2, pan: "left" },
        pan: { zoom: 1, pan: "right" },
        handheld: { zoom: 2, pan: "bottom-left" },
        dolly: { zoom: 5, pan: "center" },
      };
      const motionConfig = motionMap[motion] || { zoom: 3, pan: "center" };

      const dimMap: Record<string, { w: number; h: number }> = {
        "16:9": { w: 1280, h: 720 },
        "9:16": { w: 720, h: 1280 },
        "1:1": { w: 1080, h: 1080 },
      };
      const dims = dimMap[aspectRatio] || { w: 1280, h: 720 };
      const seed = Math.floor(Math.random() * 1000000);
      const visualPrompt = encodeURIComponent(`${cleanPrompt}, ${styleModifiers[style] || styleModifiers.cinematic}`);
      const imageUrl = `https://image.pollinations.ai/prompt/${visualPrompt}?width=${dims.w}&height=${dims.h}&seed=${seed}&nologo=true`;

      const durNum = Math.min(Math.max(parseInt(duration, 10) || 5, 3), 10);

      const sceneElements: any[] = [
        {
          type: "image",
          src: imageUrl,
          duration: durNum,
          zoom: motionConfig.zoom,
          pan: motionConfig.pan,
        },
      ];

      if (narration && typeof narration === "string" && narration.trim()) {
        sceneElements.push({
          type: "voice",
          text: narration.trim(),
          voice: "en-US-JennyNeural",
          model: "azure",
        });
      }

      if (showTitle) {
        sceneElements.push({
          type: "text",
          text: cleanPrompt.length > 45 ? `${cleanPrompt.slice(0, 42)}...` : cleanPrompt,
          duration: durNum,
          settings: {
            "font-size": aspectRatio === "9:16" ? "24px" : "32px",
            color: "#ffffff",
            "background-color": "rgba(0, 0, 0, 0.65)",
            padding: "8px 20px",
            "border-radius": "10px",
          },
          position: "bottom-center",
          y: -30,
        });
      }

      const moviePayload = {
        resolution: resVal,
        quality: "high",
        scenes: [
          {
            duration: durNum,
            elements: sceneElements,
          },
        ],
      };

      const renderRes = await fetch("https://api.json2video.com/v2/movies", {
        method: "POST",
        headers: {
          "x-api-key": activeKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moviePayload),
      });

      if (!renderRes.ok) {
        const errJson = await renderRes.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            error: `JSON2Video Render Error (${renderRes.status}): ${errJson?.message || "Failed to submit video render job"}`,
          },
          { status: renderRes.status }
        );
      }

      const renderData = await renderRes.json();
      const projectId = renderData.project;

      if (!projectId) {
        return NextResponse.json({ error: "Failed to obtain project ID from renderer" }, { status: 500 });
      }

      // Fast-poll server side for up to 6 seconds
      for (let i = 0; i < 2; i++) {
        await new Promise((r) => setTimeout(r, 3000));
        try {
          const pollRes = await fetch(`https://api.json2video.com/v2/movies?project=${projectId}`, {
            headers: { "x-api-key": activeKey },
          });
          if (pollRes.ok) {
            const pollData = await pollRes.json();
            if (pollData.movie?.status === "done" && pollData.movie?.url) {
              return NextResponse.json({
                success: true,
                status: "done",
                videoUrl: pollData.movie.url,
                projectId,
                engine: "json2video",
                model: "JSON2Video Fast MP4",
                prompt: cleanPrompt,
                aspectRatio,
                duration: durNum,
              });
            } else if (pollData.movie?.status === "error") {
              return NextResponse.json(
                {
                  success: false,
                  error: `Video Rendering Error: ${pollData.movie.message || "Failed during rendering"}`,
                },
                { status: 500 }
              );
            }
          }
        } catch {
          // fall through to client polling
        }
      }

      return NextResponse.json({
        success: true,
        status: "running",
        projectId,
        engine: "json2video",
        model: "JSON2Video Fast MP4",
        prompt: cleanPrompt,
        aspectRatio,
        duration: durNum,
      });
    }

    // ── Engine 2: Google Veo 3.1 ───────────────────────────────────────────
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
              "Switch to the default Fast MP4 Engine (JSON2Video) which is active and generates real MP4 videos instantly.",
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

    // ── Engine 3: Fal.ai (Kling 2.1 / Wan 2.1) ─────────────────────────────
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