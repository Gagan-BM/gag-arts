"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Disc3, Eye, ImageIcon, Music2, NotebookText, Sparkles } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { RoomPreviewTool } from "@/components/ai/room-preview-tool";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "Artwork", icon: ImageIcon },
  { key: "Process", icon: Eye },
  { key: "Emotion", icon: Sparkles },
  { key: "Music", icon: Music2 },
  { key: "Room Preview", icon: Disc3 },
  { key: "Collector Notes", icon: NotebookText },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ArtworkTabs({ artwork }: { artwork: Artwork }) {
  const [active, setActive] = useState<TabKey>("Artwork");

  const content: Record<TabKey, React.ReactNode> = {
    Artwork: (
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <p className="font-serif text-4xl leading-tight text-ivory md:text-6xl">{artwork.story}</p>
        <dl className="grid gap-5 text-sm text-mist/64">
          <div>
            <dt className="text-mist/38">Materials</dt>
            <dd className="mt-2 text-ivory">{artwork.materials.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-mist/38">Dimensions</dt>
            <dd className="mt-2 text-ivory">{artwork.dimensions}</dd>
          </div>
          <div>
            <dt className="text-mist/38">Time spent</dt>
            <dd className="mt-2 text-ivory">{artwork.timeSpent}</dd>
          </div>
        </dl>
      </div>
    ),
    Process: <p className="max-w-4xl font-serif text-5xl leading-tight text-ivory">{artwork.process}</p>,
    Emotion: <p className="max-w-4xl font-serif text-5xl leading-tight text-ivory">{artwork.emotion}</p>,
    Music: (
      <div>
        <p className="max-w-4xl font-serif text-5xl leading-tight text-ivory">
          {artwork.musicInspiration}
        </p>
        <div className="mt-10 h-1 max-w-xl overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-ivory/70" />
        </div>
      </div>
    ),
    "Room Preview": <RoomPreviewTool defaultArtwork={artwork.heroImage} compact />,
    "Collector Notes": (
      <p className="max-w-4xl font-serif text-5xl leading-tight text-ivory">
        {artwork.collectorNotes}
      </p>
    ),
  };

  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                  active === tab.key
                    ? "border-ivory/55 bg-ivory text-ink"
                    : "border-white/10 text-mist/62 hover:border-ivory/35 hover:text-ivory",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {tab.key}
              </button>
            );
          })}
        </div>
        <div className="mt-12 min-h-[340px] border-t border-white/10 pt-12">
          <AnimatePresence mode="wait">
            <m.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              {content[active]}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
