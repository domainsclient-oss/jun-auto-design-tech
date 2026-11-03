import { siteConfig } from "@/lib/site";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/** Text-based wordmark with a geometric monogram. Swap for the official logo file when available. */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const isLight = tone === "light";

  return (
    <a
      href="#top"
      aria-label={`${siteConfig.name}, back to top`}
      className={`flex items-center gap-3 ${className}`}
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-rose-600">
        <span className="absolute -right-3 -top-3 h-8 w-8 rotate-45 bg-white/15" aria-hidden />
        <span className="font-display text-lg font-bold text-white">J</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[15px] font-semibold tracking-tight ${
            isLight ? "text-white" : "text-charcoal-900"
          }`}
        >
          Jun Auto
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${
            isLight ? "text-rose-200" : "text-rose-600"
          }`}
        >
          Design Tech
        </span>
      </span>
    </a>
  );
}
