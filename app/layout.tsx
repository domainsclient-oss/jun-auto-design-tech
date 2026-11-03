import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Jun Auto Design Tech | Automotive Interior Design & Manufacturing",
  description:
    "Jun Auto Design Tech delivers automotive interior design development and post-processing, including perforation, embossing, hot melt lamination and precision cutting, backed by rigorous quality control.",
};

export const viewport: Viewport = {
  themeColor: "#fa003f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks that script runs, so entrance animations never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-svh font-sans">{children}</body>
    </html>
  );
}
