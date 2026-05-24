import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";
import { brand } from "@/lib/brand";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8">
        <img
          src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1800&q=86"
          alt="Quiet painting studio with canvas and natural light"
          className="absolute inset-0 size-full object-cover opacity-36"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070907,rgba(7,9,7,0.78)_58%,rgba(7,9,7,0.24)),linear-gradient(0deg,#070907,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl pb-24">
          <SectionLabel>{brand.parentName} / {brand.brandTagline}</SectionLabel>
          <h1 className="mt-6 max-w-5xl font-serif text-7xl leading-none text-ivory md:text-9xl">
            A practice built from mist, restraint, and remembered weather.
          </h1>
          <p className="mt-10 max-w-3xl text-xl leading-9 text-mist/72">
            {brand.appName} centers the artist as storyteller. Each painting is presented as a living process:
            the material decisions, the emotional temperature, the music that shaped the studio,
            and the room it might quietly transform.
          </p>
          <p className="mt-8 font-serif text-5xl text-clay">{brand.artSign}</p>
        </div>
      </section>
    </PageShell>
  );
}
