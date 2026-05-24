import { ArtworkStrip } from "@/components/artwork/artwork-strip";
import { MoodDiscovery } from "@/components/ai/mood-discovery";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { artworks } from "@/lib/data/artworks";

export default function GalleryPage() {
  return (
    <PageShell>
      <section className="px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Gallery</SectionLabel>
          <h1 className="mt-6 max-w-5xl font-serif text-7xl leading-none text-ivory md:text-9xl">
            Browse by feeling, not inventory.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-mist/68">
            Every work opens into process, emotion, sound, texture, collector notes, QR sharing,
            and a room preview.
          </p>
          <div className="mt-16">
            {artworks.map((artwork, index) => (
              <Reveal key={artwork.id} delay={index * 0.05}>
                <ArtworkStrip artwork={artwork} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-forest/35 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <MoodDiscovery />
        </div>
      </section>
    </PageShell>
  );
}
