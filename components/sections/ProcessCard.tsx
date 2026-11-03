import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { processes } from "@/lib/site";

type ProcessCardProps = {
  process: (typeof processes)[number];
  index: number;
};

/** One manufacturing step: image and copy, alternating sides on large screens. */
export function ProcessCard({ process, index }: ProcessCardProps) {
  const reversed = index % 2 === 1;
  const step = String(index + 1).padStart(2, "0");

  return (
    <li id={process.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Reveal className={`relative ${reversed ? "lg:order-2" : ""}`}>
        <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-charcoal-100">
          <Image
            src={process.image}
            alt={process.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
              "imagePosition" in process ? process.imagePosition : ""
            }`}
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-charcoal-950/40 to-transparent"
            aria-hidden
          />
        </div>
        <span
          className={`absolute -bottom-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-600 font-display text-2xl font-semibold text-white shadow-xl shadow-rose-600/30 ${
            reversed ? "-left-2 sm:-left-6" : "-right-2 sm:-right-6"
          }`}
        >
          {step}
        </span>
      </Reveal>

      <Reveal delay={120} className={reversed ? "lg:order-1" : ""}>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-rose-600">
          Step {step}
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-charcoal-900 sm:text-3xl">
          {process.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-charcoal-500 sm:text-lg">
          {process.description}
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {process.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-charcoal-100 bg-charcoal-50 px-4 py-2 text-sm font-medium text-charcoal-700"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}
