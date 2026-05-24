"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { artworks, aesthetics, moods, roomColors } from "@/lib/data/artworks";
import { recommendArtworks } from "@/lib/recommendations/match";
import { cn } from "@/lib/utils";

function TogglePill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-ivory bg-ivory text-ink"
          : "border-white/10 text-mist/62 hover:border-ivory/35 hover:text-ivory",
      )}
    >
      {label}
    </button>
  );
}

export function MoodDiscovery() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["Calm"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Warm ivory"]);
  const [selectedAesthetics, setSelectedAesthetics] = useState<string[]>(["Japandi"]);

  const recommendations = useMemo(
    () =>
      recommendArtworks({
        moods: selectedMoods,
        roomColors: selectedColors,
        aesthetics: selectedAesthetics,
      }),
    [selectedAesthetics, selectedColors, selectedMoods],
  );

  const toggle = (value: string, list: string[], setter: (items: string[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr]">
      <aside className="space-y-8">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mist/45">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Mood Engine
          </p>
          <h2 className="mt-4 font-serif text-5xl leading-none text-ivory">
            Find the painting your room is trying to ask for.
          </h2>
        </div>
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-sm text-mist/58">Emotion</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <TogglePill
                  key={mood}
                  label={mood}
                  active={selectedMoods.includes(mood)}
                  onClick={() => toggle(mood, selectedMoods, setSelectedMoods)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm text-mist/58">Room color</p>
            <div className="flex flex-wrap gap-2">
              {roomColors.map((color) => (
                <TogglePill
                  key={color}
                  label={color}
                  active={selectedColors.includes(color)}
                  onClick={() => toggle(color, selectedColors, setSelectedColors)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm text-mist/58">Interior style</p>
            <div className="flex flex-wrap gap-2">
              {aesthetics.map((style) => (
                <TogglePill
                  key={style}
                  label={style}
                  active={selectedAesthetics.includes(style)}
                  onClick={() => toggle(style, selectedAesthetics, setSelectedAesthetics)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="grid gap-5">
        {recommendations.map(({ artwork, score, reason }, index) => (
          <Link
            href={`/artwork/${artwork.slug}`}
            key={artwork.id}
            className="group grid gap-5 border-t border-white/10 pt-5 md:grid-cols-[0.42fr_1fr_0.12fr]"
          >
            <img
              src={artwork.heroImage}
              alt={artwork.heroAlt}
              className="aspect-[5/4] rounded-sm object-cover opacity-82 transition duration-700 group-hover:opacity-100"
            />
            <div>
              <p className="font-mono text-xs text-mist/42">Match {index + 1} / {artworks.length}</p>
              <h3 className="mt-3 font-serif text-4xl text-ivory">{artwork.title}</h3>
              <p className="mt-4 max-w-2xl leading-7 text-mist/62">{reason}</p>
              <p className="mt-5 text-sm text-mist/40">Signal strength {Math.max(score, 1)}</p>
            </div>
            <span className="grid size-11 place-items-center rounded-full border border-white/12 text-mist/60 transition group-hover:border-ivory/40 group-hover:text-ivory">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
