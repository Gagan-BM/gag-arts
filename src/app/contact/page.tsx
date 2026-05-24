import { InquiryForm } from "@/components/artwork/inquiry-form";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-32 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.76fr_1fr]">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h1 className="mt-6 font-serif text-7xl leading-none text-ivory md:text-9xl">
              Collector conversations begin quietly.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-mist/68">
              Inquire about an available work, reserve a piece, or commission something similar
              in mood and scale.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </PageShell>
  );
}
