import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Artwork } from "@/types/artwork";
import { formatPrice } from "@/lib/utils";

export function ArtworkStrip({ artwork, index }: { artwork: Artwork; index: number }) {
  return (
    <Link
      href={`/artwork/${artwork.slug}`}
      className="group grid gap-6 border-t border-white/10 py-9 transition hover:border-ivory/35 md:grid-cols-[0.18fr_0.42fr_1fr_0.24fr]"
    >
      <span className="font-mono text-xs text-mist/46">{String(index + 1).padStart(2, "0")}</span>
      <div className="relative aspect-[5/6] overflow-hidden rounded-sm bg-forest/30 md:aspect-[4/3]">
        <Image
          src={artwork.heroImage}
          alt={artwork.heroAlt}
          fill
          sizes="(min-width: 768px) 26vw, 100vw"
          className="size-full object-cover opacity-88 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-mist/50">
          {artwork.availability}
        </p>
        <h3 className="mt-3 font-serif text-4xl text-ivory md:text-6xl">{artwork.title}</h3>
        <p className="mt-5 max-w-2xl text-base leading-7 text-mist/66">{artwork.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {artwork.moodTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist/62"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 md:flex-col md:items-end">
        <span className="text-sm text-mist/60">{formatPrice(artwork.price)}</span>
        <span className="grid size-11 place-items-center rounded-full border border-white/12 text-mist/60 transition group-hover:border-ivory/40 group-hover:text-ivory">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
