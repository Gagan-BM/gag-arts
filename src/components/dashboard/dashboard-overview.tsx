import { BarChart3, ImagePlus, Inbox, Sparkles } from "lucide-react";
import { artworks } from "@/lib/data/artworks";

const stats = [
  { label: "Works", value: artworks.length, icon: ImagePlus },
  { label: "Available", value: artworks.filter((art) => art.availability === "Available").length, icon: Sparkles },
  { label: "Inquiries", value: 12, icon: Inbox },
  { label: "Studio views", value: "8.4k", icon: BarChart3 },
];

export function DashboardOverview() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-mist/45">Artist Dashboard</p>
        <h1 className="mt-4 font-serif text-6xl leading-none text-ivory">
          A quiet command room for the entire body of work.
        </h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="border-t border-white/10 pt-5">
              <Icon className="size-5 text-ivory" aria-hidden="true" />
              <p className="mt-6 font-serif text-5xl text-ivory">{stat.value}</p>
              <p className="mt-2 text-sm text-mist/55">{stat.label}</p>
            </div>
          );
        })}
      </div>
      <section className="lg:col-span-2">
        <div className="grid gap-4 lg:grid-cols-3">
          {["Upload artwork", "Manage availability", "View inquiries"].map((title, index) => (
            <div key={title} className="border-t border-white/10 pt-5">
              <p className="font-mono text-xs text-mist/38">0{index + 1}</p>
              <h2 className="mt-3 font-serif text-3xl text-ivory">{title}</h2>
              <p className="mt-4 leading-7 text-mist/60">
                {index === 0
                  ? "Add hero images, progress media, timelapse links, dimensions, materials, and collector notes."
                  : index === 1
                    ? "Switch works between Available, Sold, and Commissioned without touching the public layout."
                    : "Inquiry records are email-ready and stored in Supabase when configured."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
