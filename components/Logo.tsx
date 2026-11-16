import Image from "next/image";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  /** "light" sits the logo on a white tile so its dark lettering stays readable on charcoal. */
  tone?: "light" | "dark";
  /** Load early; use for the header logo that is visible on first paint. */
  preload?: boolean;
  className?: string;
};

/** The company logo (public/images/jadt-logo.svg, a cropped copy of JADT_logo_Red.svg). */
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
        className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-16"
      />
    </a>
  );
}
