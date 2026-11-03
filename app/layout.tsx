import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Jun Auto Design Tech | Automotive Interior Design & Manufacturing",
  description:
    "Jun Auto Design Tech delivers automotive interior design development and post-processing, including perforation, embossing, hot melt lamination and precision cutting, backed by rigorous quality control.",
};

export const viewport: Viewport = {
  themeColor: "#b32650",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${sora.variable} antialiased`}
    >
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
