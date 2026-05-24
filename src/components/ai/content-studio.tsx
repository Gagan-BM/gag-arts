"use client";

import { useState } from "react";
import { Bot, Copy, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AiContentResult } from "@/types/artwork";

const emptyResult: AiContentResult = {
  instagramCaptions: [],
  poeticCaptions: [],
  luxuryCaptions: [],
  hashtags: [],
  reelHooks: [],
  artworkTitles: [],
  etsySeoTags: [],
  storySnippets: [],
};

const labels: Record<keyof AiContentResult, string> = {
  instagramCaptions: "Instagram Captions",
  poeticCaptions: "Poetic Captions",
  luxuryCaptions: "Luxury Captions",
  hashtags: "Hashtags",
  reelHooks: "Reel Hooks",
  artworkTitles: "Artwork Titles",
  etsySeoTags: "Etsy SEO Tags",
  storySnippets: "Story Snippets",
};

export function ContentStudio() {
  const [story, setStory] = useState(
    "A mist-heavy Coorg morning, painted in forest green and coffee brown, with a single warm ivory opening near the horizon.",
  );
  const [moods, setMoods] = useState("Calm, Nostalgic, Earthy, Minimal");
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<AiContentResult>(emptyResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          story,
          moods: moods.split(",").map((mood) => mood.trim()).filter(Boolean),
          imageUrl,
        }),
      });

      if (!response.ok) throw new Error("The studio could not generate content.");
      const json = await response.json();
      setResult(json.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unknown generation error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5">
        <label className="block text-sm text-mist/64">
          Artwork story
          <textarea
            value={story}
            onChange={(event) => setStory(event.target.value)}
            className="mt-2 min-h-48 w-full rounded-sm border border-white/10 bg-white/[0.04] p-4 text-base leading-7 text-ivory outline-none transition focus:border-ivory/45"
          />
        </label>
        <label className="block text-sm text-mist/64">
          Mood keywords
          <input
            value={moods}
            onChange={(event) => setMoods(event.target.value)}
            className="mt-2 h-12 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 text-ivory outline-none transition focus:border-ivory/45"
          />
        </label>
        <label className="block text-sm text-mist/64">
          Artwork image URL
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Cloudinary URL or public image URL"
            className="mt-2 h-12 w-full rounded-sm border border-white/10 bg-white/[0.04] px-4 text-ivory outline-none transition focus:border-ivory/45"
          />
        </label>
        <div className="flex gap-3">
          <Button onClick={generate} disabled={isLoading}>
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Generate
          </Button>
          <Button variant="outline" onClick={generate} disabled={isLoading}>
            <RotateCcw className="size-4" />
            Retry
          </Button>
        </div>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(Object.keys(labels) as (keyof AiContentResult)[]).map((key) => (
          <section key={key} className="border-t border-white/10 pt-5">
            <h3 className="flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-mist/45">
              <Bot className="size-4" aria-hidden="true" />
              {labels[key]}
            </h3>
            <div className="mt-4 space-y-3">
              {result[key].length ? (
                result[key].map((item) => (
                  <button
                    key={item}
                    onClick={() => navigator.clipboard?.writeText(item)}
                    className="group flex w-full items-start justify-between gap-4 rounded-sm bg-white/[0.04] p-4 text-left text-sm leading-6 text-mist/78 transition hover:bg-white/[0.07] hover:text-ivory"
                  >
                    <span>{item}</span>
                    <Copy className="mt-1 size-4 shrink-0 opacity-0 transition group-hover:opacity-100" />
                  </button>
                ))
              ) : (
                <p className="rounded-sm border border-dashed border-white/10 p-4 text-sm leading-6 text-mist/45">
                  Generated lines will appear here.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
