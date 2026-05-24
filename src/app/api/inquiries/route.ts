import { NextResponse } from "next/server";
import { brand } from "@/lib/brand";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { InquiryPayload } from "@/types/artwork";

export async function POST(request: Request) {
  const body = (await request.json()) as InquiryPayload;

  if (!body.name || !body.email || !body.message || !body.intent) {
    return NextResponse.json({ error: "Missing required inquiry fields." }, { status: 400 });
  }

  const record = {
    artwork_id: body.artworkId ?? null,
    artwork_title: body.artworkTitle ?? null,
    intent: body.intent,
    name: body.name,
    email: body.email,
    message: body.message,
    status: "new",
  };

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("inquiries").insert(record);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    emailReady: {
      to: process.env.ARTIST_INQUIRY_EMAIL ?? "artist@example.com",
      subject: `[${brand.appName}] ${body.intent}${body.artworkTitle ? `: ${body.artworkTitle}` : ""}`,
      replyTo: body.email,
      body: body.message,
    },
  });
}
