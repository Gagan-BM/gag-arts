import Image from "next/image";
import Link from "next/link";
import { Bot, Images, LayoutDashboard, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { brand } from "@/lib/brand";

const navItems = [
  { href: "/gallery", label: "Gallery" },
  { href: "/room-preview", label: "Room Preview" },
  { href: "/content-studio", label: "AI Studio" },
  { href: "/about", label: "Artist" },
];

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink/58 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${brand.appName} home`}>
          <span className="grid size-11 place-items-center overflow-hidden rounded-full border border-clay/35 bg-paper/95 transition group-hover:border-clay">
            <Image
              src={brand.logoPath}
              alt={`${brand.appName} logo`}
              width={44}
              height={44}
              className="size-full object-cover"
              priority
            />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-2xl tracking-wide text-ivory">{brand.appName}</span>
            <span className="mt-1 hidden text-[10px] uppercase tracking-[0.28em] text-clay sm:block">
              {brand.brandTagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-mist/68 transition hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="hidden size-10 place-items-center rounded-full text-mist/70 transition hover:bg-white/7 hover:text-ivory sm:grid"
            title="Artist dashboard"
            aria-label="Artist dashboard"
          >
            <LayoutDashboard className="size-4" aria-hidden="true" />
          </Link>
          <ButtonLink href="/contact" className="hidden sm:inline-flex" variant="outline">
            <MessageCircle className="size-4" aria-hidden="true" />
            Contact
          </ButtonLink>
          <ButtonLink href="/gallery" className="sm:hidden" variant="ghost">
            <Images className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/content-studio" className="sm:hidden" variant="ghost">
            <Bot className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
