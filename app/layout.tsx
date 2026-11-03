import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


// Body, navigation and buttons.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings: 700 for main headings, 600 for section headings.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
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
      className={cn("antialiased", inter.variable, manrope.variable)}
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
