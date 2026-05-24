import OpenAI from "openai";
import { brand } from "@/lib/brand";
import type { AiContentResult } from "@/types/artwork";

const contentSchema = {
  name: "gag_artwork_content",
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "instagramCaptions",
      "poeticCaptions",
      "luxuryCaptions",
      "hashtags",
      "reelHooks",
      "artworkTitles",
      "etsySeoTags",
      "storySnippets",
    ],
    properties: {
      instagramCaptions: { type: "array", items: { type: "string" } },
      poeticCaptions: { type: "array", items: { type: "string" } },
      luxuryCaptions: { type: "array", items: { type: "string" } },
      hashtags: { type: "array", items: { type: "string" } },
      reelHooks: { type: "array", items: { type: "string" } },
      artworkTitles: { type: "array", items: { type: "string" } },
      etsySeoTags: { type: "array", items: { type: "string" } },
      storySnippets: { type: "array", items: { type: "string" } },
    },
  },
  strict: true,
} as const;

export type ContentEngineInput = {
  story: string;
  moods: string[];
  imageUrl?: string;
};

const fallback: AiContentResult = {
  instagramCaptions: [
    "A quiet work for rooms that prefer feeling over explanation.",
    "Layer by layer, the mountain became a memory.",
  ],
  poeticCaptions: [
    "Mist entered the canvas and forgot the way out.",
    "A hill, a hush, a small return of light.",
  ],
  luxuryCaptions: [
    "An atmospheric original composed for contemplative interiors.",
    "A restrained collector piece with tactile depth and cinematic stillness.",
  ],
  hashtags: ["#originalart", "#contemporarypainting", "#artcollector", "#interiorart"],
  reelHooks: [
    "Watch a blank surface turn into weather.",
    "The final texture only appears when the light moves.",
  ],
  artworkTitles: ["Weather Held Still", "The Valley Keeps Its Voice", "After the Rain Paused"],
  etsySeoTags: ["original painting", "moody wall art", "large canvas", "earth tone art"],
  storySnippets: [
    "Made from the quiet after rain, this work holds a landscape without naming it.",
    "The painting is less a view than a feeling: green, restrained, and almost spoken.",
  ],
};

export async function generateArtworkContent(input: ContentEngineInput) {
  if (!process.env.OPENAI_API_KEY) {
    return { data: fallback, usedFallback: true };
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = [
    `Create premium artist-first content for ${brand.appName}, a cinematic digital gallery from ${brand.parentName}. Brand tagline: "${brand.brandTagline}". App line: "${brand.appTagline}". Artist sign: "${brand.artSign}".`,
    "Avoid salesy ecommerce language. Sound editorial, intimate, and collectible.",
    `Artwork story: ${input.story}`,
    `Mood keywords: ${input.moods.join(", ")}`,
    input.imageUrl ? `Artwork image URL: ${input.imageUrl}` : "",
    "Return concise arrays: 2 Instagram captions, 2 poetic captions, 2 luxury captions, 8 hashtags, 3 reel hooks, 4 artwork titles, 8 Etsy SEO tags, and 2 story snippets.",
  ].join("\n");

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1",
    input: prompt,
    text: {
      format: {
        type: "json_schema",
        ...contentSchema,
      },
    },
  });

  const raw = response.output_text;

  return {
    data: JSON.parse(raw) as AiContentResult,
    usedFallback: false,
  };
}
