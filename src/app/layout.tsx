import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { brand } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: brand.siteTitle,
  description: brand.description,
  openGraph: {
    title: brand.siteTitle,
    description: brand.description,
    images: [brand.logoPath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
        <footer className="border-t border-white/8 bg-ink px-5 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="font-serif text-sm text-mist/40">G△g Arts</span>
            <a
              href="https://instagram.com/gag.arts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-mist/50 transition hover:text-clay"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @gag.arts
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}