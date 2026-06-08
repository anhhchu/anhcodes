import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Display serif — high-contrast, editorial headlines
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI serif — readable, with italics for labels
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
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
