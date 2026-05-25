import { NextResponse } from "next/server";
import { brand } from "@/lib/brand";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { Resend } from "resend";
import type { InquiryPayload } from "@/types/artwork";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Save to Supabase
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("inquiries").insert(record);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email
  const artistEmail = process.env.ARTIST_INQUIRY_EMAIL ?? "artist@example.com";
  const subject = `[${brand.appName}] ${body.intent}${body.artworkTitle ? `: ${body.artworkTitle}` : ""}`;

  await resend.emails.send({
    from: "G△g Arts <onboarding@resend.dev>",
    to: artistEmail,
    replyTo: body.email,
    subject,
    html: `
      <h2>${subject}</h2>
      <p><strong>From:</strong> ${body.name} (${body.email})</p>
      ${body.artworkTitle ? `<p><strong>Artwork:</strong> ${body.artworkTitle}</p>` : ""}
      <p><strong>Intent:</strong> ${body.intent}</p>
      <hr />
      <p>${body.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
  return NextResponse.json({ ok: true });
}