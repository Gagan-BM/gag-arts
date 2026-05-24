"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InquiryIntent } from "@/types/artwork";

const intents: InquiryIntent[] = ["Inquire", "Reserve", "Commission Similar"];

export function InquiryForm({
  artworkId,
  artworkTitle,
}: {
  artworkId?: string;
  artworkTitle?: string;
}) {
  const [intent, setIntent] = useState<InquiryIntent>("Inquire");
  const [status, setStatus] = useState("");

  async function submit(formData: FormData) {
    setStatus("Sending...");
    const payload = {
      artworkId,
      artworkTitle,
      intent,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "Inquiry saved. The artist can reply from email workflow." : "Could not save inquiry.");
  }

  return (
    <form action={submit} className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {intents.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setIntent(item)}
            className={
              intent === item
                ? "rounded-full bg-ivory px-4 py-2 text-sm text-ink"
                : "rounded-full border border-white/10 px-4 py-2 text-sm text-mist/62 transition hover:border-ivory/35 hover:text-ivory"
            }
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="h-12 rounded-sm border border-white/10 bg-white/[0.04] px-4 text-ivory outline-none focus:border-ivory/45"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="h-12 rounded-sm border border-white/10 bg-white/[0.04] px-4 text-ivory outline-none focus:border-ivory/45"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="Tell the artist what moved you."
        className="min-h-36 w-full rounded-sm border border-white/10 bg-white/[0.04] p-4 text-ivory outline-none focus:border-ivory/45"
      />
      <Button>
        <Send className="size-4" aria-hidden="true" />
        Send
      </Button>
      {status ? <p className="text-sm text-mist/62">{status}</p> : null}
    </form>
  );
}
