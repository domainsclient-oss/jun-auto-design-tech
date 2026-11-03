import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <Reveal className={`flex max-w-3xl flex-col ${alignment}`}>
      <span
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
          isDark ? "text-rose-200" : "text-rose-600"
        }`}
      >
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={`mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          isDark ? "text-white" : "text-charcoal-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-charcoal-300" : "text-charcoal-500"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
