import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-ink px-5 py-12 text-sm text-mist/58 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <Image
              src={brand.logoPath}
              alt={`${brand.appName} logo`}
              width={72}
              height={72}
              className="rounded-sm border border-clay/25 bg-paper object-cover"
            />
            <div>
              <p className="font-serif text-4xl text-ivory">{brand.appName}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.32em] text-clay">
                {brand.appTagline}
              </p>
            </div>
          </div>
          <p className="mt-3 max-w-md leading-7">
            A digital gallery by {brand.parentName}, rooted beyond place and surface.
            Artist sign: <span className="font-serif text-ivory">{brand.artSign}</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          {["Gallery", "Room Preview", "AI Studio", "Contact"].map((label) => (
            <Link
              key={label}
              href={
                label === "Gallery"
                  ? "/gallery"
                  : label === "Room Preview"
                    ? "/room-preview"
                    : label === "AI Studio"
                      ? "/content-studio"
                      : "/contact"
              }
              className="transition hover:text-ivory"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
