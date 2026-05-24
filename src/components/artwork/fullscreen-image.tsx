"use client";

import { useState } from "react";
import { Maximize2, X, ZoomIn } from "lucide-react";
import type { ArtworkMedia } from "@/types/artwork";

export function FullscreenImage({ media }: { media: ArtworkMedia[] }) {
  const images = media.filter((item) => item.kind !== "timelapse");
  const [active, setActive] = useState<ArtworkMedia | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className={index === 0 ? "group relative md:col-span-2 md:row-span-2" : "group relative"}
          >
            <span className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-ink/60 text-ivory opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Maximize2 className="size-4" aria-hidden="true" />
            </span>
            <img
              src={item.url}
              alt={item.alt}
              className="aspect-[4/3] size-full rounded-sm object-cover opacity-86 transition duration-700 group-hover:scale-[1.015] group-hover:opacity-100"
            />
            {item.caption ? (
              <span className="mt-3 block text-left text-xs text-mist/50">{item.caption}</span>
            ) : null}
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-[90] bg-ink/96 p-4 backdrop-blur-xl">
          <button
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-white/15 text-ivory"
            aria-label="Close image viewer"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <div className="grid h-full place-items-center">
            <div className="group relative max-h-full max-w-6xl overflow-auto">
              <img
                src={active.url}
                alt={active.alt}
                className="max-h-[86vh] min-w-[70vw] object-contain transition duration-700 group-hover:scale-125"
              />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 text-xs text-mist backdrop-blur">
                <ZoomIn className="size-4" aria-hidden="true" />
                Hover to inspect texture
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
