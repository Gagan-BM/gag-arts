import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-ink text-ivory">{children}</main>
      <SiteFooter />
    </>
  );
}
