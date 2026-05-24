import Image from "next/image";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { FullscreenImage } from "@/components/artwork/fullscreen-image";
import { ArtworkTabs } from "@/components/artwork/artwork-tabs";
import { InquiryForm } from "@/components/artwork/inquiry-form";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";
import { artworks, getArtworkBySlug } from "@/lib/data/artworks";
import { absoluteUrl, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const artworkUrl = absoluteUrl(`/artwork/${artwork.slug}`);
  const qrCode = await QRCode.toDataURL(artworkUrl, { margin: 1, width: 220 });

  return (
    <PageShell>
      <section className="relative min-h-screen overflow-hidden px-5 pt-24 sm:px-8">
        <Image
          src={artwork.heroImage}
          alt={artwork.heroAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,7,0.98),rgba(7,9,7,0.70)_46%,rgba(7,9,7,0.16)),linear-gradient(0deg,#070907,transparent_45%)]" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-end gap-12 pb-16 lg:grid-cols-[1fr_0.36fr]">
          <div>
            <SectionLabel>{artwork.availability} / {artwork.dimensions}</SectionLabel>
            <h1 className="mt-5 max-w-5xl font-serif text-7xl leading-none text-ivory md:text-[9rem]">
              {artwork.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-8 text-mist/72">{artwork.subtitle}</p>
          </div>
          <aside className="border-t border-white/10 pt-6">
            <p className="text-sm text-mist/50">Collector access</p>
            <p className="mt-2 font-serif text-4xl text-ivory">{formatPrice(artwork.price)}</p>
            <img src={qrCode} alt="QR code for sharing this artwork" className="mt-6 size-32 rounded-sm bg-ivory p-2" />
          </aside>
        </div>
      </section>

      <ArtworkTabs artwork={artwork} />

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Texture / Process</SectionLabel>
          <h2 className="mt-5 max-w-4xl font-serif text-6xl leading-none text-ivory">
            Images that invite the eye closer than a listing ever could.
          </h2>
          <div className="mt-12">
            <FullscreenImage media={artwork.media} />
          </div>
        </div>
      </section>

      <section className="bg-forest/30 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <SectionLabel>Inquiry</SectionLabel>
            <h2 className="mt-5 font-serif text-6xl leading-none text-ivory">
              Begin with what the work made you feel.
            </h2>
          </div>
          <InquiryForm artworkId={artwork.id} artworkTitle={artwork.title} />
        </div>
      </section>
    </PageShell>
  );
}
