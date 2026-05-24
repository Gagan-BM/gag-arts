import { ContentStudio } from "@/components/ai/content-studio";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";

export default function DashboardPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardOverview />
          <div className="mt-20 border-t border-white/10 pt-12">
            <SectionLabel>Generate Captions</SectionLabel>
            <div className="mt-10">
              <ContentStudio />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
