import Image from "next/image";
import { ArrowRight, Bot, Mountain, Play, Sparkles } from "lucide-react";
import { ArtworkStrip } from "@/components/artwork/artwork-strip";
import { MoodDiscovery } from "@/components/ai/mood-discovery";
import { ButtonLink } from "@/components/ui/button";
import { SectionLabel } from "@/components/ui/section-label";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { brand } from "@/lib/brand";
import { artworks } from "@/lib/data/artworks";

export default function Home() {
  return (
    <PageShell>
      <section className="noise grain relative min-h-[88vh] overflow-hidden px-5 pt-28 sm:px-8">
        <Image
          src={artworks[0].heroImage}
          alt={artworks[0].heroAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,7,0.98),rgba(7,9,7,0.72)_48%,rgba(7,9,7,0.28)),linear-gradient(0deg,rgba(7,9,7,0.98),transparent_38%)]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(88vh-7rem)] max-w-7xl flex-col justify-end pb-14">
          <Reveal>
            <div className="mb-8 flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>{brand.parentName} / {brand.brandTagline}</SectionLabel>
                <p className="mt-3 font-serif text-2xl text-clay">{brand.artSign}</p>
              </div>
              <Image
                src={brand.logoPath}
                alt={`${brand.appName} logo`}
                width={220}
                height={220}
                className="w-36 rounded-sm border border-clay/30 bg-paper/95 shadow-[0_28px_80px_rgba(0,0,0,0.38)] md:w-48"
                priority
              />
            </div>
            <h1 className="mt-6 max-w-5xl text-balance font-serif text-6xl leading-[0.92] text-ivory sm:text-7xl lg:text-[8.25rem]">
              {brand.appTagline}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist/72">
              {brand.appName} is a cinematic digital gallery for experiencing original paintings through
              story, texture, music, room context, and the quiet weather around their making.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/gallery">
                Enter Gallery
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/room-preview" variant="outline">
                <Play className="size-4" aria-hidden="true" />
                Try Room Preview
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionLabel>What {brand.appName} Holds</SectionLabel>
            <h2 className="mt-5 font-serif text-6xl leading-none text-ivory">
              Not a shop. A sensory archive for collectors.
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Layered Stories", "Artwork pages move through image, process, emotion, music, room context, and collector notes.", Mountain],
              ["AI Studio", "Generate captions, hooks, titles, SEO tags, and poetic story fragments from an artwork's mood.", Bot],
              ["Mood Discovery", "Recommend paintings by emotion, room color, aesthetic, and interior atmosphere.", Sparkles],
            ].map(([title, copy, Icon], index) => (
              <Reveal key={String(title)} delay={index * 0.08}>
                <div className="border-t border-white/10 pt-5">
                  <Icon className="size-5 text-ivory" aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-3xl text-ivory">{String(title)}</h3>
                  <p className="mt-4 leading-7 text-mist/62">{String(copy)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#070907,#101711)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <SectionLabel>Featured Works</SectionLabel>
                <h2 className="mt-5 max-w-3xl font-serif text-6xl leading-none text-ivory">
                  A gallery that lets silence do some of the talking.
                </h2>
              </div>
              <ButtonLink href="/gallery" variant="outline">
                View all works
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Reveal>
          <div className="mt-16">
            {artworks.map((artwork, index) => (
              <Reveal key={artwork.id} delay={index * 0.06}>
                <ArtworkStrip artwork={artwork} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-coffee/30 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <MoodDiscovery />
        </div>
      </section>
    </PageShell>
  );
}
