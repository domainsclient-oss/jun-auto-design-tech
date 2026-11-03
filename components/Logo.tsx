import { siteConfig } from "@/lib/site";

type LogoProps = {
  tone?: "light" | "dark";
  /** Monogram tile colour; use "dark" on red backgrounds where the rose tile would vanish. */
  tile?: "rose" | "dark";
  className?: string;
};

/** Monogram plus the company name set in the display face. Swap for the official logo file when available. */
export function Logo({ tone = "dark", tile = "rose", className = "" }: LogoProps) {
  return (
    <a
      href="#top"
      aria-label={`${siteConfig.name}, back to top`}
      className={`flex items-center gap-3 ${className}`}
    >
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
          tile === "dark" ? "bg-charcoal-950" : "bg-rose-600"
        }`}
      >
        <span className="absolute -right-3 -top-3 h-8 w-8 rotate-45 bg-white/15" aria-hidden />
        {/* Same "J" mark as app/icon.svg so the logo and favicon match. */}
        <svg viewBox="0 0 64 64" fill="none" className="relative h-10 w-10" aria-hidden>
          <path
            d="M27 17h12v20a11 11 0 0 1-22 0"
            stroke="#ffffff"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={`font-display text-lead font-bold uppercase leading-none ${
          tone === "light" ? "text-white" : "text-charcoal-900"
        }`}
      >
        {siteConfig.name}
      </span>
    </a>
  );
}
