import { RoomPreviewTool } from "@/components/ai/room-preview-tool";
import { PageShell } from "@/components/site/page-shell";
import { SectionLabel } from "@/components/ui/section-label";

export default function RoomPreviewPage() {
  return (
    <PageShell>
      <section className="px-5 pb-24 pt-32 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>AI Room Preview MVP</SectionLabel>
          <h1 className="mt-6 max-w-5xl font-serif text-7xl leading-none text-ivory md:text-9xl">
            See how a painting changes the room.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-mist/68">
            Upload a wall image, place the artwork, resize it, adjust shadow, and choose a frame.
            The architecture is ready for future AI perspective correction.
          </p>
          <div className="mt-16">
            <RoomPreviewTool />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
