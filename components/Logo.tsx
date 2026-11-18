import Image from "next/image";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  /** "light" sits the logo on a white tile so its dark lettering stays readable on charcoal. */
  tone?: "light" | "dark";
  /** Load early; use for the header logo that is visible on first paint. */
  preload?: boolean;
  className?: string;
};

/**
 * The company logo (public/images/jadt-logo.svg, a cropped copy of JADT_logo_Red.svg).
 * Kept large: its "DESIGN TECH" line is under a sixth of the logo's height, so smaller sizes
 * turn it into a few blurred pixels on standard screens. No hover scale, since a transformed
 * SVG is rasterised by the browser and loses its sharp edges.
 */
export function Logo({ tone = "dark", preload = false, className = "" }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label={`${siteConfig.name}, back to top`}
      className={`group inline-flex shrink-0 items-center ${
        tone === "light" ? "rounded-[0.75rem] bg-white px-3 py-2" : ""
      } ${className}`}
    >
      <Image
        src="/images/jadt-logo.svg"
        alt={siteConfig.name}
        width={808}
        height={432}
        unoptimized
        preload={preload}
        className={`w-auto transition-opacity duration-300 group-hover:opacity-80 ${
          tone === "light" ? "h-20" : "h-[68px] xl:h-[72px]"
        }`}
      />
    </a>
  );
}
