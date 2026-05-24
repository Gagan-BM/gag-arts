import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();

  const record = {
    artwork_id: body.artworkId ?? null,
    room_image_url: body.roomImageUrl ?? null,
    artwork_image_url: body.artworkImageUrl ?? null,
    frame_style: body.frameStyle ?? "Warm oak",
    placement: body.placement ?? {},
  };

  if (supabase) {
    const { error } = await supabase.from("room_previews").insert(record);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, preview: record });
}
