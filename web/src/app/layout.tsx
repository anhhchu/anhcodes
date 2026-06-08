import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Fonts are self-hosted (src/fonts/) rather than fetched from Google at
// build time — next/font/google's build-time fetch hangs in CI. Both are
// variable woff2 files (latin subset), so one file covers the weight range.

// Display serif — high-contrast, editorial headlines
const display = localFont({
  src: [
    { path: "../fonts/fraunces-latin-normal.woff2", style: "normal" },
    { path: "../fonts/fraunces-latin-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

// Body / UI serif — readable, with italics for labels
const serif = localFont({
  src: [
    { path: "../fonts/newsreader-latin-normal.woff2", style: "normal" },
    { path: "../fonts/newsreader-latin-italic.woff2", style: "italic" },
  ],
  weight: "200 800",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anhcodes.dev"),
  title: {
    default: "Anh Chu — Data Engineer & Architect",
    template: "%s — Anh Chu",
  },
  description:
    "Data engineer and architect writing about Spark, Delta Lake, Databricks, and building reliable data platforms at scale.",
  icons: {
    icon: "/images/logo-noborder.png",
    shortcut: "/images/logo-noborder.png",
    apple: "/images/logo-noborder.png",
  },
  openGraph: {
    type: "website",
    siteName: "Anh Chu",
    locale: "en_US",
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
      className={`${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
