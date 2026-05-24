import { NextResponse } from "next/server";
import { generateArtworkContent } from "@/lib/ai/content-engine";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const story = String(body.story ?? "").trim();
    const moods = Array.isArray(body.moods) ? body.moods.map(String) : [];
    const imageUrl = body.imageUrl ? String(body.imageUrl) : undefined;

    if (!story || !moods.length) {
      return NextResponse.json(
        { error: "Artwork story and mood keywords are required." },
        { status: 400 },
      );
    }

    let attempt = 0;
    let result: Awaited<ReturnType<typeof generateArtworkContent>> | null = null;

    while (attempt < 2 && !result) {
      try {
        result = await generateArtworkContent({ story, moods, imageUrl });
      } catch (error) {
        attempt += 1;
        if (attempt >= 2) throw error;
      }
    }

    const supabase = getSupabaseAdmin();
    if (supabase && result) {
      await supabase.from("ai_content").insert({
        input_story: story,
        input_moods: moods,
        image_url: imageUrl,
        output: result.data,
        provider: result.usedFallback ? "local_fallback" : "openai",
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The content engine could not complete the request.",
      },
      { status: 500 },
    );
  }
}
