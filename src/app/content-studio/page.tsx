import { ContentStudio } from "@/components/ai/content-studio";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";

export default function ContentStudioPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>AI Content Engine</SectionLabel>
          <h1 className="mt-6 max-w-5xl font-serif text-7xl leading-none text-ivory md:text-9xl">
            Turn process into language without flattening it.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-mist/68">
            Generate Instagram captions, poetic fragments, luxury collector copy, reel hooks,
            artwork titles, hashtags, Etsy SEO tags, and story snippets.
          </p>
          <div className="mt-16">
            <ContentStudio />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
