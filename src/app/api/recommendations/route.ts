import { NextResponse } from "next/server";
import { recommendArtworks } from "@/lib/recommendations/match";

export async function POST(request: Request) {
  const body = await request.json();
  const results = recommendArtworks({
    moods: Array.isArray(body.moods) ? body.moods.map(String) : [],
    roomColors: Array.isArray(body.roomColors) ? body.roomColors.map(String) : [],
    aesthetics: Array.isArray(body.aesthetics) ? body.aesthetics.map(String) : [],
    emotion: body.emotion ? String(body.emotion) : undefined,
  });

  return NextResponse.json({ results });
}
