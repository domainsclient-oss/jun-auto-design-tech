import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Section title in the display face, with an optional supporting sentence. */
export function SectionHeading({ title, description, tone = "light", className = "" }: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={className}>
      <Reveal as="h2" className={`font-display text-head font-bold uppercase ${isDark ? "text-white" : "text-charcoal-900"}`}>
        {title}
      </Reveal>
      {description && (
        <Reveal
          as="p"
          delay={80}
          className={`mt-8 max-w-xl text-body ${isDark ? "text-white" : "text-charcoal-900"}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
